# Log Entry Templates & Reference Guide

Tài liệu hướng dẫn mẫu ghi chép cho các tình huống khác nhau khi cập nhật thư mục `notes/`.

---

## 1. Mẫu ghi log khi thêm file Thiết kế Tham khảo (Competitor Reference)

```markdown
## [2026-10-06 22:15] - Thêm mới sunhouse.com.vn-design.md
- **Đường dẫn**: `notes/design/references/sunhouse/sunhouse.com.vn-design.md`
- **Tóm tắt nội dung**:
  - Bảng màu tham khảo từ Sunhouse: Primary `#333333`, Tertiary/Accent `#82DFF0`.
  - Quy chuẩn font chữ bán lẻ: Stag Sans VU Semibold/Medium (Headline 26px - 40px).
  - Phân tích bố cục giao diện website thương mại bán lẻ đồ gia dụng.
- **Kiểm tra trùng lặp (Deduplication)**:
  - **Trạng thái**: Không trùng lặp.
  - **Chi tiết**: Là tài liệu tham khảo đầu tiên của Sunhouse về UI/UX.
- **Điểm mới / Giá trị sử dụng (Novelty)**:
  - Cung cấp cấu trúc typography chi tiết theo chuẩn thương mại bán lẻ.
  - Cung cấp gợi ý về màu phụ trợ (Tertiary/Accent cyan `#82DFF0`).
- **Đề xuất tiếp theo**:
  - Giữ lại làm tài liệu tham khảo trong thư mục `references/sunhouse/`.
```

---

## 2. Mẫu ghi log khi phát hiện Xung đột thông số (Parameter Conflict)

```markdown
## [2026-10-06 22:30] - Cập nhật bep-ga-am-ik-888.md
- **Đường dẫn**: `notes/content/ikura/products/bep-ga-am-ik-888.md`
- **Tóm tắt nội dung**:
  - Cập nhật thông số kích thước cắt đá và loại đầu đốt cho model IK-888.
- **Kiểm tra trùng lặp (Deduplication)**:
  - **Trạng thái**: Xung đột dữ liệu (Conflict).
  - **Chi tiết**: File cũ ghi kích thước khoét đá là `680 x 380 mm`, nhưng file mới ghi là `650 x 350 mm`.
- **Hành động**:
  - Đã đánh dấu cảnh báo `[CONFLICT]` trong file log và thông báo người dùng xác nhận thông số kỹ thuật chính xác của nhà sản xuất.
```

---

## 3. Mẫu ghi log khi phát hiện Trùng lặp hoàn toàn (Redundant Duplicate)

```markdown
## [2026-10-06 22:45] - Phát hiện trùng lặp copy-palette.txt
- **Đường dẫn**: `notes/copy-palette.txt`
- **Tóm tắt nội dung**:
  - Chứa bảng mã màu HEX giống 100% với file `notes/logo_palette.txt`.
- **Kiểm tra trùng lặp (Deduplication)**:
  - **Trạng thái**: Trùng lặp hoàn toàn (100% Duplicate).
- **Đề xuất tiếp theo**:
  - Khuyến nghị xóa bỏ file `copy-palette.txt` để tránh gây dư thừa tài liệu.
```
