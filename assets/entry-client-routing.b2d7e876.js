import{i as J,h as N,a as l,s as F,b as Ge,c as u,d,e as S,p as W,m as O,f as G,o as m,g as Ke,j as B,k as A,l as fe,n as Ye,q as x,r as de,t as Me,u as Je,v as ge,w as qe,x as pe,y as Xe,z as Qe,A as Ze,B as he,C as me,D as et,E as tt,F as nt,G as ye,H as q,I as V,J as rt,K as ot}from"./chunk-6b0f39a3.js";import{_ as j}from"./chunk-704646a9.js";import{l as st,i as it,d as at}from"./chunk-b9674078.js";function v(e){return typeof e!="object"||e===null?!1:Object.getPrototypeOf(e)===null?!0:e.constructor.name==="Object"}function te(e){return"["+e.map(t=>"'"+t+"'").join(", ")+"]"}function D(e,t){const n=Object.getOwnPropertyDescriptor(e,t);return!!n&&!("value"in n)&&!!n.get}function _e(e){return typeof e=="object"&&e!==null&&"then"in e&&J(e.then)}function lt(e,t){if(!v(e))return!1;for(const n of Object.keys(e))if(!t.includes(n))return!1;return!0}function ut(e){return typeof e=="object"&&e!==null&&Object.values(e).every(t=>typeof t=="string")}function ct(e,t){const o=t.filter(({filesystemRoot:s})=>e.startsWith(s)).sort(N(({filesystemRoot:s})=>s.length))[0];let r;if(o){const{filesystemRoot:s,routeRoot:a}=o,i={pageId:e,filesystemRoot:s,routeRoot:a};l(a.startsWith("/")&&e.startsWith("/")&&s.startsWith("/"),i),l(e.startsWith(s),i),s!=="/"?(l(!s.endsWith("/"),i),r=F(e,s.length,0)):r=e,l(r.startsWith("/"),i),r=a+(a.endsWith("/")?"":"/")+F(r,1,0)}else r=e;return l(r.startsWith("/")),r=r.split("/").filter(s=>s!=="pages"&&s!=="src"&&s!=="index").join("/"),l(!r.includes(".page.")),l(!r.endsWith(".")),r.endsWith("/index")&&(r=F(r,0,-6)),r===""&&(r="/"),l(r.startsWith("/")),l(!r.endsWith("/")||r==="/"),r}async function ft(e,t,n){await Promise.all(e.filter(a=>a.fileType===".page.route").map(a=>{var i;return(i=a.loadFile)===null||i===void 0?void 0:i.call(a)}));const{onBeforeRouteHook:o,filesystemRoots:r}=gt(e);return{pageRoutes:dt(r,e,t,n),onBeforeRouteHook:o}}function dt(e,t,n,o){const r=[];let s=[...o];return n.length>0?n.filter(i=>!i.isErrorPage).forEach(i=>{const c=i.pageId2;s=mt(s,c);let f=null;{const h=i.configSources.route;if(h){l("configValue"in h);const g=h.configValue,y=h.configSrc;if(l(y),typeof g=="string")f={pageId:c,comesFromV1PageConfig:!0,routeString:g,pageRouteFilePath:y,routeType:"STRING"};else{l(J(g));let _=!1;const p=i.configSources.iKnowThePerformanceRisksOfAsyncRouteFunctions;if(p){l(!("codeFilePath"in p));const P=p.configValue;l(typeof P=="boolean"),_=P}f={pageId:c,comesFromV1PageConfig:!0,routeFunction:g,pageRouteFilePath:y,routeType:"FUNCTION",allowAsync:_}}}}if(!f){const{routeFilesystem:h,routeFilesystemDefinedBy:g}=i;l(h),l(h.startsWith("/")),l(g),f={pageId:c,routeFilesystemDefinedBy:g,comesFromV1PageConfig:!0,routeString:h,pageRouteFilePath:null,routeType:"FILESYSTEM"}}l(f),r.push(f)}):s.filter(i=>!Ge(i)).forEach(i=>{const c=pt(i,t);if(c){const{filePath:f,fileExports:h}=c;if(l(h),u("default"in h,`${f} should have a default export.`),d(h,"default","string")){const g=h.default;u(g.startsWith("/"),`A Route String should start with a leading \`/\` but \`${f}\` has \`export default '${g}'\`. Make sure to \`export default '/${g}'\` instead.`),r.push({pageId:i,comesFromV1PageConfig:!1,routeString:g,pageRouteFilePath:f,routeType:"STRING"});return}if(d(h,"default","function")){const g=h.default;let y=!1;const _="iKnowThePerformanceRisksOfAsyncRouteFunctions";_ in h&&(u(d(h,_,"boolean"),`The export \`${_}\` of ${f} should be a boolean.`),y=h[_]),r.push({pageId:i,comesFromV1PageConfig:!1,routeFunction:g,pageRouteFilePath:f,allowAsync:y,routeType:"FUNCTION"});return}u(!1,`The default export of ${f} should be a string or a function.`)}else{const f=ct(i,e);l(f.startsWith("/")),l(!f.endsWith("/")||f==="/"),r.push({pageId:i,comesFromV1PageConfig:!1,routeString:f,pageRouteFilePath:null,routeFilesystemDefinedBy:`${i}.page.*`,routeType:"FILESYSTEM"})}}),r}function gt(e,t){let n=null;const o=[];return e.filter(r=>r.fileType===".page.route"&&r.isDefaultPageFile).forEach(({filePath:r,fileExports:s})=>{if(l(s),"onBeforeRoute"in s){u(d(s,"onBeforeRoute","function"),`\`export { onBeforeRoute }\` of ${r} should be a function.`);const{onBeforeRoute:a}=s;n={hookSrc:`${r} > \`export { onBeforeRoute }\``,onBeforeRoute:a}}"filesystemRoutingRoot"in s&&(u(d(s,"filesystemRoutingRoot","string"),`\`export { filesystemRoutingRoot }\` of ${r} should be a string.`),u(d(s,"filesystemRoutingRoot","string"),`\`export { filesystemRoutingRoot }\` of ${r} is \`'${s.filesystemRoutingRoot}'\` but it should start with a leading slash \`/\`.`),o.push({filesystemRoot:ht(r),routeRoot:s.filesystemRoutingRoot}))}),{onBeforeRouteHook:n,filesystemRoots:o}}function pt(e,t){return t.find(n=>n.pageId===e&&n.fileType===".page.route")}function ht(e){l(e.startsWith("/")),l(!e.endsWith("/"));const t=e.split("/"),n=F(t,0,-1).join("/")||"/";return l(n.startsWith("/")),l(!n.endsWith("/")||n==="/"),n}function mt(e,t){const{length:n}=e;return e=e.filter(o=>o!==t),l(e.length===n-1),e}function be(e){l(e.urlOriginal),"urlPathname"in e?l(D(e,"urlPathname")):Object.defineProperty(e,"urlPathname",{get:ve,enumerable:!0,configurable:!0}),"url"in e?l(D(e,"url")):Object.defineProperty(e,"url",{get:yt,enumerable:!1,configurable:!0}),"urlParsed"in e?l(D(e,"urlParsed")):Object.defineProperty(e,"urlParsed",{get:_t,enumerable:!0,configurable:!0})}function Se(e){let t=e._urlHandler;t||(t=r=>r);const n=t(e.urlOriginal),o=e._baseServer;return l(o.startsWith("/")),W(n,o)}function ve(){const{pathname:e}=Se(this),t=e;return l(t.startsWith("/")),t}function yt(){return S(!1,"`pageContext.url` is outdated. Use `pageContext.urlPathname`, `pageContext.urlParsed`, or `pageContext.urlOriginal` instead. (See https://vite-plugin-ssr.com/migration/0.4.23 for more information.)",{onlyOnce:!0,showStackTrace:!0}),ve.call(this)}function _t(){const e=Se(this),{origin:t,pathname:n,pathnameOriginal:o,search:r,searchAll:s,searchOriginal:a,hash:i,hashOriginal:c}=e,f={origin:t,pathname:n,pathnameOriginal:o,search:r,searchAll:s,searchOriginal:a,hash:i,hashOriginal:c,get hashString(){return S(!1,"`pageContext.urlParsed.hashString` has been renamed to `pageContext.urlParsed.hashOriginal`",{onlyOnce:!0,showStackTrace:!0}),c},get searchString(){return S(!1,"`pageContext.urlParsed.searchString` has been renamed to `pageContext.urlParsed.searchOriginal`",{onlyOnce:!0,showStackTrace:!0}),a}};return ne(f,"hashString"),ne(f,"searchString"),f}function ne(e,t){const n=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(e,t,{...n,enumerable:!1})}function bt(e){l(typeof e.urlOriginal=="string"),l(typeof e.urlPathname=="string"),l(v(e.urlParsed)),l(e.urlPathname===e.urlParsed.pathname)}const Pe="@",K=":";function St(e,t){t?t=t+" invalid":t="Invalid",u(e==="*"||e.startsWith("/"),`${t} route string '${e}'${e===""?" (empty string)":""}: route strings should start with a leading slash '/' (or be '*')`)}function Y(e,t){St(e),l(t.startsWith("/"));const n=e.split("/"),o=t.split("/"),r={};vt(e),e==="*"&&(e="/*");for(let s=0;s<Math.max(n.length,o.length);s++){const a=n[s],i=o[s];if(a==="*")return r["*"]=o.slice(Math.max(1,s)).join("/"),{routeParams:r};if(a&&k(a)){if(S(!a.startsWith(K),`Outdated route string \`${e}\`, use \`${e.split(K).join(Pe)}\` instead.`,{showStackTrace:!1,onlyOnce:!0}),!i)return null;r[a.slice(1)]=i}else if((a||"")!==(i||""))return null}return{routeParams:r}}function vt(e){const t=e.split("*").length-1;u(t<=1,`Invalid route string \`${e}\`: route strings are not allowed to contain more than one glob character \`*\`.`),u(t===0||t===1&&e.endsWith("*"),`Invalid route string \`${e}\`: make sure your route string ends with the glob character \`*\`.`)}function T(e){const t=e.split("/").filter(a=>a!==""&&a!=="*");let n=0;for(const a of t){if(k(a))break;n++}const o=t.filter(a=>!k(a)).length,r=t.filter(a=>k(a)).length,s=e.endsWith("*");return{numberOfParameterSegments:r,numberOfStaticSegmentsBeginning:n,numberOfStaticSegements:o,isCatchAll:s}}function k(e){return e.startsWith(Pe)||e.startsWith(K)}function re(e){const n=Y(e,e);return l(n),Object.keys(n.routeParams).length===0}function Pt(e){e.sort(Rt).sort(O(t=>t.routeType==="FUNCTION"&&!!t.precedence&&t.precedence<0)).sort(O(t=>t.routeType==="STRING"&&re(t.routeString)===!1)).sort(O(t=>t.routeType==="FUNCTION"&&!t.precedence)).sort(O(t=>t.routeType==="STRING"&&re(t.routeString)===!0)).sort(O(t=>t.routeType==="FILESYSTEM")).sort(O(t=>t.routeType==="FUNCTION"&&!!t.precedence&&t.precedence>0))}function Rt(e,t){var n,o;{const r=(n=e.precedence)!==null&&n!==void 0?n:0,s=(o=t.precedence)!==null&&o!==void 0?o:0;if(r!==s)return r>s?-1:1}if(!t.routeString||!e.routeString)return 0;{const s=N(a=>T(a).numberOfStaticSegmentsBeginning)(e.routeString,t.routeString);if(s!==0)return s}{const s=N(a=>T(a).numberOfStaticSegements)(e.routeString,t.routeString);if(s!==0)return s}{const s=N(a=>T(a).numberOfParameterSegments)(e.routeString,t.routeString);if(s!==0)return s}{if(T(t.routeString).isCatchAll)return-1;if(T(e.routeString).isCatchAll)return 1}return 0}async function wt(e,t,n,o){bt(n);let r=e(n);if(u(!_e(r)||t,`The Route Function ${o} returned a promise; async route functions are opt-in, see https://vite-plugin-ssr.com/route-function#async`),r=await r,r===!1)return null;if(r===!0&&(r={}),u(v(r),`The Route Function ${o} should return a boolean or a plain JavaScript object, instead it returns \`${d(r,"constructor")?r.constructor:r}\`.`),"match"in r){const{match:i}=r;if(u(typeof i=="boolean",`The \`match\` value returned by the Route Function ${o} should be a boolean.`),!i)return null}let s=null;"precedence"in r&&(s=r.precedence,u(typeof s=="number",`The \`precedence\` value returned by the Route Function ${o} should be a number.`)),Re(r,`The \`routeParams\` object returned by the Route Function ${o} should`);const a=r.routeParams||{};return u(!("pageContext"in r),"Providing `pageContext` in Route Functions is forbidden, see https://vite-plugin-ssr.com/route-function#cannot-provide-pagecontext"),l(v(a)),Object.keys(r).forEach(i=>{u(i==="match"||i==="routeParams"||i==="precedence",`The Route Function ${o} returned an object with an unknown key \`{ ${i} }\`. Allowed keys: ['match', 'routeParams', 'precedence'].`)}),{precedence:s,routeParams:a}}function Re(e,t){l(t.endsWith(" should")),d(e,"routeParams")&&(l(t.endsWith(" should")),u(v(e.routeParams),`${t} be a plain JavaScript object.`),u(ut(e.routeParams),`${t} only hold string values.`))}function we(e,{hook:t,errorMessagePrefix:n,canBePromise:o}){if(!n){l(t);const{hookName:r,hookSrc:s}=t;l(!r.endsWith(")")),n=`The \`pageContext\` provided by the ${r}() hook defined by ${s}`}if(o&&!G(e)){u(J(e)||_e(e),`${n} should be an object, or an async function https://vite-plugin-ssr.com/stream#initial-data-after-stream-end`);return}u(G(e),`${n} should be an object.`),u(!("_objectCreatedByVitePluginSsr"in e),`${n} should not be the whole \`pageContext\` object, see https://vite-plugin-ssr.com/pageContext-manipulation#do-not-return-entire-pagecontext`),S(!("_pageId"in e),"You are using `onBeforeRoute()` to override vite-plugin-ssr routing. This is experimental: make sure to contact a vite-plugin-ssr maintainer before using this.",{showStackTrace:!1,onlyOnce:!0})}async function Ot(e,t){const n=await e.onBeforeRoute(t),o=`The \`onBeforeRoute()\` hook defined by ${e.hookSrc}`;if(u(n==null||lt(n,["pageContext"])&&d(n,"pageContext"),`${o} should return \`null\`, \`undefined\`, or a plain JavaScript object \`{ pageContext: { /* ... */ } }\`.`),n==null)return null;if(u(d(n,"pageContext","object"),`${o} returned \`{ pageContext }\` but \`pageContext\` should be a plain JavaScript object.`),d(n.pageContext,"_pageId")&&!d(n.pageContext,"_pageId","null")){const s=`${o} returned \`{ pageContext: { _pageId } }\` but \`_pageId\` should be`;u(d(n.pageContext,"_pageId","string"),`${s} a string or \`null\``),u(t._allPageIds.includes(n.pageContext._pageId),`${s} one of following values: \`[${t._allPageIds.map(a=>`'${a}'`).join(", ")}]\`.`)}d(n.pageContext,"routeParams")&&Re(n.pageContext,`${o} returned \`{ pageContext: { routeParams } }\` but \`routeParams\` should`);const r={};return d(n.pageContext,"url")&&(S(!1,`${o} returned \`{ pageContext: { url } }\` but \`pageContext.url\` has been renamed to \`pageContext.urlOriginal\`. Return \`{ pageContext: { urlOriginal } }\` instead. (See https://vite-plugin-ssr.com/migration/0.4.23 for more information.)`,{showStackTrace:!1,onlyOnce:!0}),n.pageContext.urlOriginal=n.pageContext.url,delete n.pageContext.url),d(n.pageContext,"urlOriginal")&&(u(d(n.pageContext,"urlOriginal","string"),`${o} returned \`{ pageContext: { urlOriginal } }\` but \`urlOriginal\` should be a string`),m(r,{_urlPristine:t.urlOriginal})),we(n.pageContext,{hook:{hookSrc:e.hookSrc,hookName:"onBeforeRoute"}}),m(r,n.pageContext),r}var I;function oe(...e){var t,n;I||(I=(n=(t=globalThis).__brillout_debug_createDebugger)===null||n===void 0?void 0:n.call(t,"vps:routing")),I&&I(...e)}async function Oe(e){be(e);const{pageRoutes:t,onBeforeRouteHook:n}=await ft(e._pageFilesAll,e._pageConfigs,e._allPageIds);oe("Pages routes:",t);const o={};if(n){const c=await Ot(n,e);if(c){if(m(o,c),d(o,"_pageId","string")||d(o,"_pageId","null"))return d(o,"routeParams")?l(d(o,"routeParams","object")):m(o,{routeParams:{}}),m(o,{_routingProvidedByOnBeforeRouteHook:!0,_routeMatches:"CUSTOM_ROUTE"}),{pageContextAddendum:o};m(e,o)}}m(o,{_routingProvidedByOnBeforeRouteHook:!1});const r=e._allPageIds;l(r.length>=0),u(e._pageFilesAll.length>0||e._pageConfigs.length>0,"No *.page.js file found. You must create at least one *.page.js file."),u(r.length>0,"You must create at least one *.page.js file that isn't _default.page.*");const{urlPathname:s}=e;l(s.startsWith("/"));const a=[];await Promise.all(t.map(async c=>{const{pageId:f,routeType:h}=c;if(c.routeType==="FILESYSTEM"){const{routeString:g}=c,y=Y(g,s);if(y){const{routeParams:_}=y;a.push({pageId:f,routeParams:_,routeString:g,routeType:h})}return}if(c.routeType==="STRING"){const{routeString:g}=c,y=Y(g,s);if(y){const{routeParams:_}=y;l(h==="STRING"),a.push({pageId:f,routeString:g,routeParams:_,routeType:h})}return}if(c.routeType==="FUNCTION"){const{routeFunction:g,allowAsync:y,pageRouteFilePath:_}=c,p=await wt(g,y,e,_);if(p){const{routeParams:P,precedence:C}=p;a.push({pageId:f,precedence:C,routeParams:P,routeType:h})}return}l(!1)})),Pt(a);const i=a[0];if(oe(`Route matches for URL \`${s}\` (in precedence order):`,a),m(o,{_routeMatches:a}),!i)return m(o,{_pageId:null,routeParams:{}}),{pageContextAddendum:o};{const{routeParams:c}=i;l(v(c)),m(o,{_pageId:i.pageId,routeParams:i.routeParams})}return{pageContextAddendum:o}}const Ct=["Page"],Tt=Object.freeze(Object.defineProperty({__proto__:null,exportNames:Ct},Symbol.toStringTag,{value:"Module"})),Ft=["Page"],Et=Object.freeze(Object.defineProperty({__proto__:null,exportNames:Ft},Symbol.toStringTag,{value:"Module"})),xt=["Page"],At=Object.freeze(Object.defineProperty({__proto__:null,exportNames:xt},Symbol.toStringTag,{value:"Module"})),It=["onBeforeRender","prerender"],Nt=Object.freeze(Object.defineProperty({__proto__:null,exportNames:It},Symbol.toStringTag,{value:"Module"})),jt=["onBeforeRender"],kt=Object.freeze(Object.defineProperty({__proto__:null,exportNames:jt},Symbol.toStringTag,{value:"Module"})),$t=["passToClient","render","onBeforePrerender"],Ht=Object.freeze(Object.defineProperty({__proto__:null,exportNames:$t},Symbol.toStringTag,{value:"Module"})),Wt=e=>{if(!e.urlPathname)return!1;let t=e.urlPathname;if(t==="/")return{match:!0,precedence:10,routeParams:{page:"1"}};if(!t.startsWith("/blog"))return!1;t=t.slice(5);let n=1;if(t!==""&&t!=="/"){const o=t.slice(1).split("/",1);if(o&&o[0]){const r=Number.parseInt(o[0],10);r&&!Number.isNaN(r)&&r>0&&(n=r)}}return{routeParams:{page:n.toString()}}},Bt=Object.freeze(Object.defineProperty({__proto__:null,default:Wt},Symbol.toStringTag,{value:"Module"})),Lt=e=>{if(!e.urlPathname)return!1;let t=e.urlPathname;if(!t.startsWith("/post/")||(t=t.slice(6),!t||t.length===0))return!1;const n=t.split("/",1)[0];return!n||n===""?!1:{routeParams:{slug:n}}},Vt=Object.freeze(Object.defineProperty({__proto__:null,default:Lt},Symbol.toStringTag,{value:"Module"})),Dt=e=>{const t=e.urlParsed.pathname;return st.find(o=>t===`/${o}`||t.startsWith(`/${o}/`,0))??void 0},Ut=e=>()=>{const t=Dt(e);return t==null?[]:[t]};function zt(e){if(it)return;const t=at(Ut(e));let n=e.urlParsed.pathname;return n===`/${t}`?n="/":n.startsWith(`/${t}/`,0)&&(n=n.slice(`/${t}`.length)),{pageContext:{locale:t,urlOriginal:n}}}const Gt=Object.freeze(Object.defineProperty({__proto__:null,onBeforeRoute:zt},Symbol.toStringTag,{value:"Module"})),Kt=["hydrationCanBeAborted","render"],Yt=Object.freeze(Object.defineProperty({__proto__:null,exportNames:Kt},Symbol.toStringTag,{value:"Module"})),X={},Ce={},Mt={},L={},Jt=[],qt={},Xt=!0,Qt=[],Zt={},en=null,tn=Object.assign({"/src/pages/blog/index.page.tsx":()=>j(()=>import("./src/pages/blog/index.page.cbd3406d.js"),["assets/src/pages/blog/index.page.cbd3406d.js","assets/chunk-4f12729c.js","assets/chunk-b9674078.js","assets/chunk-340acbf2.js","assets/chunk-704646a9.js","assets/chunk-afc3f033.js","assets/chunk-5e8bbab2.js"]),"/src/pages/blog/post.page.tsx":()=>j(()=>import("./src/pages/blog/post.page.05925518.js"),["assets/src/pages/blog/post.page.05925518.js","assets/chunk-4f12729c.js","assets/chunk-b9674078.js","assets/chunk-340acbf2.js","assets/chunk-704646a9.js","assets/chunk-afc3f033.js","assets/chunk-5e8bbab2.js"]),"/src/pages/renderer/_error.page.tsx":()=>j(()=>import("./src/pages/renderer/_error.page.c8b285fd.js"),["assets/src/pages/renderer/_error.page.c8b285fd.js","assets/chunk-4f12729c.js","assets/chunk-b9674078.js","assets/chunk-5e8bbab2.js"])}),nn={...tn};X[".page"]=nn;const rn=Object.assign({"/src/pages/blog/index.page.tsx":Tt,"/src/pages/blog/post.page.tsx":Et,"/src/pages/renderer/_error.page.tsx":At}),on={...rn};L[".page"]=on;const sn=Object.assign({"/src/pages/blog/index.page.server.tsx":Nt,"/src/pages/blog/post.page.server.tsx":kt,"/src/pages/renderer/_default.page.server.tsx":Ht}),an={...sn};L[".page.server"]=an;const ln=Object.assign({"/src/pages/blog/index.page.route.ts":Bt,"/src/pages/blog/post.page.route.ts":Vt,"/src/pages/renderer/_default.page.route.ts":Gt}),un={...ln};Ce[".page.route"]=un;const cn=Object.assign({"/src/pages/renderer/_default.page.client.tsx":()=>j(()=>import("./src/pages/renderer/_default.page.client.4310c23a.js"),["assets/src/pages/renderer/_default.page.client.4310c23a.js","assets/chunk-4f12729c.js","assets/chunk-b9674078.js","assets/chunk-afc3f033.js","assets/chunk-704646a9.js"])}),fn={...cn};X[".page.client"]=fn;const dn=Object.assign({"/src/pages/renderer/_default.page.client.tsx":Yt}),gn={...dn};L[".page.client"]=gn;const pn=Object.freeze(Object.defineProperty({__proto__:null,isGeneratedFile:Xt,neverLoaded:qt,pageConfigGlobal:Zt,pageConfigs:Qt,pageFilesEager:Ce,pageFilesExportNamesEager:L,pageFilesExportNamesLazy:Mt,pageFilesLazy:X,pageFilesList:Jt,plusFilesGlob:en},Symbol.toStringTag,{value:"Module"}));Ke(pn);function Te(e){return!e.startsWith("/")&&!e.startsWith(".")&&!e.startsWith("?")&&e!==""}function hn(e,t){let n=!1;return()=>{n||(n=!0,setTimeout(()=>{n=!1,e()},t))}}function mn(e){return W(e,"/").pathname}function $(e){window.location.href=e}function yn(){var e,t,n,o;const r=!!(!((t=(e=window.__REACT_DEVTOOLS_GLOBAL_HOOK__)===null||e===void 0?void 0:e.renderers)===null||t===void 0)&&t.size),s=!!(!((o=(n=window.__REACT_DEVTOOLS_GLOBAL_HOOK__)===null||n===void 0?void 0:n.rendererInterfaces)===null||o===void 0)&&o.size),a=!!window.__vite_plugin_react_preamble_installed__;return r||s||a}function _n(e,t){return e?.message===t?.message}function bn(e){return new Promise(t=>setTimeout(t,e))}const se=B("navigationState.ts",{}),Sn=A(),Fe={markNavigationChange(){se.navigationChanged=!0},get noNavigationChangeYet(){return!se.navigationChanged&&this.isFirstUrl(A())},isFirstUrl(e){return e===Sn}};async function vn(e,t){const o=fe(e,t).filter(s=>s.fileType===".page.server");return await Promise.all(o.map(async s=>{s.exportNames||(l(s.loadExportNames,t),await s.loadExportNames())})),{hasOnBeforeRenderServerSideOnlyHook:o.some(({exportNames:s})=>(l(s),s.includes("onBeforeRender")))}}function Pn(e,t,n,o,r=!1){l(!t.endsWith(")"));const s=`The ${t}() hook defined by ${o}`;u(e==null||v(e),`${s} should return \`null\`, \`undefined\`, or a plain JavaScript object.`),e!=null&&(Rn(e,n,s),"pageContext"in e&&we(e.pageContext,{hook:{hookName:t,hookSrc:o},canBePromise:r}))}function Rn(e,t,n){const o=[],r=Object.keys(e);for(const s of r)t.includes(s)||o.push(s);u(o.length===0,[n,"returned an object with unknown keys",te(o)+".","Only following keys are allowed:",te(t)+"."].join(" "))}const ie=["urlPathname","urlParsed"],wn=["Page","pageExports","exports"];function Ee(e){[...wn,...ie].forEach(n=>{n in e&&(ie.includes(n)?(l(n.startsWith("url")),S(!1,`\`pageContext.${n}\` is already available in the browser when using Client Routing; including \`${n}\` in \`passToClient\` has no effect.`,{showStackTrace:!1,onlyOnce:!0})):S(!1,`\`pageContext.${n}\` is a built-in that cannot be overriden; including \`${n}\` in \`passToClient\` has no effect.`,{showStackTrace:!1,onlyOnce:!0}),delete e[n])})}const On="/";function Cn(e,t,n){const{pathnameOriginal:o,searchOriginal:r,hashOriginal:s}=W(e,On);e.startsWith("/")&&l(e===`${o}${r||""}${s||""}`,{url:e});const a=o.endsWith("/");let i;return n&&o!=="/"?(a?i=F(o,0,-1):i=o,l(!i.endsWith("/"),{url:e}),l(i!=="")):i=o+(a?"":"/")+"index",l(i),i=i+t,`${i}${r||""}${s||""}`}const Tn=".pageContext.json",Fn=!1;function En(e){return Cn(e,Tn,Fn)}async function xn(e){return e._isFirstRenderAttempt&&Fe.isFirstUrl(e.urlOriginal)?(l(d(e,"_isFirstRenderAttempt","true")),An(e)):(l(d(e,"_isFirstRenderAttempt","false")),Nn(e))}async function An(e){const t=Ye();return Ee(t),m(t,{isHydration:!0,_comesDirectlyFromServer:!0}),m(t,await x(e._pageFilesAll,e._pageConfigs,t._pageId)),t}async function In(e){const t=de(e._pageFilesAll,e._pageConfigs);if(!t)throw new Error("No error page");const n={isHydration:!1,_pageId:t,_pageContextRetrievedFromServer:null,_comesDirectlyFromServer:!1};return m(n,await x(e._pageFilesAll,e._pageConfigs,n._pageId)),n}async function Nn(e){let t={};m(t,{isHydration:!1}),m(t,await $n(e)),m(t,await x(e._pageFilesAll,e._pageConfigs,t._pageId));const n=await jn({...e,...t});if(l([!0,!1].includes(n._comesDirectlyFromServer)),n._isError){t={},l(n._comesDirectlyFromServer===!0),l(d(n,"is404","boolean")),l(d(n,"pageProps","object")),l(d(n.pageProps,"is404","boolean")),l(!("serverSideError"in n));const o=de(e._pageFilesAll,e._pageConfigs);return l(o),m(t,{isHydration:!1,_pageId:o}),m(t,n),m(t,await x(e._pageFilesAll,e._pageConfigs,t._pageId)),t}else return m(t,n),t}async function jn(e){const t=Me(e,"onBeforeRender");if(t){const o=t.hook,r={_comesDirectlyFromServer:!1,_pageContextRetrievedFromServer:null},s=Je({...e,...r},!0),a=await ge(()=>o(s),"onBeforeRender",t.hookSrc);Pn(a,"onBeforeRender",["pageContext"],t.hookSrc);const i=a?.pageContext;return m(r,i),r}if(await kn(e)){const o=await Hn(e),r={};return Object.assign(r,o),m(r,{_comesDirectlyFromServer:!0,_pageContextRetrievedFromServer:o}),r}return{_comesDirectlyFromServer:!1,_pageContextRetrievedFromServer:null}}async function kn(e){if(e._pageConfigs.length>0){const t=qe(e._pageId,e._pageConfigs);return!!pe(t,"onBeforeRender")&&t.configSources.onBeforeRender.c_env==="server-only"}else{const{hasOnBeforeRenderServerSideOnlyHook:t}=await vn(e._pageFilesAll,e._pageId);return t}}async function $n(e){const n=(await Oe(e)).pageContextAddendum;if(!n._pageId)throw new Error("No routing match");return l(d(n,"_pageId","string")),n}async function Hn(e){var t;const n=En((t=e._urlPristine)!==null&&t!==void 0?t:e.urlOriginal),o=await fetch(n);{const i=o.headers.get("content-type"),c=i&&i.includes("application/json");if(!c&&o.status===404){$(e.urlOriginal);const f=new Error("Page doesn't exist");throw Object.assign(f,{_abortRendering:!0}),f}u(c,`Wrong HTTP Response Header \`content-type\` value for URL ${n} (it should be \`application/json\` but we got \`${i}\`). Make sure to use \`pageContext.httpResponse.contentType\`, see https://github.com/brillout/vite-plugin-ssr/issues/191`)}const r=await o.text(),s=Xe(r);if("serverSideError"in s)throw Qe("`pageContext` could not be fetched from the server as an error occurred on the server; check your server logs.");l(d(s,"pageContext"));const a=s.pageContext;return l(v(a)),l(d(a,"_pageId","string")),Ee(a),a}function xe(){const e="/";return l(Wn(e)),e}function Wn(e){return e.startsWith("/")}const U=B("createPageContext.ts",{});async function Ae(e){U.pageFilesData||(U.pageFilesData=await Ze(!0));const{pageFilesAll:t,allPageIds:n,pageConfigs:o}=U.pageFilesData,r=xe();l(he(r));const s={_objectCreatedByVitePluginSsr:!0,_urlHandler:null,_baseServer:r,_isProduction:!0,_pageFilesAll:t,_pageConfigs:o,_allPageIds:n};return m(s,e),be(s),s}async function Ie(e){const t=await Ae({urlOriginal:e}),n=await Oe(t),o=t._pageFilesAll,r=t._pageConfigs;if(!("pageContextAddendum"in n))return{pageId:null,pageFilesAll:o,pageConfigs:r};const s=n.pageContextAddendum._pageId;return s?{pageId:s,pageFilesAll:o,pageConfigs:r}:{pageId:null,pageFilesAll:o,pageConfigs:r}}function E(e){return e.fileType===".css"?[]:e.exportNames?e.exportNames:(l(e.fileExports,e.filePath),Object.keys(e.fileExports))}function Bn({pageFilesClientSide:e,pageFilesServerSide:t,pageId:n}){return{isHtmlOnly:o(),isClientRouting:s()};function o(){return t.some(i=>i.pageId===n&&i.fileType===".page")?(r(),!1):!(!t.some(i=>i.pageId===n&&i.fileType===".page.server")||e.some(i=>i.pageId===n&&i.fileType===".page.client"&&E(i).includes("render")))}function r(){const a=e.some(i=>E(i).includes("render"));u(a,["No client-side `render()` hook found.","See https://vite-plugin-ssr.com/render-modes for more information.",["Loaded client-side page files (none of them `export { render }`):",...e.map((i,c)=>` (${c+1}): ${i.filePath}`)].join(`
`)].join(" "))}function s(){return e.some(i=>E(i).includes("clientRouting"))}}function Ln({pageFilesClientSide:e,pageFilesServerSide:t,isHtmlOnly:n,isClientRouting:o}){let r=[];const s=t.filter(i=>!e.includes(i)),a=[];if(a.push(...e.map(i=>({id:i.filePath,onlyAssets:!1,eagerlyImported:!1}))),a.push(...s.map(i=>({id:i.filePath,onlyAssets:!0,eagerlyImported:!1}))),n)r=e.map(i=>i.filePath);else{const i=Vn(o);a.push({id:i,onlyAssets:!1,eagerlyImported:!1}),r=[i]}return{clientEntries:r,clientDependencies:a}}function Vn(e){return e?"@@vite-plugin-ssr/dist/esm/client/router/entry.js":"@@vite-plugin-ssr/dist/esm/client/entry.js"}function Dn(e,t){let n=me(e,t);const o=fe(e,t),{isHtmlOnly:r,isClientRouting:s}=Bn({pageFilesClientSide:n,pageFilesServerSide:o,pageId:t});r&&(n=n.filter(c=>c.isEnv("CLIENT_ONLY")&&!E(c).includes("render")),n=zn(n));const{clientEntries:a,clientDependencies:i}=Ln({pageFilesClientSide:n,pageFilesServerSide:o,isHtmlOnly:r,isClientRouting:s});return{isHtmlOnly:r,isClientRouting:s,clientEntries:a,clientDependencies:i,pageFilesClientSide:n,pageFilesServerSide:o}}async function Un(e,t,{sharedPageFilesAlreadyLoaded:n}){const o=me(e,t);await Promise.all(o.map(async r=>{var s;l(r.isEnv("CLIENT_ONLY")||r.isEnv("CLIENT_AND_SERVER")),!(n&&r.isEnv("CLIENT_AND_SERVER"))&&await((s=r.loadExportNames)===null||s===void 0?void 0:s.call(r))}))}function zn(e){const t=[];for(const n of e)if(t.push(n),E(n).includes("overrideDefaultPages"))break;return t}async function Ne(e){const{pageId:t,pageFilesAll:n,pageConfigs:o}=await Ie(e);if(!t)return!1;await Un(n,t,{sharedPageFilesAlreadyLoaded:!1});const r=et(o,t),{isClientSideRenderable:s,isClientRouting:a}=Gn(r,n,t);return s&&a}function Gn(e,t,n){var o;if(e){const r=(o=tt(e,"clientRouting","boolean"))!==null&&o!==void 0?o:!1;return{isClientSideRenderable:!!pe(e,"onRenderClient"),isClientRouting:r}}else{const{isHtmlOnly:r,isClientRouting:s}=Dn(t,n);return{isClientSideRenderable:!r,isClientRouting:s}}}function je(e){const t=e.getAttribute("href");return!!(t===null||t===""||Te(t)||Kn(e)||Yn(t)||!Mn(t)||!nt(t))}function Kn(e){const t=e.getAttribute("target"),n=e.getAttribute("rel");return t==="_blank"||t==="_external"||n==="external"||e.hasAttribute("download")}function Yn(e){if(e.startsWith("#"))return!0;const t=n=>n.split("#")[0];return!!(e.includes("#")&&t(e)===t(window.location.href))}function Mn(e){const t=xe();l(he(t));const{hasBaseServer:n}=W(e,t);return n}function Jn(e,t){return{prefetchPageContext:!1,prefetchStaticAssets:qn(e,t)}}function qn(e,t){let n=Xn(t),o=(()=>{if(n!==null)return n===!0?{when:"VIEWPORT"}:{when:"HOVER"};if("prefetchLinks"in e.exports&&u(n===null,"`export { prefetchLinks }` is deprecated, use `export { prefetchStaticAssets }` instead."),"prefetchStaticAssets"in e.exports){const{prefetchStaticAssets:r}=e.exports;if(r===!1)return!1;const s="`prefetchStaticAssets` should be either `false`, `{ when: 'VIEWPORT' }`, or `{ when: 'HOVER' }`";u(v(r),s);const a=Object.keys(r);u(a.length===1&&a[0]==="when",s);const{when:i}=r;if(i==="HOVER"||i==="VIEWPORT")return{when:i};u(!1,s)}return{when:"HOVER"}})();return o&&o.when==="VIEWPORT"&&!e._isProduction&&(ye(!1,"Viewport prefetching is disabled in development",{onlyOnce:!0}),o={when:"HOVER"}),o}function Xn(e){let t=e.getAttribute("data-prefetch");if(S(t===null,"The `data-prefetch` attribute is outdated.",{showStackTrace:!1,onlyOnce:!0}),t===null)return null;if(l(typeof t=="string"),t==="true")return!0;if(t==="false")return!1;u(!1,`Wrong data-prefetch value: \`"${t}"\`; it should be \`"true"\` or \`"false"\`.`)}const ke=new Map;function $e(e){const t=We(e);return ke.has(t)}function He(e){const t=We(e);ke.set(t,!0)}function We(e){return mn(e)}const ae=new Map;async function z(e){if(u(!Te(e),`You are trying to prefetch ${e} which is an external URL. This doesn't make sense since vite-plugin-ssr cannot prefetch external links.`),$e(e))return;He(e);const{pageId:t,pageFilesAll:n,pageConfigs:o}=await Ie(e);if(t)try{await x(n,o,t)}catch(r){if(q(r))M(r,!0);else throw r}}function Qn(e){He(e.urlOriginal),[...document.getElementsByTagName("A")].forEach(async n=>{if(ae.has(n))return;ae.set(n,!0);const o=n.getAttribute("href");if(je(n)||(l(o),!await Ne(o))||$e(o))return;const r=Jn(e,n);if(r.prefetchStaticAssets){if(r.prefetchStaticAssets.when==="HOVER")n.addEventListener("mouseover",()=>z(o)),n.addEventListener("touchstart",()=>z(o),{passive:!0});else if(r.prefetchStaticAssets.when==="VIEWPORT"){const s=new IntersectionObserver(a=>{a.forEach(i=>{i.isIntersecting&&(z(o),s.disconnect())})});s.observe(n)}}else return})}function Be(){let e=window.history.state;e||(e={});let t=!1;"timestamp"in e||(t=!0,e.timestamp=Ve()),"scrollPosition"in e||(t=!0,e.scrollPosition=Le()),De(e),t&&Z(e)}function Q(){const e=window.history.state||{};return De(e),e}function Le(){return{x:window.scrollX,y:window.scrollY}}function Ve(){return new Date().getTime()}function le(){const e=Le(),t=Q();Z({...t,scrollPosition:e})}function Zn(e,t){if(t)Z(Q(),e);else{const n=Ve();er({timestamp:n,scrollPosition:null},e)}}function De(e){if(l(G(e)),"timestamp"in e){const{timestamp:t}=e;l(typeof t=="number")}if("scrollPosition"in e){const{scrollPosition:t}=e;t!==null&&l(d(t,"x","number")&&d(t,"y","number"))}}function Z(e,t){window.history.replaceState(e,"",t??null)}function er(e,t){window.history.pushState(e,"",t)}const tr=B("navigate.ts",{});function nr(e){tr.navigate=e}const b=B("useClientRouter.ts",{previousState:H()});cr();Be();function M(e,t){l(q(e)),b.clientRoutingIsDisabled=!0,t&&console.log(e),ye(!1,"New deployed frontend detected. The next page navigation will use Server Routing instead of Client Routing.",{onlyOnce:!0})}function rr(){lr(),or((r,{keepScrollPosition:s})=>{o({scrollTarget:s?"preserve-scroll":"scroll-to-top-or-hash",url:r,isBackwardNavigation:!1,checkClientSideRenderable:!0})}),sr((r,s)=>{o({scrollTarget:r,isBackwardNavigation:s})}),nr(async(r,{keepScrollPosition:s=!1,overwriteLastHistoryEntry:a=!1}={})=>{await o({scrollTarget:s?"preserve-scroll":"scroll-to-top-or-hash",url:r,overwriteLastHistoryEntry:a,isBackwardNavigation:!1,checkClientSideRenderable:!0})});let e=0,t,n=!1;o({scrollTarget:"preserve-scroll",isBackwardNavigation:null});return;async function o({scrollTarget:r,url:s=A(),overwriteLastHistoryEntry:a=!1,isBackwardNavigation:i,checkClientSideRenderable:c}){var f;if(b.clientRoutingIsDisabled){$(s);return}if(c&&!await Ne(s)){$(s);return}const h={urlOriginal:s,isBackwardNavigation:i},g=++e;l(g>=1),g>1&&n===!1&&((f=b.onPageTransitionStart)===null||f===void 0||f.call(b,h),n=!0);let y=!1;const _=()=>g===1&&y===!1?!1:g!==e,p=await Ae(h);if(_())return;const P=g===1;m(p,{_isFirstRenderAttempt:P});let C;try{C=await xn(p)}catch(R){if(ce(R,p))return;console.error(R);try{C=await In(p)}catch(w){if(ce(w,p)||(P||setTimeout(()=>{window.location.pathname=s},0),_n(R,w)))return;throw w}}if(m(p,C),V(p,"onPageTransitionStart"),b.onPageTransitionStart=p.exports.onPageTransitionStart,p.exports.hydrationCanBeAborted?y=!0:S(!yn(),"You seem to be using React; we recommend setting `hydrationCanBeAborted` to `true`, see https://vite-plugin-ssr.com/clientRouting",{showStackTrace:!1,onlyOnce:!0}),!_()&&(t&&await t,!_())){if(ir(s,a),Fe.markNavigationChange(),l(t===void 0),t=(async()=>{await rt(p,!0),Qn(p)})(),await t,t=void 0,p._isFirstRenderAttempt){V(p,"onHydrationEnd");const{onHydrationEnd:R}=p.exports;if(R){const w=p.exportsAll.onHydrationEnd[0].exportSource;l(w),await ge(()=>R(p),"onHydrationEnd",w)}}else g===e&&(p.exports.onPageTransitionEnd&&(V(p,"onPageTransitionEnd"),p.exports.onPageTransitionEnd(p)),n=!1);Ue(r),ee(),b.initialRenderIsDone=!0}}}function or(e){document.addEventListener("click",t);return;async function t(r){if(!n(r))return;const s=o(r.target);if(!s)return;const a=s.getAttribute("href");if(je(s))return;l(a),r.preventDefault();const i=![null,"false"].includes(s.getAttribute("keep-scroll-position"));e(a,{keepScrollPosition:i})}function n(r){return r.button===0&&!r.ctrlKey&&!r.shiftKey&&!r.altKey&&!r.metaKey}function o(r){for(;r.tagName!=="A";){const{parentNode:s}=r;if(!s)return null;r=s}return r}}function sr(e){window.addEventListener("popstate",()=>{const t=H(),n=t.historyState.scrollPosition||"scroll-to-top-or-hash",o=t.urlWithoutHash===b.previousState.urlWithoutHash,r=!t.historyState.timestamp||!b.previousState.historyState.timestamp?null:t.historyState.timestamp<b.previousState.historyState.timestamp;b.previousState=t,o?window.history.state===null?(Be(),b.previousState=H()):Ue(n):e(n,r)})}function ir(e,t){A()!==e&&(ee(),Zn(e,t),b.previousState=H())}function H(){return{urlWithoutHash:A({withoutHash:!0}),historyState:Q()}}function Ue(e){if(e==="preserve-scroll")return;let t;if(e==="scroll-to-top-or-hash"){const n=ur();if(n&&n!=="top"){const o=document.getElementById(n)||document.getElementsByName(n)[0];if(o){o.scrollIntoView();return}}t={x:0,y:0}}else l("x"in e&&"y"in e),t=e;ar(t)}function ar(e){const t=()=>window.scrollTo(e.x,e.y),n=()=>window.scrollX===e.x&&window.scrollY===e.y;n()||(t(),!n()&&requestAnimationFrame(()=>{t(),!n()&&setTimeout(async()=>{if(t(),n())return;const o=new Date().getTime();for(;;)if(await bn(10),t(),n()||new Date().getTime()-o>100)return},0)}))}function lr(){window.addEventListener("scroll",hn(le,Math.ceil(1e3/3)),{passive:!0}),ze(le)}function ur(){let{hash:e}=window.location;return e===""?null:(l(e.startsWith("#")),e=e.slice(1),e)}function cr(){ue(),ze(ue),fr(()=>b.initialRenderIsDone&&ee())}function ee(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual")}function ue(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="auto")}function ze(e){window.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&e()})}function fr(e){window.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&e()})}function ce(e,t){return!!(e?._abortRendering||dr(e,t))}function dr(e,t){if(!q(e))return!1;if(t._isFirstRenderAttempt)throw M(e,!1),e;return M(e,!0),$(t.urlOriginal),!0}ot();rr();
