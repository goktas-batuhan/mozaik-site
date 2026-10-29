# bencho

- Repo: https://github.com/cabralorenzo/bencho (commit 30ab35a)
- Site: https://bencho.dev
- Lisans (ham LICENSE metninden): MIT (LICENSE: "free and MIT licensed"; Bencho name/mark and photos excluded)
- **Sınıf: A** — README: "44 blocks and 24 sounds, free and MIT licensed". THIRD_PARTY.md ayrı lisans notu içeriyor; Pro katmanı site tarafında (alınmaz).
- Alınabilir öğe (ui/component/block/hook/item): **44**; Mozaik'te olmayan: **35**
- Tür dağılımı: {'block': 44, 'lib': 1}
- En sık bağımlılıklar: framer-motion (45), lucide-react (45)
- Not: Her blok klasör: Tsx + Css + README. tokens.css ortak. Pro (bencho.dev/pricing) içerik repoda yok; alınmaz.
- `*` işaretli bağımlılık = öğe düzeyinde veri yok, kaynak-paket düzeyi (package.json) bağımlılıkları.
- Yöntem: liste repo ağacından / registry.json'dan programatik üretildi (`git ls-files`, JSON parse). group/shelf = slug anahtar kelime eşlemesi (taxonomy.json id'leri, `-` = eşleşmedi); karmaşıklık = dosya+bağımlılık sayısı (S/M/L); motion = bağımlılık/slug tabanlı; Mozaik'te var mı = 193 meta.json + blok slug'ı ile tam/normalize/alt-dize eşleşme (var/benzer/yok). `~` ile biten yol = registry'deki yol ağaçta birebir bulunamadı.
- Veri: [bencho.tsv](bencho.tsv)
