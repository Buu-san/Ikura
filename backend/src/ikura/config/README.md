# config

| File (sẽ tạo) | Nội dung |
|---|---|
| `settings/base.py` | Cấu hình chung: INSTALLED_APPS, LANGUAGES (vi/en/km), modeltranslation, DRF, django-q2, `UNFOLD` (màu, logo, menu), STORAGES |
| `settings/dev.py` | Chạy trên máy (DEBUG, file lưu local) |
| `settings/test.py` | Chạy test |
| `settings/prod.py` | VPS: bảo mật, Sentry, R2 + S3 trong nước |
| `urls.py` | `/admin/` · `/api/v1/` · `/api/schema/` · `/_/liveness` · `/_/readiness` |
| `wsgi.py` | Gunicorn |

Mọi giá trị nhạy cảm đọc từ biến môi trường (django-environ). Không commit secret.
