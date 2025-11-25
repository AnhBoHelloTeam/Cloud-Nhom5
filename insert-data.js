const mysql = require("mysql2/promise");
require("dotenv").config();

async function insertData() {
  try {
    console.log("🔄 Kết nối tới database...");

    let dbHost = process.env.DB_HOST;

    // Nếu là internal hostname thì dùng external proxy
    if (dbHost === "mysql.railway.internal") {
      console.log("ℹ️  Dùng external proxy cho kết nối local");
      dbHost = "yamabiko.proxy.rlwy.net";
    }

    const connection = await mysql.createConnection({
      host: dbHost,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT) || 3306,
      ssl: dbHost.includes("proxy.rlwy.net")
        ? { rejectUnauthorized: false }
        : undefined,
    });

    console.log("✅ Kết nối thành công!");

    // Xóa dữ liệu cũ (optional - chỉ khi muốn reset)
    // await connection.execute("TRUNCATE TABLE items");
    // console.log("🗑️  Đã xóa dữ liệu cũ");

    // Chèn 101 dòng dữ liệu
    console.log("📥 Đang chèn 101 dòng dữ liệu...");

    const insertQuery = `
      INSERT INTO items (name, description, status, created_at, updated_at) VALUES
      ("Laptop Titan Z", "powerful device", "active", "2025-11-20 08:12:11", "2025-11-20 08:12:11"),
      ("Smartwatch NeoX", "fitness tracker", "inactive", "2025-11-20 08:12:45", "2025-11-20 08:12:45"),
      ("Bàn phím cơ Raptor", "gaming keyboard", "active", "2025-11-20 08:13:21", "2025-11-20 08:13:21"),
      ("Đèn ngủ Sakura", "soft warm light", "active", "2025-11-20 08:13:55", "2025-11-20 08:13:55"),
      ("Giày chạy Falcon", "lightweight shoes", "inactive", "2025-11-20 08:14:12", "2025-11-20 08:14:12"),
      ("Áo hoodie Breeze", "comfortable wear", "active", "2025-11-20 08:14:40", "2025-11-20 08:14:40"),
      ("Microphone Streamer Pro", "clear voice", "inactive", "2025-11-20 08:15:03", "2025-11-20 08:15:03"),
      ("Robot hút bụi MiniJet", "auto cleaning", "active", "2025-11-20 08:15:22", "2025-11-20 08:15:22"),
      ("Sách khoa học vũ trụ", "astronomy intro", "active", "2025-11-20 08:16:00", "2025-11-20 08:16:00"),
      ("Sách tâm lý hiện đại", "mind exploration", "inactive", "2025-11-20 08:16:22", "2025-11-20 08:16:22"),
      ("Gối memory foam", "comfortable pillow", "active", "2025-11-20 08:16:55", "2025-11-20 08:16:55"),
      ("Xúc xích hun khói", "premium food", "inactive", "2025-11-20 08:17:21", "2025-11-20 08:17:21"),
      ("Đàn guitar Breeze Tone", "acoustic sound", "active", "2025-11-20 08:17:55", "2025-11-20 08:17:55"),
      ("Máy in LaserJet M3", "fast printing", "inactive", "2025-11-20 08:18:12", "2025-11-20 08:18:12"),
      ("Ghế gaming Hydra", "ergonomic comfort", "active", "2025-11-20 08:18:50", "2025-11-20 08:18:50"),
      ("Balo leo núi TrekUp", "outdoor gear", "active", "2025-11-20 08:19:12", "2025-11-20 08:19:12"),
      ("Kem dưỡng SkinPure", "hydrating cream", "inactive", "2025-11-20 08:19:45", "2025-11-20 08:19:45"),
      ("Máy pha cà phê Aroma", "fresh brew", "active", "2025-11-20 08:20:10", "2025-11-20 08:20:10"),
      ("Đồng hồ treo tường Retro", "classic design", "inactive", "2025-11-20 08:20:33", "2025-11-20 08:20:33"),
      ("Xe đạp địa hình TerraX", "mountain bike", "active", "2025-11-20 08:21:12", "2025-11-20 08:21:12"),
      ("Drone FlyWing 200", "aerial camera", "active", "2025-11-20 08:21:40", "2025-11-20 08:21:40"),
      ("Tai nghe DeepBass", "strong bass", "inactive", "2025-11-20 08:22:01", "2025-11-20 08:22:01"),
      ("Sách toán cao cấp", "advanced math", "active", "2025-11-20 08:22:32", "2025-11-20 08:22:32"),
      ("Jacket chống nước Storm", "waterproof", "inactive", "2025-11-20 08:23:00", "2025-11-20 08:23:00"),
      ("Mô hình siêu xe GT", "collector item", "active", "2025-11-20 08:23:33", "2025-11-20 08:23:33"),
      ("Chuột gaming Scorpion", "high dpi", "active", "2025-11-20 08:24:01", "2025-11-20 08:24:01"),
      ("Set dao bếp SharpPro", "kitchen tool", "inactive", "2025-11-20 08:24:40", "2025-11-20 08:24:40"),
      ("Áo phông BasicFit", "simple style", "active", "2025-11-20 08:25:11", "2025-11-20 08:25:11"),
      ("Nón Snapback StreetX", "urban style", "inactive", "2025-11-20 08:25:45", "2025-11-20 08:25:45"),
      ("Xe scooter điện MiniGo", "eco vehicle", "active", "2025-11-20 08:26:12", "2025-11-20 08:26:12"),
      ("Đèn thông minh Aura", "voice control", "inactive", "2025-11-20 08:26:40", "2025-11-20 08:26:40"),
      ("Máy massage MaxFlex", "relax device", "active", "2025-11-20 08:27:11", "2025-11-20 08:27:11"),
      ("Bàn làm việc OakWood", "wood furniture", "active", "2025-11-20 08:27:55", "2025-11-20 08:27:55"),
      ("Vali du lịch JetGo", "travel gear", "inactive", "2025-11-20 08:28:20", "2025-11-20 08:28:20"),
      ("Kính mát SunShade", "uv protection", "active", "2025-11-20 08:28:55", "2025-11-20 08:28:55"),
      ("Máy sấy tóc BreezeDry", "quick dry", "inactive", "2025-11-20 08:29:20", "2025-11-20 08:29:20"),
      ("Camera an ninh SafeEye", "home security", "active", "2025-11-20 08:29:55", "2025-11-20 08:29:55"),
      ("Đàn piano điện Lofi", "soft tone", "inactive", "2025-11-20 08:30:22", "2025-11-20 08:30:22"),
      ("Sách lịch sử thế giới", "world events", "active", "2025-11-20 08:30:55", "2025-11-20 08:30:55"),
      ("Tai nghe Bluetooth TuneX", "wireless audio", "active", "2025-11-20 08:31:22", "2025-11-20 08:31:22"),
      ("Trà hoa cúc Relax", "natural drink", "inactive", "2025-11-20 08:31:55", "2025-11-20 08:31:55"),
      ("Set tranh treo tường", "wall art", "active", "2025-11-20 08:32:20", "2025-11-20 08:32:20"),
      ("Bút highlight ColorMe", "office tool", "inactive", "2025-11-20 08:32:55", "2025-11-20 08:32:55"),
      ("Sữa tắm FreshMint", "cool scent", "active", "2025-11-20 08:33:20", "2025-11-20 08:33:20"),
      ("Túi tote CanvasX", "daily carry", "inactive", "2025-11-20 08:33:55", "2025-11-20 08:33:55"),
      ("Nồi chiên không dầu AirChef", "quick cooking", "active", "2025-11-20 08:34:22", "2025-11-20 08:34:22"),
      ("Sách luyện giao tiếp", "practice guide", "inactive", "2025-11-20 08:34:50", "2025-11-20 08:34:50"),
      ("Gương treo phòng tắm", "anti fog", "active", "2025-11-20 08:35:12", "2025-11-20 08:35:12"),
      ("Cân điện tử FitScale", "accurate measure", "inactive", "2025-11-20 08:35:40", "2025-11-20 08:35:40"),
      ("Kệ sách mini WoodBox", "small shelf", "active", "2025-11-20 08:36:11", "2025-11-20 08:36:11"),
      ("Máy quạt TurboWind", "strong airflow", "inactive", "2025-11-20 08:36:40", "2025-11-20 08:36:40"),
      ("Túi ngủ Trekking Pro", "camping gear", "active", "2025-11-20 08:37:05", "2025-11-20 08:37:05"),
      ("Đèn pin LED HuntLight", "outdoor tool", "inactive", "2025-11-20 08:37:33", "2025-11-20 08:37:33"),
      ("Sách vẽ nghệ thuật", "creative book", "active", "2025-11-20 08:38:00", "2025-11-20 08:38:00"),
      ("Máy cạo râu SmoothX", "clean shave", "inactive", "2025-11-20 08:38:33", "2025-11-20 08:38:33"),
      ("Kẹo trái cây MixFruit", "sweet snack", "active", "2025-11-20 08:39:00", "2025-11-20 08:39:00"),
      ("Nước hoa BlueOcean", "fresh scent", "inactive", "2025-11-20 08:39:22", "2025-11-20 08:39:22"),
      ("Giá treo quần áo SteelRack", "home use", "active", "2025-11-20 08:39:55", "2025-11-20 08:39:55"),
      ("Sách hướng nghiệp", "career guide", "inactive", "2025-11-20 08:40:22", "2025-11-20 08:40:22"),
      ("Chuông báo thức RetroBell", "classic alarm", "active", "2025-11-20 08:40:50", "2025-11-20 08:40:50"),
      ("Chai giữ nhiệt CoolBottle", "keeps warm", "inactive", "2025-11-20 08:41:10", "2025-11-20 08:41:10"),
      ("Thảm yoga FlexMat", "yoga equipment", "active", "2025-11-20 08:41:55", "2025-11-20 08:41:55"),
      ("Găng tay tập gym GripPro", "gym gear", "inactive", "2025-11-20 08:42:22", "2025-11-20 08:42:22"),
      ("Vợt cầu lông AeroStrike", "sports gear", "active", "2025-11-20 08:42:55", "2025-11-20 08:42:55"),
      ("Mũ bảo hiểm RoadSafe", "bike helmet", "inactive", "2025-11-20 08:43:30", "2025-11-20 08:43:30"),
      ("Sạc dự phòng PowerCore", "fast charging", "active", "2025-11-20 08:44:00", "2025-11-20 08:44:00"),
      ("USB 128GB SpeedFlash", "quick storage", "inactive", "2025-11-20 08:44:33", "2025-11-20 08:44:33"),
      ("Đèn bàn StudyLite", "study light", "active", "2025-11-20 08:45:00", "2025-11-20 08:45:00"),
      ("Ổ cứng HDD 2TB TitanDrive", "large storage", "inactive", "2025-11-20 08:45:31", "2025-11-20 08:45:31"),
      ("Máy lọc không khí AirPure", "clean air", "active", "2025-11-20 08:46:12", "2025-11-20 08:46:12"),
      ("Nồi cơm điện CookMaster", "kitchen device", "inactive", "2025-11-20 08:46:33", "2025-11-20 08:46:33"),
      ("Xe điều khiển DriftCar", "toy car", "active", "2025-11-20 08:47:00", "2025-11-20 08:47:00"),
      ("Bộ lego mini BrickFun", "toy set", "inactive", "2025-11-20 08:47:31", "2025-11-20 08:47:31"),
      ("Sách tiếng Anh A1", "study book", "active", "2025-11-20 08:48:00", "2025-11-20 08:48:00"),
      ("Bạt che mưa RainCover", "outdoor cover", "inactive", "2025-11-20 08:48:33", "2025-11-20 08:48:33"),
      ("Ghế gấp mini FoldSeat", "portable chair", "active", "2025-11-20 08:49:10", "2025-11-20 08:49:10"),
      ("Sách thơ tình", "romantic poems", "inactive", "2025-11-20 08:49:55", "2025-11-20 08:49:55"),
      ("Mì ly FastCup", "instant food", "active", "2025-11-20 08:50:30", "2025-11-20 08:50:30"),
      ("Thanh năng lượng FitBar", "energy snack", "inactive", "2025-11-20 08:51:00", "2025-11-20 08:51:00"),
      ("Kem que SweetChill", "cold dessert", "active", "2025-11-20 08:51:22", "2025-11-20 08:51:22"),
      ("Vở kẻ ngang SchoolBook", "notebook", "inactive", "2025-11-20 08:51:55", "2025-11-20 08:51:55"),
      ("Tẩy bút chì SoftErase", "eraser tool", "active", "2025-11-20 08:52:22", "2025-11-20 08:52:22"),
      ("Chuột văn phòng EasyClick", "office mouse", "inactive", "2025-11-20 08:52:50", "2025-11-20 08:52:50"),
      ("Đồng hồ điện tử SportWatch", "digital watch", "active", "2025-11-20 08:53:25", "2025-11-20 08:53:25"),
      ("Thước kẻ ClearLine", "measuring tool", "inactive", "2025-11-20 08:54:00", "2025-11-20 08:54:00"),
      ("Chai nước thể thao SportBottle", "hydration bottle", "active", "2025-11-20 08:54:33", "2025-11-20 08:54:33"),
      ("Cốc sứ CeramicCup", "coffee mug", "inactive", "2025-11-20 08:55:10", "2025-11-20 08:55:10"),
      ("Loa mini BeatBox", "portable speaker", "active", "2025-11-20 08:55:44", "2025-11-20 08:55:44"),
      ("Bánh gạo RiceSnack", "crispy snack", "inactive", "2025-11-20 08:56:10", "2025-11-20 08:56:10"),
      ("Giấy note QuickStick", "sticky notes", "active", "2025-11-20 08:56:33", "2025-11-20 08:56:33"),
      ("Sách lập trình Python", "coding book", "inactive", "2025-11-20 08:57:12", "2025-11-20 08:57:12"),
      ("Tay cầm chơi game JoyPad", "game controller", "active", "2025-11-20 08:57:42", "2025-11-20 08:57:42"),
      ("Kẹp tóc CuteClip", "hair accessory", "inactive", "2025-11-20 08:58:10", "2025-11-20 08:58:10"),
      ("Quạt cầm tay MiniBreeze", "portable fan", "active", "2025-11-20 08:58:44", "2025-11-20 08:58:44"),
      ("Sách hướng dẫn thi TOEIC", "study prep", "inactive", "2025-11-20 08:59:12", "2025-11-20 08:59:12"),
      ("Bộ cờ vua MasterSet", "board game", "active", "2025-11-20 08:59:55", "2025-11-20 08:59:55"),
      ("Mũ lưỡi trai BlueCap", "casual wear", "inactive", "2025-11-20 09:00:20", "2025-11-20 09:00:20"),
      ("Giày sandal SummerWalk", "footwear", "active", "2025-11-20 09:00:55", "2025-11-20 09:00:55"),
      ("Bánh mì gối SoftBread", "bakery item", "inactive", "2025-11-20 09:01:30", "2025-11-20 09:01:30"),
      ("Nước tăng lực PowerShot", "energy drink", "active", "2025-11-20 09:02:12", "2025-11-20 09:02:12"),
      ("Sách văn học cổ", "classic novel", "inactive", "2025-11-20 09:02:55", "2025-11-20 09:02:55"),
      ("Laptop học tập StudyBook", "student device", "active", "2025-11-20 09:03:30", "2025-11-20 09:03:30"),
      ("Chuột bluetooth SlimMouse", "thin mouse", "inactive", "2025-11-20 09:04:00", "2025-11-20 09:04:00"),
      ("Đèn LED RGB Aurora", "color light", "active", "2025-11-20 09:04:33", "2025-11-20 09:04:33")
    `;

    await connection.execute(insertQuery);
    console.log("✅ Chèn 101 dòng dữ liệu thành công!");

    // Kiểm tra số lượng dữ liệu
    const [rows] = await connection.execute(
      "SELECT COUNT(*) as total FROM items"
    );
    console.log(`📊 Tổng items trong database: ${rows[0].total}`);

    await connection.end();
    console.log("🎉 Hoàn thành!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Lỗi:", error.message);
    process.exit(1);
  }
}

insertData();
