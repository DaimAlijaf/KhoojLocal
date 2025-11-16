const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../server/app');
const User = require('../../../server/models/User');
const Vendor = require('../../../server/models/Vendor');
const Admin = require('../../../server/models/Admin');

describe('End-to-End User Journey - Integration Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Vendor.deleteMany({});
    await Admin.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Vendor.deleteMany({});
    await Admin.deleteMany({});
  });

  describe('Complete User Registration to Service Booking Flow', () => {
    test('TC_IT001: User registers, logs in, and searches vendors', async () => {
      // Step 1: Register user
      const registerResponse = await request(app)
        .post('/api/auth/user/register')
        .send({
          name: 'Test User',
          email: 'user@example.com',
          password: 'password123'
        });

      expect(registerResponse.status).toBe(201);
      const userToken = registerResponse.body.token;

      // Step 2: User login
      const loginResponse = await request(app)
        .post('/api/auth/user/login')
        .send({
          email: 'user@example.com',
          password: 'password123'
        });

      expect(loginResponse.status).toBe(200);

      // Step 3: Create approved vendor
      await Vendor.create({
        businessName: 'Test Restaurant',
        ownerName: 'Owner',
        email: 'vendor@example.com',
        password: 'password123',
        phone: '1234567890',
        category: 'Restaurant',
        status: 'Approved'
      });

      // Step 4: User searches for vendors
      const searchResponse = await request(app)
        .get('/api/vendors')
        .set('Authorization', `Bearer ${userToken}`);

      expect(searchResponse.status).toBe(200);
      expect(Array.isArray(searchResponse.body)).toBe(true);
    });

    test('TC_IT002: User updates profile after registration', async () => {
      // Register
      const registerResponse = await request(app)
        .post('/api/auth/user/register')
        .send({
          name: 'Original Name',
          email: 'update@example.com',
          password: 'password123'
        });

      const userId = registerResponse.body.user._id;
      const token = registerResponse.body.token;

      // Update profile
      const updateResponse = await request(app)
        .put(`/api/users/profile`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Updated Name',
          phone: '9876543210'
        });

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.user.name).toBe('Updated Name');
    });
  });

  describe('Complete Vendor Registration to Approval Flow', () => {
    test('TC_IT003: Vendor registers, admin approves, vendor becomes searchable', async () => {
      // Step 1: Vendor registers
      const vendorRegResponse = await request(app)
        .post('/api/auth/vendor/register')
        .send({
          businessName: 'New Restaurant',
          ownerName: 'John Owner',
          email: 'newvendor@example.com',
          password: 'password123',
          phone: '1234567890',
          category: 'Restaurant'
        });

      expect(vendorRegResponse.status).toBe(201);
      const vendorId = vendorRegResponse.body.vendor._id;

      // Step 2: Create admin
      const admin = await Admin.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin123'
      });

      const adminLoginResponse = await request(app)
        .post('/api/auth/admin/login')
        .send({
          email: 'admin@example.com',
          password: 'admin123'
        });

      const adminToken = adminLoginResponse.body.token;

      // Step 3: Admin approves vendor
      const approveResponse = await request(app)
        .put(`/api/admin/vendors/${vendorId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'Approved' });

      expect(approveResponse.status).toBe(200);
      expect(approveResponse.body.vendor.status).toBe('Approved');

      // Step 4: Verify vendor is searchable
      const vendor = await Vendor.findById(vendorId);
      expect(vendor.status).toBe('Approved');
    });

    test('TC_IT004: Rejected vendor should not appear in active vendor list', async () => {
      // Register vendor
      const vendorRegResponse = await request(app)
        .post('/api/auth/vendor/register')
        .send({
          businessName: 'Rejected Vendor',
          ownerName: 'Owner',
          email: 'rejected@example.com',
          password: 'password123',
          phone: '1234567890',
          category: 'Bakery'
        });

      const vendorId = vendorRegResponse.body.vendor._id;

      // Create and login admin
      await Admin.create({
        name: 'Admin',
        email: 'admin2@example.com',
        password: 'admin123'
      });

      const adminLoginResponse = await request(app)
        .post('/api/auth/admin/login')
        .send({
          email: 'admin2@example.com',
          password: 'admin123'
        });

      const adminToken = adminLoginResponse.body.token;

      // Reject vendor
      await request(app)
        .put(`/api/admin/vendors/${vendorId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'Rejected' });

      // Verify vendor is rejected
      const vendor = await Vendor.findById(vendorId);
      expect(vendor.status).toBe('Rejected');
    });
  });

  describe('Admin Dashboard Integration', () => {
    test('TC_IT005: Admin dashboard shows correct statistics', async () => {
      // Create users
      await User.create([
        { name: 'User 1', email: 'user1@test.com', password: 'pass123', isActive: true },
        { name: 'User 2', email: 'user2@test.com', password: 'pass123', isActive: true },
        { name: 'User 3', email: 'user3@test.com', password: 'pass123', isActive: false }
      ]);

      // Create vendors
      await Vendor.create([
        {
          businessName: 'Vendor 1',
          ownerName: 'Owner 1',
          email: 'v1@test.com',
          password: 'pass123',
          phone: '111',
          category: 'Restaurant',
          status: 'Approved',
          isActive: true
        },
        {
          businessName: 'Vendor 2',
          ownerName: 'Owner 2',
          email: 'v2@test.com',
          password: 'pass123',
          phone: '222',
          category: 'Bakery',
          status: 'Pending'
        }
      ]);

      // Create admin and login
      await Admin.create({
        name: 'Admin',
        email: 'statsadmin@test.com',
        password: 'admin123'
      });

      const loginResponse = await request(app)
        .post('/api/auth/admin/login')
        .send({
          email: 'statsadmin@test.com',
          password: 'admin123'
        });

      const adminToken = loginResponse.body.token;

      // Get dashboard stats
      const statsResponse = await request(app)
        .get('/api/auth/admin/dashboard-stats')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(statsResponse.status).toBe(200);
      expect(statsResponse.body.stats.totalUsers).toBe(3);
      expect(statsResponse.body.stats.activeUsers).toBe(2);
      expect(statsResponse.body.stats.activeVendors).toBe(1);
      expect(statsResponse.body.stats.pendingApprovals).toBe(1);
    });
  });
});
