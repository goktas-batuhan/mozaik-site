# textmotion.dev — danielwh2/slot-text

Envanter 2 · 2026-10-29 · sınıf: **A** · kaynak: `danielwh2/slot-text @ daa93fd (2026-09-19)`

## Özet

| ölçü | değer |
|---|---|
| toplam satır (TSV) | 1 |
| türler | component 1 |
| Mozaik'te aynı kaynaktan var | 0 |
| Mozaik'te ad çakışması (aynı slug, başka kaynak) | 0 |
| **alınabilir yeni öğe** (Mozaik'te olmayan) | **1** (component 1) |
| bunlardan yalnız `motion`/bağımlılıksız (Mozaik kuralına doğrudan uyan) | 1 |
| motion = e | 1 / 1 |
| group/shelf düşük güven (`~`) | 0 |

## Lisans doğrulaması

Ham `LICENSE` metni depodan okundu (git clone, derinlik 1; r.jina.ai ve gh api bu ortamda kapalı).

**MIT** (Copyright (c) 2026 Daniel Belyi); package.json `"license": "MIT"`, `slot-text@0.3.4`, "Dependency-free text roll animation". sha256(LICENSE)=c0d53cbcf3b4e9cf…

**A** — düz MIT. Tek kütüphane = 1 bileşen (metin "slot makinesi" dönüşü); React/Vue/Solid/Svelte adaptörleri aynı çekirdeği paylaşıyor.

## Dağılım (group, yalnız yeni öğeler)

text 1

## En sık bağımlılıklar (yeni öğeler)

yok


## Notlar / engeller

- Bağımlılıksız (yalnız CSS + DOM); `src/react.ts` adaptörü + `style.css`. Mozaik'e `text/counter` veya `text/rotate-morph` rafına uyar.
- textmotion.dev sitesi bu ortamda ağ politikasıyla kapalı; siteyle depo içeriği karşılaştırılamadı. Sitede ek preset/bileşen varsa kaçırılmış olabilir.

## Yöntem

- Satırlar elle değil `scratchpad/tools/inv.py` ile depo ağacı / registry indeksinden üretildi: kaynak dosyalar taranır (import → bağımlılık, `requestAnimationFrame`/`@keyframes`/motion paketi → motion=e, satır sayısı → S<90 / M<260 / L), Mozaik'te var mı: `goktas-batuhan/mozaik` (main, derinlik-1 klon) `registry/**/meta.json` + `blocks/**/meta.json` + `public/r/*.json` ile karşılaştırma (`gh api` ağacı bu oturumda erişilemedi: "GitHub access … not enabled"). `var(aynı kaynak)` = Mozaik meta.json `source.url` aynı upstream dosyayı gösteriyor; `ad-çakışması:x` = aynı slug başka kaynaktan.
- group/shelf `registry/taxonomy.json` id'lerine anahtar-kelime sezgisiyle atandı; `~` ile biten değer düşük güven (yedek raf). Kesinleşmeden önce gözden geçirilmeli.
- Karmaşıklık yalnız satır/dosya sayısından türetilmiş kaba tahmindir. motion=e: animasyon kodu var; `h`: yok.
- TSV sütunları: slug | tür | group/shelf | bağımlılıklar | sınıf | alma yolu | karmaşıklık | motion | Mozaik'te var mı.
