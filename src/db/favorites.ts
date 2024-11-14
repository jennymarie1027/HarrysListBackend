import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  postId: { type: String, required: true },
});

export const FavoriteModel = mongoose.model('Favorite', FavoriteSchema);

export const getFavoritesByUserId = (userId) =>
  FavoriteModel.find({ userId });
export const addFavorite = (values) =>
  new FavoriteModel(values).save().then((fav) => fav.toObject());
export const deletePostById = (postId: string, userId: string) =>
  FavoriteModel.findOneAndDelete({ postId, userId })