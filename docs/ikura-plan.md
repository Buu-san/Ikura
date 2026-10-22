# ikura — Plan backend website

> Tổng hợp từ memory và các buổi debate thiết kế ngày 25–28/09/2026, phần hosting bàn thêm ngày 08/10/2026.
> Cập nhật lần cuối: 22/10/2026.

**Diagram:** [diagrams/ikura-backend.drawio](diagrams/ikura-backend.drawio) là bản cuối ngày 28/09, khôi phục lại ngày 22/10. Diagram có 5 trang: 1 Kiến trúc · 2 ERD · 3 Publish → revalidate · 4 Form → DB → email · 5 Dịch máy vi → en/km.
Nội dung chi tiết từng trang (đủ các bước, cột của từng bảng và ghi chú) nằm ở **[ikura-diagrams.md](ikura-diagrams.md)**.

---

## 1. Bối cảnh

Website giới thiệu công ty bán **bếp ga / ga / thiết bị ga**. Bạn tự thiết kế backend và là người duy nhất bảo trì.

**Các mục trên web:**

| Mục | Ghi chú |
|---|---|
| Giới thiệu | |
| Sản phẩm | Lọc theo danh mục |
| Dịch vụ | Bảo hành |
| Đại lý | Bản đồ + bộ lọc |
| Tin tức | |
| Liên hệ | |
| Tuyển dụng | |

**Các điều đã chốt:**

- Công ty **không có nhân sự kỹ thuật**, cũng không có ERP hay CRM. Dữ liệu sản phẩm, đại lý và serial bảo hành đều đang nhập tay bằng Excel.
- Chưa biết khối lượng dữ liệu. Web có thể launch khi một số mục vẫn còn trống.
- Web có 3 ngôn ngữ: **vi / en / km**. Tiếng Khmer dùng dịch máy (AI).
- Phạm vi địa lý hiện **chỉ Việt Nam**, theo đơn vị hành chính 2 cấp sau 07/2025. Schema đã sẵn sàng để thêm nước khác.
- **Chỉ có 1 vai trò là Admin**, quản lý mọi thứ. Vai trò dựng trên Django Groups nên sau này thêm được. Khách hàng không có tài khoản.
- Công ty chưa có email theo tên miền riêng. Thông báo từ form gửi về hộp mail của công ty.
- Tên miền là **`.vn`**.

**Nguyên tắc chung:** backend phải đủ đơn giản để một người bảo trì được, và một admin không biết kỹ thuật vẫn dùng được.

---

## 2. Kiến trúc

| Lớp | Lựa chọn |
|---|---|
| Backend | **Django monolith + DRF + Django Admin**, theme **Unfold** (không dùng Wagtail) |
| Frontend | **Next.js SSR/ISR** |
| Database | **PostgreSQL 16** với `pg_trgm`, `unaccent`, JSONB |
| Background job | **django-q2** |
| Không dùng | Redis, search engine, microservices |
| Máy chủ | **1 VPS ở Việt Nam** (2 vCPU / 4 GB), Docker Compose, Caddy |
| CDN / bảo vệ | **Cloudflare** đứng trước |
| Lưu file | **Cloudflare R2**, gồm bucket public và bucket private |
| Backup | `pg_dump` đẩy ra ngoài VPS (offsite) |
| Email | **Brevo / Resend**, gửi từ `noreply@<domain>.vn` |
| Bản đồ | **Goong** |
| Giám sát | **UptimeRobot + Sentry** |
| Deploy | **GitHub Actions** |

---

## 3. ERD — 28 bảng (+ `django_content_type` built-in)

