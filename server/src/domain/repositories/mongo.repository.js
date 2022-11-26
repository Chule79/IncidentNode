const config = require('config-yml');
const mongoose = require('mongoose');
const magic = require('../../utils/magic');
const dotenv = require('dotenv');

const user = require('../entities/entity-user');
const incident = require('../entities/entity-incident');
const notice = require('../entities/entity-notice');
const department = require('../entities/entity-department');



dotenv.config();

let db = {};

if (config.db.mongodb && config.db.mongodb.length > 0) {
    config.db.mongodb.map((c) => {
      mongoose.connect('mongodb+srv://root:root@cluster0.aff5ddu.mongodb.net/incidentnode?retryWrites=true&w=majority', {
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