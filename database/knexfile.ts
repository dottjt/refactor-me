import path from 'path';
import { config } from 'dotenv';
config({ path: path.resolve(__dirname, '..', '.env') });

export const development = {
  client: 'postgresql',
  connection: {
    host: process.env.POSTGRES_HOST,
    port: process.env.CUSTOM_DB_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  },
  pool: {
    min: 2,
    max: 10,
  },
  seeds: {
    directory: path.resolve(__dirname, 'seeds'),
  },
  migrations: {
    directory: path.resolve(__dirname, 'migrations'),
    tableName: 'knex_migrations_refactor_me'
  }
}

export const test = {
  client: 'postgresql',
  connection: {
    host: process.env.POSTGRES_HOST,
    port: process.env.CUSTOM_DB_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  },
  pool: {
    min: 2,
    max: 10,
  },
  seeds: {
    directory: path.resolve(__dirname, 'seeds'),
  },
  migrations: {
    directory: path.resolve(__dirname, 'migrations'),
    tableName: 'knex_migrations_refactor_me'
  }
};
