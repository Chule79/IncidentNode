const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

exports.GetAll = async () => {
  try {
    return await conn.db.connMongo.Incident.find();
  } catch (error) {
    magic.LogDanger('Cannot getAll incidents', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Create = async (Title, Poster) => {
  try {
    const data = await new conn.db.connMongo.Movie({
        title: Title,
        description: Description,
        photos: Photos,
        state: State,
        responsibles: Responsibles, 
        user: User,
        departament: Departament
    });
    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create incident', error);
    return await { err: { code: 123, message: error } };
  }
};
