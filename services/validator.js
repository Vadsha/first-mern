const jwt = require('jsonwebtoken');

let bodyValidator = (schema) => {
       return (req , res , next) => {
            let result = schema.validate(req.body);
            if (result.error) {
                  next(new Error(result.error.details[0].message));
            } else {
                  next();
            }
       }
}

let slugValidator = (schema , key) => {
      return (req , res , next) => {
            let obj = {};
            obj[key] = key;
            let result = schema.validate(obj);
            if (result.error) {
                  next(new Error(result.error.details[0].message));
            } else {
                  next();
            }
      }
}

let tokenValidator = () => {
      return (req , res , next) => {
            if (req.headers.authorization) {
                  let token = req.headers.authorization.split(" ")[1];
                  req.token = jwt.verify(token , process.env.SECRET_KEY)
                  next();
            } else {
                  next(new Error('token not found!'));
            }
      }
}

module.exports = {
      bodyValidator,
      slugValidator,
      tokenValidator
}