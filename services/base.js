const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
      
      fmsg : (res , data , message) => {
            res.status(200).json({condition : true , data : data , message : message});
      },

      encode : (payload) => bcrypt.hashSync(payload , 8),

      comparePassword : (password , hash) => bcrypt.compareSync(password , hash),

      generateToken : (user) => {
            return jwt.sign({
                  exp: Math.floor(Date.now() / 1000) + (60 * 60),
                  data: user
                }, process.env.SECRET_KEY);
      },

      createSlug : (name) => {
            let slug = name.toLowerCase();
            slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
            slug = slug.replace(/ /gi, "-");
            slug = slug.replace(/\-\-\-\-\-/gi, '-');
            slug = slug.replace(/\-\-\-\-/gi, '-');
            slug = slug.replace(/\-\-\-/gi, '-');
            slug = slug.replace(/\-\-/gi, '-');
            slug = '@' + slug + '@';
            slug = slug.replace(/\@\-|\-\@|\@/gi, '');
            return slug;
      }
}