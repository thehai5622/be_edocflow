const cron = require("node-cron");
const db = require("./database");

cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Đang kiểm tra các văn bản cần cập nhật trạng thái...");

  try {
    const result = await db.execute(`
      UPDATE \`document\`
      SET \`status\` = 5
      WHERE \`status\` = 1
        AND \`created_at\` <= NOW() - INTERVAL 7 DAY
    `);
    console.log(`✅ Đã cập nhật ${result.affectedRows} văn bản.`);
    const releaseUpdate = await db.execute(`
      UPDATE \`document\`
      SET \`status\` = 4
      WHERE \`status\` = 3
        AND DATE(\`release\`) = CURDATE()
    `);
    console.log(`✅ Đã cập nhật ${releaseUpdate.affectedRows} văn bản release hôm nay thành hoạt động`);
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật văn bản:", error);
  }
});
