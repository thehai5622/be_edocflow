const db = require("../utils/database");
const { verifyAccessToken } = require("../utils/token");

const checkLogin = async (req, res, next) => {
  if (!req.headers.authorization) {
    var err = new Error("Bạn chưa đăng nhập!");
    err.statusCode = 401;
    next(err);
    return;
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    req.payload = await verifyAccessToken(token);

    const [rows] = await db.execute(
      `SELECT * FROM \`token\` WHERE \`user_id\` = '${req.payload.id}'`
    );
    

    if (rows.access_token != token) {
      var err = new Error("Tài khoản này hiện đang được đăng nhập ở nơi khác!");
      // err.statusCode = 406;
      err.statusCode = 401;
      next(err);
      return;
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkLogin,
};
