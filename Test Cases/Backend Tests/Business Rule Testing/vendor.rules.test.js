const mongoose = require('mongoose');
const Vendor = require('../../../server/models/Vendor');

describe('Vendor Status Rules - Business Logic Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await Vendor.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Vendor.deleteMany({});
  });

  describe('Vendor Approval Workflow', () => {
    test('TC_BR010: New vendor should have Pending status', async () => {
      const vendor = await Vendor.create({
        businessName: 'New Business',
        ownerName: 'Owner',
        email: 'new@example.com',
        password: 'password123',
        phone: '1234567890',
        category: 'Restaurant'
      });

      expect(vendor.status).toBe('Pending');
    });

    test('TC_BR011: Only valid status values should be allowed', async () => {
      const vendor = new Vendor({
        businessName: 'Test Business',
        ownerName: 'Owner',
        email: 'test@example.com',
        password: 'password123',
        phone: '1234567890',
        category: 'Bakery',
        status: 'InvalidStatus'
      });

      await expect(vendor.save()).rejects.toThrow();
    });

    test('TC_BR012: Approved vendor should be active by default', async () => {
      const vendor = await Vendor.create({
        businessName: 'Approved Business',
        ownerName: 'Owner',
        email: 'approved@example.com',
        password: 'password123',
        phone: '1234567890',
        category: 'Salon',
        status: 'Approved'
      });

      expect(vendor.isActive).toBe(true);
    });

    test('TC_BR013: Rejected vendor should still exist in database', async () => {
      const vendor = await Vendor.create({
        businessName: 'Rejected Business',
        ownerName: 'Owner',
        email: 'rejected@example.com',
        password: 'password123',
        phone: '1234567890',
        category: 'Gym',
        status: 'Rejected'
      });

      const foundVendor = await Vendor.findById(vendor._id);
      expect(foundVendor).not.toBeNull();
      expect(foundVendor.status).toBe('Rejected');
    });

    test('TC_BR014: Suspended vendor should remain in database', async () => {
      const vendor = await Vendor.create({
        businessName: 'Suspended Business',
        ownerName: 'Owner',
        email: 'suspended@example.com',
        password: 'password123',
        phone: '1234567890',
        category: 'Spa',
        status: 'Suspended'
      });

      expect(vendor.status).toBe('Suspended');
    });
  });

  describe('Vendor Category Rules', () => {
    test('TC_BR015: Only predefined categories should be allowed', async () => {
      const vendor = new Vendor({
        businessName: 'Invalid Category Business',
        ownerName: 'Owner',
        email: 'invalid@example.com',
        password: 'password123',
        phone: '1234567890',
        category: 'InvalidCategory'
      });

      await expect(vendor.save()).rejects.toThrow();
    });

    test('TC_BR016: Valid categories should be accepted', async () => {
      const categories = ['Restaurant', 'Bakery', 'Florist', 'Mechanic', 'Salon', 'Spa', 'Gym', 'Other'];

      for (const category of categories) {
        const vendor = await Vendor.create({
          businessName: `${category} Business`,
          ownerName: 'Owner',
          email: `${category.toLowerCase()}@example.com`,
          password: 'password123',
          phone: '1234567890',
          category: category
        });

        expect(vendor.category).toBe(category);
      }
    });
  });

  describe('Vendor Rating Rules', () => {
    test('TC_BR017: New vendor should have 0 rating', async () => {
      const vendor = await Vendor.create({
        businessName: 'Rating Test',
        ownerName: 'Owner',
        email: 'rating@example.com',
        password: 'password123',
        phone: '1234567890',
        category: 'Restaurant'
      });

      expect(vendor.rating).toBe(0);
      expect(vendor.totalReviews).toBe(0);
    });

    test('TC_BR018: Rating should not exceed 5', async () => {
      const vendor = new Vendor({
        businessName: 'Max Rating',
        ownerName: 'Owner',
        email: 'maxrating@example.com',
        password: 'password123',
        phone: '1234567890',
        category: 'Bakery',
        rating: 6
      });

      await expect(vendor.save()).rejects.toThrow();
    });

    test('TC_BR019: Rating should not be negative', async () => {
      const vendor = new Vendor({
        businessName: 'Negative Rating',
        ownerName: 'Owner',
        email: 'negative@example.com',
        password: 'password123',
        phone: '1234567890',
        category: 'Salon',
        rating: -1
      });

      await expect(vendor.save()).rejects.toThrow();
    });
  });
});
