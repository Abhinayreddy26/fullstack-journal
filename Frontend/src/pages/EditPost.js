import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';

function EditPost() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const original = state?.post;

  const [form, setForm] = useState({
    title: '',
    content: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (original) {
      setForm({
        title: original.title || '',
        content: original.content || '',
      });
    } else {
      // Fetch from backend if no state was passed
      const fetchPost = async () => {
        try {
          const { data } = await api.get(`/posts/${id}`);
          setForm({
            title: data.title,
            content: data.content,
          });
        } catch (err) {
          const msg = err.response?.data?.message || 'Failed to load post';
          setError(msg);
        }
      };

      fetchPost();
    }
  }, [original, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.put(`/posts/${id}`, form);
      navigate('/myposts');
    } catch (err) {
      const msg = err.response?.data?.message || 'Update failed';
      setError(msg);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Edit Post</h2>
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            id="content"
            name="content"
            className="form-control"
            value={form.content}
            onChange={handleChange}
            rows="6"
            required
          ></textarea>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">Update Post</button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;