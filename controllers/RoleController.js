const Role = require('../models/Role');
const base = require('../services/base');

let index = async (req , res , next ) => {
      let result = await Role.find();
      if (result.length > 0) {
            base.fmsg(res , result , "Fetched all roles . . ");
      }
      else {
            base.fmsg(res , [] , "No role is on record");
      }
}

let store = async (req , res , next) => {
      // base.fmsg(res , req.body , 'sui');
      let exist = await Permission.findOne({name : req.body.name});
      if (!exist) {
            let result = new Role();
            result.name = req.body.name;
            await result.save();
            base.fmsg(res , result , 'Created role');
      } else {
            next(new Error('Role already exists'));
      }
}

module.exports = {
      index,
      store
};