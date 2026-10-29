# ui.unlumen.com — Unlumen UI

Envanter 2 · 2026-10-29 · sınıf: **belirsiz (doğrulanamadı)** · TSV: yalnız başlık, 0 satır

## Durum: ERİŞİLEMEDİ — ağ politikası

Bu oturumun çıkış proxy'si `ui.unlumen.com` için `CONNECT` tünelini **403** ile reddediyor (`r/registry.json`, `registry.json`, `llms.txt` denendi). `r.jina.ai` da kapalı. CAPTCHA/bot koruması değil; ortamın ağ izin listesi → **K değil**, "erişilemedi".

- Ham LICENSE/Terms metni **okunamadı** → sınıf verilmedi.
- Depo adı tahminleri (`unlumen/unlumen-ui`, `unlumen/ui`, `unlumen-ui/unlumen-ui`) anonim klonda reddedildi (yok ya da özel); gerçek depo adı bu oturumda kanıtlanamadı.
- İkincil ipucu (kanıt değil): kardeş depo `educlopez/smoothui` içindeki `COMPONENT_BACKLOG.md` (2026-08-10) unlumen'den "55" bileşen analiz ettiğini yazıyor ve şu adları anıyor: dock, tilt-card, gooey-filter, hover-expand, cursor-image-trail, hover-image-list, file-tree, aurora-curtain, pixel-flow-field, gravity-stars, floating/expandable/gooey navbar, morph-icon seti. Bu adlar lisans/kullanım hakkı hakkında bir şey söylemez ve TSV'ye alınmadı.

## Yeniden denemek için

Ortam ağ ayarlarında `ui.unlumen.com` izin listesine eklenirse registry indeksinden TSV üretilir, ham lisans metniyle sınıf belirlenir. Adımlar: https://code.claude.com/docs/en/cloud-environments#network-access
