const bcrypt = require('bcryptjs');
const User = require('../../../server/models/User');
const mongoose = require('mongoose');

describe('User Model - Unit Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe('Password Hashing', () => {
    test('TC_UT001: Should hash password before saving', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'plainPassword123'
      };

      const user = new User(userData);
      await user.save();

      expect(user.password).not.toBe('plainPassword123');
      expect(user.password).toMatch(/^\$2[ayb]\$.{56}$/);
    });

    test('TC_UT002: Should not rehash password if not modified', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test2@example.com',
        password: 'password123'
      });
      await user.save();

      const firstHash = user.password;
      user.name = 'Updated Name';
      await user.save();

      expect(user.password).toBe(firstHash);
    });

    test('TC_UT003: Should correctly compare passwords', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test3@example.com',
        password: 'mySecretPassword'
      });
      await user.save();

      const isMatch = await user.comparePassword('mySecretPassword');
      const isNotMatch = await user.comparePassword('wrongPassword');

      expect(isMatch).toBe(true);
      expect(isNotMatch).toBe(false);
    });
  });

  describe('Model Validation', () => {
    test('TC_UT004: Should require name field', async () => {
      const user = new User({
        email: 'test@example.com',
        password: 'password123'
      });

      await expect(user.save()).rejects.toThrow();
    });

    test('TC_UT005: Should require email field', async () => {
      const user = new User({
        name: 'Test User',
        password: 'password123'
      });

      await expect(user.save()).rejects.toThrow();
    });

    test('TC_UT006: Should require password field', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com'
      });

      await expect(user.save()).rejects.toThrow();
    });

    test('TC_UT007: Should validate email format', async () => {
      const user = new User({
        name: 'Test User',
        email: 'invalid-email',
        password: 'password123'
      });

      await expect(user.save()).rejects.toThrow();
    });

    test('TC_UT008: Should enforce unique email', async () => {
      await User.create({
        name: 'User One',
        email: 'duplicate@example.com',
        password: 'password123'
      });

      const duplicateUser = new User({
        name: 'User Two',
        email: 'duplicate@example.com',
        password: 'password123'
      });

      await expect(duplicateUser.save()).rejects.toThrow();
    });

    test('TC_UT009: Should set default role as user', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'role@example.com',
        password: 'password123'
      });

      expect(user.role).toBe('user');
    });

    test('TC_UT010: Should set default isActive as true', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'active@example.com',
        password: 'password123'
      });

      expect(user.isActive).toBe(true);
    });
  });
});
