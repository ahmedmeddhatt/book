const express = require('express')
const router = express.Router()
const authContrller = require('../Controller/authController')
const jwt = require('../../../Utils/jwt')



router.get('/profile/:user_id', authContrller.profile)
router.post('/login', authContrller.login)


// router.get('/', authContrller.get)
// router.put('/:auth_id', authContrller.Up)
// router.delete('/:auth_id', authContrller.Del)



module.exports = router