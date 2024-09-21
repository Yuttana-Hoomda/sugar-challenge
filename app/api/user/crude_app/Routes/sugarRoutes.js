const express = require('express')
const router = express.Router()

const { read,
    list,
    create,
    update,
    remove } = require("../Controllers/controlSugar")

router.get('/sugar', list)
router.get('/sugar/:name', read )
router.post('/sugar', create)
router.put('/sugar/:id', update)
router.delete('/sugar/:id', remove)

module.exports = router