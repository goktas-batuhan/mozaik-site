# magicui.design — magicuidesign/magicui

Envanter 2 · 2026-10-29 · sınıf: **A** · kaynak: `magicuidesign/magicui @ efe76fc (2026-10-17)`

## Özet

| ölçü | değer |
|---|---|
| toplam satır (TSV) | 79 |
| türler | component 79 |
| Mozaik'te aynı kaynaktan var | 34 |
| Mozaik'te ad çakışması (aynı slug, başka kaynak) | 1 |
| **alınabilir yeni öğe** (Mozaik'te olmayan) | **45** (component 45) |
| bunlardan yalnız `motion`/bağımlılıksız (Mozaik kuralına doğrudan uyan) | 30 |
| motion = e | 35 / 45 |
| group/shelf düşük güven (`~`) | 19 |

## Lisans doğrulaması

Ham `LICENSE.md` metni depodan okundu (git clone, derinlik 1; r.jina.ai ve gh api bu ortamda kapalı).

**MIT** (Copyright (c) Magic UI) — standart MIT metni, ek koşul yok. sha256(LICENSE.md)=0147b84235ed916b…

**A** — düz MIT; public Mozaik'e girer. (MIT ek koşulu: telif+lisans bildirimi korunacak; Mozaik CREDITS.md zaten bunu yapıyor.)

## Dağılım (group, yalnız yeni öğeler)

text 10, cards 7, backgrounds 7, buttons 6, media 6, layout 5, feedback 2, inputs 1, cursor 1

## En sık bağımlılıklar (yeni öğeler)

`motion` 14, `lucide-react` 6, `reg:button` 3, `react-tweet` 2, `next-themes` 2, `@radix-ui/react-icons` 1, `@shikijs/transformers` 1, `shiki` 1, `@types/canvas-confetti` 1, `canvas-confetti` 1, `svg-dotted-map` 1, `@radix-ui/react-accordion` 1


## Notlar / engeller

- Liste `apps/www/registry.json` içindeki `registry:ui` öğelerinden (78) + registry'de olmayan 1 repo dosyasından (`animated-subscribe-button`, ikinci turda bulundu) üretildi. 170 `registry:example` demo ayrıca var; bunlar bileşen değil demo, satır yapılmadı.
- Magic UI Pro (ücretli şablonlar/bloklar) bu depoda yok; siteye girilmedi → C: sayı doğrulanamadı.
- Site (magicui.design) bu ortamda ağ politikasıyla kapalı olduğundan registry JSON URL'leri yerine repo yolu esas alındı; JSON URL kalıbı `magicui.design/r/<ad>.json` (doğrulanmadı).
- `reg:` öneki = başka bir registry öğesine bağımlılık (örn. `reg:button` = shadcn button).

## Yöntem

- Satırlar elle değil `scratchpad/tools/inv.py` ile depo ağacı / registry indeksinden üretildi: kaynak dosyalar taranır (import → bağımlılık, `requestAnimationFrame`/`@keyframes`/motion paketi → motion=e, satır sayısı → S<90 / M<260 / L), Mozaik'te var mı: `goktas-batuhan/mozaik` (main, derinlik-1 klon) `registry/**/meta.json` + `blocks/**/meta.json` + `public/r/*.json` ile karşılaştırma (`gh api` ağacı bu oturumda erişilemedi: "GitHub access … not enabled"). `var(aynı kaynak)` = Mozaik meta.json `source.url` aynı upstream dosyayı gösteriyor; `ad-çakışması:x` = aynı slug başka kaynaktan.
- group/shelf `registry/taxonomy.json` id'lerine anahtar-kelime sezgisiyle atandı; `~` ile biten değer düşük güven (yedek raf). Kesinleşmeden önce gözden geçirilmeli.
- Karmaşıklık yalnız satır/dosya sayısından türetilmiş kaba tahmindir. motion=e: animasyon kodu var; `h`: yok.
- TSV sütunları: slug | tür | group/shelf | bağımlılıklar | sınıf | alma yolu | karmaşıklık | motion | Mozaik'te var mı.
