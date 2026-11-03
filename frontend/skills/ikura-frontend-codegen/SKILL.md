---
name: ikura-frontend-codegen
description: >-
  Generates production-ready Next.js 16 (App Router), React 19, and Tailwind CSS v4 code for Ikura.
  Use this skill whenever creating or updating frontend pages, layout components, data models,
  and interactive UI features by combining design tokens and structured content.
---

# Ikura Frontend Codegen Skill

Kỹ năng phối hợp Design Tokens và Structured Content để sinh mã nguồn Next.js 16 (App Router) + React 19 + Tailwind CSS v4 chuẩn SEO, mượt mà và tối ưu hiệu năng.

---

## 1. Quy trình Sinh mã 4 Bước (Pipeline)

```text
[ikura-design-system]  ──> Design Tokens, Màu sắc, UI Layout
                                     │
                                     ▼
[ikura-content-strategy] ──> TypeScript Types, Dữ liệu Sản phẩm, i18n
                                     │
                                     ▼
[ikura-frontend-codegen] ──> Sinh mã React/Next.js (Server & Client Components)
                                     │
                                     ▼
Kiểm tra chất lượng      ──> npm run lint & build check
```

---

## 2. Tiêu chuẩn Kỹ thuật & Cấu trúc Mã nguồn

Dự án sử dụng Next.js 16 App Router với cấu trúc thư mục chuẩn tại `src/`:

```text
src/
├── app/
│   ├── layout.tsx              # Root layout chứa Header, Footer, Fonts tiếng Việt
│   ├── page.tsx                # Trang chủ tổng hợp
│   ├── san-pham/               # Danh mục & Chi tiết sản phẩm
│   ├── bao-hanh/               # Tra cứu bảo hành điện tử (Client form)
│   ├── he-thong-dai-ly/        # Bản đồ & Bộ lọc đại lý theo tỉnh thành
│   └── globals.css             # Tailwind v4 theme & CSS variables
├── components/
│   ├── layout/                 # Header, Footer, MegaMenu, MobileNav
│   ├── products/               # ProductCard, SpecTable, FilterSidebar
│   ├── warranty/               # WarrantySearchForm, WarrantyResultCard
│   ├── dealers/                # DealerMap, DealerFilterDropdown
│   └── ui/                     # Button, Input, Modal, Badge
├── types/                      # TypeScript Interfaces (Product, Spec, Dealer...)
└── data/                       # Dữ liệu tĩnh hoặc API mock ban đầu
```

---

## 3. Quy tắc Triển khai Code (Coding Standards)

1. **Tailwind CSS v4 & Màu sắc**:
   - Sử dụng các lớp tiện ích Tailwind tương ứng với bảng màu Ikura:
     - Header/Footer nền tối: `bg-[#242F5F]`
     - Điểm nhấn & Nút bấm: `bg-[#E95A56] hover:bg-[#d44844] text-white`
     - Badge thông số: `bg-[#E39FA6]/20 text-[#242F5F] border border-[#E39FA6]`
2. **Server Components vs Client Components**:
   - Mặc định là **Server Component** cho các khối tĩnh (Giới thiệu, Banner, Danh sách sản phẩm) để tối ưu SEO và tốc độ tải.
   - Thêm `'use client'` cho các tương tác người dùng:
     - Ô tìm kiếm gợi ý từ khóa thông minh
     - Bộ chọn ngôn ngữ (VI / EN / KM)
     - Form tra cứu số Serial / Số điện thoại bảo hành
     - Bộ lọc dropdown tỉnh thành của đại lý
3. **SEO & Accessibility**:
   - Sử dụng thẻ ngữ nghĩa (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - Mỗi trang có tiêu đề `<title>` và `<meta description>` đầy đủ chuẩn tiếng Việt có dấu.
   - Các nút bấm và ô nhập liệu đều có `id` và nhãn `aria-label` rõ ràng.

---

## 4. Tương tác với Hệ thống Logs

- Trước khi bắt đầu sinh mã một trang hoặc một tính năng mới:
  - Đọc file [notes/logs/changelog.md](file:///Users/panhhquach/Desktop/jack/ikura/notes/logs/changelog.md) để kiểm tra xem có bản cập nhật mới nhất nào về thiết kế hoặc thông số sản phẩm cần tuân thủ.
  - Đảm bảo mã sinh ra không dùng thông số cũ đã bị gắn cờ `[CONFLICT]` trong log.
