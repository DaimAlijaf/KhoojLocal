const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../server/app');
const Vendor = require('../../../server/models/Vendor');
const Admin = require('../../../server/models/Admin');

describe('Vendor Management - Functional Tests', () => {
  let adminToken;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Create admin for testing
    const admin = await Admin.create({
      name: 'Admin User',
      email: 'admin@test.com',
      password: 'admin123'
    });

    const loginResponse = await request(app)
      .post('/api/auth/admin/login')
      .send({
        email: 'admin@test.com',
        password: 'admin123'
      });

    adminToken = loginResponse.body.token;
  });

  afterAll(async () => {
    await Vendor.deleteMany({});
    await Admin.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Vendor.deleteMany({});
  });

  describe('Vendor Registration', () => {
    test('TC_FT010: Should register vendor successfully', async () => {
      const response = await request(app)
        .post('/api/auth/vendor/register')
        .send({
          businessName: 'Test Restaurant',
          ownerName: 'John Doe',
          email: 'vendor@example.com',
          password: 'password123',
          phone: '1234567890',
          category: 'Restaurant'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
    });

    test('TC_FT011: Should set vendor status as Pending by default', async () => {
      await request(app)
        .post('/api/auth/vendor/register')
        .send({
          businessName: 'Test Bakery',
          ownerName: 'Jane Doe',
          email: 'bakery@example.com',
          password: 'password123',
          phone: '0987654321',
          category: 'Bakery'
        });

      const vendor = await Vendor.findOne({ email: 'bakery@example.com' });
      expect(vendor.status).toBe('Pending');
    });

    test('TC_FT012: Should not register vendor with duplicate email', async () => {
      await Vendor.create({
        businessName: 'Existing Business',
        ownerName: 'Owner',
        email: 'duplicate@example.com',
        password: 'password123',
        phone: '1111111111',
        category: 'Salon'
      });

      const response = await request(app)
        .post('/api/auth/vendor/register')
        .send({
          businessName: 'New Business',
          ownerName: 'New Owner',
          email: 'duplicate@example.com',
          password: 'password456',
          phone: '2222222222',
          category: 'Gym'
        });

      expect(response.status).toBe(400);
    });
  });

  describe('Vendor Approval', () => {
    test('TC_FT013: Admin should approve vendor', async () => {
      const vendor = await Vendor.create({
        businessName: 'Pending Vendor',
        ownerName: 'Owner',
        email: 'pending@example.com',
        password: 'password123',
        phone: '3333333333',
        category: 'Spa',
        status: 'Pending'
      });

      const response = await request(app)
        .put(`/api/admin/vendors/${vendor._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'Approved' });

      expect(response.status).toBe(200);
      expect(response.body.vendor.status).toBe('Approved');
    });

    test('TC_FT014: Admin should reject vendor', async () => {
      const vendor = await Vendor.create({
        businessName: 'Reject Vendor',
        ownerName: 'Owner',
        email: 'reject@example.com',
        password: 'password123',
        phone: '4444444444',
        category: 'Florist',
        status: 'Pending'
      });

      const response = await request(app)
        .put(`/api/admin/vendors/${vendor._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'Rejected' });

      expect(response.status).toBe(200);
      expect(response.body.vendor.status).toBe('Rejected');
    });
  });
});
