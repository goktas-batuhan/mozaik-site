var e=[{name:`children`,type:`ReactNode`,description:`Content of the area. The ink is drawn above it and never blocks clicks.`},{name:`color`,type:`string`,description:`Any CSS color. Defaults to the primary token.`},{name:`lineWidth`,type:`number`,default:`3`,description:`Widest the line gets, in pixels.`},{name:`decay`,type:`number`,default:`800`,description:`Milliseconds a stretch of ink takes to fade out.`},{name:`taper`,type:`boolean`,default:`true`,description:`Thin the line where the cursor moves fast.`},{name:`clearOnLeave`,type:`boolean`,default:`true`,description:`Wipe the ink when the cursor leaves the area.`},{name:`disabled`,type:`boolean`,default:`false`,description:`Turns the ink off.`},{name:`className`,type:`string`,description:`Extra classes for the area.`}],t=[{name:`drawing-cursor.tsx`,lines:199,html:`<pre class="shiki shiki-themes github-light github-dark-default" style="--shiki-light:#24292e;--shiki-dark:#e6edf3;--shiki-light-bg:#fff;--shiki-dark-bg:#0d1117" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { useReducedMotion, useReducedMotionConfig } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'motion/react'</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { useEffect, useRef, useState, </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ReactNode } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'react'</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { cn } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> '@/lib/utils'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/** OS setting, or forced on with &#x3C;MotionConfig reducedMotion="always">. */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> usePrefersReducedMotion</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> os</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useReducedMotion</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> forced</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useReducedMotionConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> Boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(os </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> forced)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> DrawingCursorProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Content of the area. The ink is drawn above it and never blocks clicks. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  children</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> ReactNode</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Any CSS color. Defaults to the primary token. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  color</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Widest the line gets, in pixels. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  lineWidth</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Milliseconds a stretch of ink takes to fade out. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  decay</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Thin the line where the cursor moves fast. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  taper</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Wipe the ink when the cursor leaves the area. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  clearOnLeave</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Turns the ink off. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  disabled</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Point</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  x</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  y</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  time</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  width</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> FINE_POINTER</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> '(hover: hover) and (pointer: fine)'</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">// A pause longer than this starts a new stroke.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> STROKE_BREAK_MS</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 120</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> MIN_WIDTH</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0.35</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> SPEED_TO_WIDTH</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0.12</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> MAX_POINTS</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 400</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> MAX_STROKES</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 30</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useFinePointer</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">fine</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">setFine</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> mq</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">matchMedia</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">FINE_POINTER</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> update</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> setFine</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(mq.matches)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    update</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    mq.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'change'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, update)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> mq.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">removeEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'change'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, update)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }, [])</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> fine</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E"> * Lets the cursor leave a smooth ink line that fades away behind it, drawn on a</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E"> * click-through canvas above the area. The loop runs only while there is ink to</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E"> * fade. Off on touch devices and under reduced motion.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E"> */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> DrawingCursor</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  children</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  lineWidth</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 3</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  decay</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 800</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  taper</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  clearOnLeave</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  disabled</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  className</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> DrawingCursorProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> rootRef</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLDivElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> canvasRef</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLCanvasElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> reduced</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> usePrefersReducedMotion</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> fine</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useFinePointer</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> enabled</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">disabled </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">reduced </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> fine</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> root</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rootRef.current</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> canvas</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> canvasRef.current</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> ctx</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> canvas?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">getContext</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'2d'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">enabled </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">root </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">canvas </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">ctx) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">return</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> width </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> height </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> strokes</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Point</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[][] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> []</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> active</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Point</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">[] </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">|</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> lastTime </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> frame </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ink </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> ''</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> readColor</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> style</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> getComputedStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(canvas)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ink </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> color </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">??</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (style.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">getPropertyValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'--primary'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">trim</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> style.color)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> resize</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> rect</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> canvas.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">getBoundingClientRect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> dpr</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">min</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(window.devicePixelRatio </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      width </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rect.width</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      height </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rect.height</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      canvas.width </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">max</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">round</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(width </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> dpr))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      canvas.height </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">max</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">round</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(height </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> dpr))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ctx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">setTransform</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(dpr, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, dpr, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> draw</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">now</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ctx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">clearRect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, width, height)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ctx.lineCap </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'round'</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ctx.lineJoin </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'round'</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ctx.strokeStyle </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ink</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      for</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> stroke</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> of</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> strokes) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        while</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (stroke.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> now </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> stroke[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">].time </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> decay) stroke.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">shift</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">        // Each segment is drawn on its own, so it can fade and thin on its own.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        for</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">; i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x3C;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> stroke.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">; i</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> prev</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> stroke[i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> point</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> stroke[i]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> mid</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { x: (prev.x </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> point.x) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, y: (prev.y </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> point.y) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> next</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> stroke[i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">          const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> end</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> next </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { x: (point.x </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> next.x) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, y: (point.y </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> next.y) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> point</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          ctx.globalAlpha </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">max</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (now </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> point.time) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> decay)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          ctx.lineWidth </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> point.width</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          ctx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">beginPath</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          ctx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">moveTo</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(mid.x, mid.y)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          ctx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">quadraticCurveTo</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(point.x, point.y, end.x, end.y)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          ctx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">stroke</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ctx.globalAlpha </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      strokes </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> strokes.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">filter</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">stroke</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> stroke.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (active </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">strokes.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">includes</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(active)) active </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      frame </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> strokes.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ?</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> requestAnimationFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(draw) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">frame) ctx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">clearRect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, width, height)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> push</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">x</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">y</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">now</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">active </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> now </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> lastTime </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> STROKE_BREAK_MS</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        active </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> []</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        strokes.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(active)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (strokes.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> MAX_STROKES</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) strokes.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">shift</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> prev</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> active[active.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      let</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> w </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> lineWidth</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (taper </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> prev) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> speed</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">hypot</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(x </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> prev.x, y </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> prev.y) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">max</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, now </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> prev.time)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        w </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> lineWidth </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">min</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">max</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">MIN_WIDTH</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> speed </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> SPEED_TO_WIDTH</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      active.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({ x, y, time: now, width: w })</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (active.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ></span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> MAX_POINTS</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) active.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">shift</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      lastTime </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> now</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">frame) frame </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> requestAnimationFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(draw)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> move</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">event</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> PointerEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (event.pointerType </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'mouse'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">return</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> rect</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> canvas.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">getBoundingClientRect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      push</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(event.clientX </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rect.left, event.clientY </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rect.top, performance.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">now</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">())</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> leave</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      active </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (clearOnLeave) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        strokes </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> []</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">        cancelAnimationFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(frame)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        frame </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        ctx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">clearRect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, width, height)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> ro</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> ResizeObserver</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(resize)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    ro.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">observe</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(canvas)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">    // Re-read the tokens when the theme changes on &#x3C;html>.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> mo</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> MutationObserver</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(readColor)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    mo.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">observe</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(document.documentElement, { attributes: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, attributeFilter: [</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'class'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'style'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'data-theme'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">] })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    root.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'pointermove'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, move)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    root.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'pointerleave'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, leave)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    resize</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">    readColor</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">      cancelAnimationFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(frame)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ro.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">disconnect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      mo.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">disconnect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      root.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">removeEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'pointermove'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, move)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      root.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">removeEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'pointerleave'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, leave)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }, [enabled, color, lineWidth, decay, taper, clearOnLeave])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> ref</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">rootRef</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'relative'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, className)</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">children</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">enabled </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> aria-hidden</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> data-ink</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"pointer-events-none absolute inset-0 z-10"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">canvas</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> ref</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">canvasRef</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"block size-full"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span></code></pre>`,raw:`import { useReducedMotion, useReducedMotionConfig } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** OS setting, or forced on with <MotionConfig reducedMotion="always">. */
function usePrefersReducedMotion() {
  const os = useReducedMotion()
  const forced = useReducedMotionConfig()
  return Boolean(os || forced)
}

export interface DrawingCursorProps {
  /** Content of the area. The ink is drawn above it and never blocks clicks. */
  children?: ReactNode
  /** Any CSS color. Defaults to the primary token. */
  color?: string
  /** Widest the line gets, in pixels. */
  lineWidth?: number
  /** Milliseconds a stretch of ink takes to fade out. */
  decay?: number
  /** Thin the line where the cursor moves fast. */
  taper?: boolean
  /** Wipe the ink when the cursor leaves the area. */
  clearOnLeave?: boolean
  /** Turns the ink off. */
  disabled?: boolean
  className?: string
}

interface Point {
  x: number
  y: number
  time: number
  width: number
}

const FINE_POINTER = '(hover: hover) and (pointer: fine)'
// A pause longer than this starts a new stroke.
const STROKE_BREAK_MS = 120
const MIN_WIDTH = 0.35
const SPEED_TO_WIDTH = 0.12
const MAX_POINTS = 400
const MAX_STROKES = 30

function useFinePointer() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(FINE_POINTER)
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return fine
}

/**
 * Lets the cursor leave a smooth ink line that fades away behind it, drawn on a
 * click-through canvas above the area. The loop runs only while there is ink to
 * fade. Off on touch devices and under reduced motion.
 */
export function DrawingCursor({
  children,
  color,
  lineWidth = 3,
  decay = 800,
  taper = true,
  clearOnLeave = true,
  disabled = false,
  className,
}: DrawingCursorProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()
  const fine = useFinePointer()
  const enabled = !disabled && !reduced && fine

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!enabled || !root || !canvas || !ctx) return

    let width = 0
    let height = 0
    let strokes: Point[][] = []
    let active: Point[] | null = null
    let lastTime = 0
    let frame = 0
    let ink = ''

    const readColor = () => {
      const style = getComputedStyle(canvas)
      ink = color ?? (style.getPropertyValue('--primary').trim() || style.color)
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.strokeStyle = ink
      for (const stroke of strokes) {
        while (stroke.length > 0 && now - stroke[0].time > decay) stroke.shift()
        // Each segment is drawn on its own, so it can fade and thin on its own.
        for (let i = 1; i < stroke.length; i++) {
          const prev = stroke[i - 1]
          const point = stroke[i]
          const mid = { x: (prev.x + point.x) / 2, y: (prev.y + point.y) / 2 }
          const next = stroke[i + 1]
          const end = next ? { x: (point.x + next.x) / 2, y: (point.y + next.y) / 2 } : point
          ctx.globalAlpha = Math.max(0, 1 - (now - point.time) / decay)
          ctx.lineWidth = point.width
          ctx.beginPath()
          ctx.moveTo(mid.x, mid.y)
          ctx.quadraticCurveTo(point.x, point.y, end.x, end.y)
          ctx.stroke()
        }
      }
      ctx.globalAlpha = 1
      strokes = strokes.filter((stroke) => stroke.length > 0)
      if (active && !strokes.includes(active)) active = null
      frame = strokes.length > 0 ? requestAnimationFrame(draw) : 0
      if (!frame) ctx.clearRect(0, 0, width, height)
    }

    const push = (x: number, y: number, now: number) => {
      if (!active || now - lastTime > STROKE_BREAK_MS) {
        active = []
        strokes.push(active)
        if (strokes.length > MAX_STROKES) strokes.shift()
      }
      const prev = active[active.length - 1]
      let w = lineWidth
      if (taper && prev) {
        const speed = Math.hypot(x - prev.x, y - prev.y) / Math.max(1, now - prev.time)
        w = lineWidth * Math.min(1, Math.max(MIN_WIDTH, 1 - speed * SPEED_TO_WIDTH))
      }
      active.push({ x, y, time: now, width: w })
      if (active.length > MAX_POINTS) active.shift()
      lastTime = now
      if (!frame) frame = requestAnimationFrame(draw)
    }

    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const rect = canvas.getBoundingClientRect()
      push(event.clientX - rect.left, event.clientY - rect.top, performance.now())
    }
    const leave = () => {
      active = null
      if (clearOnLeave) {
        strokes = []
        cancelAnimationFrame(frame)
        frame = 0
        ctx.clearRect(0, 0, width, height)
      }
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    // Re-read the tokens when the theme changes on <html>.
    const mo = new MutationObserver(readColor)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style', 'data-theme'] })
    root.addEventListener('pointermove', move)
    root.addEventListener('pointerleave', leave)
    resize()
    readColor()

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      mo.disconnect()
      root.removeEventListener('pointermove', move)
      root.removeEventListener('pointerleave', leave)
    }
  }, [enabled, color, lineWidth, decay, taper, clearOnLeave])

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      {children}
      {enabled ? (
        <div aria-hidden data-ink className="pointer-events-none absolute inset-0 z-10">
          <canvas ref={canvasRef} className="block size-full" />
        </div>
      ) : null}
    </div>
  )
}
`}],n=`<pre class="shiki shiki-themes github-light github-dark-default" style="--shiki-light:#24292e;--shiki-dark:#e6edf3;--shiki-light-bg:#fff;--shiki-dark-bg:#0d1117" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { DrawingCursor, </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> DrawingCursorProps } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> '@/components/drawing-cursor'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> DrawingCursorDemo</span><span style="--shiki-light:#24292E;--shiki-dark:#FFA657">() </span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Area</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> Area</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">props</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Omit</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">DrawingCursorProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'children'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">DrawingCursor</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">      className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex h-[360px] w-[min(48rem,calc(100vw-4rem))] flex-col items-center justify-center rounded-2xl border bg-card px-8 text-center"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">      {</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">props</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">h2</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"text-4xl font-semibold tracking-tight text-balance"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>Write on the air&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">h2</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"mt-3 max-w-md text-sm text-muted-foreground text-pretty"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        Move your cursor across the card. It leaves a line of ink that thins when you hurry and fades as it dries.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">DrawingCursor</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> VariantPreview</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">props</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> Omit</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">DrawingCursorProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'children'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">Area</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72"> {</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">props</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span></code></pre>`,r=`import { DrawingCursor, type DrawingCursorProps } from '@/components/drawing-cursor'

export default function DrawingCursorDemo() {
  return <Area />
}

function Area(props: Omit<DrawingCursorProps, 'children'>) {
  return (
    <DrawingCursor
      className="flex h-[360px] w-[min(48rem,calc(100vw-4rem))] flex-col items-center justify-center rounded-2xl border bg-card px-8 text-center"
      {...props}
    >
      <h2 className="text-4xl font-semibold tracking-tight text-balance">Write on the air</h2>
      <p className="mt-3 max-w-md text-sm text-muted-foreground text-pretty">
        Move your cursor across the card. It leaves a line of ink that thins when you hurry and fades as it dries.
      </p>
    </DrawingCursor>
  )
}

export function VariantPreview(props: Omit<DrawingCursorProps, 'children'>) {
  return <Area {...props} />
}
`,i=[],a={props:e,files:t,usage:n,usageRaw:r,variants:i};export{a as default,t as files,e as props,n as usage,r as usageRaw,i as variants};