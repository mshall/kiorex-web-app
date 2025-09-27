#!/usr/bin/env node

/**
 * Global command to check for console errors and build issues
 * Usage: node scripts/check-errors.js
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Checking for console errors and build issues...\n');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function logSuccess(message) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function logError(message) {
  console.log(`${colors.red}❌ ${message}${colors.reset}`);
}

function logWarning(message) {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
}

function logInfo(message) {
  console.log(`${colors.blue}ℹ️  ${message}${colors.reset}`);
}

function logHeader(message) {
  console.log(`${colors.bold}${colors.blue}${message}${colors.reset}`);
}

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  logError('package.json not found. Please run this script from the project root.');
  process.exit(1);
}

// 1. Check TypeScript compilation
logHeader('1. Checking TypeScript compilation...');
try {
  execSync('npx tsc --noEmit', { stdio: 'pipe' });
  logSuccess('TypeScript compilation passed');
} catch (error) {
  logError('TypeScript compilation failed:');
  console.log(error.stdout?.toString() || error.message);
}

// 2. Check ESLint
logHeader('2. Checking ESLint...');
try {
  execSync('npx eslint src --ext .ts,.tsx --max-warnings 0', { stdio: 'pipe' });
  logSuccess('ESLint passed');
} catch (error) {
  logError('ESLint found issues:');
  console.log(error.stdout?.toString() || error.message);
}

// 3. Check for common syntax errors
logHeader('3. Checking for common syntax errors...');

const commonErrors = [
  {
    pattern: /const\s+\w+\s*=\s*\w+\.filter\(/g,
    message: 'Potential duplicate variable declarations (filter)',
    files: []
  },
  {
    pattern: /export\s*{\s*[^}]*,\s*[^}]*,\s*[^}]*\s*}/g,
    message: 'Check for missing exports in index files',
    files: []
  },
  {
    pattern: /Unterminated regexp literal/g,
    message: 'Unterminated regexp literal',
    files: []
  }
];

// Check specific files for common issues
const filesToCheck = [
  'src/pages/users/clinic/ClinicPatients.tsx',
  'src/pages/users/clinic/ClinicAttendance.tsx',
  'src/pages/users/clinic/index.ts',
  'src/App.tsx',
  'src/components/RoleBasedNavigation.tsx'
];

let hasSyntaxErrors = false;

filesToCheck.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for duplicate const declarations
    const constMatches = content.match(/const\s+(\w+)\s*=/g);
    if (constMatches) {
      const duplicates = constMatches.filter((match, index, arr) => 
        arr.indexOf(match) !== index
      );
      if (duplicates.length > 0) {
        logError(`Duplicate const declarations in ${filePath}: ${duplicates.join(', ')}`);
        hasSyntaxErrors = true;
      }
    }
    
    // Check for missing semicolons in JSX
    const jsxLines = content.split('\n').filter(line => line.includes('</div>') || line.includes('</Card>'));
    const missingSemicolons = jsxLines.filter(line => !line.trim().endsWith(';') && !line.trim().endsWith('>'));
    if (missingSemicolons.length > 0) {
      logWarning(`Potential missing semicolons in ${filePath}`);
    }
  } else {
    logWarning(`File not found: ${filePath}`);
  }
});

if (!hasSyntaxErrors) {
  logSuccess('No common syntax errors found');
}

// 4. Check for missing exports
logHeader('4. Checking for missing exports...');

// Check if all clinic components are properly exported
const clinicComponents = [
  'ClinicDashboard',
  'ClinicManagement', 
  'ClinicAppointments',
  'ClinicPatients',
  'ClinicBilling',
  'ClinicAnalytics',
  'ClinicInventory',
  'ClinicStaff',
  'ClinicAttendance'
];

const indexContent = fs.readFileSync('src/pages/users/clinic/index.ts', 'utf8');
const missingExports = clinicComponents.filter(component => 
  !indexContent.includes(`export { default as ${component} }`)
);

if (missingExports.length > 0) {
  logError(`Missing exports in clinic index.ts: ${missingExports.join(', ')}`);
} else {
  logSuccess('All clinic components properly exported');
}

// 5. Check import statements in App.tsx
logHeader('5. Checking import statements...');

const appContent = fs.readFileSync('src/App.tsx', 'utf8');
const clinicImportMatch = appContent.match(/import\s*{\s*([^}]+)\s*}\s*from\s*["']\.\/pages\/users\/clinic["']/);
if (clinicImportMatch) {
  const importedComponents = clinicImportMatch[1].split(',').map(comp => comp.trim());
  const missingImports = clinicComponents.filter(comp => !importedComponents.includes(comp));
  
  if (missingImports.length > 0) {
    logError(`Missing imports in App.tsx: ${missingImports.join(', ')}`);
  } else {
    logSuccess('All clinic components properly imported in App.tsx');
  }
} else {
  logError('Could not find clinic import statement in App.tsx');
}

// 6. Check for console.log statements (optional)
logHeader('6. Checking for console.log statements...');
try {
  const result = execSync('grep -r "console\\.log" src --include="*.ts" --include="*.tsx" || true', { 
    encoding: 'utf8',
    stdio: 'pipe'
  });
  
  if (result.trim()) {
    logWarning('Found console.log statements (consider removing for production):');
    console.log(result);
  } else {
    logSuccess('No console.log statements found');
  }
} catch (error) {
  logInfo('Could not check for console.log statements');
}

// 7. Check if server is running
logHeader('7. Checking if development server is running...');
try {
  const response = execSync('curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/ || echo "not_running"', { 
    encoding: 'utf8',
    stdio: 'pipe'
  });
  
  if (response.trim() === '200') {
    logSuccess('Development server is running on http://localhost:8080/');
  } else {
    logWarning('Development server is not running. Start it with: npm run dev');
  }
} catch (error) {
  logWarning('Could not check server status');
}

console.log(`\n${colors.bold}${colors.blue}🎯 Error Check Complete!${colors.reset}`);
console.log(`${colors.blue}Run this command anytime to check for errors: node scripts/check-errors.js${colors.reset}`);
