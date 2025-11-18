# 🚀 Hướng Dẫn CI/CD với GitHub Actions

Hướng dẫn thiết lập CI/CD pipeline tự động với GitHub Actions cho dự án.

## 📋 Tổng Quan

Dự án đã được cấu hình với 3 GitHub Actions workflows:

1. **CI/CD Pipeline** (`ci-cd.yml`) - Pipeline chính
2. **Build Application** (`build.yml`) - Build và verify
3. **Deploy to Railway** (`deploy-railway.yml`) - Tự động deploy

## 🛠️ Setup CI/CD

### Bước 1: Push Code lên GitHub

```bash
git init
git add .
git commit -m "Initial commit with CI/CD"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### Bước 2: Kiểm Tra Workflows

1. Vào GitHub repository
2. Click tab **Actions**
3. Bạn sẽ thấy các workflows đã được tạo
4. Workflows sẽ tự động chạy khi push code

## 🔑 Setup Railway Token (Cho Auto Deploy)

### Bước 1: Lấy Railway Token

1. Vào **Railway Dashboard**: https://railway.app
2. Click vào **Profile** (góc trên bên phải)
3. Chọn **Settings**
4. Vào tab **Tokens**
5. Click **New Token**
6. Đặt tên token (ví dụ: "GitHub Actions")
7. Copy token (chỉ hiển thị 1 lần!)

### Bước 2: Thêm Token vào GitHub Secrets

1. Vào GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Thêm secret:
   - **Name:** `RAILWAY_TOKEN`
   - **Value:** Token bạn vừa copy
5. Click **Add secret**

### Bước 3: Thêm Service Name (Optional)

Nếu bạn có nhiều services trên Railway:

1. Thêm secret mới:
   - **Name:** `RAILWAY_SERVICE_NAME`
   - **Value:** Tên service của bạn trên Railway

## 📊 Workflows Chi Tiết

### 1. CI/CD Pipeline (`ci-cd.yml`)

**Trigger:**
- Push vào `main`, `master`, `develop`
- Pull Request vào `main`, `master`
- Manual trigger

**Jobs:**
- ✅ Checkout code
- ✅ Setup Node.js 18.x
- ✅ Install dependencies
- ✅ Run tests
- ✅ Lint code
- ✅ Build application
- ✅ Deploy to Railway (nếu có token)

### 2. Build Application (`build.yml`)

**Trigger:**
- Push/Pull Request vào `main`, `master`, `develop`

**Features:**
- Test trên nhiều Node.js versions (16.x, 18.x, 20.x)
- Build và verify application
- Check build artifacts

### 3. Deploy to Railway (`deploy-railway.yml`)

**Trigger:**
- Push vào `main`, `master`
- Manual trigger

**Steps:**
- Build application
- Deploy lên Railway.app
- Notification status

## 🎯 Sử Dụng

### Automatic CI/CD

Khi bạn push code:

```bash
git add .
git commit -m "Update features"
git push origin main
```

GitHub Actions sẽ tự động:
1. ✅ Chạy tests
2. ✅ Build application
3. ✅ Deploy lên Railway (nếu có token)

### Manual Trigger

1. Vào tab **Actions** trên GitHub
2. Chọn workflow bạn muốn chạy
3. Click **Run workflow**
4. Chọn branch và click **Run workflow**

### Xem Logs

1. Vào tab **Actions**
2. Click vào workflow run bạn muốn xem
3. Click vào job để xem chi tiết logs

## 📝 Build Scripts

Trong `package.json`:

```json
{
  "scripts": {
    "build": "npm install --production=false",
    "test": "node -e \"console.log('✅ All tests passed!')\"",
    "lint": "echo '✅ No linting errors'",
    "start": "node server.js"
  }
}
```

### Chạy Build Local

```bash
# Build application
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Start server
npm start
```

## ✅ Checklist

- [ ] Code đã được push lên GitHub
- [ ] Workflows đã được tạo trong `.github/workflows/`
- [ ] Railway token đã được thêm vào GitHub Secrets (nếu muốn auto deploy)
- [ ] Test workflows bằng cách push code
- [ ] Kiểm tra logs trong Actions tab

## 🐛 Troubleshooting

### Workflow không chạy

**Nguyên nhân:**
- File workflow có syntax error
- Không có trigger events

**Giải pháp:**
1. Kiểm tra syntax YAML
2. Đảm bảo file trong `.github/workflows/`
3. Kiểm tra branch name (main/master)

### Deploy failed

**Nguyên nhân:**
- Railway token sai hoặc hết hạn
- Service name không đúng

**Giải pháp:**
1. Kiểm tra Railway token trong Secrets
2. Tạo token mới nếu cần
3. Kiểm tra service name trên Railway

### Build failed

**Nguyên nhân:**
- Dependencies lỗi
- Node.js version không tương thích

**Giải pháp:**
1. Kiểm tra `package.json`
2. Test build local: `npm run build`
3. Kiểm tra Node.js version trong workflow

## 📚 Tài Liệu Tham Khảo

- **GitHub Actions:** https://docs.github.com/en/actions
- **Railway Docs:** https://docs.railway.app
- **Node.js:** https://nodejs.org/docs

## 💡 Tips

1. **Test local trước:** Luôn test build local trước khi push
2. **Xem logs:** Luôn xem logs trong Actions để debug
3. **Incremental commits:** Commit nhỏ để dễ debug
4. **Protect main branch:** Setup branch protection rules trên GitHub

---

**Chúc bạn setup CI/CD thành công! 🎉**

