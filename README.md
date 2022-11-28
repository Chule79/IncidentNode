# Installation

npm i mongoose express dotenv cors esm config-yml bcrypt jsonwebtoken cloudinary multer multer-storage-cloudinary compression

npm i -D eslint eslint-config-prettier prettier nodemon jest supertest


# Incident Node

---

Nuestro proyecto consiste en la creación de un backend para una aplicación de tratamiento y seguimiento de incidencias. Enfocado en empresas divididas por departamentos, en la cual se podrá informar a los administradores y grupo de reparaciones a través de la app de cualquier tipo de avería, introduciendo el puesto de departamento,  una descripción breve y con la posibilidad de adjuntar posibles imágenes de la avería o problema en cuestión.

# 🧩 Arquitectura Hexagonal

--- 
Para este proyecto hemos decido implementar un diseño de software de Arquitectura Hexagonal con NodeJS. Esto nos permite construir un proyecto mantenible y elimina la necesidad de cambiar el código central, reemplazando esto por la modificación de componentes, creando así mayor estabilidad.

![hex_architecture.png](https://res.cloudinary.com/dcssmtpvq/image/upload/v1669663585/hex_architecture_wrexzv.png)

# 🧩 Dependencias

---

Las dependencias aplicadas en este proyecto son las siguientes:

- **bcrypt**: En nuestro proyecto tendremos varios usuarios registrados a través de un correo y un nombre cons us propia contraseña, esa contraseña al almacenarla en una base de datos por temas de seguridad y privacidad debemos de encriptarla y para eso utilizaremos esta dependencia.
- **cloudinary**: Nuestros usuarios al registrarse en nuestra app tienen la posibilidad de subir su foto de avatar para el perfil del usuario o bien al abrir una incidencia podrán subir una captura de pantalla o foto de la incidencia ne cuestion. Para poder almacenar las imagenes en la nuve hemos decidido utilizar cloudinary que nos dara un almacenamiento en la nuve en la cual almacenar las imagenes adjuntadas.
- **compression**: Con esto lo que conseguimos es disminuir drásticamente la cantidad de datos que se deben descargar de nuestra app lo cual mejorará el rendimiento aproximadamente en un 70%.
- **config-yml**: Con esta dependencia podremos generar los archivos de configuración de nuestro proyecto, lo que nos ayudará a manejar el funcionamiento de nuestra app.
- **cors**: Nos ayuda a controlar el tráfico de peticiones http de nuestra app.
- **dotenv**: Nos proporcionara la capacidad e guardar enlaces o parámetros de configuración que nos será útiles para utilizar en determinados componentes de nuestra app, como son claves de acceso o direcciones.
- **esm**: Se utiliza para empaquetar código y poder exportarlo para utilizarlo en otras partes de nuestro código ya se en el mismo archivo o en diferentes.
- **express**: Es un marco de servidor de aplicaciones web de Node js, que está diseñado específicamente para crear aplicaciones web híbridas, de una sola página o de varias páginas
- **jsonwebtoken**: Esta dependencia nos permitirá crear un token de seguridad de acceso para los usuarios una vez inicien sesión. Esto será explicado más adelante.
- **mongoose**: Nos permite definir objetos con un esquema fuertemente tipado que se asigna a un documento MongoDB y con el cual guardaremos en nuestra base de datos.
- **multer**: se utiliza para poder manejar archivos en un formulario en este caso se utiliza para manipular las imagenes.
- **multer-storage-cloudinary**: Con este almacenamos las imagenes en el cloudinary.

package.json

```jsx
"dependencies": {
    "bcrypt": "^5.1.0",
    "cloudinary": "^1.32.0",
    "compression": "^1.7.4",
    "config-yml": "^0.10.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "esm": "^3.2.25",
    "express": "^4.18.2",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.7.3",
    "multer": "^1.4.5-lts.1",
    "multer-storage-cloudinary": "^4.0.0"
  }
"devDependencies": {
    "eslint": "^8.28.0",
    "eslint-config-prettier": "^8.5.0",
    "jest": "^29.3.1",
    "nodemon": "^2.0.20",
    "prettier": "^2.8.0",
    "supertest": "^6.3.1"
  }, 
```

# 🧩 Comandos de Arranque

---

Los comandos que utilizaremos para el arranque del proyecto son:

- **start**: Lo utilizamos para arrancar el proyecto.
- **dev**: Es utilizado para el arranque del proyecto lo que lo diferencia de el comando “start” es que “dev” cuando cambia una parte del código y este es guardado, cogerá y ejecutará los cambios.
- **test**: este comando es utilizado para ejecutar el testing del proyecto.
- **format check**: se utiliza para verificar si sus archivos están formateados, en este caso en formato prettier.
- **format write**: Esto reescribe todos los archivos procesados en para que estén acorde con el formato de prettier.
- **lint check**: se utiliza para verificar si sus archivos están formateados en este caso en formato eslint.
- **lint fix**: con esto corrige los pequeños errores que contenga nuestro codigo.

package.json

```jsx
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest --runInBand --detectOpenHandles --forceExit",
    "format:check": "prettier --check .",
    "format:write": "prettier --write .",
    "lint:check": "eslint .",
    "lint:fix": "eslint src --fix --cache"
  },
```

# 🧩 Index

---

src/index.js

```jsx
const config = require('config-yml');
const app = require('./src/server');
const magic = require('./src/utils/magic');
//Esta primera linea de comando coge el config port y cuando el servidor arranca 
//muestra el mensaje de LogInfo añadiendo el port
app.listen(config.port, () => {
  magic.LogInfo(`Server running on http://localhost:${config.port}`);
});

