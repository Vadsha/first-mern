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
            let result = await new User(req.body);
            await result.save();
            base.fmsg(res , result , 'User created..')
      } else{
            next(new Error('user exists!'));
      }
}

let login = async (req , res , next) => {
      let existEmail = await User.findOne({email : req.body.email});
      if (existEmail) {
            if ( req.body.password && base.comparePassword(req.body.password , existEmail.password)) {
                  let user = existEmail.toObject();
                  delete user.password;
                  user['token'] = base.generateToken(user);
                  base.fmsg(res , user , 'logged in . . .');
            } else {
                  next(new Error('password does not match . . .'));
            }
      } else {
            next(new Error('there is no user with this email'));
      }
}

module.exports = {
      all , 
      register,
      login
}