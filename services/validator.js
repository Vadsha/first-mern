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

module.exports = {
      bodyValidator,
      slugValidator
}