# reui.io (ReUI)

Sınıf: **A** (MIT, ücretsiz kısım) · **C** (ReUI Pro blokları ve Pro ikonlar; repoda yok, alınmadı) · Repo: https://github.com/keenthemes/reui

> **Doğrulama sınırı (önemli).** Bu oturumun ağ politikası `ui.shadcn.com`, `blocks.so`, `www.shadcnblocks.com`, `www.kibo-ui.com`, `reui.io`, `beste.dev`, `r.jina.ai`, `x.com` host'larına CONNECT'te 403 verdi (`curl` ve WebFetch: `getaddrinfo ENOTFOUND`). Yalnız `raw.githubusercontent.com`, npm ve `git clone` (anonim, GitHub) çalıştı. Bu yüzden **canlı `/r/*.json` isteği örneği yok**; "hesapsız erişim" kanıtı olarak repodaki önceden derlenmiş JSON dosyaları ya da kaynak koddaki route gösteriliyor. Sayılar ve lisans metinleri **depo dosyalarından** (aşağıda commit'li) ham okundu, site sayfalarından değil. Site sayfasındaki terimler ayrıca doğrulanmadı.
`x.com/reui_io` duyuruları da erişilemedi; ücretsiz kapsam yalnız README ve `public/llms.txt`'ten alındı.

## (a) Sayılar
- Toplam TSV satırı: **1346** (pattern 1264, component 82)
- Lisans sınıfı dağılımı: A=1346
- Kaynak: `keenthemes/reui@067aa0d` (shallow klon, 2026-10-29)

- **1264 `c-*` örnek** (`registry-reui/bases/radix/components/<kategori>/c-<kategori>-<n>.tsx`; Base UI ağacında da 1264; 87 kategori). README: "1,264 free components and composed examples" — dosya sayımı **1264** ile eşleşti. Bunlar `pattern` olarak yazıldı.
- **82 satır `component`**: `registry-reui/bases/radix/reui/_registry.ts` içindeki tüm öğeler. README'ye göre bunların **27'si** bağımsız "in-house" bileşen (Alert, Autocomplete, Badge, Cascader, Code Block, Color Picker, Data Grid, Date Selector, Emoji Picker, Event Calendar, File Type, Filters, Frame, Gantt, Icon Stack, Icon Tile, Kanban, Number Field, Phone Input, Rating, Scrollspy, Signature Pad, Sortable, Stepper, Time Picker, Timeline, Tree); kalan 55 satır bunların alt parçaları (`data-grid-*`, `filters-*`, `gantt-*`, `event-calendar-*`, `cascader-*`) ve yardımcılar.
- Stil sayısı: 8 tema × 2 taban (`radix-*`, `base-*`) = 16 derlenmiş ağaç (`public/r/styles/*`); yalnız `radix-nova` sayıldı, diğerleri aynı öğelerin tema varyantı.
- Pro: README "44 Pro blocks" (yalnız data-grid için) gibi sayılar veriyor, toplam Pro sayısı bilinmiyor; kaynak kodu repoda **yok** → **C**.
Önerilen group/shelf dağılımı (anahtar kelime kuralıyla otomatik, **öneri**; el ile gözden geçirilmedi): `inputs/pickers` 222, `inputs/text-code` 159, `layout/lists` 115, `navigation/dock-menus` 112, `buttons/toggle-switch` 101, `feedback/status` 61, `buttons/animated` 61, `layout/grids` 60, `ai/chat` 54, `inputs/choice` 46, `feedback/notifications` 42, `overlays/popover-tooltip` 35 …

## (b) Lisans — **A** (ücretsiz kısım)
Ham metin: https://raw.githubusercontent.com/keenthemes/reui/main/LICENSE.md

> `MIT License` / `Copyright (c) 2025 Keenthemes Inc` / `...to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software`

README rozeti ve "MIT License - Free and open-source forever" satırı da aynı. İpucu ("ücretsiz kısım MIT, Pro ücretli") **doğrulandı**: repo yalnız ücretsiz kısmı içeriyor, `reui.io/pricing` Pro'yu gösteriyor. Not: `public/llms.txt` MCP için "Sign in with ReUI (free account, OAuth)" diyor — bu **MCP** yolu için; shadcn registry JSON'u için hesap gerektiği görülmedi ama canlı doğrulanamadı. Pro bloklar için hiçbir şey indirilmedi.

## (c) Bağımlılık profili
| profil | adet |
|---|---|
| yalnız react/css (+ikon/cva/cn) | 222 |
| motion/framer-motion | 0 |
| radix/base-ui/react-aria | 883 |
| ağır paket (recharts, tanstack, zod, rhf, cmdk, sonner, date-picker, vb.) | 241 |

Öncelik sırası: ağır > motion > primitive > düz (satır tek profile yazılır). Motion kullanan satır sayısı: **1**. Karmaşıklık: S=809, M=349, L=188 (S<80, M 80–250, L>250 satır; `shadcn:x` bağımlılıkları transitif olarak `radix-ui` vb. ile genişletildi).

En sık npm bağımlılıkları: `radix-ui` (1058), `date-fns` (70), `@tanstack/react-table` (46), `@base-ui/react` (41), `react-day-picker` (39), `sonner` (39), `recharts` (25), `embla-carousel-react` (12), `@headless-tree/core` (10), `react-resizable-panels` (10).

Çoğu `radix-ui` + shadcn bileşeni; `@tanstack/react-table`, `@dnd-kit`, `react-day-picker`, `date-fns`, `@headless-tree`, `react-resizable-panels`, `recharts`, `shiki`, `@base-ui/react` ağır bileşenlerde. Motion neredeyse yok.

## (d) Nasıl alınır
- Registry: `https://reui.io/r/{style}/{name}.json` (`components.json` içindeki `"@reui": "https://reui.io/r/{style}/{name}.json"`), CLI: `npx shadcn@latest add @reui/c-button-10`. Repodaki derlenmiş yol `public/r/styles/radix-nova/<ad>.json`, bu yüzden canlı kalıp büyük olasılıkla `https://reui.io/r/styles/radix-nova/<ad>.json` (**çıkarım**, doğrulanmadı).
- Hesapsız erişim kanıtı (repo içi, derlenmiş): `public/r/styles/radix-nova/c-button-10.json` mevcut: `{"$schema":"https://ui.shadcn.com/schema/registry-item.json","name":"c-button-10","type":"registry:block","title":"Disabled button","registryDependencies":["button"],"files":[{"path":"c-button-10.tsx",...,"content":"import { Butto…`. Toplam 3865 derlenmiş dosya var. Canlı istek yapılamadı.
- Repo yolu: `registry-reui/bases/radix/components/<kategori>/c-*.tsx`, bileşenler `registry-reui/bases/radix/reui/*`.

## (e) Mozaik çakışması
Mozaik'te aynı adlı öğe (ad eşleşmesi, `registry/*/*/*/meta.json` + `blocks/**/meta.json` = 274 ad): satır bazında **95** kesin eşleşme, **40** yakın ad (`~`, önek eşleşmesi). Çakışan Mozaik adları: `alert`, `breadcrumb`, `file-upload`, `pagination`, `sidebar`, `signature-pad`, `tooltip`.
**Okuma notu:** `pattern`/`example`/`block` satırlarında eşleşme, o satırın ait olduğu *bileşen/kategori* adıdır (ör. `c-alert-3` → Mozaik `alert`); birebir kopya değil, 'bu kategoride Mozaik'te zaten bir ana bileşen var' demektir. Satır bazındaki karşılık TSV son sütunundadır. Mozaik varyantları (`variants.ts`) adlandırılmış prop setleridir; ayrı ad olarak karşılaştırılmadı.

## En büyük engel
Lisans temiz; asıl engel **çakışan/düşük bağımsız değer**: 1264 örneğin büyük kısmı shadcn primitiflerinin tekrar kompozisyonu (alert/avatar/button/… 40 üzeri kategori), ayrıca 241 satır ağır bağımlılıklı (data-grid, kanban, gantt …). Değerli kısım 27 bağımsız bileşen (özellikle data-grid, filters, event-calendar, gantt, kanban, stepper, tree) — bunlar da büyük (L) ve tanstack/dnd-kit'e bağlı. Pro blokları C.
