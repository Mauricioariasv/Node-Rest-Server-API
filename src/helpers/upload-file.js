const path = require('path')
const {v4: uuidv4} = require('uuid');

const uploadFile = (files, validExtensions = ['png','jpg', 'jpeg', 'gif'], folder = '') => {
    return new Promise((resolve, reject) => {

      const { file } = files;

      const splittedName = file.name.split('.')
      const extension = splittedName[splittedName.length - 1]

      if(!validExtensions.includes(extension)){
        return reject(`La extensión ${extension} no es válida`)
      }

      const tempName = uuidv4() + '.' + extension;

      const uploadPath = path.join(__dirname, '../uploads/', folder, tempName) ;

      file.mv(uploadPath, function(err) {
        if (err) {
          reject(err)
        }

        resolve(tempName)
      }); 
    })
}


module.exports = {
  uploadFile
}