# 🗄️ Hướng Dẫn Kết Nối Database Railway

Hướng dẫn kết nối MySQL database trên Railway cho cả **chạy local** và **deploy lên Railway**.

---

## 📋 Bước 1: Tạo MySQL Database trên Railway

1. Vào **Railway Dashboard** → Chọn project của bạn
2. Click **"+ New"** → Chọn **"Database"**
3. Chọn **"Add MySQL"**
4. Railway sẽ tự động tạo MySQL database cho bạn

---

## 🔑 Bước 2: Lấy Thông Tin Kết Nối

1. Click vào **MySQL service** vừa tạo
2. Vào tab **"Variables"** (hoặc **"Connect"**)
3. Bạn sẽ thấy các biến môi trường:

```
MYSQLHOST=containers-us-west-xxx.railway.app
MYSQLUSER=root
MYSQLPASSWORD=abc123xyz...
MYSQLDATABASE=railway
MYSQLPORT=3306
```

**Lưu ý:** Click vào `MYSQLPASSWORD` để reveal password nếu bị ẩn.

---

## 💻 Cách 1: Kết Nối Từ Local (Test trên máy)

### Bước 1: Tạo file `.env`

Tạo file `.env` trong thư mục dự án (copy từ `.env.example`):

```bash
# Windows PowerShell
Copy-Item .env.example .env
```

### Bước 2: Cập nhật file `.env`

Mở file `.env` và điền thông tin từ Railway:

```env
DB_HOST=containers-us-west-xxx.railway.app
DB_USER=root
DB_PASSWORD=abc123xyz...
DB_NAME=railway
DB_PORT=3306
PORT=3000
```

**Mapping:**
- `DB_HOST` = giá trị của `MYSQLHOST`
- `DB_USER` = giá trị của `MYSQLUSER` (thường là `root`)
- `DB_PASSWORD` = giá trị của `MYSQLPASSWORD`
- `DB_NAME` = giá trị của `MYSQLDATABASE` (thường là `railway`)
- `DB_PORT` = giá trị của `MYSQLPORT` (thường là `3306`)

### Bước 3: Chạy ứng dụng

```bash
npm start
```

Nếu thấy: `✅ Database connected and table created successfully` → **Thành công!**

---

## 🚀 Cách 2: Cấu Hình Khi Deploy Lên Railway

### Bước 1: Deploy Node.js App

1. Trong Railway project, click **"+ New"**
2. Chọn **"GitHub Repo"** (hoặc deploy từ local)
3. Chọn repository của bạn
4. Railway sẽ tự động detect và deploy

### Bước 2: Cấu Hình Environment Variables

1. Click vào **Node.js service** vừa deploy
2. Vào tab **"Variables"**
3. Click **"+ New Variable"**
4. Thêm các biến sau (lấy từ MySQL service → Variables):

```
DB_HOST = containers-us-west-xxx.railway.app
DB_USER = root
DB_PASSWORD = abc123xyz...
DB_NAME = railway
DB_PORT = 3306
```

**Lưu ý quan trọng:**
- Railway tự động set biến `PORT`, **KHÔNG CẦN** thêm vào!
- Copy chính xác giá trị từ MySQL service
- `DB_PASSWORD` phải lấy từ `MYSQLPASSWORD` (click để reveal)

### Bước 3: Deploy và Kiểm Tra

1. Railway sẽ tự động redeploy sau khi thêm variables
2. Vào tab **"Deployments"** để xem logs
3. Nếu thấy: `✅ Database connected and table created successfully` → **Thành công!**

---

## ✅ Kiểm Tra Kết Nối

### Test từ Local:
Truy cập: `http://localhost:3000/api/health`

Response thành công:
```json
{
  "success": true,
  "message": "Database connection healthy"
}
```

### Test từ Railway:
Truy cập: `https://your-app.up.railway.app/api/health`

---

## 🔍 Troubleshooting

### Lỗi: `ETIMEDOUT` hoặc `Connection timeout`

**Nguyên nhân:**
- Thông tin database sai
- Firewall block connection (nếu từ local)

**Giải pháp:**
1. Kiểm tra lại các giá trị trong `.env` hoặc Railway variables
2. Đảm bảo copy đúng từ MySQL service
3. Kiểm tra `DB_HOST` có đúng không (không có `http://` hoặc `https://`)

### Lỗi: `Access denied`

**Nguyên nhân:**
- Username hoặc password sai

**Giải pháp:**
1. Kiểm tra lại `DB_USER` và `DB_PASSWORD`
2. Đảm bảo copy đúng từ Railway (không có khoảng trắng thừa)

### Lỗi: `Unknown database`

**Nguyên nhân:**
- `DB_NAME` sai

**Giải pháp:**
1. Kiểm tra lại `DB_NAME` = giá trị của `MYSQLDATABASE`
2. Thường là `railway` (Railway tự đặt tên)

### Database không kết nối khi deploy

**Giải pháp:**
1. Đảm bảo cả 2 services (Node.js và MySQL) đang **Running**
2. Kiểm tra variables trong Node.js service đã đúng chưa
3. Xem logs trong Railway dashboard để biết lỗi cụ thể

---

## 📝 Checklist

### Cho Local:
- [ ] Đã tạo MySQL database trên Railway
- [ ] Đã lấy thông tin từ MySQL service → Variables
- [ ] Đã tạo file `.env`
- [ ] Đã cập nhật đúng các giá trị trong `.env`
- [ ] Đã chạy `npm start` và kết nối thành công

### Cho Deploy:
- [ ] Đã deploy Node.js app lên Railway
- [ ] Đã thêm environment variables trong Node.js service
- [ ] Đã copy đúng giá trị từ MySQL service
- [ ] Cả 2 services đang Running
- [ ] Đã test `/api/health` endpoint

---

## 💡 Tips

1. **Lưu password an toàn:** Không commit file `.env` lên GitHub (đã có trong `.gitignore`)
2. **Test local trước:** Luôn test kết nối từ local trước khi deploy
3. **Xem logs:** Railway dashboard có logs chi tiết, dùng để debug
4. **Database tự tạo table:** App sẽ tự tạo table `items` khi chạy lần đầu

---

**Chúc bạn kết nối thành công! 🎉**

