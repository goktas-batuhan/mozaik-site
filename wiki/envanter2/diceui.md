# diceui

- Repo: https://github.com/sadmann7/diceui (commit 061d7b6)
- Site: https://diceui.com
- Lisans (ham LICENSE metninden): MIT (LICENSE)
- **Sınıf: A** — Düz MIT.
- Alınabilir öğe (ui/component/block/hook/item): **94**; Mozaik'te olmayan: **84**
- Tür dağılımı: {'ui': 82, 'component': 12}
- En sık bağımlılıklar: radix-ui (94)
- Not: Radix tabanı (docs/registry/bases/radix); base-ui tabanı da var (bases/base, aynı öğe adları, yinelenmedi).
- `*` işaretli bağımlılık = öğe düzeyinde veri yok, kaynak-paket düzeyi (package.json) bağımlılıkları.
- Yöntem: liste repo ağacından / registry.json'dan programatik üretildi (`git ls-files`, JSON parse). group/shelf = slug anahtar kelime eşlemesi (taxonomy.json id'leri, `-` = eşleşmedi); karmaşıklık = dosya+bağımlılık sayısı (S/M/L); motion = bağımlılık/slug tabanlı; Mozaik'te var mı = 193 meta.json + blok slug'ı ile tam/normalize/alt-dize eşleşme (var/benzer/yok). `~` ile biten yol = registry'deki yol ağaçta birebir bulunamadı.
- Veri: [diceui.tsv](diceui.tsv)
