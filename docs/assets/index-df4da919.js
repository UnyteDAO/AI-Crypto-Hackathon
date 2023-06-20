import{h as Je,b as W,_ as Ct,g as jt,m as $r,n as jr,p as Ne,E as Ht}from"./index-4f41c6a7.js";import{h as Hr,x as zr,b as Wr,y as Vr,z as Jr,A as Qr,c as Kr,B as Yr,C as Gr,D as Zr,E as Xr,F as eo,e as to,m as no,i as ro,g as oo,G as io,s as so,f as ao,a as co,d as lo,k as se,I as uo,n as St,J as It,H as fo}from"./http-c07f4551.js";import{b as j,l as N,y as O,k as re,S as B,D as ge,E as ho,F as go,a as ye,c as Qe,d as Ke,V as zt,s as Wt,_ as Vt,A as Jt,e as Qt,T as Kt,q as Yt,x as Gt,G as Zt,f as Xt,P as _o}from"./hooks.module-44effd41.js";const xe="Session currently connected",$="Session currently disconnected",po="Session Rejected",mo="Missing JSON RPC response",wo='JSON-RPC success response must include "result" field',yo='JSON-RPC error response must include "error" field',bo='JSON RPC request must have valid "method" value',vo='JSON RPC request must have valid "id" value',Eo="Missing one of the required parameters: bridge / uri / session",Rt="JSON RPC response format is invalid",Co="URI format is invalid",So="QRCode Modal not provided",kt="User close QRCode Modal",Io=["session_request","session_update","exchange_key","connect","disconnect","display_uri","modal_closed","transport_open","transport_close","transport_error"],Ro=["wallet_addEthereumChain","wallet_switchEthereumChain","wallet_getPermissions","wallet_requestPermissions","wallet_registerOnboarding","wallet_watchAsset","wallet_scanQRCode"],Ye=["eth_sendTransaction","eth_signTransaction","eth_sign","eth_signTypedData","eth_signTypedData_v1","eth_signTypedData_v2","eth_signTypedData_v3","eth_signTypedData_v4","personal_sign",...Ro],qe="WALLETCONNECT_DEEPLINK_CHOICE",ko={1:"mainnet",3:"ropsten",4:"rinkeby",5:"goerli",42:"kovan"};var en=Ge;Ge.strict=tn;Ge.loose=nn;var To=Object.prototype.toString,No={"[object Int8Array]":!0,"[object Int16Array]":!0,"[object Int32Array]":!0,"[object Uint8Array]":!0,"[object Uint8ClampedArray]":!0,"[object Uint16Array]":!0,"[object Uint32Array]":!0,"[object Float32Array]":!0,"[object Float64Array]":!0};function Ge(t){return tn(t)||nn(t)}function tn(t){return t instanceof Int8Array||t instanceof Int16Array||t instanceof Int32Array||t instanceof Uint8Array||t instanceof Uint8ClampedArray||t instanceof Uint16Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array}function nn(t){return No[To.call(t)]}const xo=Je(en);var Mo=en.strict,Ao=function(e){if(Mo(e)){var n=W.Buffer.from(e.buffer);return e.byteLength!==e.buffer.byteLength&&(n=n.slice(e.byteOffset,e.byteOffset+e.byteLength)),n}else return W.Buffer.from(e)};const Oo=Je(Ao),Ze="hex",Xe="utf8",Lo="binary",Bo="buffer",Uo="array",Po="typed-array",qo="array-buffer",be="0";function V(t){return new Uint8Array(t)}function et(t,e=!1){const n=t.toString(Ze);return e?ae(n):n}function tt(t){return t.toString(Xe)}function rn(t){return t.readUIntBE(0,t.length)}function Z(t){return Oo(t)}function U(t,e=!1){return et(Z(t),e)}function on(t){return tt(Z(t))}function sn(t){return rn(Z(t))}function nt(t){return W.Buffer.from(J(t),Ze)}function P(t){return V(nt(t))}function Do(t){return tt(nt(t))}function Fo(t){return sn(P(t))}function rt(t){return W.Buffer.from(t,Xe)}function an(t){return V(rt(t))}function $o(t,e=!1){return et(rt(t),e)}function jo(t){const e=parseInt(t,10);return si(ii(e),"Number can only safely store up to 53 bits"),e}function Ho(t){return Jo(ot(t))}function zo(t){return it(ot(t))}function Wo(t,e){return Qo(ot(t),e)}function Vo(t){return`${t}`}function ot(t){const e=(t>>>0).toString(2);return at(e)}function Jo(t){return Z(it(t))}function it(t){return new Uint8Array(ei(t).map(e=>parseInt(e,2)))}function Qo(t,e){return U(it(t),e)}function Ko(t){return!(typeof t!="string"||!new RegExp(/^[01]+$/).test(t)||t.length%8!==0)}function cn(t,e){return!(typeof t!="string"||!t.match(/^0x[0-9A-Fa-f]*$/)||e&&t.length!==2+2*e)}function ve(t){return W.Buffer.isBuffer(t)}function st(t){return xo.strict(t)&&!ve(t)}function ln(t){return!st(t)&&!ve(t)&&typeof t.byteLength<"u"}function Yo(t){return ve(t)?Bo:st(t)?Po:ln(t)?qo:Array.isArray(t)?Uo:typeof t}function Go(t){return Ko(t)?Lo:cn(t)?Ze:Xe}function Zo(...t){return W.Buffer.concat(t)}function un(...t){let e=[];return t.forEach(n=>e=e.concat(Array.from(n))),new Uint8Array([...e])}function Xo(t,e=8){const n=t%e;return n?(t-n)/e*e+e:t}function ei(t,e=8){const n=at(t).match(new RegExp(`.{${e}}`,"gi"));return Array.from(n||[])}function at(t,e=8,n=be){return ti(t,Xo(t.length,e),n)}function ti(t,e,n=be){return ai(t,e,!0,n)}function J(t){return t.replace(/^0x/,"")}function ae(t){return t.startsWith("0x")?t:`0x${t}`}function ni(t){return t=J(t),t=at(t,2),t&&(t=ae(t)),t}function ri(t){const e=t.startsWith("0x");return t=J(t),t=t.startsWith(be)?t.substring(1):t,e?ae(t):t}function oi(t){return typeof t>"u"}function ii(t){return!oi(t)}function si(t,e){if(!t)throw new Error(e)}function ai(t,e,n,r=be){const o=e-t.length;let i=t;if(o>0){const s=r.repeat(o);i=n?s+t:t+s}return i}function _e(t){return Z(new Uint8Array(t))}function ci(t){return on(new Uint8Array(t))}function dn(t,e){return U(new Uint8Array(t),!e)}function li(t){return sn(new Uint8Array(t))}function ui(...t){return P(t.map(e=>U(new Uint8Array(e))).join("")).buffer}function fn(t){return V(t).buffer}function di(t){return tt(t)}function fi(t,e){return et(t,!e)}function hi(t){return rn(t)}function gi(...t){return Zo(...t)}function _i(t){return an(t).buffer}function pi(t){return rt(t)}function mi(t,e){return $o(t,!e)}function wi(t){return jo(t)}function yi(t){return nt(t)}function hn(t){return P(t).buffer}function bi(t){return Do(t)}function vi(t){return Fo(t)}function Ei(t){return Ho(t)}function Ci(t){return zo(t).buffer}function Si(t){return Vo(t)}function gn(t,e){return Wo(Number(t),!e)}const Ii=Vr,Ri=Jr,ki=Qr,Ti=Kr,Ni=Yr,_n=Wr,xi=Gr,pn=Hr,Mi=Zr,Ai=Xr,Oi=eo,Ee=zr;function Ce(t){return to(t)}function Se(){const t=Ce();return t&&t.os?t.os:void 0}function mn(){const t=Se();return t?t.toLowerCase().includes("android"):!1}function wn(){const t=Se();return t?t.toLowerCase().includes("ios")||t.toLowerCase().includes("mac")&&navigator.maxTouchPoints>1:!1}function yn(){return Se()?mn()||wn():!1}function bn(){const t=Ce();return t&&t.name?t.name.toLowerCase()==="node":!1}function vn(){return!bn()&&!!_n()}const En=no,Cn=ro;function ct(t,e){const n=Cn(e),r=Ee();r&&r.setItem(t,n)}function lt(t){let e=null,n=null;const r=Ee();return r&&(n=r.getItem(t)),e=n&&En(n),e}function ut(t){const e=Ee();e&&e.removeItem(t)}function De(){return oo()}function Li(t){return ni(t)}function Bi(t){return ae(t)}function Ui(t){return J(t)}function Pi(t){return ri(ae(t))}const Sn=io;function he(){return((e,n)=>{for(n=e="";e++<36;n+=e*51&52?(e^15?8^Math.random()*(e^20?16:4):4).toString(16):"-");return n})()}function qi(){console.warn("DEPRECATION WARNING: This WalletConnect client library will be deprecated in favor of @walletconnect/client. Please check docs.walletconnect.org to learn more about this migration!")}function In(t,e){let n;const r=ko[t];return r&&(n=`https://${r}.infura.io/v3/${e}`),n}function Rn(t,e){let n;const r=In(t,e.infuraId);return e.custom&&e.custom[t]?n=e.custom[t]:r&&(n=r),n}function Di(t,e){const n=encodeURIComponent(t);return e.universalLink?`${e.universalLink}/wc?uri=${n}`:e.deepLink?`${e.deepLink}${e.deepLink.endsWith(":")?"//":"/"}wc?uri=${n}`:""}function Fi(t){const e=t.href.split("?")[0];ct(qe,Object.assign(Object.assign({},t),{href:e}))}function kn(t,e){return t.filter(n=>n.name.toLowerCase().includes(e.toLowerCase()))[0]}function $i(t,e){let n=t;return e&&(n=e.map(r=>kn(t,r)).filter(Boolean)),n}function ji(t,e){return async(...r)=>new Promise((o,i)=>{const s=(a,c)=>{(a===null||typeof a>"u")&&i(a),o(c)};t.apply(e,[...r,s])})}function Tn(t){const e=t.message||"Failed or Rejected Request";let n=-32e3;if(t&&!t.code)switch(e){case"Parse error":n=-32700;break;case"Invalid request":n=-32600;break;case"Method not found":n=-32601;break;case"Invalid params":n=-32602;break;case"Internal error":n=-32603;break;default:n=-32e3;break}const r={code:n,message:e};return t.data&&(r.data=t.data),r}const Nn="https://registry.walletconnect.com";function Hi(){return Nn+"/api/v2/wallets"}function zi(){return Nn+"/api/v2/dapps"}function xn(t,e="mobile"){var n;return{name:t.name||"",shortName:t.metadata.shortName||"",color:t.metadata.colors.primary||"",logo:(n=t.image_url.sm)!==null&&n!==void 0?n:"",universalLink:t[e].universal||"",deepLink:t[e].native||""}}function Wi(t,e="mobile"){return Object.values(t).filter(n=>!!n[e].universal||!!n[e].native).map(n=>xn(n,e))}var dt={};(function(t){const e=co,n=lo,r=so,o=ao,i=l=>l==null;function s(l){switch(l.arrayFormat){case"index":return d=>(f,u)=>{const g=f.length;return u===void 0||l.skipNull&&u===null||l.skipEmptyString&&u===""?f:u===null?[...f,[h(d,l),"[",g,"]"].join("")]:[...f,[h(d,l),"[",h(g,l),"]=",h(u,l)].join("")]};case"bracket":return d=>(f,u)=>u===void 0||l.skipNull&&u===null||l.skipEmptyString&&u===""?f:u===null?[...f,[h(d,l),"[]"].join("")]:[...f,[h(d,l),"[]=",h(u,l)].join("")];case"comma":case"separator":return d=>(f,u)=>u==null||u.length===0?f:f.length===0?[[h(d,l),"=",h(u,l)].join("")]:[[f,h(u,l)].join(l.arrayFormatSeparator)];default:return d=>(f,u)=>u===void 0||l.skipNull&&u===null||l.skipEmptyString&&u===""?f:u===null?[...f,h(d,l)]:[...f,[h(d,l),"=",h(u,l)].join("")]}}function a(l){let d;switch(l.arrayFormat){case"index":return(f,u,g)=>{if(d=/\[(\d*)\]$/.exec(f),f=f.replace(/\[\d*\]$/,""),!d){g[f]=u;return}g[f]===void 0&&(g[f]={}),g[f][d[1]]=u};case"bracket":return(f,u,g)=>{if(d=/(\[\])$/.exec(f),f=f.replace(/\[\]$/,""),!d){g[f]=u;return}if(g[f]===void 0){g[f]=[u];return}g[f]=[].concat(g[f],u)};case"comma":case"separator":return(f,u,g)=>{const y=typeof u=="string"&&u.includes(l.arrayFormatSeparator),m=typeof u=="string"&&!y&&_(u,l).includes(l.arrayFormatSeparator);u=m?_(u,l):u;const S=y||m?u.split(l.arrayFormatSeparator).map(R=>_(R,l)):u===null?u:_(u,l);g[f]=S};default:return(f,u,g)=>{if(g[f]===void 0){g[f]=u;return}g[f]=[].concat(g[f],u)}}}function c(l){if(typeof l!="string"||l.length!==1)throw new TypeError("arrayFormatSeparator must be single character string")}function h(l,d){return d.encode?d.strict?e(l):encodeURIComponent(l):l}function _(l,d){return d.decode?n(l):l}function v(l){return Array.isArray(l)?l.sort():typeof l=="object"?v(Object.keys(l)).sort((d,f)=>Number(d)-Number(f)).map(d=>l[d]):l}function b(l){const d=l.indexOf("#");return d!==-1&&(l=l.slice(0,d)),l}function w(l){let d="";const f=l.indexOf("#");return f!==-1&&(d=l.slice(f)),d}function E(l){l=b(l);const d=l.indexOf("?");return d===-1?"":l.slice(d+1)}function C(l,d){return d.parseNumbers&&!Number.isNaN(Number(l))&&typeof l=="string"&&l.trim()!==""?l=Number(l):d.parseBooleans&&l!==null&&(l.toLowerCase()==="true"||l.toLowerCase()==="false")&&(l=l.toLowerCase()==="true"),l}function I(l,d){d=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},d),c(d.arrayFormatSeparator);const f=a(d),u=Object.create(null);if(typeof l!="string"||(l=l.trim().replace(/^[?#&]/,""),!l))return u;for(const g of l.split("&")){if(g==="")continue;let[y,m]=r(d.decode?g.replace(/\+/g," "):g,"=");m=m===void 0?null:["comma","separator"].includes(d.arrayFormat)?m:_(m,d),f(_(y,d),m,u)}for(const g of Object.keys(u)){const y=u[g];if(typeof y=="object"&&y!==null)for(const m of Object.keys(y))y[m]=C(y[m],d);else u[g]=C(y,d)}return d.sort===!1?u:(d.sort===!0?Object.keys(u).sort():Object.keys(u).sort(d.sort)).reduce((g,y)=>{const m=u[y];return m&&typeof m=="object"&&!Array.isArray(m)?g[y]=v(m):g[y]=m,g},Object.create(null))}t.extract=E,t.parse=I,t.stringify=(l,d)=>{if(!l)return"";d=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},d),c(d.arrayFormatSeparator);const f=m=>d.skipNull&&i(l[m])||d.skipEmptyString&&l[m]==="",u=s(d),g={};for(const m of Object.keys(l))f(m)||(g[m]=l[m]);const y=Object.keys(g);return d.sort!==!1&&y.sort(d.sort),y.map(m=>{const S=l[m];return S===void 0?"":S===null?h(m,d):Array.isArray(S)?S.reduce(u(m),[]).join("&"):h(m,d)+"="+h(S,d)}).filter(m=>m.length>0).join("&")},t.parseUrl=(l,d)=>{d=Object.assign({decode:!0},d);const[f,u]=r(l,"#");return Object.assign({url:f.split("?")[0]||"",query:I(E(l),d)},d&&d.parseFragmentIdentifier&&u?{fragmentIdentifier:_(u,d)}:{})},t.stringifyUrl=(l,d)=>{d=Object.assign({encode:!0,strict:!0},d);const f=b(l.url).split("?")[0]||"",u=t.extract(l.url),g=t.parse(u,{sort:!1}),y=Object.assign(g,l.query);let m=t.stringify(y,d);m&&(m=`?${m}`);let S=w(l.url);return l.fragmentIdentifier&&(S=`#${h(l.fragmentIdentifier,d)}`),`${f}${m}${S}`},t.pick=(l,d,f)=>{f=Object.assign({parseFragmentIdentifier:!0},f);const{url:u,query:g,fragmentIdentifier:y}=t.parseUrl(l,f);return t.stringifyUrl({url:u,query:o(g,d),fragmentIdentifier:y},f)},t.exclude=(l,d,f)=>{const u=Array.isArray(d)?g=>!d.includes(g):(g,y)=>!d(g,y);return t.pick(l,u,f)}})(dt);function Mn(t){const e=t.indexOf("?")!==-1?t.indexOf("?"):void 0;return typeof e<"u"?t.substr(e):""}function An(t,e){let n=ft(t);return n=Object.assign(Object.assign({},n),e),t=On(n),t}function ft(t){return dt.parse(t)}function On(t){return dt.stringify(t)}function Ln(t){return typeof t.bridge<"u"}function Bn(t){const e=t.indexOf(":"),n=t.indexOf("?")!==-1?t.indexOf("?"):void 0,r=t.substring(0,e),o=t.substring(e+1,n);function i(v){const b="@",w=v.split(b);return{handshakeTopic:w[0],version:parseInt(w[1],10)}}const s=i(o),a=typeof n<"u"?t.substr(n):"";function c(v){const b=ft(v);return{key:b.key||"",bridge:b.bridge||""}}const h=c(a);return Object.assign(Object.assign({protocol:r},s),h)}function Vi(t){return t===""||typeof t=="string"&&t.trim()===""}function Ji(t){return!(t&&t.length)}function Qi(t){return ve(t)}function Ki(t){return st(t)}function Yi(t){return ln(t)}function Gi(t){return Yo(t)}function Zi(t){return Go(t)}function Xi(t,e){return cn(t,e)}function es(t){return typeof t.params=="object"}function Un(t){return typeof t.method<"u"}function H(t){return typeof t.result<"u"}function oe(t){return typeof t.error<"u"}function Fe(t){return typeof t.event<"u"}function Pn(t){return Io.includes(t)||t.startsWith("wc_")}function qn(t){return t.method.startsWith("wc_")?!0:!Ye.includes(t.method)}const ts=Object.freeze(Object.defineProperty({__proto__:null,addHexPrefix:Bi,appendToQueryString:An,concatArrayBuffers:ui,concatBuffers:gi,convertArrayBufferToBuffer:_e,convertArrayBufferToHex:dn,convertArrayBufferToNumber:li,convertArrayBufferToUtf8:ci,convertBufferToArrayBuffer:fn,convertBufferToHex:fi,convertBufferToNumber:hi,convertBufferToUtf8:di,convertHexToArrayBuffer:hn,convertHexToBuffer:yi,convertHexToNumber:vi,convertHexToUtf8:bi,convertNumberToArrayBuffer:Ci,convertNumberToBuffer:Ei,convertNumberToHex:gn,convertNumberToUtf8:Si,convertUtf8ToArrayBuffer:_i,convertUtf8ToBuffer:pi,convertUtf8ToHex:mi,convertUtf8ToNumber:wi,detectEnv:Ce,detectOS:Se,formatIOSMobile:Di,formatMobileRegistry:Wi,formatMobileRegistryEntry:xn,formatQueryString:On,formatRpcError:Tn,getClientMeta:De,getCrypto:Ai,getCryptoOrThrow:Mi,getDappRegistryUrl:zi,getDocument:Ti,getDocumentOrThrow:ki,getEncoding:Zi,getFromWindow:Ii,getFromWindowOrThrow:Ri,getInfuraRpcUrl:In,getLocal:lt,getLocalStorage:Ee,getLocalStorageOrThrow:Oi,getLocation:pn,getLocationOrThrow:xi,getMobileLinkRegistry:$i,getMobileRegistryEntry:kn,getNavigator:_n,getNavigatorOrThrow:Ni,getQueryString:Mn,getRpcUrl:Rn,getType:Gi,getWalletRegistryUrl:Hi,isAndroid:mn,isArrayBuffer:Yi,isBrowser:vn,isBuffer:Qi,isEmptyArray:Ji,isEmptyString:Vi,isHexString:Xi,isIOS:wn,isInternalEvent:Fe,isJsonRpcRequest:Un,isJsonRpcResponseError:oe,isJsonRpcResponseSuccess:H,isJsonRpcSubscription:es,isMobile:yn,isNode:bn,isReservedEvent:Pn,isSilentPayload:qn,isTypedArray:Ki,isWalletConnectSession:Ln,logDeprecationWarning:qi,parseQueryString:ft,parseWalletConnectUri:Bn,payloadId:Sn,promisify:ji,removeHexLeadingZeros:Pi,removeHexPrefix:Ui,removeLocal:ut,safeJsonParse:En,safeJsonStringify:Cn,sanitizeHex:Li,saveMobileLinkInfo:Fi,setLocal:ct,uuid:he},Symbol.toStringTag,{value:"Module"}));class ns{constructor(){this._eventEmitters=[],typeof window<"u"&&typeof window.addEventListener<"u"&&(window.addEventListener("online",()=>this.trigger("online")),window.addEventListener("offline",()=>this.trigger("offline")))}on(e,n){this._eventEmitters.push({event:e,callback:n})}trigger(e){let n=[];e&&(n=this._eventEmitters.filter(r=>r.event===e)),n.forEach(r=>{r.callback()})}}const rs=typeof Ct.WebSocket<"u"?Ct.WebSocket:require("ws");class os{constructor(e){if(this.opts=e,this._queue=[],this._events=[],this._subscriptions=[],this._protocol=e.protocol,this._version=e.version,this._url="",this._netMonitor=null,this._socket=null,this._nextSocket=null,this._subscriptions=e.subscriptions||[],this._netMonitor=e.netMonitor||new ns,!e.url||typeof e.url!="string")throw new Error("Missing or invalid WebSocket url");this._url=e.url,this._netMonitor.on("online",()=>this._socketCreate())}set readyState(e){}get readyState(){return this._socket?this._socket.readyState:-1}set connecting(e){}get connecting(){return this.readyState===0}set connected(e){}get connected(){return this.readyState===1}set closing(e){}get closing(){return this.readyState===2}set closed(e){}get closed(){return this.readyState===3}open(){this._socketCreate()}close(){this._socketClose()}send(e,n,r){if(!n||typeof n!="string")throw new Error("Missing or invalid topic field");this._socketSend({topic:n,type:"pub",payload:e,silent:!!r})}subscribe(e){this._socketSend({topic:e,type:"sub",payload:"",silent:!0})}on(e,n){this._events.push({event:e,callback:n})}_socketCreate(){if(this._nextSocket)return;const e=is(this._url,this._protocol,this._version);if(this._nextSocket=new rs(e),!this._nextSocket)throw new Error("Failed to create socket");this._nextSocket.onmessage=n=>this._socketReceive(n),this._nextSocket.onopen=()=>this._socketOpen(),this._nextSocket.onerror=n=>this._socketError(n),this._nextSocket.onclose=()=>{setTimeout(()=>{this._nextSocket=null,this._socketCreate()},1e3)}}_socketOpen(){this._socketClose(),this._socket=this._nextSocket,this._nextSocket=null,this._queueSubscriptions(),this._pushQueue()}_socketClose(){this._socket&&(this._socket.onclose=()=>{},this._socket.close())}_socketSend(e){const n=JSON.stringify(e);this._socket&&this._socket.readyState===1?this._socket.send(n):(this._setToQueue(e),this._socketCreate())}async _socketReceive(e){let n;try{n=JSON.parse(e.data)}catch{return}if(this._socketSend({topic:n.topic,type:"ack",payload:"",silent:!0}),this._socket&&this._socket.readyState===1){const r=this._events.filter(o=>o.event==="message");r&&r.length&&r.forEach(o=>o.callback(n))}}_socketError(e){const n=this._events.filter(r=>r.event==="error");n&&n.length&&n.forEach(r=>r.callback(e))}_queueSubscriptions(){this._subscriptions.forEach(n=>this._queue.push({topic:n,type:"sub",payload:"",silent:!0})),this._subscriptions=this.opts.subscriptions||[]}_setToQueue(e){this._queue.push(e)}_pushQueue(){this._queue.forEach(n=>this._socketSend(n)),this._queue=[]}}function is(t,e,n){var r,o;const s=(t.startsWith("https")?t.replace("https","wss"):t.startsWith("http")?t.replace("http","ws"):t).split("?"),a=vn()?{protocol:e,version:n,env:"browser",host:((r=pn())===null||r===void 0?void 0:r.host)||""}:{protocol:e,version:n,env:((o=Ce())===null||o===void 0?void 0:o.name)||""},c=An(Mn(s[1]||""),a);return s[0]+"?"+c}class ss{constructor(){this._eventEmitters=[]}subscribe(e){this._eventEmitters.push(e)}unsubscribe(e){this._eventEmitters=this._eventEmitters.filter(n=>n.event!==e)}trigger(e){let n=[],r;Un(e)?r=e.method:H(e)||oe(e)?r=`response:${e.id}`:Fe(e)?r=e.event:r="",r&&(n=this._eventEmitters.filter(o=>o.event===r)),(!n||!n.length)&&!Pn(r)&&!Fe(r)&&(n=this._eventEmitters.filter(o=>o.event==="call_request")),n.forEach(o=>{if(oe(e)){const i=new Error(e.error.message);o.callback(i,null)}else o.callback(null,e)})}}class as{constructor(e="walletconnect"){this.storageId=e}getSession(){let e=null;const n=lt(this.storageId);return n&&Ln(n)&&(e=n),e}setSession(e){return ct(this.storageId,e),e}removeSession(){ut(this.storageId)}}const cs="walletconnect.org",ls="abcdefghijklmnopqrstuvwxyz0123456789",Dn=ls.split("").map(t=>`https://${t}.bridge.walletconnect.org`);function us(t){let e=t.indexOf("//")>-1?t.split("/")[2]:t.split("/")[0];return e=e.split(":")[0],e=e.split("?")[0],e}function ds(t){return us(t).split(".").slice(-2).join(".")}function fs(){return Math.floor(Math.random()*Dn.length)}function hs(){return Dn[fs()]}function gs(t){return ds(t)===cs}function _s(t){return gs(t)?hs():t}class ps{constructor(e){if(this.protocol="wc",this.version=1,this._bridge="",this._key=null,this._clientId="",this._clientMeta=null,this._peerId="",this._peerMeta=null,this._handshakeId=0,this._handshakeTopic="",this._connected=!1,this._accounts=[],this._chainId=0,this._networkId=0,this._rpcUrl="",this._eventManager=new ss,this._clientMeta=De()||e.connectorOpts.clientMeta||null,this._cryptoLib=e.cryptoLib,this._sessionStorage=e.sessionStorage||new as(e.connectorOpts.storageId),this._qrcodeModal=e.connectorOpts.qrcodeModal,this._qrcodeModalOptions=e.connectorOpts.qrcodeModalOptions,this._signingMethods=[...Ye,...e.connectorOpts.signingMethods||[]],!e.connectorOpts.bridge&&!e.connectorOpts.uri&&!e.connectorOpts.session)throw new Error(Eo);e.connectorOpts.bridge&&(this.bridge=_s(e.connectorOpts.bridge)),e.connectorOpts.uri&&(this.uri=e.connectorOpts.uri);const n=e.connectorOpts.session||this._getStorageSession();n&&(this.session=n),this.handshakeId&&this._subscribeToSessionResponse(this.handshakeId,"Session request rejected"),this._transport=e.transport||new os({protocol:this.protocol,version:this.version,url:this.bridge,subscriptions:[this.clientId]}),this._subscribeToInternalEvents(),this._initTransport(),e.connectorOpts.uri&&this._subscribeToSessionRequest(),e.pushServerOpts&&this._registerPushServer(e.pushServerOpts)}set bridge(e){e&&(this._bridge=e)}get bridge(){return this._bridge}set key(e){if(!e)return;const n=hn(e);this._key=n}get key(){return this._key?dn(this._key,!0):""}set clientId(e){e&&(this._clientId=e)}get clientId(){let e=this._clientId;return e||(e=this._clientId=he()),this._clientId}set peerId(e){e&&(this._peerId=e)}get peerId(){return this._peerId}set clientMeta(e){}get clientMeta(){let e=this._clientMeta;return e||(e=this._clientMeta=De()),e}set peerMeta(e){this._peerMeta=e}get peerMeta(){return this._peerMeta}set handshakeTopic(e){e&&(this._handshakeTopic=e)}get handshakeTopic(){return this._handshakeTopic}set handshakeId(e){e&&(this._handshakeId=e)}get handshakeId(){return this._handshakeId}get uri(){return this._formatUri()}set uri(e){if(!e)return;const{handshakeTopic:n,bridge:r,key:o}=this._parseUri(e);this.handshakeTopic=n,this.bridge=r,this.key=o}set chainId(e){this._chainId=e}get chainId(){return this._chainId}set networkId(e){this._networkId=e}get networkId(){return this._networkId}set accounts(e){this._accounts=e}get accounts(){return this._accounts}set rpcUrl(e){this._rpcUrl=e}get rpcUrl(){return this._rpcUrl}set connected(e){}get connected(){return this._connected}set pending(e){}get pending(){return!!this._handshakeTopic}get session(){return{connected:this.connected,accounts:this.accounts,chainId:this.chainId,bridge:this.bridge,key:this.key,clientId:this.clientId,clientMeta:this.clientMeta,peerId:this.peerId,peerMeta:this.peerMeta,handshakeId:this.handshakeId,handshakeTopic:this.handshakeTopic}}set session(e){e&&(this._connected=e.connected,this.accounts=e.accounts,this.chainId=e.chainId,this.bridge=e.bridge,this.key=e.key,this.clientId=e.clientId,this.clientMeta=e.clientMeta,this.peerId=e.peerId,this.peerMeta=e.peerMeta,this.handshakeId=e.handshakeId,this.handshakeTopic=e.handshakeTopic)}on(e,n){const r={event:e,callback:n};this._eventManager.subscribe(r)}off(e){this._eventManager.unsubscribe(e)}async createInstantRequest(e){this._key=await this._generateKey();const n=this._formatRequest({method:"wc_instantRequest",params:[{peerId:this.clientId,peerMeta:this.clientMeta,request:this._formatRequest(e)}]});this.handshakeId=n.id,this.handshakeTopic=he(),this._eventManager.trigger({event:"display_uri",params:[this.uri]}),this.on("modal_closed",()=>{throw new Error(kt)});const r=()=>{this.killSession()};try{const o=await this._sendCallRequest(n);return o&&r(),o}catch(o){throw r(),o}}async connect(e){if(!this._qrcodeModal)throw new Error(So);return this.connected?{chainId:this.chainId,accounts:this.accounts}:(await this.createSession(e),new Promise(async(n,r)=>{this.on("modal_closed",()=>r(new Error(kt))),this.on("connect",(o,i)=>{if(o)return r(o);n(i.params[0])})}))}async createSession(e){if(this._connected)throw new Error(xe);if(this.pending)return;this._key=await this._generateKey();const n=this._formatRequest({method:"wc_sessionRequest",params:[{peerId:this.clientId,peerMeta:this.clientMeta,chainId:e&&e.chainId?e.chainId:null}]});this.handshakeId=n.id,this.handshakeTopic=he(),this._sendSessionRequest(n,"Session update rejected",{topic:this.handshakeTopic}),this._eventManager.trigger({event:"display_uri",params:[this.uri]})}approveSession(e){if(this._connected)throw new Error(xe);this.chainId=e.chainId,this.accounts=e.accounts,this.networkId=e.networkId||0,this.rpcUrl=e.rpcUrl||"";const n={approved:!0,chainId:this.chainId,networkId:this.networkId,accounts:this.accounts,rpcUrl:this.rpcUrl,peerId:this.clientId,peerMeta:this.clientMeta},r={id:this.handshakeId,jsonrpc:"2.0",result:n};this._sendResponse(r),this._connected=!0,this._setStorageSession(),this._eventManager.trigger({event:"connect",params:[{peerId:this.peerId,peerMeta:this.peerMeta,chainId:this.chainId,accounts:this.accounts}]})}rejectSession(e){if(this._connected)throw new Error(xe);const n=e&&e.message?e.message:po,r=this._formatResponse({id:this.handshakeId,error:{message:n}});this._sendResponse(r),this._connected=!1,this._eventManager.trigger({event:"disconnect",params:[{message:n}]}),this._removeStorageSession()}updateSession(e){if(!this._connected)throw new Error($);this.chainId=e.chainId,this.accounts=e.accounts,this.networkId=e.networkId||0,this.rpcUrl=e.rpcUrl||"";const n={approved:!0,chainId:this.chainId,networkId:this.networkId,accounts:this.accounts,rpcUrl:this.rpcUrl},r=this._formatRequest({method:"wc_sessionUpdate",params:[n]});this._sendSessionRequest(r,"Session update rejected"),this._eventManager.trigger({event:"session_update",params:[{chainId:this.chainId,accounts:this.accounts}]}),this._manageStorageSession()}async killSession(e){const n=e?e.message:"Session Disconnected",r={approved:!1,chainId:null,networkId:null,accounts:null},o=this._formatRequest({method:"wc_sessionUpdate",params:[r]});await this._sendRequest(o),this._handleSessionDisconnect(n)}async sendTransaction(e){if(!this._connected)throw new Error($);const n=e,r=this._formatRequest({method:"eth_sendTransaction",params:[n]});return await this._sendCallRequest(r)}async signTransaction(e){if(!this._connected)throw new Error($);const n=e,r=this._formatRequest({method:"eth_signTransaction",params:[n]});return await this._sendCallRequest(r)}async signMessage(e){if(!this._connected)throw new Error($);const n=this._formatRequest({method:"eth_sign",params:e});return await this._sendCallRequest(n)}async signPersonalMessage(e){if(!this._connected)throw new Error($);const n=this._formatRequest({method:"personal_sign",params:e});return await this._sendCallRequest(n)}async signTypedData(e){if(!this._connected)throw new Error($);const n=this._formatRequest({method:"eth_signTypedData",params:e});return await this._sendCallRequest(n)}async updateChain(e){if(!this._connected)throw new Error("Session currently disconnected");const n=this._formatRequest({method:"wallet_updateChain",params:[e]});return await this._sendCallRequest(n)}unsafeSend(e,n){return this._sendRequest(e,n),this._eventManager.trigger({event:"call_request_sent",params:[{request:e,options:n}]}),new Promise((r,o)=>{this._subscribeToResponse(e.id,(i,s)=>{if(i){o(i);return}if(!s)throw new Error(mo);r(s)})})}async sendCustomRequest(e,n){if(!this._connected)throw new Error($);switch(e.method){case"eth_accounts":return this.accounts;case"eth_chainId":return gn(this.chainId);case"eth_sendTransaction":case"eth_signTransaction":e.params;break;case"personal_sign":e.params;break}const r=this._formatRequest(e);return await this._sendCallRequest(r,n)}approveRequest(e){if(H(e)){const n=this._formatResponse(e);this._sendResponse(n)}else throw new Error(wo)}rejectRequest(e){if(oe(e)){const n=this._formatResponse(e);this._sendResponse(n)}else throw new Error(yo)}transportClose(){this._transport.close()}async _sendRequest(e,n){const r=this._formatRequest(e),o=await this._encrypt(r),i=typeof(n==null?void 0:n.topic)<"u"?n.topic:this.peerId,s=JSON.stringify(o),a=typeof(n==null?void 0:n.forcePushNotification)<"u"?!n.forcePushNotification:qn(r);this._transport.send(s,i,a)}async _sendResponse(e){const n=await this._encrypt(e),r=this.peerId,o=JSON.stringify(n),i=!0;this._transport.send(o,r,i)}async _sendSessionRequest(e,n,r){this._sendRequest(e,r),this._subscribeToSessionResponse(e.id,n)}_sendCallRequest(e,n){return this._sendRequest(e,n),this._eventManager.trigger({event:"call_request_sent",params:[{request:e,options:n}]}),this._subscribeToCallResponse(e.id)}_formatRequest(e){if(typeof e.method>"u")throw new Error(bo);return{id:typeof e.id>"u"?Sn():e.id,jsonrpc:"2.0",method:e.method,params:typeof e.params>"u"?[]:e.params}}_formatResponse(e){if(typeof e.id>"u")throw new Error(vo);const n={id:e.id,jsonrpc:"2.0"};if(oe(e)){const r=Tn(e.error);return Object.assign(Object.assign(Object.assign({},n),e),{error:r})}else if(H(e))return Object.assign(Object.assign({},n),e);throw new Error(Rt)}_handleSessionDisconnect(e){const n=e||"Session Disconnected";this._connected||(this._qrcodeModal&&this._qrcodeModal.close(),ut(qe)),this._connected&&(this._connected=!1),this._handshakeId&&(this._handshakeId=0),this._handshakeTopic&&(this._handshakeTopic=""),this._peerId&&(this._peerId=""),this._eventManager.trigger({event:"disconnect",params:[{message:n}]}),this._removeStorageSession(),this.transportClose()}_handleSessionResponse(e,n){n?n.approved?(this._connected?(n.chainId&&(this.chainId=n.chainId),n.accounts&&(this.accounts=n.accounts),this._eventManager.trigger({event:"session_update",params:[{chainId:this.chainId,accounts:this.accounts}]})):(this._connected=!0,n.chainId&&(this.chainId=n.chainId),n.accounts&&(this.accounts=n.accounts),n.peerId&&!this.peerId&&(this.peerId=n.peerId),n.peerMeta&&!this.peerMeta&&(this.peerMeta=n.peerMeta),this._eventManager.trigger({event:"connect",params:[{peerId:this.peerId,peerMeta:this.peerMeta,chainId:this.chainId,accounts:this.accounts}]})),this._manageStorageSession()):this._handleSessionDisconnect(e):this._handleSessionDisconnect(e)}async _handleIncomingMessages(e){if(![this.clientId,this.handshakeTopic].includes(e.topic))return;let r;try{r=JSON.parse(e.payload)}catch{return}const o=await this._decrypt(r);o&&this._eventManager.trigger(o)}_subscribeToSessionRequest(){this._transport.subscribe(this.handshakeTopic)}_subscribeToResponse(e,n){this.on(`response:${e}`,n)}_subscribeToSessionResponse(e,n){this._subscribeToResponse(e,(r,o)=>{if(r){this._handleSessionResponse(r.message);return}H(o)?this._handleSessionResponse(n,o.result):o.error&&o.error.message?this._handleSessionResponse(o.error.message):this._handleSessionResponse(n)})}_subscribeToCallResponse(e){return new Promise((n,r)=>{this._subscribeToResponse(e,(o,i)=>{if(o){r(o);return}H(i)?n(i.result):i.error&&i.error.message?r(i.error):r(new Error(Rt))})})}_subscribeToInternalEvents(){this.on("display_uri",()=>{this._qrcodeModal&&this._qrcodeModal.open(this.uri,()=>{this._eventManager.trigger({event:"modal_closed",params:[]})},this._qrcodeModalOptions)}),this.on("connect",()=>{this._qrcodeModal&&this._qrcodeModal.close()}),this.on("call_request_sent",(e,n)=>{const{request:r}=n.params[0];if(yn()&&this._signingMethods.includes(r.method)){const o=lt(qe);o&&(window.location.href=o.href)}}),this.on("wc_sessionRequest",(e,n)=>{e&&this._eventManager.trigger({event:"error",params:[{code:"SESSION_REQUEST_ERROR",message:e.toString()}]}),this.handshakeId=n.id,this.peerId=n.params[0].peerId,this.peerMeta=n.params[0].peerMeta;const r=Object.assign(Object.assign({},n),{method:"session_request"});this._eventManager.trigger(r)}),this.on("wc_sessionUpdate",(e,n)=>{e&&this._handleSessionResponse(e.message),this._handleSessionResponse("Session disconnected",n.params[0])})}_initTransport(){this._transport.on("message",e=>this._handleIncomingMessages(e)),this._transport.on("open",()=>this._eventManager.trigger({event:"transport_open",params:[]})),this._transport.on("close",()=>this._eventManager.trigger({event:"transport_close",params:[]})),this._transport.on("error",()=>this._eventManager.trigger({event:"transport_error",params:["Websocket connection failed"]})),this._transport.open()}_formatUri(){const e=this.protocol,n=this.handshakeTopic,r=this.version,o=encodeURIComponent(this.bridge),i=this.key;return`${e}:${n}@${r}?bridge=${o}&key=${i}`}_parseUri(e){const n=Bn(e);if(n.protocol===this.protocol){if(!n.handshakeTopic)throw Error("Invalid or missing handshakeTopic parameter value");const r=n.handshakeTopic;if(!n.bridge)throw Error("Invalid or missing bridge url parameter value");const o=decodeURIComponent(n.bridge);if(!n.key)throw Error("Invalid or missing key parameter value");const i=n.key;return{handshakeTopic:r,bridge:o,key:i}}else throw new Error(Co)}async _generateKey(){return this._cryptoLib?await this._cryptoLib.generateKey():null}async _encrypt(e){const n=this._key;return this._cryptoLib&&n?await this._cryptoLib.encrypt(e,n):null}async _decrypt(e){const n=this._key;return this._cryptoLib&&n?await this._cryptoLib.decrypt(e,n):null}_getStorageSession(){let e=null;return this._sessionStorage&&(e=this._sessionStorage.getSession()),e}_setStorageSession(){this._sessionStorage&&this._sessionStorage.setSession(this.session)}_removeStorageSession(){this._sessionStorage&&this._sessionStorage.removeSession()}_manageStorageSession(){this._connected?this._setStorageSession():this._removeStorageSession()}_registerPushServer(e){if(!e.url||typeof e.url!="string")throw Error("Invalid or missing pushServerOpts.url parameter value");if(!e.type||typeof e.type!="string")throw Error("Invalid or missing pushServerOpts.type parameter value");if(!e.token||typeof e.token!="string")throw Error("Invalid or missing pushServerOpts.token parameter value");const n={bridge:this.bridge,topic:this.clientId,type:e.type,token:e.token,peerName:"",language:e.language||""};this.on("connect",async(r,o)=>{if(r)throw r;if(e.peerMeta){const i=o.params[0].peerMeta.name;n.peerName=i}try{if(!(await(await fetch(`${e.url}/new`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(n)})).json()).success)throw Error("Failed to register in Push Server")}catch{throw Error("Failed to register in Push Server")}})}}function ms(t){return se.getBrowerCrypto().getRandomValues(new Uint8Array(t))}const Fn=256,$n=Fn,ws=Fn,q="AES-CBC",ys=`SHA-${$n}`,$e="HMAC",bs="encrypt",vs="decrypt",Es="sign",Cs="verify";function Ss(t){return t===q?{length:$n,name:q}:{hash:{name:ys},name:$e}}function Is(t){return t===q?[bs,vs]:[Es,Cs]}async function ht(t,e=q){return se.getSubtleCrypto().importKey("raw",t,Ss(e),!0,Is(e))}async function Rs(t,e,n){const r=se.getSubtleCrypto(),o=await ht(e,q),i=await r.encrypt({iv:t,name:q},o,n);return new Uint8Array(i)}async function ks(t,e,n){const r=se.getSubtleCrypto(),o=await ht(e,q),i=await r.decrypt({iv:t,name:q},o,n);return new Uint8Array(i)}async function Ts(t,e){const n=se.getSubtleCrypto(),r=await ht(t,$e),o=await n.sign({length:ws,name:$e},r,e);return new Uint8Array(o)}function Ns(t,e,n){return Rs(t,e,n)}function xs(t,e,n){return ks(t,e,n)}async function jn(t,e){return await Ts(t,e)}async function Hn(t){const e=(t||256)/8,n=ms(e);return fn(Z(n))}async function zn(t,e){const n=P(t.data),r=P(t.iv),o=P(t.hmac),i=U(o,!1),s=un(n,r),a=await jn(e,s),c=U(a,!1);return J(i)===J(c)}async function Ms(t,e,n){const r=V(_e(e)),o=n||await Hn(128),i=V(_e(o)),s=U(i,!1),a=JSON.stringify(t),c=an(a),h=await Ns(i,r,c),_=U(h,!1),v=un(h,i),b=await jn(r,v),w=U(b,!1);return{data:_,hmac:w,iv:s}}async function As(t,e){const n=V(_e(e));if(!n)throw new Error("Missing key: required for decryption");if(!await zn(t,n))return null;const o=P(t.data),i=P(t.iv),s=await xs(i,n,o),a=on(s);let c;try{c=JSON.parse(a)}catch{return null}return c}const Os=Object.freeze(Object.defineProperty({__proto__:null,decrypt:As,encrypt:Ms,generateKey:Hn,verifyHmac:zn},Symbol.toStringTag,{value:"Module"}));class Ls extends ps{constructor(e,n){super({cryptoLib:Os,connectorOpts:e,pushServerOpts:n})}}const Bs=jt(ts);var ce={},Us=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},Wn={},M={};let gt;const Ps=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];M.getSymbolSize=function(e){if(!e)throw new Error('"version" cannot be null or undefined');if(e<1||e>40)throw new Error('"version" should be in range from 1 to 40');return e*4+17};M.getSymbolTotalCodewords=function(e){return Ps[e]};M.getBCHDigit=function(t){let e=0;for(;t!==0;)e++,t>>>=1;return e};M.setToSJISFunction=function(e){if(typeof e!="function")throw new Error('"toSJISFunc" is not a valid function.');gt=e};M.isKanjiModeEnabled=function(){return typeof gt<"u"};M.toSJIS=function(e){return gt(e)};var Ie={};(function(t){t.L={bit:1},t.M={bit:0},t.Q={bit:3},t.H={bit:2};function e(n){if(typeof n!="string")throw new Error("Param is not a string");switch(n.toLowerCase()){case"l":case"low":return t.L;case"m":case"medium":return t.M;case"q":case"quartile":return t.Q;case"h":case"high":return t.H;default:throw new Error("Unknown EC Level: "+n)}}t.isValid=function(r){return r&&typeof r.bit<"u"&&r.bit>=0&&r.bit<4},t.from=function(r,o){if(t.isValid(r))return r;try{return e(r)}catch{return o}}})(Ie);function Vn(){this.buffer=[],this.length=0}Vn.prototype={get:function(t){const e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)===1},put:function(t,e){for(let n=0;n<e;n++)this.putBit((t>>>e-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var qs=Vn;function le(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}le.prototype.set=function(t,e,n,r){const o=t*this.size+e;this.data[o]=n,r&&(this.reservedBit[o]=!0)};le.prototype.get=function(t,e){return this.data[t*this.size+e]};le.prototype.xor=function(t,e,n){this.data[t*this.size+e]^=n};le.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]};var Ds=le,Jn={};(function(t){const e=M.getSymbolSize;t.getRowColCoords=function(r){if(r===1)return[];const o=Math.floor(r/7)+2,i=e(r),s=i===145?26:Math.ceil((i-13)/(2*o-2))*2,a=[i-7];for(let c=1;c<o-1;c++)a[c]=a[c-1]-s;return a.push(6),a.reverse()},t.getPositions=function(r){const o=[],i=t.getRowColCoords(r),s=i.length;for(let a=0;a<s;a++)for(let c=0;c<s;c++)a===0&&c===0||a===0&&c===s-1||a===s-1&&c===0||o.push([i[a],i[c]]);return o}})(Jn);var Qn={};const Fs=M.getSymbolSize,Tt=7;Qn.getPositions=function(e){const n=Fs(e);return[[0,0],[n-Tt,0],[0,n-Tt]]};var Kn={};(function(t){t.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};t.isValid=function(o){return o!=null&&o!==""&&!isNaN(o)&&o>=0&&o<=7},t.from=function(o){return t.isValid(o)?parseInt(o,10):void 0},t.getPenaltyN1=function(o){const i=o.size;let s=0,a=0,c=0,h=null,_=null;for(let v=0;v<i;v++){a=c=0,h=_=null;for(let b=0;b<i;b++){let w=o.get(v,b);w===h?a++:(a>=5&&(s+=e.N1+(a-5)),h=w,a=1),w=o.get(b,v),w===_?c++:(c>=5&&(s+=e.N1+(c-5)),_=w,c=1)}a>=5&&(s+=e.N1+(a-5)),c>=5&&(s+=e.N1+(c-5))}return s},t.getPenaltyN2=function(o){const i=o.size;let s=0;for(let a=0;a<i-1;a++)for(let c=0;c<i-1;c++){const h=o.get(a,c)+o.get(a,c+1)+o.get(a+1,c)+o.get(a+1,c+1);(h===4||h===0)&&s++}return s*e.N2},t.getPenaltyN3=function(o){const i=o.size;let s=0,a=0,c=0;for(let h=0;h<i;h++){a=c=0;for(let _=0;_<i;_++)a=a<<1&2047|o.get(h,_),_>=10&&(a===1488||a===93)&&s++,c=c<<1&2047|o.get(_,h),_>=10&&(c===1488||c===93)&&s++}return s*e.N3},t.getPenaltyN4=function(o){let i=0;const s=o.data.length;for(let c=0;c<s;c++)i+=o.data[c];return Math.abs(Math.ceil(i*100/s/5)-10)*e.N4};function n(r,o,i){switch(r){case t.Patterns.PATTERN000:return(o+i)%2===0;case t.Patterns.PATTERN001:return o%2===0;case t.Patterns.PATTERN010:return i%3===0;case t.Patterns.PATTERN011:return(o+i)%3===0;case t.Patterns.PATTERN100:return(Math.floor(o/2)+Math.floor(i/3))%2===0;case t.Patterns.PATTERN101:return o*i%2+o*i%3===0;case t.Patterns.PATTERN110:return(o*i%2+o*i%3)%2===0;case t.Patterns.PATTERN111:return(o*i%3+(o+i)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}t.applyMask=function(o,i){const s=i.size;for(let a=0;a<s;a++)for(let c=0;c<s;c++)i.isReserved(c,a)||i.xor(c,a,n(o,c,a))},t.getBestMask=function(o,i){const s=Object.keys(t.Patterns).length;let a=0,c=1/0;for(let h=0;h<s;h++){i(h),t.applyMask(h,o);const _=t.getPenaltyN1(o)+t.getPenaltyN2(o)+t.getPenaltyN3(o)+t.getPenaltyN4(o);t.applyMask(h,o),_<c&&(c=_,a=h)}return a}})(Kn);var Re={};const L=Ie,de=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],fe=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];Re.getBlocksCount=function(e,n){switch(n){case L.L:return de[(e-1)*4+0];case L.M:return de[(e-1)*4+1];case L.Q:return de[(e-1)*4+2];case L.H:return de[(e-1)*4+3];default:return}};Re.getTotalCodewordsCount=function(e,n){switch(n){case L.L:return fe[(e-1)*4+0];case L.M:return fe[(e-1)*4+1];case L.Q:return fe[(e-1)*4+2];case L.H:return fe[(e-1)*4+3];default:return}};var Yn={},ke={};const te=new Uint8Array(512),pe=new Uint8Array(256);(function(){let e=1;for(let n=0;n<255;n++)te[n]=e,pe[e]=n,e<<=1,e&256&&(e^=285);for(let n=255;n<512;n++)te[n]=te[n-255]})();ke.log=function(e){if(e<1)throw new Error("log("+e+")");return pe[e]};ke.exp=function(e){return te[e]};ke.mul=function(e,n){return e===0||n===0?0:te[pe[e]+pe[n]]};(function(t){const e=ke;t.mul=function(r,o){const i=new Uint8Array(r.length+o.length-1);for(let s=0;s<r.length;s++)for(let a=0;a<o.length;a++)i[s+a]^=e.mul(r[s],o[a]);return i},t.mod=function(r,o){let i=new Uint8Array(r);for(;i.length-o.length>=0;){const s=i[0];for(let c=0;c<o.length;c++)i[c]^=e.mul(o[c],s);let a=0;for(;a<i.length&&i[a]===0;)a++;i=i.slice(a)}return i},t.generateECPolynomial=function(r){let o=new Uint8Array([1]);for(let i=0;i<r;i++)o=t.mul(o,new Uint8Array([1,e.exp(i)]));return o}})(Yn);const Gn=Yn;function _t(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}_t.prototype.initialize=function(e){this.degree=e,this.genPoly=Gn.generateECPolynomial(this.degree)};_t.prototype.encode=function(e){if(!this.genPoly)throw new Error("Encoder not initialized");const n=new Uint8Array(e.length+this.degree);n.set(e);const r=Gn.mod(n,this.genPoly),o=this.degree-r.length;if(o>0){const i=new Uint8Array(this.degree);return i.set(r,o),i}return r};var $s=_t,Zn={},D={},pt={};pt.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40};var A={};const Xn="[0-9]+",js="[A-Z $%*+\\-./:]+";let ie="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";ie=ie.replace(/u/g,"\\u");const Hs="(?:(?![A-Z0-9 $%*+\\-./:]|"+ie+`)(?:.|[\r
]))+`;A.KANJI=new RegExp(ie,"g");A.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");A.BYTE=new RegExp(Hs,"g");A.NUMERIC=new RegExp(Xn,"g");A.ALPHANUMERIC=new RegExp(js,"g");const zs=new RegExp("^"+ie+"$"),Ws=new RegExp("^"+Xn+"$"),Vs=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");A.testKanji=function(e){return zs.test(e)};A.testNumeric=function(e){return Ws.test(e)};A.testAlphanumeric=function(e){return Vs.test(e)};(function(t){const e=pt,n=A;t.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},t.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},t.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},t.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},t.MIXED={bit:-1},t.getCharCountIndicator=function(i,s){if(!i.ccBits)throw new Error("Invalid mode: "+i);if(!e.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?i.ccBits[0]:s<27?i.ccBits[1]:i.ccBits[2]},t.getBestModeForData=function(i){return n.testNumeric(i)?t.NUMERIC:n.testAlphanumeric(i)?t.ALPHANUMERIC:n.testKanji(i)?t.KANJI:t.BYTE},t.toString=function(i){if(i&&i.id)return i.id;throw new Error("Invalid mode")},t.isValid=function(i){return i&&i.bit&&i.ccBits};function r(o){if(typeof o!="string")throw new Error("Param is not a string");switch(o.toLowerCase()){case"numeric":return t.NUMERIC;case"alphanumeric":return t.ALPHANUMERIC;case"kanji":return t.KANJI;case"byte":return t.BYTE;default:throw new Error("Unknown mode: "+o)}}t.from=function(i,s){if(t.isValid(i))return i;try{return r(i)}catch{return s}}})(D);(function(t){const e=M,n=Re,r=Ie,o=D,i=pt,s=7973,a=e.getBCHDigit(s);function c(b,w,E){for(let C=1;C<=40;C++)if(w<=t.getCapacity(C,E,b))return C}function h(b,w){return o.getCharCountIndicator(b,w)+4}function _(b,w){let E=0;return b.forEach(function(C){const I=h(C.mode,w);E+=I+C.getBitsLength()}),E}function v(b,w){for(let E=1;E<=40;E++)if(_(b,E)<=t.getCapacity(E,w,o.MIXED))return E}t.from=function(w,E){return i.isValid(w)?parseInt(w,10):E},t.getCapacity=function(w,E,C){if(!i.isValid(w))throw new Error("Invalid QR Code version");typeof C>"u"&&(C=o.BYTE);const I=e.getSymbolTotalCodewords(w),l=n.getTotalCodewordsCount(w,E),d=(I-l)*8;if(C===o.MIXED)return d;const f=d-h(C,w);switch(C){case o.NUMERIC:return Math.floor(f/10*3);case o.ALPHANUMERIC:return Math.floor(f/11*2);case o.KANJI:return Math.floor(f/13);case o.BYTE:default:return Math.floor(f/8)}},t.getBestVersionForData=function(w,E){let C;const I=r.from(E,r.M);if(Array.isArray(w)){if(w.length>1)return v(w,I);if(w.length===0)return 1;C=w[0]}else C=w;return c(C.mode,C.getLength(),I)},t.getEncodedBits=function(w){if(!i.isValid(w)||w<7)throw new Error("Invalid QR Code version");let E=w<<12;for(;e.getBCHDigit(E)-a>=0;)E^=s<<e.getBCHDigit(E)-a;return w<<12|E}})(Zn);var er={};const je=M,tr=1335,Js=21522,Nt=je.getBCHDigit(tr);er.getEncodedBits=function(e,n){const r=e.bit<<3|n;let o=r<<10;for(;je.getBCHDigit(o)-Nt>=0;)o^=tr<<je.getBCHDigit(o)-Nt;return(r<<10|o)^Js};var nr={};const Qs=D;function Q(t){this.mode=Qs.NUMERIC,this.data=t.toString()}Q.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)};Q.prototype.getLength=function(){return this.data.length};Q.prototype.getBitsLength=function(){return Q.getBitsLength(this.data.length)};Q.prototype.write=function(e){let n,r,o;for(n=0;n+3<=this.data.length;n+=3)r=this.data.substr(n,3),o=parseInt(r,10),e.put(o,10);const i=this.data.length-n;i>0&&(r=this.data.substr(n),o=parseInt(r,10),e.put(o,i*3+1))};var Ks=Q;const Ys=D,Me=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function K(t){this.mode=Ys.ALPHANUMERIC,this.data=t}K.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)};K.prototype.getLength=function(){return this.data.length};K.prototype.getBitsLength=function(){return K.getBitsLength(this.data.length)};K.prototype.write=function(e){let n;for(n=0;n+2<=this.data.length;n+=2){let r=Me.indexOf(this.data[n])*45;r+=Me.indexOf(this.data[n+1]),e.put(r,11)}this.data.length%2&&e.put(Me.indexOf(this.data[n]),6)};var Gs=K;const Zs=$r,Xs=D;function Y(t){this.mode=Xs.BYTE,typeof t=="string"&&(t=Zs(t)),this.data=new Uint8Array(t)}Y.getBitsLength=function(e){return e*8};Y.prototype.getLength=function(){return this.data.length};Y.prototype.getBitsLength=function(){return Y.getBitsLength(this.data.length)};Y.prototype.write=function(t){for(let e=0,n=this.data.length;e<n;e++)t.put(this.data[e],8)};var ea=Y;const ta=D,na=M;function G(t){this.mode=ta.KANJI,this.data=t}G.getBitsLength=function(e){return e*13};G.prototype.getLength=function(){return this.data.length};G.prototype.getBitsLength=function(){return G.getBitsLength(this.data.length)};G.prototype.write=function(t){let e;for(e=0;e<this.data.length;e++){let n=na.toSJIS(this.data[e]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw new Error("Invalid SJIS character: "+this.data[e]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),t.put(n,13)}};var ra=G;(function(t){const e=D,n=Ks,r=Gs,o=ea,i=ra,s=A,a=M,c=jr;function h(l){return unescape(encodeURIComponent(l)).length}function _(l,d,f){const u=[];let g;for(;(g=l.exec(f))!==null;)u.push({data:g[0],index:g.index,mode:d,length:g[0].length});return u}function v(l){const d=_(s.NUMERIC,e.NUMERIC,l),f=_(s.ALPHANUMERIC,e.ALPHANUMERIC,l);let u,g;return a.isKanjiModeEnabled()?(u=_(s.BYTE,e.BYTE,l),g=_(s.KANJI,e.KANJI,l)):(u=_(s.BYTE_KANJI,e.BYTE,l),g=[]),d.concat(f,u,g).sort(function(m,S){return m.index-S.index}).map(function(m){return{data:m.data,mode:m.mode,length:m.length}})}function b(l,d){switch(d){case e.NUMERIC:return n.getBitsLength(l);case e.ALPHANUMERIC:return r.getBitsLength(l);case e.KANJI:return i.getBitsLength(l);case e.BYTE:return o.getBitsLength(l)}}function w(l){return l.reduce(function(d,f){const u=d.length-1>=0?d[d.length-1]:null;return u&&u.mode===f.mode?(d[d.length-1].data+=f.data,d):(d.push(f),d)},[])}function E(l){const d=[];for(let f=0;f<l.length;f++){const u=l[f];switch(u.mode){case e.NUMERIC:d.push([u,{data:u.data,mode:e.ALPHANUMERIC,length:u.length},{data:u.data,mode:e.BYTE,length:u.length}]);break;case e.ALPHANUMERIC:d.push([u,{data:u.data,mode:e.BYTE,length:u.length}]);break;case e.KANJI:d.push([u,{data:u.data,mode:e.BYTE,length:h(u.data)}]);break;case e.BYTE:d.push([{data:u.data,mode:e.BYTE,length:h(u.data)}])}}return d}function C(l,d){const f={},u={start:{}};let g=["start"];for(let y=0;y<l.length;y++){const m=l[y],S=[];for(let R=0;R<m.length;R++){const k=m[R],F=""+y+R;S.push(F),f[F]={node:k,lastCount:0},u[F]={};for(let X=0;X<g.length;X++){const x=g[X];f[x]&&f[x].node.mode===k.mode?(u[x][F]=b(f[x].lastCount+k.length,k.mode)-b(f[x].lastCount,k.mode),f[x].lastCount+=k.length):(f[x]&&(f[x].lastCount=k.length),u[x][F]=b(k.length,k.mode)+4+e.getCharCountIndicator(k.mode,d))}}g=S}for(let y=0;y<g.length;y++)u[g[y]].end=0;return{map:u,table:f}}function I(l,d){let f;const u=e.getBestModeForData(l);if(f=e.from(d,u),f!==e.BYTE&&f.bit<u.bit)throw new Error('"'+l+'" cannot be encoded with mode '+e.toString(f)+`.
 Suggested mode is: `+e.toString(u));switch(f===e.KANJI&&!a.isKanjiModeEnabled()&&(f=e.BYTE),f){case e.NUMERIC:return new n(l);case e.ALPHANUMERIC:return new r(l);case e.KANJI:return new i(l);case e.BYTE:return new o(l)}}t.fromArray=function(d){return d.reduce(function(f,u){return typeof u=="string"?f.push(I(u,null)):u.data&&f.push(I(u.data,u.mode)),f},[])},t.fromString=function(d,f){const u=v(d,a.isKanjiModeEnabled()),g=E(u),y=C(g,f),m=c.find_path(y.map,"start","end"),S=[];for(let R=1;R<m.length-1;R++)S.push(y.table[m[R]].node);return t.fromArray(w(S))},t.rawSplit=function(d){return t.fromArray(v(d,a.isKanjiModeEnabled()))}})(nr);const Te=M,Ae=Ie,oa=qs,ia=Ds,sa=Jn,aa=Qn,He=Kn,ze=Re,ca=$s,me=Zn,la=er,ua=D,Oe=nr;function da(t,e){const n=t.size,r=aa.getPositions(e);for(let o=0;o<r.length;o++){const i=r[o][0],s=r[o][1];for(let a=-1;a<=7;a++)if(!(i+a<=-1||n<=i+a))for(let c=-1;c<=7;c++)s+c<=-1||n<=s+c||(a>=0&&a<=6&&(c===0||c===6)||c>=0&&c<=6&&(a===0||a===6)||a>=2&&a<=4&&c>=2&&c<=4?t.set(i+a,s+c,!0,!0):t.set(i+a,s+c,!1,!0))}}function fa(t){const e=t.size;for(let n=8;n<e-8;n++){const r=n%2===0;t.set(n,6,r,!0),t.set(6,n,r,!0)}}function ha(t,e){const n=sa.getPositions(e);for(let r=0;r<n.length;r++){const o=n[r][0],i=n[r][1];for(let s=-2;s<=2;s++)for(let a=-2;a<=2;a++)s===-2||s===2||a===-2||a===2||s===0&&a===0?t.set(o+s,i+a,!0,!0):t.set(o+s,i+a,!1,!0)}}function ga(t,e){const n=t.size,r=me.getEncodedBits(e);let o,i,s;for(let a=0;a<18;a++)o=Math.floor(a/3),i=a%3+n-8-3,s=(r>>a&1)===1,t.set(o,i,s,!0),t.set(i,o,s,!0)}function Le(t,e,n){const r=t.size,o=la.getEncodedBits(e,n);let i,s;for(i=0;i<15;i++)s=(o>>i&1)===1,i<6?t.set(i,8,s,!0):i<8?t.set(i+1,8,s,!0):t.set(r-15+i,8,s,!0),i<8?t.set(8,r-i-1,s,!0):i<9?t.set(8,15-i-1+1,s,!0):t.set(8,15-i-1,s,!0);t.set(r-8,8,1,!0)}function _a(t,e){const n=t.size;let r=-1,o=n-1,i=7,s=0;for(let a=n-1;a>0;a-=2)for(a===6&&a--;;){for(let c=0;c<2;c++)if(!t.isReserved(o,a-c)){let h=!1;s<e.length&&(h=(e[s]>>>i&1)===1),t.set(o,a-c,h),i--,i===-1&&(s++,i=7)}if(o+=r,o<0||n<=o){o-=r,r=-r;break}}}function pa(t,e,n){const r=new oa;n.forEach(function(c){r.put(c.mode.bit,4),r.put(c.getLength(),ua.getCharCountIndicator(c.mode,t)),c.write(r)});const o=Te.getSymbolTotalCodewords(t),i=ze.getTotalCodewordsCount(t,e),s=(o-i)*8;for(r.getLengthInBits()+4<=s&&r.put(0,4);r.getLengthInBits()%8!==0;)r.putBit(0);const a=(s-r.getLengthInBits())/8;for(let c=0;c<a;c++)r.put(c%2?17:236,8);return ma(r,t,e)}function ma(t,e,n){const r=Te.getSymbolTotalCodewords(e),o=ze.getTotalCodewordsCount(e,n),i=r-o,s=ze.getBlocksCount(e,n),a=r%s,c=s-a,h=Math.floor(r/s),_=Math.floor(i/s),v=_+1,b=h-_,w=new ca(b);let E=0;const C=new Array(s),I=new Array(s);let l=0;const d=new Uint8Array(t.buffer);for(let m=0;m<s;m++){const S=m<c?_:v;C[m]=d.slice(E,E+S),I[m]=w.encode(C[m]),E+=S,l=Math.max(l,S)}const f=new Uint8Array(r);let u=0,g,y;for(g=0;g<l;g++)for(y=0;y<s;y++)g<C[y].length&&(f[u++]=C[y][g]);for(g=0;g<b;g++)for(y=0;y<s;y++)f[u++]=I[y][g];return f}function wa(t,e,n,r){let o;if(Array.isArray(t))o=Oe.fromArray(t);else if(typeof t=="string"){let h=e;if(!h){const _=Oe.rawSplit(t);h=me.getBestVersionForData(_,n)}o=Oe.fromString(t,h||40)}else throw new Error("Invalid data");const i=me.getBestVersionForData(o,n);if(!i)throw new Error("The amount of data is too big to be stored in a QR Code");if(!e)e=i;else if(e<i)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+i+`.
`);const s=pa(e,n,o),a=Te.getSymbolSize(e),c=new ia(a);return da(c,e),fa(c),ha(c,e),Le(c,n,0),e>=7&&ga(c,e),_a(c,s),isNaN(r)&&(r=He.getBestMask(c,Le.bind(null,c,n))),He.applyMask(r,c),Le(c,n,r),{modules:c,version:e,errorCorrectionLevel:n,maskPattern:r,segments:o}}Wn.create=function(e,n){if(typeof e>"u"||e==="")throw new Error("No input text");let r=Ae.M,o,i;return typeof n<"u"&&(r=Ae.from(n.errorCorrectionLevel,Ae.M),o=me.from(n.version),i=He.from(n.maskPattern),n.toSJISFunc&&Te.setToSJISFunction(n.toSJISFunc)),wa(e,o,r,i)};var rr={},mt={};(function(t){function e(n){if(typeof n=="number"&&(n=n.toString()),typeof n!="string")throw new Error("Color should be defined as hex string");let r=n.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+n);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(i){return[i,i]}))),r.length===6&&r.push("F","F");const o=parseInt(r.join(""),16);return{r:o>>24&255,g:o>>16&255,b:o>>8&255,a:o&255,hex:"#"+r.slice(0,6).join("")}}t.getOptions=function(r){r||(r={}),r.color||(r.color={});const o=typeof r.margin>"u"||r.margin===null||r.margin<0?4:r.margin,i=r.width&&r.width>=21?r.width:void 0,s=r.scale||4;return{width:i,scale:i?4:s,margin:o,color:{dark:e(r.color.dark||"#000000ff"),light:e(r.color.light||"#ffffffff")},type:r.type,rendererOpts:r.rendererOpts||{}}},t.getScale=function(r,o){return o.width&&o.width>=r+o.margin*2?o.width/(r+o.margin*2):o.scale},t.getImageWidth=function(r,o){const i=t.getScale(r,o);return Math.floor((r+o.margin*2)*i)},t.qrToImageData=function(r,o,i){const s=o.modules.size,a=o.modules.data,c=t.getScale(s,i),h=Math.floor((s+i.margin*2)*c),_=i.margin*c,v=[i.color.light,i.color.dark];for(let b=0;b<h;b++)for(let w=0;w<h;w++){let E=(b*h+w)*4,C=i.color.light;if(b>=_&&w>=_&&b<h-_&&w<h-_){const I=Math.floor((b-_)/c),l=Math.floor((w-_)/c);C=v[a[I*s+l]?1:0]}r[E++]=C.r,r[E++]=C.g,r[E++]=C.b,r[E]=C.a}}})(mt);(function(t){const e=mt;function n(o,i,s){o.clearRect(0,0,i.width,i.height),i.style||(i.style={}),i.height=s,i.width=s,i.style.height=s+"px",i.style.width=s+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}t.render=function(i,s,a){let c=a,h=s;typeof c>"u"&&(!s||!s.getContext)&&(c=s,s=void 0),s||(h=r()),c=e.getOptions(c);const _=e.getImageWidth(i.modules.size,c),v=h.getContext("2d"),b=v.createImageData(_,_);return e.qrToImageData(b.data,i,c),n(v,h,_),v.putImageData(b,0,0),h},t.renderToDataURL=function(i,s,a){let c=a;typeof c>"u"&&(!s||!s.getContext)&&(c=s,s=void 0),c||(c={});const h=t.render(i,s,c),_=c.type||"image/png",v=c.rendererOpts||{};return h.toDataURL(_,v.quality)}})(rr);var or={};const ya=mt;function xt(t,e){const n=t.a/255,r=e+'="'+t.hex+'"';return n<1?r+" "+e+'-opacity="'+n.toFixed(2).slice(1)+'"':r}function Be(t,e,n){let r=t+e;return typeof n<"u"&&(r+=" "+n),r}function ba(t,e,n){let r="",o=0,i=!1,s=0;for(let a=0;a<t.length;a++){const c=Math.floor(a%e),h=Math.floor(a/e);!c&&!i&&(i=!0),t[a]?(s++,a>0&&c>0&&t[a-1]||(r+=i?Be("M",c+n,.5+h+n):Be("m",o,0),o=0,i=!1),c+1<e&&t[a+1]||(r+=Be("h",s),s=0)):o++}return r}or.render=function(e,n,r){const o=ya.getOptions(n),i=e.modules.size,s=e.modules.data,a=i+o.margin*2,c=o.color.light.a?"<path "+xt(o.color.light,"fill")+' d="M0 0h'+a+"v"+a+'H0z"/>':"",h="<path "+xt(o.color.dark,"stroke")+' d="'+ba(s,i,o.margin)+'"/>',_='viewBox="0 0 '+a+" "+a+'"',b='<svg xmlns="http://www.w3.org/2000/svg" '+(o.width?'width="'+o.width+'" height="'+o.width+'" ':"")+_+' shape-rendering="crispEdges">'+c+h+`</svg>
`;return typeof r=="function"&&r(null,b),b};const va=Us,We=Wn,ir=rr,Ea=or;function wt(t,e,n,r,o){const i=[].slice.call(arguments,1),s=i.length,a=typeof i[s-1]=="function";if(!a&&!va())throw new Error("Callback required as last argument");if(a){if(s<2)throw new Error("Too few arguments provided");s===2?(o=n,n=e,e=r=void 0):s===3&&(e.getContext&&typeof o>"u"?(o=r,r=void 0):(o=r,r=n,n=e,e=void 0))}else{if(s<1)throw new Error("Too few arguments provided");return s===1?(n=e,e=r=void 0):s===2&&!e.getContext&&(r=n,n=e,e=void 0),new Promise(function(c,h){try{const _=We.create(n,r);c(t(_,e,r))}catch(_){h(_)}})}try{const c=We.create(n,r);o(null,t(c,e,r))}catch(c){o(c)}}ce.create=We.create;ce.toCanvas=wt.bind(null,ir.render);ce.toDataURL=wt.bind(null,ir.renderToDataURL);ce.toString=wt.bind(null,function(t,e,n){return Ea.render(t,n)});var Ca=function(){var t=document.getSelection();if(!t.rangeCount)return function(){};for(var e=document.activeElement,n=[],r=0;r<t.rangeCount;r++)n.push(t.getRangeAt(r));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return t.removeAllRanges(),function(){t.type==="Caret"&&t.removeAllRanges(),t.rangeCount||n.forEach(function(o){t.addRange(o)}),e&&e.focus()}},Sa=Ca,Mt={"text/plain":"Text","text/html":"Url",default:"Text"},Ia="Copy to clipboard: #{key}, Enter";function Ra(t){var e=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return t.replace(/#{\s*key\s*}/g,e)}function ka(t,e){var n,r,o,i,s,a,c=!1;e||(e={}),n=e.debug||!1;try{o=Sa(),i=document.createRange(),s=document.getSelection(),a=document.createElement("span"),a.textContent=t,a.ariaHidden="true",a.style.all="unset",a.style.position="fixed",a.style.top=0,a.style.clip="rect(0, 0, 0, 0)",a.style.whiteSpace="pre",a.style.webkitUserSelect="text",a.style.MozUserSelect="text",a.style.msUserSelect="text",a.style.userSelect="text",a.addEventListener("copy",function(_){if(_.stopPropagation(),e.format)if(_.preventDefault(),typeof _.clipboardData>"u"){n&&console.warn("unable to use e.clipboardData"),n&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var v=Mt[e.format]||Mt.default;window.clipboardData.setData(v,t)}else _.clipboardData.clearData(),_.clipboardData.setData(e.format,t);e.onCopy&&(_.preventDefault(),e.onCopy(_.clipboardData))}),document.body.appendChild(a),i.selectNodeContents(a),s.addRange(i);var h=document.execCommand("copy");if(!h)throw new Error("copy command was unsuccessful");c=!0}catch(_){n&&console.error("unable to copy using execCommand: ",_),n&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",t),e.onCopy&&e.onCopy(window.clipboardData),c=!0}catch(v){n&&console.error("unable to copy using clipboardData: ",v),n&&console.error("falling back to prompt"),r=Ra("message"in e?e.message:Ia),window.prompt(r,t)}}finally{s&&(typeof s.removeRange=="function"?s.removeRange(i):s.removeAllRanges()),a&&document.body.removeChild(a),o()}return c}var Ta=ka;function sr(t,e){for(var n in e)t[n]=e[n];return t}function Ve(t,e){for(var n in t)if(n!=="__source"&&!(n in e))return!0;for(var r in e)if(r!=="__source"&&t[r]!==e[r])return!0;return!1}function Ue(t,e){return t===e&&(t!==0||1/t==1/e)||t!=t&&e!=e}function we(t){this.props=t}function ar(t,e){function n(o){var i=this.props.ref,s=i==o.ref;return!s&&i&&(i.call?i(null):i.current=null),e?!e(this.props,o)||!s:Ve(this.props,o)}function r(o){return this.shouldComponentUpdate=n,O(t,o)}return r.displayName="Memo("+(t.displayName||t.name)+")",r.prototype.isReactComponent=!0,r.__f=!0,r}(we.prototype=new j).isPureReactComponent=!0,we.prototype.shouldComponentUpdate=function(t,e){return Ve(this.props,t)||Ve(this.state,e)};var At=N.__b;N.__b=function(t){t.type&&t.type.__f&&t.ref&&(t.props.ref=t.ref,t.ref=null),At&&At(t)};var Na=typeof Symbol<"u"&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function cr(t){function e(n){var r=sr({},n);return delete r.ref,t(r,n.ref||null)}return e.$$typeof=Na,e.render=e,e.prototype.isReactComponent=e.__f=!0,e.displayName="ForwardRef("+(t.displayName||t.name)+")",e}var Ot=function(t,e){return t==null?null:B(B(t).map(e))},lr={map:Ot,forEach:Ot,count:function(t){return t?B(t).length:0},only:function(t){var e=B(t);if(e.length!==1)throw"Children.only";return e[0]},toArray:B},xa=N.__e;N.__e=function(t,e,n,r){if(t.then){for(var o,i=e;i=i.__;)if((o=i.__c)&&o.__c)return e.__e==null&&(e.__e=n.__e,e.__k=n.__k),o.__c(t,e)}xa(t,e,n,r)};var Lt=N.unmount;function ur(t,e,n){return t&&(t.__c&&t.__c.__H&&(t.__c.__H.__.forEach(function(r){typeof r.__c=="function"&&r.__c()}),t.__c.__H=null),(t=sr({},t)).__c!=null&&(t.__c.__P===n&&(t.__c.__P=e),t.__c=null),t.__k=t.__k&&t.__k.map(function(r){return ur(r,e,n)})),t}function dr(t,e,n){return t&&(t.__v=null,t.__k=t.__k&&t.__k.map(function(r){return dr(r,e,n)}),t.__c&&t.__c.__P===e&&(t.__e&&n.insertBefore(t.__e,t.__d),t.__c.__e=!0,t.__c.__P=n)),t}function ne(){this.__u=0,this.t=null,this.__b=null}function fr(t){var e=t.__.__c;return e&&e.__a&&e.__a(t)}function hr(t){var e,n,r;function o(i){if(e||(e=t()).then(function(s){n=s.default||s},function(s){r=s}),r)throw r;if(!n)throw e;return O(n,i)}return o.displayName="Lazy",o.__f=!0,o}function z(){this.u=null,this.o=null}N.unmount=function(t){var e=t.__c;e&&e.__R&&e.__R(),e&&t.__h===!0&&(t.type=null),Lt&&Lt(t)},(ne.prototype=new j).__c=function(t,e){var n=e.__c,r=this;r.t==null&&(r.t=[]),r.t.push(n);var o=fr(r.__v),i=!1,s=function(){i||(i=!0,n.__R=null,o?o(a):a())};n.__R=s;var a=function(){if(!--r.__u){if(r.state.__a){var h=r.state.__a;r.__v.__k[0]=dr(h,h.__c.__P,h.__c.__O)}var _;for(r.setState({__a:r.__b=null});_=r.t.pop();)_.forceUpdate()}},c=e.__h===!0;r.__u++||c||r.setState({__a:r.__b=r.__v.__k[0]}),t.then(s,s)},ne.prototype.componentWillUnmount=function(){this.t=[]},ne.prototype.render=function(t,e){if(this.__b){if(this.__v.__k){var n=document.createElement("div"),r=this.__v.__k[0].__c;this.__v.__k[0]=ur(this.__b,n,r.__O=r.__P)}this.__b=null}var o=e.__a&&O(re,null,t.fallback);return o&&(o.__h=null),[O(re,null,e.__a?null:t.children),o]};var Bt=function(t,e,n){if(++n[1]===n[0]&&t.o.delete(e),t.props.revealOrder&&(t.props.revealOrder[0]!=="t"||!t.o.size))for(n=t.u;n;){for(;n.length>3;)n.pop()();if(n[1]<n[0])break;t.u=n=n[2]}};function Ma(t){return this.getChildContext=function(){return t.context},t.children}function Aa(t){var e=this,n=t.i;e.componentWillUnmount=function(){ge(null,e.l),e.l=null,e.i=null},e.i&&e.i!==n&&e.componentWillUnmount(),t.__v?(e.l||(e.i=n,e.l={nodeType:1,parentNode:n,childNodes:[],appendChild:function(r){this.childNodes.push(r),e.i.appendChild(r)},insertBefore:function(r,o){this.childNodes.push(r),e.i.appendChild(r)},removeChild:function(r){this.childNodes.splice(this.childNodes.indexOf(r)>>>1,1),e.i.removeChild(r)}}),ge(O(Ma,{context:e.context},t.__v),e.l)):e.l&&e.componentWillUnmount()}function gr(t,e){var n=O(Aa,{__v:t,i:e});return n.containerInfo=e,n}(z.prototype=new j).__a=function(t){var e=this,n=fr(e.__v),r=e.o.get(t);return r[0]++,function(o){var i=function(){e.props.revealOrder?(r.push(o),Bt(e,t,r)):o()};n?n(i):i()}},z.prototype.render=function(t){this.u=null,this.o=new Map;var e=B(t.children);t.revealOrder&&t.revealOrder[0]==="b"&&e.reverse();for(var n=e.length;n--;)this.o.set(e[n],this.u=[1,0,this.u]);return t.children},z.prototype.componentDidUpdate=z.prototype.componentDidMount=function(){var t=this;this.o.forEach(function(e,n){Bt(t,n,e)})};var _r=typeof Symbol<"u"&&Symbol.for&&Symbol.for("react.element")||60103,Oa=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,La=/^on(Ani|Tra|Tou|BeforeInp|Compo)/,Ba=/[A-Z0-9]/g,Ua=typeof document<"u",Pa=function(t){return(typeof Symbol<"u"&&typeof Symbol()=="symbol"?/fil|che|rad/:/fil|che|ra/).test(t)};function pr(t,e,n){return e.__k==null&&(e.textContent=""),ge(t,e),typeof n=="function"&&n(),t?t.__c:null}function mr(t,e,n){return ho(t,e),typeof n=="function"&&n(),t?t.__c:null}j.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(t){Object.defineProperty(j.prototype,t,{configurable:!0,get:function(){return this["UNSAFE_"+t]},set:function(e){Object.defineProperty(this,t,{configurable:!0,writable:!0,value:e})}})});var Ut=N.event;function qa(){}function Da(){return this.cancelBubble}function Fa(){return this.defaultPrevented}N.event=function(t){return Ut&&(t=Ut(t)),t.persist=qa,t.isPropagationStopped=Da,t.isDefaultPrevented=Fa,t.nativeEvent=t};var yt,$a={enumerable:!1,configurable:!0,get:function(){return this.class}},Pt=N.vnode;N.vnode=function(t){typeof t.type=="string"&&function(e){var n=e.props,r=e.type,o={};for(var i in n){var s=n[i];if(!(i==="value"&&"defaultValue"in n&&s==null||Ua&&i==="children"&&r==="noscript"||i==="class"||i==="className")){var a=i.toLowerCase();i==="defaultValue"&&"value"in n&&n.value==null?i="value":i==="download"&&s===!0?s="":a==="ondoubleclick"?i="ondblclick":a!=="onchange"||r!=="input"&&r!=="textarea"||Pa(n.type)?a==="onfocus"?i="onfocusin":a==="onblur"?i="onfocusout":La.test(i)?i=a:r.indexOf("-")===-1&&Oa.test(i)?i=i.replace(Ba,"-$&").toLowerCase():s===null&&(s=void 0):a=i="oninput",a==="oninput"&&o[i=a]&&(i="oninputCapture"),o[i]=s}}r=="select"&&o.multiple&&Array.isArray(o.value)&&(o.value=B(n.children).forEach(function(c){c.props.selected=o.value.indexOf(c.props.value)!=-1})),r=="select"&&o.defaultValue!=null&&(o.value=B(n.children).forEach(function(c){c.props.selected=o.multiple?o.defaultValue.indexOf(c.props.value)!=-1:o.defaultValue==c.props.value})),n.class&&!n.className?(o.class=n.class,Object.defineProperty(o,"className",$a)):(n.className&&!n.class||n.class&&n.className)&&(o.class=o.className=n.className),e.props=o}(t),t.$$typeof=_r,Pt&&Pt(t)};var qt=N.__r;N.__r=function(t){qt&&qt(t),yt=t.__c};var Dt=N.diffed;N.diffed=function(t){Dt&&Dt(t);var e=t.props,n=t.__e;n!=null&&t.type==="textarea"&&"value"in e&&e.value!==n.value&&(n.value=e.value==null?"":e.value),yt=null};var wr={ReactCurrentDispatcher:{current:{readContext:function(t){return yt.__n[t.__c].props.value}}}},ja="17.0.2";function yr(t){return O.bind(null,t)}function bt(t){return!!t&&t.$$typeof===_r}function br(t){return bt(t)?go.apply(null,arguments):t}function vr(t){return!!t.__k&&(ge(null,t),!0)}function Er(t){return t&&(t.base||t.nodeType===1&&t)||null}var Cr=function(t,e){return t(e)},Sr=function(t,e){return t(e)},Ir=re;function vt(t){t()}function Rr(t){return t}function kr(){return[!1,vt]}var Tr=ye;function Nr(t,e){var n=e(),r=Qe({h:{__:n,v:e}}),o=r[0].h,i=r[1];return ye(function(){o.__=n,o.v=e,Ue(o.__,e())||i({h:o})},[t,n,e]),Ke(function(){return Ue(o.__,o.v())||i({h:o}),t(function(){Ue(o.__,o.v())||i({h:o})})},[t]),n}var Ha={useState:Qe,useId:zt,useReducer:Wt,useEffect:Ke,useLayoutEffect:ye,useInsertionEffect:Tr,useTransition:kr,useDeferredValue:Rr,useSyncExternalStore:Nr,startTransition:vt,useRef:Vt,useImperativeHandle:Jt,useMemo:Qt,useCallback:Kt,useContext:Yt,useDebugValue:Gt,version:"17.0.2",Children:lr,render:pr,hydrate:mr,unmountComponentAtNode:vr,createPortal:gr,createElement:O,createContext:Zt,createFactory:yr,cloneElement:br,createRef:Xt,Fragment:re,isValidElement:bt,findDOMNode:Er,Component:j,PureComponent:we,memo:ar,forwardRef:cr,flushSync:Sr,unstable_batchedUpdates:Cr,StrictMode:Ir,Suspense:ne,SuspenseList:z,lazy:hr,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:wr};const za=Object.freeze(Object.defineProperty({__proto__:null,Children:lr,Component:j,Fragment:re,PureComponent:we,StrictMode:Ir,Suspense:ne,SuspenseList:z,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:wr,cloneElement:br,createContext:Zt,createElement:O,createFactory:yr,createPortal:gr,createRef:Xt,default:Ha,findDOMNode:Er,flushSync:Sr,forwardRef:cr,hydrate:mr,isValidElement:bt,lazy:hr,memo:ar,render:pr,startTransition:vt,unmountComponentAtNode:vr,unstable_batchedUpdates:Cr,useCallback:Kt,useContext:Yt,useDebugValue:Gt,useDeferredValue:Rr,useEffect:Ke,useErrorBoundary:_o,useId:zt,useImperativeHandle:Jt,useInsertionEffect:Tr,useLayoutEffect:ye,useMemo:Qt,useReducer:Wt,useRef:Vt,useState:Qe,useSyncExternalStore:Nr,useTransition:kr,version:ja},Symbol.toStringTag,{value:"Module"})),Wa=jt(za);function xr(t){return t&&typeof t=="object"&&"default"in t?t.default:t}var T=Bs,Mr=xr(ce),Va=xr(Ta),p=Wa;function Ja(t){Mr.toString(t,{type:"terminal"}).then(console.log)}var Qa=`:root {
  --animation-duration: 300ms;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.animated {
  animation-duration: var(--animation-duration);
  animation-fill-mode: both;
}

.fadeIn {
  animation-name: fadeIn;
}

.fadeOut {
  animation-name: fadeOut;
}

#walletconnect-wrapper {
  -webkit-user-select: none;
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  user-select: none;
  width: 100%;
  z-index: 99999999999999;
}

.walletconnect-modal__headerLogo {
  height: 21px;
}

.walletconnect-modal__header p {
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  align-items: flex-start;
  display: flex;
  flex: 1;
  margin-left: 5px;
}

.walletconnect-modal__close__wrapper {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 10000;
  background: white;
  border-radius: 26px;
  padding: 6px;
  box-sizing: border-box;
  width: 26px;
  height: 26px;
  cursor: pointer;
}

.walletconnect-modal__close__icon {
  position: relative;
  top: 7px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(45deg);
}

.walletconnect-modal__close__line1 {
  position: absolute;
  width: 100%;
  border: 1px solid rgb(48, 52, 59);
}

.walletconnect-modal__close__line2 {
  position: absolute;
  width: 100%;
  border: 1px solid rgb(48, 52, 59);
  transform: rotate(90deg);
}

.walletconnect-qrcode__base {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background: rgba(37, 41, 46, 0.95);
  height: 100%;
  left: 0;
  pointer-events: auto;
  position: fixed;
  top: 0;
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  width: 100%;
  will-change: opacity;
  padding: 40px;
  box-sizing: border-box;
}

.walletconnect-qrcode__text {
  color: rgba(60, 66, 82, 0.6);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1.1875em;
  margin: 10px 0 20px 0;
  text-align: center;
  width: 100%;
}

@media only screen and (max-width: 768px) {
  .walletconnect-qrcode__text {
    font-size: 4vw;
  }
}

@media only screen and (max-width: 320px) {
  .walletconnect-qrcode__text {
    font-size: 14px;
  }
}

.walletconnect-qrcode__image {
  width: calc(100% - 30px);
  box-sizing: border-box;
  cursor: none;
  margin: 0 auto;
}

.walletconnect-qrcode__notification {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 16px;
  padding: 16px 20px;
  border-radius: 16px;
  text-align: center;
  transition: all 0.1s ease-in-out;
  background: white;
  color: black;
  margin-bottom: -60px;
  opacity: 0;
}

.walletconnect-qrcode__notification.notification__show {
  opacity: 1;
}

@media only screen and (max-width: 768px) {
  .walletconnect-modal__header {
    height: 130px;
  }
  .walletconnect-modal__base {
    overflow: auto;
  }
}

@media only screen and (min-device-width: 415px) and (max-width: 768px) {
  #content {
    max-width: 768px;
    box-sizing: border-box;
  }
}

@media only screen and (min-width: 375px) and (max-width: 415px) {
  #content {
    max-width: 414px;
    box-sizing: border-box;
  }
}

