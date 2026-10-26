import{r as e,t}from"./jsx-runtime-BX5dh3L7.js";import{t as n}from"./react-DpvdKi1d.js";import{n as r,t as i}from"./use-reduced-motion-config-CnRJQ_A_.js";import{t as a}from"./dist-Bcow9Ss5.js";var o=e(n(),1),s=t();function c(){let e=r(),t=i();return!!(e||t)}var l=`
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`,u=`
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_intensity;
uniform vec3 u_background;
uniform vec3 u_primary;
uniform vec3 u_foreground;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v / 0.875;
}

vec3 hueRotate(vec3 c, float angle) {
  const vec3 k = vec3(0.57735);
  float ca = cos(angle);
  return c * ca + cross(k, c) * sin(angle) + k * dot(k, c) * (1.0 - ca);
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
  vec2 s = p * 0.9;
  float t = u_time;
  vec2 q = vec2(fbm(s + vec2(0.0, t * 0.05)), fbm(s + vec2(5.2, 1.3) - vec2(t * 0.04, 0.0)));
  vec2 r = vec2(fbm(s + 2.2 * q + vec2(1.7, 9.2) + t * 0.03), fbm(s + 2.2 * q + vec2(8.3, 2.8) - t * 0.025));
  float n = fbm(s + 2.0 * r);

  vec3 second = clamp(hueRotate(u_primary, -0.55), 0.0, 1.0);
  float a = smoothstep(0.28, 0.72, n);
  float b = smoothstep(0.35, 0.8, r.x);
  float glint = smoothstep(0.72, 0.95, n);

  vec3 col = u_background;
  col = mix(col, second, b * 0.45 * u_intensity);
  col = mix(col, u_primary, a * 0.85 * u_intensity);
  col = mix(col, u_foreground, glint * 0.1 * u_intensity);

  float vignette = smoothstep(1.5, 0.35, length(p * vec2(0.8, 1.1)));
  col = mix(u_background, col, vignette);
  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}
`;function d(e,t,n){let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(e.deleteShader(r),null)):null}function f(e){let t=d(e,e.VERTEX_SHADER,l),n=d(e,e.FRAGMENT_SHADER,u);if(!t||!n)return null;let r=e.createProgram();return r?(e.attachShader(r,t),e.attachShader(r,n),e.linkProgram(r),e.deleteShader(t),e.deleteShader(n),e.getProgramParameter(r,e.LINK_STATUS)?r:(e.deleteProgram(r),null)):null}function p(e,t,n,r){let i=getComputedStyle(e).getPropertyValue(t).trim();if(!i||!n)return r;n.clearRect(0,0,1,1),n.fillStyle=i,n.fillRect(0,0,1,1);let[a,o,s]=n.getImageData(0,0,1,1).data;return[a/255,o/255,s/255]}var m=14,h=`radial-gradient(60% 70% at 25% 20%, color-mix(in oklch, var(--primary) 40%, transparent), transparent 70%), radial-gradient(55% 60% at 80% 75%, color-mix(in oklch, var(--primary) 25%, transparent), transparent 70%)`;function g({children:e,speed:t=1,intensity:n=.6,className:r}){let i=(0,o.useRef)(null),l=(0,o.useRef)(null),[u,d]=(0,o.useState)(!1),g=c()??!1,_=Math.min(Math.max(n,0),1),v=(0,o.useRef)({speed:t,intensity:_,reduced:g}),y=(0,o.useRef)(()=>{});return(0,o.useEffect)(()=>{v.current={speed:t,intensity:_,reduced:g},y.current()},[t,_,g]),(0,o.useEffect)(()=>{let e=i.current,t=l.current;if(!e||!t)return;let n=t.getContext(`webgl`,{alpha:!1,antialias:!1,depth:!1,stencil:!1,powerPreference:`low-power`}),r=n&&f(n);if(!n||!r){d(!0);return}let a=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,a),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),n.STATIC_DRAW);let o=n.getAttribLocation(r,`a_position`);n.enableVertexAttribArray(o),n.vertexAttribPointer(o,2,n.FLOAT,!1,0,0),n.useProgram(r);let s=e=>n.getUniformLocation(r,e),c={resolution:s(`u_resolution`),time:s(`u_time`),intensity:s(`u_intensity`),background:s(`u_background`),primary:s(`u_primary`),foreground:s(`u_foreground`)},u=document.createElement(`canvas`);u.width=u.height=1;let h=u.getContext(`2d`,{willReadFrequently:!0}),g=()=>{n.uniform3fv(c.background,p(t,`--background`,h,[0,0,0])),n.uniform3fv(c.primary,p(t,`--primary`,h,[1,.5,.2])),n.uniform3fv(c.foreground,p(t,`--foreground`,h,[1,1,1]))},_=()=>{let e=Math.max(1,t.clientWidth),r=Math.max(1,t.clientHeight);return t.width===e&&t.height===r?!1:(t.width=e,t.height=r,n.viewport(0,0,e,r),!0)},b=m,x=0,S=0,C=!1,w=()=>{n.uniform2f(c.resolution,t.width,t.height),n.uniform1f(c.time,v.current.reduced?m:b),n.uniform1f(c.intensity,v.current.intensity),n.drawArrays(n.TRIANGLES,0,3)},T=e=>{if(S&&e-S<32.333333333333336){x=requestAnimationFrame(T);return}let t=S?Math.min((e-S)/1e3,.1):0;S=e,b+=t*v.current.speed,w(),x=requestAnimationFrame(T)},E=()=>C&&!document.hidden&&!v.current.reduced&&v.current.speed>0;y.current=()=>{E()?x||=(S=0,requestAnimationFrame(T)):(cancelAnimationFrame(x),x=0,w())};let D=new IntersectionObserver(([e])=>{C=e.isIntersecting,y.current()});D.observe(e);let O=new ResizeObserver(()=>{_()&&!x&&w()});O.observe(t);let k=new MutationObserver(()=>{g(),x||w()});k.observe(document.documentElement,{attributes:!0,attributeFilter:[`class`,`style`,`data-theme`]});let A=()=>y.current();document.addEventListener(`visibilitychange`,A);let j=e=>{e.preventDefault(),cancelAnimationFrame(x),x=0,d(!0)};return t.addEventListener(`webglcontextlost`,j),_(),g(),w(),()=>{cancelAnimationFrame(x),x=0,y.current=()=>{},D.disconnect(),O.disconnect(),k.disconnect(),document.removeEventListener(`visibilitychange`,A),t.removeEventListener(`webglcontextlost`,j),n.deleteBuffer(a),n.deleteProgram(r)}},[]),(0,s.jsxs)(`div`,{ref:i,className:a(`relative isolate overflow-hidden bg-background`,r),children:[(0,s.jsx)(`div`,{"aria-hidden":!0,"data-shader":!0,className:`pointer-events-none absolute inset-0 -z-10`,children:u?(0,s.jsx)(`div`,{"data-fallback":!0,className:`absolute inset-0`,style:{backgroundImage:h,opacity:Math.min(1,_/.6)}}):(0,s.jsx)(`canvas`,{ref:l,className:`block size-full`})}),e]})}export{g as t};