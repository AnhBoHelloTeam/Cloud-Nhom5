# 📚 HƯỚNG DẪN CHI TIẾT - DỰ ÁN CLOUD COMPUTING

## 🎯 Mục Tiêu Dự Án

Xây dựng và triển khai ứng dụng Node.js với MySQL trên Railway.app, bao gồm đầy đủ chức năng CRUD (Create, Read, Update, Delete) cho hệ thống quản lý.

---

## 📦 BƯỚC 1: CHUẨN BỊ MÔI TRƯỜNG LOCAL

### 1.1. Cài đặt Node.js

1. Truy cập: https://nodejs.org/
2. Tải và cài đặt phiên bản LTS (Long Term Support)
3. Kiểm tra cài đặt:
   ```bash
   node --version
   npm --version
   ```

### 1.2. Cài đặt MySQL (Nếu chạy local)

**Option A: MySQL Community Server**
- Truy cập: https://dev.mysql.com/downloads/mysql/
- Tải và cài đặt MySQL
- Ghi nhớ password root bạn đặt

**Option B: XAMPP/WAMP (Dễ hơn)**
- Tải XAMPP: https://www.apachefriends.org/
- Cài đặt và khởi động MySQL service

**Option C: Docker (Nếu bạn dùng Docker)**
```bash
docker run --name mysql-crud -e MYSQL_ROOT_PASSWORD=yourpassword -p 3306:3306 -d mysql:latest
```

---

## 🚀 BƯỚC 2: SETUP DỰ ÁN LOCAL

### 2.1. Cài đặt Dependencies

Mở terminal trong thư mục dự án và chạy:

```bash
npm install
```

Lệnh này sẽ cài đặt:
- `express`: Framework web cho Node.js
- `mysql2`: Driver kết nối MySQL
- `dotenv`: Quản lý biến môi trường
- `cors`: Cho phép CORS requests

### 2.2. Tạo File .env

1. Copy file `.env.example` thành `.env`:
   ```bash
   # Windows
   copy .env.example .env
   
   # Mac/Linux
   cp .env.example .env
   ```

2. Mở file `.env` và cập nhật thông tin:

   **Nếu dùng MySQL Local:**
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=crud_app
   DB_PORT=3306
   PORT=3000
   ```

   **Nếu dùng MySQL từ Railway (xem Bước 4):**
   ```env
   DB_HOST=containers-us-west-xxx.railway.app
   DB_USER=root
   DB_PASSWORD=password_from_railway
   DB_NAME=railway
   DB_PORT=3306
   PORT=3000
   ```

### 2.3. Tạo Database (Nếu dùng MySQL Local)

Mở MySQL command line hoặc MySQL Workbench và chạy:

```sql
CREATE DATABASE crud_app;
```

### 2.4. Chạy Ứng Dụng

```bash
npm start
```

Hoặc chạy ở chế độ development (tự động restart):

```bash
npm run dev
```

Mở trình duyệt và truy cập: **http://localhost:3000**

---

## 🚂 BƯỚC 3: TẠO TÀI KHOẢN RAILWAY.APP

### 3.1. Đăng Ký

1. Truy cập: **https://railway.app**
2. Click **"Start a New Project"**
3. Chọn **"Login with GitHub"** (Khuyến nghị)
4. Authorize Railway để truy cập GitHub

### 3.2. Tạo Project Mới

1. Sau khi đăng nhập, click **"New Project"**
2. Chọn **"Empty Project"** hoặc **"Deploy from GitHub repo"**

---

## 🗄️ BƯỚC 4: TẠO MYSQL DATABASE TRÊN RAILWAY

### 4.1. Thêm MySQL Service

1. Trong Railway project dashboard, click nút **"+ New"**
2. Chọn **"Database"**
3. Chọn **"Add MySQL"**
4. Railway sẽ tự động tạo MySQL database cho bạn

### 4.2. Lấy Thông Tin Kết Nối Database

**Cách 1: Từ Railway Dashboard**

1. Click vào **MySQL service** vừa tạo
2. Vào tab **"Variables"** hoặc **"Connect"**
3. Bạn sẽ thấy các biến môi trường sau:

   ```
   MYSQLHOST=containers-us-west-xxx.railway.app
   MYSQLUSER=root
   MYSQLPASSWORD=abc123xyz...
   MYSQLDATABASE=railway
   MYSQLPORT=3306
   ```

4. **Copy các giá trị này!**

**Cách 2: Từ Railway CLI**

```bash
# Cài đặt Railway CLI
npm i -g @railway/cli

# Đăng nhập
railway login

# Link với project
railway link

