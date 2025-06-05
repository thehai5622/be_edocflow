const cron = require("node-cron");
const db = require("./database");

cron.schedule("0 0 * * *", async () => {
  console.log("🗑️ Đang xóa các thông báo quá 30 ngày...");

  try {
    const result = await db.execute(`
      DELETE FROM \`notification\`
      WHERE \`created_at\` <= NOW() - INTERVAL 30 DAY
    `);

    console.log(`✅ Đã xóa ${result.affectedRows} thông báo.`);
  } catch (error) {
    console.error("❌ Lỗi khi xóa thông báo:", error);
  }
});
