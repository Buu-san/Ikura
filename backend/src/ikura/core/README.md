# core — dùng chung, không có nghiệp vụ

| File (sẽ tạo) | Nội dung |
|---|---|
| `health.py` | `/_/liveness` (ping DB) và `/_/readiness` — quy ước từ template Go |
| `revalidate.py` + `tasks.py` | Luồng 3: gọi `POST /api/revalidate` của Next.js theo tag, rồi purge Cloudflare theo URL |
| `turnstile.py` | Xác minh Cloudflare Turnstile cho form |
| `storage.py` | 2 storage: `public` (R2) và `private` (S3 trong nước) |
| `pagination.py`, `permissions.py` | Cấu hình DRF dùng chung |
| `admin_dashboard.py` | Hàm đổ số liệu cho dashboard admin (bảo hành chờ duyệt, form mới, bản dịch cần duyệt) |
| `management/commands/ikura_initialize.py` | Tạo group Admin, `site_settings`, `site_section` mặc định; chạy lại nhiều lần vẫn an toàn |
| `migrations/` | Bật extension `pg_trgm`, `unaccent` |

`core` không được import các app nghiệp vụ.
