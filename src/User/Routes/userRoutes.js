const express = require('express')
const router = express.Router()
const userContrller = require('../Controller/userController')

router.get('/', userContrller.GetUserList)
router.get('/:user_id', userContrller.GetOne)
router.post('/', userContrller.AddUser)
router.put('/:user_id', userContrller.Up)
router.delete('/:user_id', userContrller.Del)



module.exports = router