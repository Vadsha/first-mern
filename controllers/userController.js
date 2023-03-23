const User = require('../models/User');
const base = require('../services/base.js');

let all = async(req , res , next) => {
      let result = await User.find();
      base.fmsg(res , result , "Fetched all users . . ");
}

let register = async(req , res , next) => {
      let exists = await User.findOne({email : req.body.name});
      if (!exists) {
            req.body.password = base.encode(req.body.password);
            res.status(200).json({data : req.body});
            let result = await new User(req.body);
            await result.save();
            base.fmsg(res , result , 'User created..')
      } else{
            next(new Error('user exists!'));
      }
}


module.exports = {
      all , 
      register
}