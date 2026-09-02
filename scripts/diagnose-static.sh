#!/bin/bash
# Diagnosa static file 400 errors
# Jalankan di server: bash scripts/diagnose-static.sh

echo "=== 1. Test Next.js container langsung ==="
echo "(bypass proxy, test port 3000 langsung dari host)"
echo ""
echo "curl -I http://127.0.0.1:3000/_next/static/css/1a3d6d86449d2181.css"
curl -sI http://127.0.0.1:3000/_next/static/css/1a3d6d86449d2181.css 2>&1 | head -5
echo ""
echo "curl -I http://127.0.0.1:3000/ (health + profile image header)"
curl -sI http://127.0.0.1:3000/ 2>&1 | head -5
echo ""

echo "=== 2. Test lewat proxy (port 80) ==="
echo "curl -I http://127.0.0.1:80/_next/static/css/1a3d6d86449d2181.css"
curl -sI http://127.0.0.1:80/_next/static/css/1a3d6d86449d2181.css 2>&1 | head -5
echo ""

echo "=== 3. Cek Nginx config aktif ==="
echo "nginx -T 2>/dev/null | grep -A 20 'portofolio' || cat /etc/nginx/sites-enabled/*"
nginx -T 2>/dev/null | grep -A 20 'portofolio' 2>&1 || echo "Nginx not found, checking Caddy..."
echo ""

echo "=== 4. Cek Caddy config ==="
cat /etc/caddy/Caddyfile 2>/dev/null || echo "Caddy config not found"
echo ""

echo "=== 5. Cek error log Nginx (terakhir 10 baris) ==="
tail -10 /var/log/nginx/error.log 2>/dev/null || echo "Nginx error log not found"
echo ""

echo "=== 6. Cek apakah ada di belakang Cloudflare ==="
echo "curl -I https://portofolio.axentraproject.site/_next/static/css/1a3d6d86449d2181.css | grep -i cf-"
curl -sI https://portofolio.axentraproject.site/_next/static/css/1a3d6d86449d2181.css 2>&1 | grep -i -E 'cf-ray|cf-cache|server' | head -5
echo ""

echo "=== 7. Cek isi container ==="
echo "docker exec yahya-portfolio-web ls /app/.next/static/css/"
docker exec yahya-portfolio-web ls /app/.next/static/css/ 2>&1
echo ""
echo "docker exec yahya-portfolio-web ls /app/public/profile/"
docker exec yahya-portfolio-web ls /app/public/profile/ 2>&1
