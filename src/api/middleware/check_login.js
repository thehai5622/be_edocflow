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

    const [[token_res], [user]] = await db.queryMultiple([
      `SELECT * FROM \`token\` WHERE \`user_id\` = '${req.payload.id}'`,
      `SELECT \`status\` FROM \`user\` WHERE \`uuid\` = '${req.payload.id}'`,
    ]);

    if (user.status == 0) {
      var err = new Error("Tài khoản đã bị khóa!");
      err.statusCode = 406;
      next(err);
      return;
    }

    if (token_res.access_token != token) {
      var err = new Error("Tài khoản này hiện đang được đăng nhập ở nơi khác!");
      err.statusCode = 406;
      next(err);
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkLogin,
};
