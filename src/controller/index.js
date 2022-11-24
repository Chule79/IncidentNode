const router = require('express').Router();
const user = require('../domain/services/service-user');
const department = require('../domain/services/service-department');
const notice = require('../domain/services/service-notice');
const incident = require('../domain/services/service-incident');

router.post('/users', user.Create);
router.get('/users', user.GetAll);
router.post('/departments', department.Create);
router.get('/departments', department.GetAll);
router.post('/notices', notice.Create);
router.get('/notices', notice.GetAll);
router.post('/incidents', incident.Create);
router.get('/incidents', incident.GetAll);

router.get('/incidents/:id', incident.GetOne);
router.patch('/incidents/:id', incident.Update);
router.delete('/incidents/:id', incident.Delete);

module.exports = router;
