const request = require('supertest');
const app = require('../app'); // Adjust path to your Express app
const db = require('../config/db'); // Your DB connection/module (optional, for cleanup)

let token; // Assume JWT auth

beforeAll(async () => {
  // Log in as test user
  const res = await request(app)
    .post('/auth/login')
    .send({ email: 'test@example.com', password: 'password123' });

  token = res.body.token;
});

describe('Journal Post Endpoints', () => {
  let postId;

  it('should create a new post', async () => {
    const res = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Post',
        content: 'This is the content of the test post',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    postId = res.body.id;
  });

  it('should get all posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get post details', async () => {
    const res = await request(app).get(`/posts/${postId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Test Post');
  });

  it('should update a post', async () => {
    const res = await request(app)
      .put(`/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Post', content: 'Updated content' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Updated Post');
  });

  it('should delete a post', async () => {
    const res = await request(app)
      .delete(`/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(204);
  });
});

afterAll(async () => {
  if (db && db.end) await db.end(); // Optional cleanup
});
