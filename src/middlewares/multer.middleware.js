import multer from 'multer';

const storage = multer.diskStorage({
    // destination is the folder where the file will be stored ; it has a function which takes three arguments req, file, cb
    // req is the request object ; file is the file which is being uploaded ; cb is the callback function
  destination: function (req, file, cb) {
    // cb takes two arguments first is error and second is the destination where the file will be stored
    // if there is no error then we pass null as first argument
    // file will be stored in /tmp/my-uploads folder
    // make sure this folder exists

    cb(null, './public/temp')
  },
  // filename is the name of the file which will be stored in the destination folder
  // it also takes three arguments req, file, cb
  // req is the request object ; file is the file which is being uploaded ; cb is the callback function
  filename: function (req, file, cb) {
    // cb takes two arguments first is error and second is the name of the file
    // if there is no error then we pass null as first argument
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

    // we can also change the name of the file here
    // how ? by using uniqueSuffix variable
    // cb(null, file.fieldname + '-' + uniqueSuffix) // file will be stored with its field name and unique suffix
    cb(null, file.originalname) // file will be stored with its original name
  }
})

const upload = multer({ storage: storage })

export default upload;