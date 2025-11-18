# GitHub Actions Workflows

Thư mục này chứa các GitHub Actions workflows cho CI/CD pipeline.

## 📋 Workflows

### 1. `ci-cd.yml` - CI/CD Pipeline chính
- **Trigger:** Push/Pull Request vào main/master/develop
- **Jobs:**
  - Build and Test: Kiểm tra code, chạy tests, build app
  - Deploy to Railway: Tự động deploy lên Railway (nếu có token)

### 2. `build.yml` - Build Application
- **Trigger:** Push/Pull Request vào main/master/develop
- **Mục đích:** Build và verify application trên nhiều Node.js versions
- **Matrix:** Test trên Node.js 16.x, 18.x, 20.x

### 3. `deploy-railway.yml` - Deploy to Railway
- **Trigger:** Push vào main/master hoặc manual trigger
- **Mục đích:** Tự động deploy lên Railway.app sau khi build thành công

## 🔑 Setup Secrets

Để sử dụng deploy tự động, cần thêm secrets vào GitHub:

1. Vào **Repository Settings** → **Secrets and variables** → **Actions**
2. Thêm các secrets sau:

### Railway Token
- **Name:** `RAILWAY_TOKEN`
- **Value:** Railway token của bạn (lấy từ Railway Dashboard → Settings → Tokens)

### Railway Service Name (Optional)
- **Name:** `RAILWAY_SERVICE_NAME`
- **Value:** Tên service trên Railway (nếu có nhiều services)

## 📝 Cách lấy Railway Token

1. Vào Railway Dashboard: https://railway.app
2. Click vào profile → **Settings**
3. Vào tab **Tokens**
4. Click **New Token**
5. Copy token và thêm vào GitHub Secrets

## 🚀 Sử dụng

### Automatic Deployment
- Push code vào branch `main` hoặc `master` → Tự động deploy

### Manual Deployment
- Vào **Actions** tab trên GitHub
- Chọn workflow **Deploy to Railway**
- Click **Run workflow**

## ✅ Build Scripts

Trong `package.json`:
- `npm run build` - Build application
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm start` - Start production server

## 📊 Workflow Status

Xem trạng thái workflows tại: **Actions** tab trên GitHub repository.

