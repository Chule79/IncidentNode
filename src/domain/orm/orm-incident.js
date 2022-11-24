const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

const db = conn.db.connMongo;

exports.GetAll = async () => {
  try {
    return await db.Incident.find().populate('responsibles user department');
  } catch (err) {
    magic.LogDanger('Cannot getAll incidents', err);
    return await { err: { code: 123, message: err } };
  }
};

exports.GetOne = async (req) => {
  try {
    const { id } = req.params;
    const incident = await db.Incident.findById(id).populate(
      'responsibles user department'
    );
    return incident;
  } catch (error) {
    magic.LogDanger('Cannot getAll incidents', err);
    return { err: { code: 123, message: err } };
  }
};

exports.Update = async (req) => {
  try {
    const { id } = req.params;
    const incident = new db.Incident(req.body);
    incident._id = id;
    const updateIncident = await db.Incident.findByIdAndUpdate(id, incident);
    return updateIncident;
  } catch (error) {
    magic.LogDanger('Cannot getAll incidents', err);
    return { err: { code: 123, message: err } };
  }
};

exports.Delete = async (req) => {
  try {
    const { id } = req.params;
    const updateIncident = await db.Incident.findByIdAndDelete(id);
    return updateIncident;
  } catch (error) {
    magic.LogDanger('Cannot getAll incidents', err);
    return { err: { code: 123, message: err } };
  }
};

exports.Create = async (req) => {
  try {
    const newIncident = new db.Incident(req);
    if (req.file) {
      newIncident.photos = req.file.path;
    }
    const newIncidentDB = db.Incident(req.body);
    const savedIncident = await newIncidentDB.save();
    return savedIncident;
  } catch (err) {
    magic.LogDanger('Incident create failed', err);
    return await { err: { code: 123, message: err } };
  }
};
