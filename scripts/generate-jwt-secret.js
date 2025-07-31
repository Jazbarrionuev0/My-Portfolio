#!/usr/bin/env node

// Script to generate a secure JWT secret
// Run with: node scripts/generate-jwt-secret.js

const crypto = require("crypto");

const secret = crypto.randomBytes(64).toString("hex");

console.log("Generated JWT Secret:");
console.log(secret);
console.log("\nAdd this to your .env.local file:");
console.log(`JWT_SECRET=${secret}`);
console.log("\nMake sure to keep this secret secure and never commit it to version control!");
