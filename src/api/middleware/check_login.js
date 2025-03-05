const { verifyAccessToken } = require('../utils/token')

const checkLogin = async (req, res, next) => {
    if (!req.headers.authorization) {
        var err = new Error('Bạn chưa đăng nhập!')
        err.statusCode = 401
        next(err)
        return
    }

    try {
        const bearerToken = req.headers.authorization.split(' ')[1]
        const token = bearerToken

        req.payload = await verifyAccessToken(token)
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    checkLogin
}