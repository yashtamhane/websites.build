// Script to generate bcrypt password hash for dashboard authentication
// Usage: node scripts/generate-password-hash.js <your-password>

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('Error: Please provide a password');
  console.error('Usage: node scripts/generate-password-hash.js <your-password>');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);

console.log('\n=== Password Hash Generated ===\n');
console.log('Add this to your .env.local file:');
console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
console.log('Make sure to also set:');
console.log('ADMIN_USERNAME=your-username\n');
