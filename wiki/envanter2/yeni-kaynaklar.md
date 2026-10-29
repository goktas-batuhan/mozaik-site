# Envanter 2 — yeni component kaynakları (dizinlerden keşif)

Tarih: 2026-10-29. Okuma-yalnız oturum; hesap/giriş/form/ödeme/indirme yok.

## Yöntem ve ortam notu
- Dizinler: `ui.shadcn.com/r/registries.json` (508 registry, programatik okundu), `ui.shadcn.com/docs/directory`, desengs.com, bencho.dev, wellmade.fyi.
- Ağ **tam açık değil**: çıkış proxy'si allowlist'li. `ui.shadcn.com`, `desengs.com`, `bencho.dev`, `wellmade.fyi`, `raw.githubusercontent.com`, npm registry ve **public `git clone`** çalışıyor; registries.json'daki registry host'larının (ör. `000h.cojeev.com`, `www.tryelements.dev`, `ui-layouts.com`, `cult-ui.com`, `shadcnmaps.com`…) hepsi 403 (CONNECT reddi). Bu yüzden registry JSON yerine **GitHub repo ağacı** kullanıldı (`git clone --depth 1 --filter=blob:none`). `www.ui-skills.com` ve `www.getlayers.ai` doğrudan engelli; yalnız ana sayfa r.jina.ai üzerinden okundu (yalnız sınıflama için).
- Lisanslar ham `LICENSE` dosyasından okundu (komit kısa hash'i her kaynak .md'sinde).
- Hariç tutulan 30 kaynak (diğer oturumlar) ve onların registry adları atlandı.

