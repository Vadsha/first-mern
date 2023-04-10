const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
      name : { type : String , required : true , unique : true },
      permissions : [{
            type : Schema.Types.ObjectId,
            ref : 'permissions'
      }],
      users : [{
            type : Schema.Types.ObjectId,
            ref : 'users'
      }]
})

module.exports = Role = mongoose.model('roles' , RoleSchema);