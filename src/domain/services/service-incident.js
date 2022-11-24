const magic = require('../../utils/magic');
const enum_ = require('../../utils/enum');
const ormIncident = require('../orm/orm-incident');

exports.GetAll = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormIncident.GetAll();
    if (resOrm.err) {
      (status = 'Failure'),
        (errorcode = resOrm.err.code),
        (message = resOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success GetAll incidents'),
        (data = resOrm),
        (statuscode = data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    magic.LogDanger('err: ', err);
    response = await magic.ResponseService(
      'Failure',
      enum_.CODE_BAD_REQUEST,
      err,
      ''
    );
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};

exports.Create = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    const {
      title,
      description,
      photos,
      state,
      responsibles,
      user,
      departament,
    } = req.body;
    if (title && description && state && responsibles && user && departament) {
      let res = await ormIncident.Create(req.body);
      if (resOrm.err) {
        (status = 'Failure'),
          (errorcode = resOrm.err.code),
          (message = resOrm.err.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'Incident created'), (statuscode = enum_.CODE_CREATED);
      }
    } else {
      (status = 'Failure'),
        (errorcode = enum_.ERROR_REQUIRED_FIELD),
        (message = 'Required fields incompleted'),
        (statuscode = enum_.CODE_BAD_REQUEST);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};