//Y esto registra o almacena los posibles errores
app.on('err', (err) => {
  magic.LogDanger(err);
});
```

# 🧩 Controller

---

En el controlador de rutas crearemos nuestro `router` a través de `express` y solicitaremos los servicios que queremos lanzar en cada una de las rutas. Después importamos los middleware e introducimos cada verbo, su ruta y el middleware correspondiente a cada una de las funciones de los servicios que dispararán tanto el generador de respuestas como la funcionalidad en sí. Por último exportamos el router con todas las rutas implementadas.

src/controller/index.js

```jsx
	// Creamos el router.
const router = require('express').Router();

	// Importamos servicios.
const user = require('../domain/services/service-user');
const department = require('../domain/services/service-department');
const notice = require('../domain/services/service-notice');
const incident = require('../domain/services/service-incident');

	// Importamos middlewares.
const { isLogged } = require('../utils/middlewares/user-auth-middleware');
const { isAdmin } = require('../utils/middlewares/admin-auth-middleware');
const upload = require('../utils/middlewares/file');

	// Introducimos los verbos y rutas a cada función de servicios.
	// upload leerá y subirá la foto.
router.post('/users/register', upload.single('image'), user.Create);
router.post('/users/login', user.Login);
	// [isAdmin] y [isLogged] lo convierte en una ruta protegida.
router.get('/users', [isAdmin], user.GetAll);
router.get('/users/:id', user.GetOne);
router.get('/users/bynickname/:nickname',  [isAdmin], user.GetNickname);
router.get('/users/bynickname/:nickname', [isLogged], user.GetNickname);

...

	// Exportamos el router con todas las rutas implementadas.
module.exports = router;
```

# 🧩 Routes

---

Importamos todos los servicios del controlador, definimos en el argumento app la ruta principal donde estarán todas implementadas, y en un futuro el servidor.

src/routes/index.js

```jsx
	// Importamos los servicios.
const apiServices = require('../controller/index');

	// Definimos ruta principal donde estarán las demás implementadas.
const routes = (app) => {
  app.use('/api/v1', apiServices);
};

	// Exportamos las rutas.
module.exports = routes;
```

# 🧩 Server

---

Haremos uso de  `compression`, el cual devuelve un middleware que intentará comprimir las respuestas de las solicitudes. También implementaremos el servidor con la información parseada a todas las rutas creadas previamente

src/server/index.js

```jsx
	// Requerimos express cors, compression, dotenv y setUpCloudinary.
const express = require('express');
const cors = require('cors');
const compression = require('compression');

const dotenv = require('dotenv');
const { setUpCloudinary } = require('../utils/helpers/cloudinary');

	// Ejecutamos la configuración de dotenv.
dotenv.config();

	// Ejecutamos función que da acceso a Cloudinary.