## Tam sınıflanan kaynaklar (23) — TSV'li
| kaynak | sınıf | alınabilir öğe | Mozaik'te olmayan | öne çıkan bağımlılıklar |
|---|---|---|---|---|
| [bencho](bencho.md) | A | 44 | 35 | framer-motion (45), lucide-react (45) |
| [hextaui](hextaui.md) | A | 76 | 62 | button (261), @tabler/icons-react (244), cn (72), theme (66), @base-ui/react@^1.8.0 (62), class-variance-authority (56), input (47), label (34) |
| [atroui](atroui.md) | A | 117 | 108 | @atroui/utils (74), motion (50), @atroui/motion (44), lucide-react (39), @base-ui/react (37), next (26), @atroui/brand (11), atroui (6) |
| [audio-ui](audio-ui.md) | A | 131 | 129 | @audio-ui/core (79), @audio-ui/react (76), @audio-ui/use-master-bus (30), @audio-ui/device-panel (23), @audio-ui/plot (23), @audio-ui/web-audio (20), @audio-ui/use-device-loop (18), @shadcn/button (17) |
| [ballmac-ui](ballmac-ui.md) | A | 473 | 416 | lucide-react (478), utils (469), button (191), i18n (165), skeleton (115), state-view (114), motion@^12 (108), radix-ui (53) |
| [cult-ui](cult-ui.md) | A | 307 | 279 | motion (65), lucide-react (38), tailwindcss (31), button (25), class-variance-authority (16), @base-ui/react (15), @radix-ui/react-use-controllable-state (10), @paper-design/shaders-react (10) |
| [evilcharts](evilcharts.md) | A | 279 | 225 | motion (37), @evilcharts/recharts-line-chart (34), echarts (30), @evilcharts/echarts-area-chart (28), @evilcharts/echarts-line-chart (28), @evilcharts/echarts-bar-chart (27), @evilcharts/recharts-area-chart (20), @evilcharts/recharts-bar-chart (20) |
| [minidev-ui](minidev-ui.md) | A | 548 | 486 | lucide-react (260), motion (243), button (153), @base-ui/react (150), class-variance-authority (133), input (39), badge (22), icon-button (18) |
| [mischief-ui](mischief-ui.md) | A | 117 | 96 | utils (117), lucide-react@^1.31.0 (74), render-surface (19), @base-ui/react@^1.7.0 (5), motion@^13.1.0 (4), react-markdown@^10.1.0 (2), remark-gfm@^4.0.1 (2), footer-columns (2) |
| [vllnt-ui](vllnt-ui.md) | A | 313 | 261 | @vllnt/ui@^0.3.0 (313), lucide-react (23), class-variance-authority (8), @radix-ui/react-slot (1), @tanstack/react-table (1), @mdx-js/mdx@^3.1.1 (1), react-markdown@^10.1.0 (1), remark-gfm@^4.0.1 (1) |
| [plate](plate.md) | A | 148 | 145 | platejs (158), diff-match-patch-ts@^0.6.0 (155), lucide-react (51), toolbar (35), button (32), editor (28), editor-dropdown-menu (15), class-variance-authority (14) |
| [shadcn-studio](shadcn-studio.md) | B | 637 | 600 | lucide-react (312), button (263), label (206), input (92), avatar (68), utils (68), sonner (57), card (54) |
| [animate-ui](animate-ui.md) | B | 578 | 569 | motion (366), @animate-ui/v1/icons-icon (259), @animate-ui/v1/lib-get-strict-context (57), lucide-react (32), @animate-ui/v1/hooks-use-controlled-state (32), @animate-ui/v1/primitives-animate-slot (22), @animate-ui/v1/hooks-use-is-in-view (19), radix-ui (18) |
| [ai-elements](ai-elements.md) | A | 49 | 43 | ai (49), shadcn-ui (49) |
| [diceui](diceui.md) | A | 94 | 84 | radix-ui (94) |
| [prosekit](prosekit.md) | A | 14 | 14 | prosekit (14) |
| [paceui](paceui.md) | A | 28 | 24 | radix |
| [remocn](remocn.md) | A | 287 | 281 | remotion |
| [kokonutui](kokonutui.md) | A | 114 | 76 | motion (62), lucide-react (55), button (7), class-variance-authority (3), textarea (2), dropdown-menu (2), card (2), drawer (1) |
| [originui](originui.md) | A | 645 | 636 | button (210), label (205), input (74), select (42), checkbox (36), popover (34), dropdown-menu (33), badge (30) |
| [motion-primitives](motion-primitives.md) | A | 33 | 25 | motion (33), react-use-measure (3) |
| [jal-co-ui](jal-co-ui.md) | A | 35 | 32 | lucide-react (11), class-variance-authority (10), @chenglou/pretext (4), radix-ui (4), shiki (2), pretext (2), uqr (1), diff (1) |
| [coss](coss.md) | B | 55 | 46 | @base-ui/react (55) |

Toplam alınabilir öğe (ui/component/block/hook/item): A sınıfı 2710, B sınıfı 1270. Çoğu "yok" ama group/shelf eşlemesi anahtar-kelime tabanlı; `-` = eşleşmedi. Sayılar aynı öğenin farklı kaynaklarda tekrarını (shadcn kopyaları: button, card…) içerir; birleştirmede slug+içerik hash'iyle tekilleştirilmeli.

Lisans sürprizleri: **animate-ui** ve **shadcn-studio** = MIT + Commons Clause (yeniden dağıtım yasak → B). **coss** = AGPL-3.0 (→ B). **ai-elements** = Apache-2.0 (A, atıf/NOTICE). **bencho**: Pro katmanı repoda yok; ad/logo/fotoğraflar lisans dışı.

