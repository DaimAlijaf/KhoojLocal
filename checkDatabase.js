const mongoose = require('mongoose');
const User = require('./server/models/User');
const Vendor = require('./server/models/Vendor');

mongoose.connect('mongodb://localhost:27017/khoojlocal').then(async () => {
  console.log('✅ Connected to MongoDB\n');
  
  const users = await User.find({}).select('name email createdAt');
  console.log(`👥 Total Users: ${users.length}`);
  users.forEach(u => {
    console.log(`   - ${u.name} (${u.email})`);
  });
  
  console.log('');
  
  const vendors = await Vendor.find({}).select('businessName email status createdAt');
  console.log(`🏪 Total Vendors: ${vendors.length}`);
  vendors.forEach(v => {
    console.log(`   - ${v.businessName} (${v.email}) - Status: ${v.status}`);
  });
  
  process.exit(0);
});
