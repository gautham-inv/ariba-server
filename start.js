/**
 * Run the built Nest app from the directory where this file lives.
 * Use this as Render Start Command: node start.js
 * Fixes "Cannot find module .../src/dist/main" when Render's cwd differs from repo root.
 */
const path = require("path");
const dir = path.resolve(__dirname);
process.chdir(dir);
require("./dist/main");
