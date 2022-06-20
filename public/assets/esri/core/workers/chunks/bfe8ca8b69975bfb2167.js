"use strict";(self.webpackChunkRemoteClient=self.webpackChunkRemoteClient||[]).push([[7793],{24133:(e,t,n)=>{n.d(t,{Q:()=>a});var i=n(67676),s=n(70586),r=n(44553),o=n(88764);class a{constructor(e=9,t){this.compareMinX=c,this.compareMinY=h,this._toBBox=function(e){return e},this._maxEntries=Math.max(4,e||9),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),t&&("function"==typeof t?this._toBBox=t:this._initFormat(t)),this.clear()}destroy(){this.clear(),I.prune(),b.prune(),S.prune(),w.prune()}all(e){this._all(this.data,e)}search(e,t){let n=this.data;const i=this._toBBox;if(_(e,n))for(I.clear();n;){for(let s=0,r=n.children.length;s<r;s++){const r=n.children[s],o=n.leaf?i(r):r;_(e,o)&&(n.leaf?t(r):y(e,o)?this._all(r,t):I.push(r))}n=I.pop()}}collides(e){let t=this.data;const n=this._toBBox;if(!_(e,t))return!1;for(I.clear();t;){for(let i=0,s=t.children.length;i<s;i++){const s=t.children[i],r=t.leaf?n(s):s;if(_(e,r)){if(t.leaf||y(e,r))return!0;I.push(s)}}t=I.pop()}return!1}load(e){if(!e.length)return this;if(e.length<this._minEntries){for(let t=0,n=e.length;t<n;t++)this.insert(e[t]);return this}let t=this._build(e.slice(0,e.length),0,e.length-1,0);if(this.data.children.length)if(this.data.height===t.height)this._splitRoot(this.data,t);else{if(this.data.height<t.height){const e=this.data;this.data=t,t=e}this._insert(t,this.data.height-t.height-1,!0)}else this.data=t;return this}insert(e){return e&&this._insert(e,this.data.height-1),this}clear(){return this.data=new B([]),this}remove(e){if(!e)return this;let t,n=this.data,r=null,o=0,a=!1;const l=this._toBBox(e);for(S.clear(),w.clear();n||S.length>0;){var d;if(n||(n=(0,s.j0)(S.pop()),r=S.data[S.length-1],o=null!=(d=w.pop())?d:0,a=!0),n.leaf&&(t=(0,i.cq)(n.children,e,n.children.length,n.indexHint),-1!==t))return n.children.splice(t,1),S.push(n),this._condense(S),this;a||n.leaf||!y(n,l)?r?(o++,n=r.children[o],a=!1):n=null:(S.push(n),w.push(o),o=0,r=n,n=n.children[0])}return this}toJSON(){return this.data}fromJSON(e){return this.data=e,this}_all(e,t){let n=e;for(b.clear();n;){var i;if(!0===n.leaf)for(const e of n.children)t(e);else b.pushArray(n.children);n=null!=(i=b.pop())?i:null}}_build(e,t,n,i){const s=n-t+1;let r=this._maxEntries;if(s<=r){const i=new B(e.slice(t,n+1));return l(i,this._toBBox),i}i||(i=Math.ceil(Math.log(s)/Math.log(r)),r=Math.ceil(s/r**(i-1)));const o=new v([]);o.height=i;const a=Math.ceil(s/r),d=a*Math.ceil(Math.sqrt(r));x(e,t,n,d,this.compareMinX);for(let s=t;s<=n;s+=d){const t=Math.min(s+d-1,n);x(e,s,t,a,this.compareMinY);for(let n=s;n<=t;n+=a){const s=Math.min(n+a-1,t);o.children.push(this._build(e,n,s,i-1))}}return l(o,this._toBBox),o}_chooseSubtree(e,t,n,i){for(;i.push(t),!0!==t.leaf&&i.length-1!==n;){let n,i=1/0,s=1/0;for(let r=0,o=t.children.length;r<o;r++){const o=t.children[r],a=f(o),l=m(e,o)-a;l<s?(s=l,i=a<i?a:i,n=o):l===s&&a<i&&(i=a,n=o)}t=n||t.children[0]}return t}_insert(e,t,n){const i=this._toBBox,s=n?e:i(e);S.clear();const r=this._chooseSubtree(s,this.data,t,S);for(r.children.push(e),u(r,s);t>=0&&S.data[t].children.length>this._maxEntries;)this._split(S,t),t--;this._adjustParentBBoxes(s,S,t)}_split(e,t){const n=e.data[t],i=n.children.length,s=this._minEntries;this._chooseSplitAxis(n,s,i);const r=this._chooseSplitIndex(n,s,i);if(!r)return void console.log("  Error: assertion failed at PooledRBush._split: no valid split index");const o=n.children.splice(r,n.children.length-r),a=n.leaf?new B(o):new v(o);a.height=n.height,l(n,this._toBBox),l(a,this._toBBox),t?e.data[t-1].children.push(a):this._splitRoot(n,a)}_splitRoot(e,t){this.data=new v([e,t]),this.data.height=e.height+1,l(this.data,this._toBBox)}_chooseSplitIndex(e,t,n){let i,s,r;i=s=1/0;for(let o=t;o<=n-t;o++){const t=d(e,0,o,this._toBBox),a=d(e,o,n,this._toBBox),l=g(t,a),u=f(t)+f(a);l<i?(i=l,r=o,s=u<s?u:s):l===i&&u<s&&(s=u,r=o)}return r}_chooseSplitAxis(e,t,n){const i=e.leaf?this.compareMinX:c,s=e.leaf?this.compareMinY:h;this._allDistMargin(e,t,n,i)<this._allDistMargin(e,t,n,s)&&e.children.sort(i)}_allDistMargin(e,t,n,i){e.children.sort(i);const s=this._toBBox,r=d(e,0,t,s),o=d(e,n-t,n,s);let a=p(r)+p(o);for(let i=t;i<n-t;i++){const t=e.children[i];u(r,e.leaf?s(t):t),a+=p(r)}for(let i=n-t-1;i>=t;i--){const t=e.children[i];u(o,e.leaf?s(t):t),a+=p(o)}return a}_adjustParentBBoxes(e,t,n){for(let i=n;i>=0;i--)u(t.data[i],e)}_condense(e){for(let t=e.length-1;t>=0;t--){const n=e.data[t];if(0===n.children.length)if(t>0){const s=e.data[t-1],r=s.children;r.splice((0,i.cq)(r,n,r.length,s.indexHint),1)}else this.clear();else l(n,this._toBBox)}}_initFormat(e){const t=["return a"," - b",";"];this.compareMinX=new Function("a","b",t.join(e[0])),this.compareMinY=new Function("a","b",t.join(e[1])),this._toBBox=new Function("a","return {minX: a"+e[0]+", minY: a"+e[1]+", maxX: a"+e[2]+", maxY: a"+e[3]+"};")}}function l(e,t){d(e,0,e.children.length,t,e)}function d(e,t,n,i,s){s||(s=new B([])),s.minX=1/0,s.minY=1/0,s.maxX=-1/0,s.maxY=-1/0;for(let r,o=t;o<n;o++)r=e.children[o],u(s,e.leaf?i(r):r);return s}function u(e,t){e.minX=Math.min(e.minX,t.minX),e.minY=Math.min(e.minY,t.minY),e.maxX=Math.max(e.maxX,t.maxX),e.maxY=Math.max(e.maxY,t.maxY)}function c(e,t){return e.minX-t.minX}function h(e,t){return e.minY-t.minY}function f(e){return(e.maxX-e.minX)*(e.maxY-e.minY)}function p(e){return e.maxX-e.minX+(e.maxY-e.minY)}function m(e,t){return(Math.max(t.maxX,e.maxX)-Math.min(t.minX,e.minX))*(Math.max(t.maxY,e.maxY)-Math.min(t.minY,e.minY))}function g(e,t){const n=Math.max(e.minX,t.minX),i=Math.max(e.minY,t.minY),s=Math.min(e.maxX,t.maxX),r=Math.min(e.maxY,t.maxY);return Math.max(0,s-n)*Math.max(0,r-i)}function y(e,t){return e.minX<=t.minX&&e.minY<=t.minY&&t.maxX<=e.maxX&&t.maxY<=e.maxY}function _(e,t){return t.minX<=e.maxX&&t.minY<=e.maxY&&t.maxX>=e.minX&&t.maxY>=e.minY}function x(e,t,n,i,r){const a=[t,n];for(;a.length;){const t=(0,s.j0)(a.pop()),n=(0,s.j0)(a.pop());if(t-n<=i)continue;const l=n+Math.ceil((t-n)/i/2)*i;(0,o.q)(e,l,n,t,r),a.push(n,l,l,t)}}const I=new r.Z,b=new r.Z,S=new r.Z,w=new r.Z({deallocator:void 0});class F extends class{constructor(){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0}}{constructor(){super(...arguments),this.height=1,this.indexHint=new i.SO}}class B extends F{constructor(e){super(),this.children=e,this.leaf=!0}}class v extends F{constructor(e){super(),this.children=e,this.leaf=!1}}},14808:(e,t,n)=>{n.d(t,{lt:()=>d,WU:()=>a,Qc:()=>u});var i=n(19153),s=n(70171);const r={ar:[".",","],bg:[","," "],bs:[",","."],ca:[",","."],cs:[","," "],da:[",","."],de:[",","."],"de-ch":[".","’"],el:[",","."],en:[".",","],"en-au":[".",","],es:[",","."],"es-mx":[".",","],et:[","," "],fi:[","," "],fr:[","," "],"fr-ch":[","," "],he:[".",","],hi:[".",",","#,##,##0.###"],hr:[",","."],hu:[","," "],id:[",","."],it:[",","."],"it-ch":[".","’"],ja:[".",","],ko:[".",","],lt:[","," "],lv:[","," "],mk:[",","."],nb:[","," "],nl:[",","."],pl:[","," "],pt:[",","."],"pt-pt":[","," "],ro:[",","."],ru:[","," "],sk:[","," "],sl:[",","."],sr:[",","."],sv:[","," "],th:[".",","],tr:[",","."],uk:[","," "],vi:[",","."],zh:[".",","]};function o(e){e||(e=(0,s.Kd)());let t=e in r;if(!t){const n=e.split("-");n.length>1&&n[0]in r&&(e=n[0],t=!0),t||(e="en")}const[n,i,o="#,##0.###"]=r[e];return{decimal:n,group:i,pattern:o}}function a(e,t){const n=o((t={...t}).locale);t.customs=n;const i=t.pattern||n.pattern;return isNaN(e)||Math.abs(e)===1/0?null:function(e,t,n){const i=(n=n||{}).customs.group,s=n.customs.decimal,r=t.split(";"),o=r[0];if(-1!==(t=r[e<0?1:0]||"-"+o).indexOf("%"))e*=100;else if(-1!==t.indexOf("‰"))e*=1e3;else{if(-1!==t.indexOf("¤"))throw new Error("currency notation not supported");if(-1!==t.indexOf("E"))throw new Error("exponential notation not supported")}const a=l,d=o.match(a);if(!d)throw new Error("unable to find a number expression in pattern: "+t);return!1===n.fractional&&(n.places=0),t.replace(a,function(e,t,n){!0===(n=n||{}).places&&(n.places=0),n.places===1/0&&(n.places=6);const i=t.split("."),s="string"==typeof n.places&&n.places.indexOf(",");let r=n.places;s?r=n.places.substring(s+1):r>=0||(r=(i[1]||[]).length),n.round<0||(e=Number(e.toFixed(Number(r))));const o=String(Math.abs(e)).split("."),a=o[1]||"";if(i[1]||n.places){s&&(n.places=n.places.substring(0,s));const e=void 0!==n.places?n.places:i[1]&&i[1].lastIndexOf("0")+1;e>a.length&&(o[1]=a.padEnd(Number(e),"0")),r<a.length&&(o[1]=a.substr(0,Number(r)))}else o[1]&&o.pop();const l=i[0].replace(",","");let d=l.indexOf("0");-1!==d&&(d=l.length-d,d>o[0].length&&(o[0]=o[0].padStart(d,"0")),-1===l.indexOf("#")&&(o[0]=o[0].substr(o[0].length-d)));let u,c,h=i[0].lastIndexOf(",");if(-1!==h){u=i[0].length-h-1;const e=i[0].substr(0,h);h=e.lastIndexOf(","),-1!==h&&(c=e.length-h-1)}const f=[];for(let e=o[0];e;){const t=e.length-u;f.push(t>0?e.substr(t):e),e=t>0?e.slice(0,t):"",c&&(u=c,c=void 0)}return o[0]=f.reverse().join(n.group||","),o.join(n.decimal||".")}(e,d[0],{decimal:s,group:i,places:n.places,round:n.round}))}(e,i,t)}const l=/[#0,]*[#0](?:\.0*#*)?/;function d(e){const t=o((e=e||{}).locale),n=e.pattern||t.pattern,s=t.group,r=t.decimal;let a=1;if(-1!==n.indexOf("%"))a/=100;else if(-1!==n.indexOf("‰"))a/=1e3;else if(-1!==n.indexOf("¤"))throw new Error("currency notation not supported");const d=n.split(";");1===d.length&&d.push("-"+d[0]);const u=h(d,(function(t){return(t="(?:"+(0,i.Qs)(t,".")+")").replace(l,(function(t){const n={signed:!1,separator:e.strict?s:[s,""],fractional:e.fractional,decimal:r,exponent:!1},i=t.split(".");let o=e.places;1===i.length&&1!==a&&(i[1]="###"),1===i.length||0===o?n.fractional=!1:(void 0===o&&(o=e.pattern?i[1].lastIndexOf("0")+1:1/0),o&&null==e.fractional&&(n.fractional=!0),!e.places&&o<i[1].length&&(o+=","+i[1].length),n.places=o);const l=i[0].split(",");return l.length>1&&(n.groupSize=l.pop().length,l.length>1&&(n.groupSize2=l.pop().length)),"("+function(e){"places"in(e=e||{})||(e.places=1/0),"string"!=typeof e.decimal&&(e.decimal="."),"fractional"in e&&!/^0/.test(String(e.places))||(e.fractional=[!0,!1]),"exponent"in e||(e.exponent=[!0,!1]),"eSigned"in e||(e.eSigned=[!0,!1]);const t=c(e),n=h(e.fractional,(function(t){let n="";return t&&0!==e.places&&(n="\\"+e.decimal,e.places===1/0?n="(?:"+n+"\\d+)?":n+="\\d{"+e.places+"}"),n}),!0);let i=t+n;return n&&(i="(?:(?:"+i+")|(?:"+n+"))"),i+h(e.exponent,(function(t){return t?"([eE]"+c({signed:e.eSigned})+")":""}))}(n)+")"}))}),!0);return{regexp:u.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:s,decimal:r,factor:a}}function u(e,t){const n=d(t),i=new RegExp("^"+n.regexp+"$").exec(e);if(!i)return NaN;let s=i[1];if(!i[1]){if(!i[2])return NaN;s=i[2],n.factor*=-1}return s=s.replace(new RegExp("["+n.group+"\\s\\xa0]","g"),"").replace(n.decimal,"."),Number(s)*n.factor}function c(e){return"signed"in(e=e||{})||(e.signed=[!0,!1]),"separator"in e?"groupSize"in e||(e.groupSize=3):e.separator="",h(e.signed,(function(e){return e?"[-+]":""}),!0)+h(e.separator,(function(t){if(!t)return"(?:\\d+)";" "===(t=(0,i.Qs)(t))?t="\\s":" "===t&&(t="\\s\\xa0");const n=e.groupSize,s=e.groupSize2;if(s){const e="(?:0|[1-9]\\d{0,"+(s-1)+"}(?:["+t+"]\\d{"+s+"})*["+t+"]\\d{"+n+"})";return n-s>0?"(?:"+e+"|(?:0|[1-9]\\d{0,"+(n-1)+"}))":e}return"(?:0|[1-9]\\d{0,"+(n-1)+"}(?:["+t+"]\\d{"+n+"})*)"}),!0)}const h=function(e,t,n){if(!(e instanceof Array))return t(e);const i=[];for(let n=0;n<e.length;n++)i.push(t(e[n]));return f(i.join("|"),n)},f=function(e,t){return"("+(t?"?:":"")+e+")"}},70171:(e,t,n)=>{var i,s,r;let o;n.d(t,{Ze:()=>f,Kd:()=>d,qe:()=>c});const a=null!=(i=null==(s=globalThis.esriConfig)?void 0:s.locale)?i:null==(r=globalThis.dojoConfig)?void 0:r.locale;function l(){var e,t;return null!=(e=null!=a?a:null==(t=globalThis.navigator)?void 0:t.language)?e:"en"}function d(){return void 0===o&&(o=l()),o}const u=[];function c(e){return u.push(e),{remove(){u.splice(u.indexOf(e),1)}}}const h=[];function f(e){return h.push(e),{remove(){u.splice(h.indexOf(e),1)}}}null==globalThis.addEventListener||globalThis.addEventListener("languagechange",(function(){const e=null!=undefined?undefined:l();o!==e&&(o=e,[...h].forEach((t=>{t.call(null,e)})),[...u].forEach((t=>{t.call(null,e)})))}))},37549:(e,t,n)=>{n.d(t,{H:()=>o});var i=n(80442),s=n(24133);const r={minX:0,minY:0,maxX:0,maxY:0};class o{constructor(){this._indexInvalid=!1,this._boundsToLoad=[],this._boundsById=new Map,this._idByBounds=new Map,this._index=new s.Q(9,(0,i.Z)("esri-csp-restrictions")?e=>({minX:e[0],minY:e[1],maxX:e[2],maxY:e[3]}):["[0]","[1]","[2]","[3]"]),this._loadIndex=()=>{if(this._indexInvalid){const e=new Array(this._idByBounds.size);let t=0;this._idByBounds.forEach(((n,i)=>{e[t++]=i})),this._indexInvalid=!1,this._index.clear(),this._index.load(e)}else this._boundsToLoad.length&&(this._index.load(this._boundsToLoad.filter((e=>this._idByBounds.has(e)))),this._boundsToLoad.length=0)}}clear(){this._indexInvalid=!1,this._boundsToLoad.length=0,this._boundsById.clear(),this._idByBounds.clear(),this._index.clear()}delete(e){const t=this._boundsById.get(e);this._boundsById.delete(e),t&&(this._idByBounds.delete(t),this._indexInvalid||this._index.remove(t))}forEachInBounds(e,t){this._loadIndex(),function(e,t,n){r.minX=t[0],r.minY=t[1],r.maxX=t[2],r.maxY=t[3],e.search(r,n)}(this._index,e,(e=>t(this._idByBounds.get(e))))}get(e){return this._boundsById.get(e)}has(e){return this._boundsById.has(e)}invalidateIndex(){this._indexInvalid||(this._indexInvalid=!0,this._boundsToLoad.length=0)}set(e,t){if(!this._indexInvalid){const t=this._boundsById.get(e);t&&(this._index.remove(t),this._idByBounds.delete(t))}this._boundsById.set(e,t),t&&(this._idByBounds.set(t,e),this._indexInvalid||(this._boundsToLoad.push(t),this._boundsToLoad.length>5e4&&this._loadIndex()))}}},57191:(e,t,n)=>{n.d(t,{Z:()=>m});var i=n(20102),s=n(32448),r=n(92604),o=n(70586),a=n(60437),l=n(24470),d=n(98732),u=n(37549),c=n(29730),h=n(70272),f=n(5428);const p={getObjectId:e=>e.objectId,getAttributes:e=>e.attributes,getAttribute:(e,t)=>e.attributes[t],cloneWithGeometry:(e,t)=>new h.u_(t,e.attributes,null,e.objectId),getGeometry:e=>e.geometry,getCentroid:(e,t)=>((0,o.Wi)(e.centroid)&&(e.centroid=(0,c.Y)(new f.Z,e.geometry,t.hasZ,t.hasM)),e.centroid)};class m{constructor(e){this.geometryInfo=e,this._boundsStore=new u.H,this._featuresById=new Map,this._markedIds=new Set,this.events=new s.Z,this.featureAdapter=p}get geometryType(){return this.geometryInfo.geometryType}get hasM(){return this.geometryInfo.hasM}get hasZ(){return this.geometryInfo.hasZ}get numFeatures(){return this._featuresById.size}get fullBounds(){if(!this.numFeatures)return null;const e=(0,l.Ue)(l.Gv);return this._featuresById.forEach((t=>{const n=this._boundsStore.get(t.objectId);n&&(e[0]=Math.min(n[0],e[0]),e[1]=Math.min(n[1],e[1]),e[2]=Math.max(n[2],e[2]),e[3]=Math.max(n[3],e[3]))})),e}get storeStatistics(){let e=0;return this._featuresById.forEach((t=>{(0,o.pC)(t.geometry)&&t.geometry.coords&&(e+=t.geometry.coords.length)})),{featureCount:this._featuresById.size,vertexCount:e/(this.hasZ?this.hasM?4:3:this.hasM?3:2)}}add(e){this._add(e),this._emitChanged()}addMany(e){for(const t of e)this._add(t);this._emitChanged()}clear(){this._featuresById.clear(),this._boundsStore.clear(),this._emitChanged()}removeById(e){const t=this._featuresById.get(e);return t?(this._remove(t),this._emitChanged(),t):null}removeManyById(e){this._boundsStore.invalidateIndex();for(const t of e){const e=this._featuresById.get(t);e&&this._remove(e)}this._emitChanged()}forEachBounds(e,t,n){for(const i of e){const e=this._boundsStore.get(i.objectId);e&&t((0,a.JR)(n,e))}}getFeature(e){return this._featuresById.get(e)}has(e){return this._featuresById.has(e)}forEach(e){this._featuresById.forEach((t=>e(t)))}forEachInBounds(e,t){this._boundsStore.forEachInBounds(e,(e=>{t(this._featuresById.get(e))}))}startMarkingUsedFeatures(){this._boundsStore.invalidateIndex(),this._markedIds.clear()}sweep(){let e=!1;this._featuresById.forEach(((t,n)=>{this._markedIds.has(n)||(e=!0,this._remove(t))})),this._markedIds.clear(),e&&this._emitChanged()}_emitChanged(){this.events.emit("changed",void 0)}_add(e){if(!e)return;const t=e.objectId;if(null==t)return void r.Z.getLogger("esri.layers.graphics.data.FeatureStore").error(new i.Z("featurestore:invalid-feature","feature id is missing",{feature:e}));const n=this._featuresById.get(t);let s;if(this._markedIds.add(t),n?(e.displayId=n.displayId,s=this._boundsStore.get(t),this._boundsStore.delete(t)):(0,o.pC)(this.onFeatureAdd)&&this.onFeatureAdd(e),(0,o.Wi)(e.geometry)||!e.geometry.coords||!e.geometry.coords.length)return this._boundsStore.set(t,null),void this._featuresById.set(t,e);s=(0,d.$)((0,o.pC)(s)?s:(0,l.Ue)(),e.geometry,this.geometryInfo.hasZ,this.geometryInfo.hasM),(0,o.pC)(s)&&this._boundsStore.set(t,s),this._featuresById.set(t,e)}_remove(e){return(0,o.pC)(this.onFeatureRemove)&&this.onFeatureRemove(e),this._markedIds.delete(e.objectId),this._boundsStore.delete(e.objectId),this._featuresById.delete(e.objectId),e}}},27793:(e,t,n)=>{n.r(t),n.d(t,{default:()=>j,inferFieldType:()=>L,inferFields:()=>D,inferLocationInfo:()=>q}),n(66577);var i=n(3172),s=n(20102),r=n(92604),o=n(14808),a=n(95330),l=n(17452),d=n(44547),u=n(37455),c=n(8744),h=n(40488),f=n(70272),p=n(5428),m=n(57191),g=n(37427),y=n(7673);const _=/^\s*"([\S\s]*)"\s*$/,x=/""/g,I=[","," ",";","|","\t"];function*b(e,t,n){let i=0;for(;i<=e.length;){const s=e.indexOf(t,i),r=e.substring(i,s>-1?s:void 0);i+=r.length+t.length,n&&!r.trim()||(yield r)}}function S(e){const t=e.includes("\r\n")?"\r\n":"\n";return b(e,t,!0)}function w(e,t){return b(e,t,!1)}function F(e){const t=e.trim();let n=0,i="";for(const e of I){const s=t.split(e).length;s>n&&(n=s,i=e)}return""===i?null:i}function*B(e,t,n,i=(()=>Object.create(null))){let s="",r="",o=0,a=i(),l=0;e:for(const d of e){const e=w(d,n);for(const d of e)if(s+=r+d,r="",o+=v(d),o%2==0){if(o>0){const e=_.exec(s);if(!e){a=i(),l=0,s="",o=0;continue e}a[t[l]]=e[1].replace(x,'"'),l++}else a[t[l]]=s,l++;s="",o=0}else r=n;0===o?(yield a,a=i(),l=0):r="\n"}}function v(e){let t=0,n=0;for(n=e.indexOf('"',n);n>=0;)t++,n=e.indexOf('"',n+1);return t}var E=n(25278),N=n(99514),M=n(35671),T=n(82971);const C=(0,E.bU)("esriGeometryPoint"),Y=["csv"],O=[0,0];class X{constructor(e,t){this.x=e,this.y=t}}class j{constructor(){this._queryEngine=null,this._snapshotFeatures=async e=>{const t=await this._fetch(e);return this._createFeatures(t)}}destroy(){var e;null==(e=this._queryEngine)||e.destroy(),this._queryEngine=null}async load(e,t={}){var n;this.loadOptions=e;const[i]=await Promise.all([this._fetch(t.signal),this._checkProjection(null==e||null==(n=e.parsingOptions)?void 0:n.spatialReference)]),r=function(e,t){const n=t.parsingOptions||{},i={delimiter:n.delimiter,layerDefinition:null,locationInfo:{latitudeFieldName:n.latitudeField,longitudeFieldName:n.longitudeField}},r=S(e);let o=r.next().value;if(!o)throw new s.Z("csv-layer:empty-csv","CSV is empty",{csv:e});if(o=o.trim(),!n.delimiter){const e=F(o);if(!e)throw new s.Z("csv-layer:invalid-delimiter","Unable to detect the delimiter from CSV");i.delimiter=e}const a=o.split(i.delimiter).filter((e=>!!e)),d=i.layerDefinition={name:(0,l.vt)(t.url,Y)||"csv",drawingInfo:C,geometryType:"esriGeometryPoint",objectIdField:null,fields:[],timeInfo:n.timeInfo,extent:{xmin:Number.POSITIVE_INFINITY,ymin:Number.POSITIVE_INFINITY,xmax:Number.NEGATIVE_INFINITY,ymax:Number.NEGATIVE_INFINITY,spatialReference:n.spatialReference||{wkid:102100}}};if(!n.latitudeField||!n.longitudeField){const e=q(a);if(!n.longitudeField&&!e.longitudeFieldName||!n.latitudeField&&!e.latitudeFieldName)throw new s.Z("csv-layer:location-fields-not-found","Unable to identify latitude and longitude fields from the CSV file");i.locationInfo={longitudeFieldName:n.longitudeField||e.longitudeFieldName,latitudeFieldName:n.latitudeField||e.latitudeFieldName}}const u=D(r,i.delimiter,a,i.locationInfo);if(n.fields&&n.fields.length){const e=new Map;for(const t of n.fields)e.set(t.name.toLowerCase(),t);for(const t of u){const n=e.get(t.name.toLowerCase());if(n){const e=t.name;Object.assign(t,n),t.name=e}}}if(d.fields=u,!d.fields.some((e=>"esriFieldTypeOID"===e.type&&(d.objectIdField=e.name,!0)))){const e={name:"__OBJECTID",alias:"__OBJECTID",type:"esriFieldTypeOID",editable:!1,nullable:!1};d.objectIdField=e.name,d.fields.unshift(e)}if(d.timeInfo){const e=new N.Z(d.fields),t=d.timeInfo;if(t.startTimeField){const n=e.get(t.startTimeField);n?(t.startTimeField=n.name,n.type="esriFieldTypeDate"):t.startTimeField=null}if(t.endTimeField){const n=e.get(t.endTimeField);n?(t.endTimeField=n.name,n.type="esriFieldTypeDate"):t.endTimeField=null}if(t.trackIdField){const n=e.get(t.trackIdField);t.trackIdField=n?n.name:null}t.startTimeField||t.endTimeField||(d.timeInfo=null)}return i}(i,e);this.locationInfo=r.locationInfo,this.delimiter=r.delimiter,this._queryEngine=this._createQueryEngine(r);const o=await this._createFeatures(i);if(this._queryEngine.featureStore.addMany(o),r.layerDefinition.extent=this._queryEngine.fullExtent,r.layerDefinition.timeInfo){const{start:e,end:t}=this._queryEngine.timeExtent;r.layerDefinition.timeInfo.timeExtent=[e,t]}return r}async applyEdits(){throw new s.Z("csv-layer:editing-not-supported","applyEdits() is not supported on CSVLayer")}async queryFeatures(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQuery(e,t.signal)}async queryFeatureCount(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForCount(e,t.signal)}async queryObjectIds(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForIds(e,t.signal)}async queryExtent(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForExtent(e,t.signal)}async querySnapping(e,t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForSnapping(e,t.signal)}async refresh(e){var t;return this.loadOptions.customParameters=e,null==(t=this._snapshotTask)||t.abort(),this._snapshotTask=(0,a.vr)(this._snapshotFeatures),this._snapshotTask.promise.then((e=>{this._queryEngine.featureStore.clear(),e&&this._queryEngine.featureStore.addMany(e)}),(e=>{this._queryEngine.featureStore.clear(),(0,a.D_)(e)||r.Z.getLogger("esri.layers.CSVLayer").error(new s.Z("csv-layer:refresh","An error occurred during refresh",{error:e}))})),await this._waitSnapshotComplete(),{extent:this._queryEngine.fullExtent,timeExtent:this._queryEngine.timeExtent}}async _waitSnapshotComplete(){if(this._snapshotTask&&!this._snapshotTask.finished){try{await this._snapshotTask.promise}catch{}return this._waitSnapshotComplete()}}async _fetch(e){const{url:t,customParameters:n}=this.loadOptions;if(!t)throw new s.Z("csv-layer:invalid-source","url not defined");const r=(0,l.mN)(t);return(await(0,i.default)(r.path,{query:{...r.query,...n},responseType:"text",signal:e})).data}_createQueryEngine(e){const{objectIdField:t,fields:n,extent:i,timeInfo:s}=e.layerDefinition,r=new m.Z({geometryType:"esriGeometryPoint",hasM:!1,hasZ:!1});return new y.Z({fields:n,geometryType:"esriGeometryPoint",hasM:!1,hasZ:!1,timeInfo:s,objectIdField:t,spatialReference:i.spatialReference||{wkid:4326},cacheSpatialQueries:!0,featureStore:r})}async _createFeatures(e){const{latitudeFieldName:t,longitudeFieldName:n}=this.locationInfo,{objectIdField:i,fieldsIndex:s,spatialReference:r}=this._queryEngine;let o=[];const a=[],l=s.fields.filter((e=>e.name!==i)).map((e=>e.name));let m=0;const g=S(e);g.next();const y={};for(const e of s.fields)if("esriFieldTypeOID"!==e.type&&"esriFieldTypeGlobalID"!==e.type){const t=(0,M.os)(e);void 0!==t&&(y[e.name]=t)}const _=B(g,l,this.delimiter,(0,E.Dm)(y,i));for(const e of _){const r=this._parseCoordinateValue(e[t]),l=this._parseCoordinateValue(e[n]);if(null!=l&&null!=r&&!isNaN(r)&&!isNaN(l)){e[t]=r,e[n]=l;for(const i in e)if(i!==t&&i!==n)if(s.isDateField(i)){const t=new Date(e[i]);e[i]=P(t,e[i])?t.getTime():null}else if(s.isNumericField(i)){const t=z(e[i]);isNaN(t)?e[i]=null:e[i]=t}e[i]=m,m++,o.push(new X(l,r)),a.push(e)}}if(!(0,c.fS)({wkid:4326},r))if((0,c.sS)(r))for(const e of o)[e.x,e.y]=(0,h.hG)(e.x,e.y,O);else o=(0,d.oj)(u.N,o,T.Z.WGS84,r,null);const x=[];for(let e=0;e<o.length;e++){const{x:t,y:n}=o[e],s=a[e];s[i]=e+1,x.push(new f.u_(new p.Z([],[t,n]),s,null,s[i]))}return x}_parseCoordinateValue(e){if(null==e||""===e)return null;let t=z(e);return(isNaN(t)||Math.abs(t)>181)&&(t=parseFloat(e)),t}async _checkProjection(e){try{await(0,g._W)(c.Zn,e)}catch{throw new s.Z("csv-layer:projection-not-supported","Projection not supported")}}}const Z=["lat","latitude","latitude83","latdecdeg","lat_dd","y","ycenter","point-y"],k=["lon","lng","long","longitude","longitude83","longdecdeg","long_dd","x","xcenter","point-x"];function q(e){const t=e.map((e=>e.toLowerCase()));return{longitudeFieldName:e[t.indexOf(k.find((e=>t.includes(e))))],latitudeFieldName:e[t.indexOf(Z.find((e=>t.includes(e))))]}}function D(e,t,n,i){const s=[],r=B(e,n,t),o=[];for(const e of r){if(10===o.length)break;o.push(e)}for(const e of n)if(e===i.longitudeFieldName||e===i.latitudeFieldName)s.push({name:e,type:"esriFieldTypeDouble",alias:e});else{const t=L(o.map((t=>t[e]))),n={name:e,type:null,alias:e};switch(t){case"integer":n.type="esriFieldTypeInteger";break;case"double":n.type="esriFieldTypeDouble";break;case"date":n.type="esriFieldTypeDate",n.length=36;break;default:n.type="esriFieldTypeString",n.length=255}s.push(n)}return s}function L(e){if(!e.length)return"string";const t=/[^+-.,0-9]/;return e.map((e=>{let n=!1;if(""!==e){if(t.test(e))n=!0;else{let t=z(e);if(!isNaN(t))return/[.,]/.test(e)||!Number.isInteger(t)||t>214783647||t<-214783648?"double":"integer";if(-1===e.indexOf("E"))n=!0;else{if(t=Number(e),!isNaN(t))return"double";if(-1===e.indexOf(","))n=!0;else{if(e=e.replace(",","."),t=Number(e),!isNaN(t))return"double";n=!0}}}return n?/^[-]?\d*[.,]?\d*$/.test(e)?"string":P(new Date(e),e)?"date":"string":"string"}})).reduce(((e,t)=>void 0===e||e===t?t:"string"===e||"string"===t?"string":"double"===e||"double"===t?"double":void 0))}const A=/^((jan(uary)?)|(feb(ruary)?)|(mar(ch)?)|(apr(il)?)|(may)|(jun(e)?)|(jul(y)?)|(aug(ust)?)|(sep(tember)?)|(oct(ober)?)|(nov(ember)?)|(dec(ember)?)|(am)|(pm)|(gmt)|(utc))$/i,R=Number.isNaN(new Date("technology 10").getTime());function P(e,t){if(!e||"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))return!1;let n=!0;if(!R&&/\d+\W*$/.test(t)){const e=t.match(/[a-zA-Z]{2,}/);if(e){let t=!1,i=0;for(;!t&&i<=e.length;)t=!A.test(e[i]),i++;n=!t}}return n}const z=function(){const e=(0,o.lt)(),t=new RegExp("^"+e.regexp+"$"),n=new RegExp("["+e.group+"\\s\\xa0]","g"),i=e.factor;return function(s){const r=t.exec(s);if(e.factor=i,!r)return NaN;let o=r[1];if(!r[1]){if(!r[2])return NaN;o=r[2],e.factor*=-1}return o=o.replace(n,"").replace(e.decimal,"."),+o*e.factor}}()},25278:(e,t,n)=>{n.d(t,{MS:()=>h,Dm:()=>u,Hq:()=>c,bU:()=>a});var i=n(80442),s=n(22974),r=n(61159),o=n(58333);function a(e){return{renderer:{type:"simple",symbol:"esriGeometryPoint"===e||"esriGeometryMultipoint"===e?o.I4:"esriGeometryPolyline"===e?o.ET:o.lF}}}const l=/^[_$a-zA-Z][_$a-zA-Z0-9]*$/;let d=1;function u(e,t){if((0,i.Z)("esri-csp-restrictions"))return()=>({[t]:null,...e});try{let n=`this.${t} = null;`;for(const t in e)n+=`this${l.test(t)?`.${t}`:`["${t}"]`} = ${JSON.stringify(e[t])};`;const i=new Function(`\n      return class AttributesClass$${d++} {\n        constructor() {\n          ${n};\n        }\n      }\n    `)();return()=>new i}catch(n){return()=>({[t]:null,...e})}}function c(e={}){return[{name:"New Feature",description:"",prototype:{attributes:(0,s.d9)(e)}}]}function h(e,t){return{attachment:null,data:{isVersioned:!1,supportsAttachment:!1,supportsM:!1,supportsZ:e},metadata:{supportsAdvancedFieldProperties:!1},operations:{supportsCalculate:!1,supportsTruncate:!1,supportsValidateSql:!1,supportsAdd:t,supportsDelete:t,supportsEditing:t,supportsChangeTracking:!1,supportsQuery:!0,supportsQueryAttachments:!1,supportsResizeAttachments:!1,supportsSync:!1,supportsUpdate:t,supportsExceedsLimitStatistics:!0},query:r.g,queryRelated:{supportsCount:!0,supportsOrderBy:!0,supportsPagination:!0},editing:{supportsGeometryUpdate:t,supportsGlobalId:!1,supportsReturnServiceEditsInSourceSpatialReference:!1,supportsRollbackOnFailure:!1,supportsUpdateWithoutM:!1,supportsUploadWithItemId:!1,supportsDeleteByAnonymous:!1,supportsDeleteByOthers:!1,supportsUpdateByAnonymous:!1,supportsUpdateByOthers:!1}}}},58333:(e,t,n)=>{n.d(t,{I4:()=>s,lF:()=>o,ET:()=>r,qP:()=>a,eG:()=>l,lj:()=>u,wW:()=>d});const i=[252,146,31,255],s={type:"esriSMS",style:"esriSMSCircle",size:6,color:i,outline:{type:"esriSLS",style:"esriSLSSolid",width:.75,color:[153,153,153,255]}},r={type:"esriSLS",style:"esriSLSSolid",width:.75,color:i},o={type:"esriSFS",style:"esriSFSSolid",color:[252,146,31,196],outline:{type:"esriSLS",style:"esriSLSSolid",width:.75,color:[255,255,255,191]}},a={type:"esriTS",color:[255,255,255,255],font:{family:"arial-unicode-ms",size:10,weight:"bold"},horizontalAlignment:"center",kerning:!0,haloColor:[0,0,0,255],haloSize:1,rotated:!1,text:"",xoffset:0,yoffset:0,angle:0},l={type:"esriSMS",style:"esriSMSCircle",color:[0,0,0,255],outline:null,size:10.5},d={type:"esriSLS",style:"esriSLSSolid",color:[0,0,0,255],width:1.5},u={type:"esriSFS",style:"esriSFSSolid",color:[0,0,0,255],outline:null}}}]);