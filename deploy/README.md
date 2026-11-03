# deploy — chạy trên VPS P.A (Cloud Server #2)

| File (sẽ tạo) | Nội dung |
|---|---|
| `compose.prod.yml` | Stack production: `migrate`, `django`, `worker`, `nextjs`, `postgres`, `caddy`, `backup`. **CI tự sửa tag image trong file này**, Portainer thấy git đổi thì deploy (GitOps) |
| `compose.staging.yml` | Stack staging (`staging.<tênmiền>.vn`), chỉ bật khi cần |
| `compose.infra.yml` | Portainer (+ Dozzle nếu dùng) — chạy riêng, không nằm trong stack ikura |
| `compose.dev.yml` | Postgres cho máy dev |
| `Caddyfile` | `/` → nextjs; `/api/*`, `/admin/*`, `/static/*`, `/_/*` → django |
| `backup/` | Script `pg_dump` hằng ngày, giữ 7 bản trên máy, đẩy bản chính ra kho ngoài VPS |
| `postgres/` | `postgresql.conf` cho máy 5 GB RAM (`shared_buffers=1GB`, `max_connections=50`) |

Quy tắc: Postgres **không** publish cổng ra ngoài; Portainer chỉ vào qua Cloudflare Access hoặc Tailscale; secret nằm trong env của Portainer, không nằm trong git.
