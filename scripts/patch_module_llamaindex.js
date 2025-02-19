const fs = require('fs');
const path = require('path');

// Define the path to the openai package.json
const llamaindexPackagePath = path.join(__dirname, '../node_modules/llamaindex/package.json');

try {
    // Read the original package.json
    const packageJson = fs.readFileSync(llamaindexPackagePath, 'utf8');
        
    let modifiedPackageJson = packageJson.replaceAll('./dist/index.js', './dist/cjs/index.js');
    modifiedPackageJson = modifiedPackageJson.replaceAll('./dist/*.js', './dist/cjs/*.js');

    // Write the modified content back to package.json
    fs.writeFileSync(llamaindexPackagePath, modifiedPackageJson);
    
    console.log('Successfully modified package.json and created backup');
} catch (error) {
    console.error('Error:', error.message);
}