const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

const db = conn.db.connMongo;

exports.GetAll = async () => {
  try {
    return await db.Incident.find();
  } catch (err) {
    magic.LogDanger('Cannot getAll incidents', err);
    return await { err: { code: 123, message: err } };
  }
};
exports.Create = async (info) => {
  try {
    const newIncident = new db.Incident(info);
    const savedIncident = await newIncident.save();
    return savedIncident;
  } catch (err) {
    magic.LogDanger('Incident create failed', err);
    return await { err: { code: 123, message: err } };
  }
};
