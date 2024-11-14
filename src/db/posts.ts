import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  id: { type: String, required: false },
  authorId: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  file: {},
  location: { type: String, required: true},
  postCreated: { type: String, required:true}
});

export const PostModel = mongoose.model('Post', PostSchema);

export const getPosts = () => PostModel.find();
export const getPostById = (id: string) => PostModel.findOne({ _id: id });
export const getPostByAuthorId = (req) =>
  PostModel.find({ authorId: req.params.id });
export const createPost = (values: any) =>
  new PostModel(values).save().then((post) => post.toObject());
export const deletePostById = (id: string) =>
  PostModel.findOneAndDelete({ _id: id });
export const updatePostById = (id: string, values: Record<string, any>) =>
  PostModel.findByIdAndUpdate(id, values);
