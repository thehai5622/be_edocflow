const cron = require("node-cron");
const db = require("./database");

console.log("🚀 Đang kiểm tra các văn bản cần cập nhật trạng thái...");

cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Đang kiểm tra các văn bản cần cập nhật trạng thái...");

  try {
    const [result] = await db.execute(`
      UPDATE \`document\`
      SET \`status\` = 5
      WHERE \`status\` = 1
        AND \`created_at\` <= NOW() - INTERVAL 7 DAY
    `);

    console.log(`✅ Đã cập nhật ${result.affectedRows} văn bản.`);
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật văn bản:", error);
  }
});
