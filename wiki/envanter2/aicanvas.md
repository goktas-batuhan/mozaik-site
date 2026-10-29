# aicanvas.me — aicanvas-me/aicanvas

Envanter 2 · 2026-10-29 · sınıf: **A** · kaynak: `aicanvas-me/aicanvas @ 4143277 (2026-10-28)`

## Özet

| ölçü | değer |
|---|---|
| toplam satır (TSV) | 117 |
| türler | blok 4, component 74, tasarım-sistemi 39 |
| Mozaik'te aynı kaynaktan var | 0 |
| Mozaik'te ad çakışması (aynı slug, başka kaynak) | 8 |
| **alınabilir yeni öğe** (Mozaik'te olmayan) | **117** (blok 4, component 74, tasarım-sistemi 39) |
| bunlardan yalnız `motion`/bağımlılıksız (Mozaik kuralına doğrudan uyan) | 49 |
| motion = e | 98 / 117 |
| group/shelf düşük güven (`~`) | 22 |

## Lisans doğrulaması

Ham `LICENSE` metni depodan okundu (git clone, derinlik 1; r.jina.ai ve gh api bu ortamda kapalı).

**MIT** (Copyright (c) 2026 AI Canvas) + README: "The free library is MIT… Premium components, design systems, and templates are proprietary under the AI Canvas Premium License." sha256(LICENSE)=75c85790506bae0a…

**A** — `components-workspace/` ve `design-systems/andromeda/` (README: "Andromeda (free, MIT)") MIT. Premium bileşen/design system/şablonlar özel lisans → **C**; depoda yok (`premium.lock.json` yalnız commit sha, `components-workspace-premium/` gitignored) → sayı bilinmiyor.

## Dağılım (group, yalnız yeni öğeler)

layout 23, inputs 19, cards 12, buttons 10, navigation 10, feedback 9, data 8, text 5, blocks 4, ai 4, overlays 4, media 3, backgrounds 3, cursor 2, onchain 1

## En sık bağımlılıklar (yeni öğeler)

`framer-motion` 79, `@phosphor-icons/react` 48, `class-variance-authority` 13, `next(*)` 4, `three` 3, `recharts` 3, `matter-js` 2, `@radix-ui/react-slot` 2, `qrcode.react` 1, `geist` 1


## Notlar / engeller

- Not: `npx shadcn add @aicanvas/…` ücretsiz hesap + token ister; hesap açılmadı. Gerek yok: MIT kaynak repoda düz dosya (`components-workspace/<slug>/index.tsx`). README'ye göre ücretsiz kütüphanenin "çoğu" repoda — sitede olup repoda olmayan ücretsiz öğe olabilir (site ağ politikasıyla kapalı, doğrulanamadı).
- Tür `blok` = README'nin "Blocks" bölümündeki 4 öğe. `tasarım-sistemi` = Andromeda bileşenleri (39); tokens.ts/rules.md ayrıca var.
- `crypto-swap` coin ikonları spothq/cryptocurrency-icons (CC0-1.0) — uyumlu.
- Ad çakışması var: `dot-grid`, `glass-card`, `scramble-text`, `signature-pad`, `andromeda/alert` vb. Mozaik'te farklı kaynaktan var.
- Bağımlılık notu: çoğu `framer-motion` + `@phosphor-icons/react`; Mozaik kuralı (react + motion + cn) için ikon bağımlılığı değişimi gerekir.

## Yöntem

- Satırlar elle değil `scratchpad/tools/inv.py` ile depo ağacı / registry indeksinden üretildi: kaynak dosyalar taranır (import → bağımlılık, `requestAnimationFrame`/`@keyframes`/motion paketi → motion=e, satır sayısı → S<90 / M<260 / L), Mozaik'te var mı: `goktas-batuhan/mozaik` (main, derinlik-1 klon) `registry/**/meta.json` + `blocks/**/meta.json` + `public/r/*.json` ile karşılaştırma (`gh api` ağacı bu oturumda erişilemedi: "GitHub access … not enabled"). `var(aynı kaynak)` = Mozaik meta.json `source.url` aynı upstream dosyayı gösteriyor; `ad-çakışması:x` = aynı slug başka kaynaktan.
- group/shelf `registry/taxonomy.json` id'lerine anahtar-kelime sezgisiyle atandı; `~` ile biten değer düşük güven (yedek raf). Kesinleşmeden önce gözden geçirilmeli.
- Karmaşıklık yalnız satır/dosya sayısından türetilmiş kaba tahmindir. motion=e: animasyon kodu var; `h`: yok.
- TSV sütunları: slug | tür | group/shelf | bağımlılıklar | sınıf | alma yolu | karmaşıklık | motion | Mozaik'te var mı.
