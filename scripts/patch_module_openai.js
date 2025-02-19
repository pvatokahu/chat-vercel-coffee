const fs = require('fs');
const path = require('path');

// Define the path to the openai package.json
const openaiPackagePath = path.join(__dirname, '../node_modules/openai/package.json');
const backupPath = path.join(__dirname, '../node_modules/openai/package.json.backup');

try {
    // Read the original package.json
    const packageJson = fs.readFileSync(openaiPackagePath, 'utf8');
    
    // Create backup of original file
    fs.writeFileSync(backupPath, packageJson);
    
    // Replace all occurrences of "mjs" with "js"
    let modifiedPackageJson = packageJson.replaceAll('./index.d.mts', './index.d.ts');
    modifiedPackageJson = modifiedPackageJson.replaceAll('./index.mjs', './index.js');
    
    // Write the modified content back to package.json
    fs.writeFileSync(openaiPackagePath, modifiedPackageJson);
    
    console.log(`Successfully modified ${openaiPackagePath} and created backup`);
} catch (error) {
    console.error('Error:', error.message);
}