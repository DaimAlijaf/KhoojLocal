const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../server/app');
const User = require('../../../server/models/User');
const Admin = require('../../../server/models/Admin');

describe('Authorization and Permission - Integration Tests', () => {
  let userToken, adminToken;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Admin.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Admin.deleteMany({});

    // Create test user
    const userResponse = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Regular User',
        email: 'user@test.com',
        password: 'password123'
      });
    userToken = userResponse.body.token;

    // Create test admin
    await Admin.create({
      name: 'Admin User',
      email: 'admin@test.com',
      password: 'admin123'
    });

    const adminResponse = await request(app)
      .post('/api/auth/admin/login')
      .send({
        email: 'admin@test.com',
        password: 'admin123'
      });
    adminToken = adminResponse.body.token;
  });

  describe('Protected Routes', () => {
    test('TC_IT006: Should reject request without token', async () => {
      const response = await request(app)
        .get('/api/admin/users');

      expect(response.status).toBe(401);
    });

    test('TC_IT007: Should reject request with invalid token', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', 'Bearer invalid_token');

      expect(response.status).toBe(401);
    });

    test('TC_IT008: Should allow request with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/admin/dashboard-stats')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
    });
  });

  describe('Role-Based Access Control', () => {
    test('TC_IT009: Regular user should not access admin routes', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(403);
    });

    test('TC_IT010: Admin should access admin routes', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
    });

    test('TC_IT011: User should access own profile', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
    });

    test('TC_IT012: Admin should not modify user with regular user token', async () => {
      const testUser = await User.create({
        name: 'Target User',
        email: 'target@test.com',
        password: 'password123'
      });

      const response = await request(app)
        .put(`/api/admin/users/${testUser._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'Hacked Name' });

      expect(response.status).toBe(403);
    });
  });

  describe('Token Expiration', () => {
    test('TC_IT013: Valid token should work for authenticated requests', async () => {
      const response1 = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${userToken}`);

      const response2 = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response1.status).toBe(200);
      expect(response2.status).toBe(200);
    });
  });
});
