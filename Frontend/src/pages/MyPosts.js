import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
 
function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
 
  useEffect(() => {
    if (!user?.id) return;
 
    const fetchMyPosts = async () => {
      try {
        const res = await api.get('/posts');
        const myPosts = res.data.filter((post) => post.user_id === user.id);
 
        const sortedPosts = myPosts.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
 
        setPosts(sortedPosts);
      } catch (err) {
        setError('Failed to load your posts');
      }
    };
 
    fetchMyPosts();
  }, [user?.id]);
 
  // ✅ Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
 
    try {
      await api.delete(`/posts/${id}`);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      setError('Failed to delete post');
    }
  };
 
  // ✅ Edit navigation handler
  const handleEdit = (post) => {
    navigate(`/edit/${post.id}`, { state: { post } });
  };
 
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>My Journal Posts</h2>
      </div>
 
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
 
      {posts.length === 0 ? (
        <div className="alert alert-info" role="alert">
          You have not posted anything yet.
        </div>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div key={post.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <a href={`/post/${post.id}`} className="text-decoration-none text-dark">
                      {post.title}
                    </a>
                  </h5>
                 
                  <p className="card-text">
                    {post.content.split(' ').slice(0, 30).join(' ')}...
                  </p>
 
                  <small>
                    <span>By <b><i>{post.username}</i></b></span> |{' '}
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </small>
 
                  <div className="mt-2">
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEdit(post)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
 
export default MyPosts;
 
 