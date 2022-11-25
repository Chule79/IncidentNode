const magic = require('../../utils/magic');
const enum_ = require('../../utils/enum');
const ormDepartment = require('../../domain/orm/orm-department');

exports.GetAll = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormDepartment.GetAll();
    if (resOrm.err) {
      (status = 'Failure'),
        (errorcode = resOrm.err.code),
        (message = resOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success GetAll departments'),
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
    const { name } = req.body;
    if (name) {
      let resOrm = await ormDepartment.Create(req.body);
      if (resOrm.err) {
        (status = 'Failure'),
          (errorcode = resOrm.err.code),
          (message = resOrm.err.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'Department created'),
          (statuscode = enum_.CODE_CREATED),
          (data = resOrm);
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

exports.GetOne = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormDepartment.GetOne(req);
    if (resOrm.err) {
      (status = 'Failure'),
        (errorcode = resOrm.err.code),
        (message = resOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success GetOne department'),
        (data = resOrm),
        (statuscode =
          Object.keys(data).length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
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

exports.Update = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormDepartment.Update(req);
    if (resOrm.err) {
      (status = 'Failure'),
        (errorcode = resOrm.err.code),
        (message = resOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success Update department'),
        (data = resOrm),
        (statuscode =
          Object.keys(data).length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
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

exports.Delete = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormDepartment.Delete(req);
    if (resOrm.err) {
      (status = 'Failure'),
        (errorcode = resOrm.err.code),
        (message = resOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success Delete department'),
        (data = resOrm),
        (statuscode =
          Object.keys(data).length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
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
