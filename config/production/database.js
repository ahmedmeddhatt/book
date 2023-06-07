const parse = require('pg-connection-string').parse;
const config = parse(process.env.P_DB_EXTERNAL_URL);
    module.exports = ({ env }) => ({
      connection: {
        client: 'postgres',
        connection: {
          host: 'dpg-cht34tjhp8u4v7sdul5g-a',
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

