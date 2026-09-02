import app from './app.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { seedDatabaseIfEmpty } from './db/seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`========================================`);
  console.log(`🚀 MarketTrace AI Backend Server        `);
  console.log(`========================================`);
  console.log(`Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Port: ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}/api   `);
  console.log(`========================================`);

  try {
    await seedDatabaseIfEmpty();
  } catch (err) {
    console.error('Seeding error:', err);
  }
});
