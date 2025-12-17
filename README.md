# Project 1: React (frontend) + Node/Express (backend) + Postgres

Mục tiêu: luyện thi Git/GitHub + CI/CD + Docker với một ví dụ fullstack tối giản.

## Cấu trúc
- `frontend/`: React + Vite, gọi API backend và hiển thị trạng thái DB.
- `backend/`: Node/Express, các endpoint:
  - `GET /api/health` — kiểm tra service.
  - `GET /api/greeting` — phản hồi đơn giản.
  - `GET /api/db-check` — thử kết nối Postgres.
- `docker-compose.yml`: chạy frontend + backend + Postgres.

## Chạy local (không Docker)
1) Backend
```bash
cd backend
cp .env.example .env   # sửa nếu cần
npm run dev            # hoặc npm start
# mở http://localhost:3001/api/health
```
2) Frontend
```bash
cd frontend
cp .env.example .env   # giữ API URL trỏ về backend
npm run dev            # mở http://localhost:5173
```

## Chạy bằng Docker Compose
```bash
docker compose up --build
# Frontend: http://localhost:8080
# Backend:  http://localhost:3001
# Postgres: localhost:5433 (user/pass: postgres/postgres, db: appdb)
```

## Gợi ý CI/CD
- Frontend: build React và deploy FTP/SSH, hoặc đơn giản hơn kết nối repo với Vercel/Netlify.
- Backend: deploy lên VPS qua SSH (scp + pm2) hoặc Render (trỏ repo, auto build).
- Secrets trên GitHub cần khai báo: FTP_HOST/USER/PASS (nếu dùng FTP) hoặc SSH_HOST/USER/KEY (nếu dùng SSH).

## Quy trình Git mẫu
```bash
git init
git add .
git commit -m "init project1"
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
git checkout -b feature/x
# sửa code, commit, push feature/x
git checkout main && git pull && git merge feature/x && git push
```

## Kiểm tra nhanh
- `frontend`: `npm run build` (xác nhận build pass).
- `backend`: `npm test` (hiện placeholder), hoặc chạy `npm start` và hit `/api/health`.
- Docker: `docker compose up --build` và mở các endpoint như trên.
