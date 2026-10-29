# originui

- Repo: https://github.com/origin-space/originui (commit 890a79a)
- Site: https://originui.com (adres teyit edilmedi; repo'dan türetilmedi)
- Lisans (ham LICENSE metninden): MIT (LICENSE: "coss.com, originally Origin UI")
- **Sınıf: A** — Düz MIT; coss.com ile kardeş (coss ui AGPL değil bu depo MIT).
- Alınabilir öğe (ui/component/block/hook/item): **645**; Mozaik'te olmayan: **636**
- Tür dağılımı: {'ui': 40, 'component': 600, 'hook': 5, 'lib': 1}
- En sık bağımlılıklar: button (210), label (205), input (74), select (42), checkbox (36), popover (34), dropdown-menu (33), badge (30)
- Not: Alma yolu = derlenmiş registry JSON. Büyük kısmı shadcn bileşen varyantı (component).
- `*` işaretli bağımlılık = öğe düzeyinde veri yok, kaynak-paket düzeyi (package.json) bağımlılıkları.
- Yöntem: liste repo ağacından / registry.json'dan programatik üretildi (`git ls-files`, JSON parse). group/shelf = slug anahtar kelime eşlemesi (taxonomy.json id'leri, `-` = eşleşmedi); karmaşıklık = dosya+bağımlılık sayısı (S/M/L); motion = bağımlılık/slug tabanlı; Mozaik'te var mı = 193 meta.json + blok slug'ı ile tam/normalize/alt-dize eşleşme (var/benzer/yok). `~` ile biten yol = registry'deki yol ağaçta birebir bulunamadı.
- Veri: [originui.tsv](originui.tsv)
