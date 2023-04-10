const fs = require('fs');

let uploadFile = (file) => {
      let fileName = new Date().valueOf() + '_' + file.name;
      file.mv(`./storage/${fileName}`);
      return fileName;
}

let dropFile = async(file) => {
      await fs.unlinkSync(`./storage/${file}`)
}

module.exports = {
      uploadFile,
      dropFile
}