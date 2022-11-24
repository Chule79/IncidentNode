const router = require('express').Router();
const user = require('../domain/services/service-user');
const department = require('../domain/services/service-department');
const notice = require('../domain/services/service-notice');
const incident = require('../domain/services/service-incident');

router.post('/users', user.Create);
router.get('/users', user.GetAll);
router.port('/departments', department.Create);
router.get('/departments', department.GetAll);
router.post('/notices', notice.Create);
router.get('/notices', notice.GetAll);
router.get('/incidents', incidents.Create);
router.get('/incidents', incidents.GetAll);

module.exports = router;
