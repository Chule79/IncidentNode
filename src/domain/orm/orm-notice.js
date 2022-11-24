const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

exports.GetAll = async () => {
  try {
    return await conn.db.connMongo.Notice.find();
  } catch (error) {
    magic.LogDanger('Cannot getAll notices', error);
    return await { err: { code: 123, message: error } };
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
  } catch (error) {
    magic.LogDanger('Cannot create notice', error);
    return await { err: { code: 123, message: error } };
  }
};
