// Simple script to run the workflow import
const { spawn } = require('child_process');

console.log('🚀 Starting workflow import process...');

// Run the import script using Node.js
const importProcess = spawn('node', ['import_workflows.cjs'], {
  stdio: 'inherit'
});

importProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Import completed successfully!');
  } else {
    console.error(`❌ Import failed with exit code ${code}`);
  }
});

importProcess.on('error', (error) => {
  console.error('❌ Failed to start import process:', error);
});