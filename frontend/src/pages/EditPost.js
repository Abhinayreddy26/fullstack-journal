import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/api';

function EditPost() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const original = state?.post;

  const [form, setForm] = useState({
    title: original?.title || '',
    content: original?.content || '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.put(`/posts/${original.id}`, form);
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
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">Update Post</button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
