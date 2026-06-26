import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;

async function initDb() {
  db = await open({
    filename: path.join(__dirname, '..', 'portfolio.sqlite'),
    driver: sqlite3.Database
  });

  // Check if tables exist to determine if we need to run schema/seed
  const tableCheck = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='cv_profile'");
  
  if (!tableCheck) {
    console.log('Initializing SQLite database with schema and seed...');
    const schema = fs.readFileSync(path.join(__dirname, '..', '..', 'database', 'sqlite_schema.sql'), 'utf-8');
    const seed = fs.readFileSync(path.join(__dirname, '..', '..', 'database', 'sqlite_seed.sql'), 'utf-8');
    
    await db.exec(schema);
    await db.exec(seed);
    console.log('Database initialized successfully.');
  }
}

// Immediately invoke initDb but don't block exports
// Queries will await a microtask to ensure db is ready if needed, 
// but since node requires time to start the server, this is usually fast enough.
// To be safe, we wrap query calls
const initPromise = initDb();

const pool = {
  query: async (text, params = []) => {
    await initPromise;
    
    // SQLite uses $1, $2 or ? but pg uses $1, $2
    // sqlite package can handle named parameters or ?. Let's just convert $1 to ?
    const sqliteText = text.replace(/\$\d+/g, '?');
    
    const isSelect = sqliteText.trim().toUpperCase().startsWith('SELECT') || sqliteText.trim().toUpperCase().includes('RETURNING');
    
    if (isSelect) {
      const rows = await db.all(sqliteText, params);
      return { rows };
    } else {
      const result = await db.run(sqliteText, params);
      // for INSERT ... RETURNING *, sqlite.run doesn't return the rows.
      // But we handled RETURNING in isSelect so db.all is used above.
      return { rows: [], result };
    }
  }
};

export default pool;
