const router = require('express-promise-router')();
const controller = require('../controllers/CategoryController');
const { CategorySchema , CommonSchema } = require('../services/Schema');
const {bodyValidator , slugValidator} = require('../services/validator');


router.get('/' , controller.index);
router.post('/' ,  [bodyValidator(CategorySchema.add) , controller.store]);
router.get('/:slug' , [slugValidator(CommonSchema.param , 'slug') , controller.show]);
router.patch('/:slug' , [bodyValidator(CategorySchema.patch) , slugValidator(CommonSchema.param , 'slug') , controller.patch]);
router.delete('/:slug' , [slugValidator(CommonSchema.param , 'slug') , controller.drop]);


module.exports = router;