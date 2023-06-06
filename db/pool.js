const { Pool, Client } = require('pg')
require('dotenv').config();



const db_config = {
    user: process.env.USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
    // connectionString: process.env.DB_URL,
    connectionTimeoutMillis: 3000,
    idleTimeoutMillis: 2000,
    max: 20,
    // ssl: true
}

// const db_config = {
//     user: process.env.P_DB_USER,
//     host: process.env.P_DB_HOST,
//     database: process.env.P_DB,
//     password: process.env.P_DB_PASSWORD,
//     port: process.env.DB_PORT,
//     // connectionString: process.env.DB_URL,
//     connectionTimeoutMillis: 3000,
//     idleTimeoutMillis: 2000,
//     max: 20,
//     ssl: true
// }



const pool = new Pool(db_config)


    pool.on('connect', client =>{
        console.log('Database Connected 👍');
    }) 
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
        })

    pool.on('remove', (err, client) =>{
        console.log('Database is not Connected ');
    })
module.exports = pool;