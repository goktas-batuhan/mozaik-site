# shadcnblocks.com (+ GitHub ücretsiz repo)

Sınıf: **B** (GitHub'daki 54 ücretsiz blok) · **K** (sitedeki girişli "basic" blok havuzu, sayı bilinmiyor) · **C** (Pro/bundle) · Repo: https://github.com/shadcnblocks/shadcn-ui-blocks

> **Doğrulama sınırı (önemli).** Bu oturumun ağ politikası `ui.shadcn.com`, `blocks.so`, `www.shadcnblocks.com`, `www.kibo-ui.com`, `reui.io`, `beste.dev`, `r.jina.ai`, `x.com` host'larına CONNECT'te 403 verdi (`curl` ve WebFetch: `getaddrinfo ENOTFOUND`). Yalnız `raw.githubusercontent.com`, npm ve `git clone` (anonim, GitHub) çalıştı. Bu yüzden **canlı `/r/*.json` isteği örneği yok**; "hesapsız erişim" kanıtı olarak repodaki önceden derlenmiş JSON dosyaları ya da kaynak koddaki route gösteriliyor. Sayılar ve lisans metinleri **depo dosyalarından** (aşağıda commit'li) ham okundu, site sayfalarından değil. Site sayfasındaki terimler ayrıca doğrulanmadı.

## (a) Sayılar
- Repoda `src/block/*.tsx`: **54** dosya (README "55 free marketing blocks" diyor; dosya sayımı 54, tek tek sayıldı). TSV'de B sınıfı 54 satır + 1 K satırı.
Önerilen group/shelf dağılımı (anahtar kelime kuralıyla otomatik, **öneri**; el ile gözden geçirilmedi): `marketing/features` 19, `marketing/team` 6, `marketing/hero` 6, `marketing/blog` 5, `marketing/cta` 3, `marketing/pricing` 3, `app/auth` 2, `marketing/changelog` 1, `marketing/contact` 1, `marketing/faq` 1, `marketing/footer` 1, `layout/lists` 1 …
- Sitenin tamamı: arama sonucu snippet'ine göre "1390+ Free & Premium Blocks" (https://www.shadcnblocks.com/blocks/all?price=free) — **bu ham metinden doğrulanmadı**, site açılamadı. Ücretsiz/Premium kırılımı bilinmiyor.
- Repo ayrıca `src/components/aceternity/background-lines.tsx` (üçüncü taraf Aceternity kodu) ve `src/components/kibo-ui/code-block` içeriyor; bu iki dosya TSV'ye alınmadı.

## (b) Lisans
Ham metin: https://raw.githubusercontent.com/shadcnblocks/shadcn-ui-blocks/master/LICENSE.md

> `MIT + Commons Clause License Condition v1.0`
> `Copyright (c) 2025 shadcnblocks.com - Rob Austin`
> `...to use, copy, modify, merge, publish, and distribute the Software as part of an application, website, or product, subject to the following conditions:`
> `## Commons Clause Restriction` — `You may use this Software, including for any commercial purpose, so long as you do not sell, sublicense, or redistribute the components themselves-whether alone, in a bundle, or as a ported version.`

→ **B**: ücretsiz, herkese açık, kendi ürününde kullanılır; bileşenleri yeniden dağıtmak/public kütüphane yapmak yasak. Başlangıç ipucu ("kütüphane/public repo olarak yayınlanamaz") **doğrulandı**. Çelişki: aynı repodaki `package.json` `"license": "MIT"` diyor ama `LICENSE.md` Commons Clause ekliyor; bağlayıcı olan LICENSE.md kabul edildi (yani daha kısıtlayıcı). Mozaik public registry'sine **girmez**; private depoya uygun.

**K sınıfı (doğrulanamadı):** `https://www.shadcnblocks.com/blocks/free` — sayfa bu ağdan açılamadı (host engelli). Arama özeti (ham değil, ikincil kaynak) ana sayfa için şunu aktarıyor: "Free blocks are ready to copy/paste, basic blocks simply require a login but no payment." Yani "basic" blokların bir kısmı girişli ücretsiz olabilir. Kural gereği hesap açma/giriş denenmedi. Batuhan'ın o sayfada kendi bakıp gerçek sayıyı ve CAPTCHA/giriş durumunu doğrulaması gerekiyor. TSV'deki `shadcnblocks-site-ucretsiz-girisli` satırı yalnızca bu K kaydını temsil eden **yer tutucudur**, gerçek bir öğe adı değildir (sayı `?`). Pro bloklar ve bundle: **C**, hiçbir şey alınmadı/indirilmedi.

## (c) Bağımlılık profili (54 B satırı)
| profil | adet |
|---|---|
| yalnız react/css (+ikon/cva/cn) | 12 |
| motion/framer-motion | 0 |
| radix/base-ui/react-aria | 39 |
| ağır paket (recharts, tanstack, zod, rhf, cmdk, sonner, date-picker, vb.) | 3 |

Öncelik sırası: ağır > motion > primitive > düz (satır tek profile yazılır). Motion kullanan satır sayısı: **0**. Karmaşıklık: S=14, M=38, L=2 (S<80, M 80–250, L>250 satır; `shadcn:x` bağımlılıkları transitif olarak `radix-ui` vb. ile genişletildi).

En sık npm bağımlılıkları: `radix-ui` (42), `date-fns` (1), `database` (1), `embla-carousel-react` (1).

Blokların çoğu `src/components/ui/*` shadcn primitiflerine bağlı (radix); animasyon yok.

## (d) Nasıl alınır
- Repo yolu: `src/block/<ad>.tsx` (anonim `git clone` ile okundu).
- Registry kalıbı (CLI): README `https://docs.shadcnblocks.com/blocks/shadcn-cli/` adresine yönlendiriyor; `/r/<ad>.json` kalıbı **doğrulanamadı** ve Pro öğeler lisans anahtarı isteyebilir, bu yüzden registry yolu önerilmiyor — B sınıfı için repo kopyası yeterli.

## (e) Mozaik çakışması
Kesin eşleşme **0**, yakın ad **6** (`~`): ör. `hero*`, `pricing*`, `stats*` ailesi Mozaik `blocks/marketing/*` ile aynı kategorilerde ama farklı tasarımlar.

## En büyük engel
**Lisans (Commons Clause)**: public repoya girmiyor → ayrı private depo. Ek olarak sitedeki "girişli ücretsiz" havuzun boyutu ve erişimi (K) bu oturumda görülemedi.
