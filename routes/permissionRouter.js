const router = require('express-promise-router')();
const controller = require('../controllers/PermissionController');

router.get('/' , controller.index);
router.post('/' , controller.store);
router.patch('/:id' , controller.patch);
router.delete('/:id' , controller.drop);

module.exports = router;