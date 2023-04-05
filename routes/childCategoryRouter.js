const router = require('express-promise-router')();
const controller = require('../controllers/ChildCategoryController');
const {bodyValidator , slugValidator} = require('../services/validator');
const {ChildCategorySchema, CommonSchema} = require('../services/Schema');

router.get('/' , controller.index);
router.post('/' , [bodyValidator(ChildCategorySchema.add) , controller.store]);
router.get('/:slug' , [slugValidator(CommonSchema.param , 'slug') , controller.show])
router.patch('/:slug' , [slugValidator(CommonSchema.param , 'slug') , bodyValidator(ChildCategorySchema.patch) , controller.patch])
router.delete('/:slug' , [slugValidator(CommonSchema.param , 'slug')]);

module.exports = router;