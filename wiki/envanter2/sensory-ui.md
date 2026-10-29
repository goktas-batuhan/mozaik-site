# sensory-ui.com (SatyamVyas04/sensory-ui)

- Ne: shadcn bileşenlerinin ses (Web Audio) katmanlı sarmalayıcıları; `sensory-ui-core` ses motoru + 24 bileşen.
- Lisans (ham metin): `LICENSE` MIT, "Copyright (c) 2026 Satyam Vyas". **Sınıf A.**
- Sayı: **25** öğe (core + 24 wrapper: accordion, alert-dialog, button, carousel, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, menubar, navigation-menu, pagination, popover, radio-group, select, sheet, sidebar, slider, switch, tabs, toggle, toggle-group, + core). Meta paket `sensory-ui` listelenmedi.
- Bağımlılık: core yalnız `react` (Web Audio, sıfır dep). Wrapper'lar `@/components/ui/<x>` (shadcn, radix/base-ui) ister. Görsel motion yok; ses var.
- Mozaik'te var mı: slug eşleşmesi yok. Mozaik taksonomisinde "ses" rafı yok; ses-tag'i (`sound`) var → öğe eklerken `tags: ["sound"]`.
- Engel: sensory-ui.com'a erişilemedi (egress 403); depo + `components/ui/sensory-ui/registry.json` yeterli.
