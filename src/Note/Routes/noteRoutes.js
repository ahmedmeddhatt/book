const express = require('express')
const router = express.Router()
const noteContrller = require('../Controller/noteController')

router.get('/', noteContrller.GetAll)
router.get('/one', noteContrller.GetOne)
router.post('/', noteContrller.Add)
router.put('/:ID', noteContrller.Up)
router.delete('/', noteContrller.Del)



module.exports = router