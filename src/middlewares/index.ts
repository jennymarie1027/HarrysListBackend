import express from 'express';
import { get, merge } from 'lodash';
import { getUserBySessionToken } from '../db/users';
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

export const isAuthenticationed = async (
  // dont trust that this works the way it is supposed to. have not tested yet.
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies['JENNY-AUTH'];
    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.sendStatus(403);
    }
    merge(req, { identity: existingUser });

    return next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const authenticatedToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const storage = async (req, res) => {
  const multer = require('multer');

  const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      const mimeType = file.mimetype.split('/');
      const fileType = mimeType[1];
      const fileName = file.originalName + '.' + fileType;
      cb(null, fileName);
    },
  });
  const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpeg'];
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
  };

  return multer({
    storage: diskStorage,
    fileFilter: fileFilter,
  }).single('image');
};
