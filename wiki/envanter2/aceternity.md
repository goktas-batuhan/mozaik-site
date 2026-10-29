# ui.aceternity.com — Aceternity UI

Envanter 2 · 2026-10-29 · sınıf: **belirsiz (doğrulanamadı)** · TSV: yalnız başlık, 0 satır

## Durum: ERİŞİLEMEDİ — ağ politikası

Bu oturumun çıkış proxy'si `ui.aceternity.com` için `CONNECT` tünelini **403** ile reddediyor (`curl: (56) CONNECT tunnel failed, response 403`; `registry.json`, `registry/index.json`, `llms.txt` denendi). `r.jina.ai` aracı da aynı şekilde kapalı (bağlantı kurulamadı). Bu bir CAPTCHA/bot koruması değil, ortamın ağ izin listesi; bu yüzden **K sınıfı değil**, "erişilemedi".

- Ham LICENSE/Terms metni **okunamadı** → lisans sınıfı verilmedi. Hiçbir şey bellekten/tahminle yazılmadı.
- Aceternity'nin açık bir GitHub deposu bu oturumda bulunamadı: `aceternity/aceternity-ui`, `aceternity/ui`, `manuarora700/aceternity-ui` anonim klonda reddedildi ("could not read Username" = yok ya da özel). Başka depo adı denenmedi (GitHub arama aracı, oturum kapsamı dışına çıkmamak için kullanılmadı).
- Ücretli (Pro) içerik varsa C; hiçbir sayfaya girilmedi, hesap/ödeme akışına dokunulmadı.

## Yeniden denemek için

Ortam ayarlarında (bulut ortam menüsü → Edit → Network access) `ui.aceternity.com` (ve istenirse `r.jina.ai`) izin verilen alan adlarına eklenirse: `registry.json` indeksinden TSV programatik üretilir, `/terms` veya LICENSE ham metniyle sınıf belirlenir. Adımlar: https://code.claude.com/docs/en/cloud-environments#network-access
