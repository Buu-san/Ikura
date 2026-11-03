# Ikura

Website công ty bếp ga / ga / thiết bị ga — vi / en / km.

> Repo đang ở giai đoạn **khung thư mục**: chưa có code. Mỗi thư mục có README ghi nó sẽ chứa gì.

| Thư mục | Nội dung |
|---|---|
| [backend/](backend/) | Django monolith (REST API + Django Admin + worker django-q2) → image `ikura-api` |
| [frontend/](frontend/) | Next.js (React) cho khách truy cập → image `ikura-web` |
| [deploy/](deploy/) | Docker Compose cho VPS (Portainer đọc theo kiểu GitOps), Caddy, backup |
| [.github/workflows/](.github/workflows/) | CI: test → build → push GHCR → cập nhật tag image |
| [docs/](docs/) | Plan, nội dung diagram, cấu trúc codebase, checklist |

Đọc trước: [docs/ikura-codebase.md](docs/ikura-codebase.md) · [docs/ikura-plan.md](docs/ikura-plan.md) · [docs/ikura-diagrams.md](docs/ikura-diagrams.md)
