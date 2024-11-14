const multer = require('multer');

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const mimeType = file.mimetype.split('/');
    const fileType = mimeType[1];
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

// const fileFilter = (req, file, cb) => {
//   const allowedMimeTypes = ['upload/png', 'upload/jpeg', 'upload/jpg'];
//   allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
// };
// , fileFilter: fileFilter

export const storage = multer({ storage: diskStorage }).array('file');
