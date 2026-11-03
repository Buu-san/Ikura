# src/app — định tuyến (App Router)

```
app/
├── [locale]/                 # vi | en | km
│   ├── layout.tsx            # header, menu (ẩn mục trống theo site_section), footer hotline
│   ├── page.tsx              # trang chủ
│   ├── gioi-thieu/
│   ├── san-pham/  san-pham/[slug]/
│   ├── dich-vu/  bao-hanh/   # form đăng ký bảo hành
│   ├── dai-ly/               # bản đồ + bộ lọc (client component)
│   ├── tin-tuc/  tin-tuc/[slug]/
│   ├── tuyen-dung/  tuyen-dung/[slug]/
│   └── lien-he/
├── api/revalidate/route.ts   # webhook từ Django (luồng 3), kiểm tra secret, revalidateTag
└── sitemap.ts                # chỉ liệt kê ngôn ngữ thực sự hiển thị
```

Trang lấy dữ liệu là server component; phần cần tương tác thêm `"use client"`. Mọi `fetch` tới Django gắn `tags` để luồng 3 xoá cache đúng trang.
