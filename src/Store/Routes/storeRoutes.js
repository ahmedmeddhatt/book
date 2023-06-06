const express = require('express')
const router = express.Router()
const storeContrller = require('../Controller/storeController')

router.get('/', storeContrller.GetStoreList)
router.get('/:store_id', storeContrller.GetOne)
router.post('/', storeContrller.AddStore)
router.put('/:store_id', storeContrller.Up)
router.delete('/:store_id', storeContrller.Del)



module.exports = router