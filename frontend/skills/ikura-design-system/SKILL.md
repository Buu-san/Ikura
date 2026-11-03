---
name: ikura-design-system
description: >-
  Guides the visual design system, brand colors, typography, and UI layout components for Ikura.
  Use this skill whenever designing or styling frontend pages and components, defining Tailwind tokens,
  or extracting UI patterns from Ikura brand assets and competitor references.
---

# Ikura Design System Skill

Kỹ năng định hướng thẩm mỹ, bảng màu thương hiệu, typography và quy chuẩn giao diện (UI/UX) cho hệ thống website Ikura.

---

## 1. Nguyên tắc Đọc Dữ liệu & Thứ tự Ưu tiên (Precedence)

1. **Ưu tiên 1 (Ikura First)**:
   - Luôn đọc từ thư mục [notes/design/ikura/](file:///Users/panhhquach/Desktop/jack/ikura/notes/design/ikura).
   - Màu sắc nhận diện và quy chuẩn của Ikura là **Single Source of Truth**, không bao giờ bị ghi đè.
2. **Ưu tiên 2 (Reference Fallback)**:
   - Nếu Ikura chưa định nghĩa layout chi tiết cho một thành phần cụ thể (ví dụ: cách trình bày icon tính năng, bảng thông số kỹ thuật, thanh lọc đại lý), tham khảo từ [notes/design/references/](file:///Users/panhhquach/Desktop/jack/ikura/notes/design/references) (Sunhouse, Rinnai).
   - Sau khi học hỏi bố cục, phải "khoác" lại toàn bộ bảng màu và phong cách chuẩn của Ikura.

---

## 2. Bảng Màu Nhận Diện Thương Hiệu (Brand Palette)

Dựa trên tài liệu nhận diện gốc:

| Tên màu | Mã HEX | Vai trò trong giao diện | Ứng dụng cụ thể |
| :--- | :--- | :--- | :--- |
| **Twilight Indigo** | `#242F5F` | Màu chủ đạo (Primary Dark) | Header background, Footer, Tiêu đề chính (H1/H2), Thanh điều hướng |
| **Twilight Indigo 2** | `#323561` | Màu bề mặt thứ cấp (Surface Dark) | Card nền tối, Dropdown menu, Khối nổi bật tính năng |
| **Lobster Pink** | `#E95A56` | Màu điểm nhấn (Primary Accent) | Nút hành động CTA ("Tra cứu bảo hành", "Hotline"), Badge khuyến mãi, Icon quan trọng |
| **Cotton Candy** | `#E39FA6` | Màu phụ trợ nhẹ (Soft Accent) | Badge bảo hành 24-36 tháng, Đường viền hover nhẹ, Tag thông số |
| **White** | `#FFFFFF` | Nền sáng & Tương phản | Nền trang tổng thể, Nền card sản phẩm, Màu chữ trên nền tối |

---

## 3. Typography & Phân cấp thị giác

- **Font chữ ưu tiên**: Hỗ trợ tiếng Việt hoàn hảo, hiện đại và sạch sẽ:
  - Font chính: `Be Vietnam Pro` hoặc `Plus Jakarta Sans` (Google Fonts).
- **Phân cấp tiêu đề**:
  - `Hero Display`: 40px - 48px, font-bold (Dành cho banner trang chủ).
  - `Section Heading (H2)`: 28px - 32px, font-semibold, text-color `#242F5F`.
  - `Component Heading (H3)`: 20px - 24px, font-medium.
  - `Body Text`: 15px - 16px, line-height 1.6, màu xám đậm tương phản dễ đọc (`#374151`).

---

## 4. Quy chuẩn Layout Thành phần (UI Components)

1. **Header & Thanh điều hướng**:
   - Sticky header cố định khi scroll, nền `#242F5F` kết hợp hiệu ứng glassmorphism nhẹ.
   - Logo Ikura bên trái, Thanh tìm kiếm thông minh ở giữa (gợi ý từ khóa tự động), Menu đa ngôn ngữ (VI / EN / KM) và Hotline CTA màu `#E95A56` bên phải.
2. **Product Card (Thẻ sản phẩm)**:
   - Bo góc mềm mại (`rounded-xl`), viền nhẹ, bóng đổ tinh tế khi hover (`hover:shadow-xl hover:-translate-y-1`).
   - Huy hiệu bảo hành chính hãng 24 - 36 tháng nổi bật ở góc.
   - Bảng tóm tắt thông số nhanh: Số lò nấu, Chất liệu đầu đốt, Ngắt ga tự động.
3. **Modal & Form (Tra cứu bảo hành / Lắp đặt)**:
   - Giao diện thân thiện trên thiết bị di động, input lớn dễ nhập số điện thoại hoặc mã Serial.

---

## 5. Tương tác với Hệ thống Logs

- Mỗi khi có bổ sung bảng màu mới, đổi font chữ, hoặc tạo mẫu component mới cho Ikura:
  - Ghi nhật ký vào [notes/design/ikura/logs/history.md](file:///Users/panhhquach/Desktop/jack/ikura/notes/design/ikura/logs/history.md).
  - Cập nhật dòng tóm tắt vào [notes/logs/changelog.md](file:///Users/panhhquach/Desktop/jack/ikura/notes/logs/changelog.md).
