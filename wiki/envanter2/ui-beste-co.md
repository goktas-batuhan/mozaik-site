# ui.beste.co / beste.dev (Beste UI)

Sınıf: **B** (lisans çelişkisi nedeniyle; ücretsiz kısım) · **C** (Pro katalog) · Repo: https://github.com/beste-co/beste-ui

> **Doğrulama sınırı (önemli).** Bu oturumun ağ politikası `ui.shadcn.com`, `blocks.so`, `www.shadcnblocks.com`, `www.kibo-ui.com`, `reui.io`, `beste.dev`, `r.jina.ai`, `x.com` host'larına CONNECT'te 403 verdi (`curl` ve WebFetch: `getaddrinfo ENOTFOUND`). Yalnız `raw.githubusercontent.com`, npm ve `git clone` (anonim, GitHub) çalıştı. Bu yüzden **canlı `/r/*.json` isteği örneği yok**; "hesapsız erişim" kanıtı olarak repodaki önceden derlenmiş JSON dosyaları ya da kaynak koddaki route gösteriliyor. Sayılar ve lisans metinleri **depo dosyalarından** (aşağıda commit'li) ham okundu, site sayfalarından değil. Site sayfasındaki terimler ayrıca doğrulanmadı.

**Alan adı notu:** Görevde `ui.beste.co` yazıyor; repo README'si ve registry kalıpları `beste.dev`'i gösteriyor (`beste.co` ise aynı yapıtaşlarıyla çalışan ayrı bir "website builder" ürünü). Depoyu `beste-co/beste-ui` adıyla buldum; adı ben tahmin ettim ve README'sinde `beste.dev` ile eşleştiği için doğruladım.

## (a) Sayılar
- Toplam TSV satırı: **1789** (pattern 1326, component 295, block 168)
- Lisans sınıfı dağılımı: B=1789
- Kaynak: `beste-co/beste-ui@e536808` (shallow klon, 2026-10-29)

Dizin sayımı (programatik): `registry/` **168 blok**, `registry-pieces/` **1326 piece** (dizinde 1327 girdi var; fazlalık `component-rules.md` dosyası, TSV 1326 satır), `registry-components/` **295 component**. README rozetleri de 168 / 1326 / 295. Blok kategorileri (README): Feature 31, Hero 11, Auth 10, Use case 8, Health 7, Ecommerce 7, Error 6, Footer 5, Onboarding 4, Coming soon 4 … Piece kategorileri en büyük: Isometric 250, Shapes 80, Editor 56, AI 52, Form 40, Chat 39, Browser 38, Card 37, Dashboard 35.
README: "This repository holds every **free** item in the catalog"; Pro katalog (1000+ bölüm) repoda yok → **C**, hiç alınmadı.
Önerilen group/shelf dağılımı (anahtar kelime kuralıyla otomatik, **öneri**; el ile gözden geçirilmedi): `media/mockups` 288, `cards/surface` 273, `inputs/text-code` 172, `backgrounds/pattern` 126, `layout/lists` 117, `ai/chat` 92, `data/stats-kpis` 70, `marketing/features` 62, `media/video-audio` 55, `inputs/pickers` 51, `inputs/sliders-dials` 46, `inputs/upload-sign` 36 …

## (b) Lisans — **B** (çelişki)
1) Depo `LICENSE` dosyası: https://raw.githubusercontent.com/beste-co/beste-ui/main/LICENSE
> `MIT License` / `Copyright (c) 2026 Beste` / `...to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software`

README de "MIT. Use them at work, in client projects, in things you sell." diyor.

2) Sitenin lisans sayfasının kaynağı (aynı depoda): `app/(main)/license/license-content.tsx` — https://raw.githubusercontent.com/beste-co/beste-ui/main/app/(main)/license/license-content.tsx
> `Beste UI License` / `Copyright (c) 2026 Beste UI` / `...to use, copy, modify, and merge the Software in personal and commercial projects, subject to the following restrictions:`
> `1. NO RESALE` — `You may not sell the components, templates, or any derivative works as a standalone product or as part of a UI kit, template library, or similar offering.`
> `2. NO REDISTRIBUTION` — `You may not redistribute the source code on other marketplaces, UI libraries, component stores, or any platform that distributes code to third parties.`
> `3. NO REBRANDING` — `...Attribution to Beste UI must be maintained.`

