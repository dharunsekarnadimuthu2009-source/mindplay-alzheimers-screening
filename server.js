// Zero-dependency Node.js static file server for MindPlay Frontend
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = process.env.PORT || 8000;
const PUBLIC_DIR = path.join(__dirname, 'frontend');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg'
};

const server = http.createServer((req, res) => {
  // CORS & No-Cache headers for development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  let sanitizedPath = path.normalize(req.url.split('?')[0]);
  if (sanitizedPath === '/' || sanitizedPath === '') {
    sanitizedPath = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, sanitizedPath);

  // Security check: ensure path is within PUBLIC_DIR
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log('='.repeat(60));
  console.log('🧠 MindPlay: Multi-Modal Early Alzheimer\'s Screening System');
  console.log('🏆 Dexathon 2026 | Team Technova (DEX26056)');
  console.log('='.repeat(60));
  console.log(`🚀 Node.js Server running at: ${url}`);
  console.log(`📂 Serving directory: ${PUBLIC_DIR}`);
  console.log('='.repeat(60));

  // Open browser on Windows
  const startCmd = process.platform === 'win32' ? `start ${url}` : `open ${url}`;
  exec(startCmd, (err) => {
    if (err) console.log(`Note: Please open ${url} in your browser.`);
  });
});
