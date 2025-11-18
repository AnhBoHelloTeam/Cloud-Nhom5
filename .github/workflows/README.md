# GitHub Actions Workflows

Thư mục này chứa GitHub Actions workflow cho CI/CD pipeline.

## 📋 Workflow

### `ci-cd.yml` - CI Pipeline

**Trigger:**
- Push vào `main`, `master`, `develop`
- Pull Request vào `main`, `master`
- Manual trigger (workflow_dispatch)

**Job duy nhất: Build and Test**
- Checkout code
- Setup Node.js 18.x
- Install dependencies
- Run tests
- Lint code
- Build application

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

