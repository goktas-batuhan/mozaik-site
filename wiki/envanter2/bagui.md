# bagui.pro (anelkabag/bag-ui)

- Lisans (ham metin): `LICENCE.md` MIT, "Copyright (c) 2023 Anelka Bag". Ancak `registry.json` her öğede `access.tier` taşıyor: 18 `free`, 29 `pro`.
- Sınıf: free = **A** (18), pro = **C** (29, alınmaz; dosyalar MIT depoda görünse de site bunları ücretli satıyor). Mozaik CREDITS.md zaten bag-ui'yi izinli kaynak sayıyor.
- Kaynak: 47 `registry:block` (+ `registry/default/ui/fancy-button.tsx`, registry.json dışı, katman bilgisi yok → listelenmedi).
- Alınabilir (A, 18): hero4, navbar2, faq1, cta-1/2, testimonial-1, contact-1/2, feature-1/2/3, pricing-1/3, sidebar1, chat-app1, footer1/2/3. Bağımlılık: `motion/react`, `lucide-react`; hepsinde motion var (e).
- Mozaik'te var mı: slug eşleşmesi yok (credits tablosunda bag-ui satırı yok).
- Engel: bagui.pro sitesine erişilemedi (egress 403); katman bilgisi depodaki registry.json'dan alındı.
