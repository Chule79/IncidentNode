const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

exports.GetAll = async () => {
  try {
    return await conn.db.connMongo.Notice.find();
  } catch (err) {
    magic.LogDanger('Cannot getAll notices', err);
    return await { err: { code: 123, message: err } };
  }
};

exports.Create = async (Title, Description, Departments) => {
  try {
    const data = await new conn.db.connMongo.Notice({
      title: Title,
      description: Description,
      departments: Departments,
    });
    data.save();
    return true;
  } catch (err) {
    magic.LogDanger('Cannot create notice', err);
    return await { err: { code: 123, message: err } };
  }
};