@media only screen and (min-width: 320px) and (max-width: 375px) {
  #content {
    max-width: 375px;
    box-sizing: border-box;
  }
}

@media only screen and (max-width: 320px) {
  #content {
    max-width: 320px;
    box-sizing: border-box;
  }
}

.walletconnect-modal__base {
  -webkit-font-smoothing: antialiased;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 50px 5px rgba(0, 0, 0, 0.4);
  font-family: ui-rounded, "SF Pro Rounded", "SF Pro Text", medium-content-sans-serif-font,
    -apple-system, BlinkMacSystemFont, ui-sans-serif, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
  margin-top: 41px;
  padding: 24px 24px 22px;
  pointer-events: auto;
  position: relative;
  text-align: center;
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  will-change: transform;
  overflow: visible;
  transform: translateY(-50%);
  top: 50%;
  max-width: 500px;
  margin: auto;
}

@media only screen and (max-width: 320px) {
  .walletconnect-modal__base {
    padding: 24px 12px;
  }
}

.walletconnect-modal__base .hidden {
  transform: translateY(150%);
  transition: 0.125s cubic-bezier(0.4, 0, 1, 1);
}

.walletconnect-modal__header {
  align-items: center;
  display: flex;
  height: 26px;
  left: 0;
  justify-content: space-between;
  position: absolute;
  top: -42px;
  width: 100%;
}

