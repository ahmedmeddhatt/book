const express = require('express')
const router = express.Router()
const bookContrller = require('../Controller/booksController')

router.get('/', bookContrller.GetBookList)
router.get('/:book_id', bookContrller.GetOne)
router.post('/', bookContrller.AddBook)
router.put('/:book_id', bookContrller.Up)
router.delete('/:book_id', bookContrller.Del)



module.exports = router