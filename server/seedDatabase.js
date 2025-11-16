const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const User = require('./models/User');
const Vendor = require('./models/Vendor');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/khoojlocal');
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Admin.deleteMany({});
    await User.deleteMany({});
    await Vendor.deleteMany({});

    // Create Admin Account
    console.log('👤 Creating admin account...');
    const admin = await Admin.create({
      name: 'Admin User',
      email: 'admin@khoojlocal.com',
      password: 'admin123', // Password will be hashed automatically
      role: 'admin',
      isActive: true,
    });
    console.log('✅ Admin created:', admin.email);

    // Create Sample Users
    console.log('👥 Creating sample users...');
    const users = await User.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
        role: 'user',
        isActive: true,
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        phone: '0987654321',
        role: 'user',
        isActive: true,
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: 'password123',
        phone: '5555555555',
        role: 'user',
        isActive: true,
      },
    ]);
    console.log(`✅ ${users.length} users created`);

    // Create Sample Vendors
    console.log('🏪 Creating sample vendors...');
    const vendors = await Vendor.insertMany([
      {
        businessName: 'The Gourmet Kitchen',
        ownerName: 'Sarah Williams',
        email: 'sarah@gourmetkitchen.com',
        password: 'vendor123',
        phone: '1112223333',
        category: 'Restaurant',
        address: {
          street: '123 Main Street',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62701',
          country: 'USA',
        },
        description: 'Fine dining restaurant with locally sourced ingredients',
        images: {
          logo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
          banner: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
          gallery: [
            'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
          ],
        },
        services: ['Lunch Service', 'Dinner Service', 'Catering'],
        businessHours: {
          monday: { open: '11:00', close: '22:00', isClosed: false },
          tuesday: { open: '11:00', close: '22:00', isClosed: false },
          wednesday: { open: '11:00', close: '22:00', isClosed: false },
          thursday: { open: '11:00', close: '22:00', isClosed: false },
          friday: { open: '11:00', close: '23:00', isClosed: false },
          saturday: { open: '10:00', close: '23:00', isClosed: false },
          sunday: { open: '10:00', close: '21:00', isClosed: false },
        },
        status: 'Approved',
        isActive: true,
        rating: 4.5,
        totalReviews: 128,
        approvedAt: new Date(),
        approvedBy: admin._id,
      },
      {
        businessName: 'Fitness First Gym',
        ownerName: 'Mike Thompson',
        email: 'mike@fitnessfirst.com',
        password: 'vendor123',
        phone: '4445556666',
        category: 'Gym',
        address: {
          street: '456 Oak Avenue',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62702',
          country: 'USA',
        },
        description: 'Modern gym with state-of-the-art equipment and personal trainers',
        images: {
          logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
          banner: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
          gallery: [
            'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          ],
        },
        services: ['Monthly Membership', 'Personal Training', 'Group Classes', 'Yoga'],
        businessHours: {
          monday: { open: '05:00', close: '22:00', isClosed: false },
          tuesday: { open: '05:00', close: '22:00', isClosed: false },
          wednesday: { open: '05:00', close: '22:00', isClosed: false },
          thursday: { open: '05:00', close: '22:00', isClosed: false },
          friday: { open: '05:00', close: '20:00', isClosed: false },
          saturday: { open: '07:00', close: '18:00', isClosed: false },
          sunday: { open: '08:00', close: '16:00', isClosed: false },
        },
        status: 'Approved',
        isActive: true,
        rating: 4.8,
        totalReviews: 95,
        approvedAt: new Date(),
        approvedBy: admin._id,
      },
      {
        businessName: 'Bella Hair Salon',
        ownerName: 'Emily Rodriguez',
        email: 'emily@bellahair.com',
        password: 'vendor123',
        phone: '7778889999',
        category: 'Salon',
        address: {
          street: '789 Elm Street',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62703',
          country: 'USA',
        },
        description: 'Premium hair salon and spa services',
        images: {
          logo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
          banner: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
          gallery: [
            'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400',
            'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=400',
          ],
        },
        services: ['Haircut & Style', 'Hair Coloring', 'Spa Treatment', 'Manicure'],
        businessHours: {
          monday: { open: '09:00', close: '18:00', isClosed: false },
          tuesday: { open: '09:00', close: '18:00', isClosed: false },
          wednesday: { open: '09:00', close: '18:00', isClosed: false },
          thursday: { open: '09:00', close: '19:00', isClosed: false },
          friday: { open: '09:00', close: '19:00', isClosed: false },
          saturday: { open: '08:00', close: '17:00', isClosed: false },
          sunday: { open: '00:00', close: '00:00', isClosed: true },
        },
        status: 'Approved',
        isActive: true,
        rating: 4.7,
        totalReviews: 76,
        approvedAt: new Date(),
        approvedBy: admin._id,
      },
      {
        businessName: 'Tech Repair Pro',
        ownerName: 'David Chen',
        email: 'david@techrepair.com',
        password: 'vendor123',
        phone: '2223334444',
        category: 'Other',
        address: {
          street: '321 Tech Boulevard',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62704',
          country: 'USA',
        },
        description: 'Expert computer and phone repair services',
        images: {
          logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400',
          banner: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
          gallery: [],
        },
        services: ['Phone Screen Repair', 'Computer Diagnostics', 'Data Recovery', 'Virus Removal'],
        businessHours: {
          monday: { open: '10:00', close: '18:00', isClosed: false },
          tuesday: { open: '10:00', close: '18:00', isClosed: false },
          wednesday: { open: '10:00', close: '18:00', isClosed: false },
          thursday: { open: '10:00', close: '18:00', isClosed: false },
          friday: { open: '10:00', close: '18:00', isClosed: false },
          saturday: { open: '11:00', close: '15:00', isClosed: false },
          sunday: { open: '00:00', close: '00:00', isClosed: true },
        },
        status: 'Pending',
        isActive: true,
        rating: 0,
        totalReviews: 0,
      },
      {
        businessName: 'Spice Garden Restaurant',
        ownerName: 'Priya Patel',
        email: 'priya@spicegarden.com',
        password: 'vendor123',
        phone: '3334445555',
        category: 'Restaurant',
        address: {
          street: '555 Curry Lane',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62705',
          country: 'USA',
        },
        description: 'Authentic Indian cuisine with vegetarian and vegan options',
        images: {
          logo: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
          banner: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=800',
          gallery: [
            'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
            'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400',
          ],
        },
        services: ['Dine-in', 'Takeout', 'Delivery', 'Party Catering', 'Buffet'],
        businessHours: {
          monday: { open: '11:30', close: '22:00', isClosed: false },
          tuesday: { open: '11:30', close: '22:00', isClosed: false },
          wednesday: { open: '11:30', close: '22:00', isClosed: false },
          thursday: { open: '11:30', close: '22:00', isClosed: false },
          friday: { open: '11:30', close: '23:00', isClosed: false },
          saturday: { open: '11:30', close: '23:00', isClosed: false },
          sunday: { open: '12:00', close: '21:00', isClosed: false },
        },
        status: 'Approved',
        isActive: true,
        rating: 4.6,
        totalReviews: 142,
        approvedAt: new Date(),
        approvedBy: admin._id,
      },
      {
        businessName: 'Downtown Dental Care',
        ownerName: 'Dr. Robert Martinez',
        email: 'robert@downtowndental.com',
        password: 'vendor123',
        phone: '6667778888',
        category: 'Other',
        address: {
          street: '888 Medical Plaza',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62706',
          country: 'USA',
        },
        description: 'Complete dental care with advanced technology and experienced staff',
        images: {
          logo: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400',
          banner: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800',
          gallery: [
            'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400',
            'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400',
          ],
        },
        services: ['Routine Checkup', 'Teeth Cleaning', 'Fillings', 'Root Canal', 'Teeth Whitening', 'Orthodontics'],
        businessHours: {
          monday: { open: '08:00', close: '17:00', isClosed: false },
          tuesday: { open: '08:00', close: '17:00', isClosed: false },
          wednesday: { open: '08:00', close: '17:00', isClosed: false },
          thursday: { open: '08:00', close: '19:00', isClosed: false },
          friday: { open: '08:00', close: '15:00', isClosed: false },
          saturday: { open: '09:00', close: '13:00', isClosed: false },
          sunday: { open: '00:00', close: '00:00', isClosed: true },
        },
        status: 'Approved',
        isActive: true,
        rating: 4.9,
        totalReviews: 203,
        approvedAt: new Date(),
        approvedBy: admin._id,
      },
      {
        businessName: 'Pet Paradise Grooming',
        ownerName: 'Jessica Taylor',
        email: 'jessica@petparadise.com',
        password: 'vendor123',
        phone: '9990001111',
        category: 'Other',
        address: {
          street: '222 Paws Avenue',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62707',
          country: 'USA',
        },
        description: 'Professional pet grooming services for dogs and cats',
        images: {
          logo: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400',
          banner: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
          gallery: [
            'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
            'https://images.unsplash.com/photo-1581888227599-779811939961?w=400',
          ],
        },
        services: ['Bath & Brush', 'Full Grooming', 'Nail Trimming', 'Ear Cleaning', 'Teeth Brushing'],
        businessHours: {
          monday: { open: '09:00', close: '18:00', isClosed: false },
          tuesday: { open: '09:00', close: '18:00', isClosed: false },
          wednesday: { open: '09:00', close: '18:00', isClosed: false },
          thursday: { open: '09:00', close: '18:00', isClosed: false },
          friday: { open: '09:00', close: '18:00', isClosed: false },
          saturday: { open: '10:00', close: '16:00', isClosed: false },
          sunday: { open: '00:00', close: '00:00', isClosed: true },
        },
        status: 'Approved',
        isActive: true,
        rating: 4.8,
        totalReviews: 87,
        approvedAt: new Date(),
        approvedBy: admin._id,
      },
      {
        businessName: 'Elite Auto Repair',
        ownerName: 'James Wilson',
        email: 'james@eliteauto.com',
        password: 'vendor123',
        phone: '5554443333',
        category: 'Other',
        address: {
          street: '777 Garage Road',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62708',
          country: 'USA',
        },
        description: 'Full-service auto repair shop with certified mechanics',
        images: {
          logo: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400',
          banner: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800',
          gallery: [],
        },
        services: ['Oil Change', 'Brake Service', 'Tire Rotation', 'Engine Diagnostics', 'AC Repair', 'Transmission Service'],
        businessHours: {
          monday: { open: '07:00', close: '18:00', isClosed: false },
          tuesday: { open: '07:00', close: '18:00', isClosed: false },
          wednesday: { open: '07:00', close: '18:00', isClosed: false },
          thursday: { open: '07:00', close: '18:00', isClosed: false },
          friday: { open: '07:00', close: '18:00', isClosed: false },
          saturday: { open: '08:00', close: '14:00', isClosed: false },
          sunday: { open: '00:00', close: '00:00', isClosed: true },
        },
        status: 'Pending',
        isActive: true,
        rating: 0,
        totalReviews: 0,
      },
    ]);
    console.log(`✅ ${vendors.length} vendors created`);

    console.log('\n📊 DATABASE SEEDED SUCCESSFULLY!\n');
    console.log('=== LOGIN CREDENTIALS ===');
    console.log('\n👨‍💼 ADMIN LOGIN:');
    console.log('   Email: admin@khoojlocal.com');
    console.log('   Password: admin123');
    console.log('\n👤 SAMPLE USER LOGIN:');
    console.log('   Email: john@example.com');
    console.log('   Password: password123');
    console.log('\n🏪 APPROVED VENDORS (6):');
    console.log('   - The Gourmet Kitchen (Restaurant)');
    console.log('   - Fitness First Gym (Gym)');
    console.log('   - Bella Hair Salon (Salon)');
    console.log('   - Spice Garden Restaurant (Restaurant)');
    console.log('   - Downtown Dental Care (Other)');
    console.log('   - Pet Paradise Grooming (Other)');
    console.log('\n⏳ PENDING VENDORS (2):');
    console.log('   - Tech Repair Pro (Other)');
    console.log('   - Elite Auto Repair (Other)');
    console.log('\n   Note: Pending vendors cannot login until approved by admin.\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedData();
