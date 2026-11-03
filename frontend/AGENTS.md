<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Quy Tắc Dự Án Ikura (Ikura Project Guidelines)

Tất cả các Agent và Skills khi làm việc trên dự án này bắt buộc phải tuân thủ các quy tắc sau:

## 1. Nguyên Tắc Ưu Tiên Nguồn Dữ Liệu (Precedence Rules)
1. **Ikura First (Số 1 - Tuyệt đối)**:
   - Dữ liệu nằm trong `notes/design/ikura/` và `notes/content/ikura/` là **Single Source of Truth** (nhận diện thương hiệu, mã màu Twilight Indigo `#242F5F`, Lobster Pink `#E95A56`, thông số bếp ga, bảo hành 24-36 tháng).
   - Tuyệt đối không để dữ liệu từ bên ngoài ghi đè hoặc làm thay đổi các quy chuẩn này.
2. **Reference Fallback (Số 2 - Tham khảo)**:
   - Chỉ tham khảo tài liệu từ `notes/*/references/` (Sunhouse, Rinnai) khi Ikura chưa có quy chuẩn hoặc cần học hỏi bố cục/tính năng mới.
   - Khi áp dụng ý tưởng từ đối thủ, bắt buộc phải "khoác" lại nhận diện, màu sắc và tone giọng chuẩn của Ikura.

## 2. Hệ Thống 5 Skills Cốt Lõi
- **`notes-log-tracker`**: Tự động rà soát trùng lặp (Deduplication) và lưu vết lịch sử vào các thư mục `logs/`.
- **`ikura-design-system`**: Quản lý bảng màu, typography, và quy chuẩn giao diện UI/UX.
- **`ikura-content-strategy`**: Quản lý thông số kỹ thuật, schema dữ liệu sản phẩm, dịch vụ và cấu trúc từ điển.
- **`ikura-i18n-manager`**: Quản lý đa ngôn ngữ (VI, EN, KM), đảm bảo Zero Hardcoding và đối xứng key 100%.
- **`ikura-frontend-codegen`**: Sinh mã nguồn Next.js 16 (App Router), React 19 và Tailwind CSS v4 dựa trên thiết kế và nội dung đã duyệt.

## 3. Quy Chuẩn Đa Ngôn Ngữ (Zero Hardcoding)
- Tuyệt đối không viết cứng câu chữ vào file code. Mọi component phải dùng `useI18n()` và `t('key')`.
- Khi thêm tính năng mới, bắt buộc phải cập nhật đủ 3 file `vi.json`, `en.json`, `km.json` và chạy `npm run validate:i18n`.

## 4. Quy Chuẩn Đồng Bộ Logs
- Bất kỳ tài liệu nào được thêm mới hoặc sửa đổi trong `notes/` đều phải được ghi nhận vào `history.md` của phân mục đó và đồng bộ dòng tóm tắt vào `notes/logs/changelog.md`.
