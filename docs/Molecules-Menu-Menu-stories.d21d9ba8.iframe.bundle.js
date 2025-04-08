"use strict";(self.webpackChunkgamut_repo=self.webpackChunkgamut_repo||[]).push([[4542],{"./packages/gamut/src/Tip/ToolTip/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{w:()=>ToolTip});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_Typography__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/gamut/src/Typography/Text.tsx"),_shared_FloatingTip__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/gamut/src/Tip/shared/FloatingTip.tsx"),_shared_InlineTip__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/gamut/src/Tip/shared/InlineTip.tsx"),_shared_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/gamut/src/Tip/shared/types.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const ToolTip=_ref=>{let{alignment="top-center",children,info,placement=_shared_types__WEBPACK_IMPORTED_MODULE_2__.lX.placement,id,hasRepetitiveLabel,hideAriaToolTip,...rest}=_ref;const wrapperRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),[loaded,setLoaded]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{setLoaded(!0)}),[]);const Tip=loaded&&"floating"===placement?_shared_FloatingTip__WEBPACK_IMPORTED_MODULE_3__.Y:_shared_InlineTip__WEBPACK_IMPORTED_MODULE_4__.F,adjustedInfo=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>hasRepetitiveLabel&&"string"==typeof info?info.split(" ").slice(1).join(" "):info),[info,hasRepetitiveLabel]),shouldRenderAriaTip=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>!hideAriaToolTip&&""!==adjustedInfo),[hideAriaToolTip,adjustedInfo]),tipProps={alignment,info,wrapperRef,...rest};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[shouldRenderAriaTip&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Typography__WEBPACK_IMPORTED_MODULE_5__.E,{"aria-hidden":!0,screenreader:!0,id,role:"tooltip",children:adjustedInfo}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Tip,{...tipProps,type:"tool",children})]})};try{ToolTip.displayName="ToolTip",ToolTip.__docgenInfo={description:"",displayName:"ToolTip",props:{placement:{defaultValue:{value:"tipDefaultProps.placement"},description:"",name:"placement",required:!1,type:{name:"enum",value:[{value:'"inline"'},{value:'"floating"'}]}},zIndex:{defaultValue:null,description:"",name:"zIndex",required:!1,type:{name:"number"}},info:{defaultValue:null,description:"",name:"info",required:!0,type:{name:"ReactNode"}},narrow:{defaultValue:null,description:"Forces the tooltip to be its narrowest width. For use along the edges of the page or other tight spaces.",name:"narrow",required:!1,type:{name:"boolean"}},inheritDims:{defaultValue:null,description:"If ToolTipWrapper should inherit the dimensions of the parent element. Can only be used for inline tips.",name:"inheritDims",required:!1,type:{name:"boolean"}},alignment:{defaultValue:{value:"top-center"},description:"",name:"alignment",required:!1,type:{name:"enum",value:[{value:'"bottom-center"'},{value:'"top-center"'}]}},id:{defaultValue:null,description:"Required for accessiblity - the same id needs to be passed to the `aria-describedby` attribute of the element that the tooltip is describing.",name:"id",required:!0,type:{name:"string"}},hasRepetitiveLabel:{defaultValue:null,description:"If your button has a label that is repeated in the first word of the tooltip, you can set this to `true` to avoid repetition. If your info tip is not a string, you cannot do this.",name:"hasRepetitiveLabel",required:!1,type:{name:"boolean"}},hideAriaToolTip:{defaultValue:null,description:"If you would like to forgo the aria-describedby attribute set this to `true`. When using this prop, the `aria-label` should always be identical to the `tip`.",name:"hideAriaToolTip",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Tip/ToolTip/index.tsx#ToolTip"]={docgenInfo:ToolTip.__docgenInfo,name:"ToolTip",path:"packages/gamut/src/Tip/ToolTip/index.tsx#ToolTip"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{N:()=>AnimatePresence});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/react/index.js"),LayoutGroupContext=__webpack_require__("./node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs"),use_constant=__webpack_require__("./node_modules/framer-motion/dist/es/utils/use-constant.mjs"),PresenceContext=__webpack_require__("./node_modules/framer-motion/dist/es/context/PresenceContext.mjs"),MotionConfigContext=__webpack_require__("./node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs");class PopChildMeasure extends react.Component{getSnapshotBeforeUpdate(prevProps){const element=this.props.childRef.current;if(element&&prevProps.isPresent&&!this.props.isPresent){const size=this.props.sizeRef.current;size.height=element.offsetHeight||0,size.width=element.offsetWidth||0,size.top=element.offsetTop,size.left=element.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function PopChild({children,isPresent}){const id=(0,react.useId)(),ref=(0,react.useRef)(null),size=(0,react.useRef)({width:0,height:0,top:0,left:0}),{nonce}=(0,react.useContext)(MotionConfigContext.Q);return(0,react.useInsertionEffect)((()=>{const{width,height,top,left}=size.current;if(isPresent||!ref.current||!width||!height)return;ref.current.dataset.motionPopId=id;const style=document.createElement("style");return nonce&&(style.nonce=nonce),document.head.appendChild(style),style.sheet&&style.sheet.insertRule(`\n          [data-motion-pop-id="${id}"] {\n            position: absolute !important;\n            width: ${width}px !important;\n            height: ${height}px !important;\n            top: ${top}px !important;\n            left: ${left}px !important;\n          }\n        `),()=>{document.head.removeChild(style)}}),[isPresent]),(0,jsx_runtime.jsx)(PopChildMeasure,{isPresent,childRef:ref,sizeRef:size,children:react.cloneElement(children,{ref})})}const PresenceChild=({children,initial,isPresent,onExitComplete,custom,presenceAffectsLayout,mode})=>{const presenceChildren=(0,use_constant.M)(newChildrenMap),id=(0,react.useId)(),memoizedOnExitComplete=(0,react.useCallback)((childId=>{presenceChildren.set(childId,!0);for(const isComplete of presenceChildren.values())if(!isComplete)return;onExitComplete&&onExitComplete()}),[presenceChildren,onExitComplete]),context=(0,react.useMemo)((()=>({id,initial,isPresent,custom,onExitComplete:memoizedOnExitComplete,register:childId=>(presenceChildren.set(childId,!1),()=>presenceChildren.delete(childId))})),presenceAffectsLayout?[Math.random(),memoizedOnExitComplete]:[isPresent,memoizedOnExitComplete]);return(0,react.useMemo)((()=>{presenceChildren.forEach(((_,key)=>presenceChildren.set(key,!1)))}),[isPresent]),react.useEffect((()=>{!isPresent&&!presenceChildren.size&&onExitComplete&&onExitComplete()}),[isPresent]),"popLayout"===mode&&(children=(0,jsx_runtime.jsx)(PopChild,{isPresent,children})),(0,jsx_runtime.jsx)(PresenceContext.t.Provider,{value:context,children})};function newChildrenMap(){return new Map}var use_presence=__webpack_require__("./node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs");const getChildKey=child=>child.key||"";function onlyElements(children){const filtered=[];return react.Children.forEach(children,(child=>{(0,react.isValidElement)(child)&&filtered.push(child)})),filtered}var use_isomorphic_effect=__webpack_require__("./node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs");const AnimatePresence=({children,custom,initial=!0,onExitComplete,presenceAffectsLayout=!0,mode="sync",propagate=!1})=>{const[isParentPresent,safeToRemove]=(0,use_presence.xQ)(propagate),presentChildren=(0,react.useMemo)((()=>onlyElements(children)),[children]),presentKeys=propagate&&!isParentPresent?[]:presentChildren.map(getChildKey),isInitialRender=(0,react.useRef)(!0),pendingPresentChildren=(0,react.useRef)(presentChildren),exitComplete=(0,use_constant.M)((()=>new Map)),[diffedChildren,setDiffedChildren]=(0,react.useState)(presentChildren),[renderedChildren,setRenderedChildren]=(0,react.useState)(presentChildren);(0,use_isomorphic_effect.E)((()=>{isInitialRender.current=!1,pendingPresentChildren.current=presentChildren;for(let i=0;i<renderedChildren.length;i++){const key=getChildKey(renderedChildren[i]);presentKeys.includes(key)?exitComplete.delete(key):!0!==exitComplete.get(key)&&exitComplete.set(key,!1)}}),[renderedChildren,presentKeys.length,presentKeys.join("-")]);const exitingChildren=[];if(presentChildren!==diffedChildren){let nextChildren=[...presentChildren];for(let i=0;i<renderedChildren.length;i++){const child=renderedChildren[i],key=getChildKey(child);presentKeys.includes(key)||(nextChildren.splice(i,0,child),exitingChildren.push(child))}return"wait"===mode&&exitingChildren.length&&(nextChildren=exitingChildren),setRenderedChildren(onlyElements(nextChildren)),void setDiffedChildren(presentChildren)}const{forceRender}=(0,react.useContext)(LayoutGroupContext.L);return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:renderedChildren.map((child=>{const key=getChildKey(child),isPresent=!(propagate&&!isParentPresent)&&(presentChildren===renderedChildren||presentKeys.includes(key));return(0,jsx_runtime.jsx)(PresenceChild,{isPresent,initial:!(isInitialRender.current&&!initial)&&void 0,custom:isPresent?void 0:custom,presenceAffectsLayout,mode,onExitComplete:isPresent?void 0:()=>{if(!exitComplete.has(key))return;exitComplete.set(key,!0);let isEveryExitComplete=!0;exitComplete.forEach((isExitComplete=>{isExitComplete||(isEveryExitComplete=!1)})),isEveryExitComplete&&(null==forceRender||forceRender(),setRenderedChildren(pendingPresentChildren.current),propagate&&(null==safeToRemove||safeToRemove()),onExitComplete&&onExitComplete())},children:child},key)}))})}},"./node_modules/fast-deep-equal/react.js":module=>{module.exports=function equal(a,b){if(a===b)return!0;if(a&&b&&"object"==typeof a&&"object"==typeof b){if(a.constructor!==b.constructor)return!1;var length,i,keys;if(Array.isArray(a)){if((length=a.length)!=b.length)return!1;for(i=length;0!=i--;)if(!equal(a[i],b[i]))return!1;return!0}if(a.constructor===RegExp)return a.source===b.source&&a.flags===b.flags;if(a.valueOf!==Object.prototype.valueOf)return a.valueOf()===b.valueOf();if(a.toString!==Object.prototype.toString)return a.toString()===b.toString();if((length=(keys=Object.keys(a)).length)!==Object.keys(b).length)return!1;for(i=length;0!=i--;)if(!Object.prototype.hasOwnProperty.call(b,keys[i]))return!1;for(i=length;0!=i--;){var key=keys[i];if(("_owner"!==key||!a.$$typeof)&&!equal(a[key],b[key]))return!1}return!0}return a!=a&&b!=b}},"./node_modules/react-use/esm/useMeasure.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_useIsomorphicLayoutEffect__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-use/esm/useIsomorphicLayoutEffect.js"),_util__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-use/esm/util.js"),defaultState={x:0,y:0,width:0,height:0,top:0,left:0,bottom:0,right:0};const __WEBPACK_DEFAULT_EXPORT__=_util__WEBPACK_IMPORTED_MODULE_2__.oc&&window.ResizeObserver?function(){var _a=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),element=_a[0],ref=_a[1],_b=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultState),rect=_b[0],setRect=_b[1],observer=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((function(){return new window.ResizeObserver((function(entries){if(entries[0]){var _a=entries[0].contentRect,x=_a.x,y=_a.y,width=_a.width,height=_a.height,top_1=_a.top,left=_a.left,bottom=_a.bottom,right=_a.right;setRect({x,y,width,height,top:top_1,left,bottom,right})}}))}),[]);return(0,_useIsomorphicLayoutEffect__WEBPACK_IMPORTED_MODULE_1__.A)((function(){if(element)return observer.observe(element),function(){observer.disconnect()}}),[element]),[ref,rect]}:function(){return[function(){},defaultState]}},"./node_modules/react-use/esm/useRafState.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>esm_useRafState});var react=__webpack_require__("./node_modules/react/index.js");const esm_useEffectOnce=function(effect){(0,react.useEffect)(effect,[])};const esm_useUnmount=function(fn){var fnRef=(0,react.useRef)(fn);fnRef.current=fn,esm_useEffectOnce((function(){return function(){return fnRef.current()}}))};const esm_useRafState=function(initialState){var frame=(0,react.useRef)(0),_a=(0,react.useState)(initialState),state=_a[0],setState=_a[1],setRafState=(0,react.useCallback)((function(value){cancelAnimationFrame(frame.current),frame.current=requestAnimationFrame((function(){setState(value)}))}),[]);return esm_useUnmount((function(){cancelAnimationFrame(frame.current)})),[state,setRafState]}},"./node_modules/react-use/esm/useWindowScroll.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_util__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-use/esm/util.js"),_useRafState__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-use/esm/useRafState.js");const __WEBPACK_DEFAULT_EXPORT__=function(){var _a=(0,_useRafState__WEBPACK_IMPORTED_MODULE_1__.A)({x:_util__WEBPACK_IMPORTED_MODULE_2__.oc?window.pageXOffset:0,y:_util__WEBPACK_IMPORTED_MODULE_2__.oc?window.pageYOffset:0}),state=_a[0],setState=_a[1];return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){var handler=function(){setState({x:window.pageXOffset,y:window.pageYOffset})};return window.addEventListener("scroll",handler,{capture:!1,passive:!0}),function(){window.removeEventListener("scroll",handler)}}),[]),state}},"./node_modules/react-use/esm/useWindowSize.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_useRafState__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-use/esm/useRafState.js"),_util__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-use/esm/util.js");const __WEBPACK_DEFAULT_EXPORT__=function(initialWidth,initialHeight){void 0===initialWidth&&(initialWidth=1/0),void 0===initialHeight&&(initialHeight=1/0);var _a=(0,_useRafState__WEBPACK_IMPORTED_MODULE_1__.A)({width:_util__WEBPACK_IMPORTED_MODULE_2__.oc?window.innerWidth:initialWidth,height:_util__WEBPACK_IMPORTED_MODULE_2__.oc?window.innerHeight:initialHeight}),state=_a[0],setState=_a[1];return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){if(_util__WEBPACK_IMPORTED_MODULE_2__.oc){var handler_1=function(){setState({width:window.innerWidth,height:window.innerHeight})};return window.addEventListener("resize",handler_1),function(){window.removeEventListener("resize",handler_1)}}}),[]),state}},"./node_modules/react-use/esm/util.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{oc:()=>isClient});__webpack_require__("./node_modules/fast-deep-equal/react.js");var isClient="object"==typeof window}}]);