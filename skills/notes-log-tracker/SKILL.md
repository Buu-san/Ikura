---
name: notes-log-tracker
description: >-
  Audits, verifies, and logs document changes in the notes/ directory.
  Use this skill whenever files or content are added, updated, or moved within notes/
  to perform semantic deduplication, detect content conflicts, and maintain structured changelogs
  in the respective logs/ folders.
---

# Notes Log Tracker Skill

Kỹ năng tự động kiểm tra, rà soát trùng lặp và ghi nhật ký thay đổi cho mọi tài liệu trong thư mục [notes/](file:///Users/panhhquach/Desktop/jack/ikura/notes).

---

## 1. Mục tiêu & Nguyên tắc cốt lõi

1. **Minh bạch lịch sử (Traceability)**: Mọi thao tác thêm mới, chỉnh sửa, di chuyển tài liệu trong `notes/` đều được ghi nhận với mốc thời gian rõ ràng (Timestamp `YYYY-MM-DD HH:MM`).
2. **Kiểm tra trùng lặp (Deduplication)**:
   - So sánh nội dung mới với kho tài liệu đã có trong `notes/`.
   - Phân loại: **Không trùng**, **Trùng lặp một phần (Partial)**, hoặc **Xung đột thông số (Conflict)**.
3. **Phân cấp ưu tiên (Precedence)**:
   - Dữ liệu trong `ikura/` là số 1 (Chính thức).
   - Dữ liệu trong `references/` là số 2 (Tham khảo đối thủ). Không bao giờ để dữ liệu tham khảo ghi đè lên dữ liệu chính thức của Ikura.

---

## 2. Bản đồ thư mục Logs tương ứng

Mỗi tài liệu thuộc phân mục nào sẽ được ghi log vào thư mục `logs/` của phân mục đó, kèm theo một dòng tóm tắt vào nhật ký chung:

| Vị trí file tài liệu | Thư mục ghi log chi tiết | File ghi nhận |
| :--- | :--- | :--- |
| `notes/design/ikura/...` | `notes/design/ikura/logs/` | `history.md` |
| `notes/design/references/...` | `notes/design/references/logs/` | `history.md` |
| `notes/content/ikura/...` | `notes/content/ikura/logs/` | `history.md` |
| `notes/content/references/...` | `notes/content/references/logs/` | `history.md` |
| **Toàn bộ notes (Cấp tổng thể)** | `notes/logs/` | `changelog.md` |

---

## 3. Quy trình thực hiện (Workflow)

Mỗi khi người dùng thêm file mới hoặc cập nhật nội dung trong `notes/`, thực hiện tuần tự 4 bước sau:

### Bước 1: Xác định tài liệu mới/thay đổi
- Đọc nội dung file mới hoặc đoạn nội dung vừa được cập nhật.
- Xác định phân nhánh:
  - Thuộc **Design** hay **Content**?
  - Thuộc **Ikura** (chính thức) hay **References** (tham khảo Sunhouse/Rinnai...)?

### Bước 2: So sánh & Kiểm tra trùng lặp (Deduplication Check)
- Đọc các file liên quan trong cùng phân mục để đối chiếu:
  - **Kiểm tra màu sắc / Token**: Có trùng mã HEX trong `palette.md` không?
  - **Kiểm tra thông số kỹ thuật**: Kích thước khoét đá, đầu đốt, chế độ bảo hành đã có ở sản phẩm nào chưa?
  - **Kiểm tra câu chữ / Copywriting**: Nội dung có sao chép nguyên văn từ tài liệu khác không?
- Phân loại kết quả:
  - `Trùng lặp hoàn toàn (Duplicate)`: Nội dung đã tồn tại 100% $\rightarrow$ Cảnh báo để tránh lưu trữ rác.
  - `Trùng lặp một phần (Overlap)`: Có ý trùng nhưng có bổ sung ý mới $\rightarrow$ Ghi rõ phần mới.
  - `Xung đột dữ liệu (Conflict)`: Hai tài liệu mâu thuẫn số liệu $\rightarrow$ Đưa ra cảnh báo cho người dùng xác nhận.
  - `Hoàn toàn mới (Novel)`: Nội dung mới hữu ích.

### Bước 3: Ghi nhận vào file Log chi tiết (`history.md`)
Mở file `history.md` tại thư mục `logs/` tương ứng và chèn một entry mới lên đầu danh sách theo mẫu:

```markdown
## [YYYY-MM-DD HH:MM] - [Thêm mới | Cập nhật | Di chuyển] <Tên file>
- **Đường dẫn**: `<path_to_file>`
- **Tóm tắt nội dung**:
  - <Điểm cốt lõi 1>
  - <Điểm cốt lõi 2>
- **Kiểm tra trùng lặp (Deduplication)**:
  - **Trạng thái**: [Không trùng | Trùng một phần | Xung đột dữ liệu]
  - **Chi tiết**: <Mô tả phần trùng hoặc file liên quan nếu có>
- **Điểm mới / Giá trị sử dụng (Novelty)**:
  - <Tính năng, thông số hoặc ý tưởng nổi bật>
- **Đề xuất tiếp theo**:
  - [Giữ nguyên | Hợp nhất vào file X | Cần người dùng phê duyệt]
```

### Bước 4: Đồng bộ vào Nhật ký tổng quan (`notes/logs/changelog.md`)
Thêm một dòng tóm tắt vào bảng tổng kết tại `notes/logs/changelog.md`:

```markdown
| YYYY-MM-DD HH:MM | <Phân mục> | <Tên file> | [Thêm/Sửa] | <Tóm tắt 1 câu> | <Trạng thái trùng lặp> |
```

---

## 4. Mẫu kiểm tra nhanh (Checklist)

Trước khi hoàn tất ghi log:
- [ ] Mốc thời gian đã chính xác theo giờ hệ thống chưa?
- [ ] Đã chỉ rõ đường dẫn file tương đối và tuyệt đối chưa?
- [ ] Đã đối chiếu với dữ liệu hiện có để tìm trùng lặp chưa?
- [ ] Nếu có xung đột thông số, đã cảnh báo cho người dùng chưa?
