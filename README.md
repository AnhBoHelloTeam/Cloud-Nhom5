# 🚀 Hệ Thống Quản Lý CRUD - Node.js + MySQL + Railway.app

Dự án mẫu cho môn học Cloud Computing: Xây dựng và triển khai ứng dụng Node.js với MySQL trên Railway.app, bao gồm đầy đủ chức năng CRUD (Create, Read, Update, Delete).

## 📋 Mục Lục

1. [Tổng Quan](#tổng-quan)
2. [Tính Năng](#tính-năng)
3. [Cài Đặt Local](#cài-đặt-local)
4. [Cấu Hình Database](#cấu-hình-database)
5. [Deploy lên Railway.app](#deploy-lên-railwayapp)
6. [Lấy Thông Tin .env từ Railway](#lấy-thông-tin-env-từ-railway)
7. [API Endpoints](#api-endpoints)
8. [Cấu Trúc Dự Án](#cấu-trúc-dự-án)

## 📖 Tổng Quan

Ứng dụng web đơn giản để quản lý items với các chức năng:
- ✅ Tạo item mới (Create)
- ✅ Xem danh sách items (Read)
- ✅ Cập nhật item (Update)
- ✅ Xóa item (Delete)

**Tech Stack:**
- Backend: Node.js + Express.js
- Database: MySQL
- Frontend: HTML/CSS/JavaScript (Vanilla)
- Deployment: Railway.app

## ✨ Tính Năng

- Giao diện web đẹp, responsive
- CRUD đầy đủ cho quản lý items
- Kết nối MySQL database
- API RESTful
- Deploy tự động trên Railway.app
- Health check endpoint

## 🛠️ Cài Đặt Local

### Bước 1: Clone hoặc tải dự án

```bash
cd CLoudComputing
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Tạo file .env

Tạo file `.env` từ `.env.example`:

```bash
copy .env.example .env
```

Sau đó chỉnh sửa file `.env` với thông tin database của bạn (xem phần [Cấu Hình Database](#cấu-hình-database)).

### Bước 4: Chạy ứng dụng

```bash
npm start
```

Hoặc chạy ở chế độ development (tự động restart khi có thay đổi):

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

## 🗄️ Cấu Hình Database

### Option 1: Sử dụng MySQL Local

1. Cài đặt MySQL trên máy của bạn
2. Tạo database mới:
   ```sql
   CREATE DATABASE crud_app;
   ```
3. Cập nhật file `.env`:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=crud_app
   DB_PORT=3306
   ```

### Option 2: Sử dụng MySQL từ Railway (Khuyến nghị)

Xem phần [Lấy Thông Tin .env từ Railway](#lấy-thông-tin-env-từ-railway) bên dưới.

## 🚂 Deploy lên Railway.app

### Bước 1: Tạo tài khoản Railway

1. Truy cập: https://railway.app
2. Đăng nhập bằng GitHub account
3. Chọn "New Project"

### Bước 2: Tạo MySQL Database

1. Trong project Railway, click **"+ New"**
2. Chọn **"Database"** → **"Add MySQL"**
3. Railway sẽ tự động tạo MySQL database cho bạn
4. Lưu ý: Database sẽ tự động tạo table khi ứng dụng chạy lần đầu

### Bước 3: Deploy Node.js Application

#### Cách 1: Deploy từ GitHub (Khuyến nghị)

1. Push code lên GitHub repository
2. Trong Railway project, click **"+ New"**
3. Chọn **"GitHub Repo"**
4. Chọn repository của bạn
5. Railway sẽ tự động detect Node.js và deploy

#### Cách 2: Deploy từ Local (Railway CLI)

1. Cài đặt Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```

2. Đăng nhập:
   ```bash
   railway login
   ```

3. Khởi tạo project:
   ```bash
   railway init
   ```

4. Deploy:
   ```bash
   railway up
   ```

### Bước 4: Cấu hình Environment Variables

1. Trong Railway dashboard, chọn service Node.js của bạn
2. Vào tab **"Variables"**
3. Thêm các biến môi trường sau (xem phần [Lấy Thông Tin .env từ Railway](#lấy-thông-tin-env-từ-railway)):

```
DB_HOST=containers-us-west-xxx.railway.app
DB_USER=root
DB_PASSWORD=your_password_from_railway
DB_NAME=railway
DB_PORT=3306
```

**Lưu ý:** Railway tự động set biến `PORT`, không cần thêm vào.

### Bước 5: Deploy và Kiểm Tra

1. Railway sẽ tự động build và deploy
2. Sau khi deploy xong, click vào service để xem URL
3. Truy cập URL để kiểm tra ứng dụng

## 🔑 Lấy Thông Tin .env từ Railway

### Lấy thông tin MySQL Database:

1. **Vào Railway Dashboard** → Chọn project của bạn
2. **Click vào MySQL service** (database service)
3. **Vào tab "Variables"** hoặc **"Connect"**
4. Bạn sẽ thấy các thông tin sau:

```
MYSQLHOST=containers-us-west-xxx.railway.app
MYSQLUSER=root
MYSQLPASSWORD=your_password_here
MYSQLDATABASE=railway
MYSQLPORT=3306
```

5. **Copy các giá trị này vào file .env** của bạn:

```env
DB_HOST=containers-us-west-xxx.railway.app
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=railway
DB_PORT=3306
```

### Cách khác: Lấy từ Railway CLI

```bash
railway variables
```

Hoặc xem connection string:

```bash
railway connect mysql
```

### Lưu ý quan trọng:

- **DB_HOST**: Lấy từ `MYSQLHOST` trong Railway
- **DB_USER**: Thường là `root`
- **DB_PASSWORD**: Lấy từ `MYSQLPASSWORD` (click vào để reveal)
- **DB_NAME**: Thường là `railway` hoặc tên database bạn tạo
- **DB_PORT**: Thường là `3306`

## 📡 API Endpoints

### GET /api/items
Lấy tất cả items

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Item 1",
      "description": "Description",
      "status": "active",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET /api/items/:id
Lấy item theo ID

### POST /api/items
Tạo item mới

**Request Body:**
```json
{
  "name": "Item Name",
  "description": "Item Description",
  "status": "active"
}
```

### PUT /api/items/:id
Cập nhật item

**Request Body:**
```json
{
  "name": "Updated Name",
  "description": "Updated Description",
  "status": "inactive"
}
```

### DELETE /api/items/:id
Xóa item

### GET /api/health
Kiểm tra kết nối database

## 📁 Cấu Trúc Dự Án

```
CLoudComputing/
├── server.js              # Express server và API routes
├── package.json           # Dependencies và scripts
├── .env.example           # Template cho file .env
├── .gitignore            # Git ignore file
├── README.md             # Hướng dẫn này
└── public/               # Frontend files
    ├── index.html        # Giao diện web
    ├── style.css         # CSS styling
    └── script.js         # JavaScript cho frontend
```

## 🐛 Troubleshooting

### Lỗi kết nối database

1. Kiểm tra thông tin trong file `.env`
2. Đảm bảo database đã được tạo
3. Kiểm tra firewall/network settings
4. Với Railway: Đảm bảo cả 2 services (Node.js và MySQL) đang chạy

### Lỗi PORT

Railway tự động set biến `PORT`. Không cần set trong `.env` khi deploy.

### Lỗi "Table doesn't exist"

Ứng dụng sẽ tự động tạo table khi chạy lần đầu. Nếu vẫn lỗi, kiểm tra quyền của database user.

## 📝 Ghi Chú

- Database table sẽ tự động được tạo khi ứng dụng chạy lần đầu
- Railway tự động set biến `PORT`, không cần thêm vào `.env`
- Đảm bảo cả Node.js service và MySQL service đều đang chạy trên Railway

## 📄 License

ISC

## 👨‍💻 Tác Giả

Dự án mẫu cho môn học Cloud Computing

---

**Chúc bạn thành công với dự án! 🎉**


