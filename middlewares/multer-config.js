const { diskStorage } = require("multer");
const { join, dirname, extname } = require("path");
const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

module.exports = function (image, size) {
  return multer({
    storage: diskStorage({
      destination: (req, file, callback) => {
        const __dirname = dirname(require.main.filename); // Corrected here
        callback(null, join(__dirname, "./public/images"));
      },
      filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        let newFileName = +new Date() + extname(file.originalname);
        callback(null, newFileName);
      },
    }),
    limits: size,
  }).single(image);
};
