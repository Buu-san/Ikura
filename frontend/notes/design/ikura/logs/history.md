# Nhật Ký Thiết Kế Chuẩn Ikura (Design Ikura History)

Thư mục ghi nhận mọi cập nhật về nhận diện thương hiệu, bảng màu, typography và các component chính thức của Ikura.

---

## [2026-10-06 21:55] - Khởi tạo nhận diện thương hiệu logo_palette.txt
- **Đường dẫn**: [notes/logo_palette.txt](file:///Users/panhhquach/Desktop/jack/ikura/notes/logo_palette.txt)
- **Tóm tắt nội dung**:
  - Bảng mã màu Coolors chính thức của Ikura: White (`#FFFFFF`), Cotton Candy (`#E39FA6`), Twilight Indigo (`#242F5F` & `#323561`), Lobster Pink (`#E95A56`).
- **Kiểm tra trùng lặp (Deduplication)**:
  - **Trạng thái**: Không trùng lặp (Dữ liệu gốc).
- **Điểm mới / Giá trị sử dụng (Novelty)**:
  - Là Single Source of Truth cho toàn bộ token màu sắc của dự án Ikura.
## [2026-10-06 23:55] - Chuẩn hóa biến Design Tokens trong globals.css và xóa bỏ 100% Hardcode
- **Đường dẫn**: [src/app/globals.css](file:///Users/panhhquach/Desktop/jack/ikura/src/app/globals.css), [notes/design/ikura/logo_palette.txt](file:///Users/panhhquach/Desktop/jack/ikura/notes/design/ikura/logo_palette.txt)
- **Tóm tắt nội dung**:
  - Tích hợp chuẩn xác mã màu logo Ikura: Twilight Indigo (`#242F5F`), Midnight Dark (`#1B2347`), Twilight Indigo 2 (`#323561`), Lobster Pink (`#E95A56`), Accent Hover (`#D64540`), Cotton Candy (`#E39FA6`), White (`#FFFFFF`).
  - Định nghĩa toàn bộ trong `@theme` (Tailwind v4) và `:root` CSS variables.
  - Xóa bỏ 100% mã màu hex hardcode `#[...]`, inline styles `style={{}}`, font hardcode trên toàn bộ các components trong `src/`.
- **Kiểm tra trùng lặp (Deduplication)**:
  - **Trạng thái**: Kế thừa và đồng bộ hóa trực tiếp từ `logo_palette.txt`.
- **Điểm mới / Giá trị sử dụng (Novelty)**:
## [2026-10-07 00:20] - Xóa bỏ Blur Stroke, Ghost Cards và Chuẩn Hóa Kiến Trúc Viền Sắc Nét (avoid-ai-design)
- **Đường dẫn**: [src/components/home/SafetyPopup.tsx](file:///Users/panhhquach/Desktop/jack/ikura/src/components/home/SafetyPopup.tsx), [src/components/home/*](file:///Users/panhhquach/Desktop/jack/ikura/src/components/home)
- **Tóm tắt nội dung**:
  - Triển khai toàn diện theo chỉ dẫn kỹ năng `avoid-ai-design`:
  - Loại bỏ hoàn toàn pattern "Ghost Card / Blur Stroke" (hairline gray border + diffuse blurry drop-shadow `shadow-xl`, `shadow-md`, `shadow-sm`, `shadow-xs`).
  - Thiết kế lại `SafetyPopup`: Thay thế nút bấm bóng mờ lơ lửng bằng trigger badge công nghiệp sắc nét (`border-2 border-accent-pink bg-primary-indigo`); container chuyển sang cấu trúc viền dứt khoát `border-2 border-primary-indigo` thay vì viền xám mờ.
  - Đồng bộ 100% đường viền trên toàn bộ catalog, warranty, news, dealer sang token chuẩn `border-neutral-border`.
- **Kiểm tra trùng lặp (Deduplication)**:
  - **Trạng thái**: Kế thừa và tinh chỉnh trực tiếp từ hệ thống design system.
- **Điểm mới / Giá trị sử dụng (Novelty)**:
  - Giao diện loại bỏ hoàn toàn cảm giác "AI-generated SaaS", đạt phong cách thiết bị nhà bếp công nghiệp Nhật Bản cao cấp và vững chãi.

## [2026-10-07 00:30] - Loại bỏ 100% border-white/10 và các viền mờ Opacity (Anti AI-Slop)
- **Đường dẫn**: [src/components/layout/Navbar.tsx](file:///Users/panhhquach/Desktop/jack/ikura/src/components/layout/Navbar.tsx), [src/components/layout/Footer.tsx](file:///Users/panhhquach/Desktop/jack/ikura/src/components/layout/Footer.tsx), [src/components/home/HeroBanner.tsx](file:///Users/panhhquach/Desktop/jack/ikura/src/components/home/HeroBanner.tsx), [src/components/home/WarrantyLookup.tsx](file:///Users/panhhquach/Desktop/jack/ikura/src/components/home/WarrantyLookup.tsx)
- **Tóm tắt nội dung**:
  - Xóa bỏ triệt để 100% các lớp viền mờ `border-white/10`, `border-white/15`, `border-white/20`, `border-white/5`, `border-.../10` trên toàn bộ codebase.
  - Chuyển toàn bộ các khối tối sang cấu trúc mảng màu phẳng, vững chãi, hoặc phân định bằng đường viền chuẩn thương hiệu (`border-primary-indigo`, `border-primary-dark`).
  - Thay thế các pill và tag bán trong suốt `bg-white/10 border-white/10` bằng nền đặc thương hiệu `bg-surface-indigo` đậm chất thiết bị công nghiệp cao cấp.
- **Kiểm tra trùng lặp (Deduplication)**:
  - **Trạng thái**: Kế thừa và chuẩn hóa sâu hơn từ hệ thống design system.
- **Điểm mới / Giá trị sử dụng (Novelty)**:
  - Triệt tiêu hoàn toàn dấu vết "Linear/Vercel AI dark mode slop", tạo lập ngôn ngữ thị giác sắc nét, chuyên nghiệp và đáng tin cậy.
