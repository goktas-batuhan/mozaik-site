var e=[{name:`toasts`,type:`AnimatedToast[]`,description:`Toasts to show, oldest first: { id, title, description?, status?, icon?, action?, duration?, dismissible? }.`},{name:`onDismiss`,type:`(id: string) => void`,description:`Called when a toast is swiped or closed. Without it the close button and swipe are off.`},{name:`position`,type:`'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'`,default:`'bottom-right'`,description:`Corner or edge when placement is fixed or absolute; bottom positions also grow upward.`},{name:`placement`,type:`'static' | 'fixed' | 'absolute'`,description:"How the stack is positioned. Defaults to fixed when `fixed` is set, otherwise static."},{name:`fixed`,type:`boolean`,default:`false`,description:`Shortcut for placement fixed: pins the stack to the viewport and renders it in a portal.`},{name:`portal`,type:`boolean`,description:`Render into a portal. Defaults to true for fixed placement.`},{name:`portalRoot`,type:`Element | null`,description:`Portal target. Defaults to document.body.`},{name:`maxVisible`,type:`number`,default:`4`,description:`How many of the newest toasts are shown.`},{name:`classNames`,type:`ToastClassNames`,description:`Slot classes: root, item, surface, iconWrap, content, title, description, action, close, progress.`},{name:`icons`,type:`Partial<Record<ToastStatus, ReactNode>>`,description:`Override the icon of a status.`},{name:`renderToast`,type:`(toast: AnimatedToast) => ReactNode`,description:`Replace the default toast body.`},{name:`className`,type:`string`,description:`Extra classes for the list.`}],t=[{name:`animated-toast-stack.tsx`,lines:555,html:`<pre class="shiki shiki-themes github-light github-dark-default" style="--shiki-light:#24292e;--shiki-dark:#e6edf3;--shiki-light-bg:#fff;--shiki-dark-bg:#0d1117" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  AnimatePresence,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  motion,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useReducedMotion,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useReducedMotionConfig,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Transition,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'motion/react'</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  memo,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useCallback,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useEffect,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useMemo,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useRef,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useState,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ReactNode,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> SVGProps,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'react'</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { createPortal } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'react-dom'</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { cn } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> '@/lib/utils'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/** OS setting, or forced on with &#x3C;MotionConfig reducedMotion="always">. */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> usePrefersReducedMotion</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> os</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useReducedMotion</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> forced</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useReducedMotionConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> Boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(os </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> forced)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/** Ease-out curve (inlined from the source's local lib/ease helper). */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> EASE_OUT</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0.16</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0.3</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">as</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> const</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> Svg</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">props</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> SVGProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">SVGSVGElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">svg</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      aria-hidden</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      viewBox</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"0 0 24 24"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      fill</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"none"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      stroke</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"currentColor"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      strokeWidth</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">2</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      strokeLinecap</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"round"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      strokeLinejoin</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"round"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      {</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">props</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> BellIcon</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">p</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> SVGProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">SVGSVGElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72"> {</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">p</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">path</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> d</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"M10.268 21a2 2 0 0 0 3.464 0"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">path</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> d</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> InfoIcon</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">p</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> SVGProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">SVGSVGElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72"> {</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">p</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">circle</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> cx</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"12"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> cy</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"12"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> r</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"10"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">path</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> d</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"M12 16v-4M12 8h.01"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> LoaderIcon</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">p</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> SVGProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">SVGSVGElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72"> {</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">p</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">path</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> d</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"M21 12a9 9 0 1 1-6.219-8.56"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> CheckIcon</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">p</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> SVGProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">SVGSVGElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72"> {</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">p</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">path</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> d</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"M20 6 9 17l-5-5"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> AlertIcon</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">p</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> SVGProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">SVGSVGElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72"> {</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">p</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">circle</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> cx</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"12"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> cy</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"12"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> r</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"10"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">path</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> d</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"M12 8v4M12 16h.01"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> CloseIcon</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">p</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> SVGProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">SVGSVGElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72"> {</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">p</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">path</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> d</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"M18 6 6 18M6 6l12 12"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Svg</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ToastStatus</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "neutral"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "info"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "loading"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "success"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "error"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ToastPosition</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "top-left"</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "top-center"</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "top-right"</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "bottom-left"</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "bottom-center"</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "bottom-right"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> AnimatedToastAction</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ReactNode</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">toast</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> AnimatedToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> void</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> AnimatedToast</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  id</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  title</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ReactNode</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  description</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ReactNode</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  status</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ToastStatus</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  icon</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ReactNode</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  action</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> AnimatedToastAction</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  duration</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  dismissible</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  createdAt</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ToastInput</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Omit</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">AnimatedToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"id"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "createdAt"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">> </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  id</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ToastClassNames</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  root</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  item</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  surface</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  iconWrap</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  content</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  title</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  description</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  action</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  close</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  progress</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> AnimatedToastStackProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  toasts</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> AnimatedToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[];</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  onDismiss</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">id</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> void</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  position</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ToastPosition</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  placement</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "static"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "fixed"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "absolute"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  fixed</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  portal</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  portalRoot</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Element</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  maxVisible</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  classNames</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ToastClassNames</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  icons</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Partial</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">Record</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">ToastStatus</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">ReactNode</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>>;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  renderToast</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">toast</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> AnimatedToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ReactNode</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> UseAnimatedToastStackOptions</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  initialToasts</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ToastInput</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[];</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  defaultDuration</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  limit</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> STACK_SPRING</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Transition</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  type: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"spring"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  stiffness: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">420</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  damping: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">34</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  mass: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0.75</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> CONTENT_TRANSITION</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  duration: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0.28</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  ease: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">EASE_OUT</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">as</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> STATUS_ICON</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Record</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">ToastStatus</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">props</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> SVGProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">SVGSVGElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ReactNode</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">> </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  neutral: BellIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  info: InfoIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  loading: LoaderIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  success: CheckIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  error: AlertIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> STATUS_CLASS</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Record</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">ToastStatus</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">> </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  neutral: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"text-muted-foreground bg-muted/60"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  info: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"text-primary bg-muted"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  loading: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"text-primary bg-muted"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  success: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"text-success bg-success/10"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  error: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"text-destructive bg-destructive/10"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> POSITION_CLASS</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Record</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">ToastPosition</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">> </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">  "top-left"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"left-4 top-4"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">  "top-center"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"left-1/2 top-4 -translate-x-1/2"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">  "top-right"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"right-4 top-4"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">  "bottom-left"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"bottom-6 left-4"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">  "bottom-center"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"bottom-6 left-1/2 -translate-x-1/2"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">  "bottom-right"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"bottom-6 right-4"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> idSeed </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> createToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">input</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ToastInput</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">defaultDuration</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> AnimatedToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    duration: defaultDuration,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    dismissible: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    ...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">input,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    id: input.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> \`toast-\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">Date</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">now</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">()</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}-\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">idSeed</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">++</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    createdAt: Date.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">now</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useAnimatedToastStack</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  initialToasts</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [],</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  defaultDuration</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 4200</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  limit</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> UseAnimatedToastStackOptions</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {}) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> toastTimers</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">Map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, { </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">timer</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">; </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">signature</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }>>(</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> Map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">());</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">toasts</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">setToasts</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">AnimatedToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[]>(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    initialToasts.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">toast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> createToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(toast, defaultDuration)),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  );</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> dismissToast</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useCallback</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">id</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setToasts</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">current</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> current.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">filter</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">toast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> toast.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> id));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> clearToasts</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useCallback</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setToasts</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">([]);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> showToast</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useCallback</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">input</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ToastInput</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> toast</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> createToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(input, defaultDuration);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      setToasts</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">current</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> next</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">current, toast];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        return</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> typeof</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> limit </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "number"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> next.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">slice</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">limit) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> next;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      });</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> toast.id;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    [defaultDuration, limit],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  );</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> updateToast</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useCallback</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">id</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">patch</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Partial</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">ToastInput</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setToasts</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">current</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      current.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">toast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        toast.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> id</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">              ...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">toast,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">              ...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">patch,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              id,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              createdAt: patch.duration </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> toast.createdAt </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Date.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">now</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          :</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> toast,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> activeIds</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> Set</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(toasts.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">toast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> toast.id));</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    toastTimers.current.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">forEach</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">entry</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">activeIds.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">has</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(id)) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">clearTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(entry.timer);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        toastTimers.current.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">delete</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(id);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    toasts.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">forEach</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">toast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> duration</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> toast.duration </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> defaultDuration;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> existing</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> toastTimers.current.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(toast.id);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (duration </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x3C;=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (existing) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">clearTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(existing.timer);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          toastTimers.current.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">delete</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(toast.id);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> createdAt</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> toast.createdAt </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Date.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">now</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> signature</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> \`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">createdAt</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}:\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">duration</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (existing?.signature </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> signature) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (existing) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">clearTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(existing.timer);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> elapsed</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Date.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">now</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> createdAt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> remaining</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">max</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(duration </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> elapsed, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> timer</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">setTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        toastTimers.current.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">delete</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(toast.id);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">        dismissToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(toast.id);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }, remaining);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      toastTimers.current.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(toast.id, { timer, signature });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }, [defaultDuration, dismissToast, toasts]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> timers</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> toastTimers.current;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      timers.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">forEach</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">entry</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">clearTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(entry.timer);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      timers.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">clear</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useMemo</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      toasts,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      showToast,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      updateToast,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      dismissToast,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      clearToasts,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      setToasts,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    [clearToasts, dismissToast, showToast, toasts, updateToast],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/** A stack of toasts that spring in, swap content in place and swipe away. Pair it with \`useAnimatedToastStack\` or drive \`toasts\` yourself. */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> AnimatedToastStack</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  toasts</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  onDismiss</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  position</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "bottom-right"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  placement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  fixed</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  portal</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  portalRoot</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  maxVisible</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 4</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  className</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  classNames</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  icons</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  renderToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> AnimatedToastStackProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">portalTarget</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">setPortalTarget</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">Element</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> visibleToasts</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> toasts.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">slice</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">maxVisible);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> isBottom</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">startsWith</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"bottom"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> resolvedPlacement</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> placement </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (fixed </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "fixed"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "static"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> shouldPortal</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> portal </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> resolvedPlacement </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "fixed"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setPortalTarget</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(shouldPortal </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (portalRoot </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> document.body) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }, [portalRoot, shouldPortal]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> stack</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">ol</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      aria-live</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"polite"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      aria-atomic</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"false"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">        "pointer-events-none flex w-[calc(100vw-2rem)] max-w-sm gap-2"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        isBottom </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "flex-col-reverse"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "flex-col"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        resolvedPlacement </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "fixed"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "fixed z-90"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        resolvedPlacement </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "absolute"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "absolute z-20"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        resolvedPlacement </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "static"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> POSITION_CLASS</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[position],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        classNames?.root,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        className,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">AnimatePresence</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> initial</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> mode</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"popLayout"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">        {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">visibleToasts.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">toast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">index</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">ToastItem</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            key</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">toast.id</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            toast</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">toast</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            index</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">index</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            onDismiss</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">onDismiss</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            classNames</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">classNames</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            icons</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">icons</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            renderToast</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">renderToast</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        ))</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">AnimatePresence</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">ol</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  );</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (shouldPortal </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">portalTarget) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (shouldPortal </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> portalTarget) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> createPortal</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(stack, portalTarget);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> stack;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> ToastItem</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> memo</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> ToastItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  toast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  index</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  onDismiss</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  classNames</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  icons</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  renderToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  toast</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> AnimatedToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  index</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  onDismiss</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">id</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> void</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  classNames</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ToastClassNames</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  icons</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Partial</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">Record</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">ToastStatus</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">ReactNode</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>>;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  renderToast</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">toast</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> AnimatedToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ReactNode</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> reduce</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> usePrefersReducedMotion</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> status</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> toast.status </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "neutral"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> Icon</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> STATUS_ICON</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[status];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> iconNode</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> icons?.[status] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> toast.icon </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Icon</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"h-3.5 w-3.5"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> />;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> canDismiss</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> toast.dismissible </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> false</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> Boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(onDismiss);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> hasDetails</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> Boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(toast.description </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> toast.action);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">motion.li</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      layout</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      initial</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        reduce</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          :</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, y: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">22</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, scale: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0.96</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, filter: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"blur(10px)"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      animate</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        reduce</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          :</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, y: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, scale: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, filter: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"blur(0px)"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      exit</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        reduce</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          :</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              x: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">32</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              scale: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0.96</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              filter: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"blur(8px)"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              transition: { duration: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0.18</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, ease: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">EASE_OUT</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      transition</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">STACK_SPRING</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      drag</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">canDismiss </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">reduce </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "x"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      dragConstraints</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{ left: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, right: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      dragElastic</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0.18</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      onDragEnd</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">_</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">info</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">canDismiss </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">onDismiss) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">abs</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(info.offset.x) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 72</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">abs</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(info.velocity.x) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 520</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">          onDismiss</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(toast.id);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"pointer-events-auto relative will-change-transform"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, classNames?.item)</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      style</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{ zIndex: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">20</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> index }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">          "relative overflow-hidden rounded-2xl border border-border bg-card/95 p-3 shadow-2xl backdrop-blur-xl"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          classNames?.surface,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">        {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">renderToast </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">          renderToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(toast)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        ) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex gap-3"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, hasDetails </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "items-start"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "items-center"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">motion.span</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">              layout</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">              className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">                "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                hasDetails </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "mt-0.5"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">                STATUS_CLASS</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[status],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                classNames?.iconWrap,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">AnimatePresence</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> mode</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"popLayout"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> initial</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">motion.span</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                  key</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">status</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                  initial</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                    reduce</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">                      ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">                      :</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, y: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">8</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, scale: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0.8</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, filter: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"blur(6px)"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                  }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                  animate</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                    reduce</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">                      ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">                      :</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, y: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, scale: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, filter: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"blur(0px)"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                  }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                  exit</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                    reduce</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">                      ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">                      :</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, y: </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">8</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, scale: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0.9</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, filter: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"blur(6px)"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                  }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                  transition</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">CONTENT_TRANSITION</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                  className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"inline-flex"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                  {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">status </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "loading"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"inline-flex"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">reduce </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "animate-spin"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">iconNode</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                  ) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                    iconNode</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                  )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">motion.span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">AnimatePresence</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">motion.span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"min-w-0 flex-1"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, classNames?.content)</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">AnimatePresence</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> mode</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"popLayout"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> initial</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">motion.div</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                  key</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">\`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">toast</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">id</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}-\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">status</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}-\${</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">String</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">toast</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">title</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">)</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                  initial</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                    reduce</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">                      ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">                      :</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, y: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">8</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, filter: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"blur(6px)"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                  }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                  animate</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                    reduce</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">                      ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">                      :</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, y: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, filter: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"blur(0px)"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                  }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                  exit</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                    reduce</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">                      ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">                      :</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { opacity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, y: </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">8</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, filter: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"blur(6px)"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                  }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                  transition</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">CONTENT_TRANSITION</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">p</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                    className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">                      "truncate text-sm font-medium leading-5 text-foreground"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                      classNames?.title,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                    )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                  ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                    {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">toast.title</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                  &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                  {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">toast.description </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">p</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                      className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">                        "mt-0.5 line-clamp-2 text-xs leading-4 text-muted-foreground"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                        classNames?.description,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                      )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                    ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                      {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">toast.description</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                  ) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">motion.div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">AnimatePresence</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">              {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">toast.action </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">button</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                  type</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"button"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                  onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> toast.action?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">onClick</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(toast)</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                  className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">                    "mt-2 inline-flex h-7 items-center rounded-full bg-muted/80 px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                    classNames?.action,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                  )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                  {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">toast.action.label</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              ) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">            {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">canDismiss </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">button</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                type</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"button"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> onDismiss</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">?.(toast.id)</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"Dismiss notification"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">                className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">                  "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                  classNames?.close,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">                &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">CloseIcon</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"h-3.5 w-3.5"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            ) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">motion.li</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">});</span></span></code></pre>`,raw:`import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useReducedMotionConfig,
  type Transition,
} from 'motion/react'
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type SVGProps,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

/** OS setting, or forced on with <MotionConfig reducedMotion="always">. */
function usePrefersReducedMotion() {
  const os = useReducedMotion()
  const forced = useReducedMotionConfig()
  return Boolean(os || forced)
}

/** Ease-out curve (inlined from the source's local lib/ease helper). */
const EASE_OUT = [0.16, 1, 0.3, 1] as const

function Svg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  )
}
const BellIcon = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M10.268 21a2 2 0 0 0 3.464 0" />
    <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
  </Svg>
)
const InfoIcon = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </Svg>
)
const LoaderIcon = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </Svg>
)
const CheckIcon = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Svg>
)
const AlertIcon = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4M12 16h.01" />
  </Svg>
)
const CloseIcon = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Svg>
)

export type ToastStatus = "neutral" | "info" | "loading" | "success" | "error";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type AnimatedToastAction = {
  label: ReactNode;
  onClick: (toast: AnimatedToast) => void;
};

export type AnimatedToast = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  status?: ToastStatus;
  icon?: ReactNode;
  action?: AnimatedToastAction;
  duration?: number;
  dismissible?: boolean;
  createdAt?: number;
};

export type ToastInput = Omit<AnimatedToast, "id" | "createdAt"> & {
  id?: string;
};

export type ToastClassNames = {
  root?: string;
  item?: string;
  surface?: string;
  iconWrap?: string;
  content?: string;
  title?: string;
  description?: string;
  action?: string;
  close?: string;
  progress?: string;
};

export interface AnimatedToastStackProps {
  toasts: AnimatedToast[];
  onDismiss?: (id: string) => void;
  position?: ToastPosition;
  placement?: "static" | "fixed" | "absolute";
  fixed?: boolean;
  portal?: boolean;
  portalRoot?: Element | null;
  maxVisible?: number;
  className?: string;
  classNames?: ToastClassNames;
  icons?: Partial<Record<ToastStatus, ReactNode>>;
  renderToast?: (toast: AnimatedToast) => ReactNode;
}

export interface UseAnimatedToastStackOptions {
  initialToasts?: ToastInput[];
  defaultDuration?: number;
  limit?: number;
}

const STACK_SPRING: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.75,
};

const CONTENT_TRANSITION = {
  duration: 0.28,
  ease: EASE_OUT,
} as const;

const STATUS_ICON: Record<ToastStatus, (props: SVGProps<SVGSVGElement>) => ReactNode> = {
  neutral: BellIcon,
  info: InfoIcon,
  loading: LoaderIcon,
  success: CheckIcon,
  error: AlertIcon,
};

const STATUS_CLASS: Record<ToastStatus, string> = {
  neutral: "text-muted-foreground bg-muted/60",
  info: "text-primary bg-muted",
  loading: "text-primary bg-muted",
  success: "text-success bg-success/10",
  error: "text-destructive bg-destructive/10",
};

const POSITION_CLASS: Record<ToastPosition, string> = {
  "top-left": "left-4 top-4",
  "top-center": "left-1/2 top-4 -translate-x-1/2",
  "top-right": "right-4 top-4",
  "bottom-left": "bottom-6 left-4",
  "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-6 right-4",
};

let idSeed = 0;

function createToast(input: ToastInput, defaultDuration: number): AnimatedToast {
  return {
    duration: defaultDuration,
    dismissible: true,
    ...input,
    id: input.id ?? \`toast-\${Date.now()}-\${idSeed++}\`,
    createdAt: Date.now(),
  };
}

export function useAnimatedToastStack({
  initialToasts = [],
  defaultDuration = 4200,
  limit,
}: UseAnimatedToastStackOptions = {}) {
  const toastTimers = useRef<Map<string, { timer: number; signature: string }>>(new Map());
  const [toasts, setToasts] = useState<AnimatedToast[]>(() =>
    initialToasts.map((toast) => createToast(toast, defaultDuration)),
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const showToast = useCallback(
    (input: ToastInput) => {
      const toast = createToast(input, defaultDuration);
      setToasts((current) => {
        const next = [...current, toast];
        return typeof limit === "number" ? next.slice(-limit) : next;
      });
      return toast.id;
    },
    [defaultDuration, limit],
  );

  const updateToast = useCallback((id: string, patch: Partial<ToastInput>) => {
    setToasts((current) =>
      current.map((toast) =>
        toast.id === id
          ? {
              ...toast,
              ...patch,
              id,
              createdAt: patch.duration === undefined ? toast.createdAt : Date.now(),
            }
          : toast,
      ),
    );
  }, []);

  useEffect(() => {
    const activeIds = new Set(toasts.map((toast) => toast.id));

    toastTimers.current.forEach((entry, id) => {
      if (!activeIds.has(id)) {
        window.clearTimeout(entry.timer);
        toastTimers.current.delete(id);
      }
    });

    toasts.forEach((toast) => {
      const duration = toast.duration ?? defaultDuration;
      const existing = toastTimers.current.get(toast.id);

      if (duration <= 0) {
        if (existing) {
          window.clearTimeout(existing.timer);
          toastTimers.current.delete(toast.id);
        }
        return;
      }

      const createdAt = toast.createdAt ?? Date.now();
      const signature = \`\${createdAt}:\${duration}\`;

      if (existing?.signature === signature) {
        return;
      }

      if (existing) {
        window.clearTimeout(existing.timer);
      }

      const elapsed = Date.now() - createdAt;
      const remaining = Math.max(duration - elapsed, 0);
      const timer = window.setTimeout(() => {
        toastTimers.current.delete(toast.id);
        dismissToast(toast.id);
      }, remaining);

      toastTimers.current.set(toast.id, { timer, signature });
    });
  }, [defaultDuration, dismissToast, toasts]);

  useEffect(() => {
    const timers = toastTimers.current;

    return () => {
      timers.forEach((entry) => {
        window.clearTimeout(entry.timer);
      });
      timers.clear();
    };
  }, []);

  return useMemo(
    () => ({
      toasts,
      showToast,
      updateToast,
      dismissToast,
      clearToasts,
      setToasts,
    }),
    [clearToasts, dismissToast, showToast, toasts, updateToast],
  );
}

/** A stack of toasts that spring in, swap content in place and swipe away. Pair it with \`useAnimatedToastStack\` or drive \`toasts\` yourself. */
export function AnimatedToastStack({
  toasts,
  onDismiss,
  position = "bottom-right",
  placement,
  fixed = false,
  portal,
  portalRoot,
  maxVisible = 4,
  className,
  classNames,
  icons,
  renderToast,
}: AnimatedToastStackProps) {
  const [portalTarget, setPortalTarget] = useState<Element | null>(null);
  const visibleToasts = toasts.slice(-maxVisible);
  const isBottom = position.startsWith("bottom");
  const resolvedPlacement = placement ?? (fixed ? "fixed" : "static");
  const shouldPortal = portal ?? resolvedPlacement === "fixed";

  useEffect(() => {
    setPortalTarget(shouldPortal ? (portalRoot ?? document.body) : null);
  }, [portalRoot, shouldPortal]);

  const stack = (
    <ol
      aria-live="polite"
      aria-atomic="false"
      className={cn(
        "pointer-events-none flex w-[calc(100vw-2rem)] max-w-sm gap-2",
        isBottom ? "flex-col-reverse" : "flex-col",
        resolvedPlacement === "fixed" && "fixed z-90",
        resolvedPlacement === "absolute" && "absolute z-20",
        resolvedPlacement !== "static" && POSITION_CLASS[position],
        classNames?.root,
        className,
      )}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {visibleToasts.map((toast, index) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            index={index}
            onDismiss={onDismiss}
            classNames={classNames}
            icons={icons}
            renderToast={renderToast}
          />
        ))}
      </AnimatePresence>
    </ol>
  );

  if (shouldPortal && !portalTarget) {
    return null;
  }

  if (shouldPortal && portalTarget) {
    return createPortal(stack, portalTarget);
  }

  return stack;
}

const ToastItem = memo(function ToastItem({
  toast,
  index,
  onDismiss,
  classNames,
  icons,
  renderToast,
}: {
  toast: AnimatedToast;
  index: number;
  onDismiss?: (id: string) => void;
  classNames?: ToastClassNames;
  icons?: Partial<Record<ToastStatus, ReactNode>>;
  renderToast?: (toast: AnimatedToast) => ReactNode;
}) {
  const reduce = usePrefersReducedMotion();
  const status = toast.status ?? "neutral";
  const Icon = STATUS_ICON[status];
  const iconNode = icons?.[status] ?? toast.icon ?? <Icon className="h-3.5 w-3.5" />;
  const canDismiss = toast.dismissible !== false && Boolean(onDismiss);
  const hasDetails = Boolean(toast.description || toast.action);

  return (
    <motion.li
      layout
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y: 22, scale: 0.96, filter: "blur(10px)" }
      }
      animate={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      }
      exit={
        reduce
          ? { opacity: 0 }
          : {
              opacity: 0,
              x: 32,
              scale: 0.96,
              filter: "blur(8px)",
              transition: { duration: 0.18, ease: EASE_OUT },
            }
      }
      transition={STACK_SPRING}
      drag={canDismiss && !reduce ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.18}
      onDragEnd={(_, info) => {
        if (!canDismiss || !onDismiss) return;
        if (Math.abs(info.offset.x) > 72 || Math.abs(info.velocity.x) > 520) {
          onDismiss(toast.id);
        }
      }}
      className={cn("pointer-events-auto relative will-change-transform", classNames?.item)}
      style={{ zIndex: 20 - index }}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border bg-card/95 p-3 shadow-2xl backdrop-blur-xl",
          classNames?.surface,
        )}
      >
        {renderToast ? (
          renderToast(toast)
        ) : (
          <div className={cn("flex gap-3", hasDetails ? "items-start" : "items-center")}>
            <motion.span
              layout
              className={cn(
                "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                hasDetails && "mt-0.5",
                STATUS_CLASS[status],
                classNames?.iconWrap,
              )}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={status}
                  initial={
                    reduce
                      ? { opacity: 0 }
                      : { opacity: 0, y: 8, scale: 0.8, filter: "blur(6px)" }
                  }
                  animate={
                    reduce
                      ? { opacity: 1 }
                      : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                  }
                  exit={
                    reduce
                      ? { opacity: 0 }
                      : { opacity: 0, y: -8, scale: 0.9, filter: "blur(6px)" }
                  }
                  transition={CONTENT_TRANSITION}
                  className="inline-flex"
                >
                  {status === "loading" ? (
                    <span className={cn("inline-flex", !reduce && "animate-spin")}>{iconNode}</span>
                  ) : (
                    iconNode
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.span>

            <div className={cn("min-w-0 flex-1", classNames?.content)}>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={\`\${toast.id}-\${status}-\${String(toast.title)}\`}
                  initial={
                    reduce
                      ? { opacity: 0 }
                      : { opacity: 0, y: 8, filter: "blur(6px)" }
                  }
                  animate={
                    reduce
                      ? { opacity: 1 }
                      : { opacity: 1, y: 0, filter: "blur(0px)" }
                  }
                  exit={
                    reduce
                      ? { opacity: 0 }
                      : { opacity: 0, y: -8, filter: "blur(6px)" }
                  }
                  transition={CONTENT_TRANSITION}
                >
                  <p
                    className={cn(
                      "truncate text-sm font-medium leading-5 text-foreground",
                      classNames?.title,
                    )}
                  >
                    {toast.title}
                  </p>
                  {toast.description ? (
                    <p
                      className={cn(
                        "mt-0.5 line-clamp-2 text-xs leading-4 text-muted-foreground",
                        classNames?.description,
                      )}
                    >
                      {toast.description}
                    </p>
                  ) : null}
                </motion.div>
              </AnimatePresence>

              {toast.action ? (
                <button
                  type="button"
                  onClick={() => toast.action?.onClick(toast)}
                  className={cn(
                    "mt-2 inline-flex h-7 items-center rounded-full bg-muted/80 px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted",
                    classNames?.action,
                  )}
                >
                  {toast.action.label}
                </button>
              ) : null}
            </div>

            {canDismiss ? (
              <button
                type="button"
                onClick={() => onDismiss?.(toast.id)}
                aria-label="Dismiss notification"
                className={cn(
                  "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground",
                  classNames?.close,
                )}
              >
                <CloseIcon className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>
        )}

      </div>
    </motion.li>
  );
});
`}],n=`<pre class="shiki shiki-themes github-light github-dark-default" style="--shiki-light:#24292e;--shiki-dark:#e6edf3;--shiki-light-bg:#fff;--shiki-dark-bg:#0d1117" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { useAnimatedToastStack, AnimatedToastStack, </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ToastInput } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> '@/components/animated-toast-stack'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> SAMPLES</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ToastInput</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  { title: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Swap submitted'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, description: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Waiting for 1 confirmation'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, status: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'loading'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  { title: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Swap confirmed'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, description: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'0.5 ETH for 1,840 USDC'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, status: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'success'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  { title: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Price alert'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, description: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'ETH crossed $3,800'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, status: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'info'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  { title: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Transaction failed'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, description: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Slippage too high'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, status: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'error'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> button</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">  'inline-flex h-9 items-center rounded-md border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> AnimatedToastStackDemo</span><span style="--shiki-light:#24292E;--shiki-dark:#FFA657">() </span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">toasts</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">showToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">dismissToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">clearToasts</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useAnimatedToastStack</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({ defaultDuration: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">6000</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, limit: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> })</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex w-[min(92vw,420px)] flex-col items-center gap-6"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex flex-wrap justify-center gap-2"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">        {</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">SAMPLES</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">sample</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> key</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(sample.title)</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> type</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"button"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">button</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> showToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(sample)</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">            {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">sample.status</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        ))</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> type</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"button"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">button</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">clearToasts</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          Clear</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"min-h-40 w-full"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">AnimatedToastStack</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          toasts</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">toasts.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> toasts </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [{ id: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'hint'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, title: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Press a button'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, description: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Toasts stack here and swipe away.'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, dismissible: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }]</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          onDismiss</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">dismissToast</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          position</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"top-center"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"w-full"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span></code></pre>`,r=`import { useAnimatedToastStack, AnimatedToastStack, type ToastInput } from '@/components/animated-toast-stack'

const SAMPLES: ToastInput[] = [
  { title: 'Swap submitted', description: 'Waiting for 1 confirmation', status: 'loading' },
  { title: 'Swap confirmed', description: '0.5 ETH for 1,840 USDC', status: 'success' },
  { title: 'Price alert', description: 'ETH crossed $3,800', status: 'info' },
  { title: 'Transaction failed', description: 'Slippage too high', status: 'error' },
]

const button =
  'inline-flex h-9 items-center rounded-md border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

export default function AnimatedToastStackDemo() {
  const { toasts, showToast, dismissToast, clearToasts } = useAnimatedToastStack({ defaultDuration: 6000, limit: 4 })

  return (
    <div className="flex w-[min(92vw,420px)] flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-2">
        {SAMPLES.map((sample) => (
          <button key={String(sample.title)} type="button" className={button} onClick={() => showToast(sample)}>
            {sample.status}
          </button>
        ))}
        <button type="button" className={button} onClick={clearToasts}>
          Clear
        </button>
      </div>
      <div className="min-h-40 w-full">
        <AnimatedToastStack
          toasts={toasts.length ? toasts : [{ id: 'hint', title: 'Press a button', description: 'Toasts stack here and swipe away.', dismissible: false }]}
          onDismiss={dismissToast}
          position="top-center"
          className="w-full"
        />
      </div>
    </div>
  )
}
`,i=[],a={props:e,files:t,usage:n,usageRaw:r,variants:i};export{a as default,t as files,e as props,n as usage,r as usageRaw,i as variants};