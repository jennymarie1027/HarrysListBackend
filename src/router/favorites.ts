import express from 'express'

import {  getUsersFavoritePosts, createFavorite, getUsersFavoriteIds, removeFromFavorites} from '../controllers/favorites'
import { authenticatedToken } from 'middlewares'

export default (router: express.Router) => {
  router.get('/myfavorites/:userId', getUsersFavoritePosts);
  router.get('/myfavorites_ids/:userId', getUsersFavoriteIds)
  router.post('/myfavorites', createFavorite);
  router.delete('/myfavorites/:postId/:userId', removeFromFavorites)
}