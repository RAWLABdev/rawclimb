module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},50640,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),this.name="InvariantError"}}},790,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/app-dir/link.js <module evaluation>"))},84707,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/app-dir/link.js"))},97647,a=>{"use strict";a.i(790);var b=a.i(84707);a.n(b)},95936,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={default:function(){return i},useLinkStatus:function(){return h.useLinkStatus}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(64240),g=a.r(7997),h=f._(a.r(97647));function i(a){let b=a.legacyBehavior,c="string"==typeof a.children||"number"==typeof a.children||"string"==typeof a.children?.type,d=a.children?.type?.$$typeof===Symbol.for("react.client.reference");return!b||c||d||(a.children?.type?.$$typeof===Symbol.for("react.lazy")?console.error("Using a Lazy Component as a direct child of `<Link legacyBehavior>` from a Server Component is not supported. If you need legacyBehavior, wrap your Lazy Component in a Client Component that renders the Link's `<a>` tag."):console.error("Using a Server Component as a direct child of `<Link legacyBehavior>` is not supported. If you need legacyBehavior, wrap your Server Component in a Client Component that renders the Link's `<a>` tag.")),(0,g.jsx)(h.default,{...a})}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},27338,a=>{"use strict";var b=a.i(7997),c=a.i(95936);let d=[{title:"Explore",href:"/areas"},{title:"Routes",href:"/routes"},{title:"Dashboard",href:"/dashboard"}];function e(){return(0,b.jsx)("nav",{className:"flex gap-6",children:d.map(a=>(0,b.jsx)(c.default,{href:a.href,className:"text-sm text-zinc-300 transition hover:text-white",children:a.title},a.href))})}function f(){return(0,b.jsx)("header",{className:"border-b border-zinc-800",children:(0,b.jsxs)("div",{className:"mx-auto flex h-16 max-w-7xl items-center justify-between px-6",children:[(0,b.jsx)(c.default,{href:"/",className:"font-bold tracking-widest",children:"RAWCLIMB_"}),(0,b.jsx)(e,{})]})})}a.s(["AppShell",0,function({children:a}){return(0,b.jsxs)("div",{className:"min-h-screen bg-black text-white",children:[(0,b.jsx)(f,{}),(0,b.jsx)("main",{className:"mx-auto max-w-7xl px-6 py-10",children:a})]})}],27338)},2424,a=>{"use strict";let b=Symbol.for("__cloudflare-context__");function c(){return globalThis[b]}async function d(){let a=c();if(a)return a;{var d;let a=await e();return d=a,globalThis[b]=d,a}}async function e(a){let{getPlatformProxy:b}=await import(`${"__wrangler".replaceAll("_","")}`),c=a?.environment??process.env.NEXT_DEV_WRANGLER_ENV,{env:d,cf:e,ctx:f}=await b({...a,envFiles:[],environment:c});return{env:d,cf:e,ctx:f}}let f=`

ERROR: \`getCloudflareContext\` has been called without having called \`initOpenNextCloudflareForDev\` from the Next.js config file.
You should update your Next.js config file as shown below:

   \`\`\`
   // next.config.mjs

   import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

   initOpenNextCloudflareForDev();

   const nextConfig = { ... };
   export default nextConfig;
   \`\`\`

`;a.s(["getCloudflareContext",0,function(a={async:!1}){return a.async?d():function(){let a,b=c();if(b)return b;if(a=globalThis,a.__NEXT_DATA__?.nextExport===!0)throw Error("  - make sure that the call is not at the top level and that the route is not static\n  - call `getCloudflareContext({async: true})` to use the `async` mode\n  - avoid calling `getCloudflareContext` in the route\n");throw Error(f)}()}])},10585,a=>{a.v("/_next/static/media/favicon.2vob68tjqpejf.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},68611,a=>{"use strict";let b={src:a.i(10585).default,width:256,height:256};a.s(["default",0,b])},67198,a=>{"use strict";var b=a.i(7997),c=a.i(95936);a.i(70396);var d=a.i(73727),e=a.i(2424),f=a.i(27338);async function g(a){let{env:b}=await (0,e.getCloudflareContext)(),c=b.DB,d=await c.prepare(`
      SELECT
        climbing_zones.id,
        climbing_zones.name,
        climbing_zones.area_id,
        climbing_areas.name as area_name
      FROM climbing_zones
      JOIN climbing_areas ON climbing_areas.id = climbing_zones.area_id
      WHERE climbing_zones.id = ?
    `).bind(a).first();if(!d)return null;let{results:f}=await c.prepare(`
      SELECT
        id,
        public_id,
        name,
        type,
        grade
      FROM climbing_routes
      WHERE zone_id = ?
      ORDER BY name ASC
    `).bind(a).all();return{zone:d,routes:f}}async function h({params:a}){let{id:e}=await a,i=await g(e);i||(0,d.notFound)();let{zone:j,routes:k}=i;return(0,b.jsxs)(f.AppShell,{children:[(0,b.jsxs)(c.default,{href:`/areas/${j.area_id}`,className:"mb-8 inline-block text-sm text-zinc-500 transition hover:text-white",children:["← Back to ",j.area_name]}),(0,b.jsxs)("div",{className:"mb-12",children:[(0,b.jsx)("p",{className:"mb-3 text-xs uppercase tracking-[0.4em] text-zinc-600",children:"Zone"}),(0,b.jsx)("h1",{className:"text-5xl font-bold",children:j.name}),(0,b.jsx)("p",{className:"mt-4 text-zinc-400",children:"Routes available in this zone."})]}),(0,b.jsx)("div",{className:"grid gap-6 md:grid-cols-2",children:k.map(a=>(0,b.jsxs)(c.default,{href:`/routes/${a.id}`,className:"block rounded-3xl border border-zinc-800 p-6 transition hover:border-zinc-600",children:[(0,b.jsxs)("div",{className:"mb-4 flex items-center justify-between gap-4",children:[(0,b.jsx)("h2",{className:"text-2xl font-bold",children:a.name}),(0,b.jsx)("span",{className:"rounded-full bg-zinc-900 px-3 py-1 text-sm text-zinc-300",children:a.grade})]}),(0,b.jsx)("p",{className:"text-sm uppercase tracking-widest text-zinc-600",children:a.type}),(0,b.jsx)("p",{className:"mt-4 text-sm text-zinc-500",children:"View route →"})]},a.public_id))})]})}a.s(["default",0,h,"dynamic",0,"force-dynamic"])},56379,a=>{a.n(a.i(67198))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__05cfux9._.js.map