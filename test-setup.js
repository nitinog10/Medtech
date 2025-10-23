const fs = require('fs');
const path = require('path');

console.log('🧪 Testing MedTech Hospital Setup');
console.log('================================\n');

// Check required files
const requiredFiles = [
  'package.json',
  'app/page.tsx',
  'app/layout.tsx',
  'app/globals.css',
  'app/components/EbookModal.tsx',
  'app/api/submit-form/route.ts',
  'tailwind.config.js',
  'next.config.js',
  'tsconfig.json'
];

let allFilesExist = true;

console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check data directory
const dataDir = path.join(process.cwd(), 'data');
if (fs.existsSync(dataDir)) {
  console.log('✅ data/ directory');
} else {
  console.log('❌ data/ directory - MISSING');
  allFilesExist = false;
}

// Check package.json dependencies
console.log('\n📦 Checking dependencies...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = [
    'next',
    'react',
    'react-dom',
    'googleapis',
    'react-hook-form',
    'tailwindcss',
    'lucide-react'
  ];
  
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`✅ ${dep}@${packageJson.dependencies[dep]}`);
    } else {
      console.log(`❌ ${dep} - MISSING`);
      allFilesExist = false;
    }
  });
} catch (error) {
  console.log('❌ Error reading package.json');
  allFilesExist = false;
}

console.log('\n📋 Summary:');
if (allFilesExist) {
  console.log('✅ All required files and dependencies are present!');
  console.log('\n🚀 Next steps:');
  console.log('1. Run: npm install');
  console.log('2. Create .env.local file (see INSTALLATION.md)');
  console.log('3. Run: npm run dev');
  console.log('4. Open: http://localhost:3000');
} else {
  console.log('❌ Some files or dependencies are missing!');
  console.log('Please check the missing items above and try again.');
}

console.log('\n📚 For detailed setup instructions, see INSTALLATION.md');
