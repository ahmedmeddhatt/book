// const parse = require('pg-connection-string').parse;
// const config = parse(process.env.P_DB_EXTERNAL_URL);
//     module.exports = ({ env }) => ({
//       connection: {
//         client: 'postgres',
//         connection: {
//           host: process.env.P_DB_HOST,
//           port: process.env.DB_PORT,
//           database: process.env.P_DB,
//           user: process.env.P_DB_USER,
//           password: process.env.P_DB_PASSWORD,
//           connectionTimeoutMillis: 3000,
//           idleTimeoutMillis: 2000,
//           max: 20,
//           keepAlive:true,
//           ssl: true
//         // connectionString: process.env.P_DB_EXTERNAL_URL,
//         },
//         debug: false,
//       },
//     });


// const parse = require('pg-connection-string').parse;
// const config = parse(`postgres://ahmed:9QGgb81XrW0B6XeCSCKJoDEk1DY835sU@dpg-cht34tjhp8u4v7sdul5g-a.oregon-postgres.render.com/bms_8vsa?ssl=true`);
//     module.exports = ({ env }) => ({
//       connection: {
//         client: 'postgres',
//         connection: {
//           host: 'dpg-cht34tjhp8u4v7sdul5g-a.oregon-postgres.render.com',
//           port: 5432,
//           database: bms_8vsa,
//           user: 'ahmed',
//           password: '9QGgb81XrW0B6XeCSCKJoDEk1DY835sU',
//           connectionTimeoutMillis: 3000,
//           idleTimeoutMillis: 2000,
//           max: 20,
//           keepAlive:true,
//           ssl: true
//         // connectionString: process.env.P_DB_EXTERNAL_URL,
//         },
//         debug: false,
//       },
//     });

const parse = require('pg-connection-string').parse;
const config = parse(`postgres://ahmed:9QGgb81XrW0B6XeCSCKJoDEk1DY835sU@dpg-cht34tjhp8u4v7sdul5g-a.oregon-postgres.render.com/bms_8vsa?ssl=true`);

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: config,
    debug: false,
  },
});