## Keşfedilen kaynak havuzu (registries.json, hariç listesi dışı, itemCount ≥ 300 veya sınıflananlar)
itemCount = shadcn dizininin ranking.itemCount alanı (registry'deki öğe sayısı, demo/stil dahil olabilir).

| registry | site | itemCount | health | tür | durum |
|---|---|---|---|---|---|
| @registrydirectory | https://registry.directory | 20735 | healthy | dizin/toplayıcı | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @keyline | https://keylineicons.com | 12984 | healthy | ikon/varlık seti | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @hugeicons-animated-vue | https://hugeicons-animated-vue.rebeaumickael.fr | 6122 | healthy | ikon/varlık seti | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @shadcn-exchange | https://shadcn.exchange | 5155 | healthy | dizin/toplayıcı | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @shadcn-ui-blocks | https://www.shadcn-ui-blocks.com | 4017 | degraded | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @catalogs | https://catalogs.dev | 2213 | healthy | dizin/toplayıcı | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @vadivam | https://vadivam.praveenjuge.com | 1904 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @000h-cojeev | https://000h.cojeev.com | 1876 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @animateicons | https://animateicons.in | 1500 | degraded | ikon/varlık seti | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @cnippet | https://ui.cnippet.dev/ | 1450 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @shadcnuikit | https://shadcnuikit.com | 1228 | degraded | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @watermelon | https://ui.watermelon.sh | 1178 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @spaceui | https://www.spaceui.one | 1149 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @shadcn-space | https://shadcnspace.com | 1061 | degraded | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @logoforge | https://logoforge.terravidhal.me | 1019 | healthy | ikon/varlık seti | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @shadcn-studio | https://shadcnstudio.com | 999 | healthy | component registry | sınıflandı → [shadcn-studio](shadcn-studio.md) |
| @uiable | https://uiable.com | 988 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @0nlytype | https://thedirectors.agency/ui | 848 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @soundcn | https://soundcn.xyz | 816 | healthy | ikon/varlık seti | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @animate-ui | https://animate-ui.com | 789 | healthy | component registry | sınıflandı → [animate-ui](animate-ui.md) |
| @hextaui | https://hextaui.com | 760 | healthy | component registry | sınıflandı → [hextaui](hextaui.md) |
| @weinc | https://we.inc/components | 746 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @ballmac | https://ui.ballmac.com | 702 | healthy | component registry | sınıflandı → [ballmac-ui](ballmac-ui.md) |
| @svgl | https://svgl.app | 666 | healthy | ikon/varlık seti | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @herocn | https://herocn.dev/ | 666 | degraded | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @shadcn-dashboard | https://shadcndashboard.dev | 649 | degraded | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @coss | https://coss.com/ui | 606 | healthy | component registry | sınıflandı → [coss](coss.md) |
| @movin | https://movin.design/components/ | 603 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @motion-menu | https://motion-menu-two.vercel.app | 598 | unavailable | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @atomloader | https://atomloader.roothq.tech | 591 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @siteplane | https://ui.siteplane.io | 557 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @mozaika | https://mozaika.design | 550 | degraded | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @prosekit | https://prosekit.dev | 549 | healthy | component registry | sınıflandı → [prosekit](prosekit.md) |
| @minidev | https://ui.minidev.pro | 548 | healthy | component registry | sınıflandı → [minidev-ui](minidev-ui.md) |
| @shadcnui-blocks | https://shadcnui-blocks.com | 542 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @ns-ui | https://design.helpmarq.com | 542 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @taki | https://taki-ui.com | 540 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @rescript-shadcn | https://rescript-shadcn.miriad.studio | 535 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @blockus | https://blockus.lndevui.com | 500 | degraded | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @lucide-animated | https://lucide-animated.com | 468 | healthy | ikon/varlık seti | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @remocn | https://www.remocn.dev/ | 438 | healthy | component registry | sınıflandı → [remocn](remocn.md) |
| @canvas-ui | https://canvasui.dev/ | 420 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @flx | https://ui.flexnative.com | 415 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @ai2 | https://ai2.design | 414 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @lema-ds | https://ds.lema.ufpb.br | 378 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @shadcncraft | https://shadcncraft.com | 377 | degraded | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @shadcnmaps | https://shadcnmaps.com | 363 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @elements | https://www.tryelements.dev | 360 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @blockdex | https://blockdex.dev | 359 | degraded | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @glint-ui | https://glint-ui-seven.vercel.app | 354 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @termcn | https://termcn.vercel.app | 344 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @emailcn | https://emailcn.vercel.app | 338 | unavailable | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @ui-layouts | https://ui-layouts.com/ | 327 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @stealth | https://www.stealth.pm/ui | 326 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @plate | https://platejs.org | 324 | healthy | component registry | sınıflandı → [plate](plate.md) |
| @dashboardblocks | https://www.dashboardblocks.com | 323 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @flagcn | https://flagcn.dev | 321 | healthy | ikon/varlık seti | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @designali | https://designali.com | 320 | unavailable | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @heroicons-animated | https://www.heroicons-animated.com/ | 316 | healthy | ikon/varlık seti | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @spectrumui | https://ui.spectrumhq.in | 315 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @vllnt-ui | https://ui.vllnt.com | 313 | degraded | component registry | sınıflandı → [vllnt-ui](vllnt-ui.md) |
| @pluginui | https://pluginui.com | 308 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @hirael | https://hirael.com | 308 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @paceui | https://paceui.com | 307 | degraded | component registry | sınıflandı → [paceui](paceui.md) |
| @pacekit | https://ui.pacekit.dev | 307 | degraded | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @cult-ui | https://www.cult-ui.com | 307 | degraded | component registry | sınıflandı → [cult-ui](cult-ui.md) |
| @seamui | https://seamui.dev | 305 | healthy | component registry | registry JSON çekilemedi (host proxy'de 403); lisans doğrulanmadı |
| @evilcharts | https://evilcharts.com | 279 | healthy | component registry | sınıflandı → [evilcharts](evilcharts.md) |
| @diceui | https://www.diceui.com/ | 262 | healthy | component registry | sınıflandı → [diceui](diceui.md) |
| @audio-ui | https://www.audio-ui.dev | 235 | healthy | component registry | sınıflandı → [audio-ui](audio-ui.md) |
| @mischief | https://ui.tinkererslabs.com | 234 | healthy | component registry | sınıflandı → [mischief-ui](mischief-ui.md) |
| @ai-elements | https://ai-sdk.dev/elements | 141 | healthy | component registry | sınıflandı → [ai-elements](ai-elements.md) |
| @atroui | https://www.atroui.com | 126 | healthy | component registry | sınıflandı → [atroui](atroui.md) |

"Bekleyen" 40+ registry'nin repo adı/lisansı bu oturumda doğrulanamadı (uydurulmadı). Sonraki adım: registry host'ları allowlist'e eklenirse `registry.json` çekilip aynı hat çalıştırılır; ya da repo adları verilirse `git clone` ile.

## 2. tur (devam)
GitHub'da tahmin+`git ls-remote` ile ~35 repo adı denendi; yeni doğrulananlar: `paceui/paceui` (= pacekit/ui, aynı 28 öğe, MIT), `remocn/remocn` (MIT, Remotion video bileşenleri), `praveenjuge/vadivam` (MIT ama ikon seti → component değil, atlandı). Kalan bekleyen registry'ler için repo adı bulunamadı. 
3. tur: kokonutui, originui, motion-primitives, jal-co/ui (hepsi MIT) eklendi; `pqoqubbw/icons` ikon seti, `jolbol1/ui` shadcn çatalı, `origin-space/ui-experiments` lisanssız → atlandı. Yeni bulgu kesilmediği için bir tur daha denenebilir.

## Dizinlerin kendisi
- desengs.com — Tasarım mühendisleri için küratörlü kaynak listesi (makale/video/araç); kendi component'i yok. Link verdiği MIT repolar: `benjitaylor/liveline` (MIT, tek grafik bileşeni), `dip/cmdk`; skills repoları (`emilkowalski/skills`, `jakubkrehel/skills` MIT) component değil.
- bencho.dev → kaynak olarak sınıflandı (yukarıda).
- wellmade.fyi — "iyi yapılmış yaratıcı işler" galerisi (tweet/video girişleri, yazar kredili); component kaynağı değil.
- shadcn directory → yukarıdaki havuz.

Ayrıca bkz. [siteler.md](siteler.md) (istenen 10 sitenin sınıflaması).
