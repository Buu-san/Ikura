# app `catalog`

Sản phẩm: bếp ga, ga, thiết bị ga.

**Bảng:** `catalog_category`, `catalog_product`, `catalog_product_image`, `catalog_product_document`, `catalog_attribute_def`, `catalog_attribute_option`

Cột chi tiết: [docs/ikura-diagrams.md — Trang 2](../../../../../docs/ikura-diagrams.md#trang-2--database-erd).

## Khuôn file của app (sẽ tạo khi bắt đầu code)

| File | Nội dung |
|---|---|
| `apps.py` | `AppConfig`, đặt `label` khớp tiền tố bảng trong ERD |
| `models.py` | Model, `db_table` đặt đúng tên bảng trong ERD, `HistoricalRecords()` cho bảng nghiệp vụ |
| `translation.py` | Đăng ký các trường `_{vi,en,km}` với django-modeltranslation |
| `admin.py` | Màn hình Django Admin (Unfold): cột, bộ lọc, tìm kiếm, tab vi/en/km, nút thao tác |
| `api/serializers.py`, `api/views.py`, `api/urls.py` | REST API công khai, **mỏng**: chỉ parse, gọi service, trả kết quả |
| `services.py` | Nghiệp vụ + transaction + `transaction.on_commit(...)` xếp job |
| `tasks.py` | Hàm chạy trong worker django-q2 |
| `migrations/` | Migration do Django sinh |
| `tests/` | Test của app (pytest-django) |

Quy tắc: app khác chỉ gọi vào app này qua `services.py`, không truy vấn thẳng model của nhau. Xem [docs/ADD_NEW_APP.md](../../../../../docs/ADD_NEW_APP.md).
