import{n as p,s as R}from"./scheduler.bb964b1c.js";const u=[];function U(e,t){return{subscribe:d(e,t).subscribe}}function d(e,t=p){let n;const o=new Set;function a(s){if(R(e,s)&&(e=s,n)){const i=!u.length;for(const r of o)r[1](),u.push(r,e);if(i){for(let r=0;r<u.length;r+=2)u[r][0](u[r+1]);u.length=0}}}function f(s){a(s(e))}function l(s,i=p){const r=[s,i];return o.add(r),o.size===1&&(n=t(a,f)||p),s(e),()=>{o.delete(r),o.size===0&&n&&(n(),n=null)}}return{set:a,update:f,subscribe:l}}var w;const y=((w=globalThis.__sveltekit_102wgfz)==null?void 0:w.base)??"";var v;(v=globalThis.__sveltekit_102wgfz)==null||v.assets;const N="sveltekit:snapshot",L="sveltekit:scroll",z="sveltekit:index",_={tap:1,hover:2,viewport:3,eager:4,off:-1},S=location.origin;function P(e){let t=e.baseURI;if(!t){const n=e.getElementsByTagName("base");t=n.length?n[0].href:e.URL}return t}function V(){return{x:pageXOffset,y:pageYOffset}}const b=new WeakSet,g={"preload-code":["","off","tap","hover","viewport","eager"],"preload-data":["","off","tap","hover"],keepfocus:["","true","off","false"],noscroll:["","true","off","false"],reload:["","true","off","false"],replacestate:["","true","off","false"]};function c(e,t){const n=e.getAttribute(`data-sveltekit-${t}`);return I(e,t,n),n}function I(e,t,n){n!==null&&!b.has(e)&&!g[t].includes(n)&&(console.error(`Unexpected value for ${t} — should be one of ${g[t].map(o=>JSON.stringify(o)).join(", ")}`,e),b.add(e))}const h={..._,"":_.hover};function E(e){let t=e.assignedSlot??e.parentNode;return(t==null?void 0:t.nodeType)===11&&(t=t.host),t}function Y(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=E(e)}}function q(e,t){let n;try{n=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const o=e instanceof SVGAElement?e.target.baseVal:e.target,a=!n||!!o||O(n,t)||(e.getAttribute("rel")||"").split(/\s+/).includes("external"),f=(n==null?void 0:n.origin)===S&&e.hasAttribute("download");return{url:n,external:a,target:o,download:f}}function K(e){let t=null,n=null,o=null,a=null,f=null,l=null,s=e;for(;s&&s!==document.documentElement;)o===null&&(o=c(s,"preload-code")),a===null&&(a=c(s,"preload-data")),t===null&&(t=c(s,"keepfocus")),n===null&&(n=c(s,"noscroll")),f===null&&(f=c(s,"reload")),l===null&&(l=c(s,"replacestate")),s=E(s);function i(r){switch(r){case"":case"true":return!0;case"off":case"false":return!1;default:return null}}return{preload_code:h[o??"off"],preload_data:h[a??"off"],keep_focus:i(t),noscroll:i(n),reload:i(f),replace_state:i(l)}}function k(e){const t=d(e);let n=!0;function o(){n=!0,t.update(l=>l)}function a(l){n=!1,t.set(l)}function f(l){let s;return t.subscribe(i=>{(s===void 0||n&&i!==s)&&l(s=i)})}return{notify:o,set:a,subscribe:f}}function x(){const{set:e,subscribe:t}=d(!1);return{subscribe:t,check:async()=>!1}}function O(e,t){return e.origin!==S||!e.pathname.startsWith(t)}let A;function $(e){A=e.client}function j(e){return(...t)=>A[e](...t)}const m={url:k({}),page:k({}),navigating:d(null),updated:x()};export{z as I,_ as P,L as S,N as a,q as b,K as c,m as d,y as e,Y as f,P as g,$ as h,O as i,j,S as o,U as r,V as s,d as w};
