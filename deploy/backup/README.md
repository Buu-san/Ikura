# deploy/backup

Script cron: `pg_dump` hằng ngày lúc 2h, nén, giữ 7 bản trên `/srv/ikura/backups`, đẩy lên kho ngoài VPS (giữ 7 ngày · 4 tuần · 6 tháng). Mỗi quý thử khôi phục một lần.
