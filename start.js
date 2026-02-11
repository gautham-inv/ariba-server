/**
 * Run the built Nest app from the directory where this file lives.
 * Use this as Render Start Command: node start.js
 */
const path = require("path");
const fs = require("fs");

const dir = path.resolve(__dirname);
process.chdir(dir);

console.log("[start.js] cwd:", process.cwd());
console.log("[start.js] __dirname:", __dirname);
console.log("[start.js] files at root:", fs.readdirSync(dir));

const distPath = path.join(dir, "dist");
if (fs.existsSync(distPath)) {
  console.log("[start.js] dist/ contents:", fs.readdirSync(distPath));
} else {
  console.error("[start.js] ERROR: dist/ folder does NOT exist at", distPath);
  console.error("[start.js] The build step (nest build) likely did not run or failed.");
  process.exit(1);
}

require("./dist/main");
