const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

const {deleteFile} = require('../../utils/middlewares/delete-file')

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

    const incidentInDB = await db.Incident.findById(id);

    const merge = {
      ...incidentInDB._doc,
      ...req.body,
    };
    const incidentUpdate = new db.Incident(merge);
    incidentUpdate._id = id;

    const updateIncident = await db.Incident.findByIdAndUpdate(
      id,
      incidentUpdate
    );
    return updateIncident;
  } catch (error) {
    magic.LogDanger('Cannot getAll incidents', err);
    return { err: { code: 123, message: err } };
  }
};

exports.Delete = async (req) => {
  try {
    const { id } = req.params;
    const deleteIncident = await db.Incident.findByIdAndDelete(id);
    let carrete = deleteIncident.photos;
    if (carrete) {
      carrete.forEach((photo) => {
        deleteFile(photo);
      })}
    return deleteIncident;
  } catch (error) {
    magic.LogDanger('Cannot getAll incidents', err);
    return { err: { code: 123, message: err } };
  }
};

exports.Create = async (req) => {
  try {
    const newIncident = new db.Incident(req.body);
    if (req.file) {
      newIncident.photos = req.file.path;
    }

    const savedIncident = await newIncident.save();
    return savedIncident;
  } catch (err) {
    magic.LogDanger('Incident create failed', err);
    return await { err: { code: 123, message: err } };
  }
};
