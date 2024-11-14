import express from 'express';
import {
  getAllPosts,
  createNewPost,
  deletePost,
  getPost,
  getMyPosts,
  updatePost,
} from '../controllers/posts';
import { authenticatedToken } from '../middlewares';

import { storage }  from '../multerConfig'

export default (router: express.Router) => {
  router.get('/posts', getAllPosts);
  router.get('/myposts/:id', authenticatedToken, getMyPosts);
  router.get('/post/:id', getPost);
  router.post('/posts', storage, createNewPost); 
  router.delete('/post/:id', deletePost);
  router.put('/post/:id', updatePost);
};
