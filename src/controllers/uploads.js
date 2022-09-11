const path = require('path')
const fs = require('fs')
const { uploadFile } = require('../helpers')

const { User, Product } = require('../models')

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const saveFile = async (req, res) => {
    try {
      const name = await uploadFile(req.files, ['txt', 'md'], 'textos');
      
      res.status(200).json({
        name
      })

    } catch (error) {
      res.status(400).json(error)
    }
}

const updateImage = async (req, res) => {

  const { id, collection } = req.params

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      
      if(!model){
        return res.status(400).json({
          msg: 'No existe un usuario con ese id'
        })
      }
    break;

    case 'products':
      model = await Product.findById(id);
      
      if(!model){
        return res.status(400).json({
          msg: 'No existe un producto con ese id',
        })
      } 
    break;

    default:
      return res.status(500).json({msg: 'Se me olvidó validar esto'})
  }

  if(model.img){

    const imagePath = path.join(__dirname, '../uploads', collection, model.img)

    if(fs.existsSync(imagePath)){
      fs.unlinkSync(imagePath)
    }
  }

  const name = await uploadFile(req.files, ['png', 'jpg'], collection);

  model.img = name 

  await model.save()

  res.status(200).json(model)
}

const showImage = async (req, res) => {
  
  const { id, collection } = req.params

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      
      if (!model){
        return res.status(400).json({
          msg: 'No existe un usuario con ese id'
        })
      }
    break;

    case 'products':
      model = await Product.findById(id);
      
      if (!model){
        return res.status(400).json({
          msg: 'No existe un producto con ese id',
        })
      } 

    break;

    default:
      return res.status(500).json({msg: 'Se me olvidó validar esto'})
  }

  if(model.img){
    const imagePath = path.join(__dirname, '../uploads', collection, model.img)

    if(fs.existsSync(imagePath)){
      return res.status(200).sendFile(imagePath)
    }
  }

  const defaultImage = path.join(__dirname, '../assets', 'no-image.jpg')

  res.status(200).sendFile(defaultImage)
}

const updateCloudinaryImage = async (req,res) => {

  const { id, collection } = req.params
  
  let model;
  
  switch (collection) {
    case 'users':
      model = await User.findById(id);
      
      if (!model){
        return res.status(400).json({
          msg: 'No existe un usuario con ese id'
        })
      } 
    break;
  
    case 'products':
      model = await Product.findById(id);
      
      if (!model){
        return res.status(400).json({
          msg: 'No existe un producto con ese id',
        })
      } 
  
    break;
  
    default:
      return res.status(500).json({msg: 'Se me olvidó validar esto'})
  }
  
  if(model.img){
    const splittedName = model.img.split('/');
    const name = splittedName[splittedName.length - 1];
    
    const [ public_id ] = name.split('.');
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

  model.img = secure_url 

  await model.save()

  res.status(200).json(model)
}


module.exports = {
  saveFile, 
  updateImage,
  showImage,
  updateCloudinaryImage
}