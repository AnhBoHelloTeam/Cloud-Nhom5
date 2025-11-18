# ⚡ HƯỚNG DẪN NHANH - QUICK START

## 🚀 Chạy Local (5 phút)

### 1. Cài đặt
```bash
npm install
```

### 2. Tạo file .env
Copy `.env.example` thành `.env` và cập nhật:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=crud_app
DB_PORT=3306
PORT=3000
```

### 3. Tạo database
```sql
CREATE DATABASE crud_app;
```

### 4. Chạy ứng dụng
```bash
npm start
```

Mở: http://localhost:3000

---

## 🚂 Deploy Railway (10 phút)

### 1. Tạo MySQL trên Railway
- Railway Dashboard → "+ New" → "Database" → "Add MySQL"
- Copy thông tin kết nối từ tab "Variables"

### 2. Deploy App
- Railway Dashboard → "+ New" → "GitHub Repo"
- Chọn repository của bạn

### 3. Cấu hình Variables
Trong Node.js service → "Variables" → Thêm:
```
DB_HOST = (từ MYSQLHOST)
DB_USER = (từ MYSQLUSER)
DB_PASSWORD = (từ MYSQLPASSWORD)
DB_NAME = (từ MYSQLDATABASE)
DB_PORT = (từ MYSQLPORT)
```

### 4. Lấy URL
Settings → Generate Domain

---

## 📍 Lấy .env từ Railway

**MySQL Service → Variables tab:**
- `MYSQLHOST` → `DB_HOST`
- `MYSQLUSER` → `DB_USER`
- `MYSQLPASSWORD` → `DB_PASSWORD`
- `MYSQLDATABASE` → `DB_NAME`
- `MYSQLPORT` → `DB_PORT`

**Lưu ý:** Railway tự động set `PORT`, không cần thêm!

---

Xem chi tiết trong `HUONG_DAN.md` hoặc `README.md`


