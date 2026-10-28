var e=[{name:`columns`,type:`WheelColumn[]`,description:`The wheels, left to right: { id, label, options, loop?, className? }. Defaults to a 12-hour time picker.`},{name:`value`,type:`Record<string, string>`,description:`Controlled selection, keyed by column id.`},{name:`defaultValue`,type:`Record<string, string>`,description:`Initial selection when uncontrolled.`},{name:`onValueChange`,type:`(value: Record<string, string>) => void`,description:`Called once a wheel comes to rest on a new option.`},{name:`label`,type:`string`,default:`'Time'`,description:`Accessible name for the whole picker.`},{name:`className`,type:`string`,description:`Extra classes for the wrapper.`}],t=[{name:`wheel-picker.tsx`,lines:576,html:`<pre class="shiki shiki-themes github-light github-dark-default" style="--shiki-light:#24292e;--shiki-dark:#e6edf3;--shiki-light-bg:#fff;--shiki-dark-bg:#0d1117" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> AnimationPlaybackControls,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  animate,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> MotionValue,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  motion,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useMotionValue,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useMotionValueEvent,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useReducedMotion,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useReducedMotionConfig,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useTransform,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "motion/react"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> KeyboardEvent,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> PointerEvent,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useEffect,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useRef,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  useState,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "react"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { cn } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "@/lib/utils"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/** OS setting, or forced on with &#x3C;MotionConfig reducedMotion="always">. */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> usePrefersReducedMotion</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> os</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useReducedMotion</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> forced</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useReducedMotionConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> Boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(os </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> forced);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> WheelOption</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  value</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> WheelColumn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  id</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Accessible name of the column, e.g. "Hours". */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  options</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> WheelOption</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[];</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Wrap around from the last option to the first. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  loop</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Tailwind width class for the column. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> range</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">count</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">format</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">i</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  Array.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({ length: count }, (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">_</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">i</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    value: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(i),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    label: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">format</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(i),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }));</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> DEFAULT_COLUMNS</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> WheelColumn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    id: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"hour"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"Hours"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    loop: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    className: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"w-16"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    options: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">range</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">12</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">i</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> String</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    id: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"minute"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"Minutes"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    loop: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    className: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"w-16"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    options: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">range</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">60</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">i</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> String</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(i).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">padStart</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"0"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    id: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"period"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"AM or PM"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    className: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"w-16"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    options: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      { value: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"am"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"AM"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      { value: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"pm"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"PM"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> DEFAULT_VALUE</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Record</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">> </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  hour: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"8"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  minute: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"41"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  period: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"am"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> ITEM_HEIGHT</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 36</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">// Each row sits this many degrees further round the drum.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> ITEM_ANGLE</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 20</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">// Drum radius that makes neighbouring rows touch exactly.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">// Rounded so server and browser trig can't disagree in the markup.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> RADIUS</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">round</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">ITEM_HEIGHT</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> /</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> /</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">tan</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">ITEM_ANGLE</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> /</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (Math.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">PI</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> /</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 180</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">))) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 100</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  ) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 100</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">// Rows past ±90° face away; render a few either side of that and no more.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> WINDOW</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">ceil</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">90</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> /</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> ITEM_ANGLE</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> VIEW_HEIGHT</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">round</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">RADIUS</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> *</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> ITEM_HEIGHT</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> /</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">// A non-looping wheel can be dragged this many rows past either end.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> MAX_OVERSCROLL</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1.2</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> VELOCITY_WINDOW_MS</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 80</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> TAP_SLOP</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 4</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">// Seconds of travel a flick is worth: release speed × COAST = rows coasted.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> COAST</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0.32</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> mod</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">n</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">m</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ((n </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> m) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> m) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> m;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> damp</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">distance</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">max</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> max </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">exp</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">distance </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> max));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> hapticTick</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">typeof</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> navigator </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "undefined"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "vibrate"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> in</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> navigator) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    navigator.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">vibrate</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> WheelPickerProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** The wheels, left to right. Defaults to a 12-hour time picker. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  columns</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> WheelColumn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[];</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Controlled selection, keyed by column id. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  value</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Record</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Initial selection when uncontrolled. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  defaultValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Record</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Called once a wheel comes to rest on a new option. */</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  onValueChange</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Record</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> void</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Accessible name for the whole picker. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Extra classes for the wrapper. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E"> * An iOS-style drum picker. Each column is a real 3D cylinder: rows are</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E"> * placed round it with \`rotateX() translateZ()\` and the whole drum turns</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E"> * with a single transform, so a frame costs one style write per column.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E"> *</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E"> * The drum is drawn twice. The bottom copy is muted; the top copy is in full</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E"> * color and clipped to the selection band. Text turns dark exactly as it</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E"> * crosses the band's edge, the way the native picker does. Hairline ticks</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E"> * mark the band's ends.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E"> */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> WheelPicker</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  columns</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> DEFAULT_COLUMNS</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  value</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">: </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">valueProp</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  defaultValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> DEFAULT_VALUE</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  onValueChange</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "Time"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  className</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> WheelPickerProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">internal</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">setInternal</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(defaultValue);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> value</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> valueProp </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> internal;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // A column settles from a callback made when its spin started. If another</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // column changed in the meantime, merging into that render's \`value\`</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // would undo it, so merge into the latest selection instead.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> latestValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  latestValue.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> value;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> select</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">columnId</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">optionValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> current</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> latestValue.current;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (current[columnId] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> optionValue) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> next</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">current, [columnId]: optionValue };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    latestValue.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> next;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (valueProp </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      setInternal</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(next);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    onValueChange</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">?.(next);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">    // biome-ignore lint/a11y/useSemanticElements: a fieldset would add a border and legend layout the picker doesn't want.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">label</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">        "relative flex select-none justify-center rounded-2xl border border-border bg-card px-3 text-card-foreground"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        className</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      role</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"group"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      {</span><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/* The selection band, shared by every column. */</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        aria-hidden</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"true"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"pointer-events-none absolute inset-x-2 top-1/2 -translate-y-1/2 rounded-lg bg-muted"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        style</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{ height: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">ITEM_HEIGHT</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      {</span><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/* Hairline ticks either side of the band, like a ruler's pointer. */</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        aria-hidden</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"true"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"pointer-events-none absolute top-1/2 left-0.5 h-px w-1 -translate-y-1/2 bg-muted-foreground"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        aria-hidden</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"true"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"pointer-events-none absolute top-1/2 right-0.5 h-px w-1 -translate-y-1/2 bg-muted-foreground"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">columns.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">column</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">WheelColumnView</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          column</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">column</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          key</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">column.id</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          onSelect</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">optionValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> select</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(column.id, optionValue)</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          selected</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">value[column.id]</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ))</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> WheelColumnView</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  column</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  selected</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  onSelect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  column</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> WheelColumn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  selected</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  onSelect</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> void</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">options</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">loop</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> column;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> count</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> options.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> selectedIndex</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">max</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    options.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">findIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">option</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> option.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> selected),</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">    0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  );</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> reduceMotion</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> usePrefersReducedMotion</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // Position on the drum in rows. A looping wheel uses an unbounded</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // "virtual" index so it can spin forever; the option is index mod count.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> position</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useMotionValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(selectedIndex);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">center</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">setCenter</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(selectedIndex);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> animation</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">AnimationPlaybackControls</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> pointerType</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"mouse"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> drag</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;{</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">    id</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">    startY</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">    startPosition</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">    moved</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">    samples</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">t</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">; </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">v</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }[];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">|</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> columnRef</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLDivElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> drum</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useTransform</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    position,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> \`translateZ(\${</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">RADIUS</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}px) rotateX(\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">p</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> *</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> ITEM_ANGLE</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}deg)\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  );</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> optionAt</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">index</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> options[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">mod</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(index, count)];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useMotionValueEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(position, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"change"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> rounded</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">round</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(p);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (rounded </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> center) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      setCenter</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(rounded);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (pointerType.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "touch"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">        hapticTick</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // Follow the selection when it changes from outside (controlled value,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // keyboard, another column re-rendering the parent).</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (drag.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> animation.current) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> current</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> mod</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">round</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()), count);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> selectedIndex) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">    // Take the short way round on a looping wheel.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> delta </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> selectedIndex </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> current;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (loop </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">abs</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(delta) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> count </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      delta </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">sign</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(delta) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> count;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">jump</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">round</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> delta);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }, [selectedIndex, count, loop, position]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> animation.current?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">stop</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(), []);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> settle</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    animation.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    onSelect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">optionAt</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">round</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">())).value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> clampIndex</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">index</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    loop </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> index </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">min</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">max</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(index, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">), count </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> goTo</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">target</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    animation.current?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">stop</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    animation.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (reduceMotion) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">jump</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(target);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      settle</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    animation.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> animate</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(position, target, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      type: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"spring"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      duration: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0.4</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      bounce: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0.15</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      restDelta: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0.001</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      onComplete: settle,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // Past the ends of a non-looping wheel the drum keeps following the</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // finger, but less and less, then springs back on release.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> withOverscroll</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">raw</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (loop) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> raw;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (raw </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> -</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">damp</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">raw, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">MAX_OVERSCROLL</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (raw </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> count </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> count </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> +</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> damp</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(raw </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (count </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">), </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">MAX_OVERSCROLL</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> raw;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> handlePointerDown</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">event</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> PointerEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLDivElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (drag.current) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (event.pointerType </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "mouse"</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> event.button </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    animation.current?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">stop</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    animation.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    pointerType.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> event.pointerType;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    event.currentTarget.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">setPointerCapture</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(event.pointerId);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    drag.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      id: event.pointerId,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      startY: event.clientY,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      startPosition: position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      moved: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      samples: [{ t: event.timeStamp, v: position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() }],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> handlePointerMove</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">event</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> PointerEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLDivElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> current</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> drag.current;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> current.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> event.pointerId) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> dy</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> event.clientY </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> current.startY;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">current.moved </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">abs</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(dy) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> TAP_SLOP</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    current.moved </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> raw</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> current.startPosition </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> dy </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> ITEM_HEIGHT</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">withOverscroll</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(raw));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    current.samples.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({ t: event.timeStamp, v: raw });</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    while</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      current.samples.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      event.timeStamp </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> current.samples[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">].t </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> VELOCITY_WINDOW_MS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    ) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      current.samples.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">shift</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> handlePointerUp</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">event</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> PointerEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLDivElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> current</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> drag.current;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> current.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> event.pointerId) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    drag.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">current.moved </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> event.type </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "pointerup"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">      // Cancelled before it became a drag: settle where it is.</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      goTo</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">clampIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">round</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">())));</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">current.moved) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">      // A tap: turn to the row under the finger. asin undoes the drum's</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">      // foreshortening, so rows near the edges are hit accurately too.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> rect</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> event.currentTarget.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">getBoundingClientRect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> offsetY</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> event.clientY </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (rect.top </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rect.height </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> ratio</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">max</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">min</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, offsetY </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> RADIUS</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">));</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> rows</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">round</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">asin</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(ratio) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 180</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">PI</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> /</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> ITEM_ANGLE</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      goTo</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">clampIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">round</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rows));</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> first</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> current.samples[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> last</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> current.samples.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">at</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> first;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> elapsed</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (last.t </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> first.t) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1000</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">    // Holding still before letting go is a placement, not a flick.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> paused</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> event.timeStamp </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> last.t </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> VELOCITY_WINDOW_MS</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> velocity</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> elapsed </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">paused </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (last.v </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> first.v) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> elapsed </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> p</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> outOfBounds</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">loop </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (p </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> p </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> count </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (reduceMotion </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> outOfBounds </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">abs</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(velocity) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      goTo</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">clampIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">round</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(p)));</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">    // A flick spins the drum, slows down, and lands exactly on a row. On a</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">    // non-looping wheel it bounces off the end if it runs out of options.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    animation.current?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">stop</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">    // Project where the flick would coast to, land that on a whole row,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">    // then spring there carrying the release velocity. Critically damped, so</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">    // it decelerates smoothly; past a non-looping end it overshoots slightly</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">    // and settles back, which reads as a bounce.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> target</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> clampIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">round</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(p </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> velocity </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> COAST</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    animation.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> animate</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(position, target, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      type: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"spring"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      velocity,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      stiffness: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">140</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      damping: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">24</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      restDelta: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0.005</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      onComplete: settle,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // Keyboard steps are instant: they repeat quickly, and a spin per press</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // would always be a step behind.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> handleKeyDown</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">event</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> KeyboardEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLDivElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> index</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">round</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">());</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> moves</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Record</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">> </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ArrowUp: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ArrowDown: </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      PageUp: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      PageDown: </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    };</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> target</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (event.key </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "Home"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      target </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> index </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> mod</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(index, count);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">else</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (event.key </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "End"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      target </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> index </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> mod</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(index, count) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> count </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">else</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (event.key </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> moves) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      target </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> clampIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(index </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> moves[event.key]);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    event.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">preventDefault</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    animation.current?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">stop</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    pointerType.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "keyboard"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">jump</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(target);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    settle</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // Wheel and trackpad scrolling turn the drum, then it settles on the</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // nearest row once the scrolling stops. The listener is attached once and</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // reads the latest props through a ref, so a re-render mid-scroll (the</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // drum crossing a row) can't drop the pending settle.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> wheel</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({ loop, count, goTo, clampIndex });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  wheel.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { loop, count, goTo, clampIndex };</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> node</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> columnRef.current;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">node) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> timer</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> onWheel</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">event</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> WheelEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      event.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">preventDefault</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> latest</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> wheel.current;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      animation.current?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">stop</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      animation.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      pointerType.current </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "mouse"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> raw</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (event.deltaY </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> ITEM_HEIGHT</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0.4</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        latest.loop</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> raw</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          :</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">min</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">max</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(raw, </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0.4</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">), latest.count </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> +</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0.4</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">clearTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(timer);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      timer </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">setTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> settled</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> wheel.current;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        settled.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">goTo</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(settled.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">clampIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">round</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">())));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">120</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    node.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"wheel"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, onWheel, { passive: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> });</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      node.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">removeEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"wheel"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, onWheel);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">clearTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(timer);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }, [position]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> rows</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  for</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> center </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> WINDOW</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">; i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x3C;=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> center </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> WINDOW</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">; i</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (loop </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">>=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x3C;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> count)) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      rows.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(i);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">column.label</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      aria-valuemax</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">count </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      aria-valuemin</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      aria-valuenow</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">selectedIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      aria-valuetext</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">options[selectedIndex]?.label</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">        "relative cursor-grab touch-none rounded-lg outline-none active:cursor-grabbing"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        column.className </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> "w-16"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      onKeyDown</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">handleKeyDown</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      onLostPointerCapture</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">handlePointerUp</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      onPointerCancel</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">handlePointerUp</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      onPointerDown</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">handlePointerDown</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      onPointerMove</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">handlePointerMove</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      onPointerUp</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">handlePointerUp</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      ref</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">columnRef</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      role</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"spinbutton"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      style</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{ height: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">VIEW_HEIGHT</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      tabIndex</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      {</span><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/* The fade sits on an inner layer so the focus ring stays crisp. */</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"absolute inset-0"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        style</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          maskImage:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">            "linear-gradient(to bottom, transparent, black 34%, black 66%, transparent)"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Drum</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          drum</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">drum</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          optionAt</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">optionAt</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          rowClassName</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"text-muted-foreground"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          rows</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">rows</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Drum</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          clip</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          drum</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">drum</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          optionAt</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">optionAt</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          rowClassName</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"font-medium text-foreground"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          rows</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">rows</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> Drum</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  drum</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  rows</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  optionAt</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  rowClassName</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  clip</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  drum</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> MotionValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  rows</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[];</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  optionAt</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">index</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> WheelOption</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  rowClassName</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  clip</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      aria-hidden</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"true"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"pointer-events-none absolute inset-0"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      style</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        perspective: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1000</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        clipPath: clip</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          ?</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> \`inset(calc(50% - \${</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">ITEM_HEIGHT</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> /</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}px) 0 calc(50% - \${</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">ITEM_HEIGHT</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> /</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}px) 0)\`</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          :</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">motion.div</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"absolute inset-x-0 top-1/2"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        style</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{ transform: drum, transformStyle: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"preserve-3d"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">        {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">rows.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">index</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">              "absolute inset-x-0 flex items-center justify-center text-xl tabular-nums [backface-visibility:hidden]"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              rowClassName</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            key</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">index</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            style</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              top: </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">ITEM_HEIGHT</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> /</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              height: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">ITEM_HEIGHT</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              transform: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">\`rotateX(\${</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">index</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> *</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> ITEM_ANGLE</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}deg) translateZ(\${</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">RADIUS</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}px)\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">            {</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">optionAt</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(index).label</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        ))</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">motion.div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span></code></pre>`,raw:`import {\r
  type AnimationPlaybackControls,\r
  animate,\r
  type MotionValue,\r
  motion,\r
  useMotionValue,\r
  useMotionValueEvent,\r
  useReducedMotion,\r
  useReducedMotionConfig,\r
  useTransform,\r
} from "motion/react";\r
import {\r
  type KeyboardEvent,\r
  type PointerEvent,\r
  useEffect,\r
  useRef,\r
  useState,\r
} from "react";\r
import { cn } from "@/lib/utils";\r
\r
/** OS setting, or forced on with <MotionConfig reducedMotion="always">. */\r
function usePrefersReducedMotion() {\r
  const os = useReducedMotion();\r
  const forced = useReducedMotionConfig();\r
  return Boolean(os || forced);\r
}\r
\r
export interface WheelOption {\r
  value: string;\r
  label: string;\r
}\r
\r
export interface WheelColumn {\r
  id: string;\r
  /** Accessible name of the column, e.g. "Hours". */\r
  label: string;\r
  options: WheelOption[];\r
  /** Wrap around from the last option to the first. */\r
  loop?: boolean;\r
  /** Tailwind width class for the column. */\r
  className?: string;\r
}\r
\r
const range = (count: number, format: (i: number) => string) =>\r
  Array.from({ length: count }, (_, i) => ({\r
    value: String(i),\r
    label: format(i),\r
  }));\r
\r
const DEFAULT_COLUMNS: WheelColumn[] = [\r
  {\r
    id: "hour",\r
    label: "Hours",\r
    loop: true,\r
    className: "w-16",\r
    options: range(12, (i) => String(i + 1)),\r
  },\r
  {\r
    id: "minute",\r
    label: "Minutes",\r
    loop: true,\r
    className: "w-16",\r
    options: range(60, (i) => String(i).padStart(2, "0")),\r
  },\r
  {\r
    id: "period",\r
    label: "AM or PM",\r
    className: "w-16",\r
    options: [\r
      { value: "am", label: "AM" },\r
      { value: "pm", label: "PM" },\r
    ],\r
  },\r
];\r
\r
const DEFAULT_VALUE: Record<string, string> = {\r
  hour: "8",\r
  minute: "41",\r
  period: "am",\r
};\r
\r
const ITEM_HEIGHT = 36;\r
// Each row sits this many degrees further round the drum.\r
const ITEM_ANGLE = 20;\r
// Drum radius that makes neighbouring rows touch exactly.\r
// Rounded so server and browser trig can't disagree in the markup.\r
const RADIUS =\r
  Math.round(\r
    (ITEM_HEIGHT / 2 / Math.tan((ITEM_ANGLE / 2) * (Math.PI / 180))) * 100\r
  ) / 100;\r
// Rows past ±90° face away; render a few either side of that and no more.\r
const WINDOW = Math.ceil(90 / ITEM_ANGLE);\r
const VIEW_HEIGHT = Math.round(RADIUS * 2) + ITEM_HEIGHT / 2;\r
// A non-looping wheel can be dragged this many rows past either end.\r
const MAX_OVERSCROLL = 1.2;\r
const VELOCITY_WINDOW_MS = 80;\r
const TAP_SLOP = 4;\r
// Seconds of travel a flick is worth: release speed × COAST = rows coasted.\r
const COAST = 0.32;\r
\r
const mod = (n: number, m: number) => ((n % m) + m) % m;\r
\r
function damp(distance: number, max: number) {\r
  return max * (1 - Math.exp(-distance / max));\r
}\r
\r
function hapticTick() {\r
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {\r
    navigator.vibrate(1);\r
  }\r
}\r
\r
export interface WheelPickerProps {\r
  /** The wheels, left to right. Defaults to a 12-hour time picker. */\r
  columns?: WheelColumn[];\r
  /** Controlled selection, keyed by column id. */\r
  value?: Record<string, string>;\r
  /** Initial selection when uncontrolled. */\r
  defaultValue?: Record<string, string>;\r
  /** Called once a wheel comes to rest on a new option. */\r
  onValueChange?: (value: Record<string, string>) => void;\r
  /** Accessible name for the whole picker. */\r
  label?: string;\r
  /** Extra classes for the wrapper. */\r
  className?: string;\r
}\r
\r
/**\r
 * An iOS-style drum picker. Each column is a real 3D cylinder: rows are\r
 * placed round it with \`rotateX() translateZ()\` and the whole drum turns\r
 * with a single transform, so a frame costs one style write per column.\r
 *\r
 * The drum is drawn twice. The bottom copy is muted; the top copy is in full\r
 * color and clipped to the selection band. Text turns dark exactly as it\r
 * crosses the band's edge, the way the native picker does. Hairline ticks\r
 * mark the band's ends.\r
 */\r
export function WheelPicker({\r
  columns = DEFAULT_COLUMNS,\r
  value: valueProp,\r
  defaultValue = DEFAULT_VALUE,\r
  onValueChange,\r
  label = "Time",\r
  className,\r
}: WheelPickerProps) {\r
  const [internal, setInternal] = useState(defaultValue);\r
  const value = valueProp ?? internal;\r
  // A column settles from a callback made when its spin started. If another\r
  // column changed in the meantime, merging into that render's \`value\`\r
  // would undo it, so merge into the latest selection instead.\r
  const latestValue = useRef(value);\r
  latestValue.current = value;\r
\r
  const select = (columnId: string, optionValue: string) => {\r
    const current = latestValue.current;\r
    if (current[columnId] === optionValue) {\r
      return;\r
    }\r
    const next = { ...current, [columnId]: optionValue };\r
    latestValue.current = next;\r
    if (valueProp === undefined) {\r
      setInternal(next);\r
    }\r
    onValueChange?.(next);\r
  };\r
\r
  return (\r
    // biome-ignore lint/a11y/useSemanticElements: a fieldset would add a border and legend layout the picker doesn't want.\r
    <div\r
      aria-label={label}\r
      className={cn(\r
        "relative flex select-none justify-center rounded-2xl border border-border bg-card px-3 text-card-foreground",\r
        className\r
      )}\r
      role="group"\r
    >\r
      {/* The selection band, shared by every column. */}\r
      <div\r
        aria-hidden="true"\r
        className="pointer-events-none absolute inset-x-2 top-1/2 -translate-y-1/2 rounded-lg bg-muted"\r
        style={{ height: ITEM_HEIGHT }}\r
      />\r
      {/* Hairline ticks either side of the band, like a ruler's pointer. */}\r
      <span\r
        aria-hidden="true"\r
        className="pointer-events-none absolute top-1/2 left-0.5 h-px w-1 -translate-y-1/2 bg-muted-foreground"\r
      />\r
      <span\r
        aria-hidden="true"\r
        className="pointer-events-none absolute top-1/2 right-0.5 h-px w-1 -translate-y-1/2 bg-muted-foreground"\r
      />\r
      {columns.map((column) => (\r
        <WheelColumnView\r
          column={column}\r
          key={column.id}\r
          onSelect={(optionValue) => select(column.id, optionValue)}\r
          selected={value[column.id]}\r
        />\r
      ))}\r
    </div>\r
  );\r
}\r
\r
function WheelColumnView({\r
  column,\r
  selected,\r
  onSelect,\r
}: {\r
  column: WheelColumn;\r
  selected: string | undefined;\r
  onSelect: (value: string) => void;\r
}) {\r
  const { options, loop = false } = column;\r
  const count = options.length;\r
  const selectedIndex = Math.max(\r
    options.findIndex((option) => option.value === selected),\r
    0\r
  );\r
  const reduceMotion = usePrefersReducedMotion();\r
\r
  // Position on the drum in rows. A looping wheel uses an unbounded\r
  // "virtual" index so it can spin forever; the option is index mod count.\r
  const position = useMotionValue(selectedIndex);\r
  const [center, setCenter] = useState(selectedIndex);\r
  const animation = useRef<AnimationPlaybackControls | null>(null);\r
  const pointerType = useRef("mouse");\r
  const drag = useRef<{\r
    id: number;\r
    startY: number;\r
    startPosition: number;\r
    moved: boolean;\r
    samples: { t: number; v: number }[];\r
  } | null>(null);\r
  const columnRef = useRef<HTMLDivElement>(null);\r
\r
  const drum = useTransform(\r
    position,\r
    (p) => \`translateZ(\${-RADIUS}px) rotateX(\${p * ITEM_ANGLE}deg)\`\r
  );\r
\r
  const optionAt = (index: number) => options[mod(index, count)];\r
\r
  useMotionValueEvent(position, "change", (p) => {\r
    const rounded = Math.round(p);\r
    if (rounded !== center) {\r
      setCenter(rounded);\r
      if (pointerType.current === "touch") {\r
        hapticTick();\r
      }\r
    }\r
  });\r
\r
  // Follow the selection when it changes from outside (controlled value,\r
  // keyboard, another column re-rendering the parent).\r
  useEffect(() => {\r
    if (drag.current || animation.current) {\r
      return;\r
    }\r
    const current = mod(Math.round(position.get()), count);\r
    if (current === selectedIndex) {\r
      return;\r
    }\r
    // Take the short way round on a looping wheel.\r
    let delta = selectedIndex - current;\r
    if (loop && Math.abs(delta) > count / 2) {\r
      delta -= Math.sign(delta) * count;\r
    }\r
    position.jump(Math.round(position.get()) + delta);\r
  }, [selectedIndex, count, loop, position]);\r
\r
  useEffect(() => () => animation.current?.stop(), []);\r
\r
  const settle = () => {\r
    animation.current = null;\r
    onSelect(optionAt(Math.round(position.get())).value);\r
  };\r
\r
  const clampIndex = (index: number) =>\r
    loop ? index : Math.min(Math.max(index, 0), count - 1);\r
\r
  const goTo = (target: number) => {\r
    animation.current?.stop();\r
    animation.current = null;\r
    if (reduceMotion) {\r
      position.jump(target);\r
      settle();\r
      return;\r
    }\r
    animation.current = animate(position, target, {\r
      type: "spring",\r
      duration: 0.4,\r
      bounce: 0.15,\r
      restDelta: 0.001,\r
      onComplete: settle,\r
    });\r
  };\r
\r
  // Past the ends of a non-looping wheel the drum keeps following the\r
  // finger, but less and less, then springs back on release.\r
  const withOverscroll = (raw: number) => {\r
    if (loop) {\r
      return raw;\r
    }\r
    if (raw < 0) {\r
      return -damp(-raw, MAX_OVERSCROLL);\r
    }\r
    if (raw > count - 1) {\r
      return count - 1 + damp(raw - (count - 1), MAX_OVERSCROLL);\r
    }\r
    return raw;\r
  };\r
\r
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {\r
    if (drag.current) {\r
      return;\r
    }\r
    if (event.pointerType === "mouse" && event.button !== 0) {\r
      return;\r
    }\r
    animation.current?.stop();\r
    animation.current = null;\r
    pointerType.current = event.pointerType;\r
    event.currentTarget.setPointerCapture(event.pointerId);\r
    drag.current = {\r
      id: event.pointerId,\r
      startY: event.clientY,\r
      startPosition: position.get(),\r
      moved: false,\r
      samples: [{ t: event.timeStamp, v: position.get() }],\r
    };\r
  };\r
\r
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {\r
    const current = drag.current;\r
    if (!current || current.id !== event.pointerId) {\r
      return;\r
    }\r
    const dy = event.clientY - current.startY;\r
    if (!current.moved && Math.abs(dy) < TAP_SLOP) {\r
      return;\r
    }\r
    current.moved = true;\r
    const raw = current.startPosition - dy / ITEM_HEIGHT;\r
    position.set(withOverscroll(raw));\r
    current.samples.push({ t: event.timeStamp, v: raw });\r
    while (\r
      current.samples.length > 2 &&\r
      event.timeStamp - current.samples[0].t > VELOCITY_WINDOW_MS\r
    ) {\r
      current.samples.shift();\r
    }\r
  };\r
\r
  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {\r
    const current = drag.current;\r
    if (!current || current.id !== event.pointerId) {\r
      return;\r
    }\r
    drag.current = null;\r
\r
    if (!current.moved && event.type !== "pointerup") {\r
      // Cancelled before it became a drag: settle where it is.\r
      goTo(clampIndex(Math.round(position.get())));\r
      return;\r
    }\r
    if (!current.moved) {\r
      // A tap: turn to the row under the finger. asin undoes the drum's\r
      // foreshortening, so rows near the edges are hit accurately too.\r
      const rect = event.currentTarget.getBoundingClientRect();\r
      const offsetY = event.clientY - (rect.top + rect.height / 2);\r
      const ratio = Math.max(-1, Math.min(1, offsetY / RADIUS));\r
      const rows = Math.round((Math.asin(ratio) * 180) / Math.PI / ITEM_ANGLE);\r
      goTo(clampIndex(Math.round(position.get()) + rows));\r
      return;\r
    }\r
\r
    const first = current.samples[0];\r
    const last = current.samples.at(-1) ?? first;\r
    const elapsed = (last.t - first.t) / 1000;\r
    // Holding still before letting go is a placement, not a flick.\r
    const paused = event.timeStamp - last.t > VELOCITY_WINDOW_MS;\r
    const velocity = elapsed > 0 && !paused ? (last.v - first.v) / elapsed : 0;\r
    const p = position.get();\r
    const outOfBounds = !loop && (p < 0 || p > count - 1);\r
\r
    if (reduceMotion || outOfBounds || Math.abs(velocity) < 2) {\r
      goTo(clampIndex(Math.round(p)));\r
      return;\r
    }\r
    // A flick spins the drum, slows down, and lands exactly on a row. On a\r
    // non-looping wheel it bounces off the end if it runs out of options.\r
    animation.current?.stop();\r
    // Project where the flick would coast to, land that on a whole row,\r
    // then spring there carrying the release velocity. Critically damped, so\r
    // it decelerates smoothly; past a non-looping end it overshoots slightly\r
    // and settles back, which reads as a bounce.\r
    const target = clampIndex(Math.round(p + velocity * COAST));\r
    animation.current = animate(position, target, {\r
      type: "spring",\r
      velocity,\r
      stiffness: 140,\r
      damping: 24,\r
      restDelta: 0.005,\r
      onComplete: settle,\r
    });\r
  };\r
\r
  // Keyboard steps are instant: they repeat quickly, and a spin per press\r
  // would always be a step behind.\r
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {\r
    const index = Math.round(position.get());\r
    const moves: Record<string, number> = {\r
      ArrowUp: 1,\r
      ArrowDown: -1,\r
      PageUp: 5,\r
      PageDown: -5,\r
    };\r
    let target: number;\r
    if (event.key === "Home") {\r
      target = index - mod(index, count);\r
    } else if (event.key === "End") {\r
      target = index - mod(index, count) + count - 1;\r
    } else if (event.key in moves) {\r
      target = clampIndex(index + moves[event.key]);\r
    } else {\r
      return;\r
    }\r
    event.preventDefault();\r
    animation.current?.stop();\r
    pointerType.current = "keyboard";\r
    position.jump(target);\r
    settle();\r
  };\r
\r
  // Wheel and trackpad scrolling turn the drum, then it settles on the\r
  // nearest row once the scrolling stops. The listener is attached once and\r
  // reads the latest props through a ref, so a re-render mid-scroll (the\r
  // drum crossing a row) can't drop the pending settle.\r
  const wheel = useRef({ loop, count, goTo, clampIndex });\r
  wheel.current = { loop, count, goTo, clampIndex };\r
  useEffect(() => {\r
    const node = columnRef.current;\r
    if (!node) {\r
      return;\r
    }\r
    let timer: number | undefined;\r
    const onWheel = (event: WheelEvent) => {\r
      event.preventDefault();\r
      const latest = wheel.current;\r
      animation.current?.stop();\r
      animation.current = null;\r
      pointerType.current = "mouse";\r
      const raw = position.get() + (event.deltaY / ITEM_HEIGHT) * 0.4;\r
      position.set(\r
        latest.loop\r
          ? raw\r
          : Math.min(Math.max(raw, -0.4), latest.count - 1 + 0.4)\r
      );\r
      window.clearTimeout(timer);\r
      timer = window.setTimeout(() => {\r
        const settled = wheel.current;\r
        settled.goTo(settled.clampIndex(Math.round(position.get())));\r
      }, 120);\r
    };\r
    node.addEventListener("wheel", onWheel, { passive: false });\r
    return () => {\r
      node.removeEventListener("wheel", onWheel);\r
      window.clearTimeout(timer);\r
    };\r
  }, [position]);\r
\r
  const rows: number[] = [];\r
  for (let i = center - WINDOW; i <= center + WINDOW; i++) {\r
    if (loop || (i >= 0 && i < count)) {\r
      rows.push(i);\r
    }\r
  }\r
\r
  return (\r
    <div\r
      aria-label={column.label}\r
      aria-valuemax={count - 1}\r
      aria-valuemin={0}\r
      aria-valuenow={selectedIndex}\r
      aria-valuetext={options[selectedIndex]?.label}\r
      className={cn(\r
        "relative cursor-grab touch-none rounded-lg outline-none active:cursor-grabbing",\r
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",\r
        column.className ?? "w-16"\r
      )}\r
      onKeyDown={handleKeyDown}\r
      onLostPointerCapture={handlePointerUp}\r
      onPointerCancel={handlePointerUp}\r
      onPointerDown={handlePointerDown}\r
      onPointerMove={handlePointerMove}\r
      onPointerUp={handlePointerUp}\r
      ref={columnRef}\r
      role="spinbutton"\r
      style={{ height: VIEW_HEIGHT }}\r
      tabIndex={0}\r
    >\r
      {/* The fade sits on an inner layer so the focus ring stays crisp. */}\r
      <div\r
        className="absolute inset-0"\r
        style={{\r
          maskImage:\r
            "linear-gradient(to bottom, transparent, black 34%, black 66%, transparent)",\r
        }}\r
      >\r
        <Drum\r
          drum={drum}\r
          optionAt={optionAt}\r
          rowClassName="text-muted-foreground"\r
          rows={rows}\r
        />\r
        <Drum\r
          clip\r
          drum={drum}\r
          optionAt={optionAt}\r
          rowClassName="font-medium text-foreground"\r
          rows={rows}\r
        />\r
      </div>\r
    </div>\r
  );\r
}\r
\r
function Drum({\r
  drum,\r
  rows,\r
  optionAt,\r
  rowClassName,\r
  clip = false,\r
}: {\r
  drum: MotionValue<string>;\r
  rows: number[];\r
  optionAt: (index: number) => WheelOption;\r
  rowClassName: string;\r
  clip?: boolean;\r
}) {\r
  return (\r
    <div\r
      aria-hidden="true"\r
      className="pointer-events-none absolute inset-0"\r
      style={{\r
        perspective: 1000,\r
        clipPath: clip\r
          ? \`inset(calc(50% - \${ITEM_HEIGHT / 2}px) 0 calc(50% - \${ITEM_HEIGHT / 2}px) 0)\`\r
          : undefined,\r
      }}\r
    >\r
      <motion.div\r
        className="absolute inset-x-0 top-1/2"\r
        style={{ transform: drum, transformStyle: "preserve-3d" }}\r
      >\r
        {rows.map((index) => (\r
          <div\r
            className={cn(\r
              "absolute inset-x-0 flex items-center justify-center text-xl tabular-nums [backface-visibility:hidden]",\r
              rowClassName\r
            )}\r
            key={index}\r
            style={{\r
              top: -ITEM_HEIGHT / 2,\r
              height: ITEM_HEIGHT,\r
              transform: \`rotateX(\${-index * ITEM_ANGLE}deg) translateZ(\${RADIUS}px)\`,\r
            }}\r
          >\r
            {optionAt(index).label}\r
          </div>\r
        ))}\r
      </motion.div>\r
    </div>\r
  );\r
}\r
`}],n=`<pre class="shiki shiki-themes github-light github-dark-default" style="--shiki-light:#24292e;--shiki-dark:#e6edf3;--shiki-light-bg:#fff;--shiki-dark-bg:#0d1117" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { useState } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'react'</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { WheelPicker } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> '@/components/wheel-picker'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> WheelPickerDemo</span><span style="--shiki-light:#24292E;--shiki-dark:#FFA657">() </span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">setValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">Record</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>>({ hour: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'8'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, minute: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'41'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, period: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'am'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> })</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> pad</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">n</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> n.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">padStart</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'0'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex flex-col items-center gap-3"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">WheelPicker</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"Alarm time"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> value</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">value</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> onValueChange</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">setValue</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"text-sm text-muted-foreground tabular-nums"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        Alarm set for </span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">Number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(value.hour) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">:</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">pad</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(value.minute)</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72"> {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">value.period?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">toUpperCase</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span></code></pre>`,r=`import { useState } from 'react'
import { WheelPicker } from '@/components/wheel-picker'

export default function WheelPickerDemo() {
  const [value, setValue] = useState<Record<string, string>>({ hour: '8', minute: '41', period: 'am' })
  const pad = (n: string) => n.padStart(2, '0')
  return (
    <div className="flex flex-col items-center gap-3">
      <WheelPicker label="Alarm time" value={value} onValueChange={setValue} />
      <p className="text-sm text-muted-foreground tabular-nums">
        Alarm set for {Number(value.hour) + 1}:{pad(value.minute)} {value.period?.toUpperCase()}
      </p>
    </div>
  )
}
`,i=[],a={props:e,files:t,usage:n,usageRaw:r,variants:i};export{a as default,t as files,e as props,n as usage,r as usageRaw,i as variants};