const router = require('express').Router();
const user = require('../domain/services/service-user');
const department = require('../domain/services/service-department');
const notice = require('../domain/services/service-notice');
const incident = require('../domain/services/service-incident');

const { isLogged } = require('../utils/middlewares/user-auth-middleware');
const { isAdmin } = require('../utils/middlewares/admin-auth-middleware');

const upload = require('../utils/middlewares/file');

router.post('/users/register', upload.single('image'), user.Create);
router.post('/users/login', user.Login);
router.get('/users', [isAdmin], user.GetAll);
router.get('/users/:id', [isLogged] || [isAdmin], user.GetOne);
router.patch('/users/:id', [isLogged] || [isAdmin], user.Update);
router.delete('/users/:id', [isAdmin], user.Delete);
router.post('/departments', [isAdmin], department.Create);
router.get('/departments', [isLogged] || [isAdmin], department.GetAll);
router.get('/departments/:id', [isLogged] || [isAdmin], department.GetOne);
router.patch('/departments/:id', [isAdmin], department.Update);
router.delete('/departments/:id', [isAdmin], department.Delete);
router.post('/notices', [isAdmin], notice.Create);
router.get('/notices', [isLogged] || [isAdmin], notice.GetAll);
router.get('/notices/:id', [isLogged] || [isAdmin], notice.GetOne);
router.patch('/notices/:id', [isAdmin], notice.Update);
router.delete('/notices/:id', [isAdmin], notice.Delete);
router.post(
  '/incidents',
  [isLogged] || [isAdmin],
  upload.single('photos'),
  incident.Create
);
router.get('/incidents', [isLogged] || [isAdmin], incident.GetAll);
router.get('/incidents/:id', [isLogged] || [isAdmin], incident.GetOne);
router.patch('/incidents/:id', [isLogged] || [isAdmin], incident.Update);
router.delete('/incidents/:id', [isAdmin], incident.Delete);

module.exports = router;
