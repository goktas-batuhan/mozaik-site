var e=[{name:`position`,type:`'top' | 'bottom' | 'both'`,default:`'bottom'`,description:`Which edge of the nearest positioned ancestor gets the blur.`},{name:`height`,type:`string`,default:`'30%'`,description:`Height of each blurred edge, as any CSS length.`},{name:`blurLevels`,type:`number[]`,default:`[0.5, 1, 2, 4, 8, 16, 32, 64]`,description:`Blur radius in px for each stacked layer, weakest first. More layers give a smoother ramp.`},{name:`className`,type:`string`,description:`Extra classes for each blurred edge.`}],t=[{name:`progressive-blur.tsx`,lines:89,html:`<pre class="shiki shiki-themes github-light github-dark-default" style="--shiki-light:#24292e;--shiki-dark:#e6edf3;--shiki-light-bg:#fff;--shiki-dark-bg:#0d1117" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { ComponentPropsWithoutRef } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'react'</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { cn } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> '@/lib/utils'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ProgressiveBlurProps</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> Omit</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">ComponentPropsWithoutRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'div'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'children'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Which edge of the nearest positioned ancestor gets the blur. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  position</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'top'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'bottom'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'both'</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Height of each blurred edge, as any CSS length. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  height</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Blur radius in px for each stacked layer, weakest first. More layers = smoother ramp. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  blurLevels</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[]</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> DEFAULT_LEVELS</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0.5</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">8</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">16</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">32</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">64</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/** One edge: stacked backdrop-filter layers, each masked to a band, so blur ramps up toward the edge. */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> Edge</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  edge</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  height</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  levels</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  className</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  ...</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">props</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  edge</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'top'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'bottom'</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  height</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  levels</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[]</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Omit</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">ComponentPropsWithoutRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'div'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'children'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> n</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> levels.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> step</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 100</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> /</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> n</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // The gradient runs from the inner (clear) side toward the screen edge.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> dir</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> edge </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'bottom'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ?</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'to bottom'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'to top'</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> pct</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">v</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> \`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">Math</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">min</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">100</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">, </span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">Math</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">round</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">v</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> *</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 100</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 100</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">)</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}%\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      aria-hidden</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"true"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">        'pointer-events-none absolute inset-x-0 z-10'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        edge </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'top'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ?</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'top-0'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'bottom-0'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        className,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      style</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{ height }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      {</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">props</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">levels.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">blur</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">i</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> last</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> n </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> mask</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> last</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          ?</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> \`linear-gradient(\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">dir</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}, transparent \${</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">pct</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">((</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">n</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> step</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">)</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}, black 100%)\`</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          :</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> \`linear-gradient(\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">dir</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}, transparent \${</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">pct</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">i</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> step</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">)</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}, black \${</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">pct</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">((</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">i</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> +</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> step</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">)</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}, black \${</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">pct</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">((</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">i</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> +</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> step</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">)</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}, transparent \${</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">pct</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">((</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">i</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> +</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 3</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> step</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">)</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">})\`</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            key</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">i</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"absolute inset-0"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            style</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              zIndex: i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              backdropFilter: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">\`blur(\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">blur</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}px)\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              WebkitBackdropFilter: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">\`blur(\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">blur</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}px)\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              maskImage: mask,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              WebkitMaskImage: mask,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      })</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/** Gradual blur over the edge of a scrolling area. Place it inside a \`relative\` wrapper, above the content. Purely decorative and static. */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> ProgressiveBlur</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  position</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'bottom'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  height</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> '30%'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  blurLevels</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> DEFAULT_LEVELS</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  className</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  ...</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">props</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ProgressiveBlurProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> levels</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> blurLevels.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> blurLevels </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> DEFAULT_LEVELS</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">position </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'bottom'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Edge</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> edge</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"top"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> height</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">height</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> levels</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">levels</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">className</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> data-position</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"top"</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72"> {</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">props</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">position </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'top'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Edge</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> edge</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"bottom"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> height</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">height</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> levels</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">levels</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">className</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> data-position</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"bottom"</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72"> {</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">props</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span></code></pre>`,raw:`import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export interface ProgressiveBlurProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  /** Which edge of the nearest positioned ancestor gets the blur. */
  position?: 'top' | 'bottom' | 'both'
  /** Height of each blurred edge, as any CSS length. */
  height?: string
  /** Blur radius in px for each stacked layer, weakest first. More layers = smoother ramp. */
  blurLevels?: number[]
  className?: string
}

const DEFAULT_LEVELS = [0.5, 1, 2, 4, 8, 16, 32, 64]

/** One edge: stacked backdrop-filter layers, each masked to a band, so blur ramps up toward the edge. */
function Edge({
  edge,
  height,
  levels,
  className,
  ...props
}: {
  edge: 'top' | 'bottom'
  height: string
  levels: number[]
  className?: string
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>) {
  const n = levels.length
  const step = 100 / n
  // The gradient runs from the inner (clear) side toward the screen edge.
  const dir = edge === 'bottom' ? 'to bottom' : 'to top'
  const pct = (v: number) => \`\${Math.min(100, Math.round(v * 100) / 100)}%\`

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-x-0 z-10',
        edge === 'top' ? 'top-0' : 'bottom-0',
        className,
      )}
      style={{ height }}
      {...props}
    >
      {levels.map((blur, i) => {
        const last = i === n - 1
        const mask = last
          ? \`linear-gradient(\${dir}, transparent \${pct((n - 1) * step)}, black 100%)\`
          : \`linear-gradient(\${dir}, transparent \${pct(i * step)}, black \${pct((i + 1) * step)}, black \${pct((i + 2) * step)}, transparent \${pct((i + 3) * step)})\`
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              zIndex: i + 1,
              backdropFilter: \`blur(\${blur}px)\`,
              WebkitBackdropFilter: \`blur(\${blur}px)\`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        )
      })}
    </div>
  )
}

/** Gradual blur over the edge of a scrolling area. Place it inside a \`relative\` wrapper, above the content. Purely decorative and static. */
export function ProgressiveBlur({
  position = 'bottom',
  height = '30%',
  blurLevels = DEFAULT_LEVELS,
  className,
  ...props
}: ProgressiveBlurProps) {
  const levels = blurLevels.length > 0 ? blurLevels : DEFAULT_LEVELS
  return (
    <>
      {position !== 'bottom' && (
        <Edge edge="top" height={height} levels={levels} className={className} data-position="top" {...props} />
      )}
      {position !== 'top' && (
        <Edge edge="bottom" height={height} levels={levels} className={className} data-position="bottom" {...props} />
      )}
    </>
  )
}
`}],n=`<pre class="shiki shiki-themes github-light github-dark-default" style="--shiki-light:#24292e;--shiki-dark:#e6edf3;--shiki-light-bg:#fff;--shiki-dark-bg:#0d1117" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { ProgressiveBlur } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> '@/components/progressive-blur'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> rows</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">  'Browse the gallery'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">  'Pick a component'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">  'Copy the source'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">  'Tune the props'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">  'Check reduced motion'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">  'Ship it'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">  'Write the changelog'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">  'Tag a release'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">  'Open the docs'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">  'Share the demo'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> ProgressiveBlurDemo</span><span style="--shiki-light:#24292E;--shiki-dark:#FFA657">() </span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"relative h-[22rem] w-[min(24rem,90vw)] overflow-hidden rounded-2xl border border-border bg-background"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"h-full overflow-y-auto p-4"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> tabIndex</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> role</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"region"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"Scrollable list"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">ul</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex flex-col gap-3"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">          {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">rows.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">r</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">i</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">li</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">              key</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">r</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">              className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-card-foreground"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"grid size-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-sm font-medium text-primary"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">                {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">              &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"text-sm font-medium"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">r</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">            &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">li</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          ))</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">ul</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">ProgressiveBlur</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> position</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"both"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> height</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"5rem"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span></code></pre>`,r=`import { ProgressiveBlur } from '@/components/progressive-blur'

const rows = [
  'Browse the gallery',
  'Pick a component',
  'Copy the source',
  'Tune the props',
  'Check reduced motion',
  'Ship it',
  'Write the changelog',
  'Tag a release',
  'Open the docs',
  'Share the demo',
]

export default function ProgressiveBlurDemo() {
  return (
    <div className="relative h-[22rem] w-[min(24rem,90vw)] overflow-hidden rounded-2xl border border-border bg-background">
      <div className="h-full overflow-y-auto p-4" tabIndex={0} role="region" aria-label="Scrollable list">
        <ul className="flex flex-col gap-3">
          {rows.map((r, i) => (
            <li
              key={r}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-card-foreground"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-sm font-medium text-primary">
                {i + 1}
              </span>
              <span className="text-sm font-medium">{r}</span>
            </li>
          ))}
        </ul>
      </div>
      <ProgressiveBlur position="both" height="5rem" />
    </div>
  )
}
`,i={props:e,files:t,usage:n,usageRaw:r};export{i as default,t as files,e as props,n as usage,r as usageRaw};