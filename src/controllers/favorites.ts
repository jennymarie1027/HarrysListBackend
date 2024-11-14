import express from 'express';

import { addFavorite, getFavoritesByUserId, deletePostById } from '../db/favorites';
import { getPostById } from '../db/posts';


const getFavoritePosts = async (userFavesIdList) => { // tried with map & kept getting pending promises
  let faves = []
  for(let i = 0; i < userFavesIdList.length; i++) {
    let post =  await getPostById(userFavesIdList[i].postId)
    faves.push(post)
  }
  return faves;
}

export const getUsersFavoritePosts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.sendStatus(400);
    }

    const userFavesIdList = await getFavoritesByUserId(userId);
    const faves = await getFavoritePosts(userFavesIdList)

    return res.status(200).json(faves).end()
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createFavorite = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId, postId } = req.body;

    if (!userId || !postId) {
      return res.sendStatus(400);
    }

    const fave = await addFavorite({
      userId,
      postId,
    });

    return res.status(200).json(fave).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getUsersFavoriteIds = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.sendStatus(400);
    }

    const userFavesIdList = await getFavoritesByUserId(userId);

    return res.status(200).json(userFavesIdList).end()
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const removeFromFavorites = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { postId, userId } = req.params;

    if (!userId || !postId) {
      return res.sendStatus(400);
    }

    const deleteResponse = await deletePostById(postId, userId)

    console.log('deleteResponse ===', deleteResponse)
    return res.status(200).json(deleteResponse).end()
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}