# apps — các app nghiệp vụ

| App | Phạm vi | Bảng (theo ERD) |
|---|---|---|
| [catalog/](catalog/) | Sản phẩm: bếp ga, ga, thiết bị ga | `catalog_category`, `catalog_product`, `catalog_product_image`, `catalog_product_document`, `catalog_attribute_def`, `catalog_attribute_option` |
| [geo/](geo/) | Đơn vị hành chính (2 cấp sau 07/2025, sẵn chỗ cho nước khác) | `geo_country`, `geo_admin_unit`, `geo_unit_mapping` |
| [dealers/](dealers/) | Đại lý / điểm bán; sau này có flow tìm đại lý gần nhất (đang tạm dừng) | `dealer`, `dealer_category` |
| [content/](content/) | Tin tức, cẩm nang, trang tĩnh; nội dung `is_safety` không hiện bản dịch máy chưa duyệt | `content_post_category`, `content_post`, `content_page` |
| [jobs/](jobs/) | Tuyển dụng | `jobs_posting`, `jobs_application` |
| [forms/](forms/) | Form công khai (luồng 4: Form → DB → email): liên hệ, đăng ký đại lý, ứng tuyển, bảo hành | `forms_submission`, `forms_notification_log` |
| [warranty/](warranty/) | Bảo hành: giai đoạn 1 chỉ đăng ký, tra cứu serial là giai đoạn 2 | `warranty_registration`, `warranty_serial` |
| [i18n/](i18n/) | Trạng thái bản dịch + dịch máy vi → en/km (luồng 5) | `i18n_translation_status` |
| [site/](site/) | Cấu hình site (hotline, mail nhận thông báo, mạng xã hội) và các mục menu tự ẩn khi trống | `site_settings`, `site_section`, `seo_redirect` |
| [media/](media/) | File upload: ảnh/PDF công khai (R2) và CV/hoá đơn riêng tư (S3 trong nước, chờ chốt) | `media_file`, `import_batch` |

Bảng dùng chung có sẵn của Django: `auth_user`, `auth_group`, `django_content_type`. Mọi bảng nghiệp vụ có thêm `history_<bảng>` (simple-history).
