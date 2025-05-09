const request = require('supertest');
const app = require('../app'); // Adjust path to your Express app
const db = require('../config/db'); // Adjust path to your DB connection if needed

describe('User Routes', () => {
  const userData = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'TestPassword123!',
  };

  afterAll(async () => {
    // Clean up the test user from database
    await db.query('DELETE FROM users WHERE email = ?', [userData.email]);
    db.end(); // Close DB connection
  });

  test('Register a new user', async () => {
    const res = await request(app)
      .post('/api/register') // adjust based on your actual route
      .send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  test('Login with registered user', async () => {
    const res = await request(app)
      .post('/api/login') // adjust based on your actual route
      .send({
        email: userData.email,
        password: userData.password,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
  });

  test('Login with incorrect password', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: userData.email,
        password: 'WrongPassword123!',
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
  });
});
