const ChildCategory = require('../models/ChildCategory');
const base = require('../services/base');

let index = async (req , res , next ) => {
      let result = await ChildCategory.find();
      if (result.length > 0) {
            base.fmsg(res , result , "Fetched all child categories . . ");
      }
      else {
            base.fmsg(res , [] , "No child category is on record");
      }
}

let store = async (req , res , next) => {
      let existCat = await ChildCategory.findOne({name : req.body.name});

      if (!existCat) {
            let result = new ChildCategory();
            result.name = req.body.name;
            result.slug = base.createSlug(req.body.name);
            await result.save();
            base.fmsg(res , result , 'Created child category');
      } else {
            next(new Error('Child category already exists'));
      }
}

let show = async (req , res , next) => {
      let result = await ChildCategory.findOne({slug : req.params.slug});
      if (result) {
            base.fmsg(res , result , `${result.name} found. . .`);
      } else {
            next(new Error('No child category found'));
      }
}

let patch = async (req , res , next ) => {
      let existData = await ChildCategory.findOne({slug : req.params.slug});
      if (existData) {
            let result = await ChildCategory.findOneAndUpdate(
                  {slug : req.params.slug},
                  {
                        name : req.body.name,
                        slug : base.createSlug(req.body.name)
                  }
            );

            base.fmsg(res , result , `updated successfully`);
      } else {
            next(new Error('Child category not found'));
      }
}

let drop = async (req , res , next) => {
      let existData = await ChildCategory.findOne({slug : req.params.slug});
      if (existData) {
            await ChildCategory.deleteOne({slug : req.params.slug});
            base.fmsg(res , {} , "deleted");
      } else {
            next(new Error('No child category found...'));
      }
}

module.exports = {
      index,
      store,
      show,
      patch,
      drop
}