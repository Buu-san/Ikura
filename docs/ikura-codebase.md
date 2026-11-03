# ikura — Cấu trúc codebase

> Chốt qua các buổi debate ngày 22/10/2026. Repo hiện mới có **khung thư mục**: mỗi thư mục có README ghi nó sẽ chứa gì, chưa có code.
> Xem thêm: [ikura-plan.md](ikura-plan.md) (plan tổng) · [ikura-diagrams.md](ikura-diagrams.md) (kiến trúc, ERD, các luồng) · [ADD_NEW_APP.md](ADD_NEW_APP.md) (checklist thêm app).

---

## 1. Các quyết định đã chốt

| Chủ đề | Quyết định | Ghi chú |
|---|---|---|
| Kiểu kiến trúc | **Monolith chia module + frontend tách riêng** | Không phải microservices |
| Backend | **Django 5.2 LTS** + DRF + Django Admin (Unfold) | Giữ Django vì có sẵn trang admin cho người không biết kỹ thuật |
| Frontend | **Next.js (React) + TypeScript** | Cần SSR/ISR cho SEO và để link chia sẻ Zalo/Facebook hiện preview |
| Trang admin | **Django Admin (Unfold)**, không viết admin bằng React | Màu, logo, dashboard tùy chỉnh được; FE làm phần giao diện |
| Repo | **1 repo (monorepo)**: `backend/`, `frontend/`, `deploy/`, `docs/` | |
| Template công ty | **Không dùng nguyên template**, chỉ mượn quy ước (mục 3) | Không phụ thuộc `common.git` |
| CI | **GitHub Actions**, image lưu trên **GHCR** | Repo private: 2.000 phút/tháng miễn phí, ikura dùng khoảng 100–400 |
| Deploy | **Portainer theo kiểu GitOps**: CI sửa tag image trong `deploy/compose.prod.yml`, Portainer thấy git đổi thì deploy | Giống Argo CD nhưng chạy trên Docker Compose |
| Hosting | **P.A Việt Nam — Cloud Server #2 bản cá nhân**: 4 core, 4 + 1 GB RAM, **SSD 60 GB**, không mua ổ SAS | KVM, mạng quốc tế 20 Mbps dùng chung. Năm đầu trả theo năm |
| Database | **PostgreSQL 16 trong container trên chính VPS**, dữ liệu ở `/srv/ikura/postgres` | Ở Việt Nam. Không thuê database riêng |
| Quản lý package Python | **uv**, Python 3.12 | Template công ty dùng poetry-core. uv nhanh hơn |
| Môi trường | Dev trên máy (`ikura.localhost`) · trước launch: tên miền thật khóa bằng Cloudflare Access · sau launch: production, staging chỉ bật khi cần | Launch = gỡ khóa Access |

---

## 2. Cây thư mục

```
ikura/
├── README.md
├── .gitignore  .gitattributes
├── backend/                          # Django monolith → image ikura-api
│   ├── pyproject.toml  uv.lock  cli.py  manage.py  Dockerfile  Makefile  .env.sample   (sẽ tạo)
│   ├── src/ikura/
│   │   ├── config/                   # settings/{base,dev,test,prod}.py, urls.py, wsgi.py
│   │   ├── core/                     # health, revalidate, turnstile, storage, initialize, admin dashboard
│   │   ├── apps/
│   │   │   ├── catalog/  geo/  dealers/  content/  jobs/
│   │   │   └── forms/  warranty/  i18n/  site/  media/
│   │   ├── templates/admin/          # giao diện admin (FE chỉnh được)
│   │   └── static/                   # brand/ikura-logo.png, admin/ikura.css (FE chỉnh được)
│   └── tests/                        # contract + end-to-end
├── frontend/                         # Next.js → image ikura-web
│   ├── package.json  next.config.ts  Dockerfile  .env.example                          (sẽ tạo)
│   ├── src/app/[locale]/…            # /vi /en /km
│   ├── src/app/api/revalidate/       # webhook từ Django (luồng 3)
│   ├── src/components/  src/lib/  src/messages/
│   └── public/                       # ikura-logo.png
├── deploy/
│   ├── compose.prod.yml  compose.staging.yml  compose.infra.yml  compose.dev.yml  Caddyfile   (sẽ tạo)
│   ├── backup/                       # pg_dump hằng ngày + đẩy ra kho ngoài VPS
│   └── postgres/                     # postgresql.conf, tạo user ikura_app / ikura_readonly
├── .github/workflows/                # ci.yml (sẽ tạo)
└── docs/
    ├── ikura-plan.md  ikura-diagrams.md  ikura-codebase.md  ADD_NEW_APP.md
    └── diagrams/ikura-backend.drawio
```

