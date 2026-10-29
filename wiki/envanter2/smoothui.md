# smoothui.dev — educlopez/smoothui

Envanter 2 · 2026-10-29 · sınıf: **A** · kaynak: `educlopez/smoothui @ bc49c8c (2026-10-25)`

## Özet

| ölçü | değer |
|---|---|
| toplam satır (TSV) | 264 |
| türler | blok 34, component 229, şablon 1 |
| Mozaik'te aynı kaynaktan var | 57 |
| Mozaik'te ad çakışması (aynı slug, başka kaynak) | 14 |
| **alınabilir yeni öğe** (Mozaik'te olmayan) | **207** (blok 21, component 185, şablon 1) |
| bunlardan yalnız `motion`/bağımlılıksız (Mozaik kuralına doğrudan uyan) | 113 |
| motion = e | 172 / 207 |
| group/shelf düşük güven (`~`) | 57 |

## Lisans doğrulaması

Ham `LICENSE` metni depodan okundu (git clone, derinlik 1; r.jina.ai ve gh api bu ortamda kapalı).

**MIT** (Copyright (c) 2024 Eduardo Calvo) — standart MIT metni. sha256(LICENSE)=9877f4310c0549e5…

**A** — düz MIT; public Mozaik'e girer. Mozaik bu depodan zaten çok öğe almış (CREDITS.md).

## Dağılım (group, yalnız yeni öğeler)

layout 30, inputs 29, blocks 21, ai 17, backgrounds 17, navigation 14, cards 11, buttons 11, feedback 10, overlays 9, media 8, onchain 8, text 8, data 7, scroll 5, cursor 2

## En sık bağımlılıklar (yeni öğeler)

`motion` 166, `lucide-react` 55, `@base-ui/react` 31, `radix-ui` 24, `@smoothui/data` 10, `class-variance-authority` 3, `cmdk` 2, `react-use-measure` 2, `@radix-ui/react-slot` 2, `@radix-ui/react-popover` 2, `popmotion` 1, `react-day-picker` 1


## Notlar / engeller

- Kaynak: `packages/smoothui/components/*` (229 klasör), `packages/smoothui/blocks/<tür>/<ad>` (34 blok), `templates/chat-template` (1 şablon). `packages/shadcn-ui` upstream shadcn kopyası olduğu için sayılmadı.
- Çok sayıda öğe radix-ui / `@base-ui/react` tabanlı (brif kararı: envantere girer). `@smoothui/data` = depo içi paket (mock veri); alınırken satır içine alınmalı.
- Bazı bileşenler "inspired by" notu taşıyor (photo-stack: Josh Puckett dialkit; shared-axis: Google Material; Apple landing) — yalnız ilham, kod kopyası iddiası yok. Lisans etkisi beklenmiyor ama kopya olmadığı doğrulanmadı.
- `COMPONENT_BACKLOG.md` ui.unlumen.com'dan 55 bileşen analiz ettiğini yazıyor (2026-08-10) — unlumen için ikincil ipucu, lisans kanıtı değil.
- Pro/ücretli katman bulunmadı (depoda).

## Yöntem

- Satırlar elle değil `scratchpad/tools/inv.py` ile depo ağacı / registry indeksinden üretildi: kaynak dosyalar taranır (import → bağımlılık, `requestAnimationFrame`/`@keyframes`/motion paketi → motion=e, satır sayısı → S<90 / M<260 / L), Mozaik'te var mı: `goktas-batuhan/mozaik` (main, derinlik-1 klon) `registry/**/meta.json` + `blocks/**/meta.json` + `public/r/*.json` ile karşılaştırma (`gh api` ağacı bu oturumda erişilemedi: "GitHub access … not enabled"). `var(aynı kaynak)` = Mozaik meta.json `source.url` aynı upstream dosyayı gösteriyor; `ad-çakışması:x` = aynı slug başka kaynaktan.
- group/shelf `registry/taxonomy.json` id'lerine anahtar-kelime sezgisiyle atandı; `~` ile biten değer düşük güven (yedek raf). Kesinleşmeden önce gözden geçirilmeli.
- Karmaşıklık yalnız satır/dosya sayısından türetilmiş kaba tahmindir. motion=e: animasyon kodu var; `h`: yok.
- TSV sütunları: slug | tür | group/shelf | bağımlılıklar | sınıf | alma yolu | karmaşıklık | motion | Mozaik'te var mı.
