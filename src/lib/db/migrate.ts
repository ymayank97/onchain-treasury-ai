import { db } from './index';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

// This will automatically run needed migrations on the database
migrate(db, { migrationsFolder: './drizzle' });
