import { Div } from '../UI-components/Div-styles';

const Home = () => {
  return (
    <>
      <Div
        width="100vw"
        height="100vh"
        backgr="blue"
        display="flex"
        justify="center"
        align="center"
      >
        <Div
          width="40%"
          height="55%"
          backgr="red"
          display="flex"
          justify="center"
          align="center"
          flexdir="column"
        >
          <img src="https://res.cloudinary.com/dcssmtpvq/image/upload/v1669457199/incidencias_zjf8ew.png"/>
          <form className="formInicio">
            <div className="divName">
              <label htmlFor="name">
                <a className="asterisco">*</a> Nombre de usuario:
              </label>
              <input type="text" name="name" className="inputsInicio" />
            </div>
            <div className="divName">
              <label htmlFor="passw">
                <a className="asterisco">*</a> Contraseña:
              </label>
              <input
                type="password"
                name="passw"
                className="inputsInicio"
                id="password"
              />
            </div>

            <div className="formOpciones">
              <div className="rememberMe">
                <input type="checkbox" name="remember" className="checkIni" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <div>
                <a className="olvide">Olvidè Contraseña</a>
              </div>
            </div>

            <input type="submit" value="Iniciar sesión" className="botonInic"></input>
          </form>
        </Div>
      </Div>
    </>
  );
};

export default Home;
