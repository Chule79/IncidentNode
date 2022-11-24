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
    let res = await ormIncident.GetAll();
    if (res.err) {
      (status = 'Failure'),
        (errorcode = res.err.code),
        (message = res.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success GetAll incidents'),
        (data = respOrm),
        (statuscode = data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    magic.LogDanger('error: ', error);
    response = await magic.ResponseService(
      'Failure',
      enum_.CODE_BAD_REQUEST,
      error,
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
    const { title, description, photos, state, responsibles, user, departament } = req.body;
    if (title && description && state && responsibles && user && departament) {
      let res = await ormIncident.Create(
        title,
        description,
        photos,
        responsibles,
        user,
        departament
      );
      if (res.err) {
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
  } catch (error) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};
