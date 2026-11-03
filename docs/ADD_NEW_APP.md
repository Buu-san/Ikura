# Checklist: thêm một app Django mới

Phỏng theo `docs/ADD_NEW_MODULE.md` của template Python, chỉnh cho Django. Dùng khi tạo app mới, ví dụ `promotions`.

## 1. Đặt tên

| Khái niệm | Quy ước | Ví dụ |
|---|---|---|
| Thư mục app | `snake_case`, trong `backend/src/ikura/apps/` | `promotions` |
| `AppConfig.label` | Trùng tiền tố bảng | `promotions` |
| Tên bảng (`db_table`) | `<label>_<danh từ số ít>`, khớp ERD | `promotions_campaign` |
| Đường dẫn API | `/api/v1/<danh từ số nhiều>` | `/api/v1/campaigns` |
| Tag cache cho Next.js | `<danh từ số ít>:<id>` + `<danh từ số nhiều>` | `campaign:12`, `campaigns` |

## 2. File cần tạo

```
apps/<app>/
├── __init__.py
├── apps.py            # AppConfig + label
├── models.py          # db_table, HistoricalRecords()
├── translation.py     # chỉ khi có trường cần dịch
├── admin.py           # Unfold ModelAdmin
├── api/
│   ├── serializers.py
│   ├── views.py       # mỏng
│   └── urls.py
├── services.py        # nghiệp vụ + transaction + on_commit
├── tasks.py           # chỉ khi có job chạy nền
├── migrations/
├── tests/
└── README.md          # phạm vi app + bảng
```

## 3. Gắn vào project

1. Thêm `"ikura.apps.<app>"` vào `INSTALLED_APPS`.
2. Include `apps/<app>/api/urls.py` vào `/api/v1/`.
3. Nếu có trường dịch: đăng ký trong `translation.py`, và để luồng 5 theo dõi (tạo dòng `i18n_translation_status`).
4. Nếu bản ghi hiển thị trên web: lúc publish, unpublish hoặc xóa thì gọi revalidate qua `core` với đúng tag (luồng 3).
5. Thêm mục vào menu admin trong `UNFOLD["SIDEBAR"]`.
6. Chạy `makemigrations`, kiểm tra tên bảng khớp ERD.

## 4. Test tối thiểu

- Service: tạo, sửa, publish đúng nghiệp vụ.
- API: trả đúng dữ liệu theo `locale`, fallback km → en → vi.
- Revalidate được xếp **sau khi commit** (`django_capture_on_commit_callbacks`).
- Trang admin danh sách và form mở được (status 200).

## 5. Cập nhật tài liệu

- ERD trong [ikura-diagrams.md](ikura-diagrams.md) và file `.drawio`.
- Bảng app trong [ikura-codebase.md](ikura-codebase.md#2-cây-thư-mục).
- README của app.
