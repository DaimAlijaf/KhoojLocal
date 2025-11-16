const Vendor = require('../../../server/models/Vendor');
const mongoose = require('mongoose');

describe('Vendor Model - Unit Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Vendor.deleteMany({});
  });

  describe('Model Validation', () => {
    test('TC_UT011: Should create vendor with valid data', async () => {
      const vendorData = {
        businessName: 'Test Business',
        ownerName: 'John Doe',
        email: 'vendor@example.com',
        password: 'password123',
        phone: '1234567890',
        category: 'Restaurant'
      };

      const vendor = await Vendor.create(vendorData);

      expect(vendor.businessName).toBe('Test Business');
      expect(vendor.status).toBe('Pending');
      expect(vendor.isActive).toBe(true);
    });

    test('TC_UT012: Should require businessName', async () => {
      const vendor = new Vendor({
        ownerName: 'John Doe',
        email: 'vendor@example.com',
        password: 'password123',
        phone: '1234567890',
        category: 'Restaurant'
      });

      await expect(vendor.save()).rejects.toThrow();
    });

    test('TC_UT013: Should require category', async () => {
      const vendor = new Vendor({
        businessName: 'Test Business',
        ownerName: 'John Doe',
        email: 'vendor@example.com',
        password: 'password123',
        phone: '1234567890'
      });

      await expect(vendor.save()).rejects.toThrow();
    });

    test('TC_UT014: Should validate category enum', async () => {
      const vendor = new Vendor({
        businessName: 'Test Business',
        ownerName: 'John Doe',
        email: 'vendor@example.com',
        password: 'password123',
        phone: '1234567890',
        category: 'InvalidCategory'
      });

      await expect(vendor.save()).rejects.toThrow();
    });

    test('TC_UT015: Should set default status as Pending', async () => {
      const vendor = await Vendor.create({
        businessName: 'Test Business',
        ownerName: 'John Doe',
        email: 'vendor@example.com',
        password: 'password123',
        phone: '1234567890',
        category: 'Bakery'
      });

      expect(vendor.status).toBe('Pending');
    });

    test('TC_UT016: Should validate status enum values', async () => {
      const vendor = new Vendor({
        businessName: 'Test Business',
        ownerName: 'John Doe',
        email: 'vendor@example.com',
        password: 'password123',
        phone: '1234567890',
        category: 'Salon',
        status: 'InvalidStatus'
      });

      await expect(vendor.save()).rejects.toThrow();
    });

    test('TC_UT017: Should hash vendor password before saving', async () => {
      const vendor = await Vendor.create({
        businessName: 'Test Business',
        ownerName: 'John Doe',
        email: 'vendor2@example.com',
        password: 'plainPassword',
        phone: '1234567890',
        category: 'Gym'
      });

      expect(vendor.password).not.toBe('plainPassword');
    });

    test('TC_UT018: Should set default rating as 0', async () => {
      const vendor = await Vendor.create({
        businessName: 'Test Business',
        ownerName: 'John Doe',
        email: 'vendor3@example.com',
        password: 'password123',
        phone: '1234567890',
        category: 'Spa'
      });

      expect(vendor.rating).toBe(0);
      expect(vendor.totalReviews).toBe(0);
    });
  });
});
