# .github/workflows

`ci.yml` (sẽ tạo) — cùng các stage với template Python (test → push → deploy):

1. **changes**: chỉ chạy phần có thay đổi (`backend/**`, `frontend/**`).
2. **test-backend**: uv + pytest, kèm service Postgres 16.
3. **test-frontend**: `npm ci`, typecheck, `next build`.
4. **build**: build image `ikura-api` / `ikura-web`, push GHCR, tag = mã commit.
5. **deploy**: nhánh `main` → sửa tag trong `deploy/compose.prod.yml`; nhánh `develop` → `deploy/compose.staging.yml`; commit lại (bỏ qua CI). Portainer tự deploy.
