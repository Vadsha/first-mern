const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
      category : {type : Schema.Types.ObjectId , ref : "categories" },
      name : { type : String , required : true , unique : true },
      slug : {type : String , required : true , unique : true},
      created : { type : Date , default : Date.now },
      deleted : { type : Boolean , default : false },
      child_categories : [
            {
                  type : Schema.Types.ObjectId,
                  ref : "child_categories"
            }
      ]
})

module.exports = SubCategory = mongoose.model('sub_categories' , SubCategorySchema);