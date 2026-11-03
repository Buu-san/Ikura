---
name: ikura-content-strategy
description: >-
  Structures domain content, product technical specifications, warranty/dealer services,
  and multi-language (VI, EN, KM) copy for Ikura. Use this skill whenever structuring,
  validating, or extracting text, specs, and data models before generating frontend code.
---

# Ikura Content Strategy Skill

Kỹ năng chuẩn hóa nội dung, thông số kỹ thuật sản phẩm, chính sách dịch vụ bảo hành và dữ liệu đa ngôn ngữ cho thương hiệu Ikura.

---

## 1. Nguyên tắc Đọc Dữ liệu & Thứ tự Ưu tiên (Precedence)

1. **Ưu tiên 1 (Ikura First)**:
   - Luôn đọc từ thư mục [notes/content/ikura/](file:///Users/panhhquach/Desktop/jack/ikura/notes/content/ikura) (đặc biệt là [content.md](file:///Users/panhhquach/Desktop/jack/ikura/notes/content/ikura/content.md)).
   - Tên thương hiệu, sứ mệnh căn bếp Việt, chính sách bảo hành 24-36 tháng và các dòng sản phẩm của Ikura là dữ liệu gốc số 1.
2. **Ưu tiên 2 (Reference Fallback)**:
   - Nếu Ikura chưa liệt kê đầy đủ trường thông số (ví dụ: các tiêu chuẩn kỹ thuật chi tiết của bếp ga hồng ngoại, các bước hẹn giờ bảo trì), tham khảo từ [notes/content/references/](file:///Users/panhhquach/Desktop/jack/ikura/notes/content/references) (Rinnai, Sunhouse).
   - Tinh chỉnh câu chữ lại cho phù hợp với phong cách thân thiện, an toàn của gia đình Việt.

---

## 2. Mô hình Cấu trúc Dữ liệu Cốt lõi (Content Schemas)

### A. Thông số Kỹ thuật Bếp Ga (Product Specs Schema)
Mỗi sản phẩm bếp ga của Ikura phải luôn có cấu trúc thông số chuẩn:
- `id`: Mã định danh (ví dụ `ik-680`)
- `name`: Tên thương mại (ví dụ `Bếp Ga Âm Cao Cấp Ikura IK-680`)
- `category`: Phân loại (`Bếp ga âm` | `Bếp ga dương` | `Bếp ga hồng ngoại` | `Bình ga & Phụ kiện`)
- `glassDimension`: Kích thước mặt kính (ví dụ `750 x 450 mm`)
- `cutoutDimension`: Kích thước khoét đá / lỗ đá (ví dụ `680 x 380 mm`)
- `burnersCount`: Số lò nấu (ví dụ `2 lò`)
- `burnerMaterial`: Chất liệu đầu đốt (`Đồng thau nguyên khối` | `Hợp kim nhôm cao cấp`)
- `ignitionSystem`: Hệ thống đánh lửa (`Pin IC 1.5V` | `Magneto thế hệ mới`)
- `safetyCutoff`: Tính năng ngắt ga tự động (`Có - Cảm ứng nhiệt ngắt ga an toàn 100%`)
- `glassMaterial`: Mặt kính (`Kính cường lực chịu lực 50kg, chịu nhiệt 800°C`)
- `warrantyMonths`: Thời gian bảo hành chính hãng (`24 tháng` hoặc `36 tháng`)

### B. Dịch vụ Bảo hành & Hỗ trợ (Warranty & Services)
- Tra cứu bảo hành điện tử theo `Serial` máy hoặc `Số điện thoại`.
- Quy trình hẹn giờ lắp đặt tại nhà: Tiếp nhận yêu cầu $\rightarrow$ Kỹ thuật viên xác nhận $\rightarrow$ Lắp đặt & Hướng dẫn sử dụng an toàn $\rightarrow$ Nghiệm thu.
- Hỗ trợ khẩn cấp 24/7 qua Hotline tổng đài.

### C. Mạng lưới Đại lý & Showroom (Dealers Schema)
- `name`: Tên showroom / Đại lý
- `city`: Tỉnh / Thành phố
- `district`: Quận / Huyện
- `address`: Địa chỉ cụ thể
- `hotline`: Số điện thoại liên hệ
- `hasWarrantyCenter`: Có trạm bảo hành chính hãng (true / false)

### D. Đa ngôn ngữ (i18n Schema)
- Hỗ trợ 3 ngôn ngữ:
  - `vi`: Tiếng Việt (Ngôn ngữ mặc định)
  - `en`: Tiếng Anh
  - `km`: Tiếng Campuchia (Khmer)

---

## 3. Tương tác với Hệ thống Logs

- Mỗi khi có sản phẩm mới, cập nhật bảng thông số kỹ thuật, hoặc bổ sung từ điển dịch thuật:
  - Ghi nhật ký vào [notes/content/ikura/logs/history.md](file:///Users/panhhquach/Desktop/jack/ikura/notes/content/ikura/logs/history.md).
  - Cập nhật dòng tóm tắt vào [notes/logs/changelog.md](file:///Users/panhhquach/Desktop/jack/ikura/notes/logs/changelog.md).
