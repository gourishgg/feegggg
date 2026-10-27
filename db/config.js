import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Database configuration from environment variables
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'desh_dekho',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test connection on startup
pool.getConnection()
  .then(connection => {
    console.log('✅ MySQL Connected Successfully');
    connection.release();
  })
  .catch(err => {
    console.error('❌ MySQL Connection Failed:', err.message);
  });

// Initialize database and table
export async function initializeDatabase() {
  try {
    // Create database if not exists
    const tempConfig = { ...dbConfig, database: undefined };
    const tempPool = mysql.createPool(tempConfig);

    await tempPool.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
    await tempPool.end();

    // Create locations table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS locations (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        lat DECIMAL(10, 6) NOT NULL,
        lon DECIMAL(10, 6) NOT NULL,
        category VARCHAR(50) NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Database and tables initialized');
  } catch (err) {
    console.error('❌ Database initialization failed:', err.message);
    throw err;
  }
}

// Location CRUD operations
export async function getAllLocations() {
  try {
    const [rows] = await pool.query('SELECT * FROM locations ORDER BY created_at DESC');
    return rows;
  } catch (err) {
    console.error('Error fetching locations:', err);
    throw err;
  }
}

export async function createLocation(location) {
  try {
    const { name, state, lat, lon, category, notes } = location;
    const id = Date.now().toString();

    await pool.query(
      `INSERT INTO locations (id, name, state, lat, lon, category, notes) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, name, state, parseFloat(lat), parseFloat(lon), category, notes || '']
    );

    const [rows] = await pool.query('SELECT * FROM locations WHERE id = ?', [id]);
    return rows[0];
  } catch (err) {
    console.error('Error creating location:', err);
    throw err;
  }
}

export async function updateLocation(id, updates) {
  try {
    const { name, state, lat, lon, category, notes } = updates;

    const fields = [];
    const values = [];

    if (name !== undefined) { fields.push('name = ?'); values.push(name); }
    if (state !== undefined) { fields.push('state = ?'); values.push(state); }
    if (lat !== undefined) { fields.push('lat = ?'); values.push(parseFloat(lat)); }
    if (lon !== undefined) { fields.push('lon = ?'); values.push(parseFloat(lon)); }
    if (category !== undefined) { fields.push('category = ?'); values.push(category); }
    if (notes !== undefined) { fields.push('notes = ?'); values.push(notes); }

    if (fields.length === 0) {
      const [rows] = await pool.query('SELECT * FROM locations WHERE id = ?', [id]);
      return rows[0];
    }

    values.push(id);

    await pool.query(
      `UPDATE locations SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    const [rows] = await pool.query('SELECT * FROM locations WHERE id = ?', [id]);
    return rows[0];
  } catch (err) {
    console.error('Error updating location:', err);
    throw err;
  }
}

export async function deleteLocation(id) {
  try {
    const [result] = await pool.query('DELETE FROM locations WHERE id = ?', [id]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error('Error deleting location:', err);
    throw err;
  }
}

// Seed initial data if table is empty
export async function seedInitialData() {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM locations');

    if (rows[0].count === 0) {
      const initialLocations = [
        { id: '1', name: "Amaravati", state: "Andhra Pradesh", lat: 16.5062, lon: 80.6480, category: "Capital", notes: "Andhra Pradesh Capital" },
        { id: '2', name: "Itanagar", state: "Arunachal Pradesh", lat: 27.0844, lon: 93.6053, category: "Capital", notes: "Arunachal Pradesh Capital" },
        { id: '3', name: "Dispur", state: "Assam", lat: 26.1445, lon: 91.7362, category: "Capital", notes: "Assam Capital" },
        { id: '4', name: "Patna", state: "Bihar", lat: 25.5941, lon: 85.1376, category: "Capital", notes: "Bihar Capital" },
        { id: '5', name: "Raipur", state: "Chhattisgarh", lat: 21.2514, lon: 81.6296, category: "Capital", notes: "Chhattisgarh Capital" },
        { id: '6', name: "New Delhi", state: "Delhi", lat: 28.6139, lon: 77.2090, category: "Capital", notes: "National Capital Territory" },
        { id: '7', name: "Panaji", state: "Goa", lat: 15.4989, lon: 73.8278, category: "Coastal", notes: "Goa Capital & Beach Resort" },
        { id: '8', name: "Gandhinagar", state: "Gujarat", lat: 23.2156, lon: 72.6369, category: "Capital", notes: "Gujarat Capital" },
        { id: '9', name: "Chandigarh", state: "Punjab / Haryana", lat: 30.7333, lon: 76.7794, category: "Capital", notes: "Joint Capital Territory" },
        { id: '10', name: "Shimla", state: "Himachal Pradesh", lat: 31.1048, lon: 77.1734, category: "Hill Station", notes: "Popular Hill Station & Capital" },
        { id: '11', name: "Srinagar", state: "Jammu & Kashmir", lat: 34.0837, lon: 74.7973, category: "Hill Station", notes: "Summer Capital of J&K" },
        { id: '12', name: "Ranchi", state: "Jharkhand", lat: 23.3441, lon: 85.3096, category: "Capital", notes: "Jharkhand Capital" },
        { id: '13', name: "Bengaluru", state: "Karnataka", lat: 12.9716, lon: 77.5946, category: "IT Hub", notes: "Silicon Valley of India" },
        { id: '14', name: "Thiruvananthapuram", state: "Kerala", lat: 8.5241, lon: 76.9366, category: "Coastal", notes: "Kerala Capital" },
        { id: '15', name: "Leh", state: "Ladakh", lat: 34.1526, lon: 77.5771, category: "High Altitude", notes: "Ladakh Capital" },
        { id: '16', name: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lon: 77.4126, category: "Capital", notes: "City of Lakes" },
        { id: '17', name: "Mumbai", state: "Maharashtra", lat: 19.0760, lon: 72.8777, category: "Financial Hub", notes: "Maharashtra Capital" },
        { id: '18', name: "Imphal", state: "Manipur", lat: 24.8170, lon: 93.9368, category: "Capital", notes: "Manipur Capital" },
        { id: '19', name: "Shillong", state: "Meghalaya", lat: 25.5788, lon: 91.8933, category: "Hill Station", notes: "Scotland of the East" },
        { id: '20', name: "Aizawl", state: "Mizoram", lat: 23.7271, lon: 92.7176, category: "Capital", notes: "Mizoram Capital" },
        { id: '21', name: "Kohima", state: "Nagaland", lat: 25.6751, lon: 94.1086, category: "Capital", notes: "Nagaland Capital" },
        { id: '22', name: "Bhubaneswar", state: "Odisha", lat: 20.2961, lon: 85.8245, category: "Temple City", notes: "Odisha Capital" },
        { id: '23', name: "Jaipur", state: "Rajasthan", lat: 26.9124, lon: 75.7873, category: "Heritage", notes: "Pink City of India" },
        { id: '24', name: "Gangtok", state: "Sikkim", lat: 27.3389, lon: 88.6065, category: "Hill Station", notes: "Sikkim Capital" },
        { id: '25', name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lon: 80.2707, category: "Coastal", notes: "Tamil Nadu Capital" },
        { id: '26', name: "Hyderabad", state: "Telangana", lat: 17.3850, lon: 78.4867, category: "IT Hub", notes: "Telangana Capital" },
        { id: '27', name: "Agartala", state: "Tripura", lat: 23.8315, lon: 91.2868, category: "Capital", notes: "Tripura Capital" },
        { id: '28', name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lon: 80.9462, category: "Heritage", notes: "City of Nawabs" },
        { id: '29', name: "Dehradun", state: "Uttarakhand", lat: 30.3165, lon: 78.0322, category: "Hill Station", notes: "Uttarakhand Capital" },
        { id: '30', name: "Kolkata", state: "West Bengal", lat: 22.5726, lon: 88.3639, category: "Cultural Hub", notes: "City of Joy" }
      ];

      for (const loc of initialLocations) {
        await pool.query(
          `INSERT INTO locations (id, name, state, lat, lon, category, notes) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [loc.id, loc.name, loc.state, loc.lat, loc.lon, loc.category, loc.notes]
        );
      }

      console.log('✅ Initial locations seeded into MySQL');
    }
  } catch (err) {
    console.error('Error seeding data:', err);
    throw err;
  }
}

export default pool;