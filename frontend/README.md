# frontend — Next.js (React) → image `ikura-web`

Web cho khách truy cập: SSR/ISR, `/vi` · `/en` · `/km`, sitemap, hreflang. Viết bằng **React + TypeScript** trên Next.js (App Router).

| File gốc (sẽ tạo) | Nội dung |
|---|---|
| `package.json`, `tsconfig.json` | Next.js, React, TypeScript, Tailwind |
| `next.config.ts` | `output: "standalone"`, redirect `/` → `/vi` |
| `Dockerfile` | Build nhiều tầng, chạy `node server.js` |
| `.env.example` | `API_INTERNAL_URL=http://django:8000`, `REVALIDATE_SECRET`, `NEXT_PUBLIC_SITE_URL` |

| Thư mục | Nội dung |
|---|---|
| [src/app/](src/app/) | Định tuyến theo thư mục |
| [src/components/](src/components/) | Component React |
| [src/lib/](src/lib/) | Gọi API Django, i18n, kiểu dữ liệu sinh từ OpenAPI |
| [src/messages/](src/messages/) | Chữ cố định trên giao diện theo ngôn ngữ |
| [public/](public/) | Logo, favicon, ảnh tĩnh |
