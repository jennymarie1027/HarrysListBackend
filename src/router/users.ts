import express from 'express'
import { deleteUser, getAllUsers, updateUser } from '../controllers/users'
import { isAuthenticationed, isOwner } from '../middlewares'

export default (router: express.Router) => {
  router.get('/users', getAllUsers)
  router.delete('/users/:id', isAuthenticationed, isOwner, deleteUser)
  router.patch('/users/:id', isAuthenticationed, isOwner, updateUser)
}

