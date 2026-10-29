# blocks.so

Sınıf: **A** (MIT) · Repo: https://github.com/ephraimduncan/blocks

> **Doğrulama sınırı (önemli).** Bu oturumun ağ politikası `ui.shadcn.com`, `blocks.so`, `www.shadcnblocks.com`, `www.kibo-ui.com`, `reui.io`, `beste.dev`, `r.jina.ai`, `x.com` host'larına CONNECT'te 403 verdi (`curl` ve WebFetch: `getaddrinfo ENOTFOUND`). Yalnız `raw.githubusercontent.com`, npm ve `git clone` (anonim, GitHub) çalıştı. Bu yüzden **canlı `/r/*.json` isteği örneği yok**; "hesapsız erişim" kanıtı olarak repodaki önceden derlenmiş JSON dosyaları ya da kaynak koddaki route gösteriliyor. Sayılar ve lisans metinleri **depo dosyalarından** (aşağıda commit'li) ham okundu, site sayfalarından değil. Site sayfasındaki terimler ayrıca doğrulanmadı.

## (a) Sayılar
- Toplam TSV satırı: **81** (block 81)
- Lisans sınıfı dağılımı: A=81
- Kaynak: `ephraimduncan/blocks@3f759d5` (shallow klon, 2026-10-29)

`public/r/*.json` (81 öğe + `registry.json`) programatik okundu. Hepsi `registry:block`. Kategori kırılımı: stats 15, dialogs 12, login 9, onboarding 7, file-upload 6, sidebar 6, ai 5, form-layout 5, tables 5, command-menu 4, chat 3, grid-list 3, dashboard 1.
Önerilen group/shelf dağılımı (anahtar kelime kuralıyla otomatik, **öneri**; el ile gözden geçirilmedi): `app/dashboard` 16, `overlays/modal-drawer` 12, `app/auth` 9, `ai/chat` 8, `app/settings` 7, `inputs/upload-sign` 6, `navigation/navbar-sidebar` 6, `inputs/text-code` 5, `data/tables` 5, `navigation/command-search` 4, `layout/grids` 3

## (b) Lisans — **A**
Ham metin: https://raw.githubusercontent.com/ephraimduncan/blocks/main/LICENSE.md

> `MIT License` / `Copyright (c) 2025 Ephraim Duncan` / `...to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software`

Düz MIT. Yazar satırı her JSON'da: `ephraim duncan <https://ephraimduncan.com>`. Not: `ai-05` gibi bloklar deponun kendi `components/ai-elements/*` (conversation, message, prompt-input) dosyalarını import ediyor; bunların registry JSON'una dahil olup olmadığı ve kökeni/lisansı ayrıca kontrol edilmedi.

## (c) Bağımlılık profili
| profil | adet |
|---|---|
| yalnız react/css (+ikon/cva/cn) | 9 |
| motion/framer-motion | 2 |
| radix/base-ui/react-aria | 52 |
| ağır paket (recharts, tanstack, zod, rhf, cmdk, sonner, date-picker, vb.) | 18 |

Öncelik sırası: ağır > motion > primitive > düz (satır tek profile yazılır). Motion kullanan satır sayısı: **2**. Karmaşıklık: S=14, M=41, L=26 (S<80, M 80–250, L>250 satır; `shadcn:x` bağımlılıkları transitif olarak `radix-ui` vb. ile genişletildi).

En sık npm bağımlılıkları: `radix-ui` (69), `cmdk` (6), `recharts` (5), `@shadcn/react` (3), `date-fns` (2), `framer-motion` (2), `ai` (1), `react-day-picker` (1), `react-dropzone` (1), `sonner` (1).

İkon: `lucide-react` 36, `@tabler/icons-react` 22 blok (Mozaik tarafında hangisi isteniyorsa dönüştürme gerekir). Motion yalnız `framer-motion` ile 2 blok.

## (d) Nasıl alınır
- Registry: `https://blocks.so/r/{name}.json` (README: `"@blocks-so": "https://blocks.so/r/{name}.json"`, `npx shadcn@latest add https://blocks.so/r/login-01.json`).
- Repo yolu: `content/components/<kategori>/<ad>.tsx`.
- Hesapsız erişim kanıtı (repo içi, derlenmiş): `public/r/login-01.json` mevcut, başlığı `{"$schema":".../registry-item.json","name":"login-01","type":"registry:block","title":"Login with Email and Google","description":"A login with email and google block.","author":"ephraim duncan <https://ephraimduncan.com>","registryDependencies":[...`. README ve `registry-setup.tsx` hiçbir anahtar/giriş gerektirmeyen düz URL gösteriyor. Canlı istek yapılamadı.

## (e) Mozaik çakışması
Mozaik'te aynı adlı öğe (ad eşleşmesi, `registry/*/*/*/meta.json` + `blocks/**/meta.json` = 274 ad): satır bazında **12** kesin eşleşme, **0** yakın ad (`~`, önek eşleşmesi). Çakışan Mozaik adları: `file-upload`, `sidebar`.
**Okuma notu:** `pattern`/`example`/`block` satırlarında eşleşme, o satırın ait olduğu *bileşen/kategori* adıdır (ör. `c-alert-3` → Mozaik `alert`); birebir kopya değil, 'bu kategoride Mozaik'te zaten bir ana bileşen var' demektir. Satır bazındaki karşılık TSV son sütunundadır. Mozaik varyantları (`variants.ts`) adlandırılmış prop setleridir; ayrı ad olarak karşılaştırılmadı.

## En büyük engel
Küçük kaynak (81) ve çoğu `file-upload-*`/`sidebar-*` gibi Mozaik'te zaten ana bileşeni olan alanlarda. Lisans temiz; engel pratikte yok. Canlı JSON doğrulanamadı.
