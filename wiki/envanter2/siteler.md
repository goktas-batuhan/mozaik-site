# 10 site sınıflaması (2026-10-29)

| site | ne | component kaynağı mı | sınıf | kanıt / engel |
|---|---|---|---|---|
| styles.refero.design | 2.000+ üçüncü taraf sitenin DESIGN.md stil dosyası (renk/tipografi/boşluk) | Hayır — tasarım içeriği | B (içerik; kullanım koşulu doğrulanamadı, `/terms` 404) | Üçüncü taraf marka stillerinin türevi; yeniden dağıtım izni yok → private/ilham, public'e girmez |
| ui-skills.com | Ajan "skills" kataloğu (CLI/MCP), yazar ibelick | Hayır — skills/içerik | A (içerik) | `ibelick/ui-skills` LICENSE: MIT (raw'dan okundu). Component değil, "içerik toplama" notu. `www.ui-skills.com` doğrudan 403 (proxy) |
| desengs.com | Tasarım mühendisi kaynak listesi | Hayır — dizin | — | Bkz. yeni-kaynaklar.md; link verilen MIT repolar: benjitaylor/liveline, emilkowalski/skills, jakubkrehel/skills |
| bencho.dev | 44 blok + 24 ses, React | **Evet** | A | MIT LICENSE; [bencho.md](bencho.md). Pro katmanı alınmaz |
| wellmade.fyi | Yaratıcı iş galerisi (tweet/video) | Hayır | C/K değil — kapsam dışı | Telifli üçüncü taraf medya; component yok |
| designmd.supply | DESIGN.md dizini (tahmin) | Doğrulanamadı | **K** | Vercel Security Checkpoint, HTTP 429 (`x-vercel-mitigated: challenge`). Aşılmadı. URL: https://designmd.supply |
| getlayers.ai | Yapay zekâ site üretimi, prompt kütüphanesi, fiyatlandırma, giriş | Hayır — prompt kütüphanesi | C (ücretli/oturum) → "içerik toplama" | Pricing + sign-in var; indirme/hesap yok. `www.getlayers.ai` doğrudan 403 |
| sceneai.art | "UI Prompt Library": hero/landing/gradient prompt'ları | Hayır — prompt kütüphanesi | C (All Access ücretli, "Get All Access") → "içerik toplama" | Ana sayfa okundu; prompt'lar ücretli erişim arkasında |
| aside.com | AI tarayıcı ürünü (YC) | Hayır — alakasız | — | Component kaynağı değil |
| isreadyforlaunch.com | SEO/launch denetim aracı | Hayır — alakasız | — | Component kaynağı değil |

Not: getlayers/sceneai bileşen değil; prompt/içerik toplama notu olarak kaldı (kural: ücretli içerik alınmaz).
