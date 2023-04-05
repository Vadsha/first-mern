const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChildCategorySchema = new Schema({
      name : { type : String , required : true , unique : true },
      slug : {type : String , required : true , unique : true},
      created : { type : Date , default : Date.now },
      deleted : { type : Boolean , default : false },
      sub_category : {
            type : Schema.Types.ObjectId,
            ref : "sub_categories"
      }
})

module.exports = ChildCategory = mongoose.model('child_categories' , ChildCategorySchema);