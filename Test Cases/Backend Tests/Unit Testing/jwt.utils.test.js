const jwt = require('jsonwebtoken');
const generateToken = require('../../../server/utils/generateToken');

describe('JWT Token Generation - Unit Tests', () => {
  describe('Token Creation', () => {
    test('TC_UT019: Should generate valid JWT token', () => {
      const payload = { id: '123', role: 'user' };
      const token = generateToken(payload);

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3);
    });

    test('TC_UT020: Should include user id in token payload', () => {
      const userId = 'user_123';
      const token = generateToken(userId, 'user');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      expect(decoded.id).toBe(userId);
    });

    test('TC_UT021: Should include role in token payload', () => {
      const token = generateToken('123', 'admin');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      expect(decoded.role).toBe('admin');
    });

    test('TC_UT022: Should create token with expiration', () => {
      const token = generateToken({ id: '123', role: 'user' });
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      expect(decoded.exp).toBeDefined();
      expect(decoded.exp).toBeGreaterThan(Date.now() / 1000);
    });

    test('TC_UT023: Should verify token with correct secret', () => {
      const token = generateToken({ id: '123', role: 'vendor' });

      expect(() => {
        jwt.verify(token, process.env.JWT_SECRET);
      }).not.toThrow();
    });

    test('TC_UT024: Should fail verification with wrong secret', () => {
      const token = generateToken({ id: '123', role: 'user' });

      expect(() => {
        jwt.verify(token, 'wrong_secret');
      }).toThrow();
    });
  });
});
