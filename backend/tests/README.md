# tests — test xuyên app

Test của từng app nằm trong `apps/<app>/tests/`. Thư mục này chỉ dành cho thứ test riêng lẻ không chạm tới được (quy ước từ template Go):

- Contract: giới hạn kích thước file, honeypot, rate limit, Turnstile (giống `test_contract.py` của template Python).
- End-to-end các luồng: Publish → revalidate, Form → DB → email, dịch máy.
- Migrate từ database trống chạy được.

Chạy bằng pytest-django; CI chạy kèm Postgres 16 thật.
