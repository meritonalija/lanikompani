const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];


  // API 1: Ruajtja e HTML-it te plote
  if (req.method === 'POST' && reqUrl === '/api/save') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        if (payload && payload.html) {
          const targetFile = path.join(__dirname, 'index.html');
          fs.writeFileSync(targetFile, payload.html, 'utf8');
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: true, message: 'Faqja u ruajt me sukses!' }));
          return;
        }
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: err.message }));
        return;
      }
    });
    return;
  }

  // API 2: Ngarkimi i fotove direkte nga kompjuteri
  if (req.method === 'POST' && reqUrl === '/api/upload') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        if (payload && payload.data) {
          let base64Data = payload.data.replace(/^data:image\/\w+;base64,/, '');
          let buffer = Buffer.from(base64Data, 'base64');
          
          let extension = '.jpg';
          if (payload.data.includes('image/png')) extension = '.png';
          else if (payload.data.includes('image/webp')) extension = '.webp';
          else if (payload.data.includes('image/svg+xml')) extension = '.svg';

          let fileName = 'foto_' + Date.now() + extension;
          let filePath = path.join(__dirname, 'images', fileName);

          fs.writeFileSync(filePath, buffer);
          let relativeUrl = 'images/' + fileName;

          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: true, url: relativeUrl }));
          return;
        }
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: err.message }));
        return;
      }
    });
    return;
  }

  // Servimi i skedareve statike
  let filePath = path.join(__dirname, reqUrl === '/' ? 'index.html' : decodeURIComponent(reqUrl));

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Faqja nuk u gjet');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, HOST, () => {
});
