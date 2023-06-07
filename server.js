const express = require('express')
const cors = require('cors')
const babel = require('babel-polyfill')
const bodyParser = require('body-parser')
const userRoutes = require('./src/User/Routes/userRoutes')
const noteRoutes = require('./src/Note/Routes/noteRoutes')
const storeRoutes = require('./src/Store/Routes/storeRoutes')
const bookRoutes = require('./src/Books/Routes/booksRoutes')
const authRoutes = require('./src/Auth/Routes/authRoutes')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const configg  = require('./config/production/database');
// express
const app = express()
require('dotenv').config();

// cors
app.use(cors())

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//routes
app.use('/api/v1/book', bookRoutes)
app.use('/api/v1/store', storeRoutes)
app.use('/api/v1/note', noteRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/auth', authRoutes)

app.get('/', (req,res) => {
    res.send('Hello World!');
})

const port = process.env.PORT || 8050
app.listen(port, () => {
    
    console.log(`Port ${port} is listening ...`, 
    // process.env.P_DB_HOST,
    // process.env.DB_PORT,
    // process.env.P_DB,
    // process.env.P_DB_USER,
    // process.env.P_DB_PASSWORD,
    configg
    );
})

module.exports = app;