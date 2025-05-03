import React, { useEffect, useState } from 'react';
import api from '../api/api';

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user?.id) return;

    const fetchMyPosts = async () => {
      try {
        const res = await api.get('/posts');
        const myPosts = res.data.filter((post) => post.user_id === user.id);

        // Sort posts by date (most recent first)
        const sortedPosts = myPosts.sort((a, b) => {
          return new Date(b.datePublished) - new Date(a.datePublished);
        });

        setPosts(sortedPosts);
      } catch (err) {
        setError('Failed to load your posts');
      }
    };

    fetchMyPosts();
  }, [user?.id]);

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
                  {/* Title with link to journal details */}
                  <h5 className="card-title">
                    <a href={`/post/${post.id}`} className="text-decoration-none text-dark">
                      {post.title}
                    </a>
                  </h5>
                  
                  {/* Display first 30 words of the content */}
                  <p className="card-text">
                    {post.content.split(' ').slice(0, 30).join(' ')}...
                  </p>

                  {/* Publisher and Date */}
                  <small>
                    <span>By <b><i>{post.username}</i></b></span> |{' '}
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </small>

                  {/* Edit and Delete buttons only if user is the owner */}
                  {post.user_id === user.id && (
                    <div className="mt-2">
                      <button className="btn btn-primary btn-sm mr-2">Edit</button>
                      <button className="btn btn-danger btn-sm">Delete</button>
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

export default MyPosts;
