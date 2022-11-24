const router = require('express').Router();
const user = require('../domain/services/service-user');
const department = require('../domain/services/service-department');
const notice = require('../domain/services/service-notice');
const incident = require('../domain/services/service-incident');
const isAuth = require('../utils/middlewares/auth-middleware');

router.post('/users/register', user.Create);
router.post('/users/login', user.Login);
router.get('/users', user.GetAll);
router.post('/departments', department.Create);
router.get('/departments', department.GetAll);
router.post('/notices', notice.Create);
router.get('/notices', notice.GetAll);
router.post('/incidents', incident.Create);
router.get('/incidents', incident.GetAll);

module.exports = router;
