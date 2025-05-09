const db = require('../config/db');

exports.createPost = async (userId, title, content) => {
  const [result] = await db.query(
    'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
    [userId, title, content]
  );
  return result.insertId;
};

exports.getAllPosts = async () => {
  const [rows] = await db.query(
    'SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC'
  );
  return rows;
};

exports.getPostById = async (id) => {
  const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
  return rows[0];
};

exports.updatePost = async (id, userId, title, content) => {
  const [result] = await db.query(
    'UPDATE posts SET title = ?, content = ? WHERE id = ? AND user_id = ?',
    [title, content, id, userId]
  );
  return result.affectedRows > 0;
};

exports.deletePost = async (id, userId) => {
  const [result] = await db.query(
    'DELETE FROM posts WHERE id = ? AND user_id = ?',
    [id, userId]
  );
  return result.affectedRows > 0;
};
