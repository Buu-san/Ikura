# src/lib

| File (sẽ tạo) | Nội dung |
|---|---|
| `api.ts` | Gọi `API_INTERNAL_URL` (mạng Docker nội bộ), gắn `next.tags` + `revalidate: 3600` |
| `i18n.ts` | Danh sách locale, ngôn ngữ fallback (km → en → vi) |
| `api-types.ts` | Kiểu dữ liệu sinh tự động từ OpenAPI của Django (`openapi-typescript`) |
