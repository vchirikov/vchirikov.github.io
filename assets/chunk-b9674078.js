function _e(){return typeof window<"u"&&typeof window.scrollY=="number"}const Me=_e(),ge=()=>{},ze=new Promise(ge);var de=o=>!!o,be=o=>Array.from(new Set(o)),ye=(o,l,...v)=>{for(let d of v){let h=Te(l,d);if(h)return h}return o},Te=(o,l)=>{let v=l().map(g=>g.toLowerCase()),d=be(v.flatMap(g=>[g,g.split("-")[0]])),h=o.map(g=>g.toLowerCase());return d.map(g=>{let j=h.findIndex(M=>M===g);return j>=0&&o[j]}).find(de)},Oe=Object.create,At=Object.defineProperty,we=Object.getOwnPropertyDescriptor,jt=Object.getOwnPropertyNames,me=Object.getPrototypeOf,Ae=Object.prototype.hasOwnProperty,je=(o,l)=>function(){return l||(0,o[jt(o)[0]])((l={exports:{}}).exports,l),l.exports},Ce=(o,l,v,d)=>{if(l&&typeof l=="object"||typeof l=="function")for(let h of jt(l))!Ae.call(o,h)&&h!==v&&At(o,h,{get:()=>l[h],enumerable:!(d=we(l,h))||d.enumerable});return o},Se=(o,l,v)=>(v=o!=null?Oe(me(o)):{},Ce(l||!o||!o.__esModule?At(v,"default",{value:o,enumerable:!0}):v,o)),Pe=je({"../../node_modules/.pnpm/lodash.merge@4.6.2/node_modules/lodash.merge/index.js"(o,l){var v=200,d="__lodash_hash_undefined__",h=800,g=16,j=9007199254740991,M="[object Arguments]",Ct="[object Array]",St="[object AsyncFunction]",Pt="[object Boolean]",xt="[object Date]",It="[object Error]",Q="[object Function]",Mt="[object GeneratorFunction]",zt="[object Map]",Et="[object Number]",Nt="[object Null]",k="[object Object]",Dt="[object Proxy]",Ft="[object RegExp]",Lt="[object Set]",Ut="[object String]",Rt="[object Undefined]",Bt="[object WeakMap]",Gt="[object ArrayBuffer]",Ht="[object DataView]",$t="[object Float32Array]",qt="[object Float64Array]",Kt="[object Int8Array]",Vt="[object Int16Array]",Jt="[object Int32Array]",Yt="[object Uint8Array]",Wt="[object Uint8ClampedArray]",Xt="[object Uint16Array]",Zt="[object Uint32Array]",Qt=/[\\^$.*+?()[\]{}|]/g,kt=/^\[object .+?Constructor\]$/,tr=/^(?:0|[1-9]\d*)$/,u={};u[$t]=u[qt]=u[Kt]=u[Vt]=u[Jt]=u[Yt]=u[Wt]=u[Xt]=u[Zt]=!0,u[M]=u[Ct]=u[Gt]=u[Pt]=u[Ht]=u[xt]=u[It]=u[Q]=u[zt]=u[Et]=u[k]=u[Ft]=u[Lt]=u[Ut]=u[Bt]=!1;var tt=typeof global=="object"&&global&&global.Object===Object&&global,rr=typeof self=="object"&&self&&self.Object===Object&&self,C=tt||rr||Function("return this")(),rt=typeof o=="object"&&o&&!o.nodeType&&o,S=rt&&typeof l=="object"&&l&&!l.nodeType&&l,et=S&&S.exports===rt,B=et&&tt.process,nt=function(){try{var t=S&&S.require&&S.require("util").types;return t||B&&B.binding&&B.binding("util")}catch{}}(),at=nt&&nt.isTypedArray;function er(t,r,e){switch(e.length){case 0:return t.call(r);case 1:return t.call(r,e[0]);case 2:return t.call(r,e[0],e[1]);case 3:return t.call(r,e[0],e[1],e[2])}return t.apply(r,e)}function nr(t,r){for(var e=-1,n=Array(t);++e<t;)n[e]=r(e);return n}function ar(t){return function(r){return t(r)}}function ir(t,r){return t?.[r]}function or(t,r){return function(e){return t(r(e))}}var sr=Array.prototype,ur=Function.prototype,z=Object.prototype,G=C["__core-js_shared__"],E=ur.toString,b=z.hasOwnProperty,it=function(){var t=/[^.]+$/.exec(G&&G.keys&&G.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}(),ot=z.toString,cr=E.call(Object),fr=RegExp("^"+E.call(b).replace(Qt,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),N=et?C.Buffer:void 0,st=C.Symbol,ut=C.Uint8Array,ct=N?N.allocUnsafe:void 0,ft=or(Object.getPrototypeOf,Object),lt=Object.create,lr=z.propertyIsEnumerable,pr=sr.splice,T=st?st.toStringTag:void 0,D=function(){try{var t=q(Object,"defineProperty");return t({},"",{}),t}catch{}}(),vr=N?N.isBuffer:void 0,pt=Math.max,hr=Date.now,vt=q(C,"Map"),P=q(Object,"create"),_r=function(){function t(){}return function(r){if(!w(r))return{};if(lt)return lt(r);t.prototype=r;var e=new t;return t.prototype=void 0,e}}();function O(t){var r=-1,e=t==null?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}function gr(){this.__data__=P?P(null):{},this.size=0}function dr(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r}function br(t){var r=this.__data__;if(P){var e=r[t];return e===d?void 0:e}return b.call(r,t)?r[t]:void 0}function yr(t){var r=this.__data__;return P?r[t]!==void 0:b.call(r,t)}function Tr(t,r){var e=this.__data__;return this.size+=this.has(t)?0:1,e[t]=P&&r===void 0?d:r,this}O.prototype.clear=gr,O.prototype.delete=dr,O.prototype.get=br,O.prototype.has=yr,O.prototype.set=Tr;function y(t){var r=-1,e=t==null?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}function Or(){this.__data__=[],this.size=0}function wr(t){var r=this.__data__,e=F(r,t);if(e<0)return!1;var n=r.length-1;return e==n?r.pop():pr.call(r,e,1),--this.size,!0}function mr(t){var r=this.__data__,e=F(r,t);return e<0?void 0:r[e][1]}function Ar(t){return F(this.__data__,t)>-1}function jr(t,r){var e=this.__data__,n=F(e,t);return n<0?(++this.size,e.push([t,r])):e[n][1]=r,this}y.prototype.clear=Or,y.prototype.delete=wr,y.prototype.get=mr,y.prototype.has=Ar,y.prototype.set=jr;function m(t){var r=-1,e=t==null?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}function Cr(){this.size=0,this.__data__={hash:new O,map:new(vt||y),string:new O}}function Sr(t){var r=U(this,t).delete(t);return this.size-=r?1:0,r}function Pr(t){return U(this,t).get(t)}function xr(t){return U(this,t).has(t)}function Ir(t,r){var e=U(this,t),n=e.size;return e.set(t,r),this.size+=e.size==n?0:1,this}m.prototype.clear=Cr,m.prototype.delete=Sr,m.prototype.get=Pr,m.prototype.has=xr,m.prototype.set=Ir;function A(t){var r=this.__data__=new y(t);this.size=r.size}function Mr(){this.__data__=new y,this.size=0}function zr(t){var r=this.__data__,e=r.delete(t);return this.size=r.size,e}function Er(t){return this.__data__.get(t)}function Nr(t){return this.__data__.has(t)}function Dr(t,r){var e=this.__data__;if(e instanceof y){var n=e.__data__;if(!vt||n.length<v-1)return n.push([t,r]),this.size=++e.size,this;e=this.__data__=new m(n)}return e.set(t,r),this.size=e.size,this}A.prototype.clear=Mr,A.prototype.delete=zr,A.prototype.get=Er,A.prototype.has=Nr,A.prototype.set=Dr;function Fr(t,r){var e=J(t),n=!e&&V(t),i=!e&&!n&&bt(t),s=!e&&!n&&!i&&Tt(t),c=e||n||i||s,a=c?nr(t.length,String):[],f=a.length;for(var _ in t)(r||b.call(t,_))&&!(c&&(_=="length"||i&&(_=="offset"||_=="parent")||s&&(_=="buffer"||_=="byteLength"||_=="byteOffset")||gt(_,f)))&&a.push(_);return a}function H(t,r,e){(e!==void 0&&!R(t[r],e)||e===void 0&&!(r in t))&&$(t,r,e)}function Lr(t,r,e){var n=t[r];(!(b.call(t,r)&&R(n,e))||e===void 0&&!(r in t))&&$(t,r,e)}function F(t,r){for(var e=t.length;e--;)if(R(t[e][0],r))return e;return-1}function $(t,r,e){r=="__proto__"&&D?D(t,r,{configurable:!0,enumerable:!0,value:e,writable:!0}):t[r]=e}var Ur=Zr();function L(t){return t==null?t===void 0?Rt:Nt:T&&T in Object(t)?Qr(t):ae(t)}function ht(t){return x(t)&&L(t)==M}function Rr(t){if(!w(t)||ee(t))return!1;var r=W(t)?fr:kt;return r.test(ue(t))}function Br(t){return x(t)&&yt(t.length)&&!!u[L(t)]}function Gr(t){if(!w(t))return ne(t);var r=dt(t),e=[];for(var n in t)n=="constructor"&&(r||!b.call(t,n))||e.push(n);return e}function _t(t,r,e,n,i){t!==r&&Ur(r,function(s,c){if(i||(i=new A),w(s))Hr(t,r,c,e,_t,n,i);else{var a=n?n(K(t,c),s,c+"",t,r,i):void 0;a===void 0&&(a=s),H(t,c,a)}},Ot)}function Hr(t,r,e,n,i,s,c){var a=K(t,e),f=K(r,e),_=c.get(f);if(_){H(t,e,_);return}var p=s?s(a,f,e+"",t,r,c):void 0,I=p===void 0;if(I){var X=J(f),Z=!X&&bt(f),mt=!X&&!Z&&Tt(f);p=f,X||Z||mt?J(a)?p=a:ce(a)?p=Yr(a):Z?(I=!1,p=Kr(f,!0)):mt?(I=!1,p=Jr(f,!0)):p=[]:fe(f)||V(f)?(p=a,V(a)?p=le(a):(!w(a)||W(a))&&(p=kr(f))):I=!1}I&&(c.set(f,p),i(p,f,n,s,c),c.delete(f)),H(t,e,p)}function $r(t,r){return oe(ie(t,r,wt),t+"")}var qr=D?function(t,r){return D(t,"toString",{configurable:!0,enumerable:!1,value:ve(r),writable:!0})}:wt;function Kr(t,r){if(r)return t.slice();var e=t.length,n=ct?ct(e):new t.constructor(e);return t.copy(n),n}function Vr(t){var r=new t.constructor(t.byteLength);return new ut(r).set(new ut(t)),r}function Jr(t,r){var e=r?Vr(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.length)}function Yr(t,r){var e=-1,n=t.length;for(r||(r=Array(n));++e<n;)r[e]=t[e];return r}function Wr(t,r,e,n){var i=!e;e||(e={});for(var s=-1,c=r.length;++s<c;){var a=r[s],f=n?n(e[a],t[a],a,e,t):void 0;f===void 0&&(f=t[a]),i?$(e,a,f):Lr(e,a,f)}return e}function Xr(t){return $r(function(r,e){var n=-1,i=e.length,s=i>1?e[i-1]:void 0,c=i>2?e[2]:void 0;for(s=t.length>3&&typeof s=="function"?(i--,s):void 0,c&&te(e[0],e[1],c)&&(s=i<3?void 0:s,i=1),r=Object(r);++n<i;){var a=e[n];a&&t(r,a,n,s)}return r})}function Zr(t){return function(r,e,n){for(var i=-1,s=Object(r),c=n(r),a=c.length;a--;){var f=c[t?a:++i];if(e(s[f],f,s)===!1)break}return r}}function U(t,r){var e=t.__data__;return re(r)?e[typeof r=="string"?"string":"hash"]:e.map}function q(t,r){var e=ir(t,r);return Rr(e)?e:void 0}function Qr(t){var r=b.call(t,T),e=t[T];try{t[T]=void 0;var n=!0}catch{}var i=ot.call(t);return n&&(r?t[T]=e:delete t[T]),i}function kr(t){return typeof t.constructor=="function"&&!dt(t)?_r(ft(t)):{}}function gt(t,r){var e=typeof t;return r=r??j,!!r&&(e=="number"||e!="symbol"&&tr.test(t))&&t>-1&&t%1==0&&t<r}function te(t,r,e){if(!w(e))return!1;var n=typeof r;return(n=="number"?Y(e)&&gt(r,e.length):n=="string"&&r in e)?R(e[r],t):!1}function re(t){var r=typeof t;return r=="string"||r=="number"||r=="symbol"||r=="boolean"?t!=="__proto__":t===null}function ee(t){return!!it&&it in t}function dt(t){var r=t&&t.constructor,e=typeof r=="function"&&r.prototype||z;return t===e}function ne(t){var r=[];if(t!=null)for(var e in Object(t))r.push(e);return r}function ae(t){return ot.call(t)}function ie(t,r,e){return r=pt(r===void 0?t.length-1:r,0),function(){for(var n=arguments,i=-1,s=pt(n.length-r,0),c=Array(s);++i<s;)c[i]=n[r+i];i=-1;for(var a=Array(r+1);++i<r;)a[i]=n[i];return a[r]=e(c),er(t,this,a)}}function K(t,r){if(!(r==="constructor"&&typeof t[r]=="function")&&r!="__proto__")return t[r]}var oe=se(qr);function se(t){var r=0,e=0;return function(){var n=hr(),i=g-(n-e);if(e=n,i>0){if(++r>=h)return arguments[0]}else r=0;return t.apply(void 0,arguments)}}function ue(t){if(t!=null){try{return E.call(t)}catch{}try{return t+""}catch{}}return""}function R(t,r){return t===r||t!==t&&r!==r}var V=ht(function(){return arguments}())?ht:function(t){return x(t)&&b.call(t,"callee")&&!lr.call(t,"callee")},J=Array.isArray;function Y(t){return t!=null&&yt(t.length)&&!W(t)}function ce(t){return x(t)&&Y(t)}var bt=vr||he;function W(t){if(!w(t))return!1;var r=L(t);return r==Q||r==Mt||r==St||r==Dt}function yt(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=j}function w(t){var r=typeof t;return t!=null&&(r=="object"||r=="function")}function x(t){return t!=null&&typeof t=="object"}function fe(t){if(!x(t)||L(t)!=k)return!1;var r=ft(t);if(r===null)return!0;var e=b.call(r,"constructor")&&r.constructor;return typeof e=="function"&&e instanceof e&&E.call(e)==cr}var Tt=at?ar(at):Br;function le(t){return Wr(t,Ot(t))}function Ot(t){return Y(t)?Fr(t,!0):Gr(t)}var pe=Xr(function(t,r,e){_t(t,r,e)});function ve(t){return function(){return t}}function wt(t){return t}function he(){return!1}l.exports=pe}});Se(Pe(),1);const xe="en",Ie=["en","ru"],Ee={},Ne={},De=(...o)=>ye(xe,Ie,...o);export{ze as a,Ne as b,Ee as c,De as d,Me as i,Ie as l,ge as n};