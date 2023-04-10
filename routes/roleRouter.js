const router = require('express-promise-router')();
const controller = require('../controllers/RoleController');

router.get('/' , controller.index);
router.post('/' , controller.store);

module.exports = router;