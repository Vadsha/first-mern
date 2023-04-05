const router = require('express-promise-router')();
const controller = require('../controllers/SubCategoryController');
const {bodyValidator , slugValidator} = require('../services/validator');
const {SubCategorySchema , CommonSchema} = require('../services/Schema');

router.get('/' , controller.index);
router.post('/' , [bodyValidator(SubCategorySchema.add) , controller.store]);
router.get('/:slug' , [slugValidator(CommonSchema.param , 'slug') , controller.show]);
router.patch('/:slug' , [slugValidator(CommonSchema.param , 'slug') , bodyValidator(SubCategorySchema.patch) , controller.patch]);
router.delete('/:slug' , [slugValidator(CommonSchema.param , 'slug')]);

module.exports = router;