# ui.aceternity.com
- Kaynak: `https://ui.aceternity.com/registry.json` (315 kayıt: 114 ui, 14 component, 187 block) ve `/api/components` (114 bileşen, 9 ücretsiz blok, 1 hook).
- **Sınıf B**: açık kaynak lisansı bulunamadı (aceternity/ui repo'sunda LICENSE 404; /license 404). Ham Terms (`https://ui.aceternity.com/terms`, "License" bölümü): "You must not: Republish material from ui.aceternity.com; Sell, rent or sub-license material; Reproduce, duplicate or copy material; Redistribute content". Ücretsiz bileşenler shadcn CLI ile kopyalanabilir ama yeniden dağıtım izni yok → private depo.
- **C (alınmadı)**: Pro blok ve şablonlar. Registry'deki 181 block kaydı ücretsiz blok listesinde (`/api/components` blocks) olmadığı için satıra alınmadı (llms.txt'te "Pro Blocks" bölümleri var). Hesap/ödeme gerekmediği için indirme denenmedi.
- Kaynak içeriği alınamadı: `/r/<ad>.json` 404 (SPA HTML döner); bu yüzden karmaşıklık `?`, bağımlılık registry/api'den. Motion sütunu: Framer Motion tabanlı kütüphane olduğu için `e` varsayımı (kaynak doğrulanmadı).
- group/shelf `?` son eki sezgisel.
- Toplam satır: 134; sınıf dağılımı: {'B': 134}
- Mozaik'te zaten var: 8; yeni: 126
- "Mozaik'te var mı": /tmp/mozaik (public main, 274 meta.json) ile ad eşleşmesi + upstream kaynak-URL eşleşmesi; aynı ad farklı kaynaktan olabilir, elle teyit gerekir.
