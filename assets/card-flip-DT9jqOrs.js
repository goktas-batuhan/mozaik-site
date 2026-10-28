var e=[{name:`front`,type:`ReactNode`,description:`Content of the front face. Keep it non-interactive: the card is the button.`},{name:`back`,type:`ReactNode`,description:`Content of the back face.`},{name:`trigger`,type:`'click' | 'hover'`,default:`'click'`,description:`hover also flips while a mouse is over the card. Click and keyboard always flip.`},{name:`axis`,type:`'x' | 'y'`,default:`'y'`,description:`Axis the card turns around.`},{name:`flipped`,type:`boolean`,description:`Controlled state; true shows the back.`},{name:`defaultFlipped`,type:`boolean`,default:`false`,description:`Initial state when uncontrolled.`},{name:`onFlippedChange`,type:`(flipped: boolean) => void`,description:`Called with the new state.`},{name:`className`,type:`string`,description:`Extra classes for the card. Set its size here.`}],t=[{name:`card-flip.tsx`,lines:122,html:`<pre class="shiki shiki-themes github-light github-dark-default" style="--shiki-light:#24292e;--shiki-dark:#e6edf3;--shiki-light-bg:#fff;--shiki-dark-bg:#0d1117" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { motion, useReducedMotion, useReducedMotionConfig } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'motion/react'</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { useEffect, useState } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'react'</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { ComponentPropsWithoutRef, ReactNode, Ref } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'react'</span></span>
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
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> CardFlipProps</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> Omit</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">ComponentPropsWithoutRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'button'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'children'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'onChange'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Content of the front face. Non-interactive: the card itself is the button. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  front</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ReactNode</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Content of the back face. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  back</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ReactNode</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** \`hover\` also flips while a mouse is over the card; every trigger flips on click, Enter and Space. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  trigger</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'click'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'hover'</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Axis the card turns around. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  axis</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'x'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'y'</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Controlled state. \`true\` shows the back. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  flipped</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Initial state when uncontrolled. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  defaultFlipped</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Called with the new state. */</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  onFlippedChange</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">flipped</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> void</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  ref</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLButtonElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/** A card that turns over to show its back, on click, keyboard or (optionally) hover. */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> CardFlip</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  front</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  back</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  trigger</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'click'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  axis</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'y'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  flipped</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  defaultFlipped</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  onFlippedChange</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  className</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  type</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'button'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  onClick</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  onPointerEnter</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  onPointerLeave</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  ...</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">props</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> CardFlipProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> reduced</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> usePrefersReducedMotion</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">inner</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">setInner</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(defaultFlipped)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">canHover</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">setCanHover</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> on</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> flipped </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> inner</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> query</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">matchMedia</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">HOVER_QUERY</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    setCanHover</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(query.matches)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> onChange</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> MediaQueryListEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> setCanHover</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(e.matches)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    query.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'change'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, onChange)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> query.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">removeEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'change'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, onChange)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }, [])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> set</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">next</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (flipped </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">setInner</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(next)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    onFlippedChange</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">?.(next)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> prop</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> axis </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'y'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ?</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'rotateY'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'rotateX'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">button</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      {</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">props</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      ref</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">ref</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      type</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">type</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      aria-pressed</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">on</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      data-flipped</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">on </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">        onClick</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">?.(e)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">e.defaultPrevented) </span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">on)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      onPointerEnter</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">        onPointerEnter</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">?.(e)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (trigger </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'hover'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> canHover </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> e.pointerType </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'mouse'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">on) </span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      onPointerLeave</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">        onPointerLeave</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">?.(e)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (trigger </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'hover'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> canHover </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> e.pointerType </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'mouse'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> on) </span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      style</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{ perspective: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1200</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">props.style }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">        'relative block h-56 w-72 cursor-pointer rounded-2xl text-left outline-none'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        className,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      )</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">motion.span</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"absolute inset-0 block"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        style</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{ transformStyle: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'preserve-3d'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        initial</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        animate</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{ [prop]: on </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 180</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        transition</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">reduced </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { duration: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { type: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'spring'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, stiffness: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">170</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, damping: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">22</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          data-face</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"front"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          aria-hidden</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">on</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"absolute inset-0 block overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-md"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          style</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{ backfaceVisibility: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'hidden'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">          {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">front</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          data-face</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"back"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          aria-hidden</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">on</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"absolute inset-0 block overflow-hidden rounded-2xl border border-border bg-primary text-primary-foreground shadow-md"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">          style</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{ backfaceVisibility: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'hidden'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, transform: axis </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'y'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ?</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'rotateY(180deg)'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'rotateX(180deg)'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">          {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">back</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">motion.span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span></code></pre>`,raw:`import { motion, useReducedMotion, useReducedMotionConfig } from 'motion/react'
import { useEffect, useState } from 'react'
import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react'
import { cn } from '@/lib/utils'

/** OS setting, or forced on with <MotionConfig reducedMotion="always">. */
function usePrefersReducedMotion() {
  const os = useReducedMotion()
  const forced = useReducedMotionConfig()
  return Boolean(os || forced)
}

const HOVER_QUERY = '(hover: hover) and (pointer: fine)'

export interface CardFlipProps extends Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onChange'> {
  /** Content of the front face. Non-interactive: the card itself is the button. */
  front: ReactNode
  /** Content of the back face. */
  back: ReactNode
  /** \`hover\` also flips while a mouse is over the card; every trigger flips on click, Enter and Space. */
  trigger?: 'click' | 'hover'
  /** Axis the card turns around. */
  axis?: 'x' | 'y'
  /** Controlled state. \`true\` shows the back. */
  flipped?: boolean
  /** Initial state when uncontrolled. */
  defaultFlipped?: boolean
  /** Called with the new state. */
  onFlippedChange?: (flipped: boolean) => void
  ref?: Ref<HTMLButtonElement>
}

/** A card that turns over to show its back, on click, keyboard or (optionally) hover. */
export function CardFlip({
  front,
  back,
  trigger = 'click',
  axis = 'y',
  flipped,
  defaultFlipped = false,
  onFlippedChange,
  className,
  type = 'button',
  onClick,
  onPointerEnter,
  onPointerLeave,
  ref,
  ...props
}: CardFlipProps) {
  const reduced = usePrefersReducedMotion()
  const [inner, setInner] = useState(defaultFlipped)
  const [canHover, setCanHover] = useState(false)
  const on = flipped ?? inner

  useEffect(() => {
    const query = window.matchMedia(HOVER_QUERY)
    setCanHover(query.matches)
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const set = (next: boolean) => {
    if (flipped === undefined) setInner(next)
    onFlippedChange?.(next)
  }
  const prop = axis === 'y' ? 'rotateY' : 'rotateX'

  return (
    <button
      {...props}
      ref={ref}
      type={type}
      aria-pressed={on}
      data-flipped={on || undefined}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) set(!on)
      }}
      onPointerEnter={(e) => {
        onPointerEnter?.(e)
        if (trigger === 'hover' && canHover && e.pointerType === 'mouse' && !on) set(true)
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e)
        if (trigger === 'hover' && canHover && e.pointerType === 'mouse' && on) set(false)
      }}
      style={{ perspective: 1200, ...props.style }}
      className={cn(
        'relative block h-56 w-72 cursor-pointer rounded-2xl text-left outline-none',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        className,
      )}
    >
      <motion.span
        className="absolute inset-0 block"
        style={{ transformStyle: 'preserve-3d' }}
        initial={false}
        animate={{ [prop]: on ? 180 : 0 }}
        transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 170, damping: 22 }}
      >
        <span
          data-face="front"
          aria-hidden={on}
          className="absolute inset-0 block overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-md"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {front}
        </span>
        <span
          data-face="back"
          aria-hidden={!on}
          className="absolute inset-0 block overflow-hidden rounded-2xl border border-border bg-primary text-primary-foreground shadow-md"
          style={{ backfaceVisibility: 'hidden', transform: axis === 'y' ? 'rotateY(180deg)' : 'rotateX(180deg)' }}
        >
          {back}
        </span>
      </motion.span>
    </button>
  )
}
`}],n=`<pre class="shiki shiki-themes github-light github-dark-default" style="--shiki-light:#24292e;--shiki-dark:#e6edf3;--shiki-light-bg:#fff;--shiki-dark-bg:#0d1117" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { CardFlip, </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> CardFlipProps } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> '@/components/card-flip'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> front</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex h-full flex-col justify-between p-6"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"text-xs tracking-widest text-muted-foreground uppercase"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>Mozaik Pass&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"block"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"block text-2xl font-semibold"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>Alex Rivera&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"block text-sm text-muted-foreground"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>Tap to see the details&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> back</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex h-full flex-col justify-between p-6"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"text-xs tracking-widest uppercase opacity-70"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>Details&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"block space-y-1 text-sm"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"block"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>Member since 2024&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"block"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>Tier: Collector&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"block"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>Tap again to flip back&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> CardFlipDemo</span><span style="--shiki-light:#24292E;--shiki-dark:#FFA657">() </span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex flex-wrap items-center justify-center gap-8"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">CardFlip</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> front</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">front</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> back</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">back</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">CardFlip</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> front</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">front</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> back</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">back</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> axis</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"x"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> trigger</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"hover"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"h-48 w-64"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> VariantPreview</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">props</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Omit</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">CardFlipProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'front'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'back'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">CardFlip</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> front</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">front</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> back</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">back</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72"> {</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">props</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span></code></pre>`,r=`import { CardFlip, type CardFlipProps } from '@/components/card-flip'

const front = (
  <span className="flex h-full flex-col justify-between p-6">
    <span className="text-xs tracking-widest text-muted-foreground uppercase">Mozaik Pass</span>
    <span className="block">
      <span className="block text-2xl font-semibold">Alex Rivera</span>
      <span className="block text-sm text-muted-foreground">Tap to see the details</span>
    </span>
  </span>
)

const back = (
  <span className="flex h-full flex-col justify-between p-6">
    <span className="text-xs tracking-widest uppercase opacity-70">Details</span>
    <span className="block space-y-1 text-sm">
      <span className="block">Member since 2024</span>
      <span className="block">Tier: Collector</span>
      <span className="block">Tap again to flip back</span>
    </span>
  </span>
)

export default function CardFlipDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <CardFlip front={front} back={back} />
      <CardFlip front={front} back={back} axis="x" trigger="hover" className="h-48 w-64" />
    </div>
  )
}

export function VariantPreview(props: Omit<CardFlipProps, 'front' | 'back'>) {
  return <CardFlip front={front} back={back} {...props} />
}
`,i=[],a={props:e,files:t,usage:n,usageRaw:r,variants:i};export{a as default,t as files,e as props,n as usage,r as usageRaw,i as variants};