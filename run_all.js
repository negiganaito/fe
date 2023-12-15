
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

process.chdir(__dirname);

if (!fs.existsSync('.src_manifest.json')) {
  execSync('pnpm manifest');
}
if (!fs.existsSync('.source_strings.json')) {
  execSync('pnpm collect-fbts');
}
if (!fs.existsSync(path.resolve('src', 'translatedFbts.json'))) {
  execSync('pnpm translate-fbts');
}
