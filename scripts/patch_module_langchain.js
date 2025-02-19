const fs = require('fs');
const path = require('path');

// Define the path to the openai package.json
const langchainPackagePath = path.join(__dirname, '../node_modules/@langchain/core/package.json');
const langchainPackagePathOpenai = path.join(__dirname, '../node_modules/@langchain/openai/package.json');
const langchainPackagePathMain = path.join(__dirname, '../node_modules/langchain/package.json');

for (let packagePath of [langchainPackagePath, langchainPackagePathOpenai, langchainPackagePathMain]) {
    try {
        // Read the original package.json
        const packageJson = fs.readFileSync(packagePath, 'utf8');
            
        let modifiedPackageJson = packageJson.replaceAll('.js"', '.cjs"');
        // modifiedPackageJson = modifiedPackageJson.replaceAll('./dist/*.js', './dist/cjs/*.js');
    
        // Write the modified content back to package.json
        fs.writeFileSync(packagePath, modifiedPackageJson);
        
        console.log(`Successfully modified ${packagePath} and created backup`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