# Xem variables
railway variables
```

### 4.3. Cập Nhật File .env Local (Để test)

Cập nhật file `.env` của bạn với thông tin từ Railway:

```env
DB_HOST=containers-us-west-xxx.railway.app
DB_USER=root
DB_PASSWORD=abc123xyz...  # Password từ Railway
DB_NAME=railway
DB_PORT=3306
PORT=3000
```

**Lưu ý:** 
- `DB_HOST` = giá trị của `MYSQLHOST`
- `DB_USER` = giá trị của `MYSQLUSER` (thường là `root`)
- `DB_PASSWORD` = giá trị của `MYSQLPASSWORD` (click vào để reveal)
- `DB_NAME` = giá trị của `MYSQLDATABASE` (thường là `railway`)
- `DB_PORT` = giá trị của `MYSQLPORT` (thường là `3306`)

---

## 🚀 BƯỚC 5: DEPLOY NODE.JS APP LÊN RAILWAY

### 5.1. Push Code Lên GitHub

1. Tạo repository mới trên GitHub
2. Push code lên GitHub:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

### 5.2. Deploy Từ GitHub (Khuyến nghị)

1. Trong Railway project, click **"+ New"**
2. Chọn **"GitHub Repo"**
3. Chọn repository của bạn
4. Railway sẽ tự động:
   - Detect Node.js
   - Install dependencies
   - Build và deploy

### 5.3. Cấu Hình Environment Variables trên Railway

1. Click vào **Node.js service** vừa tạo
2. Vào tab **"Variables"**
3. Click **"+ New Variable"**
4. Thêm các biến sau (lấy từ MySQL service):

   ```
   DB_HOST = containers-us-west-xxx.railway.app
   DB_USER = root
   DB_PASSWORD = abc123xyz...
   DB_NAME = railway
   DB_PORT = 3306
   ```

   **Lưu ý:** Railway tự động set biến `PORT`, không cần thêm!

5. Click **"Deploy"** hoặc Railway sẽ tự động redeploy

### 5.4. Lấy URL Ứng Dụng

1. Sau khi deploy xong, click vào service
2. Vào tab **"Settings"**
3. Click **"Generate Domain"** để tạo public URL
4. Hoặc xem URL trong tab **"Deployments"**

URL sẽ có dạng: `https://your-app-name.up.railway.app`

---

## ✅ BƯỚC 6: KIỂM TRA VÀ TEST

### 6.1. Test Local

1. Chạy: `npm start`
2. Mở: http://localhost:3000
3. Test các chức năng:
   - Thêm item mới
   - Xem danh sách items
   - Sửa item
   - Xóa item

### 6.2. Test trên Railway

1. Truy cập URL Railway của bạn
2. Test lại các chức năng CRUD
3. Kiểm tra database có lưu dữ liệu không

### 6.3. Test API

Bạn có thể test API bằng Postman hoặc curl:

```bash
# GET all items
curl https://your-app.up.railway.app/api/items

# POST new item
curl -X POST https://your-app.up.railway.app/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Item","description":"Test","status":"active"}'

# GET single item
curl https://your-app.up.railway.app/api/items/1

# PUT update item
curl -X PUT https://your-app.up.railway.app/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Item","status":"inactive"}'

# DELETE item
curl -X DELETE https://your-app.up.railway.app/api/items/1
```

---

## 🐛 XỬ LÝ LỖI THƯỜNG GẶP

### Lỗi: "Cannot connect to database"

**Nguyên nhân:**
- Thông tin database sai
- Database chưa được tạo
- Firewall block connection

**Giải pháp:**
1. Kiểm tra lại file `.env` hoặc Railway variables
2. Đảm bảo MySQL service đang chạy trên Railway
3. Kiểm tra `DB_HOST`, `DB_USER`, `DB_PASSWORD` đúng chưa

### Lỗi: "Table doesn't exist"

**Nguyên nhân:**
- Table chưa được tạo

**Giải pháp:**
- Ứng dụng sẽ tự động tạo table khi chạy lần đầu
- Nếu vẫn lỗi, kiểm tra quyền của database user

### Lỗi: "PORT is not defined"

**Nguyên nhân:**
- Thiếu biến PORT

**Giải pháp:**
- Railway tự động set PORT, không cần thêm vào variables
- Nếu chạy local, thêm `PORT=3000` vào `.env`

### Lỗi: "Module not found"

**Nguyên nhân:**
- Chưa chạy `npm install`

**Giải pháp:**
```bash
npm install
```

### Lỗi khi deploy trên Railway

**Nguyên nhân:**
- Thiếu file `package.json`
- Script start sai
- Dependencies lỗi

**Giải pháp:**
1. Kiểm tra `package.json` có script `start`
2. Xem logs trong Railway dashboard
3. Đảm bảo `node_modules` không được commit (có trong `.gitignore`)

---

## 📊 CẤU TRÚC DATABASE

Table `items` sẽ tự động được tạo với cấu trúc:

```sql
CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 📝 CHECKLIST HOÀN THÀNH DỰ ÁN

- [ ] Cài đặt Node.js và MySQL
- [ ] Clone/setup dự án local
- [ ] Cài đặt dependencies (`npm install`)
- [ ] Tạo file `.env` và cấu hình
- [ ] Test ứng dụng chạy local thành công
- [ ] Tạo tài khoản Railway.app
- [ ] Tạo MySQL database trên Railway
- [ ] Lấy thông tin kết nối database từ Railway
- [ ] Push code lên GitHub
- [ ] Deploy Node.js app lên Railway
- [ ] Cấu hình environment variables trên Railway
- [ ] Test ứng dụng trên Railway
- [ ] Test đầy đủ các chức năng CRUD
- [ ] Viết báo cáo/documentation

---

## 🎓 TÀI LIỆU THAM KHẢO

- **Railway Documentation:** https://docs.railway.app
- **Express.js:** https://expressjs.com
- **MySQL2:** https://github.com/sidorares/node-mysql2
- **Node.js:** https://nodejs.org/docs

---

## 💡 GỢI Ý MỞ RỘNG

Nếu muốn nâng cao dự án, bạn có thể thêm:

1. **Authentication:** Đăng nhập/đăng ký
2. **Pagination:** Phân trang cho danh sách items
3. **Search/Filter:** Tìm kiếm và lọc items
4. **File Upload:** Upload ảnh cho items
5. **Validation:** Validate dữ liệu tốt hơn
6. **Error Handling:** Xử lý lỗi chuyên nghiệp hơn
7. **Testing:** Viết unit tests và integration tests
8. **Docker:** Containerize ứng dụng
9. **CI/CD:** Tự động deploy khi push code

---

**Chúc bạn thành công với dự án! 🎉**

Nếu có thắc mắc, hãy xem lại README.md hoặc kiểm tra logs trong Railway dashboard.