setUpCloudinary();

const app = express();

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
	    // Si este encabezado esta presente no comprimirá las respuestas.
    return false;
  }
	  // Si no esta presente hacemos la compresión.
  return compression.filter(req, res);
};
	
app.use(compression({
	  // Decide si las respuestas deben ser comprimidas o no en base a la
		// función anterior.
  filter: shouldCompress,
	  // Definimos el umbral de bytes para considerar la compresión, por defecto es 1 Kb.
  threshold: 0
}));

	// Implementamos las cors.
app.use(cors());

	// Parseamos la información del servidor.
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

	// Introducimos las claves para la autorización de rutas.
app.set('userSecretKey', 'n30l4nDuser');
app.set('adminSecretKey', 'n30l4nDadmin');

	// Implementamos el servidor a todas las rutas creadas.
require('../routes')(app);

	// Exportamos el servidor
module.exports = app;
```

# 🧩 Domain

### ➤ Entity-user

---

Con este archivo generamos mediante moongose el esquema que utilizaremos como “esqueleto” de cada objeto en este caso usuario que se guardara en mongooDB, por cada modelo de datos se deberá de crear un esquema distinto. En  cada campo de el objeto se tipa y se define si es único, el tipo de de campo, o si es requerido o no.

src/domain/entities/entity-user.js

```jsx
const mongoose = require('mongoose');
//Lo exportamos para usarlo en otro archivo
module.exports = (db) => {
//Se le one un nombre al esquema
  const userSchema = new db.Schema(
    {
			//Definimos cada campo con su type y caracteristicas correspondientes
      username: { type: String, required: true },
      nickname: { type: String, required: true, unique: true },
      gmail: { type: String, required: true, unique: true },
      password: { type: String, required: true },
			//En este campo establecemos con el enum que solo podemos introducir user o admin
      role: { type: String, enum: ['user', 'admin'], required: true },

      image: { type: String },
			//En este campo aplicaremos un popup lo que hace que metiendo el id 
			//de otro objeto cargen los datos de el mismo
      department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'department',
        required: true,
      },
      incidents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'incident' }],
    },
    {
      timestamps: true,
    }
  );
  return db.model('user', userSchema);
};
```

### ➤ Orm-User

---

A la hora de registrar un nuevo usuario es importante respetar las regulaciones actuales como la GDPR (General Data Protection Regulation), que se aplica en los países miembros de la Unión Europea. Para respetar la privacidad de los usuarios y su seguridad, encriptamos la contraseña que recibimos en la `req` (petición), concretamente en la función `Create` (registro). Importante encriptar la contraseña antes de guardarla en la base de datos. Esto se consigue con el método `hashSync` de la librería `bcrypt`, siendo el primer argumento la contraseña de la que parte la encriptación y el segundo argumento el número de “steps” o iteraciones que se realizan en el cálculo computacional de dicha operación (se debe tener en cuenta que a mayor número de “steps” mayor rendimiento y, por ende, tiempo son requeridos).

src/domain/orm/orm-user.js

```jsx
exports.Create = async (req) => {
  try {
    const newUser = new db.User(req.body);
    console.log(newUser);
    const userNickname = await db.User.findOne({ nickname: newUser.nickname });
    const userGmail = await db.User.findOne({ gmail: newUser.gmail });
    const userExists = userNickname || userGmail;
    if (userExists) return magic.LogDanger('That user already exists');
		if (req.file) {
      newUser.image = req.file.path;
    }
		// Password encryptation before saving into database
    newUser.password = bcrypt.hashSync(newUser.password, 6);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    magic.LogDanger('User register failed', err);
    return await { err: { code: 123, message: err } };
  }
};
```

```jsx
exports.Login = async (req) => {
  try {
    const userByNickname = await db.User.findOne({
      nickname: req.body.nickname,
    });
    const userByGmail = await db.User.findOne({ gmail: req.body.gmail });
    const userInDB = userByNickname || userByGmail;
    if (!userInDB) return magic.LogDanger("Login credentials doesn't exist");
    // Comprobamos si la contraseña de login coincide con la encriptada en la base de
    // datos
    if (bcrypt.compareSync(req.body.password, userInDB.password)) {
      // Creamos un token para cada rol sirviéndonos de ºlas claves secretas guardadas en
			// el fichero de entorno .env (IMPORTANTE añadirlo a nuestro fichero .gitignore)
      const userToken = jwt.sign(
        { ...userInDB },
        req.app.get('userSecretKey'),
        {
          expiresIn: '1h',
        }
      );
      const adminToken = jwt.sign(
        { ...userInDB },
        req.app.get('adminSecretKey'),
        {
          expiresIn: '1h',
        }
      );
      // Eliminamos el rastro de la contraseña introducida sin encriptar
      userInDB.password = null;

      if (userInDB.role === 'admin') {
        return { user: userInDB, token: adminToken };
      } else {
        return { user: userInDB, token: userToken };
      }
    } else {
      return next('User password incorrect');
    }
  } catch (err) {
    magic.LogDanger('User login failed', err);
    return await { err: { code: 123, message: err } };
  }
};
```

### ➤ service-user

---

Con este archivo vamos a controlar los posibles errores para poder visualizar por el terminal e identificar de forma rápida el posible error.

src/domain/services/service-user.js

```jsx
const magic = require('../../utils/magic');
const enum_ = require('../../utils/enum');
const ormUser = require('../../domain/orm/orm-user');

