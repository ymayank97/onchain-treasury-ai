import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    role: text('role').notNull(),
    created_at: integer('created_at')
        .notNull()
        .default(sql`(unixepoch())`),
    updated_at: integer('updated_at')
        .notNull()
        .default(sql`(unixepoch())`)
});

export const companies = sqliteTable('companies', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    account_number: text('account_number').notNull().unique(),
    branch_code: text('branch_code').notNull(),
    user_id: text('user_id')
        .notNull()
        .references(() => users.id),
    created_at: integer('created_at')
        .notNull()
        .default(sql`(unixepoch())`),
    updated_at: integer('updated_at')
        .notNull()
        .default(sql`(unixepoch())`)
});

export const departments = sqliteTable('departments', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    company_id: text('company_id')
        .notNull()
        .references(() => companies.id),
    created_at: integer('created_at')
        .notNull()
        .default(sql`(unixepoch())`),
    updated_at: integer('updated_at')
        .notNull()
        .default(sql`(unixepoch())`)
});
