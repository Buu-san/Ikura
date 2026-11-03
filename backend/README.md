# backend — Django monolith → image `ikura-api`

Một project Django, một database, chia thành các app theo nghiệp vụ. Cùng một image chạy 3 vai trò, chỉ khác lệnh:

| Container | Lệnh |
|---|---|
| `migrate` | `python cli.py migrate` (chạy một lần trước khi app lên) |
| `django` | `python cli.py app` (Gunicorn) |
| `worker` | `python cli.py worker` (django-q2 `qcluster`) |

## File gốc sẽ có ở đây (khi bắt đầu code)

| File | Mượn từ | Nội dung |
|---|---|---|
| `pyproject.toml` + `uv.lock` | template Python | Quản lý package bằng **uv**, Python 3.12 |
| `cli.py` | template Python | `app` · `worker` · `migrate` · `initialize` |
| `manage.py` | Django | Lệnh Django chuẩn |
| `Dockerfile` | template Python | `python:3.12-slim-bookworm`, label `GIT_COMMIT`/`VERSION`, `HEALTHCHECK /_/liveness`, `ENTRYPOINT ["python","cli.py"]` |
| `Makefile` | template Python | `install` · `test` · `run` · `ci` · `docker-build` |
| `.env.sample` | cả hai template | Danh sách biến môi trường, **không chứa secret thật** |

Danh sách package và lý do chọn: [docs/ikura-codebase.md](../docs/ikura-codebase.md#5-backend).
