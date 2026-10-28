var e=[{name:`text`,type:`string`,required:!0,description:`The text. Screen readers read it as one string.`},{name:`split`,type:`'words' | 'lines'`,default:`'words'`,description:`Split into words, or into lines at each line break.`},{name:`depth`,type:`number`,default:`36`,description:`Distance between neighbouring pieces along the depth axis, in pixels.`},{name:`perspective`,type:`number`,default:`800`,description:`Perspective distance in pixels. Lower is more dramatic.`},{name:`rotateY`,type:`number`,default:`14`,description:`Largest tilt around the vertical axis, in degrees.`},{name:`rotateX`,type:`number`,default:`9`,description:`Largest tilt around the horizontal axis, in degrees.`},{name:`interactive`,type:`boolean`,default:`true`,description:`Tilt towards the cursor while it is over the text. Off on touch screens and under reduced motion.`},{name:`className`,type:`string`,description:`Extra classes for the root element.`}],t=[{name:`perspective-text.tsx`,lines:103,html:`<pre class="shiki shiki-themes github-light github-dark-default" style="--shiki-light:#24292e;--shiki-dark:#e6edf3;--shiki-light-bg:#fff;--shiki-dark-bg:#0d1117" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { motion, useMotionValue, useReducedMotion, useReducedMotionConfig, useSpring } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'motion/react'</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { useEffect, useRef } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'react'</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { cn } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> '@/lib/utils'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/** OS setting, or forced on with &#x3C;MotionConfig reducedMotion="always">. */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> usePrefersReducedMotion</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> os</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useReducedMotion</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> forced</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useReducedMotionConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> Boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(os </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> forced)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> PerspectiveTextProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** The text. Screen readers read it as one string. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  text</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Split into words, or into lines at each line break. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  split</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'words'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'lines'</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Distance between neighbouring pieces along the depth axis, in pixels. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  depth</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Perspective distance in pixels. Lower is more dramatic. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  perspective</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Largest tilt around the vertical axis, in degrees. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  rotateY</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Largest tilt around the horizontal axis, in degrees. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  rotateX</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> number</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  /** Tilt towards the cursor while it is over the text. Off on touch screens and under reduced motion. */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  interactive</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> boolean</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> string</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> SPRING</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { stiffness: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">140</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, damping: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">18</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, mass: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">0.6</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">/** Text pieces stacked in depth on a plane that tilts towards the cursor. */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> PerspectiveText</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">({</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  text</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  split</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'words'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  depth</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 36</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  perspective</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 800</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  rotateY</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 14</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  rotateX</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 9</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  interactive</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">  className</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> PerspectiveTextProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> ref</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useRef</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657">HTMLDivElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">>(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> reduced</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> usePrefersReducedMotion</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#8B949E">  // At rest the plane is turned a little, so the depth shows without any input.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> restX</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">rotateX </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> restY</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rotateY </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> tiltX</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useMotionValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(restX)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> tiltY</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useMotionValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(restY)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> springX</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useSpring</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(tiltX, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">SPRING</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> springY</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> useSpring</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(tiltY, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">SPRING</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">  useEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> el</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> ref.current</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">el </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">interactive </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> reduced) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">return</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> move</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">event</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#FFA657"> PointerEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (event.pointerType </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">!==</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'mouse'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">return</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> rect</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> el.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">getBoundingClientRect</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> dx</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (event.clientX </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rect.left) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rect.width </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0.5</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> dy</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (event.clientY </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rect.top) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rect.height </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 0.5</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      tiltY.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(dx </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rotateY)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      tiltX.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">dy </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> rotateX)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> leave</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      tiltX.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(restX)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      tiltY.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(restY)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    el.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'pointermove'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, move)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    el.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'pointerleave'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, leave)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      el.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">removeEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'pointermove'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, move)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      el.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">removeEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'pointerleave'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, leave)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  }, [interactive, reduced, rotateX, rotateY, restX, restY, tiltX, tiltY])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> pieces</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> split </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'lines'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> text.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">split</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'</span><span style="--shiki-light:#005CC5;--shiki-dark:#FF7B72">\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">filter</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(Boolean) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> text.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">split</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">\\s</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">+</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">filter</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(Boolean)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> middle</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (pieces.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> ref</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">ref</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'inline-block'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, className)</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> style</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{ perspective }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"sr-only"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">text</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">motion.div</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"[transform-style:preserve-3d]"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        style</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{ rotateX: reduced </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> restX </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> springX, rotateY: reduced </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> restY </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> springY }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        initial</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">        {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">pieces.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">piece</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFA657">i</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            key</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">i</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            aria-hidden</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            data-piece</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">(split </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'lines'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ?</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'block'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'inline-block'</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">)</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">            style</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{ transform: </span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">\`translateZ(\${</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">i</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> middle</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> depth</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">}px)\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> }</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">            {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">piece</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">            {</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">split </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">===</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> 'words'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> &#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">&#x3C;</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> pieces.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> ?</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> '\xA0'</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> :</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">          &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">        ))</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">motion.div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span></code></pre>`,raw:`import { motion, useMotionValue, useReducedMotion, useReducedMotionConfig, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/** OS setting, or forced on with <MotionConfig reducedMotion="always">. */
function usePrefersReducedMotion() {
  const os = useReducedMotion()
  const forced = useReducedMotionConfig()
  return Boolean(os || forced)
}

export interface PerspectiveTextProps {
  /** The text. Screen readers read it as one string. */
  text: string
  /** Split into words, or into lines at each line break. */
  split?: 'words' | 'lines'
  /** Distance between neighbouring pieces along the depth axis, in pixels. */
  depth?: number
  /** Perspective distance in pixels. Lower is more dramatic. */
  perspective?: number
  /** Largest tilt around the vertical axis, in degrees. */
  rotateY?: number
  /** Largest tilt around the horizontal axis, in degrees. */
  rotateX?: number
  /** Tilt towards the cursor while it is over the text. Off on touch screens and under reduced motion. */
  interactive?: boolean
  className?: string
}

const SPRING = { stiffness: 140, damping: 18, mass: 0.6 }

/** Text pieces stacked in depth on a plane that tilts towards the cursor. */
export function PerspectiveText({
  text,
  split = 'words',
  depth = 36,
  perspective = 800,
  rotateY = 14,
  rotateX = 9,
  interactive = true,
  className,
}: PerspectiveTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  // At rest the plane is turned a little, so the depth shows without any input.
  const restX = -rotateX / 2
  const restY = rotateY / 2
  const tiltX = useMotionValue(restX)
  const tiltY = useMotionValue(restY)
  const springX = useSpring(tiltX, SPRING)
  const springY = useSpring(tiltY, SPRING)

  useEffect(() => {
    const el = ref.current
    if (!el || !interactive || reduced) return
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const rect = el.getBoundingClientRect()
      const dx = (event.clientX - rect.left) / rect.width - 0.5
      const dy = (event.clientY - rect.top) / rect.height - 0.5
      tiltY.set(dx * 2 * rotateY)
      tiltX.set(-dy * 2 * rotateX)
    }
    const leave = () => {
      tiltX.set(restX)
      tiltY.set(restY)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [interactive, reduced, rotateX, rotateY, restX, restY, tiltX, tiltY])

  const pieces = split === 'lines' ? text.split('\\n').filter(Boolean) : text.split(/\\s+/).filter(Boolean)
  const middle = (pieces.length - 1) / 2

  return (
    <div ref={ref} className={cn('inline-block', className)} style={{ perspective }}>
      <span className="sr-only">{text}</span>
      <motion.div
        className="[transform-style:preserve-3d]"
        style={{ rotateX: reduced ? restX : springX, rotateY: reduced ? restY : springY }}
        initial={false}
      >
        {pieces.map((piece, i) => (
          <span
            key={i}
            aria-hidden
            data-piece
            className={cn(split === 'lines' ? 'block' : 'inline-block')}
            style={{ transform: \`translateZ(\${(i - middle) * depth}px)\` }}
          >
            {piece}
            {split === 'words' && i < pieces.length - 1 ? '\xA0' : null}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
`}],n=`<pre class="shiki shiki-themes github-light github-dark-default" style="--shiki-light:#24292e;--shiki-dark:#e6edf3;--shiki-light-bg:#fff;--shiki-dark-bg:#0d1117" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> { PerspectiveText } </span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">from</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF"> '@/components/perspective-text'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D2A8FF"> PerspectiveTextDemo</span><span style="--shiki-light:#24292E;--shiki-dark:#FFA657">() </span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"flex flex-col items-center gap-10 py-6 text-center"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">PerspectiveText</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> text</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"Depth is a design tool"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"text-6xl font-bold tracking-tight"</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#7EE787">PerspectiveText</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        split</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"lines"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        text</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">'Each line sits on its own layer</span><span style="--shiki-light:#005CC5;--shiki-dark:#FF7B72">\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">Move the cursor across them'</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        depth</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79C0FF">28</span><span style="--shiki-light:#24292E;--shiki-dark:#FF7B72">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#79C0FF">        className</span><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72">=</span><span style="--shiki-light:#032F62;--shiki-dark:#A5D6FF">"text-xl text-muted-foreground"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">      /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#7EE787">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">  )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3">}</span></span></code></pre>`,r=`import { PerspectiveText } from '@/components/perspective-text'

export default function PerspectiveTextDemo() {
  return (
    <div className="flex flex-col items-center gap-10 py-6 text-center">
      <PerspectiveText text="Depth is a design tool" className="text-6xl font-bold tracking-tight" />
      <PerspectiveText
        split="lines"
        text={'Each line sits on its own layer\\nMove the cursor across them'}
        depth={28}
        className="text-xl text-muted-foreground"
      />
    </div>
  )
}
`,i=[],a={props:e,files:t,usage:n,usageRaw:r,variants:i};export{a as default,t as files,e as props,n as usage,r as usageRaw,i as variants};