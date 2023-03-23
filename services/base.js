const bcrypt =  require('bcryptjs');

module.exports = {
      
      fmsg : (res , data , message) => {
            res.status(200).json({condition : true , data : data , message : message});
      },

      encode : (payload) => bcrypt.hashSync(payload , 8),

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