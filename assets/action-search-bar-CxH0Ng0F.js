var e=[{name:`items`,type:`CommandItem[]`,required:!0,description:`The commands: { id, label, icon?, group?, keywords?, shortcut?, href?, children?, placeholder? }. Rows with children open a nested page.`},{name:`defaultRecent`,type:`string[]`,default:`[]`,description:`Ids shown under Recent before anything is typed. Running a row adds it.`},{name:`onSelect`,type:`(item: CommandItem, path: CommandItem[]) => unknown`,description:`Called when a row without children is chosen. Return a Promise to show a spinner in the row until it settles.`},{name:`onOpenChange`,type:`(open: boolean) => void`,description:`Called when the palette opens or closes.`},{name:`defaultOpen`,type:`boolean`,default:`false`,description:`Starts with the list open.`},{name:`shortcut`,type:`boolean`,default:`false`,description:`Cmd/Ctrl + K toggles the palette page-wide while it is on screen. By default only while it is focused or hovered.`},{name:`label`,type:`string`,default:`'Search commands'`,description:`Accessible label of the input.`},{name:`placeholder`,type:`string`,default:`'Search or jump to…'`,description:`Input placeholder on the first page.`},{name:`className`,type:`string`,description:`Extra classes for the root element.`}],t=[{name:`action-search-bar.tsx`,lines:1038,html:`<pre class="shiki shiki-themes github-light github-dark-default" style="--shiki-light:#24292e;--shiki-dark:#e6edf3;--shiki-light-bg:#fff;--shiki-dark-bg:#0d1117" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { animate, useReducedMotion, useReducedMotionConfig } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "motion/react"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ChangeEvent,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> FocusEvent,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> KeyboardEvent,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> PointerEvent,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ReactNode,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useCallback,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useEffect,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useId,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useLayoutEffect,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useMemo,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useRef,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useState,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "react"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { cn } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "@/lib/utils"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> CommandItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  id</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  icon</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ReactNode</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Section heading on its page, such as "Actions" or "Links". */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  group</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Extra words the row matches on, without being shown. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  keywords</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[];</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Keys shown at the end of the row, such as ["⌘", "N"]. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  shortcut</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[];</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Marks the row as a link. \`onSelect\` decides how to open it. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  href</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Choosing the row opens these as a nested page instead of running it. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  children</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> CommandItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[];</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Input placeholder while this item's page is open. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  placeholder</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ActionSearchBarProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** The commands, optionally grouped and nested. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  items</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> CommandItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[];</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Ids shown under "Recent" before anything is typed. Running a row adds it. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  defaultRecent</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[];</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">   * Called when a row without children is chosen. Return a Promise to show a</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">   * spinner in the row until it settles; a rejection leaves the palette open.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">   */</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  onSelect</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">item</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> CommandItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">path</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> CommandItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[]) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> unknown</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Called when the palette opens or closes. */</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  onOpenChange</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">open</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> void</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Starts with the list open. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  defaultOpen</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">   * ⌘K / Ctrl+K toggles the palette. By default it only does so while the</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">   * palette is focused or hovered, so the host page keeps its own ⌘K. Set</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">   * \`true\` to take ⌘K page-wide whenever the palette is on screen.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">   */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  shortcut</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Accessible label of the input. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Input placeholder on the first page. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  placeholder</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Extra classes for the root element. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Entry</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  item</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> CommandItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Ancestors below the current page, shown as a "Parent ›" prefix. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  path</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> CommandItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Row</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> Entry</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  key</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  matches</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[];</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  score</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Section</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  key</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  rows</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Row</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> InputSource</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "keyboard"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "pointer"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> EASE_OUT</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "cubic-bezier(0.23, 1, 0.32, 1)"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> HOLD_MS</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 400</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> RECENT_LIMIT</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 3</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/** OS setting, or forced on with &#x3C;MotionConfig reducedMotion="always">. */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> usePrefersReducedMotion</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> os</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useReducedMotion</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> forced</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useReducedMotionConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> Boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(os </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> forced);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/* ---------------------------------------------------------------- icons */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> Svg</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({ </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">className</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">children</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">; </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">children</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ReactNode</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">svg</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      aria-hidden</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"true"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">className</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      fill</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"none"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      stroke</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"currentColor"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      strokeLinecap</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"round"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      strokeLinejoin</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"round"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      strokeWidth</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">2</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      viewBox</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"0 0 24 24"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">children</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">svg</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> SearchIcon</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ({ </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">className</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">className</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">circle</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> cx</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"11"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> cy</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"11"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> r</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"8"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">path</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> d</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"m21 21-4.3-4.3"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> CheckIcon</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ({ </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">className</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">className</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">path</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> d</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"M20 6 9 17l-5-5"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> ChevronRightIcon</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ({ </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">className</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">className</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">path</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> d</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"m9 18 6-6-6-6"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> ArrowUpRightIcon</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ({ </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">className</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">className</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">path</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> d</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"M7 7h10v10M7 17 17 7"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> LoaderIcon</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ({ </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">className</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">className</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">path</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> d</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"M21 12a9 9 0 1 1-6.219-8.56"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/* ---------------------------------------------------------------- matching */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> WORD_BREAK</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> /</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">[\\s\\-_/.]</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> WHITESPACE</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> /</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">\\s</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">/</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">g</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> APPLE_PLATFORM</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> /mac</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">|</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">iphone</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">|</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">ipad/</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">i</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> isWordStart</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">text</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">i</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ||</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> WORD_BREAK</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">test</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(text[i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> ""</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/** The first word start at or after \`from\` that holds \`ch\`, else \`from\`. */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> nextWordStart</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">t</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">ch</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">from</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  for</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> j </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> from; j </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x3C;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> t.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">; j</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (t[j] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ch </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> isWordStart</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(t, j)) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> j;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> from;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> subsequence</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">t</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">q</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">preferWordStarts</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> matches</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> score </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> from </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  for</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> ch</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> of</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> q) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> t.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">indexOf</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(ch, from);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> prev</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> matches.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">at</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">    // Unless it continues a run, jump ahead to a word start holding \`ch\`.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (preferWordStarts </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (prev </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> prev </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> nextWordStart</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(t, ch, i);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    score </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> prev </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> prev </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 6</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    score </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> isWordStart</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(t, i) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 8</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    score </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> prev </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0.5</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> prev </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0.2</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    matches.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(i);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    from </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { score, matches };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E"> * Fuzzy match. Returns the matched character indices and a score that favours</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E"> * contiguous runs, word starts and early matches; null when \`query\` is not a</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E"> * subsequence of \`text\`.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E"> */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> fuzzyMatch</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  text</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  query</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">score</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">; </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">matches</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[] } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">|</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> t</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> text.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">toLowerCase</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> q</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> query.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">toLowerCase</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">WHITESPACE</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">""</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">q) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { score: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, matches: [] };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> at</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> t.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">indexOf</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(q);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (at </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">>=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> matches</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Array.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({ length: q.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }, (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">_</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">k</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> at </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> k);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { score: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">100</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> at </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">isWordStart</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(t, at) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 30</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">), matches };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> subsequence</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(t, q, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> subsequence</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(t, q, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> scoreEntry</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">entry</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Entry</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">query</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> onLabel</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> fuzzyMatch</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(entry.item.label, query);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (onLabel) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> onLabel;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // Parent labels and keywords still find the row, ranked lower, unbolded.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> extra</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    ...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">entry.path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> p.label),</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    ...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(entry.item.keywords </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> []),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  ];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> best</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  for</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> word</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> of</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> extra) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> hit</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> fuzzyMatch</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(word, query);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (hit </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (best </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> hit.score </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> best)) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      best </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> hit.score;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> best </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { score: best </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, matches: [] };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/* ---------------------------------------------------------------- sections */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> flatten</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">items</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> CommandItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[], </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">path</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> CommandItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [])</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Entry</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[] {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> out</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Entry</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  for</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> item</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> of</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> items) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({ item, path });</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (item.children) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">flatten</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(item.children, [</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">path, item]));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> out;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> groupRows</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">rows</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Row</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[], </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">fallback</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Section</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[] {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> byGroup</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> Map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">Row</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[]>();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  for</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> row</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> of</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rows) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> row.path[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">]?.group </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> row.item.group </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> fallback </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> ""</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> list</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> byGroup.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(label) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    list.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(row);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    byGroup.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(label, list);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">byGroup].</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(([</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">label</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">list</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">]) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    key: label </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "items"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    label: label </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    rows: list,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> buildSections</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  page</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> CommandItem</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  rootItems</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> CommandItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[],</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  query</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  recent</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Entry</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Section</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[] {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> items</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> page?.children </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rootItems;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> fallback</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> page?.label;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">query.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">trim</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> rows</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> items.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">Row</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">item</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      item,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      path: [],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      key: item.id,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      matches: [],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      score: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }));</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> sections</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> groupRows</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(rows, fallback);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">page </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> recent.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      sections.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">unshift</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        key: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"recent"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"Recent"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        rows: recent.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ({</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          ...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">e,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          key: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">\`recent-\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">e</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">item</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">id</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          matches: [],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          score: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        })),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> sections;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // Searching from a page also reaches the rows nested inside it.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> rows</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Row</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  for</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> entry</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> of</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> flatten</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(items)) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> hit</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> scoreEntry</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(entry, query);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (hit) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      rows.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({ </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">entry, key: entry.item.id, </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">hit });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> sections</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> groupRows</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(rows, fallback);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  for</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> section</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> of</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> sections) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    section.rows.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">sort</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">b</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> b.score </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> a.score);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> sections;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> findEntry</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">items</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> CommandItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[], </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">id</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Entry</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> flatten</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(items).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">find</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> e.item.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> id);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/* ---------------------------------------------------------------- pieces */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> Highlighted</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({ </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">text</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">matches</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">text</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">; </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">matches</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[] }) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (matches.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> &#x3C;></span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">text</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;/>;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> hit</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> Set</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(matches);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> parts</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">start</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">; </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">text</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">; </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">on</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }[] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  for</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">; i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x3C;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> text.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">; i</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> on</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> hit.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">has</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(i);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> last</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> parts.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">at</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (last </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> last.on </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> on) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      last.text </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> text[i];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      parts.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({ start: i, text: text[i] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> ""</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, on });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">parts.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        p.on </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">b</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"font-semibold text-foreground"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            key</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">p.start</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">            {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">p.text</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">b</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        ) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> key</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">p.start</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">p.text</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> Kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({ </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">children</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">children</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ReactNode</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">kbd</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1 font-sans text-[11px] text-muted-foreground"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">children</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> RowEnd</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  item</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  status</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  item</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> CommandItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  status</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "pending"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "done"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (status </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "pending"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">LoaderIcon</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"size-4 animate-spin text-muted-foreground motion-reduce:animate-none"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (status </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "done"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">CheckIcon</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"size-4 text-foreground"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (item.children) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">ChevronRightIcon</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"size-4 text-muted-foreground"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> />;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (item.href) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">ArrowUpRightIcon</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"size-4 text-muted-foreground"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> />;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (item.shortcut) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> aria-hidden</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"true"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex gap-0.5"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">        {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">item.shortcut.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">key</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Kbd</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> key</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">key</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">key</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        ))</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> isPaletteCombo</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> globalThis</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">KeyboardEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    (e.metaKey </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> e.ctrlKey) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">e.altKey </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">e.shiftKey </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    e.key.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">toLowerCase</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "k"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/** Focus sits in an open modal dialog that does not hold the palette. */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> inOtherModal</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">focused</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Element</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">root</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> HTMLElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> modal</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> focused?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">closest</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'[aria-modal="true"]'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> Boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(modal </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">modal.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">contains</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(root));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useIsMac</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">mac</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">setMac</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setMac</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">APPLE_PLATFORM</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">test</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(navigator.userAgent));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }, []);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> mac;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/* ---------------------------------------------------------------- palette */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/** A command palette in a search bar: fuzzy match, nested pages, recent rows and in-row progress. */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> ActionSearchBar</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  items</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  defaultRecent</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [],</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  onSelect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  onOpenChange</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  defaultOpen</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  shortcut</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "Search commands"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  placeholder</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "Search or jump to…"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  className</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ActionSearchBarProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> uid</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useId</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> inputId</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> \`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">uid</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}-input\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> listboxId</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> \`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">uid</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}-listbox\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> optionId</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">index</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> \`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">uid</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}-option-\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">index</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> reduce</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> usePrefersReducedMotion</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> isMac</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useIsMac</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">open</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">setOpen</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(defaultOpen);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">query</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">setQuery</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">""</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">stack</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">setStack</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">CommandItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[]>([]);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">activeIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">setActiveIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">running</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">setRunning</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;{</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">    key</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">    phase</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "pending"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "done"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">|</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">recentIds</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">setRecentIds</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(defaultRecent);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">announcement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">setAnnouncement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">""</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> rootRef</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLDivElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> inputRef</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLInputElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> panelRef</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLDivElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> bodyRef</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLDivElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> contentRef</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLDivElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> listRef</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLDivElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> onScreenRef</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> hoverRef</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> fadeNextOpen</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> slideNext</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> useRef</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> springUntil</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> returnFocus</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLElement</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> holdTimer</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">number</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> runToken</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> page</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> stack.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">at</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> recent</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useMemo</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      recentIds</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> findEntry</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(items, id))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">filter</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657"> e</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> is</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Entry</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> e </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">e.item.children)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">slice</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">RECENT_LIMIT</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    [recentIds, items]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  );</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> sections</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useMemo</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> buildSections</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(page, items, query, recent),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    [page, items, query, recent]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  );</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> rows</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useMemo</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> sections.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">flatMap</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">s</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> s.rows), [sections]);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> highlighted</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">min</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(activeIndex, rows.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> activeRow</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> open </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rows[highlighted] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /* -- open / close -- */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> setOpenState</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useCallback</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">next</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      setOpen</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(next);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      onOpenChange</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">?.(next);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    [onOpenChange]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  );</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> openPalette</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useCallback</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">source</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> InputSource</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (open) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      fadeNextOpen.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> source </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "pointer"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      setActiveIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      setOpenState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    [open, setOpenState]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  );</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> closePalette</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useCallback</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">restoreFocus</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">clearTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(holdTimer.current);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      runToken.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      setRunning</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      setOpenState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      setQuery</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">""</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      setStack</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">([]);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      setActiveIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> target</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> returnFocus.current;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      returnFocus.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (restoreFocus </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> target?.isConnected) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        target.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">focus</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    [setOpenState]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  );</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">clearTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(holdTimer.current), []);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /* -- ⌘K, only while the palette is on screen -- */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> root</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rootRef.current;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">root) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> io</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> IntersectionObserver</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(([</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">entry</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">]) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      onScreenRef.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> entry?.isIntersecting </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    io.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">observe</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(root);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> io.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">disconnect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> hotkeyState</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({ open, openPalette, closePalette });</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    hotkeyState.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { open, openPalette, closePalette };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> onKey</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> globalThis</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">KeyboardEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> root</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rootRef.current;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">isPaletteCombo</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(e) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> root </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> onScreenRef.current) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        e.defaultPrevented</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> focused</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> document.activeElement;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> focusedInside</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> focused </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">instanceof</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Node</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> root.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">contains</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(focused);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(shortcut </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> focusedInside </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> hoverRef.current)) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">inOtherModal</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(focused, root)) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      e.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">preventDefault</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      e.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">stopPropagation</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> state</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> hotkeyState.current;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (state.open) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        state.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">closePalette</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (focused </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">instanceof</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> HTMLElement</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">focusedInside) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        returnFocus.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> focused;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      inputRef.current?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">focus</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      inputRef.current?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">select</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      state.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">openPalette</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"keyboard"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    };</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">    // Capture, so the host page's ⌘K does not also fire when this one takes it.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"keydown"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, onKey, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">removeEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"keydown"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, onKey, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }, [shortcut]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /* -- motion: fade on pointer open; slide + spring on pointer page change -- */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useLayoutEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> panel</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> panelRef.current;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(open </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> panel </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> fadeNextOpen.current)) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    fadeNextOpen.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (reduce </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> typeof</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> panel.animate </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "function"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    panel.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">animate</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">([{ opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }, { opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }], {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      duration: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">120</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      easing: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">EASE_OUT</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }, [open, reduce]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useLayoutEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> body</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> bodyRef.current;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> content</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> contentRef.current;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(open </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> body </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> content)) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> controls</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ReturnType</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">typeof</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> animate> </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">|</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> fitHeight</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> h</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> \`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">content</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">offsetHeight</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}px\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      controls?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">stop</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">reduce </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> performance.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">now</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x3C;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> springUntil.current) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        controls </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> animate</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          body,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          { height: h },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          { type: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"spring"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, bounce: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, duration: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0.32</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        body.style.height </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> h;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    };</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    fitHeight</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> ro</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> ResizeObserver</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(fitHeight);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    ro.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">observe</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(content);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ro.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">disconnect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      controls?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">stop</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }, [open, reduce]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useLayoutEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> list</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> listRef.current;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> dir</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> slideNext.current;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    slideNext.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">list </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> dir </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> reduce </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> typeof</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> list.animate </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "function"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    list.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">animate</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          transform: reduce </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "none"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> \`translateX(\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">dir</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> *</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 14</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}px)\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        { transform: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"none"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      { duration: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">200</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, easing: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">EASE_OUT</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }, [stack.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // Keep the highlighted row inside the list's scroll box (never the page).</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useLayoutEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> list</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> listRef.current;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> row</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">getElementById</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">optionId</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(highlighted));</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(open </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> list </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> row)) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> top</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> row.offsetTop;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> bottom</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> top </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> row.offsetHeight;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (top </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x3C;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> list.scrollTop </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 6</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      list.scrollTop </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> top </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 30</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">else</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (bottom </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> list.scrollTop </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> list.clientHeight </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 6</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      list.scrollTop </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> bottom </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> list.clientHeight </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 6</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }, [open, highlighted, sections]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /* -- pages -- */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> pushPage</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">item</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> CommandItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">source</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> InputSource</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (source </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "pointer"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      slideNext.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      springUntil.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> performance.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">now</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 150</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setStack</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">s</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">s, item]);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setQuery</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">""</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setActiveIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setAnnouncement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">\`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">item</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">label</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}, \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">item</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">children</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">?.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ??</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">} options\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> popPage</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">source</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> InputSource</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> left</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> stack.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">at</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">left) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (source </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "pointer"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      slideNext.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      springUntil.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> performance.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">now</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 150</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> nextStack</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> stack.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">slice</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setStack</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(nextStack);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setQuery</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">""</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">    // Land back on the row that opened the page.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> back</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> buildSections</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(nextStack.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">at</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">), items, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">""</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, recent)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">flatMap</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">s</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> s.rows)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">findIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">r</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> r.key </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> left.id);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setActiveIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">max</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, back));</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setAnnouncement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(nextStack.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">at</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)?.label </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "All commands"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    inputRef.current?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">focus</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /* -- running -- */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> finishRun</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">row</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Row</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">token</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (token </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> runToken.current) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setRunning</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({ key: row.key, phase: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"done"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> });</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setAnnouncement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">\`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">row</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">item</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">label</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}, done\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    holdTimer.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">setTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (token </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> runToken.current) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      setRecentIds</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">ids</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        [row.item.id, </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">ids.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">filter</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> id </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> row.item.id)].</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">slice</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">          0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">          RECENT_LIMIT</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      );</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      closePalette</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(returnFocus.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">HOLD_MS</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> runRow</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">row</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Row</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    runToken.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> token</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> runToken.current;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> result</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> onSelect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">?.(row.item, [</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">stack, </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">row.path]);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(result </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">instanceof</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      finishRun</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(row, token);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setRunning</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({ key: row.key, phase: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"pending"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> });</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setAnnouncement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">\`Running \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">row</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">item</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">label</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    result.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> finishRun</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(row, token),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (token </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> runToken.current) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">          setRunning</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">          setAnnouncement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">\`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">row</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">item</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">label</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">} failed\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> choose</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">row</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Row</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">source</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> InputSource</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (running) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (row.item.children) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      pushPage</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(row.item, source);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      runRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(row);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /* -- input -- */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> moveHighlight</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">step</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> count</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rows.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (count </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      setActiveIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">max</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(highlighted, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> step </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> count) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> count);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> handleNavKey</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> KeyboardEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLInputElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">open) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      e.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">preventDefault</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      openPalette</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"keyboard"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (rows.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    e.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">preventDefault</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (e.key </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "Home"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> e.key </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "End"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      setActiveIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(e.key </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "Home"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rows.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      moveHighlight</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(e.key </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "ArrowDown"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> handleEnter</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> KeyboardEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLInputElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    e.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">preventDefault</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">open) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      openPalette</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"keyboard"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">else</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (activeRow) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      choose</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(activeRow, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"keyboard"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> handleEscape</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> KeyboardEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLInputElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (open) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      e.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">preventDefault</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      closePalette</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">else</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (query) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      setQuery</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">""</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> handleKeyDown</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> KeyboardEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLInputElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (running </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> e.key </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "Tab"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      e.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">preventDefault</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    switch</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (e.key) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      case</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "ArrowDown"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      case</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "ArrowUp"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      case</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "Home"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      case</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "End"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">        handleNavKey</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(e);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        break</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      case</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "Enter"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">        handleEnter</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(e);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        break</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      case</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "Backspace"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (open </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> query </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> ""</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> stack.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          e.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">preventDefault</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">          popPage</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"keyboard"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        break</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      case</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "Escape"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">        handleEscape</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(e);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        break</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      default</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        break</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> handleChange</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ChangeEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLInputElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setQuery</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(e.target.value);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setActiveIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    openPalette</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"keyboard"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> handleInputPointerDown</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> PointerEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLInputElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (e.button </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      openPalette</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"pointer"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // Close when focus leaves the whole palette (Tab away, click outside).</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> handleBlur</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> FocusEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLDivElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> next</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> e.relatedTarget;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (open </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(next </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">instanceof</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Node</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> e.currentTarget.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">contains</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(next))) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      returnFocus.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      closePalette</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> pagePlaceholder</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> page</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (page.placeholder </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> \`Search \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">page</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">label</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">toLowerCase</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">()</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}…\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    :</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> placeholder;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rowIndex </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"relative h-[46px] w-full max-w-md"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, className)</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      onBlur</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">handleBlur</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      onPointerEnter</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        hoverRef.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> e.pointerType </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "mouse"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      onPointerLeave</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        hoverRef.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      ref</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">rootRef</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">          "@container/palette absolute inset-x-0 top-0 z-30 overflow-hidden rounded-xl border border-border bg-card text-card-foreground"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          open</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">            ?</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "shadow-lg"</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">            :</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "shadow-xs"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex h-11 items-center gap-2 px-3"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">SearchIcon</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"size-4 shrink-0 text-muted-foreground"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">          {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">stack.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">i</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">button</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">              aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">\`Back from \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">p</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">label</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">              className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"inline-flex h-6 shrink-0 items-center rounded-md bg-muted px-2 font-medium text-xs text-foreground hover:bg-foreground/10"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">              key</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">p.id</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">              onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">                if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> stack.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">running) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">                  popPage</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"pointer"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">              // Keep focus in the input; Backspace is the keyboard path.</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">              onPointerDown</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> e.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">preventDefault</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">              tabIndex</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">              type</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"button"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">              {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">p.label</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          ))</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">label</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"sr-only"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> htmlFor</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">inputId</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">            {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">label</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">label</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">input</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            aria-activedescendant</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              activeRow </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> optionId</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(highlighted) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">            }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            aria-autocomplete</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"list"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            aria-controls</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">open </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> listboxId </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            aria-expanded</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">open</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            autoComplete</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"off"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"h-full min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            id</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">inputId</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            onChange</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">handleChange</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            onKeyDown</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">handleKeyDown</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            onPointerDown</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">handleInputPointerDown</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            placeholder</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">pagePlaceholder</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            readOnly</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">running </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            ref</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">inputRef</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            role</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"combobox"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            spellCheck</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            type</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"text"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            value</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">query</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">          {</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">open </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> aria-hidden</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"true"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex shrink-0 gap-0.5"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">isMac </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "⌘"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "Ctrl"</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>K&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">        {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">open </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">            // Keep focus in the input while pressing inside the list, so its</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">            // blur never closes the palette before the click lands.</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            onPointerDown</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> e.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">preventDefault</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            ref</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">panelRef</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"border-border border-t"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"overflow-hidden"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> ref</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">bodyRef</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> ref</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">contentRef</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                  aria-busy</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">running?.phase </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "pending"</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                  aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">page </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> page.label </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "Commands"</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                  className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"relative max-h-72 overflow-y-auto overscroll-contain p-1.5"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                  id</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">listboxId</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                  ref</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">listRef</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                  role</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"listbox"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                  {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">sections.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">section</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                      aria-labelledby</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                        section.label </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> \`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">uid</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}-\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">section</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">key</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}\`</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                      }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                      key</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">section.key</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                      role</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"group"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                    ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                      {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">section.label </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                          className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"px-2 pt-2 pb-1 font-medium text-[11px] text-muted-foreground"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                          id</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">\`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">uid</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}-\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">section</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">key</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                          role</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"presentation"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                        ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                          {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">section.label</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                      )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                      {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">section.rows.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">row</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                        rowIndex </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">                        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> index</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rowIndex;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">                        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> status</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                          running?.key </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> row.key </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> running.phase </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">                        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                            aria-disabled</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">running </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">status</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                            aria-selected</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">index </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> highlighted</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                            className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"group/row flex h-9 cursor-default items-center gap-2.5 rounded-md px-2 text-sm text-foreground aria-disabled:opacity-50 aria-selected:bg-muted"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                            id</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">optionId</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(index)</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                            key</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">row.key</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                            onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> choose</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(row, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"pointer"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                            onPointerMove</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">                              if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                                e.pointerType </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "mouse"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">                                !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">running </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                                index </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> highlighted</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                              ) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">                                setActiveIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(index);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                              }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                            }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                            role</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"option"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                          ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                              aria-hidden</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"true"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                              className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex size-4 shrink-0 items-center justify-center text-muted-foreground group-aria-selected/row:text-foreground"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                            ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                              {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">row.item.icon</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                            &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"min-w-0 flex-1 truncate"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                              {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">row.path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                                &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                                  className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"text-muted-foreground"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                                  key</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">p.id</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                                ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                                  {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">p.label</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                                  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> aria-hidden</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"true"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">> › &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                                &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                              ))</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                              &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Highlighted</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                                matches</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">row.matches</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                                text</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">row.item.label</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                              /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                              {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">row.item.children </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                                &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"sr-only"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>, opens a page&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                              )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                            &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex shrink-0 items-center"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                              &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">RowEnd</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> item</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">row.item</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> status</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">status</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                            &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                          &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                        );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                      })</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                  ))</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">rows.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"px-3 pt-1 pb-6 text-center text-sm text-muted-foreground"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                    No results for “</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">query.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">trim</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">”</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                  &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex items-center justify-between gap-3 border-border border-t px-3 py-2 text-[11px] text-muted-foreground"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex items-center gap-1.5"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"@xs/palette:flex hidden items-center gap-1.5"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>↑&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>↓&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"mr-1.5"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>Navigate&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>↵&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">activeRow?.item.children </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "Open"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "Run"</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex items-center gap-1.5"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">stack.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                  &#x3C;></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                    &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>⌫&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"mr-1.5"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>Back&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                  &#x3C;/></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>esc&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>Close&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> aria-live</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"polite"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"sr-only"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">        {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">announcement</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span></code></pre>`,raw:`import { animate, useReducedMotion, useReducedMotionConfig } from "motion/react";
import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export interface CommandItem {
  id: string;
  label: string;
  icon?: ReactNode;
  /** Section heading on its page, such as "Actions" or "Links". */
  group?: string;
  /** Extra words the row matches on, without being shown. */
  keywords?: string[];
  /** Keys shown at the end of the row, such as ["⌘", "N"]. */
  shortcut?: string[];
  /** Marks the row as a link. \`onSelect\` decides how to open it. */
  href?: string;
  /** Choosing the row opens these as a nested page instead of running it. */
  children?: CommandItem[];
  /** Input placeholder while this item's page is open. */
  placeholder?: string;
}

export interface ActionSearchBarProps {
  /** The commands, optionally grouped and nested. */
  items: CommandItem[];
  /** Ids shown under "Recent" before anything is typed. Running a row adds it. */
  defaultRecent?: string[];
  /**
   * Called when a row without children is chosen. Return a Promise to show a
   * spinner in the row until it settles; a rejection leaves the palette open.
   */
  onSelect?: (item: CommandItem, path: CommandItem[]) => unknown;
  /** Called when the palette opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Starts with the list open. */
  defaultOpen?: boolean;
  /**
   * ⌘K / Ctrl+K toggles the palette. By default it only does so while the
   * palette is focused or hovered, so the host page keeps its own ⌘K. Set
   * \`true\` to take ⌘K page-wide whenever the palette is on screen.
   */
  shortcut?: boolean;
  /** Accessible label of the input. */
  label?: string;
  /** Input placeholder on the first page. */
  placeholder?: string;
  /** Extra classes for the root element. */
  className?: string;
}

interface Entry {
  item: CommandItem;
  /** Ancestors below the current page, shown as a "Parent ›" prefix. */
  path: CommandItem[];
}

interface Row extends Entry {
  key: string;
  matches: number[];
  score: number;
}

interface Section {
  key: string;
  label?: string;
  rows: Row[];
}

type InputSource = "keyboard" | "pointer";

const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const HOLD_MS = 400;
const RECENT_LIMIT = 3;

/** OS setting, or forced on with <MotionConfig reducedMotion="always">. */
function usePrefersReducedMotion() {
  const os = useReducedMotion();
  const forced = useReducedMotionConfig();
  return Boolean(os || forced);
}

/* ---------------------------------------------------------------- icons */

function Svg({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  );
}

const SearchIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </Svg>
);
const CheckIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M20 6 9 17l-5-5" />
  </Svg>
);
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="m9 18 6-6-6-6" />
  </Svg>
);
const ArrowUpRightIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M7 7h10v10M7 17 17 7" />
  </Svg>
);
const LoaderIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </Svg>
);

/* ---------------------------------------------------------------- matching */

const WORD_BREAK = /[\\s\\-_/.]/;
const WHITESPACE = /\\s+/g;
const APPLE_PLATFORM = /mac|iphone|ipad/i;

const isWordStart = (text: string, i: number) =>
  i === 0 || WORD_BREAK.test(text[i - 1] ?? "");

/** The first word start at or after \`from\` that holds \`ch\`, else \`from\`. */
function nextWordStart(t: string, ch: string, from: number) {
  for (let j = from; j < t.length; j++) {
    if (t[j] === ch && isWordStart(t, j)) {
      return j;
    }
  }
  return from;
}

function subsequence(t: string, q: string, preferWordStarts: boolean) {
  const matches: number[] = [];
  let score = 0;
  let from = 0;
  for (const ch of q) {
    let i = t.indexOf(ch, from);
    if (i < 0) {
      return null;
    }
    const prev = matches.at(-1);
    // Unless it continues a run, jump ahead to a word start holding \`ch\`.
    if (preferWordStarts && (prev === undefined || i !== prev + 1)) {
      i = nextWordStart(t, ch, i);
    }
    score += prev !== undefined && i === prev + 1 ? 6 : 1;
    score += isWordStart(t, i) ? 8 : 0;
    score -= prev === undefined ? i * 0.5 : (i - prev - 1) * 0.2;
    matches.push(i);
    from = i + 1;
  }
  return { score, matches };
}

/**
 * Fuzzy match. Returns the matched character indices and a score that favours
 * contiguous runs, word starts and early matches; null when \`query\` is not a
 * subsequence of \`text\`.
 */
export function fuzzyMatch(
  text: string,
  query: string
): { score: number; matches: number[] } | null {
  const t = text.toLowerCase();
  const q = query.toLowerCase().replace(WHITESPACE, "");
  if (!q) {
    return { score: 0, matches: [] };
  }
  const at = t.indexOf(q);
  if (at >= 0) {
    const matches = Array.from({ length: q.length }, (_, k) => at + k);
    return { score: 100 - at + (isWordStart(t, at) ? 30 : 0), matches };
  }
  return subsequence(t, q, true) ?? subsequence(t, q, false);
}

function scoreEntry(entry: Entry, query: string) {
  const onLabel = fuzzyMatch(entry.item.label, query);
  if (onLabel) {
    return onLabel;
  }
  // Parent labels and keywords still find the row, ranked lower, unbolded.
  const extra = [
    ...entry.path.map((p) => p.label),
    ...(entry.item.keywords ?? []),
  ];
  let best: number | null = null;
  for (const word of extra) {
    const hit = fuzzyMatch(word, query);
    if (hit && (best === null || hit.score > best)) {
      best = hit.score;
    }
  }
  return best === null ? null : { score: best / 2, matches: [] };
}

/* ---------------------------------------------------------------- sections */

function flatten(items: CommandItem[], path: CommandItem[] = []): Entry[] {
  const out: Entry[] = [];
  for (const item of items) {
    out.push({ item, path });
    if (item.children) {
      out.push(...flatten(item.children, [...path, item]));
    }
  }
  return out;
}

function groupRows(rows: Row[], fallback?: string): Section[] {
  const byGroup = new Map<string, Row[]>();
  for (const row of rows) {
    const label = row.path[0]?.group ?? row.item.group ?? fallback ?? "";
    const list = byGroup.get(label) ?? [];
    list.push(row);
    byGroup.set(label, list);
  }
  return [...byGroup].map(([label, list]) => ({
    key: label || "items",
    label: label || undefined,
    rows: list,
  }));
}

function buildSections(
  page: CommandItem | undefined,
  rootItems: CommandItem[],
  query: string,
  recent: Entry[]
): Section[] {
  const items = page?.children ?? rootItems;
  const fallback = page?.label;

  if (!query.trim()) {
    const rows = items.map<Row>((item) => ({
      item,
      path: [],
      key: item.id,
      matches: [],
      score: 0,
    }));
    const sections = groupRows(rows, fallback);
    if (!page && recent.length > 0) {
      sections.unshift({
        key: "recent",
        label: "Recent",
        rows: recent.map((e) => ({
          ...e,
          key: \`recent-\${e.item.id}\`,
          matches: [],
          score: 0,
        })),
      });
    }
    return sections;
  }

  // Searching from a page also reaches the rows nested inside it.
  const rows: Row[] = [];
  for (const entry of flatten(items)) {
    const hit = scoreEntry(entry, query);
    if (hit) {
      rows.push({ ...entry, key: entry.item.id, ...hit });
    }
  }
  const sections = groupRows(rows, fallback);
  for (const section of sections) {
    section.rows.sort((a, b) => b.score - a.score);
  }
  return sections;
}

function findEntry(items: CommandItem[], id: string): Entry | undefined {
  return flatten(items).find((e) => e.item.id === id);
}

/* ---------------------------------------------------------------- pieces */

function Highlighted({ text, matches }: { text: string; matches: number[] }) {
  if (matches.length === 0) {
    return <>{text}</>;
  }
  const hit = new Set(matches);
  const parts: { start: number; text: string; on: boolean }[] = [];
  for (let i = 0; i < text.length; i++) {
    const on = hit.has(i);
    const last = parts.at(-1);
    if (last && last.on === on) {
      last.text += text[i];
    } else {
      parts.push({ start: i, text: text[i] ?? "", on });
    }
  }
  return (
    <>
      {parts.map((p) =>
        p.on ? (
          <b
            className="font-semibold text-foreground"
            key={p.start}
          >
            {p.text}
          </b>
        ) : (
          <span key={p.start}>{p.text}</span>
        )
      )}
    </>
  );
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1 font-sans text-[11px] text-muted-foreground">
      {children}
    </kbd>
  );
}

function RowEnd({
  item,
  status,
}: {
  item: CommandItem;
  status: "pending" | "done" | undefined;
}) {
  if (status === "pending") {
    return (
      <LoaderIcon className="size-4 animate-spin text-muted-foreground motion-reduce:animate-none" />
    );
  }
  if (status === "done") {
    return (
      <CheckIcon className="size-4 text-foreground" />
    );
  }
  if (item.children) {
    return <ChevronRightIcon className="size-4 text-muted-foreground" />;
  }
  if (item.href) {
    return <ArrowUpRightIcon className="size-4 text-muted-foreground" />;
  }
  if (item.shortcut) {
    return (
      <span aria-hidden="true" className="flex gap-0.5">
        {item.shortcut.map((key) => (
          <Kbd key={key}>{key}</Kbd>
        ))}
      </span>
    );
  }
  return null;
}

function isPaletteCombo(e: globalThis.KeyboardEvent) {
  return (
    (e.metaKey || e.ctrlKey) &&
    !e.altKey &&
    !e.shiftKey &&
    e.key.toLowerCase() === "k"
  );
}

/** Focus sits in an open modal dialog that does not hold the palette. */
function inOtherModal(focused: Element | null, root: HTMLElement) {
  const modal = focused?.closest('[aria-modal="true"]');
  return Boolean(modal && !modal.contains(root));
}

function useIsMac() {
  const [mac, setMac] = useState(true);
  useEffect(() => {
    setMac(APPLE_PLATFORM.test(navigator.userAgent));
  }, []);
  return mac;
}

/* ---------------------------------------------------------------- palette */

/** A command palette in a search bar: fuzzy match, nested pages, recent rows and in-row progress. */
export function ActionSearchBar({
  items,
  defaultRecent = [],
  onSelect,
  onOpenChange,
  defaultOpen = false,
  shortcut = false,
  label = "Search commands",
  placeholder = "Search or jump to…",
  className,
}: ActionSearchBarProps) {
  const uid = useId();
  const inputId = \`\${uid}-input\`;
  const listboxId = \`\${uid}-listbox\`;
  const optionId = (index: number) => \`\${uid}-option-\${index}\`;

  const reduce = usePrefersReducedMotion();
  const isMac = useIsMac();

  const [open, setOpen] = useState(defaultOpen);
  const [query, setQuery] = useState("");
  const [stack, setStack] = useState<CommandItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [running, setRunning] = useState<{
    key: string;
    phase: "pending" | "done";
  } | null>(null);
  const [recentIds, setRecentIds] = useState(defaultRecent);
  const [announcement, setAnnouncement] = useState("");

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const onScreenRef = useRef(true);
  const hoverRef = useRef(false);
  const fadeNextOpen = useRef(false);
  const slideNext = useRef<0 | 1 | -1>(0);
  const springUntil = useRef(0);
  const returnFocus = useRef<HTMLElement | null>(null);
  const holdTimer = useRef<number | undefined>(undefined);
  const runToken = useRef(0);

  const page = stack.at(-1);
  const recent = useMemo(
    () =>
      recentIds
        .map((id) => findEntry(items, id))
        .filter((e): e is Entry => e !== undefined && !e.item.children)
        .slice(0, RECENT_LIMIT),
    [recentIds, items]
  );
  const sections = useMemo(
    () => buildSections(page, items, query, recent),
    [page, items, query, recent]
  );
  const rows = useMemo(() => sections.flatMap((s) => s.rows), [sections]);
  const highlighted = Math.min(activeIndex, rows.length - 1);
  const activeRow = open ? rows[highlighted] : undefined;

  /* -- open / close -- */

  const setOpenState = useCallback(
    (next: boolean) => {
      setOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange]
  );

  const openPalette = useCallback(
    (source: InputSource) => {
      if (open) {
        return;
      }
      fadeNextOpen.current = source === "pointer";
      setActiveIndex(0);
      setOpenState(true);
    },
    [open, setOpenState]
  );

  const closePalette = useCallback(
    (restoreFocus: boolean) => {
      window.clearTimeout(holdTimer.current);
      runToken.current += 1;
      setRunning(null);
      setOpenState(false);
      setQuery("");
      setStack([]);
      setActiveIndex(0);
      const target = returnFocus.current;
      returnFocus.current = null;
      if (restoreFocus && target?.isConnected) {
        target.focus();
      }
    },
    [setOpenState]
  );

  useEffect(() => () => window.clearTimeout(holdTimer.current), []);

  /* -- ⌘K, only while the palette is on screen -- */

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      onScreenRef.current = entry?.isIntersecting ?? true;
    });
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const hotkeyState = useRef({ open, openPalette, closePalette });
  useEffect(() => {
    hotkeyState.current = { open, openPalette, closePalette };
  });

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const root = rootRef.current;
      if (
        !(isPaletteCombo(e) && root && onScreenRef.current) ||
        e.defaultPrevented
      ) {
        return;
      }
      const focused = document.activeElement;
      const focusedInside = focused instanceof Node && root.contains(focused);
      if (!(shortcut || focusedInside || hoverRef.current)) {
        return;
      }
      if (inOtherModal(focused, root)) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      const state = hotkeyState.current;
      if (state.open) {
        state.closePalette(true);
        return;
      }
      if (focused instanceof HTMLElement && !focusedInside) {
        returnFocus.current = focused;
      }
      inputRef.current?.focus();
      inputRef.current?.select();
      state.openPalette("keyboard");
    };
    // Capture, so the host page's ⌘K does not also fire when this one takes it.
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [shortcut]);

  /* -- motion: fade on pointer open; slide + spring on pointer page change -- */

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!(open && panel && fadeNextOpen.current)) {
      return;
    }
    fadeNextOpen.current = false;
    if (reduce || typeof panel.animate !== "function") {
      return;
    }
    panel.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 120,
      easing: EASE_OUT,
    });
  }, [open, reduce]);

  useLayoutEffect(() => {
    const body = bodyRef.current;
    const content = contentRef.current;
    if (!(open && body && content)) {
      return;
    }
    let controls: ReturnType<typeof animate> | undefined;
    const fitHeight = () => {
      const h = \`\${content.offsetHeight}px\`;
      controls?.stop();
      if (!reduce && performance.now() < springUntil.current) {
        controls = animate(
          body,
          { height: h },
          { type: "spring", bounce: 0, duration: 0.32 }
        );
      } else {
        body.style.height = h;
      }
    };
    fitHeight();
    const ro = new ResizeObserver(fitHeight);
    ro.observe(content);
    return () => {
      ro.disconnect();
      controls?.stop();
    };
  }, [open, reduce]);

  useLayoutEffect(() => {
    const list = listRef.current;
    const dir = slideNext.current;
    slideNext.current = 0;
    if (!list || dir === 0 || reduce || typeof list.animate !== "function") {
      return;
    }
    list.animate(
      [
        {
          transform: reduce ? "none" : \`translateX(\${dir * 14}px)\`,
          opacity: 0,
        },
        { transform: "none", opacity: 1 },
      ],
      { duration: 200, easing: EASE_OUT }
    );
  }, [stack.length]);

  // Keep the highlighted row inside the list's scroll box (never the page).
  useLayoutEffect(() => {
    const list = listRef.current;
    const row = document.getElementById(optionId(highlighted));
    if (!(open && list && row)) {
      return;
    }
    const top = row.offsetTop;
    const bottom = top + row.offsetHeight;
    if (top < list.scrollTop + 6) {
      list.scrollTop = top - 30;
    } else if (bottom > list.scrollTop + list.clientHeight - 6) {
      list.scrollTop = bottom - list.clientHeight + 6;
    }
  }, [open, highlighted, sections]);

  /* -- pages -- */

  const pushPage = (item: CommandItem, source: InputSource) => {
    if (source === "pointer") {
      slideNext.current = 1;
      springUntil.current = performance.now() + 150;
    }
    setStack((s) => [...s, item]);
    setQuery("");
    setActiveIndex(0);
    setAnnouncement(\`\${item.label}, \${item.children?.length ?? 0} options\`);
  };

  const popPage = (source: InputSource) => {
    const left = stack.at(-1);
    if (!left) {
      return;
    }
    if (source === "pointer") {
      slideNext.current = -1;
      springUntil.current = performance.now() + 150;
    }
    const nextStack = stack.slice(0, -1);
    setStack(nextStack);
    setQuery("");
    // Land back on the row that opened the page.
    const back = buildSections(nextStack.at(-1), items, "", recent)
      .flatMap((s) => s.rows)
      .findIndex((r) => r.key === left.id);
    setActiveIndex(Math.max(0, back));
    setAnnouncement(nextStack.at(-1)?.label ?? "All commands");
    inputRef.current?.focus();
  };

  /* -- running -- */

  const finishRun = (row: Row, token: number) => {
    if (token !== runToken.current) {
      return;
    }
    setRunning({ key: row.key, phase: "done" });
    setAnnouncement(\`\${row.item.label}, done\`);
    holdTimer.current = window.setTimeout(() => {
      if (token !== runToken.current) {
        return;
      }
      setRecentIds((ids) =>
        [row.item.id, ...ids.filter((id) => id !== row.item.id)].slice(
          0,
          RECENT_LIMIT
        )
      );
      closePalette(returnFocus.current !== null);
    }, HOLD_MS);
  };

  const runRow = (row: Row) => {
    runToken.current += 1;
    const token = runToken.current;
    const result = onSelect?.(row.item, [...stack, ...row.path]);
    if (!(result instanceof Promise)) {
      finishRun(row, token);
      return;
    }
    setRunning({ key: row.key, phase: "pending" });
    setAnnouncement(\`Running \${row.item.label}\`);
    result.then(
      () => finishRun(row, token),
      () => {
        if (token === runToken.current) {
          setRunning(null);
          setAnnouncement(\`\${row.item.label} failed\`);
        }
      }
    );
  };

  const choose = (row: Row, source: InputSource) => {
    if (running) {
      return;
    }
    if (row.item.children) {
      pushPage(row.item, source);
    } else {
      runRow(row);
    }
  };

  /* -- input -- */

  const moveHighlight = (step: number) => {
    const count = rows.length;
    if (count > 0) {
      setActiveIndex((Math.max(highlighted, 0) + step + count) % count);
    }
  };

  const handleNavKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!open) {
      e.preventDefault();
      openPalette("keyboard");
      return;
    }
    if (rows.length === 0) {
      return;
    }
    e.preventDefault();
    if (e.key === "Home" || e.key === "End") {
      setActiveIndex(e.key === "Home" ? 0 : rows.length - 1);
    } else {
      moveHighlight(e.key === "ArrowDown" ? 1 : -1);
    }
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!open) {
      openPalette("keyboard");
    } else if (activeRow) {
      choose(activeRow, "keyboard");
    }
  };

  const handleEscape = (e: KeyboardEvent<HTMLInputElement>) => {
    if (open) {
      e.preventDefault();
      closePalette(true);
    } else if (query) {
      setQuery("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (running && e.key !== "Tab") {
      e.preventDefault();
      return;
    }
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp":
      case "Home":
      case "End":
        handleNavKey(e);
        break;
      case "Enter":
        handleEnter(e);
        break;
      case "Backspace":
        if (open && query === "" && stack.length > 0) {
          e.preventDefault();
          popPage("keyboard");
        }
        break;
      case "Escape":
        handleEscape(e);
        break;
      default:
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setActiveIndex(0);
    openPalette("keyboard");
  };

  const handleInputPointerDown = (e: PointerEvent<HTMLInputElement>) => {
    if (e.button === 0) {
      openPalette("pointer");
    }
  };

  // Close when focus leaves the whole palette (Tab away, click outside).
  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget;
    if (open && !(next instanceof Node && e.currentTarget.contains(next))) {
      returnFocus.current = null;
      closePalette(false);
    }
  };

  const pagePlaceholder = page
    ? (page.placeholder ?? \`Search \${page.label.toLowerCase()}…\`)
    : placeholder;

  let rowIndex = -1;

  return (
    <div
      className={cn("relative h-[46px] w-full max-w-md", className)}
      onBlur={handleBlur}
      onPointerEnter={(e) => {
        hoverRef.current = e.pointerType === "mouse";
      }}
      onPointerLeave={() => {
        hoverRef.current = false;
      }}
      ref={rootRef}
    >
      <div
        className={cn(
          "@container/palette absolute inset-x-0 top-0 z-30 overflow-hidden rounded-xl border border-border bg-card text-card-foreground",
          open
            ? "shadow-lg"
            : "shadow-xs"
        )}
      >
        <div className="flex h-11 items-center gap-2 px-3">
          <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
          {stack.map((p, i) => (
            <button
              aria-label={\`Back from \${p.label}\`}
              className="inline-flex h-6 shrink-0 items-center rounded-md bg-muted px-2 font-medium text-xs text-foreground hover:bg-foreground/10"
              key={p.id}
              onClick={() => {
                if (i === stack.length - 1 && !running) {
                  popPage("pointer");
                }
              }}
              // Keep focus in the input; Backspace is the keyboard path.
              onPointerDown={(e) => e.preventDefault()}
              tabIndex={-1}
              type="button"
            >
              {p.label}
            </button>
          ))}
          <label className="sr-only" htmlFor={inputId}>
            {label}
          </label>
          <input
            aria-activedescendant={
              activeRow ? optionId(highlighted) : undefined
            }
            aria-autocomplete="list"
            aria-controls={open ? listboxId : undefined}
            aria-expanded={open}
            autoComplete="off"
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            id={inputId}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onPointerDown={handleInputPointerDown}
            placeholder={pagePlaceholder}
            readOnly={running !== null}
            ref={inputRef}
            role="combobox"
            spellCheck={false}
            type="text"
            value={query}
          />
          {!open && (
            <span aria-hidden="true" className="flex shrink-0 gap-0.5">
              <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
              <Kbd>K</Kbd>
            </span>
          )}
        </div>

        {open && (
          <div
            // Keep focus in the input while pressing inside the list, so its
            // blur never closes the palette before the click lands.
            onPointerDown={(e) => e.preventDefault()}
            ref={panelRef}
          >
            <div className="border-border border-t" />
            <div className="overflow-hidden" ref={bodyRef}>
              <div ref={contentRef}>
                <div
                  aria-busy={running?.phase === "pending"}
                  aria-label={page ? page.label : "Commands"}
                  className="relative max-h-72 overflow-y-auto overscroll-contain p-1.5"
                  id={listboxId}
                  ref={listRef}
                  role="listbox"
                >
                  {sections.map((section) => (
                    <div
                      aria-labelledby={
                        section.label ? \`\${uid}-\${section.key}\` : undefined
                      }
                      key={section.key}
                      role="group"
                    >
                      {section.label && (
                        <div
                          className="px-2 pt-2 pb-1 font-medium text-[11px] text-muted-foreground"
                          id={\`\${uid}-\${section.key}\`}
                          role="presentation"
                        >
                          {section.label}
                        </div>
                      )}
                      {section.rows.map((row) => {
                        rowIndex += 1;
                        const index = rowIndex;
                        const status =
                          running?.key === row.key ? running.phase : undefined;
                        return (
                          <div
                            aria-disabled={running !== null && !status}
                            aria-selected={index === highlighted}
                            className="group/row flex h-9 cursor-default items-center gap-2.5 rounded-md px-2 text-sm text-foreground aria-disabled:opacity-50 aria-selected:bg-muted"
                            id={optionId(index)}
                            key={row.key}
                            onClick={() => choose(row, "pointer")}
                            onPointerMove={(e) => {
                              if (
                                e.pointerType === "mouse" &&
                                !running &&
                                index !== highlighted
                              ) {
                                setActiveIndex(index);
                              }
                            }}
                            role="option"
                          >
                            <span
                              aria-hidden="true"
                              className="flex size-4 shrink-0 items-center justify-center text-muted-foreground group-aria-selected/row:text-foreground"
                            >
                              {row.item.icon}
                            </span>
                            <span className="min-w-0 flex-1 truncate">
                              {row.path.map((p) => (
                                <span
                                  className="text-muted-foreground"
                                  key={p.id}
                                >
                                  {p.label}
                                  <span aria-hidden="true"> › </span>
                                </span>
                              ))}
                              <Highlighted
                                matches={row.matches}
                                text={row.item.label}
                              />
                              {row.item.children && (
                                <span className="sr-only">, opens a page</span>
                              )}
                            </span>
                            <span className="flex shrink-0 items-center">
                              <RowEnd item={row.item} status={status} />
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
                {rows.length === 0 && (
                  <p className="px-3 pt-1 pb-6 text-center text-sm text-muted-foreground">
                    No results for “{query.trim()}”
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 border-border border-t px-3 py-2 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="@xs/palette:flex hidden items-center gap-1.5">
                  <Kbd>↑</Kbd>
                  <Kbd>↓</Kbd>
                  <span className="mr-1.5">Navigate</span>
                </span>
                <Kbd>↵</Kbd>
                <span>{activeRow?.item.children ? "Open" : "Run"}</span>
              </span>
              <span className="flex items-center gap-1.5">
                {stack.length > 0 && (
                  <>
                    <Kbd>⌫</Kbd>
                    <span className="mr-1.5">Back</span>
                  </>
                )}
                <Kbd>esc</Kbd>
                <span>Close</span>
              </span>
            </div>
          </div>
        )}
      </div>
      <span aria-live="polite" className="sr-only">
        {announcement}
      </span>
    </div>
  );
}
`}],n=`<pre class="shiki shiki-themes github-light github-dark-default" style="--shiki-light:#24292e;--shiki-dark:#e6edf3;--shiki-light-bg:#fff;--shiki-dark-bg:#0d1117" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  Activity,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  BookOpen,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  Copy,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  FilePlus,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  FolderInput,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  History,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  Keyboard,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  Link2,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  SunMoon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  UserPlus,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'lucide-react'</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { useState } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'react'</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { ActionSearchBar, </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> CommandItem } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> '@/components/action-search-bar'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> icon</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'size-4'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> items</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> CommandItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  { id: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'new-document'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'New document'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, icon: &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">FilePlus</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">icon</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> />, group: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Actions'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, keywords: [</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'create'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'page'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'file'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">], shortcut: [</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'⌘'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'N'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  { id: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'duplicate'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Duplicate page'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, icon: &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Copy</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">icon</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> />, group: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Actions'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, keywords: [</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'copy'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'clone'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">], shortcut: [</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'⌘'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'D'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    id: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'move'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Move to…'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    icon: &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">FolderInput</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">icon</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> />,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    group: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Actions'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    keywords: [</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'folder'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'file'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    placeholder: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Move to which folder?'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    children: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      { id: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'move-inbox'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Inbox'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, icon: &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">FolderInput</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">icon</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      { id: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'move-projects'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Projects'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, icon: &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">FolderInput</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">icon</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      { id: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'move-archive'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Archive'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, icon: &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">FolderInput</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">icon</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    id: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'theme'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Change theme'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    icon: &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">SunMoon</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">icon</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> />,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    group: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Actions'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    keywords: [</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'appearance'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'dark'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'light'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'mode'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    placeholder: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Choose a theme…'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    children: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      { id: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'theme-light'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Light'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, icon: &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">SunMoon</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">icon</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      { id: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'theme-dark'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Dark'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, icon: &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">SunMoon</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">icon</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      { id: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'theme-system'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Match system'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, icon: &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">SunMoon</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">icon</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  { id: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'invite'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Invite member'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, icon: &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">UserPlus</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">icon</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> />, group: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Actions'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, keywords: [</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'team'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'share'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'add'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  { id: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'copy-link'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Copy link'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, icon: &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Link2</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">icon</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> />, group: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Actions'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, keywords: [</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'url'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'share'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">], shortcut: [</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'⌘'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'L'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  { id: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'docs'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Documentation'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, icon: &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">BookOpen</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">icon</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> />, group: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Links'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, keywords: [</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'help'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'guide'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">], href: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'/docs'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  { id: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'changelog'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Changelog'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, icon: &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">History</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">icon</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> />, group: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Links'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, keywords: [</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'release'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'updates'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'new'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">], href: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'/changelog'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  { id: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'status'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Status page'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, icon: &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Activity</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">icon</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> />, group: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Links'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, keywords: [</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'uptime'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'incident'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">], href: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'/status'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  { id: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'shortcuts'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Keyboard shortcuts'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, icon: &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Keyboard</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">icon</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> />, group: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Links'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, keywords: [</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'keys'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'hotkeys'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">], href: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'/shortcuts'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> ActionSearchBarDemo</span><span style="--shiki-light:#24292E;--shiki-dark:#FFA657">() </span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">last</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">setLast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">string</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex h-96 w-full max-w-md flex-col gap-3"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">ActionSearchBar</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        items</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">items</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        defaultRecent</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'copy-link'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'theme-dark'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">]</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        onSelect</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">item</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">          // A short promise shows the in-row spinner before the check mark.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">void</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">            setTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">              setLast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(item.label)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">              resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            }, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">600</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> aria-live</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"polite"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"text-sm text-muted-foreground"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">        {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">last </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> \`Ran: \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">last</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}\`</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'Click the bar, press Cmd/Ctrl + K while it is focused, or just type.'</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span></code></pre>`,r=`import {
  Activity,
  BookOpen,
  Copy,
  FilePlus,
  FolderInput,
  History,
  Keyboard,
  Link2,
  SunMoon,
  UserPlus,
} from 'lucide-react'
import { useState } from 'react'
import { ActionSearchBar, type CommandItem } from '@/components/action-search-bar'

const icon = 'size-4'

const items: CommandItem[] = [
  { id: 'new-document', label: 'New document', icon: <FilePlus className={icon} />, group: 'Actions', keywords: ['create', 'page', 'file'], shortcut: ['⌘', 'N'] },
  { id: 'duplicate', label: 'Duplicate page', icon: <Copy className={icon} />, group: 'Actions', keywords: ['copy', 'clone'], shortcut: ['⌘', 'D'] },
  {
    id: 'move',
    label: 'Move to…',
    icon: <FolderInput className={icon} />,
    group: 'Actions',
    keywords: ['folder', 'file'],
    placeholder: 'Move to which folder?',
    children: [
      { id: 'move-inbox', label: 'Inbox', icon: <FolderInput className={icon} /> },
      { id: 'move-projects', label: 'Projects', icon: <FolderInput className={icon} /> },
      { id: 'move-archive', label: 'Archive', icon: <FolderInput className={icon} /> },
    ],
  },
  {
    id: 'theme',
    label: 'Change theme',
    icon: <SunMoon className={icon} />,
    group: 'Actions',
    keywords: ['appearance', 'dark', 'light', 'mode'],
    placeholder: 'Choose a theme…',
    children: [
      { id: 'theme-light', label: 'Light', icon: <SunMoon className={icon} /> },
      { id: 'theme-dark', label: 'Dark', icon: <SunMoon className={icon} /> },
      { id: 'theme-system', label: 'Match system', icon: <SunMoon className={icon} /> },
    ],
  },
  { id: 'invite', label: 'Invite member', icon: <UserPlus className={icon} />, group: 'Actions', keywords: ['team', 'share', 'add'] },
  { id: 'copy-link', label: 'Copy link', icon: <Link2 className={icon} />, group: 'Actions', keywords: ['url', 'share'], shortcut: ['⌘', 'L'] },
  { id: 'docs', label: 'Documentation', icon: <BookOpen className={icon} />, group: 'Links', keywords: ['help', 'guide'], href: '/docs' },
  { id: 'changelog', label: 'Changelog', icon: <History className={icon} />, group: 'Links', keywords: ['release', 'updates', 'new'], href: '/changelog' },
  { id: 'status', label: 'Status page', icon: <Activity className={icon} />, group: 'Links', keywords: ['uptime', 'incident'], href: '/status' },
  { id: 'shortcuts', label: 'Keyboard shortcuts', icon: <Keyboard className={icon} />, group: 'Links', keywords: ['keys', 'hotkeys'], href: '/shortcuts' },
]

export default function ActionSearchBarDemo() {
  const [last, setLast] = useState<string | null>(null)

  return (
    <div className="flex h-96 w-full max-w-md flex-col gap-3">
      <ActionSearchBar
        items={items}
        defaultRecent={['copy-link', 'theme-dark']}
        onSelect={(item) =>
          // A short promise shows the in-row spinner before the check mark.
          new Promise<void>((resolve) => {
            setTimeout(() => {
              setLast(item.label)
              resolve()
            }, 600)
          })
        }
      />
      <p aria-live="polite" className="text-sm text-muted-foreground">
        {last ? \`Ran: \${last}\` : 'Click the bar, press Cmd/Ctrl + K while it is focused, or just type.'}
      </p>
    </div>
  )
}
`,i=[],a={props:e,files:t,usage:n,usageRaw:r,variants:i};export{a as default,t as files,e as props,n as usage,r as usageRaw,i as variants};