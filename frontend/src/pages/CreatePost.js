import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

function CreatePost() {
  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/posts', form);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Could not create post';
      setError(msg);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">New Journal Entry</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
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
            placeholder="Your thoughts..."
            value={form.content}
            onChange={handleChange}
            rows="6"
            required
          />
        </div>
        
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">New Journal</button>
        </div>   </form>
    </div>
  );
}

export default CreatePost;