//Con este export revisamos los posibles errores de GetAll
exports.GetAll = async (req, res) => {
//Creamos las variables que se rellenaran y mostraran en el mensaje de error
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
		//Guardamos el resultado de usar GetAll
    let resOrm = await ormUser.GetAll();
    if (resOrm.err) {
			//Con esto de devuelve el fallo y el codigo de error
      (status = 'Failure'),
        (errorcode = resOrm.err.code),
        (message = resOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
			//Si sale bien la conexion devolvera esto
    } else {
      (message = 'Success GetAll users'),
        (data = resOrm),
        (statuscode = data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    magic.LogDanger('err: ', err);
    response = await magic.ResponseService(
      'Failure',
      enum_.CODE_BAD_REQUEST,
      err,
      ''
    );
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};

//Con este export revisamos los posibles errores de Create
exports.Create = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    const { username, nickname, gmail, password, role, department, image } = req.body;
    if (username && nickname && gmail && password && role && department) {
      let resOrm = await ormUser.Create(req);
      if (resOrm.err) {
        (status = 'Failure'),
          (errorcode = resOrm.err.code),
          (message = resOrm.err.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'User created'),
          (data = resOrm),
          (statuscode = enum_.CODE_CREATED);
      }
    } else {
      (status = 'Failure'),
        (errorcode = enum_.ERROR_REQUIRED_FIELD),
        (message = 'Required fields incompleted'),
        (statuscode = enum_.CODE_BAD_REQUEST);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};

//Con este export revisamos los posibles errores de Login
exports.Login = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    const { nickname, gmail, password } = req.body;
    if ((nickname || gmail) && password) {
      let resOrm = await ormUser.Login(req);
      if (resOrm.err) {
        (status = 'Failure'),
          (errorcode = resOrm.err.code),
          (message = resOrm.err.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'User logged'),
          (data = resOrm),
          (statuscode = enum_.CODE_CREATED);
      }
    } else {
      (status = 'Failure'),
        (errorcode = enum_.ERROR_REQUIRED_FIELD),
        (message = 'Required field incorrect'),
        (statuscode = enum_.CODE_BAD_REQUEST);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};

//Con este export revisamos los posibles errores de Update
exports.Update = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    let resOrm = await ormUser.Update(req);
    if (resOrm.err) {
      (status = 'Failure'),
        (errorcode = resOrm.err.code),
        (message = resOrm.err.messsage),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'User updated'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};

//Con este export revisamos los posibles errores de Delete
exports.Delete = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    let resOrm = await ormUser.Delete(req);
    if (resOrm.err) {
      (status = 'Failure'),
        (errorcode = resOrm.err.code),
        (message = resOrm.err.messsage),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'User deleted'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};

//Con este export revisamos los posibles errores de GeOne
exports.GetOne = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    let resOrm = await ormUser.GetOne(req);
    if (resOrm.err) {
      (status = 'Failure'),
        (errorcode = resOrm.err.code),
        (message = resOrm.err.messsage),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'User has been found'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};

//Con este export revisamos los posibles errores de GetNickname
exports.GetNickname = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    let resOrm = await ormUser.GetNickname(req);
    if (resOrm.err) {
      (status = 'Failure'),
        (errorcode = resOrm.err.code),
        (message = resOrm.err.messsage),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'User has been found'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};
```

### ➤ mongo.repository

---

Mediante este archivo de configuración somos capaces de realizar la conexión a la base de datos para realizar peticiones a la base de datos, en él se usa la url necesaria y los apartados que tendrá la base de datos.

src/domain/repositories/mongo.repository.js

```jsx
const config = require('config-yml');
const mongoose = require('mongoose');
const magic = require('../../utils/magic');
const dotenv = require('dotenv');

const user = require('../entities/entity-user');
const incident = require('../entities/entity-incident');
const notice = require('../entities/entity-notice');
const department = require('../entities/entity-department');

//Configuramos dotenv para tener acceso a las variables de entorno
dotenv.config();

//Inicializamos un objeto llamado db en el cual almacenarmos de manera
//"local" la información de la conexión y qué esquemas incluirá la 
//lógica de las distintas peticiones
let db = {};

//Si se cumple, recorremos mongodb y por cada una de las conexiones que
//le inyectemos generaremos claves nuevas en nuestro objeto db local.

//Además de la clave, le pasaremos mongoose tal como definimos en el modelo para
//que desde el propio modelo gestione la conexión con Mongo.

//Y exportamos db para utilizarlo en cualquier punto.
if (config.db.mongodb && config.db.mongodb.length > 0) {
    config.db.mongodb.map((c) => {
      mongoose.connect('', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db[c.nameconn] = {};
      db[c.nameconn].conn = mongoose;
      db[c.nameconn].User = user(mongoose);
      db[c.nameconn].Incident = incident(mongoose);
      db[c.nameconn].Department = department(mongoose);
      db[c.nameconn].Notice = notice(mongoose);
    });
    exports.db = db;
    magic.LogInfo('Conectado a la base de datos 🚀');
  } else {
    magic.LogDanger('No existe la base de datos 💥');
  }
```

# 🧩 Utils

## Helpers

---

### ➤ cloudinary

Establecemos los parámetros de configuración globalmente.

src/utils/helpers/cloudinary.js

```jsx
	// Requerimos cloudinary.
const cloudinary = require("cloudinary");

	// Establecemos parámetros de configurción.
const setUpCloudinary = () => {
  cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: '',
  });
};

	// Exportamos los parámetros.
module.exports = { setUpCloudinary };
```

### ➤ error

Creamos una función para controlar los errores

src/utils/helpers/error.js

```jsx
	// Creamos la función que nos devuelve el error con un código de error y un mensaje.
const setError = (code, message) => {
  console.log(code, message);
  const err = new Error();
  err.code = code;
  err.message = message;
  return err;
};

	// Exportamos la función.
module.exports = { setError };
```

## Middlewares

---

### ➤ admin/user-auth-middleware

Creamos la autenticación, diseñada para bloquear el acceso a determinadas rutas, cuyo acceso depende del rol del usuario, diferenciando entre `admin` y `user`. Es decir intercepta la ruta antes de hacer la petición. 

Divido en dos archivos, uno por autorización, exactamente iguales cambiando solo el tipo de rol.

src/utils/middlewares/admin-auth-middleware.js

```jsx
	// Importamos jsonwebtoken y la función error creada anteriormente.
const jwt = require('jsonwebtoken');

const { setError } = require('../helpers/error');

	// Creamos el middleware
const isLogged = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) return res.json(setError(401, 'Not authorized'));

		// Separamos Bearer del token
  const splits = authorization.split(' ');
  if (splits.length != 2 || splits[0] != 'Bearer')
    return res.json(setError(400, 'Not Bearer'));
  const jwtStringify = splits[1];
  try {
			// Comprobamos que el token es válido
    var token = jwt.verify(jwtStringify, req.app.get('userSecretKey'));
  } catch (err) {
    return res.json(setError(500, 'Token invalid'));
  }
	// Devolvemos el token
 const authority = {
   id: token.id,
   name: token.name,
  };
  req.authority = authority;
  next();
};

	// Exportamos el middleware
