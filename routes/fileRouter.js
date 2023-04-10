const router = require('express-promise-router')();
const controller = require('../controllers/FileController');

router.get('/' , controller.index);
router.post('/' , controller.store);
router.get('/:id' , controller.show);
router.patch('/:id' , controller.patch);
router.delete('/:id' , controller.drop);

module.exports = router;