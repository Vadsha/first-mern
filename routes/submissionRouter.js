const router = require('express-promise-router')();
let controller = require('../controllers/UserSubmission');

router.get('/' , controller.all);
router.post('/register' , controller.register);
router.post('/login' , controller.login);
module.exports = router;