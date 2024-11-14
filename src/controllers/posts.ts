import express from 'express';
import fs from 'fs';
const path = require('path');

import {
  getPosts,
  createPost,
  getPostById,
  getPostByAuthorId,
  deletePostById,
  updatePostById,
} from '../db/posts';

export const getAllPosts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const posts = await getPosts();

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getMyPosts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.sendStatus(400);
    }
    const myPosts = await getPostByAuthorId(req);
    return res.status(200).json(myPosts).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getPost = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.sendStatus(400);
    }

    const post = await getPostById(id);

    return res.status(200).json(post).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createNewPost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, price, category, description, authorId, location } = req.body;
    if (!title || !price || !category || !description || !location) {
      return res.sendStatus(400);
    }

    // const imagePath = 'http://localhost:8081/uploads/' + req.file.filename
    const date = new Date()

    const post = await createPost({
      title,
      description,
      file: req.files, 
      price,
      category,
      authorId,
      location,
      postCreated: date
    });

    return res.status(200).json(post).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deletePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.sendStatus(400);
    }
    await deletePostById(id);
    return res.status(200).json({ msg: 'post deleted' }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updatePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    if (!id || !req.body) {
      return res.sendStatus(400);
    }
    await updatePostById(id, req.body);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
