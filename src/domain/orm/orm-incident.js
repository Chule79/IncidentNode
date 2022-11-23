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
exports.Create = async (req, res) => {
  try {
    const newIncident = new db.Incident(req.body);
    const savedIncident = await newIncident.save();
    return res.status(201).json(savedIncident);
  } catch (error) {
    magic.LogDanger('Incident create failed', error);
    return await { err: { code: 123, message: error } };
  }
};
