const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
      name : {
            type : String ,
            required : true ,
            unique : true
      },
      role : {
            type : Schema.Types.ObjectId,
            ref : 'roles'
      }
})

module.exports = Permission = mongoose.model('permissions' , PermissionSchema);