module.exports = { isLogged };
```

### ➤ delete-file

Archivo donde se crea la función que elimina fotos en cloudinary desde nuestra app.

src/utils/middlewares/delete-file.js

```jsx
const cloudinary = require("cloudinary").v2;

const deleteFile = (imgUrl) => {
  const imgSplited = imgUrl.split("/");
  const nameSplited = imgSplited[imgSplited.length - 1].split(".");
  const folderSplited = imgSplited[imgSplited.length - 2];
  const public_id = `${folderSplited}/${nameSplited[0]}`;
  cloudinary.uploader.destroy(public_id, () => {
    console.log("Image delete in cloudinary");
  });
};

module.exports = { deleteFile };
```

### ➤ file

Aquí hacemos uso de multer, un motor de almacenamiento múltiple para Cloudinary .

src/utils/middlewares/file.js

```jsx
	// Requerimos multer, cloudinary y CloudinaryStorage.
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

	// Asignamos el almacenamiento
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
		// Le pasamos por params el nombre de la carpeta de Cloudinary y el tipo de formato
		// soportado.
  params: {
    folder: "carpeta",
    allowedFormats: ["jpg", "png", "jpeg", "gif"],
  },
});

	// Asignamos a upload el almacenamiento definido y lo exportamos.
const upload = multer({ storage });
module.exports = upload;
```

## Enum

---

Archivo en el cual definimos los colores y valores numéricos para diferentes códigos de estado.

src/utils/enum.js

```jsx
// Definimos los colores que mostrar en la terminal.
exports.BLACK_LOG = '\x1b[30m%s\x1b[0m';
exports.RED_LOG = '\x1b[31m%s\x1b[0m';
exports.GREEN_LOG = '\x1b[32m%s\x1b[0m';

