import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 8080;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.glb':  'model/gltf-binary',
  '.json': 'application/json; charset=utf-8',
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // Endpoint de la lista de modelos
  if (url.pathname === '/api/models') {
    fs.readdir(__dirname, (err, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
        return;
      }
      const glbFiles = files
        .filter(f => f.toLowerCase().endsWith('.glb'))
        .sort((a, b) => a.localeCompare(b));

      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      });
      res.end(JSON.stringify(glbFiles));
    });
    return;
  }

  let filePath;
  if (url.pathname === '/' || url.pathname === '/index.html') {
    filePath = path.join(__dirname, 'index.html');
  } else if (url.pathname.startsWith('/models/')) {
    const filename = path.basename(decodeURIComponent(url.pathname));
    if (filename.toLowerCase().endsWith('.glb')) {
      filePath = path.join(__dirname, filename);
    }
  }

  if (!filePath) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err) {
      res.writeHead(404);
      res.end('Archivo no encontrado');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': mime,
      'Content-Length': stat.size,
      'Access-Control-Allow-Origin': '*',
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Visor 3D en http://localhost:${PORT}`);
});
