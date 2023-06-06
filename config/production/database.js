const parse = require('pg-connection-string').parse;
const config = parse(process.env.P_DB_EXTERNAL_URL);
    module.exports = ({ env }) => ({
      connection: {
        client: 'postgres',
        connection: {
          host: process.env.P_DB_HOST,
          port: process.env.DB_PORT,
          database: process.env.P_DB,
          user: process.env.P_DB_USER,
          password: process.env.P_DB_PASSWORD,
        // connectionString: process.env.P_DB_EXTERNAL_URL,
          ssl: true
        },
        debug: false,
      },
    });

