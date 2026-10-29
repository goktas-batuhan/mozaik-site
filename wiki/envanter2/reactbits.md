# reactbits.dev — DavidHDev/react-bits

Envanter 2 · 2026-10-29 · sınıf: **B** · kaynak: `DavidHDev/react-bits @ e12c221 (2026-10-19)`

## Özet

| ölçü | değer |
|---|---|
| toplam satır (TSV) | 419 |
| türler | component 218, ses 201 |
| Mozaik'te aynı kaynaktan var | 0 |
| Mozaik'te ad çakışması (aynı slug, başka kaynak) | 7 |
| **alınabilir yeni öğe** (Mozaik'te olmayan) | **419** (component 218, ses 201) |
| bunlardan yalnız `motion`/bağımlılıksız (Mozaik kuralına doğrudan uyan) | 152 |
| motion = e | 216 / 419 |
| group/shelf düşük güven (`~`) | 80 |

## Lisans doğrulaması

Ham `LICENSE.md` metni depodan okundu (git clone, derinlik 1; r.jina.ai ve gh api bu ortamda kapalı).

**MIT + Commons Clause License Condition v1.0** (Copyright (c) 2026 David Haz). Ham metinden: "You may use this Software, including for any commercial purpose, so long as you do not sell, sublicense, or redistribute the components themselves-whether alone, in a bundle, or as a ported version." Aynı kısıt tools ve ses kütüphanesi için de geçerli. sha256(LICENSE.md)=4bdd1fa59a6b7d59…

**B** — kendi uygulamanda/sitende kullanım serbest, ama bileşenlerin kendisini bundle/port olarak yeniden dağıtmak yasak. Mozaik registry'si (shadcn ile kurulabilen, public) tam bu yasağa giriyor → **public Mozaik'e GİRMEZ; yalnız private depoya.** Not: Commons Clause "MIT" değildir (OSI açık kaynak değil); yine de brif kararı (ücretsiz her component alınır) gereği private depo yolu açık.

## Dağılım (group, yalnız yeni öğeler)

backgrounds 72, text 33, cursor 21, layout 18, cards 16, inputs 14, navigation 10, buttons 8, ai 6, media 5, scroll 5, onchain 3, feedback 3, overlays 2, data 2

## En sık bağımlılıklar (yeni öğeler)

`@hugeicons/core-free-icons` 28, `motion` 28, `@hugeicons/react` 26, `gsap` 18, `ogl` 10, `three` 6, `vgpu` 2, `matter-js` 2, `@gsap/react` 2, `@use-gesture/react` 1, `@react-three/drei` 1, `@react-three/fiber` 1


## Notlar / engeller

- Tür `ses`: Sound Lab ses kütüphanesi (201 öğe, JS/TS çiftleri tekilleştirildi). Ses dosyaları da aynı Commons Clause kapsamında; UI bileşeni değil, Mozaik taksonomisinde karşılığı yok → grup `sound-lab`.
- `TextPressure` kodu codepen.io/JuanFuentes/full/rgXKGQ'dan port edildiğini söylüyor; o codepen'in lisansı doğrulanmadı (üçüncü taraf kaynak riski). `ShapeWaves` "inspired by vercel.com/labs" (yalnız ilham).
- **React Bits Pro (ücretli): C** — `src/constants/pro-summary.generated.json` sayımları: 230 component, 300 block, 300 app-UI, 15 template, 20 agent skill (toplam 865); Starter $129 / Pro $249 / Ultimate $349 (yaşam boyu). Hiçbiri indirilmedi/listelenmedi; yalnız sayı.
- Alma yolu: `src/ts-tailwind/<Kategori>/<Ad>/` (TS+Tailwind varyantı). Aynı öğe JS-CSS, JS-TW, TS-CSS, TS-TW olarak 4 varyantta yayınlanıyor; `public/r/<Ad>-<VAR>.json` shadcn registry dosyaları depoda hazır.
- Bağımlılıklar `public/r/registry.json` + kaynaktaki import taramasının birleşimi. Çok sayıda arka plan `ogl`/`three`/WebGL.
- Brif açısından: mevcut Mozaik registry'sinde react-bits kaynaklı öğe yok; ad çakışması 0.

## Yöntem

- Satırlar elle değil `scratchpad/tools/inv.py` ile depo ağacı / registry indeksinden üretildi: kaynak dosyalar taranır (import → bağımlılık, `requestAnimationFrame`/`@keyframes`/motion paketi → motion=e, satır sayısı → S<90 / M<260 / L), Mozaik'te var mı: `goktas-batuhan/mozaik` (main, derinlik-1 klon) `registry/**/meta.json` + `blocks/**/meta.json` + `public/r/*.json` ile karşılaştırma (`gh api` ağacı bu oturumda erişilemedi: "GitHub access … not enabled"). `var(aynı kaynak)` = Mozaik meta.json `source.url` aynı upstream dosyayı gösteriyor; `ad-çakışması:x` = aynı slug başka kaynaktan.
- group/shelf `registry/taxonomy.json` id'lerine anahtar-kelime sezgisiyle atandı; `~` ile biten değer düşük güven (yedek raf). Kesinleşmeden önce gözden geçirilmeli.
- Karmaşıklık yalnız satır/dosya sayısından türetilmiş kaba tahmindir. motion=e: animasyon kodu var; `h`: yok.
- TSV sütunları: slug | tür | group/shelf | bağımlılıklar | sınıf | alma yolu | karmaşıklık | motion | Mozaik'te var mı.