İki metin birbirini dışlıyor ("sublicense/distribute" var/yok). Hangisinin bağlayıcı olduğu bilinmediği için **kısıtlayıcı olan geçerli sayıldı → B**: Mozaik herkese açık bir component kütüphanesi/registry olduğundan 2. madde ("UI libraries, component stores") doğrudan kapsıyor. Çelişki **doğrulandı** (ipucu doğru). Çözüm yolu: yazara (X: `@withbeste`) sormak; yazılı MIT teyidi gelirse A'ya yükselir. Bu sınıflama için canlı `beste.dev/license` sayfası açılamadı; metin depodaki sayfa kaynağından alındı.

## (c) Bağımlılık profili
| profil | adet |
|---|---|
| yalnız react/css (+ikon/cva/cn) | 1561 |
| motion/framer-motion | 26 |
| radix/base-ui/react-aria | 189 |
| ağır paket (recharts, tanstack, zod, rhf, cmdk, sonner, date-picker, vb.) | 13 |

Öncelik sırası: ağır > motion > primitive > düz (satır tek profile yazılır). Motion kullanan satır sayısı: **26**. Karmaşıklık: S=493, M=937, L=359 (S<80, M 80–250, L>250 satır; `shadcn:x` bağımlılıkları transitif olarak `radix-ui` vb. ile genişletildi).

En sık npm bağımlılıkları: `radix-ui` (184), `framer-motion` (26), `@radix-ui/react-slot` (15), `recharts` (6), `embla-carousel-react` (2), `input-otp` (1), `@acme/sdk` (1), `fmt` (1), `shiki` (1), `embla-carousel-autoplay` (1).

Piece'lerin çoğu salt React+Tailwind+shadcn primitifleri; `framer-motion` kullanan 26 öğe var. Not: `@acme/sdk`, `fmt` gibi adlar kod-örneği dizelerinden gelen **yanlış pozitif** (gerçek bağımlılık değil); import taraması dize içi örnek kodu da yakalayabilir.

## (d) Nasıl alınır
- Registry: `https://beste.dev/r/<ad>` (blok), `https://beste.dev/piece/r/<ad>`, `https://beste.dev/component/r/<ad>` (README'de `npx shadcn@latest add https://beste.dev/r/hero7`). Kaynakta `app/r/[name]/route.ts` yalnız `serveBlockJson(request, name, "radix")` çağırıyor; hesap/anahtar kontrolü bu route'ta yok, README "No environment variables, no database, no account system" diyor. Pro kaynak için MCP URL'sinde lisans anahtarı gerekiyor (README).
- Repo yolu: `registry/<ad>/<ad>.tsx`, `registry-pieces/...`, `registry-components/...`. Repo "generated" (özel kaynaktan otomatik senkron).
- Canlı istek örneği bu oturumdan **yapılamadı** (host engelli).

## (e) Mozaik çakışması
Mozaik'te aynı adlı öğe (ad eşleşmesi, `registry/*/*/*/meta.json` + `blocks/**/meta.json` = 274 ad): satır bazında **32** kesin eşleşme, **85** yakın ad (`~`, önek eşleşmesi). Çakışan Mozaik adları: `bar-chart`, `data-table`, `heatmap-calendar`, `marquee`, `signature-pad`, `terminal`, `tooltip`.
**Okuma notu:** `pattern`/`example`/`block` satırlarında eşleşme, o satırın ait olduğu *bileşen/kategori* adıdır (ör. `c-alert-3` → Mozaik `alert`); birebir kopya değil, 'bu kategoride Mozaik'te zaten bir ana bileşen var' demektir. Satır bazındaki karşılık TSV son sütunundadır. Mozaik varyantları (`variants.ts`) adlandırılmış prop setleridir; ayrı ad olarak karşılaştırılmadı.

## En büyük engel
**Lisans çelişkisi** (MIT dosyası ↔ site lisansı "no redistribution on UI libraries"): public Mozaik'e alınamaz, private depoya uygun. 1789 öğe ile hacim en büyük kaynaklardan; en çok değer 295 component + 1326 piece (çoğu düz React/Tailwind).
