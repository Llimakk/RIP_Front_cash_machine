if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const c=e=>i(e,t),l={module:{uri:t},exports:o,require:c};s[t]=Promise.all(r.map((e=>l[e]||c(e)))).then((e=>(n(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BgmQfsu5.css",revision:null},{url:"assets/index-BwyYc571.js",revision:null},{url:"index.html",revision:"caacff6e4435035e35b882b54b2ae504"},{url:"registerSW.js",revision:"86baae84e2d6d67e244b3f9a6c726c0c"},{url:"serviceWorker.js",revision:"2d4f22e17e09c96525d8e49dda27b882"},{url:"manifest.webmanifest",revision:"58b0f953c28b6ed2e9185cbbc7a12964"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
