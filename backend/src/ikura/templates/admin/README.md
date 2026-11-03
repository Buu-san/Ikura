# templates/admin — giao diện admin (FE chỉnh được)

Django Admin dùng theme **Unfold** (Tailwind + Alpine.js), render phía server — không có React.

| File (sẽ tạo) | Nội dung |
|---|---|
| `index.html` | Dashboard trang chủ admin: thẻ số liệu, biểu đồ |
| `<app>/...` | Trang riêng khi cần (ví dụ màn duyệt bản dịch đặt bản vi cạnh bản km) |

Chỉ dùng class Tailwind và component của Unfold. Số liệu do backend đổ vào qua `core/admin_dashboard.py`.
