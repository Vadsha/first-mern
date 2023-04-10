const Permission = require('../models/Permission');
const Role = require('../models/Role');
const base = require('../services/base');

let index = async (req , res , next ) => {
      let result = await Permission.find().populate({
            path : 'role',
            model : Role
      });
      if (result.length > 0) {
            base.fmsg(res , result , "Fetched all permissions . . ");
      }
      else {
            base.fmsg(res , [] , "No permission is on record");
      }
}

let store = async (req , res , next) => {
      let role = await Role.findById(req.body.role);
      let exist = await Permission.findOne({name : req.body.name});
      if (!exist) {
            let result = new Permission(req.body);
            await result.save();
            await Role.findByIdAndUpdate(req.body.role , {$push : {permissions : req.body.role}});
            base.fmsg(res , result , 'Created permission');
      } else {
            next(new Error('Permission already exists'));
      }
}

let patch = async (req , res , next ) => {
      let exist = await Permission.findById(req.params.id);
      if (exist) {
            let result = await Permission.findByIdAndUpdate(req.params.id ,                   
            {
                  name : req.body.name,
            });

            base.fmsg(res , result , `updated successfully`);
      } else {
            next(new Error('Permission not found'));
      }
}

let drop = async (req , res , next) => {
      let exist = await Permission.findById(req.params.id);
      if (exist) {
            await Permission.findByIdAndDelete(req.params.id);
            base.fmsg(res , {} , "deleted");
      } else {
            next(new Error('No Permission found...'));
      }
}

module.exports = {
      index,
      store,
      patch,
      drop
}