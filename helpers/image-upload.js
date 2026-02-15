
const multer = require('multer');

const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    // filename: function (req, file, cb) {
    //     cb(null, path.parse(file.originalname).name + '-' + Date.now() + path.extname(file.originalname));
    // }
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
        cb(null, uniqueName);
    }

})



const upload = multer({  storage: storage });

module.exports.upload = upload;

