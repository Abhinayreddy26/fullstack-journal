import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user')); // Get the currently logged-in user

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (err) {
      setError('Failed to load posts');
    }
  };

  const truncateContent = (content, maxLength) => {
    if (!content) return '';
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Journal Posts</h2>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="alert alert-info">No posts yet.</div>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div className="col-md-6 col-lg-6 mb-6" key={post.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/post/${post.id}`} className="text-decoration-none text-dark">
                      {post.title}
                    </Link>
                  </h5>
                  <p className="card-text">
                    {truncateContent(post.content, 150)} {/* Displaying the first 150 characters */}
                  </p>
                  <small>
                   By <span className="text-muted"><b><i>{post.username}</i></b> | {new Date(post.created_at).toLocaleDateString()}</span>
                  </small>
                  {user?.id === post.user_id && ( // Check if the logged-in user is the post owner
                    <div className="mt-3">
                      <Link to={`/edit/${post.id}`} className="btn btn-primary btn-sm mr-2">Edit</Link>
                      <button
                        onClick={async () => {
                          const confirmDelete = window.confirm('Are you sure you want to delete this post?');
                          if (confirmDelete) {
                            try {
                              await api.delete(`/posts/${post.id}`);
                              setPosts(posts.filter((p) => p.id !== post.id)); // Remove deleted post from state
                            } catch (err) {
                              setError('Failed to delete post');
                            }
                          }
                        }}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
