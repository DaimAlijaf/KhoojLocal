const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../server/app');
const Admin = require('../../../server/models/Admin');
const User = require('../../../server/models/User');

describe('Admin Operations - Functional Tests', () => {
  let adminToken;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const admin = await Admin.create({
      name: 'Test Admin',
      email: 'testadmin@example.com',
      password: 'admin123'
    });

    const loginResponse = await request(app)
      .post('/api/auth/admin/login')
      .send({
        email: 'testadmin@example.com',
        password: 'admin123'
      });

    adminToken = loginResponse.body.token;
  });

  afterAll(async () => {
    await Admin.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('Admin Authentication', () => {
    test('TC_FT015: Admin should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/admin/login')
        .send({
          email: 'testadmin@example.com',
          password: 'admin123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.admin).toHaveProperty('role', 'admin');
    });

    test('TC_FT016: Admin login should fail with wrong password', async () => {
      const response = await request(app)
        .post('/api/auth/admin/login')
        .send({
          email: 'testadmin@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
    });
  });

  describe('User Management', () => {
    test('TC_FT017: Admin should fetch all users', async () => {
      await User.create([
        { name: 'User 1', email: 'user1@example.com', password: 'pass123' },
        { name: 'User 2', email: 'user2@example.com', password: 'pass123' },
        { name: 'User 3', email: 'user3@example.com', password: 'pass123' }
      ]);

      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
    });

    test('TC_FT018: Admin should update user details', async () => {
      const user = await User.create({
        name: 'Original Name',
        email: 'updateuser@example.com',
        password: 'pass123'
      });

      const response = await request(app)
        .put(`/api/admin/users/${user._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Updated Name',
          phone: '9999999999'
        });

      expect(response.status).toBe(200);
      expect(response.body.user.name).toBe('Updated Name');
    });

    test('TC_FT019: Admin should delete user', async () => {
      const user = await User.create({
        name: 'Delete Me',
        email: 'deleteuser@example.com',
        password: 'pass123'
      });

      const response = await request(app)
        .delete(`/api/admin/users/${user._id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);

      const deletedUser = await User.findById(user._id);
      expect(deletedUser).toBeNull();
    });

    test('TC_FT020: Admin should toggle user active status', async () => {
      const user = await User.create({
        name: 'Toggle User',
        email: 'toggle@example.com',
        password: 'pass123',
        isActive: true
      });

      const response = await request(app)
        .put(`/api/admin/users/${user._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ isActive: false });

      expect(response.status).toBe(200);
      expect(response.body.user.isActive).toBe(false);
    });
  });

  describe('Dashboard Statistics', () => {
    test('TC_FT021: Should get dashboard stats', async () => {
      await User.create([
        { name: 'User 1', email: 'stat1@example.com', password: 'pass123', isActive: true },
        { name: 'User 2', email: 'stat2@example.com', password: 'pass123', isActive: true },
        { name: 'User 3', email: 'stat3@example.com', password: 'pass123', isActive: false }
      ]);

      const response = await request(app)
        .get('/api/auth/admin/dashboard-stats')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.stats).toHaveProperty('totalUsers');
      expect(response.body.stats).toHaveProperty('activeUsers');
      expect(response.body.stats.totalUsers).toBe(3);
      expect(response.body.stats.activeUsers).toBe(2);
    });
  });
});
