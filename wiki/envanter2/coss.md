# coss

- Repo: https://github.com/cosscom/coss (commit 0f3271b)
- Site: https://coss.com/ui
- Lisans (ham LICENSE metninden): AGPL-3.0-only (LICENSE; README: packages/ui için istisna yok)
- **Sınıf: B** — AGPL-3.0: ağ üzerinden sunulan türev çalışma kaynağı açık olmalı; MIT Mozaik ile uyumsuz. Public MIT depoya alınmaz; private/ayrı lisanslı depoda gözden geçirilmeli.
- Alınabilir öğe (ui/component/block/hook/item): **55**; Mozaik'te olmayan: **46**
- Tür dağılımı: {'ui': 55}
- En sık bağımlılıklar: @base-ui/react (55)
- Not: Base UI tabanlı (bağımlılık varsayımı package.json bakılarak teyit edilmeli).
- `*` işaretli bağımlılık = öğe düzeyinde veri yok, kaynak-paket düzeyi (package.json) bağımlılıkları.
- Yöntem: liste repo ağacından / registry.json'dan programatik üretildi (`git ls-files`, JSON parse). group/shelf = slug anahtar kelime eşlemesi (taxonomy.json id'leri, `-` = eşleşmedi); karmaşıklık = dosya+bağımlılık sayısı (S/M/L); motion = bağımlılık/slug tabanlı; Mozaik'te var mı = 193 meta.json + blok slug'ı ile tam/normalize/alt-dize eşleşme (var/benzer/yok). `~` ile biten yol = registry'deki yol ağaçta birebir bulunamadı.
- Veri: [coss.tsv](coss.tsv)
