
const config = require('./build/config');

const connection = {
  port: process.env.KNEX_PORT || '5432',
  host: process.env.KNEX_HOST || 'db',
  database: process.env.KNEX_DATABASE || 'postgres',
  user: process.env.KNEX_USER || 'postgres',
  password: process.env.KNEX_PASSWORD || 'postgres',
  charset: 'utf8',
};

const settings = {
  client: 'pg',
  connection,
  pool: {
    // Acquiring connection from the connection pool should fail after 15 seconds.
    requestTimeout: (15 * 1000),
  },
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

const connections = {
  development: Object.assign({}, settings, { debug: false }),
};

module.exports = connections;