Đủ cột của từng bảng xem ở [ikura-diagrams.md — Trang 2](ikura-diagrams.md#trang-2--database-erd).

- **Đa ngữ:**
  - Mỗi trường cần dịch có các cột `field_vi`, `field_en`, `field_km`, quản lý bằng django-modeltranslation.
  - Bảng `i18n_translation_status` lưu `source_hash` để phát hiện bản dịch nào đã cũ so với bản tiếng Việt.
- **Sản phẩm:** thuộc tính lưu dạng JSONB. Định nghĩa thuộc tính nằm ở `catalog_attribute_def`.
- **Form:**
  - Mọi form dùng chung bảng `forms_submission`.
  - Mỗi loại form có bảng mở rộng quan hệ 1-1, ví dụ `warranty_registration` và `jobs_application`.
- **Import:** `import_batch` dùng để import Excel và rollback một lần import. Phần import đang để sau, xem mục 6.
- **Địa lý:** `geo_admin_unit` lưu đơn vị hành chính, `geo_unit_mapping` ánh xạ giữa đơn vị cũ và mới.
- **Hiển thị:** `site_section` tự ẩn những mục chưa có nội dung.
- **Bảo hành:**
  - Giai đoạn 1 chỉ có **form đăng ký**.
  - Tra cứu theo serial để sang **giai đoạn 2**, khi dữ liệu serial đã sạch.
- **An toàn:** nội dung có `is_safety` **không bao giờ** hiển thị bản dịch máy chưa được duyệt.

---

## 4. Các flow đã vẽ

Tóm tắt dưới đây. Sơ đồ từng bước (mermaid) và ghi chú đầy đủ xem ở [ikura-diagrams.md](ikura-diagrams.md).

### 4.1 Publish → revalidate

1. Admin lưu nội dung. Sau khi transaction commit, backend gọi **Next.js revalidate theo tag**.
2. Sau đó backend **purge Cloudflare theo URL**.
3. Nếu Next.js không trả 200 thì thử lại 3 lần (sau 30s · 2m · 10m). Vẫn lỗi thì báo Sentry.
4. ISR vẫn tự làm mới mỗi **1 giờ** để phòng trường hợp bước 1 hoặc 2 bị sót.

### 4.2 Form → DB → email

- Submission được lưu vào DB, rồi hệ thống gửi email thông báo.
- Email chỉ có **tóm tắt và link vào trang admin**. Không đính kèm CV hay hóa đơn.
- Nếu gửi lỗi thì **thử lại 5 lần** (sau 1m · 5m · 30m · 2h · 6h). Vẫn lỗi thì đặt `status=failed` và báo về Sentry.

### 4.3 Dịch máy vi → en/km

- Dịch máy **không bao giờ ghi đè** bản dịch đã được duyệt.
- Nếu `source_hash` của bản tiếng Việt thay đổi trong lúc job đang dịch, kết quả dịch của job đó bị **bỏ đi**.

---

## 5. Flow tìm đại lý gần nhất — TẠM DỪNG, chưa vẽ

Debate ngày 28/09/2026. Bạn chốt là tạm thời chưa cần API bản đồ (Goong/Google).

**Đã chốt:**

- Có **dưới 500 đại lý**.
- Xếp hạng theo **quãng đường thực tế đi bằng xe máy**. Khoảng cách đường chim bay (haversine) chỉ dùng làm cận dưới để lọc sơ bộ. Không cần PostGIS hay spatial index.
- Khách chọn **tỉnh → phường/xã**, hoặc **chia sẻ GPS**.
  - Nếu chỉ chọn tỉnh, web liệt kê đại lý trong tỉnh và không hiện khoảng cách.
- Mỗi lần tìm lấy bán kính tối đa **20 km**. Kết quả **chia nhóm** 0–5 / 5–10 / 10–20 km. Đây là nhóm hiển thị, không phải bộ lọc.
  - Các mốc khoảng cách này cố định, không cần cho chỉnh sửa.
- Log tìm kiếm ghi **ở cấp xã**, không lưu tọa độ hay IP. Log gửi bằng một beacon riêng, không đi qua cache.

**Đề xuất, chưa chốt:**

- Tính sẵn quãng đường từ tâm mỗi xã tới các đại lý, lưu ở bảng `dealer_distance_cache`.
- Với tìm kiếm bằng GPS, gọi Goong trực tiếp. Giới hạn số lượt gọi mỗi ngày đặt trong `site_settings`.
- Thứ tự dự phòng khi không gọi được:
  1. Gọi Goong trực tiếp.
  2. Dùng quãng đường đã tính sẵn từ xã gần nhất.
  3. Dùng khoảng cách đường chim bay, gắn nhãn "ước tính".
- Không cố định giới hạn 25 đại lý ứng viên.
- Cần thêm các trường và bảng: `geo_admin_unit.centroid_lat/lng`, `dealer_search_log`, `dealers_version`.

**Còn mở:** nút Zalo, tức là mở Zalo của đại lý qua trường `dealer.zalo_phone`.

---

## 6. Rà soát hệ thống — các flow còn thiếu

Rà soát ngày 28/09/2026.

### A — Cần có trước khi launch

| # | Nội dung | Trạng thái |
|---|---|---|
| A1 | Form yêu cầu dịch vụ/sửa chữa. Nếu khách chọn **rò rỉ ga** thì chặn form và hiện **hotline khẩn cấp** | Chưa trả lời |
| A2 | Đưa `site_settings` (hotline), `content_post_category`, `attribute_def`, `product_document` vào danh sách revalidate | Chưa trả lời |
| A3 | Xử lý yêu cầu của chủ thể dữ liệu theo **Nghị định 13**, thêm bảng `privacy_policy_version` | Chưa trả lời |
| A4 | Media: resize ảnh, tạo các bản variant, dọn file mồ côi | Chưa trả lời |
| A5 | Vận hành tài khoản admin | **Đã chốt:** email reset mật khẩu gửi về Gmail của admin, 2FA có backup code |

### B

| # | Nội dung |
|---|---|
| B1 | Chuyển một đăng ký đại lý (`dealer_signup`) thành đại lý chính thức |
| B2 | Báo khách khi bảo hành được duyệt, tự tính `warranty_until` |
| B3 | Trang quản lý job định kỳ, gồm cả tự đóng tin tuyển dụng đã quá hạn |
| B4 | Rollback deploy và khôi phục sau sự cố (disaster recovery) |

### C

Tìm kiếm tiếng Khmer · analytics · xóa mềm (soft delete) · hiển thị giá.

### Ngoài phạm vi hiện tại

**Import Excel.** Bạn sẽ bổ sung sau nên chưa vẽ flow. Trang ERD và trang kiến trúc vẫn còn nhắc tới `import_batch` / import Excel.

---

## 7. Hosting

### Đã chốt (22/10/2026)

- **P.A Việt Nam — Cloud Server #2 bản cá nhân:** 4 core, 4 + 1 GB RAM, **SSD 60 GB**, không mua ổ SAS. KVM, mạng trong nước 200 Mbps, quốc tế 20 Mbps (dùng chung). Giá 256k/tháng khi trả trước 4 năm (giá thường 320k), chưa VAT. **Năm đầu trả theo năm.**
- Lý do không chọn các gói khác:
  - Gói Hosting Node.js / Python của P.A là shared hosting: không có Docker, không chạy được worker nền.
  - Dòng Pro đắt hơn mà ít RAM hơn.
  - Dòng Super (NVMe) đắt gấp 2,5 lần, ikura chưa cần.
- CI/CD: GitHub Actions + GHCR (gói Free đủ dùng) + Portainer theo kiểu GitOps.
- Chi tiết cấu trúc repo, deploy, môi trường, database: [ikura-codebase.md](ikura-codebase.md).

### Ghi chép buổi bàn ngày 08/10/2026

**Loại máy:** VPS **ảo hóa toàn phần** (KVM, OpenStack hoặc VMware), **chỉ chạy riêng ikura**.

- Shared hosting bị loại vì không chạy được Docker.
- Máy chủ riêng (dedicated) bị loại vì thừa so với nhu cầu và không có snapshot.
- Tránh ảo hóa kiểu OpenVZ/LXC.

**Nhà cung cấp:**

| Nhóm | Tên |
|---|---|
| Cloud tầm trung (nên chọn) | **BizFly Cloud**, **VNG Cloud** (cả hai có S3 đặt ở VN), Long Vân |
| Nhà mạng / datacenter lớn | Viettel IDC, FPT Cloud, VNPT Cloud, CMC Cloud |
| Giá rẻ | Vietnix, AZDIGI, TinoHost, VinaHost, Nhân Hòa, Mắt Bão, P.A Vietnam, iNET |

Giá ước tính **200–450k ₫/tháng** cho cấu hình 2 vCPU / 4 GB. Con số này chưa kiểm lại.

**Cần hỏi nhà cung cấp trước khi thuê:**

- **Băng thông quốc tế** thực tế, ví dụ chạy `speedtest` tới Singapore.
- Có KVM không.
- Có snapshot không.
- Có IPv4 riêng không.
- Có xuất hóa đơn VAT không.
- Có hỗ trợ 24/7 không.

**Rủi ro pháp lý:** Luật Bảo vệ dữ liệu cá nhân có hiệu lực từ 01/01/2026. CV, hóa đơn bảo hành và backup đang nằm trên R2 hoặc kho offsite ở nước ngoài. Có hai hướng xử lý:

- **(a)** Giữ R2 và lập hồ sơ đánh giá tác động chuyển dữ liệu ra nước ngoài.
- **(b)** Chuyển file nhạy cảm và backup về **S3 trong nước**. Ảnh công khai vẫn để trên R2.

Hướng (b) đang được nghiêng về.

**Các biện pháp khóa VPS đã đề xuất:**

- Dùng Cloudflare Tunnel để không mở cổng nào ra Internet. Nếu không dùng Tunnel thì chỉ mở 80/443 cho dải IP của Cloudflare.
- SSH chỉ đăng nhập bằng key, tắt root, đi qua Tailscale hoặc Cloudflare Access.
- Django Admin đặt sau Cloudflare Access, cộng thêm 2FA.
- PostgreSQL chỉ chạy trong mạng nội bộ của Docker, không publish cổng 5432.
- Bật `unattended-upgrades` để tự cập nhật bản vá bảo mật.
- Bật 2FA cho tài khoản ở nhà cung cấp VPS.
- Tài khoản VPS, Cloudflare và GitHub đứng tên email công ty hoặc một email riêng cho ikura, không dùng Gmail cá nhân.

---

## 8. Việc còn mở

- [ ] Có hiển thị giá sản phẩm không.
- [ ] Khối lượng dữ liệu ước tính: số sản phẩm, đại lý, bài viết.
- [ ] Có bỏ `import_batch` khỏi ERD không, khi import Excel vẫn để sau.
- [ ] Trả lời A1–A4.
- [ ] Chốt flow tìm đại lý gần nhất (mục 5).
- [x] Hosting: P.A Cloud Server #2 bản cá nhân (mục 7).
- [x] Cấu trúc codebase và khung repo ([ikura-codebase.md](ikura-codebase.md)).
- [ ] Hosting còn lại: giá trả theo năm, ai đứng tên hóa đơn, chọn (a) hay (b), có dùng Cloudflare Tunnel không.
- [ ] Cập nhật diagram cho các flow chưa vẽ: tìm đại lý gần nhất, A1–A4, B1–B4.
- [ ] **Bước tiếp theo:** lập danh sách API endpoint.
