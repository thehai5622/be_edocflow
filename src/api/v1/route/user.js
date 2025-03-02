const express = require('express')
const router = express.Router()
const controller = require('../controller/user_controller')

router.get('/:id', async (req, res, next) => {
    try {
        res.json(await controller.getDetailInfo(req.params.id))
    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        res.json(await controller.login(req.body))
    } catch (error) {
        next(error)
    }
})

module.exports = router