import * as schema from './schema';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const sqlite = new Database('sqlite.db');

// Drop existing tables to ensure clean state
sqlite.exec(`
  DROP TABLE IF EXISTS departments;
  DROP TABLE IF EXISTS companies;
  DROP TABLE IF EXISTS users;
`);

// Create tables with proper column names
sqlite.exec(`
  CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE companies (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    account_number TEXT NOT NULL UNIQUE,
    branch_code TEXT NOT NULL,
    user_id TEXT NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE departments (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    company_id TEXT NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
    FOREIGN KEY (company_id) REFERENCES companies(id)
  );

  -- Insert test user
  INSERT INTO users (id, name, email, password, role)
  VALUES ('1', 'Test User', 'test@example.com', 'password123', 'admin');
`);

export const db = drizzle(sqlite, { schema });

export async function runMigrations() {
    // Add your migration logic here
    // Example:
    // await migrate(db, { migrationsFolder: 'drizzle' });
}