.walletconnect-modal__base .wc-logo {
  align-items: center;
  display: flex;
  height: 26px;
  margin-top: 15px;
  padding-bottom: 15px;
  pointer-events: auto;
}

.walletconnect-modal__base .wc-logo div {
  background-color: #3399ff;
  height: 21px;
  margin-right: 5px;
  mask-image: url("images/wc-logo.svg") center no-repeat;
  width: 32px;
}

.walletconnect-modal__base .wc-logo p {
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.walletconnect-modal__base h2 {
  color: rgba(60, 66, 82, 0.6);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1.1875em;
  margin: 0 0 19px 0;
  text-align: center;
  width: 100%;
}

.walletconnect-modal__base__row {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  height: 56px;
  justify-content: space-between;
  padding: 0 15px;
  position: relative;
  margin: 0px 0px 8px;
  text-align: left;
  transition: 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  text-decoration: none;
}

.walletconnect-modal__base__row:hover {
  background: rgba(60, 66, 82, 0.06);
}

.walletconnect-modal__base__row:active {
  background: rgba(60, 66, 82, 0.06);
  transform: scale(0.975);
  transition: 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.walletconnect-modal__base__row__h3 {
  color: #25292e;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  padding-bottom: 3px;
}

.walletconnect-modal__base__row__right {
  align-items: center;
  display: flex;
  justify-content: center;
}

.walletconnect-modal__base__row__right__app-icon {
  border-radius: 8px;
  height: 34px;
  margin: 0 11px 2px 0;
  width: 34px;
  background-size: 100%;
  box-shadow: 0 4px 12px 0 rgba(37, 41, 46, 0.25);
}

.walletconnect-modal__base__row__right__caret {
  height: 18px;
  opacity: 0.3;
  transition: 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  width: 8px;
  will-change: opacity;
}

.walletconnect-modal__base__row:hover .caret,
.walletconnect-modal__base__row:active .caret {
  opacity: 0.6;
}

.walletconnect-modal__mobile__toggle {
  width: 80%;
  display: flex;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 18px;
  background: #d4d5d9;
}

.walletconnect-modal__single_wallet {
  display: flex;
  justify-content: center;
  margin-top: 7px;
  margin-bottom: 18px;
}

.walletconnect-modal__single_wallet a {
  cursor: pointer;
  color: rgb(64, 153, 255);
  font-size: 21px;
  font-weight: 800;
  text-decoration: none !important;
  margin: 0 auto;
}

.walletconnect-modal__mobile__toggle_selector {
  width: calc(50% - 8px);
  background: white;
  position: absolute;
  border-radius: 5px;
  height: calc(100% - 8px);
  top: 4px;
  transition: all 0.2s ease-in-out;
  transform: translate3d(4px, 0, 0);
}

.walletconnect-modal__mobile__toggle.right__selected .walletconnect-modal__mobile__toggle_selector {
  transform: translate3d(calc(100% + 12px), 0, 0);
}

.walletconnect-modal__mobile__toggle a {
  font-size: 12px;
  width: 50%;
  text-align: center;
  padding: 8px;
  margin: 0;
  font-weight: 600;
  z-index: 1;
}

.walletconnect-modal__footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

@media only screen and (max-width: 768px) {
  .walletconnect-modal__footer {
    margin-top: 5vw;
  }
}

.walletconnect-modal__footer a {
  cursor: pointer;
  color: #898d97;
  font-size: 15px;
  margin: 0 auto;
}

@media only screen and (max-width: 320px) {
  .walletconnect-modal__footer a {
    font-size: 14px;
  }
}

.walletconnect-connect__buttons__wrapper {
  max-height: 44vh;
}

.walletconnect-connect__buttons__wrapper__android {
  margin: 50% 0;
}

.walletconnect-connect__buttons__wrapper__wrap {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 10px 0;
}

@media only screen and (min-width: 768px) {
  .walletconnect-connect__buttons__wrapper__wrap {
    margin-top: 40px;
  }
}

.walletconnect-connect__button {
  background-color: rgb(64, 153, 255);
  padding: 12px;
  border-radius: 8px;
  text-decoration: none;
  color: rgb(255, 255, 255);
  font-weight: 500;
}

.walletconnect-connect__button__icon_anchor {
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 8px;
  width: 42px;
  justify-self: center;
  flex-direction: column;
  text-decoration: none !important;
}

@media only screen and (max-width: 320px) {
  .walletconnect-connect__button__icon_anchor {
    margin: 4px;
  }
}

.walletconnect-connect__button__icon {
  border-radius: 10px;
  height: 42px;
  margin: 0;
  width: 42px;
  background-size: cover !important;
  box-shadow: 0 4px 12px 0 rgba(37, 41, 46, 0.25);
}

.walletconnect-connect__button__text {
  color: #424952;
  font-size: 2.7vw;
  text-decoration: none !important;
  padding: 0;
  margin-top: 1.8vw;
  font-weight: 600;
}

@media only screen and (min-width: 768px) {
  .walletconnect-connect__button__text {
    font-size: 16px;
    margin-top: 12px;
  }
}

.walletconnect-search__input {
  border: none;
  background: #d4d5d9;
  border-style: none;
  padding: 8px 16px;
  outline: none;
  font-style: normal;
  font-stretch: normal;
  font-size: 16px;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  border-radius: 8px;
  width: calc(100% - 16px);
  margin: 0;
  margin-bottom: 8px;
}
`;typeof Symbol<"u"&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")));typeof Symbol<"u"&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));function Ka(t,e){try{var n=t()}catch(r){return e(r)}return n&&n.then?n.then(void 0,e):n}var Ya="data:image/svg+xml,%3C?xml version='1.0' encoding='UTF-8'?%3E %3Csvg width='300px' height='185px' viewBox='0 0 300 185' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch --%3E %3Ctitle%3EWalletConnect%3C/title%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E %3Cg id='walletconnect-logo-alt' fill='%233B99FC' fill-rule='nonzero'%3E %3Cpath d='M61.4385429,36.2562612 C110.349767,-11.6319051 189.65053,-11.6319051 238.561752,36.2562612 L244.448297,42.0196786 C246.893858,44.4140867 246.893858,48.2961898 244.448297,50.690599 L224.311602,70.406102 C223.088821,71.6033071 221.106302,71.6033071 219.883521,70.406102 L211.782937,62.4749541 C177.661245,29.0669724 122.339051,29.0669724 88.2173582,62.4749541 L79.542302,70.9685592 C78.3195204,72.1657633 76.337001,72.1657633 75.1142214,70.9685592 L54.9775265,51.2530561 C52.5319653,48.8586469 52.5319653,44.9765439 54.9775265,42.5821357 L61.4385429,36.2562612 Z M280.206339,77.0300061 L298.128036,94.5769031 C300.573585,96.9713 300.573599,100.85338 298.128067,103.247793 L217.317896,182.368927 C214.872352,184.763353 210.907314,184.76338 208.461736,182.368989 C208.461726,182.368979 208.461714,182.368967 208.461704,182.368957 L151.107561,126.214385 C150.496171,125.615783 149.504911,125.615783 148.893521,126.214385 C148.893517,126.214389 148.893514,126.214393 148.89351,126.214396 L91.5405888,182.368927 C89.095052,184.763359 85.1300133,184.763399 82.6844276,182.369014 C82.6844133,182.369 82.684398,182.368986 82.6843827,182.36897 L1.87196327,103.246785 C-0.573596939,100.852377 -0.573596939,96.9702735 1.87196327,94.5758653 L19.7936929,77.028998 C22.2392531,74.6345898 26.2042918,74.6345898 28.6498531,77.028998 L86.0048306,133.184355 C86.6162214,133.782957 87.6074796,133.782957 88.2188704,133.184355 C88.2188796,133.184346 88.2188878,133.184338 88.2188969,133.184331 L145.571,77.028998 C148.016505,74.6345347 151.981544,74.6344449 154.427161,77.028798 C154.427195,77.0288316 154.427229,77.0288653 154.427262,77.028899 L211.782164,133.184331 C212.393554,133.782932 213.384814,133.782932 213.996204,133.184331 L271.350179,77.0300061 C273.79574,74.6355969 277.760778,74.6355969 280.206339,77.0300061 Z' id='WalletConnect'%3E%3C/path%3E %3C/g%3E %3C/g%3E %3C/svg%3E",Ga="WalletConnect",Za=300,Xa="rgb(64, 153, 255)",Ar="walletconnect-wrapper",Ft="walletconnect-style-sheet",Or="walletconnect-qrcode-modal",ec="walletconnect-qrcode-close",Lr="walletconnect-qrcode-text",tc="walletconnect-connect-button";function nc(t){return p.createElement("div",{className:"walletconnect-modal__header"},p.createElement("img",{src:Ya,className:"walletconnect-modal__headerLogo"}),p.createElement("p",null,Ga),p.createElement("div",{className:"walletconnect-modal__close__wrapper",onClick:t.onClose},p.createElement("div",{id:ec,className:"walletconnect-modal__close__icon"},p.createElement("div",{className:"walletconnect-modal__close__line1"}),p.createElement("div",{className:"walletconnect-modal__close__line2"}))))}function rc(t){return p.createElement("a",{className:"walletconnect-connect__button",href:t.href,id:tc+"-"+t.name,onClick:t.onClick,rel:"noopener noreferrer",style:{backgroundColor:t.color},target:"_blank"},t.name)}var oc="data:image/svg+xml,%3Csvg width='8' height='18' viewBox='0 0 8 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.586301 0.213898C0.150354 0.552968 0.0718197 1.18124 0.41089 1.61719L5.2892 7.88931C5.57007 8.25042 5.57007 8.75608 5.2892 9.11719L0.410889 15.3893C0.071819 15.8253 0.150353 16.4535 0.586301 16.7926C1.02225 17.1317 1.65052 17.0531 1.98959 16.6172L6.86791 10.3451C7.7105 9.26174 7.7105 7.74476 6.86791 6.66143L1.98959 0.38931C1.65052 -0.0466374 1.02225 -0.125172 0.586301 0.213898Z' fill='%233C4252'/%3E %3C/svg%3E";function ic(t){var e=t.color,n=t.href,r=t.name,o=t.logo,i=t.onClick;return p.createElement("a",{className:"walletconnect-modal__base__row",href:n,onClick:i,rel:"noopener noreferrer",target:"_blank"},p.createElement("h3",{className:"walletconnect-modal__base__row__h3"},r),p.createElement("div",{className:"walletconnect-modal__base__row__right"},p.createElement("div",{className:"walletconnect-modal__base__row__right__app-icon",style:{background:"url('"+o+"') "+e,backgroundSize:"100%"}}),p.createElement("img",{src:oc,className:"walletconnect-modal__base__row__right__caret"})))}function sc(t){var e=t.color,n=t.href,r=t.name,o=t.logo,i=t.onClick,s=window.innerWidth<768?(r.length>8?2.5:2.7)+"vw":"inherit";return p.createElement("a",{className:"walletconnect-connect__button__icon_anchor",href:n,onClick:i,rel:"noopener noreferrer",target:"_blank"},p.createElement("div",{className:"walletconnect-connect__button__icon",style:{background:"url('"+o+"') "+e,backgroundSize:"100%"}}),p.createElement("div",{style:{fontSize:s},className:"walletconnect-connect__button__text"},r))}var ac=5,Pe=12;function cc(t){var e=T.isAndroid(),n=p.useState(""),r=n[0],o=n[1],i=p.useState(""),s=i[0],a=i[1],c=p.useState(1),h=c[0],_=c[1],v=s?t.links.filter(function(u){return u.name.toLowerCase().includes(s.toLowerCase())}):t.links,b=t.errorMessage,w=s||v.length>ac,E=Math.ceil(v.length/Pe),C=[(h-1)*Pe+1,h*Pe],I=v.length?v.filter(function(u,g){return g+1>=C[0]&&g+1<=C[1]}):[],l=!e&&E>1,d=void 0;function f(u){o(u.target.value),clearTimeout(d),u.target.value?d=setTimeout(function(){a(u.target.value),_(1)},1e3):(o(""),a(""),_(1))}return p.createElement("div",null,p.createElement("p",{id:Lr,className:"walletconnect-qrcode__text"},e?t.text.connect_mobile_wallet:t.text.choose_preferred_wallet),!e&&p.createElement("input",{className:"walletconnect-search__input",placeholder:"Search",value:r,onChange:f}),p.createElement("div",{className:"walletconnect-connect__buttons__wrapper"+(e?"__android":w&&v.length?"__wrap":"")},e?p.createElement(rc,{name:t.text.connect,color:Xa,href:t.uri,onClick:p.useCallback(function(){T.saveMobileLinkInfo({name:"Unknown",href:t.uri})},[])}):I.length?I.map(function(u){var g=u.color,y=u.name,m=u.shortName,S=u.logo,R=T.formatIOSMobile(t.uri,u),k=p.useCallback(function(){T.saveMobileLinkInfo({name:y,href:R})},[I]);return w?p.createElement(sc,{color:g,href:R,name:m||y,logo:S,onClick:k}):p.createElement(ic,{color:g,href:R,name:y,logo:S,onClick:k})}):p.createElement(p.Fragment,null,p.createElement("p",null,b.length?t.errorMessage:t.links.length&&!v.length?t.text.no_wallets_found:t.text.loading))),l&&p.createElement("div",{className:"walletconnect-modal__footer"},Array(E).fill(0).map(function(u,g){var y=g+1,m=h===y;return p.createElement("a",{style:{margin:"auto 10px",fontWeight:m?"bold":"normal"},onClick:function(){return _(y)}},y)})))}function lc(t){var e=!!t.message.trim();return p.createElement("div",{className:"walletconnect-qrcode__notification"+(e?" notification__show":"")},t.message)}var uc=function(t){try{var e="";return Promise.resolve(Mr.toString(t,{margin:0,type:"svg"})).then(function(n){return typeof n=="string"&&(e=n.replace("<svg",'<svg class="walletconnect-qrcode__image"')),e})}catch(n){return Promise.reject(n)}};function dc(t){var e=p.useState(""),n=e[0],r=e[1],o=p.useState(""),i=o[0],s=o[1];p.useEffect(function(){try{return Promise.resolve(uc(t.uri)).then(function(c){s(c)})}catch(c){Promise.reject(c)}},[]);var a=function(){var c=Va(t.uri);c?(r(t.text.copied_to_clipboard),setInterval(function(){return r("")},1200)):(r("Error"),setInterval(function(){return r("")},1200))};return p.createElement("div",null,p.createElement("p",{id:Lr,className:"walletconnect-qrcode__text"},t.text.scan_qrcode_with_wallet),p.createElement("div",{dangerouslySetInnerHTML:{__html:i}}),p.createElement("div",{className:"walletconnect-modal__footer"},p.createElement("a",{onClick:a},t.text.copy_to_clipboard)),p.createElement(lc,{message:n}))}function fc(t){var e=T.isAndroid(),n=T.isMobile(),r=n?t.qrcodeModalOptions&&t.qrcodeModalOptions.mobileLinks?t.qrcodeModalOptions.mobileLinks:void 0:t.qrcodeModalOptions&&t.qrcodeModalOptions.desktopLinks?t.qrcodeModalOptions.desktopLinks:void 0,o=p.useState(!1),i=o[0],s=o[1],a=p.useState(!1),c=a[0],h=a[1],_=p.useState(!n),v=_[0],b=_[1],w={mobile:n,text:t.text,uri:t.uri,qrcodeModalOptions:t.qrcodeModalOptions},E=p.useState(""),C=E[0],I=E[1],l=p.useState(!1),d=l[0],f=l[1],u=p.useState([]),g=u[0],y=u[1],m=p.useState(""),S=m[0],R=m[1],k=function(){c||i||r&&!r.length||g.length>0||p.useEffect(function(){var X=function(){try{if(e)return Promise.resolve();s(!0);var x=Ka(function(){var ee=t.qrcodeModalOptions&&t.qrcodeModalOptions.registryUrl?t.qrcodeModalOptions.registryUrl:T.getWalletRegistryUrl();return Promise.resolve(fetch(ee)).then(function(Pr){return Promise.resolve(Pr.json()).then(function(qr){var Dr=qr.listings,Fr=n?"mobile":"desktop",ue=T.getMobileLinkRegistry(T.formatMobileRegistry(Dr,Fr),r);s(!1),h(!0),R(ue.length?"":t.text.no_supported_wallets),y(ue);var Et=ue.length===1;Et&&(I(T.formatIOSMobile(t.uri,ue[0])),b(!0)),f(Et)})})},function(ee){s(!1),h(!0),R(t.text.something_went_wrong),console.error(ee)});return Promise.resolve(x&&x.then?x.then(function(){}):void 0)}catch(ee){return Promise.reject(ee)}};X()})};k();var F=n?v:!v;return p.createElement("div",{id:Or,className:"walletconnect-qrcode__base animated fadeIn"},p.createElement("div",{className:"walletconnect-modal__base"},p.createElement(nc,{onClose:t.onClose}),d&&v?p.createElement("div",{className:"walletconnect-modal__single_wallet"},p.createElement("a",{onClick:function(){return T.saveMobileLinkInfo({name:g[0].name,href:C})},href:C,rel:"noopener noreferrer",target:"_blank"},t.text.connect_with+" "+(d?g[0].name:"")+" ›")):e||i||!i&&g.length?p.createElement("div",{className:"walletconnect-modal__mobile__toggle"+(F?" right__selected":"")},p.createElement("div",{className:"walletconnect-modal__mobile__toggle_selector"}),n?p.createElement(p.Fragment,null,p.createElement("a",{onClick:function(){return b(!1),k()}},t.text.mobile),p.createElement("a",{onClick:function(){return b(!0)}},t.text.qrcode)):p.createElement(p.Fragment,null,p.createElement("a",{onClick:function(){return b(!0)}},t.text.qrcode),p.createElement("a",{onClick:function(){return b(!1),k()}},t.text.desktop))):null,p.createElement("div",null,v||!e&&!i&&!g.length?p.createElement(dc,Object.assign({},w)):p.createElement(cc,Object.assign({},w,{links:g,errorMessage:S})))))}var hc={choose_preferred_wallet:"Wähle bevorzugte Wallet",connect_mobile_wallet:"Verbinde mit Mobile Wallet",scan_qrcode_with_wallet:"Scanne den QR-code mit einer WalletConnect kompatiblen Wallet",connect:"Verbinden",qrcode:"QR-Code",mobile:"Mobile",desktop:"Desktop",copy_to_clipboard:"In die Zwischenablage kopieren",copied_to_clipboard:"In die Zwischenablage kopiert!",connect_with:"Verbinden mit Hilfe von",loading:"Laden...",something_went_wrong:"Etwas ist schief gelaufen",no_supported_wallets:"Es gibt noch keine unterstützten Wallet",no_wallets_found:"keine Wallet gefunden"},gc={choose_preferred_wallet:"Choose your preferred wallet",connect_mobile_wallet:"Connect to Mobile Wallet",scan_qrcode_with_wallet:"Scan QR code with a WalletConnect-compatible wallet",connect:"Connect",qrcode:"QR Code",mobile:"Mobile",desktop:"Desktop",copy_to_clipboard:"Copy to clipboard",copied_to_clipboard:"Copied to clipboard!",connect_with:"Connect with",loading:"Loading...",something_went_wrong:"Something went wrong",no_supported_wallets:"There are no supported wallets yet",no_wallets_found:"No wallets found"},_c={choose_preferred_wallet:"Elige tu billetera preferida",connect_mobile_wallet:"Conectar a billetera móvil",scan_qrcode_with_wallet:"Escanea el código QR con una billetera compatible con WalletConnect",connect:"Conectar",qrcode:"Código QR",mobile:"Móvil",desktop:"Desktop",copy_to_clipboard:"Copiar",copied_to_clipboard:"Copiado!",connect_with:"Conectar mediante",loading:"Cargando...",something_went_wrong:"Algo salió mal",no_supported_wallets:"Todavía no hay billeteras compatibles",no_wallets_found:"No se encontraron billeteras"},pc={choose_preferred_wallet:"Choisissez votre portefeuille préféré",connect_mobile_wallet:"Se connecter au portefeuille mobile",scan_qrcode_with_wallet:"Scannez le QR code avec un portefeuille compatible WalletConnect",connect:"Se connecter",qrcode:"QR Code",mobile:"Mobile",desktop:"Desktop",copy_to_clipboard:"Copier",copied_to_clipboard:"Copié!",connect_with:"Connectez-vous à l'aide de",loading:"Chargement...",something_went_wrong:"Quelque chose a mal tourné",no_supported_wallets:"Il n'y a pas encore de portefeuilles pris en charge",no_wallets_found:"Aucun portefeuille trouvé"},mc={choose_preferred_wallet:"원하는 지갑을 선택하세요",connect_mobile_wallet:"모바일 지갑과 연결",scan_qrcode_with_wallet:"WalletConnect 지원 지갑에서 QR코드를 스캔하세요",connect:"연결",qrcode:"QR 코드",mobile:"모바일",desktop:"데스크탑",copy_to_clipboard:"클립보드에 복사",copied_to_clipboard:"클립보드에 복사되었습니다!",connect_with:"와 연결하다",loading:"로드 중...",something_went_wrong:"문제가 발생했습니다.",no_supported_wallets:"아직 지원되는 지갑이 없습니다",no_wallets_found:"지갑을 찾을 수 없습니다"},wc={choose_preferred_wallet:"Escolha sua carteira preferida",connect_mobile_wallet:"Conectar-se à carteira móvel",scan_qrcode_with_wallet:"Ler o código QR com uma carteira compatível com WalletConnect",connect:"Conectar",qrcode:"Código QR",mobile:"Móvel",desktop:"Desktop",copy_to_clipboard:"Copiar",copied_to_clipboard:"Copiado!",connect_with:"Ligar por meio de",loading:"Carregamento...",something_went_wrong:"Algo correu mal",no_supported_wallets:"Ainda não há carteiras suportadas",no_wallets_found:"Nenhuma carteira encontrada"},yc={choose_preferred_wallet:"选择你的钱包",connect_mobile_wallet:"连接至移动端钱包",scan_qrcode_with_wallet:"使用兼容 WalletConnect 的钱包扫描二维码",connect:"连接",qrcode:"二维码",mobile:"移动",desktop:"桌面",copy_to_clipboard:"复制到剪贴板",copied_to_clipboard:"复制到剪贴板成功！",connect_with:"通过以下方式连接",loading:"正在加载...",something_went_wrong:"出了问题",no_supported_wallets:"目前还没有支持的钱包",no_wallets_found:"没有找到钱包"},bc={choose_preferred_wallet:"کیف پول مورد نظر خود را انتخاب کنید",connect_mobile_wallet:"به کیف پول موبایل وصل شوید",scan_qrcode_with_wallet:"کد QR را با یک کیف پول سازگار با WalletConnect اسکن کنید",connect:"اتصال",qrcode:"کد QR",mobile:"سیار",desktop:"دسکتاپ",copy_to_clipboard:"کپی به کلیپ بورد",copied_to_clipboard:"در کلیپ بورد کپی شد!",connect_with:"ارتباط با",loading:"...بارگذاری",something_went_wrong:"مشکلی پیش آمد",no_supported_wallets:"هنوز هیچ کیف پول پشتیبانی شده ای وجود ندارد",no_wallets_found:"هیچ کیف پولی پیدا نشد"},$t={de:hc,en:gc,es:_c,fr:pc,ko:mc,pt:wc,zh:yc,fa:bc};function vc(){var t=T.getDocumentOrThrow(),e=t.getElementById(Ft);e&&t.head.removeChild(e);var n=t.createElement("style");n.setAttribute("id",Ft),n.innerText=Qa,t.head.appendChild(n)}function Ec(){var t=T.getDocumentOrThrow(),e=t.createElement("div");return e.setAttribute("id",Ar),t.body.appendChild(e),e}function Br(){var t=T.getDocumentOrThrow(),e=t.getElementById(Or);e&&(e.className=e.className.replace("fadeIn","fadeOut"),setTimeout(function(){var n=t.getElementById(Ar);n&&t.body.removeChild(n)},Za))}function Cc(t){return function(){Br(),t&&t()}}function Sc(){var t=T.getNavigatorOrThrow().language.split("-")[0]||"en";return $t[t]||$t.en}function Ic(t,e,n){vc();var r=Ec();p.render(p.createElement(fc,{text:Sc(),uri:t,onClose:Cc(e),qrcodeModalOptions:n}),r)}function Rc(){Br()}var Ur=function(){return typeof Ne<"u"&&typeof Ne.versions<"u"&&typeof Ne.versions.node<"u"};function kc(t,e,n){console.log(t),Ur()?Ja(t):Ic(t,e,n)}function Tc(){Ur()||Rc()}var Nc={open:kc,close:Tc},xc=Nc;const Mc=Je(xc);class Ac extends uo{constructor(e){super(),this.events=new Ht,this.accounts=[],this.chainId=1,this.pending=!1,this.bridge="https://bridge.walletconnect.org",this.qrcode=!0,this.qrcodeModalOptions=void 0,this.opts=e,this.chainId=(e==null?void 0:e.chainId)||this.chainId,this.wc=this.register(e)}get connected(){return typeof this.wc<"u"&&this.wc.connected}get connecting(){return this.pending}get connector(){return this.wc=this.register(this.opts),this.wc}on(e,n){this.events.on(e,n)}once(e,n){this.events.once(e,n)}off(e,n){this.events.off(e,n)}removeListener(e,n){this.events.removeListener(e,n)}async open(e){if(this.connected){this.onOpen();return}return new Promise((n,r)=>{this.on("error",o=>{r(o)}),this.on("open",()=>{n()}),this.create(e)})}async close(){typeof this.wc>"u"||(this.wc.connected&&this.wc.killSession(),this.onClose())}async send(e){this.wc=this.register(this.opts),this.connected||await this.open(),this.sendPayload(e).then(n=>this.events.emit("payload",n)).catch(n=>this.events.emit("payload",St(e.id,n.message)))}register(e){if(this.wc)return this.wc;this.opts=e||this.opts,this.bridge=e!=null&&e.connector?e.connector.bridge:(e==null?void 0:e.bridge)||"https://bridge.walletconnect.org",this.qrcode=typeof(e==null?void 0:e.qrcode)>"u"||e.qrcode!==!1,this.chainId=typeof(e==null?void 0:e.chainId)<"u"?e.chainId:this.chainId,this.qrcodeModalOptions=e==null?void 0:e.qrcodeModalOptions;const n={bridge:this.bridge,qrcodeModal:this.qrcode?Mc:void 0,qrcodeModalOptions:this.qrcodeModalOptions,storageId:e==null?void 0:e.storageId,signingMethods:e==null?void 0:e.signingMethods,clientMeta:e==null?void 0:e.clientMeta};if(this.wc=typeof(e==null?void 0:e.connector)<"u"?e.connector:new Ls(n),typeof this.wc>"u")throw new Error("Failed to register WalletConnect connector");return this.wc.accounts.length&&(this.accounts=this.wc.accounts),this.wc.chainId&&(this.chainId=this.wc.chainId),this.registerConnectorEvents(),this.wc}onOpen(e){this.pending=!1,e&&(this.wc=e),this.events.emit("open")}onClose(){this.pending=!1,this.wc&&(this.wc=void 0),this.events.emit("close")}onError(e,n="Failed or Rejected Request",r=-32e3){const o={id:e.id,jsonrpc:e.jsonrpc,error:{code:r,message:n}};return this.events.emit("payload",o),o}create(e){this.wc=this.register(this.opts),this.chainId=e||this.chainId,!(this.connected||this.pending)&&(this.pending=!0,this.registerConnectorEvents(),this.wc.createSession({chainId:this.chainId}).then(()=>this.events.emit("created")).catch(n=>this.events.emit("error",n)))}registerConnectorEvents(){this.wc=this.register(this.opts),this.wc.on("connect",e=>{var n,r;if(e){this.events.emit("error",e);return}this.accounts=((n=this.wc)===null||n===void 0?void 0:n.accounts)||[],this.chainId=((r=this.wc)===null||r===void 0?void 0:r.chainId)||this.chainId,this.onOpen()}),this.wc.on("disconnect",e=>{if(e){this.events.emit("error",e);return}this.onClose()}),this.wc.on("modal_closed",()=>{this.events.emit("error",new Error("User closed modal"))}),this.wc.on("session_update",(e,n)=>{const{accounts:r,chainId:o}=n.params[0];(!this.accounts||r&&this.accounts!==r)&&(this.accounts=r,this.events.emit("accountsChanged",r)),(!this.chainId||o&&this.chainId!==o)&&(this.chainId=o,this.events.emit("chainChanged",o))})}async sendPayload(e){this.wc=this.register(this.opts);try{const n=await this.wc.unsafeSend(e);return this.sanitizeResponse(n)}catch(n){return this.onError(e,n.message)}}sanitizeResponse(e){return typeof e.error<"u"&&typeof e.error.code>"u"?St(e.id,e.error.message,e.error.data):e}}class Uc{constructor(e){this.events=new Ht,this.rpc={infuraId:e==null?void 0:e.infuraId,custom:e==null?void 0:e.rpc},this.signer=new It(new Ac(e));const n=this.signer.connection.chainId||(e==null?void 0:e.chainId)||1;this.http=this.setHttpProvider(n),this.registerEventListeners()}get connected(){return this.signer.connection.connected}get connector(){return this.signer.connection.connector}get accounts(){return this.signer.connection.accounts}get chainId(){return this.signer.connection.chainId}get rpcUrl(){var e;return((e=this.http)===null||e===void 0?void 0:e.connection).url||""}async request(e){switch(e.method){case"eth_requestAccounts":return await this.connect(),this.signer.connection.accounts;case"eth_accounts":return this.signer.connection.accounts;case"eth_chainId":return this.signer.connection.chainId}if(Ye.includes(e.method))return this.signer.request(e);if(typeof this.http>"u")throw new Error(`Cannot request JSON-RPC method (${e.method}) without provided rpc url`);return this.http.request(e)}sendAsync(e,n){this.request(e).then(r=>n(null,r)).catch(r=>n(r,void 0))}async enable(){return await this.request({method:"eth_requestAccounts"})}async connect(){this.signer.connection.connected||await this.signer.connect()}async disconnect(){this.signer.connection.connected&&await this.signer.disconnect()}on(e,n){this.events.on(e,n)}once(e,n){this.events.once(e,n)}removeListener(e,n){this.events.removeListener(e,n)}off(e,n){this.events.off(e,n)}get isWalletConnect(){return!0}registerEventListeners(){this.signer.connection.on("accountsChanged",e=>{this.events.emit("accountsChanged",e)}),this.signer.connection.on("chainChanged",e=>{this.http=this.setHttpProvider(e),this.events.emit("chainChanged",e)}),this.signer.on("disconnect",()=>{this.events.emit("disconnect")})}setHttpProvider(e){const n=Rn(e,this.rpc);return typeof n>"u"?void 0:new It(new fo(n))}}export{Uc as default};
