var e=[{name:`label`,type:`string`,description:`Text next to the dot.`},{name:`disabled`,type:`boolean`,default:`false`,description:`Disables the button.`},{name:`onClick`,type:`MouseEventHandler<HTMLButtonElement>`,description:`Called when the button is pressed.`},{name:`className`,type:`string`,description:`Extra classes for the button.`}],t=[{name:`dot-morph-button.tsx`,lines:93,html:`<pre class="shiki shiki-themes github-light github-dark-default" style="--shiki-light:#24292e;--shiki-dark:#e6edf3;--shiki-light-bg:#fff;--shiki-dark-bg:#0d1117" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { motion, useReducedMotion, useReducedMotionConfig } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'motion/react'</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { useEffect, useState } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'react'</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { ComponentPropsWithoutRef, Ref } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'react'</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { cn } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> '@/lib/utils'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/** OS setting, or forced on with &#x3C;MotionConfig reducedMotion="always">. */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> usePrefersReducedMotion</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> os</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useReducedMotion</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> forced</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useReducedMotionConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> Boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(os </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> forced)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> HOVER_QUERY</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> '(hover: hover) and (pointer: fine)'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> DotMorphButtonProps</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> ComponentPropsWithoutRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'button'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Text next to the dot. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  ref</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLButtonElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/** A pill button whose leading dot stretches into a bar on hover and focus. */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> DotMorphButton</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  label</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  className</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  type</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'button'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  disabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  onPointerEnter</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  onPointerLeave</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  onFocus</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  onBlur</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  ...</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">props</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> DotMorphButtonProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> reduced</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> usePrefersReducedMotion</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">hover</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">setHover</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">focus</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">setFocus</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">canHover</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">setCanHover</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> query</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">matchMedia</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">HOVER_QUERY</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setCanHover</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(query.matches)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> onChange</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> MediaQueryListEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> setCanHover</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(e.matches)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    query.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'change'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, onChange)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> query.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">removeEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'change'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, onChange)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }, [])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> morphed</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">reduced </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">disabled </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ((hover </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> canHover) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> focus)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">button</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      {</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">props</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      ref</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">ref</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      type</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">type</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      disabled</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">disabled</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      data-morphed</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">morphed </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      onPointerEnter</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">        setHover</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">        onPointerEnter</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">?.(e)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      onPointerLeave</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">        setHover</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">        onPointerLeave</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">?.(e)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      onFocus</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">        setFocus</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(e.currentTarget.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">matches</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">':focus-visible'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">))</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">        onFocus</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">?.(e)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      onBlur</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">        setFocus</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">        onBlur</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">?.(e)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">        'inline-flex h-12 cursor-pointer items-center gap-3 rounded-full border border-border bg-background px-6 text-lg font-medium whitespace-nowrap text-foreground select-none'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">        'disabled:pointer-events-none disabled:opacity-50'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        className,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> aria-hidden</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex h-7 w-4 items-center justify-center"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">motion.span</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          data-slot</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"dot"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"block bg-primary"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          initial</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          animate</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">morphed </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { width: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">12</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, height: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">28</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { width: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">16</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, height: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">16</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          style</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{ borderRadius: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">999</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          transition</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{ type: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'spring'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, stiffness: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">600</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, damping: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">22</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">label</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span></code></pre>`,raw:`import { motion, useReducedMotion, useReducedMotionConfig } from 'motion/react'
import { useEffect, useState } from 'react'
import type { ComponentPropsWithoutRef, Ref } from 'react'
import { cn } from '@/lib/utils'

/** OS setting, or forced on with <MotionConfig reducedMotion="always">. */
function usePrefersReducedMotion() {
  const os = useReducedMotion()
  const forced = useReducedMotionConfig()
  return Boolean(os || forced)
}

const HOVER_QUERY = '(hover: hover) and (pointer: fine)'

export interface DotMorphButtonProps extends ComponentPropsWithoutRef<'button'> {
  /** Text next to the dot. */
  label: string
  ref?: Ref<HTMLButtonElement>
}

/** A pill button whose leading dot stretches into a bar on hover and focus. */
export function DotMorphButton({
  label,
  className,
  type = 'button',
  disabled,
  ref,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...props
}: DotMorphButtonProps) {
  const reduced = usePrefersReducedMotion()
  const [hover, setHover] = useState(false)
  const [focus, setFocus] = useState(false)
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    const query = window.matchMedia(HOVER_QUERY)
    setCanHover(query.matches)
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const morphed = !reduced && !disabled && ((hover && canHover) || focus)

  return (
    <button
      {...props}
      ref={ref}
      type={type}
      disabled={disabled}
      data-morphed={morphed || undefined}
      onPointerEnter={(e) => {
        setHover(true)
        onPointerEnter?.(e)
      }}
      onPointerLeave={(e) => {
        setHover(false)
        onPointerLeave?.(e)
      }}
      onFocus={(e) => {
        setFocus(e.currentTarget.matches(':focus-visible'))
        onFocus?.(e)
      }}
      onBlur={(e) => {
        setFocus(false)
        onBlur?.(e)
      }}
      className={cn(
        'inline-flex h-12 cursor-pointer items-center gap-3 rounded-full border border-border bg-background px-6 text-lg font-medium whitespace-nowrap text-foreground select-none',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
    >
      <span aria-hidden className="flex h-7 w-4 items-center justify-center">
        <motion.span
          data-slot="dot"
          className="block bg-primary"
          initial={false}
          animate={morphed ? { width: 12, height: 28 } : { width: 16, height: 16 }}
          style={{ borderRadius: 999 }}
          transition={{ type: 'spring', stiffness: 600, damping: 22 }}
        />
      </span>
      {label}
    </button>
  )
}
`}],n=`<pre class="shiki shiki-themes github-light github-dark-default" style="--shiki-light:#24292e;--shiki-dark:#e6edf3;--shiki-light-bg:#fff;--shiki-dark-bg:#0d1117" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { DotMorphButton, </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> DotMorphButtonProps } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> '@/components/dot-morph-button'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> DotMorphButtonDemo</span><span style="--shiki-light:#24292E;--shiki-dark:#FFA657">() </span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex flex-col items-center gap-6"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">DotMorphButton</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"Get in touch"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex items-center gap-4"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">DotMorphButton</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"Say hello"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"h-10 text-base"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">DotMorphButton</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> label</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"Unavailable"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> disabled</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"h-10 text-base"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> VariantPreview</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">props</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> DotMorphButtonProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">DotMorphButton</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72"> {</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">props</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span></code></pre>`,r=`import { DotMorphButton, type DotMorphButtonProps } from '@/components/dot-morph-button'

export default function DotMorphButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <DotMorphButton label="Get in touch" />
      <div className="flex items-center gap-4">
        <DotMorphButton label="Say hello" className="h-10 text-base" />
        <DotMorphButton label="Unavailable" disabled className="h-10 text-base" />
      </div>
    </div>
  )
}

export function VariantPreview(props: DotMorphButtonProps) {
  return <DotMorphButton {...props} />
}
`,i=[],a={props:e,files:t,usage:n,usageRaw:r,variants:i};export{a as default,t as files,e as props,n as usage,r as usageRaw,i as variants};