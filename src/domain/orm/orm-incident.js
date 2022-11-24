const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

exports.GetAll = async () => {
  try {
    return await conn.db.connMongo.Incident.find();
  } catch (err) {
    magic.LogDanger('Cannot getAll incidents', err);
    return await { err: { code: 123, message: err } };
  }
};
exports.Create = async (req, res) => {
  try {
    const newIncident = new db.Incident(req.body);
    const savedIncident = await newIncident.save();
    return res.status(201).json(savedIncident);
  } catch (err) {
    magic.LogDanger('Incident create failed', err);
    return await { err: { code: 123, message: err } };
  }
};
