# ui.shadcn.com (shadcn/ui)

Sınıf: **A** (MIT) · Repo: https://github.com/shadcn-ui/ui

> **Doğrulama sınırı (önemli).** Bu oturumun ağ politikası `ui.shadcn.com`, `blocks.so`, `www.shadcnblocks.com`, `www.kibo-ui.com`, `reui.io`, `beste.dev`, `r.jina.ai`, `x.com` host'larına CONNECT'te 403 verdi (`curl` ve WebFetch: `getaddrinfo ENOTFOUND`). Yalnız `raw.githubusercontent.com`, npm ve `git clone` (anonim, GitHub) çalıştı. Bu yüzden **canlı `/r/*.json` isteği örneği yok**; "hesapsız erişim" kanıtı olarak repodaki önceden derlenmiş JSON dosyaları ya da kaynak koddaki route gösteriliyor. Sayılar ve lisans metinleri **depo dosyalarından** (aşağıda commit'li) ham okundu, site sayfalarından değil. Site sayfasındaki terimler ayrıca doğrulanmadı.

## (a) Sayılar
- Toplam TSV satırı: **409** (example 244, pattern 70, component 65, block 30)
- Lisans sınıfı dağılımı: A=409
- Kaynak: `shadcn-ui/ui@96da9cc` (shallow klon, 2026-10-29)

`apps/v4/registry/new-york-v4/*/_registry.ts` dosyalarından programatik çıkarıldı (kendi ayrıştırıcımla, kod çalıştırılmadı):

| bölüm | adet | tür |
|---|---|---|
| `ui/` | 62 | component |
| `blocks/` | 27 | block (dashboard-01, login-01..05, sidebar-01..16, signup-01..05) |
| `charts/` | 70 | pattern (chart-area/bar/line/pie/radar/radial/tooltip varyantları) |
| `examples/` | 244 | example (bileşen demoları; yeni bileşen değil) |
| `bases/radix` farkı | +3 component (`code-block`, `questionnaire`, `trace`), +3 block (`preview`, `preview-02`, `preview-03`) | v4'te olmayan, yeni "bases" ağacındaki öğeler |

Atlananlar: `hooks` (1), `lib` (1), `internal` (13 sidebar parçası), `bases/*/examples` (66–69 adet `*-example.tsx`, v4 demolarının tekrarı), `bases/base` ve `bases/aria` (aynı bileşenlerin Base UI / React Aria sürümleri: ui 65 / 62, bloklar 30'ar). Eski v3 `public/r/styles/{new-york,default}` ağacı (845 dosya, PNG dahil) tekrar sayılmadı.
Önerilen group/shelf dağılımı (anahtar kelime kuralıyla otomatik, **öneri**; el ile gözden geçirilmedi): `inputs/text-code` 89, `data/charts` 59, `buttons/toggle-switch` 35, `buttons/animated` 20, `navigation/navbar-sidebar` 19, `navigation/dock-menus` 17, `layout/lists` 16, `inputs/pickers` 15, `overlays/popover-tooltip` 13, `layout/grids` 13, `feedback/notifications` 12, `app/auth` 11 …

## (b) Lisans — **A**
Ham metin: https://raw.githubusercontent.com/shadcn-ui/ui/main/LICENSE.md

> `MIT License` / `Copyright (c) 2023 shadcn` / `Permission is hereby granted, free of charge, to any person obtaining a copy of this software ... to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software`

Düz MIT; public repoda yayınlanabilir (telif/lisans notu korunarak). Sidebar blok varyantlarında yazar satırı `shadcn (https://ui.shadcn.com)`.

## (c) Bağımlılık profili
| profil | adet |
|---|---|
| yalnız react/css (+ikon/cva/cn) | 52 |
| motion/framer-motion | 0 |
| radix/base-ui/react-aria | 207 |
| ağır paket (recharts, tanstack, zod, rhf, cmdk, sonner, date-picker, vb.) | 150 |

Öncelik sırası: ağır > motion > primitive > düz (satır tek profile yazılır). Motion kullanan satır sayısı: **0**. Karmaşıklık: S=228, M=154, L=27 (S<80, M 80–250, L>250 satır; `shadcn:x` bağımlılıkları transitif olarak `radix-ui` vb. ile genişletildi).

En sık npm bağımlılıkları: `radix-ui` (266), `recharts` (79), `sonner` (34), `zod` (21), `@hookform/resolvers` (11), `react-hook-form` (11), `date-fns` (9), `react-day-picker` (9), `@tanstack/react-form` (9), `@formisch/react` (9).

Motion kullanan öğe yok: shadcn animasyonu `tw-animate-css` ile yapıyor. `radix-ui` tek paket olarak (`import { X } from "radix-ui"`) kullanılıyor; `bases/base` sürümü `@base-ui/react`.

## (d) Nasıl alınır
- Repo yolu: `apps/v4/registry/new-york-v4/<bölüm>/<ad>.tsx` (TSV 6. sütun).
- Registry kalıbı: `https://ui.shadcn.com/r/styles/new-york-v4/<ad>.json` (`apps/v4/content` ve `README`'de `https://ui.shadcn.com/r/{name}.json` ve `.../r/styles/new-york/login-01.json` biçimleri geçiyor). Güncel stil adı ve canlı yanıt **bu oturumdan doğrulanamadı**.
- Hesapsız erişim kanıtı (repo içi, derlenmiş): `apps/v4/public/r/styles/new-york/login-01.json` mevcut, başlığı: `{"$schema":"https://ui.shadcn.com/schema/registry-item.json","name":"login-01","type":"registry:block","author":"shadcn (https://ui.shadcn.com)",...,"registryDependencies":["button","card","input","label"]`. `public/r/index.json` 65 `registry:ui` öğesi listeler.

## (e) Mozaik çakışması
Mozaik'te aynı adlı öğe (ad eşleşmesi, `registry/*/*/*/meta.json` + `blocks/**/meta.json` = 274 ad): satır bazında **26** kesin eşleşme, **15** yakın ad (`~`, önek eşleşmesi). Çakışan Mozaik adları: `alert`, `breadcrumb`, `data-table`, `pagination`, `sidebar`, `tooltip`.
**Okuma notu:** `pattern`/`example`/`block` satırlarında eşleşme, o satırın ait olduğu *bileşen/kategori* adıdır (ör. `c-alert-3` → Mozaik `alert`); birebir kopya değil, 'bu kategoride Mozaik'te zaten bir ana bileşen var' demektir. Satır bazındaki karşılık TSV son sütunundadır. Mozaik varyantları (`variants.ts`) adlandırılmış prop setleridir; ayrı ad olarak karşılaştırılmadı.

## En büyük engel
Lisans engeli yok. Asıl sorun **değer yoğunluğu**: 409 satırın 244'ü bileşen demosu, 70'i grafik örneği; gerçekten yeni bağımsız component yalnız ~65 (hepsi birincil shadcn primitifleri, Mozaik'te zaten benzerleri var: alert, breadcrumb, pagination, sidebar, tooltip). Bunlar da radix/recharts bağımlı. Canlı registry JSON'u doğrulanamadı.
