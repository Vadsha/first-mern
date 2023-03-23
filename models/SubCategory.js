const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
      name : { type : String , required : true , unique : true },
      slug : {type : String , required : true , unique : true},
      created : { type : Date , default : Date.now },
      deleted : { type : Boolean , default : false }
})

module.exports = SubCategory = mongoose.model('sub_categories' , SubCategorySchema);