---
name: ikura-i18n-manager
description: >-
  Audits, synchronizes, and enforces multi-language (i18n) copy for Vietnamese (vi), English (en), and Khmer (km)
  across all frontend components. Use this skill whenever adding new UI features, creating or updating page copy
  to ensure zero hardcoded strings, prevent duplicated keys in JSON files, and maintain 100% key parity across all 3 language dictionaries.
---

# Ikura i18n Manager Skill

Kỹ năng quản lý, chuẩn hóa và kiểm soát chất lượng hệ thống đa ngôn ngữ (Tiếng Việt `vi`, Tiếng Anh `en`, Tiếng Campuchia `km`) cho toàn bộ dự án Ikura.

---

## 1. Nguyên Tắc Cốt Lõi: ZERO HARDCODING

1. **Tuyệt đối không viết cứng chuỗi (No Hardcoded Strings)**:
   - Trong mã nguồn frontend (`.tsx`, `.jsx`), mọi tiêu đề, nút bấm, nhãn, thông báo, câu chữ đều **bắt buộc** phải sử dụng hook `useI18n()` và gọi hàm `t('phân_mục.khóa_dịch')`.
   - Ví dụ:
     - ❌ SAI: `<h2>Sứ Mệnh Bảo Vệ Căn Bếp Việt</h2>`
     - ✅ ĐÚNG: `<h2>{t('story.title')}</h2>`
2. **Đối xứng Key 100% (1-to-1 Key Parity)**:
   - Khi một key mới được thêm vào [src/i18n/locales/vi.json](file:///Users/panhhquach/Desktop/jack/ikura/src/i18n/locales/vi.json), **bắt buộc phải có mặt ngay lập tức** trong cả [src/i18n/locales/en.json](file:///Users/panhhquach/Desktop/jack/ikura/src/i18n/locales/en.json) và [src/i18n/locales/km.json](file:///Users/panhhquach/Desktop/jack/ikura/src/i18n/locales/km.json).
3. **Chống Trùng Lặp Key (Deduplication)**:
   - Cấu trúc key theo dạng phân cấp: `common.*`, `nav.*`, `hero.*`, `story.*`, `products.*`, `warranty.*`, `dealers.*`, `news.*`, `contact.*`, `popup.*`, `footer.*`.
   - Các từ dùng chung (như "Đóng", "Xem chi tiết", "Xác nhận", Hotline) phải tái sử dụng từ `common.*`, không tạo lặp lại trong từng component.
4. **Đồng bộ với Kho Tri Thức (Single Source of Truth)**:
   - Toàn bộ thay đổi của 3 file JSON phải được đồng bộ sang [notes/content/ikura/i18n/](file:///Users/panhhquach/Desktop/jack/ikura/notes/content/ikura/i18n).

---

## 2. Quy Trình Thêm Tính Năng Mới (New Feature Workflow)

Khi người dùng yêu cầu tạo trang hoặc tính năng mới:

### Bước 1: Trích xuất Text & Định nghĩa Key
- Lập danh sách toàn bộ văn bản hiển thị của tính năng mới.
- Tạo nhóm key tương ứng (ví dụ: `my_feature.title`, `my_feature.btn_submit`).

### Bước 2: Cập nhật đồng thời cả 3 file từ điển
1. Thêm bản dịch tiếng Việt vào `src/i18n/locales/vi.json`.
2. Thêm bản dịch tiếng Anh vào `src/i18n/locales/en.json`.
3. Thêm bản dịch tiếng Campuchia vào `src/i18n/locales/km.json`.
4. Copy đồng bộ sang `notes/content/ikura/i18n/`.

### Bước 3: Chạy Kiểm Thử Đối Xứng Key Tự Động
Chạy lệnh kiểm tra tính toàn vẹn:
```bash
npm run validate:i18n
```
Nếu có bất kỳ key nào bị thiếu hoặc lệch giữa 3 ngôn ngữ, lệnh sẽ báo lỗi chi tiết để sửa ngay.

### Bước 4: Viết Mã Nguồn Giao Diện
- Trong component React, import `useI18n`:
```tsx
import { useI18n } from '@/i18n/LanguageContext';

export default function MyComponent() {
  const { t } = useI18n();
  return <button>{t('my_feature.btn_submit')}</button>;
}
```

---

## 3. Lệnh Kiểm Tra Nhanh
- `npm run validate:i18n`: Quét toàn bộ cây JSON của `vi`, `en`, `km`, xác thực đối xứng 100%.
- `npm run lint`: Đảm bảo không có lỗi render hay import.
