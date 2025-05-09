const Post = require('../models/postModel');

exports.create = async (req, res) => {
  const { title, content } = req.body;
  try {
    const postId = await Post.createPost(req.user.id, title, content);
    res.status(201).json({ message: 'Post created', postId });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create post', error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const posts = await Post.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts', error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const post = await Post.getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch post', error: err.message });
  }
};

exports.update = async (req, res) => {
  const { title, content } = req.body;
  try {
    const success = await Post.updatePost(req.params.id, req.user.id, title, content);
    if (!success) return res.status(403).json({ message: 'Unauthorized or post not found' });
    res.json({ message: 'Post updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update post', error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const success = await Post.deletePost(req.params.id, req.user.id);
    if (!success) return res.status(403).json({ message: 'Unauthorized or post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete post', error: err.message });
  }
};
