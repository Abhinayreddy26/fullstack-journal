import { useNavigate } from 'react-router-dom';
import api from '../api/api';

function PostCard({ post }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${post.id}`, { state: { post } });
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await api.delete(`/posts/${post.id}`);
      window.location.reload(); // reload to refresh post list
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  const date = new Date(post.created_at).toLocaleString();

  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <small>
        Posted by <strong>{post.username}</strong> on {date}
      </small>

      {user?.id === post.user_id && (
        <div className="post-actions">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete} style={{ color: 'red' }}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default PostCard;
