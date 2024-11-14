
import express from 'express';
import fs from "fs";
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, 'images');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, IMAGES_DIR)
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

module.exports = upload;