Mỗi app nghiệp vụ ứng với một nhóm bảng trong ERD:

| App | Bảng |
|---|---|
| `catalog` | `catalog_category`, `catalog_product`, `catalog_product_image`, `catalog_product_document`, `catalog_attribute_def`, `catalog_attribute_option` |
| `geo` | `geo_country`, `geo_admin_unit`, `geo_unit_mapping` |
| `dealers` | `dealer`, `dealer_category` |
| `content` | `content_post_category`, `content_post`, `content_page` |
| `jobs` | `jobs_posting`, `jobs_application` |
| `forms` | `forms_submission`, `forms_notification_log` |
| `warranty` | `warranty_registration`, `warranty_serial` |
| `i18n` | `i18n_translation_status` |
| `site` | `site_settings`, `site_section`, `seo_redirect` |
| `media` | `media_file`, `import_batch` |

---

## 3. Mượn gì từ template của công ty

Hai template được tham khảo: `processor-service-template` (Python, FastAPI) và `repo_template` (Go, Fiber, khuôn của `core` / `task_scheduler`). Không template nào dùng nguyên được: template Python là dịch vụ xử lý file không có DB hay admin, còn template Go thì phải tự viết toàn bộ trang admin.

| Quy ước | Lấy từ | Áp dụng cho ikura |
|---|---|---|
| `pyproject.toml` + thư mục `src/`, `cli.py` làm điểm vào | Python | `cli.py app` / `worker` / `migrate` / `initialize`: 1 image, khác lệnh |
| Dockerfile `slim-bookworm`, label `GIT_COMMIT`/`VERSION`, `HEALTHCHECK` | Python | Giữ cách viết |
| `Makefile`: `install` · `test` · `run` · `ci` · `docker-build` | Python | Giữ |
| Phân lớp "API mỏng → service → engine" | Python | `api/views.py` mỏng → `services.py` → models và client gọi dịch vụ ngoài |
| `docs/ADD_NEW_MODULE.md` | Python | [ADD_NEW_APP.md](ADD_NEW_APP.md) |
| CI: test → build/push → sửa tag image trong git | Python | GitHub Actions + Portainer (mục 7) |
| Log, comment, chuỗi lỗi bằng **tiếng Anh** | Go | Áp dụng |
| Không commit secret, cấu hình qua biến môi trường | Go | `.env.sample` chỉ có tên biến |
| `/_/liveness` (ping DB) + `/_/readiness` | Go | Docker healthcheck + UptimeRobot |
| `system/initialize` chạy lại nhiều lần vẫn an toàn | Go | `cli.py initialize`. Không hard-code mật khẩu |
| Migrate trước khi app chạy | Go | Service `migrate` chạy một lần, `django`/`worker` chờ nó xong |
| Test với DB thật | Go | pytest-django + Postgres 16 trong CI |

**Bỏ đi:** FastMCP, tool registry, auto_dispatcher, data lake, Helm (template Python); Fiber, `common.git`, service registry dạng singleton, manager (template Go).

**Lưu ý quyền sở hữu:** hai template thuộc repo GitLab của công ty bạn. Ikura chỉ mượn **cấu trúc và quy ước**, code viết mới. **Không** dùng `common.git` làm thư viện phụ thuộc.

---

## 4. Các container khi chạy

| Container | Image | Lệnh | Ghi chú |
|---|---|---|---|
| `migrate` | `ikura-api` | `cli.py migrate` | Chạy một lần mỗi lần deploy |
| `django` | `ikura-api` | `cli.py app` | Gunicorn, 3 worker |
| `worker` | `ikura-api` | `cli.py worker` | django-q2, hàng đợi nằm trong Postgres |
| `nextjs` | `ikura-web` | `node server.js` | Next.js standalone |
| `postgres` | `postgres:16-alpine` | | Không publish cổng, giới hạn khoảng 1,5 GB RAM |
| `caddy` | `caddy` | | `/` → nextjs; `/api/*`, `/admin/*`, `/static/*`, `/_/*` → django |
| `backup` | `postgres:16-alpine` + script | cron | `pg_dump` hằng ngày |
| `portainer` | `portainer/portainer-ce` | | Stack riêng, chỉ vào qua Cloudflare Access hoặc Tailscale |

