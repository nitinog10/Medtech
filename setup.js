const fs = require('fs');
const path = require('path');

console.log('🏥 MedTech Hospital Landing Page Setup');
console.log('=====================================\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  const envContent = `# Google Sheets Configuration
# You need to create a Google Cloud Project and enable Google Sheets API
# Then create a service account and download the JSON credentials

GOOGLE_SHEETS_ID=your_google_sheets_id_here
GOOGLE_PROJECT_ID=your_project_id
GOOGLE_PRIVATE_KEY_ID=your_private_key_id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nyour_private_key_here\\n-----END PRIVATE KEY-----\\n"
GOOGLE_CLIENT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=your_client_id
`;
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created');
} else {
  console.log('✅ .env.local file already exists');
}

// Check if data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  console.log('📁 Creating data directory...');
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('✅ Data directory created');
} else {
  console.log('✅ Data directory already exists');
}

console.log('\n🚀 Setup complete! Next steps:');
console.log('1. Install dependencies: npm install');
console.log('2. Set up Google Sheets API (see README.md)');
console.log('3. Update .env.local with your credentials');
console.log('4. Run the app: npm run dev');
console.log('\n📚 For detailed setup instructions, see README.md');
