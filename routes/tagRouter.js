const router = require('express-promise-router')();
const controller = require('../controllers/TagController');

router.get('/' , controller.index);
router.post('/' , controller.store);
router.get('/:slug' , controller.show);
router.patch('/:slug' , controller.patch);
router.delete('/:slug' , controller.drop);

module.exports = router;