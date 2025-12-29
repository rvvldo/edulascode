// Script untuk memverifikasi environment variables
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Checking Environment Variables...\n');

// Check if .env.local exists
const envPath = join(__dirname, '.env.local');
if (!existsSync(envPath)) {
    console.error('❌ .env.local file not found!');
    console.log('📝 Please create .env.local file in the root directory');
    process.exit(1);
}

console.log('✅ .env.local file exists\n');

// Read and parse .env.local
const envContent = readFileSync(envPath, 'utf-8');
const envVars = {};

envContent.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            envVars[key.trim()] = valueParts.join('=').trim();
        }
    }
});

// Required variables
const required = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_DATABASE_URL',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
];

let allValid = true;

console.log('Checking required variables:\n');

required.forEach(varName => {
    const value = envVars[varName];
    if (!value || value === '') {
        console.error(`❌ ${varName} is missing or empty`);
        allValid = false;
    } else {
        // Mask sensitive values
        const displayValue = varName.includes('KEY') || varName.includes('ID') 
            ? value.substring(0, 10) + '...' 
            : value;
        console.log(`✅ ${varName}: ${displayValue}`);
    }
});

console.log('\n' + '='.repeat(50));

if (allValid) {
    console.log('✅ All environment variables are set correctly!');
    console.log('\n💡 Next steps:');
    console.log('   1. Restart your dev server: npm run dev');
    console.log('   2. Check browser console for Firebase connection');
    process.exit(0);
} else {
    console.error('❌ Some environment variables are missing!');
    console.log('\n📝 Please update your .env.local file');
    console.log('   See .env.example for reference');
    process.exit(1);
}