...

// Definimos los valores numéricos para diferentes códigos de estado.
exports.CODE_CONTINUE = 100;
exports.CODE_SWITCHING_PROTOCOLS = 101;
exports.CODE_PROCESSING = 102;

...
```

## Magic

---

Donde generamos una respuesta a partir de una serie de argumentos recibidos, los cuales forman un objeto informativo con estatus e info. Esta respuesta será la que recibamos al realizar una petición.

src/utils/magic.js 

```jsx
	// Requerimos enum.
const enum_ = require('./enum')

 // Exportamos la función que genera la respuesta al realizar la petición.
exports.ResponseService  = async (status, errorCode, message, data) => {
  return await {
    status: status,
    info: {
      errorCode: errorCode,
      message: message,
      data: data,
    },
  };
};

	// Exportamos diferentes funciones que muestran por consola un mensaje
	// en varios colores para conocer el estado del log.
exports.LogSuccess = (msg) => {
  console.log(enum_.GREEN_LOG, msg);
};
exports.LogInfo = (msg) => {
  console.log(enum_.CYAN_LOG, msg);
};

...
```

# 🧩 Testing

---

Para realizar el testing de nuestro trabajo haremos uso de la librería de JavaScript  `supertest` junto con `jest`.  Obviamente debemos importar supertest, a su vez importamos express y nuestro router creado y modificado en `../controller/index`. A partir de aquí creamos una nueva aplicación de express y le asignamos el router previamente importado. Ya podemos implementar testing siguiendo la sintaxis y métodos de `supertest` con su consiguiente ejecución con `jest`.

src/__test__/routes.test.js

```jsx
const request = require('supertest');
const express = require('express');
const router = require('../controller/index');

const cors = require('cors');
// Creamos una nueva aplicación de express
const app = new express();
// Le asignamos el router creado y modificado previamente
app.use('/', router);
// Realizamos el testing deseado
describe('Routes testing', () => {
  it('responds to /users/:id', async () => {
    const res = await request(app).get('/users/6380d76a2d9a3a8b19572ffe');
    expect(res.statusCode).toBe(201);
    expect(res.body.info.data.gmail).toContain('@gmail.com');
  });

  it('responds to /notices', async () => {
    const res = await request(app).get('/notices');
    expect(res.statusCode).toBe(200);
    res.body.info.data.forEach((notice) => {
      expect(notice.departments).not.toHaveLength(0);
    });
  });
});
```