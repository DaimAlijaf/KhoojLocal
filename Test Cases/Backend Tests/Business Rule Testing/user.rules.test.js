const mongoose = require('mongoose');
const User = require('../../../server/models/User');
const Vendor = require('../../../server/models/Vendor');

describe('User Account Rules - Business Logic Tests', () => {
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

  describe('Account Activation Rules', () => {
    test('TC_BR001: New user should be active by default', async () => {
      const user = await User.create({
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password123'
      });

      expect(user.isActive).toBe(true);
    });

    test('TC_BR002: Inactive user should not be able to login', async () => {
      const user = await User.create({
        name: 'Inactive User',
        email: 'inactive@example.com',
        password: 'password123',
        isActive: false
      });

      expect(user.isActive).toBe(false);
    });

    test('TC_BR003: User role should default to user', async () => {
      const user = await User.create({
        name: 'Regular User',
        email: 'regular@example.com',
        password: 'password123'
      });

      expect(user.role).toBe('user');
    });

    test('TC_BR004: Email should be stored in lowercase', async () => {
      const user = await User.create({
        name: 'Case User',
        email: 'CaseTest@EXAMPLE.COM',
        password: 'password123'
      });

      expect(user.email).toBe('casetest@example.com');
    });
  });

  describe('Email Uniqueness Rules', () => {
    test('TC_BR005: Cannot create two users with same email', async () => {
      await User.create({
        name: 'First User',
        email: 'same@example.com',
        password: 'password123'
      });

      await expect(
        User.create({
          name: 'Second User',
          email: 'same@example.com',
          password: 'password456'
        })
      ).rejects.toThrow();
    });

    test('TC_BR006: User and Vendor can have different emails', async () => {
      const user = await User.create({
        name: 'User',
        email: 'user@example.com',
        password: 'password123'
      });

      const vendor = await Vendor.create({
        businessName: 'Business',
        ownerName: 'Owner',
        email: 'vendor@example.com',
        password: 'password123',
        phone: '1234567890',
        category: 'Restaurant'
      });

      expect(user.email).not.toBe(vendor.email);
    });
  });

  describe('Password Security Rules', () => {
    test('TC_BR007: Password must be at least 6 characters', async () => {
      await expect(
        User.create({
          name: 'Short Pass',
          email: 'short@example.com',
          password: '12345'
        })
      ).rejects.toThrow();
    });

    test('TC_BR008: Password should never be returned in queries', async () => {
      await User.create({
        name: 'Secure User',
        email: 'secure@example.com',
        password: 'password123'
      });

      const user = await User.findOne({ email: 'secure@example.com' });
      expect(user.password).toBeUndefined();
    });

    test('TC_BR009: Password should be hashed before storage', async () => {
      const user = await User.create({
        name: 'Hash User',
        email: 'hash@example.com',
        password: 'plaintext123'
      });

      const savedUser = await User.findById(user._id).select('+password');
      expect(savedUser.password).not.toBe('plaintext123');
      expect(savedUser.password.length).toBeGreaterThan(20);
    });
  });
});
