const File = require('../models/File');
const base = require('../services/base');
const { uploadFile, dropFile } = require('../services/fileSystem');

let store = async (req , res , next) => {
      let file = uploadFile(req.files.file);
      req.body["file"] = file;
      let data = new File(req.body);
      let result = await data.save();
      base.fmsg(res , result , "uploaded file");
}

let index = async (req , res , next) => {
      let result = await File.find();
      if (result) {
            base.fmsg(res , result , "fetched all files");
      } else {
            base.fmsg(res , [] , 'no file on record');
      }
}

let show = async (req , res , next) => {
      let data = await File.findById(req.params.id);
      if (data) {
            base.fmsg(res , data , `${data.name} found. . .`);
      } else {
            next(new Error('No file found'));
      }
}

let patch = async(req , res , next) => {
      let exist = await File.findById(req.params.id);
      if (exist) {
            dropFile(exist.file);
            let file = uploadFile(req.files.file);
            req.body["file"] = file;
            let result = await File.findByIdAndUpdate(req.params.id , req.body);
            base.fmsg(res , result , "updated");
      }
}

let drop = async (req , res , next) => {
      let data = await File.findById(req.params.id);
      if (data) {
            dropFile(data.file);
            await File.findByIdAndDelete(req.params.id);
            base.fmsg(res , {} , "deleted");
      } else {
            next(new Error('no such a file or directory!'));
      }
}

module.exports = {
      store,
      index,
      show,
      patch,
      drop
}