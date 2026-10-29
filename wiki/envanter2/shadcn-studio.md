# shadcn-studio

- Repo: https://github.com/themeselection/shadcn-studio (commit 72a2033)
- Site: https://shadcnstudio.com
- Lisans (ham LICENSE metninden): MIT + Commons Clause Restriction (LICENSE.md)
- **Sınıf: B** — LICENSE.md: "No Sale or Redistribution of Components ... whether alone, in a bundle, or as a ported version - without modification"; rakip ürün yasağı. Public Mozaik'e girmez, private depoda da değiştirilmeden yeniden dağıtılmaz.
- Alınabilir öğe (ui/component/block/hook/item): **637**; Mozaik'te olmayan: **600**
- Tür dağılımı: {'component': 600, 'block': 37, 'style': 22}
- En sık bağımlılıklar: lucide-react (312), button (263), label (206), input (92), avatar (68), utils (68), sonner (57), card (54)
- Not: -
- `*` işaretli bağımlılık = öğe düzeyinde veri yok, kaynak-paket düzeyi (package.json) bağımlılıkları.
- Yöntem: liste repo ağacından / registry.json'dan programatik üretildi (`git ls-files`, JSON parse). group/shelf = slug anahtar kelime eşlemesi (taxonomy.json id'leri, `-` = eşleşmedi); karmaşıklık = dosya+bağımlılık sayısı (S/M/L); motion = bağımlılık/slug tabanlı; Mozaik'te var mı = 193 meta.json + blok slug'ı ile tam/normalize/alt-dize eşleşme (var/benzer/yok). `~` ile biten yol = registry'deki yol ağaçta birebir bulunamadı.
- Veri: [shadcn-studio.tsv](shadcn-studio.tsv)
