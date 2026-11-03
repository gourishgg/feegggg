import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeDatabase, seedInitialData, getAllLocations, createLocation, updateLocation, deleteLocation } from './db/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');

// Initialize database on startup
async function initializeApp() {
  try {
    await initializeDatabase();
    await seedInitialData();
  } catch (err) {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  }
}

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);

  // GET /api/locations
  if (parsedUrl.pathname === '/api/locations' && req.method === 'GET') {
    try {
      const locations = await getAllLocations();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(locations));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to fetch locations' }));
    }
    return;
  }

  // POST /api/locations
  if (parsedUrl.pathname === '/api/locations' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const newLoc = JSON.parse(body);
        if (!newLoc.name || newLoc.lat === undefined || newLoc.lon === undefined) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Name, lat, and lon are required' }));
          return;
        }

        const created = await createLocation(newLoc);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(created));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload or database error' }));
      }
    });
    return;
  }

  // PUT /api/locations/:id
  if (parsedUrl.pathname.startsWith('/api/locations/') && req.method === 'PUT') {
    const id = parsedUrl.pathname.split('/')[3];
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const updateData = JSON.parse(body);
        const updated = await updateLocation(id, updateData);

        if (!updated) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Location not found' }));
          return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updated));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload or database error' }));
      }
    });
    return;
  }

  // DELETE /api/locations/:id
  if (parsedUrl.pathname.startsWith('/api/locations/') && req.method === 'DELETE') {
    const id = parsedUrl.pathname.split('/')[3];
    try {
      const deleted = await deleteLocation(id);

      if (!deleted) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Location not found' }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, deletedId: id }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Database error' }));
    }
    return;
  }

  // Serve static files from Vite build (dist directory)
  let reqPath = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;
  let filePath = path.join(DIST_DIR, reqPath);

  // Fallback to index.html for SPA routing if file does not exist
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
      res.end(content);
    }
  });
});

async function startServer() {
  await initializeApp();

  server.listen(PORT, () => {
    console.log(`\n🚀 Codeverse Weather DBMS Server running at http://localhost:${PORT}`);
    console.log(`🗄️  Database: MySQL (${process.env.DB_NAME || 'desh_dekho'})\n`);
  });
}

startServer();