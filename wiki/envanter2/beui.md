# beui.dev — starc007/ui-components

Envanter 2 · 2026-10-29 · sınıf: **A** · kaynak: `starc007/ui-components @ 7a042c1 (2026-10-28)`

## Özet

| ölçü | değer |
|---|---|
| toplam satır (TSV) | 185 |
| türler | blok 24, component 89, varyant 72 |
| Mozaik'te aynı kaynaktan var | 10 |
| Mozaik'te ad çakışması (aynı slug, başka kaynak) | 18 |
| **alınabilir yeni öğe** (Mozaik'te olmayan) | **175** (blok 22, component 83, varyant 70) |
| bunlardan yalnız `motion`/bağımlılıksız (Mozaik kuralına doğrudan uyan) | 97 |
| motion = e | 150 / 175 |
| group/shelf düşük güven (`~`) | 49 |

## Lisans doğrulaması

Ham `LICENSE` metni depodan okundu (git clone, derinlik 1; r.jina.ai ve gh api bu ortamda kapalı).

**MIT** (Copyright (c) 2026 Saurabh Chauhan); package.json `"license": "MIT"`. sha256(LICENSE)=9e27b491d5691a1b…

**A** — ücretsiz katman düz MIT. **beUI Pro** (pro.beui.dev: premium animasyonlu bölümler + Next.js şablonları, token ile özel registry) → **C**, alınmaz; sayı için erişim yok (token gerekli).

## Dağılım (group, yalnız yeni öğeler)

blocks 35, ai 34, inputs 25, data 20, layout 14, overlays 10, buttons 10, scroll 6, navigation 5, text 5, onchain 4, feedback 3, media 2, cards 1, backgrounds 1

## En sık bağımlılıklar (yeni öğeler)

`motion` 146, `lucide-react` 71, `@tanstack/react-virtual` 5, `lenis` 2, `@paper-design/shaders-react` 1, `next-themes` 1


## Notlar / engeller

- Liste `lib/registry.ts` kataloğundan çıkarıldı: motion (bileşen), charts, agents, blocks kategorileri; `examples[]` girdileri `varyant` olarak ayrı satır (72).
- Registry'de olmayan dahili yardımcılar atlandı: `motion/liquid`, `motion/magnetic`, `motion/tooltip-surface`, `agents/agent-code|agent-disclosure|message-context` ve çok-dosyalı grafiklerin alt parçaları (kendi başına yayınlanmıyor).
- Kardeş depo `starc007/beui-native` (MIT, React Native/Expo): `components` altında ~106 tsx; web React değil → Mozaik kapsamı dışı, satır yapılmadı, yalnız not.
- Site/registry JSON (`beui.dev/r/<slug>.json`) ağ politikasıyla kapalı olduğundan doğrulanamadı; alma yolu repo dosyası.
- Ad çakışması: Mozaik'te aynı slug başka kaynaktan var (ör. `alert`, `breadcrumb`, `dock`, `marquee`) → "ad-çakışması" sütunu; alınırsa slug değişmeli.

## Yöntem

- Satırlar elle değil `scratchpad/tools/inv.py` ile depo ağacı / registry indeksinden üretildi: kaynak dosyalar taranır (import → bağımlılık, `requestAnimationFrame`/`@keyframes`/motion paketi → motion=e, satır sayısı → S<90 / M<260 / L), Mozaik'te var mı: `goktas-batuhan/mozaik` (main, derinlik-1 klon) `registry/**/meta.json` + `blocks/**/meta.json` + `public/r/*.json` ile karşılaştırma (`gh api` ağacı bu oturumda erişilemedi: "GitHub access … not enabled"). `var(aynı kaynak)` = Mozaik meta.json `source.url` aynı upstream dosyayı gösteriyor; `ad-çakışması:x` = aynı slug başka kaynaktan.
- group/shelf `registry/taxonomy.json` id'lerine anahtar-kelime sezgisiyle atandı; `~` ile biten değer düşük güven (yedek raf). Kesinleşmeden önce gözden geçirilmeli.
- Karmaşıklık yalnız satır/dosya sayısından türetilmiş kaba tahmindir. motion=e: animasyon kodu var; `h`: yok.
- TSV sütunları: slug | tür | group/shelf | bağımlılıklar | sınıf | alma yolu | karmaşıklık | motion | Mozaik'te var mı.
