const fs = require('fs');
const dotenv = require('dotenv');
let envConfig;
if (process.env.NODE_ENV === 'test') {
  envConfig = dotenv.parse(fs.readFileSync('.env.test'));
} else {
  envConfig = dotenv.parse(fs.readFileSync('.env'));
}
for (var k in envConfig) {
  process.env[k] = envConfig[k];
}
