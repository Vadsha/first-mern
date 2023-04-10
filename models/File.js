const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
      name : {
            type : String ,
            required : true,
      },
      file : {
            type  : String,
            required : true
      },
      created : {
            type : Date,
            default : Date.now,
      },
      deleted : {
            type : Boolean,
            default : false
      }
})
module.exports = File = mongoose.model('files' , FileSchema);