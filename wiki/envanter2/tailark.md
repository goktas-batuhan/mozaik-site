# tailark.com

- Ne: shadcn/ui pazarlama blokları. Ücretsiz katman açık depoda: `tailark/blocks` (README: "Open source shadcn/ui registry for Tailark blocks and pages"; registry `https://oss-tailark.com/r/radix/{name}`). Pro katmanı (Quartz Kit) depoda yok → alınmaz.
- Lisans (ham metin okundu): `LICENCE.md` = MIT, "Copyright (c) 2025 Irung"; `package.json` license MIT. **Sınıf A.**
- Yöntem: depo `git clone --depth 1` (site ağ politikasıyla kapalı); öğeler `registry/bases/radix/{dusk,mist,veil}/_registry.ts` ve `_pages-registry.ts` içindeki `block()`/`page()` çağrılarından regex ile çıkarıldı (`wiki/envanter2/tailark.tsv`).
- Sayı: **160** öğe = dusk 39 blok + 10 landing sayfası, mist 54 blok, veil 57 blok. Base UI sürümü aynı öğelerin ikizi (aynı sayı, tekrar sayılmadı).
- Bağımlılık: shadcn/ui primitifleri (radix sürümü), `motion-primitives` (infinite-slider vb.), magic-ui border-beam, `core/svgs` marka logoları (logo-cloud'larda; marka logosu kullanımı için ayrıca bakılmalı). 20 öğede motion var.
- Mozaik'te var mı: slug eşleşmesi yok (0); Mozaik'te kendi marketing blokları var, taksonomi eşlemesi TSV'de (hero/features/stats/testimonials/pricing/faq/cta/footer/team/contact/logos/app-auth/pages-landing).
- Engel: tailark.com'a erişilemedi (sandbox egress 403) — site metni/$0 plan sınırı okunmadı; sınıf depo lisansına dayanır. Marka logoları (spotify, vercel, openai…) SVG olarak içeride; trademark notu.
