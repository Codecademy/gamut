/*! For license information please see 8976.7ad46ce3.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkgamut_repo=self.webpackChunkgamut_repo||[]).push([[8976],{"./node_modules/@storybook/addon-designs/dist/blocks.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{P0:()=>or});var react=__webpack_require__("./node_modules/react/index.js"),react_namespaceObject=__webpack_require__.t(react,2),theming=__webpack_require__("./node_modules/@storybook/core/dist/theming/index.js"),components=__webpack_require__("./node_modules/@storybook/core/dist/components/index.js");const css_tag_t=window,css_tag_e=css_tag_t.ShadowRoot&&(void 0===css_tag_t.ShadyCSS||css_tag_t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;class css_tag_o{constructor(t,e,n){if(this._$cssResult$=!0,n!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(css_tag_e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(s,t))}return t}toString(){return this.cssText}}const i=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new css_tag_o(n,t,s)},c=css_tag_e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new css_tag_o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t;var reactive_element_s;const reactive_element_e=window,reactive_element_r=reactive_element_e.trustedTypes,h=reactive_element_r?reactive_element_r.emptyScript:"",reactive_element_o=reactive_element_e.reactiveElementPolyfillSupport,reactive_element_n={toAttribute(t,i){switch(i){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},a=(t,i)=>i!==t&&(i==i||t==t),l={attribute:!0,type:String,converter:reactive_element_n,reflect:!1,hasChanged:a},d="finalized";class u extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e))})),t}static createProperty(t,i=l){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e)}}static getPropertyDescriptor(t,i,s){return{get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l}static finalize(){if(this.hasOwnProperty(d))return!1;this[d]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c(i))}else void 0!==i&&s.push(c(i));return s}static _$Ep(t,i){const s=i.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i])}))}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((s,n)=>{css_tag_e?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=css_tag_t.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}))}attributeChangedCallback(t,i,s){this._$AK(t,s)}_$EO(t,i,s=l){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:reactive_element_n).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:reactive_element_n;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek()}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s)}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}var lit_html_t;u[d]=!0,u.elementProperties=new Map,u.elementStyles=[],u.shadowRootOptions={mode:"open"},null==reactive_element_o||reactive_element_o({ReactiveElement:u}),(null!==(reactive_element_s=reactive_element_e.reactiveElementVersions)&&void 0!==reactive_element_s?reactive_element_s:reactive_element_e.reactiveElementVersions=[]).push("1.6.3");const lit_html_i=window,lit_html_s=lit_html_i.trustedTypes,lit_html_e=lit_html_s?lit_html_s.createPolicy("lit-html",{createHTML:t=>t}):void 0,lit_html_n=`lit$${(Math.random()+"").slice(9)}$`,lit_html_l="?"+lit_html_n,lit_html_h=`<${lit_html_l}>`,lit_html_r=document,lit_html_u=()=>lit_html_r.createComment(""),lit_html_d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,lit_html_c=Array.isArray,v=t=>lit_html_c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,lit_html_p=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),lit_html_x=w(1),b=w(2),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=lit_html_r.createTreeWalker(lit_html_r,129,null,!1);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==lit_html_e?lit_html_e.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=lit_html_p):void 0!==c[3]&&(u=lit_html_p):u===lit_html_p?">"===c[0]?(u=null!=l?l:f,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?lit_html_p:'"'===c[3]?$:g):u===$||u===g?u=lit_html_p:u===_||u===m?u=f:(u=lit_html_p,l=void 0);const w=u===lit_html_p&&t[i+1].startsWith("/>")?" ":"";r+=u===f?s+lit_html_h:v>=0?(e.push(d),s.slice(0,v)+"$lit$"+s.slice(v)+lit_html_n+w):s+lit_html_n+(-2===v?(e.push(void 0),i):w)}return[P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(lit_html_n)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+"$lit$").split(lit_html_n),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k})}else v.push({type:6,index:r})}for(const i of t)h.removeAttribute(i)}if(y.test(h.tagName)){const t=h.textContent.split(lit_html_n),i=t.length-1;if(i>0){h.textContent=lit_html_s?lit_html_s.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],lit_html_u()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],lit_html_u())}}}else if(8===h.nodeType)if(h.data===lit_html_l)v.push({type:2,index:r});else{let t=-1;for(;-1!==(t=h.data.indexOf(lit_html_n,t+1));)v.push({type:7,index:r}),t+=lit_html_n.length-1}r++}}static createElement(t,i){const s=lit_html_r.createElement("template");return s.innerHTML=t,s}}function lit_html_S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=lit_html_d(i)?void 0:i._$litDirective$;return(null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=lit_html_S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:lit_html_r).importNode(s,!0);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h]}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++)}return C.currentNode=lit_html_r,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=lit_html_S(this,t,i),lit_html_d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==A&&lit_html_d(this._$AH)?this._$AA.nextSibling.data=t:this.$(lit_html_r.createTextNode(t)),this._$AH=t}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else{const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){lit_html_c(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(lit_html_u()),this.k(lit_html_u()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t))}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=lit_html_S(this,t,i,0),n=!lit_html_d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else{const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=lit_html_S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!lit_html_d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h}n&&!e&&this.j(t)}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class H extends k{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===A?void 0:t}}const I=lit_html_s?lit_html_s.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name)}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5}_$AI(t,i=this){var s;if((t=null!==(s=lit_html_S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){lit_html_S(this,t)}}const B=lit_html_i.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(lit_html_t=lit_html_i.litHtmlVersions)&&void 0!==lit_html_t?lit_html_t:lit_html_i.litHtmlVersions=[]).push("2.8.0");var lit_element_l,lit_element_o;class lit_element_s extends u{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(lit_html_u(),t),t,void 0,null!=s?s:{})}return l._$AI(t),l})(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return T}}lit_element_s.finalized=!0,lit_element_s._$litElement$=!0,null===(lit_element_l=globalThis.litElementHydrateSupport)||void 0===lit_element_l||lit_element_l.call(globalThis,{LitElement:lit_element_s});const lit_element_n=globalThis.litElementPolyfillSupport;null==lit_element_n||lit_element_n({LitElement:lit_element_s});(null!==(lit_element_o=globalThis.litElementVersions)&&void 0!==lit_element_o?lit_element_o:globalThis.litElementVersions=[]).push("3.3.3");const property_i=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(n){n.createProperty(e.key,i)}};function property_n(n){return(t,o)=>void 0!==o?((i,e,n)=>{e.constructor.createProperty(n,i)})(n,t,o):property_i(n,t)}var query_assigned_elements_n;null===(query_assigned_elements_n=window.HTMLSlotElement)||void 0===query_assigned_elements_n||query_assigned_elements_n.prototype.assignedElements;const ErrorMessage=({title,children})=>lit_html_x`
  <div class="error-background">
    <div class="error-container">
      <span class="error-title"
        ><span class="error-badge">Error</span>${title}</span
      >
      <span class="error-description">${children}</span>
    </div>
  </div>
`,ErrorMessage_styles=i`
  .error-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: var(--error-bg);
    color: var(--error-fg);
  }

  .error-container {
    max-width: 800px;
    margin: auto;
    padding: 1em;
  }

  .error-badge {
    display: inline-block;
    font-size: 0.8em;
    padding: 0.2em 0.5em;
    margin-inline-end: 0.5em;

    background: var(--error-color);
    border-radius: 2px;
    color: var(--error-bg);
    text-transform: uppercase;
  }

  .error-title {
    display: block;
    font-size: 1.2em;

    font-weight: bold;
    text-transform: capitalize;
  }

  .error-description {
    display: block;
    margin-block-start: 1em;
  }
`,directive_t_ATTRIBUTE=1;class directive_i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const style_map_o=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends directive_i{constructor(t){var e;if(super(t),t.type!==directive_t_ATTRIBUTE||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ht){this.ht=new Set;for(const t in r)this.ht.add(t);return this.render(r)}this.ht.forEach((t=>{null==r[t]&&(this.ht.delete(t),t.includes("-")?s.removeProperty(t):s[t]="")}));for(const t in r){const e=r[t];if(null!=e){this.ht.add(t);const r="string"==typeof e&&e.endsWith(" !important");t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?"important":""):s[t]=e}}return T}});function absRect(rect){return{top:rect.y,right:rect.x+rect.width,bottom:rect.y+rect.height,left:rect.x}}function round(n){return Math.round(100*n)/100}function extendStyles(left,right){return[...stylesToArray(left),...stylesToArray(right)]}function stylesToArray(styles){return styles?styles instanceof Array?styles:[styles]:[]}var __decorate=function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r};const NodeSelectableMixin=superClass=>{class NodeSelectable extends superClass{constructor(...args){super(...args),this.selectedNode=null}updated(changedProperties){super.updated(changedProperties),changedProperties.has("selectedNode")&&this.dispatchEvent(new CustomEvent("nodeselect",{detail:{selectedNode:this.selectedNode}}))}}return __decorate([property_n({attribute:!1})],NodeSelectable.prototype,"selectedNode",void 0),NodeSelectable};function shouldSkipEvent(ev){return 0===ev.touches.length||ev.touches.length>2}const TouchGestureMixin=superClass=>class CTouchGesture extends superClass{constructor(...args){super(...args),this.previousTouches=null,this.addEventListener("touchstart",(ev=>{shouldSkipEvent(ev)||(ev.preventDefault(),this.previousTouches=ev.touches)})),this.addEventListener("touchend",(ev=>{shouldSkipEvent(ev)||(ev.preventDefault(),this.previousTouches=null)})),this.addEventListener("touchcancel",(ev=>{shouldSkipEvent(ev)||(ev.preventDefault(),this.previousTouches=null)})),this.addEventListener("touchmove",(ev=>{if(shouldSkipEvent(ev))return;const previousTouches=Array.from(this.previousTouches||[]),currentTouches=Array.from(ev.touches);this.previousTouches=ev.touches,currentTouches.length===previousTouches.length&&currentTouches.every((t=>previousTouches.some((pt=>pt.identifier===t.identifier))))&&(1!==currentTouches.length?this.onTouchPinch(function getDistance(a,b){return Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2))}({x:currentTouches[0].pageX,y:currentTouches[0].pageY},{x:previousTouches[0].pageX,y:previousTouches[0].pageY})):this.onTouchPan({x:currentTouches[0].pageX-previousTouches[0].pageX,y:currentTouches[0].pageY-previousTouches[0].pageY}))}))}get isTouching(){return!!(this.previousTouches&&this.previousTouches.length>0)}onTouchPan(delta){}onTouchPinch(delta){}};var PositionedMixin_decorate=function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r},__classPrivateFieldGet=function(receiver,state,kind,f){if("a"===kind&&!f)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof state?receiver!==state||!f:!state.has(receiver))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===kind?f:"a"===kind?f.call(receiver):f?f.value:state.get(receiver)},__classPrivateFieldSet=function(receiver,state,value,kind,f){if("m"===kind)throw new TypeError("Private method is not writable");if("a"===kind&&!f)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof state?receiver!==state||!f:!state.has(receiver))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===kind?f.call(receiver,value):f?f.value=value:state.set(receiver,value),value};const PositionedMixin=superClass=>{var _Positioned_isDragModeOn,_Positioned_movePanel,_Positioned_keyDown,_Positioned_keyUp,_Positioned_listenToKeyboardEvents;class Positioned extends(TouchGestureMixin(superClass)){constructor(...args){super(...args),this.panX=0,this.panY=0,this.scale=1,this.zoomSpeed=500,this.panSpeed=500,_Positioned_isDragModeOn.set(this,!1),_Positioned_movePanel.set(this,((shiftX,shiftY)=>{this.panX+=shiftX/this.scale/window.devicePixelRatio,this.panY+=shiftY/this.scale/window.devicePixelRatio})),_Positioned_keyDown.set(this,(event=>{"Space"!==event.code||__classPrivateFieldGet(this,_Positioned_isDragModeOn,"f")||(__classPrivateFieldSet(this,_Positioned_isDragModeOn,!0,"f"),document.body.style.cursor="grab")})),_Positioned_keyUp.set(this,(event=>{"Space"===event.code&&__classPrivateFieldGet(this,_Positioned_isDragModeOn,"f")&&(__classPrivateFieldSet(this,_Positioned_isDragModeOn,!1,"f"),document.body.style.cursor="auto")})),_Positioned_listenToKeyboardEvents.set(this,(()=>{document.addEventListener("keyup",__classPrivateFieldGet(this,_Positioned_keyUp,"f")),document.addEventListener("keydown",__classPrivateFieldGet(this,_Positioned_keyDown,"f"))})),this.addEventListener("wheel",(ev=>{if(this.isMovable)if(ev.preventDefault(),ev.ctrlKey){let{deltaY}=ev;1===ev.deltaMode&&(deltaY*=15);const prevScale=this.scale;this.scale*=1-deltaY/(.5*(1e3-this.zoomSpeed));const offsetX=ev.offsetX-this.offsetWidth/2,offsetY=ev.offsetY-this.offsetHeight/2;this.panX+=offsetX/this.scale-offsetX/prevScale,this.panY+=offsetY/this.scale-offsetY/prevScale}else{const speed=.002*this.panSpeed;this.panX-=ev.deltaX*speed/this.scale,this.panY-=ev.deltaY*speed/this.scale}}),{passive:!1});let gestureStartScale=1;this.addEventListener("gesturestart",(ev=>{ev.preventDefault(),gestureStartScale=this.scale})),this.addEventListener("gesturechange",(_ev=>{const ev=_ev;ev.preventDefault(),this.scale=gestureStartScale*ev.scale})),this.addEventListener("pointermove",(ev=>{4&ev.buttons&&(ev.preventDefault(),__classPrivateFieldGet(this,_Positioned_movePanel,"f").call(this,ev.movementX,ev.movementY))})),__classPrivateFieldGet(this,_Positioned_listenToKeyboardEvents,"f").call(this),this.onmousedown=()=>{__classPrivateFieldGet(this,_Positioned_isDragModeOn,"f")&&(document.body.style.cursor="grabbing",this.onmousemove=({movementX,movementY})=>{__classPrivateFieldGet(this,_Positioned_movePanel,"f").call(this,movementX,movementY)},this.onmouseup=()=>{document.body.style.cursor="grab",this.onmousemove=null,this.onmouseup=null})}}get isMovable(){return!0}get canvasTransform(){return[`scale(${this.scale})`,`translate(${this.panX}px, ${this.panY}px)`]}disconnectedCallback(){document.removeEventListener("keyup",__classPrivateFieldGet(this,_Positioned_keyUp,"f")),document.removeEventListener("keydown",__classPrivateFieldGet(this,_Positioned_keyDown,"f")),super.disconnectedCallback()}updated(changedProperties){super.updated(changedProperties),changedProperties.has("scale")&&this.dispatchEvent(new CustomEvent("scalechange",{detail:{scale:this.scale}})),(changedProperties.has("panX")||changedProperties.has("panY"))&&this.dispatchEvent(new CustomEvent("positionchange",{detail:{x:this.panX,y:this.panY}}))}onTouchPan(delta){this.panX+=delta.x/this.scale,this.panY+=delta.y/this.scale}onTouchPinch(delta){this.scale*=1-delta/1e3}}return _Positioned_isDragModeOn=new WeakMap,_Positioned_movePanel=new WeakMap,_Positioned_keyDown=new WeakMap,_Positioned_keyUp=new WeakMap,_Positioned_listenToKeyboardEvents=new WeakMap,PositionedMixin_decorate([property_n({attribute:!1})],Positioned.prototype,"panX",void 0),PositionedMixin_decorate([property_n({attribute:!1})],Positioned.prototype,"panY",void 0),PositionedMixin_decorate([property_n({attribute:!1})],Positioned.prototype,"scale",void 0),PositionedMixin_decorate([property_n({type:Number,attribute:"zoom-speed"})],Positioned.prototype,"zoomSpeed",void 0),PositionedMixin_decorate([property_n({type:Number,attribute:"pan-speed"})],Positioned.prototype,"panSpeed",void 0),Positioned},guidesCache=new Map,Guides=({node,distanceTo,reverseScale,fontSize})=>{const combinedId=node.id+"\n"+distanceTo.id;let guides=guidesCache.get(combinedId);return guides||(guides=function getDistanceGuides(selected,compared){const a=absRect(selected),b=absRect(compared),isYIntersecting=!(a.top>b.bottom||a.bottom<b.top),isXIntersecting=!(a.left>b.right||a.right<b.left);if(isXIntersecting&&isYIntersecting){const intersectCenter={x:(Math.max(a.left,b.left)+Math.min(a.right,b.right))/2,y:(Math.max(a.top,b.top)+Math.min(a.bottom,b.bottom))/2};return[{points:[{x:a.left,y:intersectCenter.y},{x:b.left,y:intersectCenter.y}]},{points:[{x:a.right,y:intersectCenter.y},{x:b.right,y:intersectCenter.y}]},{points:[{y:a.top,x:intersectCenter.x},{y:b.top,x:intersectCenter.x}]},{points:[{y:a.bottom,x:intersectCenter.x},{y:b.bottom,x:intersectCenter.x}]}]}const isALeft=a.left>b.right,isABelow=a.top>b.bottom,selectedCenter={x:selected.x+selected.width/2,y:selected.y+selected.height/2};return[isXIntersecting?null:{points:[{x:isALeft?a.left:a.right,y:selectedCenter.y},{x:isALeft?b.right:b.left,y:selectedCenter.y}],bisector:isYIntersecting?void 0:[{x:isALeft?b.right:b.left,y:selectedCenter.y},{x:isALeft?b.right:b.left,y:isABelow?b.bottom:b.top}]},isYIntersecting?null:{points:[{y:isABelow?a.top:a.bottom,x:selectedCenter.x},{y:isABelow?b.bottom:b.top,x:selectedCenter.x}],bisector:isXIntersecting?void 0:[{y:isABelow?b.bottom:b.top,x:selectedCenter.x},{y:isABelow?b.bottom:b.top,x:isALeft?b.right:b.left}]}].filter((x=>!!x))}(node.absoluteBoundingBox,distanceTo.absoluteBoundingBox),guidesCache.set(combinedId,guides)),[...guides.map((guide=>(({guide,reverseScale})=>{const xLength=Math.abs(guide.points[0].x-guide.points[1].x),yLength=Math.abs(guide.points[0].y-guide.points[1].y);return 0===xLength&&0===yLength?null:b`
    <line
      class="distance-line"
      x1=${guide.points[0].x}
      y1=${guide.points[0].y}
      x2=${guide.points[1].x}
      y2=${guide.points[1].y}
    />

    ${guide.bisector&&b`
        <line
          class="distance-line"
          x1=${guide.bisector[0].x}
          y1=${guide.bisector[0].y}
          x2=${guide.bisector[1].x}
          y2=${guide.bisector[1].y}
          style=${style_map_o({strokeDasharray:""+4*reverseScale})}
          shape-rendering="geometricPrecision"
          fill="none"
        />
      `}
  `})({guide,reverseScale}))),...guides.map((guide=>(({guide,reverseScale,fontSize})=>{const xLength=Math.abs(guide.points[0].x-guide.points[1].x),yLength=Math.abs(guide.points[0].y-guide.points[1].y);if(0===xLength&&0===yLength)return null;const text=round(Math.max(xLength,yLength)).toString(10),width=text.length*fontSize*.5,startMargin=.25*fontSize,vPadding=.25*fontSize,hPadding=.5*fontSize,x=xLength>yLength?(guide.points[0].x+guide.points[1].x)/2-width/2:guide.points[0].x,y=xLength>yLength?guide.points[0].y:(guide.points[0].y+guide.points[1].y)/2-fontSize/2,transform=[`scale(${reverseScale})`,xLength>yLength?`translate(0, ${startMargin+vPadding})`:`translate(${startMargin+hPadding}, 0)`].join(" "),cx=x+width/2,transformOrigin=xLength>yLength?`${cx} ${y}`:`${x} ${y+fontSize/2}`;return b`
    <g class="distance-tooltip">
      <rect
        x=${x-hPadding}
        y=${y-vPadding}
        rx="2"
        width=${width+2*hPadding}
        height=${fontSize+2*vPadding}
        transform=${transform}
        transform-origin=${transformOrigin}
        stroke="none"
      />

      <text
        x=${cx}
        y=${y+fontSize-vPadding/2}
        text-anchor="middle"
        transform=${transform}
        transform-origin=${transformOrigin}
        stroke="none"
        fill="white"
        style="font-size: ${fontSize}px"
      >
        ${text}
      </text>
    </g>
  `})({guide,reverseScale,fontSize})))]},DistanceGuide_styles=i`
  .distance-line {
    shape-rendering: geometricPrecision;
    fill: none;
    opacity: 0;
  }

  .distance-tooltip {
    opacity: 0;
  }

  .guide:hover ~ .distance-line,
  .guide:hover ~ .distance-tooltip {
    opacity: 1;
  }
`,CopyIcon=({onClick=()=>{}})=>b`
  <svg @click=${onClick} title="copy icon" width="14" height="14" viewBox="0 0 30 30" fill="none">
  <path d="M21 25.5C21 24.9477 20.5523 24.5 20 24.5C19.4477 24.5 19 24.9477 19 25.5H21ZM13 2H25V0H13V2ZM28 5V21H30V5H28ZM25 24H13V26H25V24ZM10 21V5H8V21H10ZM13 24C11.3431 24 10 22.6569 10 21H8C8 23.7614 10.2386 26 13 26V24ZM28 21C28 22.6569 26.6569 24 25 24V26C27.7614 26 30 23.7614 30 21H28ZM25 2C26.6569 2 28 3.34315 28 5H30C30 2.23858 27.7614 0 25 0V2ZM13 0C10.2386 0 8 2.23858 8 5H10C10 3.34315 11.3431 2 13 2V0ZM16.5 28H5V30H16.5V28ZM2 25V10H0V25H2ZM5 28C3.34315 28 2 26.6569 2 25H0C0 27.7614 2.23858 30 5 30V28ZM5 7H8V5H5V7ZM2 10C2 8.34315 3.34315 7 5 7V5C2.23858 5 0 7.23858 0 10H2ZM16.5 30C18.9853 30 21 27.9853 21 25.5H19C19 26.8807 17.8807 28 16.5 28V30Z" fill="#B3B3B3"/>
</svg>
`,extractColorStyle=color=>0===color.a?"transparent":color.a<1?`rgba(${rgbToIntArray(color).join(", ")}, ${color.a.toFixed(2)})`:rgbToHex(color);class Gradient{constructor(data){this.gradientHandles={start:data.gradientHandlePositions[0],end:data.gradientHandlePositions[1]},this.colors=data.gradientStops,this.colorObjects=this.createColorObjects(this.colors),this.angle=this.calculateAngle(this.gradientHandles.start,this.gradientHandles.end)}get cssGradientArray(){return this.colorObjects.map(((color,index)=>color+" "+this.floatToPercent(this.colors[index].position)))}get cssColor(){const cssGradientArray=this.cssGradientArray;return cssGradientArray.unshift(this.angle+"deg"),`linear-gradient(${cssGradientArray.join(", ")})`}createColorObjects(colors){return colors.map((({color})=>extractColorStyle(color)))}floatToPercent(value){return(value*=100).toFixed(0)+"%"}calculateAngle(startHandle,endHandle){const radians=Math.atan(this.calculateGradient(startHandle,endHandle));return parseInt(this.radToDeg(radians).toFixed(1))}calculateGradient(startHandle,endHandle){return(endHandle.y-startHandle.y)/(endHandle.x-startHandle.x)*-1}radToDeg(radian){return 180*radian/Math.PI}}class NodeStyles{constructor(node){var _a,_b,_c;if(this.hasPadding=!1,this.height=`${Math.trunc(node.absoluteBoundingBox.height)}px`,this.width=`${Math.trunc(node.absoluteBoundingBox.width)}px`,(node.horizontalPadding||node.verticalPadding)&&(this.hasPadding=!0,this.horizontalPadding=`${node.horizontalPadding}px`,this.verticalPadding=`${node.verticalPadding}px`),node.style&&(this.fontFamily=node.style.fontFamily,this.fontPostScriptName=null===(_a=node.style.fontPostScriptName)||void 0===_a?void 0:_a.replace("-"," "),this.fontWeight=node.style.fontWeight,this.fontSize=`${Math.ceil(node.style.fontSize)}px`,this.lineHeight=`${Math.trunc(node.style.lineHeightPx)}px`),node.rectangleCornerRadii&&(this.borderRadius=node.rectangleCornerRadii.filter((radius=>radius===node.cornerRadius)).length<4?`${node.rectangleCornerRadii.join("px ")}px`:`${node.cornerRadius}px`),node.backgroundColor||node.backgroundColor){const color=node.backgroundColor||(null===(_b=node.background)||void 0===_b?void 0:_b[0].color);this.background=extractColorStyle(color)}const fillColor=null===(_c=node.fills)||void 0===_c?void 0:_c[0];if(fillColor&&!1!==fillColor.visible&&("TEXT"===node.type?this.color=extractColorStyle(fillColor.color):fillColor.type.includes("GRADIENT")?this.backgroundImage=new Gradient(fillColor).cssColor:"SOLID"===fillColor.type&&(this.background=extractColorStyle(fillColor.color))),node.strokes&&node.strokes.length>0&&(this.borderColor=extractColorStyle(node.strokes[0].color),this.border=`${node.strokeWeight}px solid ${this.borderColor}`),node.effects&&node.effects.length>0){const{offset,radius,color}=node.effects[0];this.boxShadowColor=extractColorStyle(color),this.boxShadow=`${(null==offset?void 0:offset.x)||0}px ${(null==offset?void 0:offset.y)||0}px 0 ${radius} ${this.boxShadowColor}`}}getStyles(){return[this.height&&{property:"height",value:this.height},this.width&&{property:"width",value:this.width},this.fontFamily&&{property:"font-family",value:this.fontFamily},this.fontSize&&{property:"font-size",value:this.fontSize},this.fontWeight&&{property:"font-weight",value:this.fontWeight},this.lineHeight&&{property:"line-height",value:this.lineHeight},this.borderRadius&&{property:"border-radius",value:this.borderRadius},this.backgroundImage&&{property:"background-image",value:this.backgroundImage},this.boxShadow&&{property:"box-shadow",value:this.boxShadow,color:this.boxShadowColor},this.border&&{property:"border",value:this.border,color:this.borderColor},this.background&&{property:"background",value:this.background,color:this.background},this.color&&{property:"color",value:this.color,color:this.color}].filter(Boolean)}getStyleSheet(){return this.getStyles().map(getStyleRule).join("\n")}}const rgbToIntArray=color=>[Math.trunc(255*color.r),Math.trunc(255*color.g),Math.trunc(255*color.b)],rgbToHex=color=>{const[r,g,b]=rgbToIntArray(color);return"#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)},getStyleRule=({property,value})=>`${property}: ${value};`;var __awaiter=function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){result.done?resolve(result.value):function adopt(value){return value instanceof P?value:new P((function(resolve){resolve(value)}))}(result.value).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))};const copy=text=>__awaiter(void 0,void 0,void 0,(function*(){yield navigator.clipboard.writeText(text)})),View=({node,onClose})=>{if(!node)return null;const nodeStyles=new NodeStyles(node),stopPropagation=ev=>ev.stopPropagation();return lit_html_x`
    <div
      class="inspector-view"
      @click=${stopPropagation}
      @wheel=${stopPropagation}
      @keydown=${stopPropagation}
      @keyup=${stopPropagation}
      @pointermove=${stopPropagation}
    >
      <div class="inspector-section selectable-content">
        <div class="title-section">
          <h4>${node.name}</h4>
          ${(({onClick=()=>{}})=>b`
  <svg @click=${onClick} title="close icon" width="14" height="14" viewBox="0 0 20 20" fill="none">
    <path d="M1 19L19 1M19 19L1 1" stroke="#B3B3B3" stroke-width="2"/>
  </svg>
`)({onClick:onClose})}
        </div>
        <div class="properties-overview">
          <div class="title-section">
            <p class="inspector-property">
              <span>W: </span>${nodeStyles.width}
            </p>
            <p class="inspector-property" style="margin-left: 16px;">
              <span>H: </span>${nodeStyles.height}
            </p>
          </div>
          ${nodeStyles.fontPostScriptName?lit_html_x`<p class="inspector-property">
                <span>Font:</span>
                ${nodeStyles.fontPostScriptName}
              </p>`:null}
        </div>
      </div>
      ${nodeStyles.hasPadding?lit_html_x`<div class="inspector-section">
            <h4>Layout</h4>
            ${nodeStyles.horizontalPadding&&lit_html_x`<p class="inspector-property">
              ${b`
  <svg title="horizontal padding" width="14" height="14" viewBox="0 0 29 28" fill="none">
    <rect x="7" y="8" width="14" height="14" stroke="#B3B3B3" stroke-width="2"/>
    <path d="M27 1V28" stroke="#B3B3B3" stroke-width="2"/>
    <path d="M1 0V28" stroke="#B3B3B3" stroke-width="2"/>
  </svg>
`} ${nodeStyles.horizontalPadding}
            </p>`}
            ${nodeStyles.verticalPadding&&lit_html_x`<p class="inspector-property">
              ${b`
  <svg title="vertical padding" width="14" height="14" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="21" width="14" height="14" transform="rotate(-90 8 21)" stroke="#B3B3B3" stroke-width="2"/>
    <path d="M1 1L28 0.999999" stroke="#B3B3B3" stroke-width="2"/>
    <path d="M0 27L28 27" stroke="#B3B3B3" stroke-width="2"/>
  </svg>
`} ${nodeStyles.verticalPadding}
            </p>`}
          </div>`:null}
      ${node.characters?lit_html_x`<div class="inspector-section">
            <div class="title-section">
              <h4>Content</h4>
              ${CopyIcon({onClick:()=>copy(node.characters)})}
            </div>
            <p class="node-content code-section selectable-content">
              ${node.characters}
            </p>
          </div>`:null}
      ${StylesSection(nodeStyles)}
    </div>
  `},StylesSection=nodeStyles=>{const styles=nodeStyles.getStyles();return lit_html_x`<div class="inspector-section">
    <div class="title-section style-section">
      <h4>CSS</h4>
      ${CopyIcon({onClick:()=>copy(nodeStyles.getStyleSheet())})}
    </div>
    <div class="code-section selectable-content">
      ${styles.map(CSSProperty)}
    </div>
  </div>`},CSSProperty=cssProperty=>{const{property,value,color}=cssProperty;let coloredSquare=null;switch(property){case"background":case"fill":case"border":case"box-shadow":case"color":coloredSquare=lit_html_x`<span
        class="color-preview"
        style="background-color: ${color}"
      ></span>`;break;case"background-image":coloredSquare=lit_html_x`<span
        class="color-preview"
        style="background-image: ${value}"
      ></span>`}return lit_html_x`<div class="css-property" @click=${()=>copy(getStyleRule(cssProperty))}>
    <span>${property}:</span>${coloredSquare}<span class="css-value">${value}</span>;</span>
  </div>`},InspectorView_styles=i`
  .inspector-view {
    height: 100%;
    width: 300px;
    position: absolute;
    right: 0;
    background: white;
    border-left: 1px solid #ccc;
    overflow-y: auto;
    z-index: calc(var(--z-index) + 2);
  }

  .inspector-view h4 {
    font-size: 16px;
    margin: 0;
  }

  .style-section {
    margin-bottom: 12px;
  }

  .title-section {
    display: flex;
    align-items: center;
  }

  .code-section {
    padding: 8px;
    background: #f3f3f3;
    font-family: monospace;
  }

  .title-section svg {
    cursor: pointer;
    margin-left: auto;
  }

  .inspector-section {
    padding: 16px;
    border-bottom: 1px solid #eee;
  }

  .properties-overview {
    font-family: monospace;
    color: #518785;
  }

  .properties-overview p span {
    color: #121212;
  }

  .inspector-property {
    display: flex;
    align-items: center;
    margin-bottom: 0;
  }

  .inspector-property span {
    color: #b3b3b3;
    margin-right: 4px;
  }

  .inspector-property svg {
    margin-right: 8px;
  }

  .css-property {
    margin: 8px;
    transition: background-color ease-in-out 100ms;
  }

  .css-property:hover {
    cursor: pointer;
    background-color: #e8e8e8;
  }

  .css-value {
    color: #518785;
    margin-left: 4px;
  }

  .color-preview {
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 1px solid #ccc;
    margin-left: 4px;
    vertical-align: middle;
  }

  .selectable-content {
    cursor: text;
    user-select: text;
  }
`,Outline=({node,selected=!1,computedThickness,onClick})=>{const{x,y,width,height}=node.absoluteBoundingBox,radius="cornerRadius"in node&&node.cornerRadius?{topLeft:node.cornerRadius,topRight:node.cornerRadius,bottomRight:node.cornerRadius,bottomLeft:node.cornerRadius}:"rectangleCornerRadii"in node&&node.rectangleCornerRadii?{topLeft:node.rectangleCornerRadii[0],topRight:node.rectangleCornerRadii[1],bottomRight:node.rectangleCornerRadii[2],bottomLeft:node.rectangleCornerRadii[3]}:{topLeft:0,topRight:0,bottomRight:0,bottomLeft:0},shift=computedThickness/2,lineTo=(x,y)=>`L${x},${y}`,arcTo=(r,x,y)=>`A${r},${r} 0 0 1 ${x},${y}`,boxPath=[((x,y)=>`M${x},${y}`)(radius.topLeft+shift,shift),lineTo(width-radius.topRight,shift),arcTo(radius.topRight-shift,width-shift,radius.topRight),lineTo(width-shift,height-radius.bottomRight),arcTo(radius.bottomRight-shift,width-radius.bottomRight,height-shift),lineTo(radius.bottomLeft,height-shift),arcTo(radius.bottomLeft-shift,shift,height-radius.bottomLeft),lineTo(shift,radius.topLeft),arcTo(radius.topLeft-shift,radius.topLeft,shift),"Z"].join(" ");return b`
    <path
      class="guide"
      d=${boxPath}
      shape-rendering="geometricPrecision"
      fill="none"
      transform="translate(${x}, ${y})"
      ?data-selected=${selected}
      @click=${onClick}
    />
  `},Node_styles=i`
  .guide {
    /*
     * SVGs cannot be pixel perfect, especially floating values.
     * Since many platform renders them visually incorrectly (probably they
     * are following the spec), it's safe to set overflow to visible.
     * Cropped borders are hard to visible and ugly.
     */
    overflow: visible;

    pointer-events: all;

    opacity: 0;
  }
  .guide:hover {
    opacity: 1;
  }
  .guide[data-selected] {
    opacity: 1;
    stroke: var(--guide-selected-color);
  }

  .tooltip {
    position: absolute;
    padding: 0.25em 0.5em;
    font-size: var(--guide-tooltip-font-size);

    color: var(--guide-selected-tooltip-fg);
    background-color: var(--guide-selected-tooltip-bg);
    border-radius: 2px;
    pointer-events: none;
    z-index: calc(var(--z-index) + 1);

    transform-origin: top center;
  }
