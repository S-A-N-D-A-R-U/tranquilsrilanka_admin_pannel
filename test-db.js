const mongoose = require('mongoose');
const fs = require('fs');
const envData = fs.readFileSync('.env.local', 'utf8');
const match = envData.match(/MONGODB_URI=(.*)/);
if(match) process.env.MONGODB_URI = match[1].trim();

const uri = process.env.MONGODB_URI;

console.log("Connecting to MONGODB...");
mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("SUCCESSFULLY CONNECTED");
    process.exit(0);
  })
  .catch((err) => {
    console.log("FAILED TO CONNECT", err.message);
    process.exit(1);
  });