RAM ước tính khoảng 2,5–3 GB trên 5 GB.

---

## 5. Backend

**Package dự kiến** (đã thử resolve bằng uv ngày 22/10/2026):

| Package | Bản | Dùng để |
|---|---|---|
| `django` | 5.2.x (LTS, hỗ trợ tới 04/2028) | Framework |
| `djangorestframework` | 3.18 | REST API cho Next.js |
| `drf-spectacular` | 0.30 | OpenAPI. Frontend sinh kiểu TypeScript từ đây |
| `django-unfold` | 0.110 | Giao diện admin |
| `django-modeltranslation` | 0.20 | Cột `_{vi,en,km}` |
| `django-simple-history` | 3.13 | Bảng `history_*` |
| `django-q2` | 1.11 | Worker, hàng đợi trong Postgres |
| `django-environ` | 0.12 | Đọc biến môi trường |
| `django-storages[s3]` | 1.14 | R2 (public) và S3 trong nước (private) |
| `psycopg[binary]` | 3.x | Driver Postgres |
| `gunicorn` | 23.x | Server WSGI |
| `whitenoise` | 6.x | Phục vụ file tĩnh của admin |
| `httpx` | 0.28 | Gọi Next.js revalidate, Cloudflare, Turnstile, dịch máy |
| `sentry-sdk[django]` | 2.x | Báo lỗi (`send_default_pii=False`) |
| Dev: `pytest`, `pytest-django`, `ruff` | | Test, lint |

**Quy ước code:**

1. **API mỏng → `services.py` → models.** View chỉ parse request, gọi service, trả kết quả. Nghiệp vụ và transaction nằm ở service.
2. **Việc chạy sau khi lưu** (revalidate, gửi mail, dịch máy) xếp job bằng `transaction.on_commit(...)`, theo đúng các luồng đã vẽ. Hạn chế dùng Django signal.
3. **App gọi nhau qua `services.py`**, không truy vấn thẳng model của app khác. `core` không import app nghiệp vụ.
4. **`db_table` đặt đúng tên bảng trong ERD.**
5. Log, comment, chuỗi lỗi, tên test bằng **tiếng Anh**. Chat và docs thì tiếng Việt.
6. Mọi cấu hình đọc từ biến môi trường. **Không commit secret.**

---

## 6. Frontend

- **Next.js App Router + React + TypeScript + Tailwind.** Build `output: "standalone"`.
- Định tuyến: `src/app/[locale]/…` cho `/vi` · `/en` · `/km`. `/` chuyển hướng về `/vi`.
- Trang lấy dữ liệu là **server component**, gọi Django qua mạng nội bộ `http://django:8000`. Phần tương tác (bản đồ, bộ lọc, form) là **client component** (`"use client"`).
- Mọi `fetch` gắn `next.tags` để luồng 3 xóa cache đúng trang. ISR làm mới sau 1 giờ để phòng sót.
- Kiểu dữ liệu sinh từ OpenAPI của Django (`openapi-typescript`), không viết tay.

---

## 7. Môi trường và deploy

| Môi trường | Ở đâu | Địa chỉ | Dữ liệu |
|---|---|---|---|
| Dev | Máy bạn, Docker Compose (`deploy/compose.dev.yml` chỉ chạy Postgres) | `ikura.localhost` / `localhost:3000` | Dữ liệu giả |
| Trước launch | VPS | `<tênmiền>.vn`, **khóa bằng Cloudflare Access** | Dữ liệu thật đang nhập dần |
| Production | VPS | `<tênmiền>.vn` | Dữ liệu thật |
| Staging (khi cần) | VPS, stack riêng | `staging.<tênmiền>.vn` | Database tách riêng |

Không dùng đuôi `.local` cho dev vì hay bị phân giải chậm (mDNS). Dùng `.localhost` hoặc `.test`.

**Luồng deploy:**

```
git push main
  → GitHub Actions: test → build image (chỉ phần có thay đổi) → push GHCR (tag = mã commit)
  → commit tự động: sửa tag trong deploy/compose.prod.yml
  → Portainer thấy git đổi → pull image → chạy migrate → khởi động lại django/worker/nextjs
Rollback: git revert commit đổi tag
```

