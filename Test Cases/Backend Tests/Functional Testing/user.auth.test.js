const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../server/app');
const User = require('../../../server/models/User');

describe('User Authentication - Functional Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('User Registration', () => {
    test('TC_FT001: Should register new user successfully', async () => {
      const response = await request(app)
        .post('/api/auth/user/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('email', 'john@example.com');
    });

    test('TC_FT002: Should not register user with existing email', async () => {
      await User.create({
        name: 'Existing User',
        email: 'existing@example.com',
        password: 'password123'
      });

      const response = await request(app)
        .post('/api/auth/user/register')
        .send({
          name: 'New User',
          email: 'existing@example.com',
          password: 'password456'
        });

      expect(response.status).toBe(400);
    });

    test('TC_FT003: Should validate required fields', async () => {
      const response = await request(app)
        .post('/api/auth/user/register')
        .send({
          name: 'John Doe'
        });

      expect(response.status).toBe(400);
    });

    test('TC_FT004: Should validate email format', async () => {
      const response = await request(app)
        .post('/api/auth/user/register')
        .send({
          name: 'John Doe',
          email: 'invalid-email',
          password: 'password123'
        });

      expect(response.status).toBe(400);
    });

    test('TC_FT005: Should enforce minimum password length', async () => {
      const response = await request(app)
        .post('/api/auth/user/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: '123'
        });

      expect(response.status).toBe(400);
    });
  });

  describe('User Login', () => {
    beforeEach(async () => {
      await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    });

    test('TC_FT006: Should login with correct credentials', async () => {
      const response = await request(app)
        .post('/api/auth/user/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    test('TC_FT007: Should reject login with wrong password', async () => {
      const response = await request(app)
        .post('/api/auth/user/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
    });

    test('TC_FT008: Should reject login with non-existent email', async () => {
      const response = await request(app)
        .post('/api/auth/user/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(401);
    });

    test('TC_FT009: Should return user data on successful login', async () => {
      const response = await request(app)
        .post('/api/auth/user/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.body.user).toHaveProperty('email');
      expect(response.body.user).toHaveProperty('name');
      expect(response.body.user).not.toHaveProperty('password');
    });
  });
});
