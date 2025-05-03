import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate hooks
import api from '../api/api';

function PostDetail() {
  const { id } = useParams(); // Get the post id from the URL params
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user from localStorage
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        setError('Failed to load post details');
      }
    };

    fetchPost();
  }, [id]); // Trigger when the id changes

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${id}`);
      navigate('/myposts'); // Navigate to "My Posts" after deleting
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`, { state: { post } }); // Navigate to edit page and pass post data
  };

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info" role="alert">
          Loading post details...
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <p className="card-text">{post.content}</p>
          <div>
            <small>
              <span>By { post.user_id.username } </span> |{' '}
              <span>Published on: <b><i>{new Date(post.created_at).toLocaleDateString()}</i></b></span>
            </small>
          </div>

          {/* Check if the logged-in user is the publisher */}
          {user && post.user_id === user.id && (
            <div className="mt-3">
              <button onClick={handleEdit} className="btn btn-warning mr-2">
                Edit
              </button>
              <button onClick={handleDelete} className="btn btn-danger">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