**Gắn tên miền ngay từ đầu**, vì Brevo/Resend (SPF, DKIM), Turnstile, R2 `media.<tênmiền>.vn` và HTTPS đều cần tên miền thật. Đăng ký `.vn` cũng mất vài ngày.

**Xem log:** Sentry (lỗi) · UptimeRobot (web sập) · Portainer (log, trạng thái container) · `docker compose logs` qua SSH.

**Ổ đĩa 60 GB** (dự kiến dùng 15–20 GB). Bắt buộc:
- Giới hạn log Docker (`max-size: 10m`, `max-file: 3`).
- Dọn image cũ sau mỗi lần deploy.
- Cảnh báo khi ổ dùng quá 80%.

---

## 8. Giao diện admin và bàn giao cho FE

Django Admin dùng theme **Unfold** (Tailwind + Alpine.js), render phía server, không có React.

| Phần | Ai làm | Viết ở đâu |
|---|---|---|
| Bảng nào lên admin, cột, bộ lọc, form, nút thao tác, phân quyền | BE | `apps/<app>/admin.py` |
| Màu sắc, logo, font | FE (hoặc BE) | `UNFOLD["COLORS"]`, `UNFOLD["SITE_LOGO"]` trong settings; `static/admin/ikura.css` |
| Bố cục dashboard, trang riêng | FE (hoặc BE) | `templates/admin/` (HTML + Tailwind) |
| Số liệu cho dashboard | BE | `core/admin_dashboard.py` |

**Bảng màu thương hiệu** (ước lượng từ logo, **cần xác nhận mã màu chính thức**):

| Màu | Mã ước lượng | Dùng cho |
|---|---|---|
| Xanh navy | `#2C3A6E` | Màu chủ đạo (`primary`): nút, menu đang chọn |
| Đỏ | `#E8473B` | Nhấn mạnh: hotline khẩn cấp, cảnh báo, badge |

- Unfold 0.110 khai báo màu theo thang **50–950 ở dạng OKLCH**, ví dụ `"500": "oklch(...)"`.
- FE định nghĩa bảng màu **một lần** trong Tailwind của frontend, rồi copy sang `UNFOLD["COLORS"]`, để web khách và admin đồng bộ thương hiệu.
- Logo đã đặt sẵn ở `backend/src/ikura/static/brand/ikura-logo.png` và `frontend/public/ikura-logo.png`.

Dashboard admin đề xuất 3 thẻ: **bảo hành chờ duyệt** · **form mới chưa xử lý** · **bản dịch cần duyệt**.

---

## 9. Database và dữ liệu

| Dữ liệu | Nơi lưu |
|---|---|
| Toàn bộ bảng + hàng đợi worker | Postgres trên VPS P.A (`/srv/ikura/postgres`) |
| Ảnh sản phẩm, PDF catalogue | Cloudflare R2 (public) |
| CV, hóa đơn bảo hành | **Chờ chốt**, đề xuất S3 trong nước (hướng (b)) |
| Backup | 7 bản trên VPS + bản chính ở kho ngoài VPS, đề xuất đặt ở Việt Nam |

- **3 user Postgres:**
  - `postgres`: chỉ dùng để tạo extension.
  - `ikura_app`: user của app.
  - `ikura_readonly`: chỉ đọc, dùng cho DBeaver.
- **DBeaver** kết nối qua SSH tunnel. **Chỉ đọc**: không sửa dữ liệu production bằng DBeaver, vì sửa thẳng sẽ bỏ qua lịch sử chỉnh sửa, revalidate và `source_hash`. Cần sửa thì sửa qua Django Admin, hoặc viết management command.
- Email thông báo và Sentry **không chứa dữ liệu cá nhân**: email chỉ có mã đơn kèm link admin; Sentry đặt `send_default_pii=False`.

---

## 10. Việc còn mở

- [ ] Hướng (a)/(b) cho CV, hóa đơn và backup. Nếu chọn (b) thì tra giá Object Storage của P.A.
- [ ] Giá trả theo 1 năm của Cloud Server #2; ai đứng tên tài khoản và hóa đơn.
- [ ] Mã màu chính thức của ikura.
- [ ] Có người làm FE riêng không, hay bạn tự làm cả hai phía.
- [ ] Dùng Cloudflare Tunnel hay mở 80/443 cho dải IP của Cloudflare.
- [ ] Bắt đầu code: `pyproject.toml`, `cli.py`, settings, app mẫu đầu tiên (đề xuất `site`), `compose.dev.yml`, `ci.yml`.
