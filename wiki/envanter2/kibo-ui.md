# kibo-ui.com (Kibo UI)

Sınıf: **A** (MIT metni) — bkz. blok notu · Repo: https://github.com/haydenbleasel/kibo (aynı commit'te `shadcnblocks/kibo` yansıması)

> **Doğrulama sınırı (önemli).** Bu oturumun ağ politikası `ui.shadcn.com`, `blocks.so`, `www.shadcnblocks.com`, `www.kibo-ui.com`, `reui.io`, `beste.dev`, `r.jina.ai`, `x.com` host'larına CONNECT'te 403 verdi (`curl` ve WebFetch: `getaddrinfo ENOTFOUND`). Yalnız `raw.githubusercontent.com`, npm ve `git clone` (anonim, GitHub) çalıştı. Bu yüzden **canlı `/r/*.json` isteği örneği yok**; "hesapsız erişim" kanıtı olarak repodaki önceden derlenmiş JSON dosyaları ya da kaynak koddaki route gösteriliyor. Sayılar ve lisans metinleri **depo dosyalarından** (aşağıda commit'li) ham okundu, site sayfalarından değil. Site sayfasındaki terimler ayrıca doğrulanmadı.

## (a) Sayılar
- Toplam TSV satırı: **1170** (pattern 1101, component 41, block 28)
- Lisans sınıfı dağılımı: A=1170
- Kaynak: `haydenbleasel/kibo = shadcnblocks/kibo @3d63cdb` (shallow klon, 2026-10-29)

- `packages/*` (shadcn-ui, typescript-config, patterns hariç): **41 component** (ör. announcement, avatar-stack, banner, calendar, choicebox, code-block, color-picker, combobox, contribution-graph, credit-card, dropzone, editor, gantt, kanban, marquee, qr-code, table, tree, video-player …). Tam liste TSV'de.
- `apps/docs/content/blocks/*.mdx` ile eşleşen `apps/docs/examples/<blok>.tsx`: **28 blok** (about, awards, blog, careers, contact, cta, faq, feature, footer, hero, pricing, team …). Her dosya birden fazla varyant içerebilir; satır başına dosya sayıldı.
- `packages/patterns/<bileşen>/<varyant>/*.tsx`: **1101 pattern** (53 bileşen klasörü, 209 varyant klasörü; alert, breadcrumb, button, calendar, … ). Pattern'ler `/r/*.json` registry'sine **dahil değil** (`filteredPackages` listesinde `patterns` var); yalnız repo/`/patterns` sayfaları.
- Atlanan: `apps/docs/examples` içindeki bileşen demoları (168 dosya, 28'i blok).
Önerilen group/shelf dağılımı (anahtar kelime kuralıyla otomatik, **öneri**; el ile gözden geçirilmedi): `inputs/text-code` 188, `overlays/modal-drawer` 108, `navigation/dock-menus` 100, `buttons/toggle-switch` 73, `inputs/pickers` 72, `data/charts` 72, `navigation/command-search` 60, `layout/lists` 53, `feedback/notifications` 50, `overlays/popover-tooltip` 44, `layout/accordions` 44, `feedback/status` 37 …

## (b) Lisans — **A**
Ham metin: https://raw.githubusercontent.com/haydenbleasel/kibo/main/license.md (ve https://raw.githubusercontent.com/shadcnblocks/kibo/main/license.md, aynı)

> `Copyright (c) 2023 — Present shadcnblocks`
> `Permission is hereby granted, free of charge, to any person obtaining a copy of this software ... to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software`

Dosyada "MIT License" başlığı yok ama gövde standart MIT izin metni; **A** kabul edildi. İpucu ("kibo MIT") doğrulandı; ayrıca telif sahibi artık **shadcnblocks** (Hayden Bleasel'ın deposu shadcnblocks tarafından işletiliyor/yansıtılıyor).
**Dikkat (blok alt kümesi):** `examples/team.tsx`, `contact.tsx`, `footer.tsx` içinde `// Based on https://shadcnblocks.com/block/team1` yorumları var; yani kibo blokları shadcnblocks bloklarından türetilmiş. Telif sahibi aynı olduğu için kibo deposunun MIT'i bu dosyaları da kapsıyor görünüyor, ama shadcnblocks'un kendi ücretsiz deposu Commons Clause (B). Hukuki risk görmek isteyen bu 28 bloğu **A\*** (temkinli: B gibi davran) sayabilir; ben A bıraktım ve burada işaretledim.

## (c) Bağımlılık profili
| profil | adet |
|---|---|
| yalnız react/css (+ikon/cva/cn) | 121 |
| motion/framer-motion | 5 |
| radix/base-ui/react-aria | 715 |
| ağır paket (recharts, tanstack, zod, rhf, cmdk, sonner, date-picker, vb.) | 329 |

Öncelik sırası: ağır > motion > primitive > düz (satır tek profile yazılır). Motion kullanan satır sayısı: **5**. Karmaşıklık: S=927, M=221, L=22 (S<80, M 80–250, L>250 satır; `shadcn:x` bağımlılıkları transitif olarak `radix-ui` vb. ile genişletildi).

En sık npm bağımlılıkları: `radix-ui` (951), `recharts` (70), `cmdk` (66), `@hookform/resolvers` (50), `react-hook-form` (50), `zod` (50), `@faker-js/faker` (40), `sonner` (32), `date-fns` (29), `react-day-picker` (24).

Pattern'ler büyük çoğunlukla `radix-ui` + shadcn bileşenleri; bazıları `react-hook-form`/`zod`/`@faker-js/faker`/`recharts`/`cmdk`/`vaul`. Component paketleri kendi `package.json` bağımlılıklarını taşıyor (ör. marquee → `react-fast-marquee`).

## (d) Nasıl alınır
- Registry: `https://www.kibo-ui.com/r/<paket>.json` (kaynakta `scripts/index.ts`: `new URL(`r/${packageName}.json`, "https://www.kibo-ui.com")`; `apps/docs/lib/package.ts` `registryDependencies` içinde aynı kalıp) ve dizin `https://www.kibo-ui.com/r/registry.json` (`app/r/registry.json/route.ts`). CLI: `npx shadcn add @kibo-ui/<paket>` (`components/installer.tsx`).
- Repo yolu: `packages/<paket>/index.tsx`, `apps/docs/examples/<blok>.tsx`, `packages/patterns/<bileşen>/<varyant>/<dosya>.tsx`.
- Kanıt: route'lar herhangi bir auth/anahtar kontrolü yapmıyor (yalnız `@vercel/analytics` sayacı). Canlı istek **doğrulanamadı** (host engelli); bu repoda önceden derlenmiş JSON yok, JSON istek anında üretiliyor.

## (e) Mozaik çakışması
Mozaik'te aynı adlı öğe (ad eşleşmesi, `registry/*/*/*/meta.json` + `blocks/**/meta.json` = 274 ad): satır bazında **76** kesin eşleşme, **117** yakın ad (`~`, önek eşleşmesi). Çakışan Mozaik adları: `alert`, `announcement`, `breadcrumb`, `data-table`, `marquee`, `pagination`, `tooltip`.
**Okuma notu:** `pattern`/`example`/`block` satırlarında eşleşme, o satırın ait olduğu *bileşen/kategori* adıdır (ör. `c-alert-3` → Mozaik `alert`); birebir kopya değil, 'bu kategoride Mozaik'te zaten bir ana bileşen var' demektir. Satır bazındaki karşılık TSV son sütunundadır. Mozaik varyantları (`variants.ts`) adlandırılmış prop setleridir; ayrı ad olarak karşılaştırılmadı.

Component düzeyinde kesin çakışma: `announcement`, `marquee`; ayrıca birçok pattern kategorisi (alert, breadcrumb, button, …) Mozaik ana bileşeniyle aynı adlı.

## En büyük engel
Lisans engeli yok. Engel: (1) 1101 pattern'in çoğu shadcn primitiflerinin etiketli kopyası, 927'i S karmaşıklıkta, ayrı bir görsel değer taşımayabilir; (2) 28 bloğun shadcnblocks kökenli olması (yukarıdaki not); (3) canlı JSON doğrulanamadı.