`,DAY=864e5,YEAR=365*DAY,intervals=[{gte:YEAR,divisor:YEAR,unit:"year"},{gte:2592e6,divisor:2592e6,unit:"month"},{gte:6048e5,divisor:6048e5,unit:"week"},{gte:DAY,divisor:DAY,unit:"day"},{gte:36e5,divisor:36e5,unit:"hour"},{gte:6e4,divisor:6e4,unit:"minute"},{gte:3e4,divisor:1e3,unit:"seconds"},{gte:0,divisor:1,text:"just now"}],getTime=targetDate=>("object"==typeof targetDate?targetDate:new Date(targetDate)).getTime(),Footer_styles=i`
  .figma-footer {
    flex: 0;
    z-index: calc(var(--z-index) + 1);
    border-top: 1px solid #ccc;
    min-height: 48px;
    padding: 0 16px;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    background-color: #fff;
    overflow-x: auto;
    cursor: pointer;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.8);
  }

  .figma-footer--icon {
    margin-right: 12px;
  }

  .figma-footer--title {
    font-weight: 600;
    margin-right: 4px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .figma-footer--timestamp {
    white-space: nowrap;
    overflow: hidden;
  }
`,Footer=metadata=>{if(!metadata||!metadata.link||void 0===metadata.link||"undefined"===metadata.link)return null;const{link,timestamp,fileName}=metadata;return lit_html_x`<a
    class="figma-footer"
    target="_blank"
    rel="noopener"
    title="Open in Figma"
    href="${link}"
  >
    <span class="figma-footer--icon"> ${b`
  <svg title="figma logo" width="11" height="16" viewBox="0 0 12 17" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.5 1.5h-2c-1.105 0-2 .895-2 2 0 1.105.895 2 2 2h2v-4zm-5 2c0 1.043.533 1.963 1.341 2.5C1.033 6.537.5 7.457.5 8.5c0 1.043.533 1.963 1.341 2.5C1.033 11.537.5 12.457.5 13.5c0 1.657 1.343 3 3 3 1.657 0 3-1.343 3-3V10.736c.53.475 1.232.764 2 .764 1.657 0 3-1.343 3-3 0-1.043-.533-1.963-1.341-2.5.808-.537 1.341-1.457 1.341-2.5 0-1.657-1.343-3-3-3h-5c-1.657 0-3 1.343-3 3zm1 5c0-1.105.895-2 2-2h2v4h-2c-1.105 0-2-.895-2-2zm0 5c0-1.105.895-2 2-2h2v2c0 1.105-.895 2-2 2-1.105 0-2-.895-2-2zm7-3c-1.105 0-2-.895-2-2 0-1.105.895-2 2-2 1.105 0 2 .895 2 2 0 1.105-.895 2-2 2zm0-5h-2v-4h2c1.105 0 2 .895 2 2 0 1.105-.895 2-2 2z"
      fill-rule="evenodd"
      fill-opacity="1"
      fill="#000"
      stroke="none"
    ></path>
  </svg>
`} </span>
    <span class="figma-footer--title"> ${fileName} </span>
    <span
      title="Last time edited: ${new Date(timestamp).toUTCString()}"
      class="figma-footer--timestamp"
    >
      Edited ${((date,nowDate=Date.now(),rft=new Intl.RelativeTimeFormat(void 0,{numeric:"auto"}))=>{const diff=getTime(nowDate)-getTime(date),diffAbs=Math.abs(diff);for(const interval of intervals)if(diffAbs>=interval.gte){const x=Math.round(Math.abs(diff)/interval.divisor),isInFuture=diff<0,intervalUnit=interval.unit;return intervalUnit?rft.format(isInFuture?x:-x,intervalUnit):interval.text}})(timestamp)}
    </span>
  </a>`};var ViewerMixin_decorate=function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r},ViewerMixin_classPrivateFieldGet=function(receiver,state,kind,f){if("a"===kind&&!f)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof state?receiver!==state||!f:!state.has(receiver))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===kind?f:"a"===kind?f.call(receiver):f?f.value:state.get(receiver)},ViewerMixin_classPrivateFieldSet=function(receiver,state,value,kind,f){if("m"===kind)throw new TypeError("Private method is not writable");if("a"===kind&&!f)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof state?receiver!==state||!f:!state.has(receiver))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===kind?f.call(receiver,value):f?f.value=value:state.set(receiver,value),value};const ViewerMixin=superClass=>{var _Viewer_canvasSize,_Viewer_effectMargins,_Viewer_flattenedNodes,_Viewer_handleNodeClick,_Viewer_getNodeById;class Viewer extends(NodeSelectableMixin(PositionedMixin(superClass))){constructor(...args){super(...args),this.zoomMargin=50,this.link="",_Viewer_canvasSize.set(this,void 0),_Viewer_effectMargins.set(this,void 0),_Viewer_flattenedNodes.set(this,void 0),_Viewer_handleNodeClick.set(this,(node=>ev=>{ev.preventDefault(),ev.stopPropagation(),this.selectedNode=node})),_Viewer_getNodeById.set(this,(id=>{var _a,_b;return null!==(_b=null===(_a=ViewerMixin_classPrivateFieldGet(this,_Viewer_flattenedNodes,"f"))||void 0===_a?void 0:_a.find((n=>n.id===id)))&&void 0!==_b?_b:null}))}static get styles(){return extendStyles(super.styles,[i`
          :host {
            --default-error-bg: #fff;
            --default-error-fg: #333;

            --bg: var(--figspec-viewer-bg, #e5e5e5);
            --z-index: var(--figspec-viewer-z-index, 0);
            --error-bg: var(--figspec-viewer-error-bg, var(--default-error-bg));
            --error-fg: var(--figspec-viewer-error-fg, var(--default-error-fg));
            --error-color: var(--figspec-viewer-error-color, tomato);

            --guide-thickness: var(--figspec-viewer-guide-thickness, 1.5px);
            --guide-color: var(--figspec-viewer-guide-color, tomato);
            --guide-selected-color: var(
              --figspec-viewer-guide-selected-color,
              dodgerblue
            );
            --guide-tooltip-fg: var(--figspec-viewer-guide-tooltip-fg, white);
            --guide-selected-tooltip-fg: var(
              --figspec-viewer-guide-selected-tooltip-fg,
              white
            );
            --guide-tooltip-bg: var(
              --figspec-viewer-guide-tooltip-bg,
              var(--guide-color)
            );
            --guide-selected-tooltip-bg: var(
              --figspec-viewer-guide-selected-tooltip-bg,
              var(--guide-selected-color)
            );
            --guide-tooltip-font-size: var(
              --figspec-viewer-guide-tooltip-font-size,
              12px
            );

            position: relative;
            display: block;

            background-color: var(--bg);
            user-select: none;
            overflow: hidden;
            z-index: var(--z-index);
          }

          @media (prefers-color-scheme: dark) {
            :host {
              --default-error-bg: #222;
              --default-error-fg: #fff;
            }
          }

          .spec-canvas-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column-reverse;
          }

          .canvas {
            position: absolute;
            top: 50%;
            left: 50%;
            flex: 1;
          }

          .rendered-image {
            position: absolute;
            top: 0;
            left: 0;
          }

          .guides {
            position: absolute;

            overflow: visible;
            stroke: var(--guide-color);
            fill: var(--guide-color);
            pointer-events: none;
            z-index: calc(var(--z-index) + 2);
          }
        `,Node_styles,ErrorMessage_styles,DistanceGuide_styles,InspectorView_styles,Footer_styles])}get __images(){return{}}deselectNode(){this.selectedNode=null}get error(){return ViewerMixin_classPrivateFieldGet(this,_Viewer_canvasSize,"f")&&ViewerMixin_classPrivateFieldGet(this,_Viewer_flattenedNodes,"f")?null:ErrorMessage({title:"Error",children:"Please call `__updateTree/1` method with a valid parameter."})}render(){if(this.error)return this.error instanceof Error?ErrorMessage({title:this.error.name||"Error",children:this.error.message}):"string"==typeof this.error?ErrorMessage({title:"Error",children:this.error}):this.error;const canvasSize=ViewerMixin_classPrivateFieldGet(this,_Viewer_canvasSize,"f"),reverseScale=1/this.scale,guideThickness=`calc(var(--guide-thickness) * ${reverseScale})`,computedGuideThickness=parseFloat(getComputedStyle(this).getPropertyValue("--guide-thickness")),computedGuideTooltipFontSize=parseFloat(getComputedStyle(this).getPropertyValue("--guide-tooltip-font-size"));return lit_html_x`
        <div class="spec-canvas-wrapper" @click=${this.deselectNode}>
          <div
            class="canvas"
            style="
          width: ${canvasSize.width}px;
          height: ${canvasSize.height}px;

          transform: translate(-50%, -50%) ${this.canvasTransform.join(" ")}
        "
          >
            ${Object.entries(this.__images).map((([nodeId,uri])=>{var _a;const node=ViewerMixin_classPrivateFieldGet(this,_Viewer_getNodeById,"f").call(this,nodeId);if(!node||!("absoluteBoundingBox"in node)||!(null===(_a=ViewerMixin_classPrivateFieldGet(this,_Viewer_effectMargins,"f"))||void 0===_a?void 0:_a[node.id]))return null;const margin=ViewerMixin_classPrivateFieldGet(this,_Viewer_effectMargins,"f")[node.id];return lit_html_x`
                <img
                  class="rendered-image"
                  src="${uri}"
                  style=${style_map_o({top:node.absoluteBoundingBox.y-canvasSize.y+"px",left:node.absoluteBoundingBox.x-canvasSize.x+"px",marginTop:-margin.top+"px",marginLeft:-margin.left+"px",width:node.absoluteBoundingBox.width+margin.left+margin.right+"px",height:node.absoluteBoundingBox.height+margin.top+margin.bottom+"px"})}
                />
              `}))}
            ${this.selectedNode&&(({nodeSize:{x,y,width,height},offsetX,offsetY,reverseScale})=>lit_html_x`
    <div class="tooltip" style="${style_map_o({top:`${offsetY+y+height}px`,left:`${offsetX+x+width/2}px`,transform:`translateX(-50%) scale(${reverseScale}) translateY(0.25em)`})}">
      ${round(width)} x ${round(height)}
    </div>
  `)({nodeSize:this.selectedNode.absoluteBoundingBox,offsetX:-canvasSize.x,offsetY:-canvasSize.y,reverseScale})}
            ${b`
            <svg
              class="guides"
              viewBox="0 0 ${canvasSize.width} ${canvasSize.height}"
              width=${canvasSize.width}
              height=${canvasSize.height}
              style=${style_map_o({left:-canvasSize.x+"px",top:-canvasSize.y+"px",strokeWidth:guideThickness})}
            >
              ${this.selectedNode&&Outline({node:this.selectedNode,selected:!0,computedThickness:computedGuideThickness*reverseScale})}

              ${ViewerMixin_classPrivateFieldGet(this,_Viewer_flattenedNodes,"f").map((node=>{var _a;return node.id===(null===(_a=this.selectedNode)||void 0===_a?void 0:_a.id)?null:b`
                  <g>
                    ${Outline({node,computedThickness:computedGuideThickness*reverseScale,onClick:ViewerMixin_classPrivateFieldGet(this,_Viewer_handleNodeClick,"f").call(this,node)})}
                    ${this.selectedNode&&Guides({node,distanceTo:this.selectedNode,reverseScale,fontSize:computedGuideTooltipFontSize})}
                  </g>
                `}))}
            </svg>
          `}
          </div>
          ${View({node:this.selectedNode,onClose:this.deselectNode})}
          ${Footer(this.getMetadata())}
        </div>
      `}getMetadata(){}connectedCallback(){super.connectedCallback(),this.resetZoom()}updated(changedProperties){super.updated(changedProperties)}__updateTree(node){if("CANVAS"!==node.type&&"FRAME"!==node.type&&"COMPONENT"!==node.type&&"COMPONENT_SET"!==node.type)throw new Error("Cannot update node tree: Top level node MUST be one of CANVAS, FRAME, COMPONENT, or COMPONENT_SET");ViewerMixin_classPrivateFieldSet(this,_Viewer_canvasSize,"CANVAS"===node.type?function getCanvasSize(node){const left=[],right=[],top=[],bottom=[];for(const child of node.children){if("FRAME"!==child.type&&"COMPONENT"!==child.type)continue;const{x,y,width,height}=child.absoluteBoundingBox;left.push(x),right.push(x+width),top.push(y),bottom.push(y+height)}const minX=Math.min(...left),minY=Math.min(...top);return{x:minX,y:minY,width:Math.abs(Math.max(...right)-minX),height:Math.abs(Math.min(...bottom)-minY)}}(node):node.absoluteBoundingBox,"f"),ViewerMixin_classPrivateFieldSet(this,_Viewer_flattenedNodes,flattenNode(node),"f"),this.requestUpdate()}__updateEffectMargins(){if(!this.__images)return;const containers=Object.keys(this.__images).map(ViewerMixin_classPrivateFieldGet(this,_Viewer_getNodeById,"f")).filter((n=>!!n));ViewerMixin_classPrivateFieldSet(this,_Viewer_effectMargins,containers.reduce(((margin,node)=>"absoluteBoundingBox"in node?Object.assign(Object.assign({},margin),{[node.id]:getEffectMargin(node,flattenNode(node))}):margin),{}),"f"),this.requestUpdate()}resetZoom(){if(ViewerMixin_classPrivateFieldGet(this,_Viewer_canvasSize,"f")){const{width,height}=ViewerMixin_classPrivateFieldGet(this,_Viewer_canvasSize,"f"),{width:elementWidth,height:elementHeight}=this.getBoundingClientRect(),wDiff=elementWidth/(width+2*this.zoomMargin),hDiff=elementHeight/(height+2*this.zoomMargin);this.scale=Math.min(wDiff,hDiff,1)}}}return _Viewer_canvasSize=new WeakMap,_Viewer_effectMargins=new WeakMap,_Viewer_flattenedNodes=new WeakMap,_Viewer_handleNodeClick=new WeakMap,_Viewer_getNodeById=new WeakMap,ViewerMixin_decorate([property_n({type:Number,attribute:"zoom-margin"})],Viewer.prototype,"zoomMargin",void 0),ViewerMixin_decorate([property_n({type:String,attribute:"link"})],Viewer.prototype,"link",void 0),Viewer};function getEffectMargin(container,nodes){const points=nodes.map((node=>{if(!("effects"in node))return{top:node.absoluteBoundingBox.y,right:node.absoluteBoundingBox.x+node.absoluteBoundingBox.width,bottom:node.absoluteBoundingBox.y+node.absoluteBoundingBox.height,left:node.absoluteBoundingBox.x};const blurRadiuses=node.effects.filter((effect=>effect.visible&&"LAYER_BLUR"===effect.type)).map((effect=>effect.radius)),shadowMargins=node.effects.filter((effect=>effect.visible&&"DROP_SHADOW"===effect.type&&!!effect.offset)).map((effect=>({left:effect.radius-effect.offset.x,top:effect.radius-effect.offset.y,right:effect.radius+effect.offset.x,bottom:effect.radius+effect.offset.y}))),margin_top=Math.max(0,...blurRadiuses,...shadowMargins.map((margin=>margin.top))),margin_right=Math.max(0,...blurRadiuses,...shadowMargins.map((margin=>margin.right))),margin_bottom=Math.max(0,...blurRadiuses,...shadowMargins.map((margin=>margin.bottom))),margin_left=Math.max(0,...blurRadiuses,...shadowMargins.map((margin=>margin.left)));return{top:node.absoluteBoundingBox.y-margin_top,right:node.absoluteBoundingBox.x+node.absoluteBoundingBox.width+margin_right,bottom:node.absoluteBoundingBox.y+node.absoluteBoundingBox.height+margin_bottom,left:node.absoluteBoundingBox.x-margin_left}})),bounds_top=Math.min(...points.map((p=>p.top))),bounds_right=Math.max(...points.map((p=>p.right))),bounds_bottom=Math.max(...points.map((p=>p.bottom))),bounds_left=Math.min(...points.map((p=>p.left)));return{top:container.absoluteBoundingBox.y-bounds_top,right:bounds_right-container.absoluteBoundingBox.x-container.absoluteBoundingBox.width,bottom:bounds_bottom-container.absoluteBoundingBox.y-container.absoluteBoundingBox.height,left:container.absoluteBoundingBox.x-bounds_left}}function flattenNode(node,depth=0){return"absoluteBoundingBox"in node?"children"in node&&0!==node.children.length?[Object.assign(Object.assign({},node),{depth}),...node.children.map((child=>flattenNode(child,depth+1))).flat()]:[Object.assign(Object.assign({},node),{depth})]:node.children.map((child=>flattenNode(child,depth+1))).flat()}var FigspecFrameViewer_decorate=function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r};class FigspecFrameViewer extends(ViewerMixin(lit_element_s)){constructor(){super(...arguments),this.nodes=null,this.renderedImage=null}get isMovable(){return!!(this.nodes&&this.renderedImage&&this.documentNode)}get documentNode(){if(!this.nodes)return null;const documentNode=Object.values(this.nodes.nodes)[0];return documentNode&&"absoluteBoundingBox"in documentNode.document?documentNode.document:null}get __images(){return this.documentNode&&this.renderedImage?{[this.documentNode.id]:this.renderedImage}:{}}get error(){return this.nodes&&this.renderedImage?this.documentNode?super.error?super.error:void 0:ErrorMessage({title:"Parameter Error",children:lit_html_x`
          <span> Document node is empty or does not have size. </span>
        `}):ErrorMessage({title:"Parameter error",children:lit_html_x`<span>
          Both <code>nodes</code> and <code>rendered-image</code> are required.
        </span>`})}getMetadata(){return{fileName:this.nodes.name,timestamp:this.nodes.lastModified,link:this.link}}connectedCallback(){super.connectedCallback(),this.documentNode&&(this.__updateTree(this.documentNode),this.__updateEffectMargins(),this.resetZoom())}updated(changedProperties){if(super.updated(changedProperties),changedProperties.has("nodes")){if(!this.documentNode)return;this.__updateTree(this.documentNode),this.resetZoom()}changedProperties.has("renderedImage")&&this.__updateEffectMargins()}}FigspecFrameViewer_decorate([property_n({type:Object})],FigspecFrameViewer.prototype,"nodes",void 0),FigspecFrameViewer_decorate([property_n({type:String,attribute:"rendered-image"})],FigspecFrameViewer.prototype,"renderedImage",void 0);var _FigspecFileViewer_selectFirstPage,_FigspecFileViewer_handlePageChange,FigspecFileViewer_decorate=function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r},FigspecFileViewer_classPrivateFieldGet=function(receiver,state,kind,f){if("a"===kind&&!f)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof state?receiver!==state||!f:!state.has(receiver))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===kind?f:"a"===kind?f.call(receiver):f?f.value:state.get(receiver)};class FigspecFileViewer extends(ViewerMixin(lit_element_s)){constructor(){super(...arguments),this.documentNode=null,this.renderedImages=null,this.selectedPage=null,_FigspecFileViewer_selectFirstPage.set(this,(()=>{var _a;this.documentNode?this.selectedPage=null!==(_a=this.documentNode.document.children.filter((c=>"CANVAS"===c.type))[0])&&void 0!==_a?_a:null:this.selectedPage=null})),_FigspecFileViewer_handlePageChange.set(this,(ev=>{var _a,_b;const target=ev.currentTarget;this.selectedPage=null!==(_b=null===(_a=this.documentNode)||void 0===_a?void 0:_a.document.children.find((c=>c.id===target.value)))&&void 0!==_b?_b:null,this.selectedPage&&(this.__updateTree(this.selectedPage),this.resetZoom(),this.__updateEffectMargins(),this.panX=0,this.panY=0)}))}get isMovable(){return!(!this.renderedImages||!this.documentNode)}get __images(){return this.renderedImages||{}}get error(){return this.documentNode&&this.renderedImages?super.error?super.error:void 0:ErrorMessage({title:"Parameter error",children:lit_html_x`<span>
          Both <code>document-node</code> and <code>rendered-images</code> are
          required.
        </span>`})}static get styles(){return extendStyles(super.styles,[i`
        :host {
          --figspec-control-bg-default: #fcfcfc;
          --figspec-control-fg-default: #333;

          --control-bg: var(
            --figspec-control-bg,
            var(--figspec-control-bg-default)
          );
          --control-fg: var(
            --figspec-control-bg,
            var(--figspec-control-fg-default)
          );
          --control-shadow: var(
            --figspec-control-shadow,
            0 2px 4px rgba(0, 0, 0, 0.3)
          );
          --padding: var(--figspec-control-padding, 8px 16px);

          display: flex;
          flex-direction: column;
        }

        @media (prefers-color-scheme: dark) {
          :host {
            --figspec-control-bg-default: #222;
            --figspec-control-fg-default: #fff;
          }
        }

        .controls {
          flex-shrink: 0;
          padding: var(--padding);

          background-color: var(--control-bg);
          box-shadow: var(--control-shadow);
          color: var(--control-fg);
          z-index: 1;
        }

        .view {
          position: relative;
          flex-grow: 1;
          flex-shrink: 1;
        }
      `])}render(){var _a;return lit_html_x`
      <div class="controls">
        <select @change=${FigspecFileViewer_classPrivateFieldGet(this,_FigspecFileViewer_handlePageChange,"f")}>
          ${null===(_a=this.documentNode)||void 0===_a?void 0:_a.document.children.map((c=>lit_html_x`<option value=${c.id}>${c.name}</option>`))}
        </select>
      </div>

      <div class="view">${super.render()}</div>
    `}getMetadata(){return{fileName:this.documentNode.name,timestamp:this.documentNode.lastModified,link:this.link}}connectedCallback(){super.connectedCallback(),this.documentNode&&(FigspecFileViewer_classPrivateFieldGet(this,_FigspecFileViewer_selectFirstPage,"f").call(this),this.selectedPage&&(this.__updateTree(this.selectedPage),this.resetZoom()))}updated(changedProperties){super.updated(changedProperties),changedProperties.has("documentNode")&&(FigspecFileViewer_classPrivateFieldGet(this,_FigspecFileViewer_selectFirstPage,"f").call(this),this.selectedPage&&(this.__updateTree(this.selectedPage),this.resetZoom())),changedProperties.has("renderedImages")&&this.__updateEffectMargins()}}_FigspecFileViewer_selectFirstPage=new WeakMap,_FigspecFileViewer_handlePageChange=new WeakMap,FigspecFileViewer_decorate([property_n({type:Object,attribute:"document-node"})],FigspecFileViewer.prototype,"documentNode",void 0),FigspecFileViewer_decorate([property_n({type:Object,attribute:"rendered-images"})],FigspecFileViewer.prototype,"renderedImages",void 0),customElements.get("figspec-file-viewer")||customElements.define("figspec-file-viewer",FigspecFileViewer),customElements.get("figspec-frame-viewer")||customElements.define("figspec-frame-viewer",FigspecFrameViewer);const create_component_t=new Set(["children","localName","ref","style","className"]),create_component_e=new WeakMap,create_component_n=(t,n,s,i,o)=>{const l=null==o?void 0:o[n];void 0===l||s===i?null==s&&n in HTMLElement.prototype?t.removeAttribute(n):t[n]=s:((t,n,s)=>{let i=create_component_e.get(t);void 0===i&&create_component_e.set(t,i=new Map);let o=i.get(n);void 0!==s?void 0===o?(i.set(n,o={handleEvent:s}),t.addEventListener(n,o)):o.handleEvent=s:void 0!==o&&(i.delete(n),t.removeEventListener(n,o))})(t,l,s)};function create_component_i(e=window.React,i,o,l,d){let a,c,r;if(void 0===i){const t=e;({tagName:c,elementClass:r,events:l,displayName:d}=t),a=t.react}else a=e,r=o,c=i;const h=a.Component,u=a.createElement,f=new Set(Object.keys(null!=l?l:{}));class v extends h{constructor(){super(...arguments),this.o=null}t(t){if(null!==this.o)for(const e in this.i)create_component_n(this.o,e,this.props[e],t?t[e]:void 0,l)}componentDidMount(){var t;this.t(),null===(t=this.o)||void 0===t||t.removeAttribute("defer-hydration")}componentDidUpdate(t){this.t(t)}render(){const{_$Gl:e,...n}=this.props;this.h!==e&&(this.u=t=>{null!==e&&((t,e)=>{"function"==typeof t?t(e):t.current=e})(e,t),this.o=t,this.h=e}),this.i={};const i={ref:this.u};for(const[e,s]of Object.entries(n))create_component_t.has(e)?i["className"===e?"class":e]=s:f.has(e)||e in r.prototype?this.i[e]=s:i[e]=s;return i.suppressHydrationWarning=!0,u(c,i)}}v.displayName=null!=d?d:r.name;const m=a.forwardRef(((t,e)=>u(v,{...t,_$Gl:e},null==t?void 0:t.children)));return m.displayName=v.displayName,m}const es2015_FigspecFrameViewer=create_component_i(react_namespaceObject,"figspec-frame-viewer",FigspecFrameViewer,{onNodeSelect:"nodeselect",onPositionChange:"positionchange",onScaleChange:"scalechange"}),es2015_FigspecFileViewer=create_component_i(react_namespaceObject,"figspec-file-viewer",FigspecFileViewer,{onNodeSelect:"nodeselect",onPositionChange:"positionchange",onScaleChange:"scalechange"});var blocks_P,be,Ce,ve,blocks_$,ke,blocks_B,he=Object.defineProperty,blocks_N=(e,o)=>()=>(e&&(o=e(e=0)),o),blocks_S=blocks_N((()=>{blocks_P=({config:e,defer:o=!1})=>{let[t,r]=(0,react.useState)(o?void 0:e.url),[n,s]=(0,react.useState)(!1);return(0,react.useEffect)((()=>{if(!o)return;let a=requestAnimationFrame((()=>{r(e.url)}));return()=>cancelAnimationFrame(a)}),[o,e.url]),(0,react.useEffect)((()=>{s(!1)}),[t]),(0,theming.Y)("div",{css:be},!n&&(0,theming.Y)(components.Or,{css:Ce},"Loading..."),(0,theming.Y)("iframe",{css:ve,src:t,allowFullScreen:e.allowFullscreen,onLoad:()=>s(!0)}))},be=theming.AH`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  overflow: hidden;
`,Ce=theming.AH`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`,ve=theming.AH`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;

  z-index: 1;
`})),blocks_L=blocks_N((()=>{blocks_S(),blocks_$=/https:\/\/[\w.-]+\.?figma.com\/([\w-]+)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/,ke=e=>blocks_$.test(e),blocks_B=({config:e})=>{let o=(0,react.useMemo)((()=>ke(e.url)?{url:`https://www.figma.com/embed?embed_host=${e.embedHost||location.hostname}&url=${e.url}`,allowFullscreen:e.allowFullscreen}:(console.warn("[storybook-addon-designs] The URL you specified is not valid Figma URL.\nThe addon fallbacks to normal iframe mode.For more detail, please check <https://www.figma.com/developers/embed>."),e)),[e.url,e.allowFullscreen,e.embedHost]);return(0,theming.Y)(blocks_P,{defer:!0,config:o})}})),q={};function blocks_D(e){return 200!==e.status?Promise.reject(e.statusText):e.json()}function G(e){return"absoluteBoundingBox"in e?[e]:e.children&&0!==e.children.length?e.children.map(G).reduce(((o,t)=>o.concat(t)),[]):[]}((e,o)=>{for(var t in o)he(e,t,{get:o[t],enumerable:!0})})(q,{Figspec:()=>blocks_E,default:()=>Ee});var X,blocks_E,Ee,blocks_H=blocks_N((()=>{blocks_L(),X=theming.AH`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`,blocks_E=({config:e})=>{let[o,t]=(0,react.useState)({state:"loading"});switch((0,react.useEffect)((()=>{let n=!1,s=()=>{n=!0},a=new AbortController;return(async n=>{t({state:"loading"});try{let s=e.url.match(blocks_$);if(!s)throw new Error(e.url+" is not a valid Figma URL.");let[,,a]=s,u=new URL(e.url).searchParams.get("node-id"),F=function De(e){if(e.accessToken)return e.accessToken;try{return{NODE_ENV:"production",NODE_PATH:"",STORYBOOK:"true",PUBLIC_URL:"."}.STORYBOOK_FIGMA_ACCESS_TOKEN??null}catch{return null}}(e);if(!F)throw new Error("Personal Access Token is required.");let c={"X-FIGMA-TOKEN":F},f=new URL(`https://api.figma.com/v1/files/${a}`),i=new URL(`https://api.figma.com/v1/images/${a}`);if(i.searchParams.set("format","svg"),!u){let v=await fetch(f.href,{headers:c,signal:n}).then((k=>blocks_D(k))),ue=G(v.document);i.searchParams.set("ids",ue.map((k=>k.id)).join(","));let ge=await fetch(i.href,{headers:c,signal:n}).then((k=>blocks_D(k)));return void t({state:"fetched",value:{type:"file",props:{documentNode:v,renderedImages:ge.images,link:e.url}}})}f.pathname+="/nodes",f.searchParams.set("ids",u),i.searchParams.set("ids",u);let[g,y]=await Promise.all([fetch(f.href,{headers:c,signal:n}).then((v=>blocks_D(v))),fetch(i.href,{headers:c,signal:n}).then((v=>blocks_D(v)))]);t({state:"fetched",value:{type:"frame",props:{nodes:g,renderedImage:Object.values(y.images)[0],link:e.url}}})}catch(s){if(s instanceof DOMException&&s.code===DOMException.ABORT_ERR)return;console.error(s),t({state:"failed",error:s instanceof Error?s.message:String(s)})}})(a.signal).then(s,s),()=>{n||a.abort()}}),[e.url]),o.state){case"loading":return(0,theming.Y)(components.Or,null,(0,theming.Y)(react.Fragment,null,"Loading Figma file..."));case"failed":return(0,theming.Y)(components.Or,null,(0,theming.Y)(react.Fragment,null,"Failed to load Figma file"),(0,theming.Y)(react.Fragment,null,o.error));case"fetched":return"file"===o.value.type?(0,theming.Y)(es2015_FigspecFileViewer,{css:X,...o.value.props}):(0,theming.Y)(es2015_FigspecFrameViewer,{css:X,...o.value.props})}},Ee=blocks_E}));blocks_L(),blocks_H(),blocks_S();theming.AH`
  position: relative;
  overflow: hidden;

  &:active {
    cursor: move;
  }
`,theming.AH`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`,theming.AH`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`,theming.AH`
  flex-grow: 1;
`,theming.AH`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;

  pointer-events: none;
  border-radius: 1px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
`;blocks_L(),blocks_S();theming.AH`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;blocks_S();(0,react.lazy)((()=>Promise.resolve().then((()=>(blocks_H(),q)))));var lo=theming.I4.div((({theme:e})=>`\n  font-family: ${e.typography.fonts.base};\n  font-size: ${e.typography.size.s3}px;\n  margin: 0;\n`)),mo=theming.I4.div((({theme:e,height:o="60%",collapsed:t})=>`\n  position: relative;\n  width: 100%;\n  height: 0;\n  padding: 0;\n  padding-top: ${t?"3em":"string"==typeof o?o:o+"px"};\n  margin: 25px 0 40px;\n  border: 1px solid ${e.appBorderColor};\n\n  border-radius: ${e.appBorderRadius}px;\n  box-shadow:\n    ${"light"===e.base?"rgba(0, 0, 0, 0.10) 0 1px 3px 0":"rgba(0, 0, 0, 0.20) 0 2px 5px 0"};\n`)),po=(0,theming.I4)(components.Or)`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`,blocks_T=({children:e,collapsable:o=!0,defaultCollapsed:t=!1,placeholder:r,showLink:n=!0,onCollapsedChange:s,...a})=>{let[l,u]=(0,react.useState)(!!t),F=n&&"url"in a;return react.createElement(lo,null,react.createElement(mo,{collapsed:o&&l,...a},o&&l?react.createElement(po,null,r):e,react.createElement(components.E7,{actionItems:[o&&{title:l?"Show":"Hide",onClick:()=>{let c=!l;s&&s(c,l),u(c)}},F&&{title:"Open in new tab",onClick:()=>window.open(a.url,"_blank")}].filter((c=>!!c))})))},or=({placeholder:e,...o})=>react.createElement(blocks_T,{placeholder:e??"Design (Figma)",...o},react.createElement(blocks_B,{config:{type:"figma",...o}}));theming.I4.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  overflow: auto;
`}}]);
//# sourceMappingURL=8976.7ad46ce3.iframe.bundle.js.map