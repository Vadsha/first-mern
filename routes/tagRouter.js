const router = require('express-promise-router')();
const controller = require('../controllers/TagController');
const {bodyValidator , slugValidator} = require('../services/validator');
const {TagSchema , CommonSchema} = require('../services/Schema');

router.get('/' , controller.index);
router.post('/' , [bodyValidator(TagSchema.add)]);
router.get('/:slug' , [slugValidator(CommonSchema.param , 'slug') , controller.show]);
router.patch('/:slug' , [slugValidator(CommonSchema.param , 'slug') , bodyValidator(TagSchema.patch) , controller.patch]);
router.delete('/:slug' , [slugValidator(CommonSchema.param , 'slug') , controller.drop]);

module.exports = router;