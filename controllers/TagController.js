const Tag = require('../models/Tag');
const base = require('../services/base');

let index = async (req , res , next ) => {
      let result = await Tag.find();
      if (result.length > 0) {
            base.fmsg(res , result , "Fetched all Tags . . ");
      }
      else {
            base.fmsg(res , [] , "No tag is on record");
      }
}

let store = async (req , res , next) => {
      let existTag = await Tag.findOne({name : req.body.name});

      if (!existTag) {
            let result = new Tag();
            result.name = req.body.name;
            result.slug = base.createSlug(req.body.name);
            await result.save();
            base.fmsg(res , result , 'Created tag');
      } else {
            next(new Error('Tag already exists'));
      }
}

let show = async (req , res , next) => {
      let result = await Tag.findOne({slug : req.params.slug});
      if (result) {
            base.fmsg(res , result , `${result.name} found. . .`);
      } else {
            next(new Error('No tag found'));
      }
}

let patch = async (req , res , next ) => {
      let existData = await Tag.findOne({slug : req.params.slug});
      if (existData) {
            let result = await Tag.findOneAndUpdate(
                  {slug : req.params.slug},
                  {
                        name : req.body.name,
                        slug : base.createSlug(req.body.name)
                  }
            );

            base.fmsg(res , result , `updated successfully`);
      } else {
            next(new Error('Tag not found'));
      }
}

let drop = async (req , res , next) => {
      let existData = await Tag.findOne({slug : req.params.slug});
      if (existData) {
            await Tag.deleteOne({slug : req.params.slug});
            base.fmsg(res , {} , "deleted");
      } else {
            next(new Error('No tag found...'));
      }
}

module.exports = {
      index,
      store,
      show,
      patch,
      drop
}