const router = require('express-promise-router')();
let controller = require('../controllers/userController');

router.get('/' , controller.all);
router.post('/register' , controller.register);
module.exports = router;