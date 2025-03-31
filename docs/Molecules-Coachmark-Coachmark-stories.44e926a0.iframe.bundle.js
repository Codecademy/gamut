"use strict";(self.webpackChunkgamut_repo=self.webpackChunkgamut_repo||[]).push([[9774,7259,3838],{"./packages/gamut-patterns/dist/patterns/CheckerDense.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>CheckerDense});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_props__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/gamut-patterns/dist/props.js"),_usePatternId__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/gamut-patterns/dist/usePatternId.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const CheckerDense=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((_ref,svgRef)=>{let{title="Checker Dense",titleId,...props}=_ref;const patternId=(0,_usePatternId__WEBPACK_IMPORTED_MODULE_2__.J)("CheckerDense");return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_props__WEBPACK_IMPORTED_MODULE_3__.B,{fill:"currentColor",role:"img","aria-hidden":"true",ref:svgRef,"aria-labelledby":titleId,...props,children:[title?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("title",{id:titleId,children:title}):null,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("pattern",{id:patternId,x:0,y:0,width:4,height:4,patternUnits:"userSpaceOnUse",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("rect",{width:1,height:1,fill:"currentColor"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("rect",{x:2,y:2,width:1,height:1,fill:"currentColor"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("rect",{width:"100%",height:"100%",fill:`url(#${patternId})`})]})}));CheckerDense.__docgenInfo={description:"",methods:[],displayName:"CheckerDense"}},"./packages/gamut-patterns/dist/props.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B:()=>Svg});var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js"),_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/gamut-styles/src/index.ts"),_codecademy_variance__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/variance/src/index.ts"),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const patternStyles=_codecademy_variance__WEBPACK_IMPORTED_MODULE_2__.GV.compose(_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.qU.layout,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.qU.positioning,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.qU.space),StyledSvg=(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.A)("svg",_extends({},{target:"e3tf18d0",label:"StyledSvg"},(0,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.W8)()))(patternStyles,""),Svg=(0,react__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(((_ref,ref)=>{let{height="100%",width="100%",...rest}=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(StyledSvg,{height,width,ref,...rest})}));Svg.__docgenInfo={description:"",methods:[],displayName:"Svg"}},"./packages/gamut-patterns/dist/usePatternId.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>usePatternId});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function usePatternId(id){const generatedId=(0,react__WEBPACK_IMPORTED_MODULE_0__.useId)();return(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>`${id}-pattern-${generatedId}`),[id,generatedId])}},"./packages/gamut/src/Button/FillButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{S:()=>FillButton});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_shared__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/gamut/src/Button/shared/styles.ts"),_shared__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/gamut/src/Button/shared/variants.ts"),_shared__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/gamut/src/Button/shared/InlineIconButton.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const FillButtonBase=(0,_shared__WEBPACK_IMPORTED_MODULE_2__.Ql)(_shared__WEBPACK_IMPORTED_MODULE_3__.O5,_shared__WEBPACK_IMPORTED_MODULE_3__.Wn),FillButton=(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(((_ref,ref)=>{let{...props}=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_4__.D,{button:FillButtonBase,...props,ref})}));try{FillButton.displayName="FillButton",FillButton.__docgenInfo={description:"",displayName:"FillButton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Button/FillButton.tsx#FillButton"]={docgenInfo:FillButton.__docgenInfo,name:"FillButton",path:"packages/gamut/src/Button/FillButton.tsx#FillButton"})}catch(__react_docgen_typescript_loader_error){}},"./packages/gamut/src/Button/shared/InlineIconButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>InlineIconButton});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_helpers__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/gamut/src/helpers/appendIconToContent.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const InlineIconButton=(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(((_ref,ref)=>{let{children,button:Button,icon,iconPosition="left",variant,...props}=_ref;const content=(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.C)({iconPosition,icon,iconSize:"small"===props.size?12:16,children});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Button,{...props,variant,ref,children:content})}));try{InlineIconButton.displayName="InlineIconButton",InlineIconButton.__docgenInfo={description:"",displayName:"InlineIconButton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Button/shared/InlineIconButton.tsx#InlineIconButton"]={docgenInfo:InlineIconButton.__docgenInfo,name:"InlineIconButton",path:"packages/gamut/src/Button/shared/InlineIconButton.tsx#InlineIconButton"})}catch(__react_docgen_typescript_loader_error){}},"./packages/gamut/src/Button/shared/styles.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{DV:()=>templateVariants,Dj:()=>iconSizeMapping,Ql:()=>createButtonComponent,ru:()=>buttonVariants});var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js"),_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/gamut-styles/src/index.ts"),_codecademy_variance__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/variance/src/index.ts"),_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/gamut/src/ButtonBase/ButtonBase.tsx");(0,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.W8)(["size"]);const buttonProps=_codecademy_variance__WEBPACK_IMPORTED_MODULE_2__.GV.compose(_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.qU.layout,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.qU.positioning,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.qU.space,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.qU.border),templateVariants=(variants,template)=>{const variantConfig={};return variants.forEach((key=>{variantConfig[key]=template(key)})),_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.qU.variant({defaultVariant:variants[0],variants:variantConfig})},buttonVariants=["primary","secondary","danger","interface"],buttonStyles=_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.qU.css({position:"relative",whiteSpace:"nowrap",display:"inline-flex",justifyContent:"center",alignItems:"center",border:2,borderRadius:"md",borderColor:"transparent",transition:(0,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.ab)(["border-color","color","background-color","box-shadow"],"fast","ease-in"),[_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_3__.FA.DISABLED]:{cursor:"not-allowed",userSelect:"none"},[_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_3__.FA.OUTLINE]:{content:'""',transition:(0,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.ab)(["opacity"],"fast"),position:"absolute",borderRadius:"lg",border:2,inset:-5,opacity:0,zIndex:0},[_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_3__.FA.OUTLINE_FOCUS_VISIBLE]:{opacity:1}}),createButtonComponent=function(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];return(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.A)(_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_3__.u4,{target:"e116l7sm0",label:"createButtonComponent"})(_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.c6,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.Zq,buttonStyles,...args,buttonProps)},iconSizeMapping={normal:24,small:16,large:40}},"./packages/gamut/src/Button/shared/variants.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{L_:()=>iconSizeVariants,O5:()=>sizeVariants,Wn:()=>fillButtonVariants,dB:()=>ctaButtonVariants,s$:()=>textButtonVariants,xJ:()=>strokeButtonVariants});var _codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/gamut-styles/src/index.ts"),_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/gamut/src/ButtonBase/ButtonBase.tsx"),_styles__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/gamut/src/Button/shared/styles.ts");const hoverBackgroundTransition=(0,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_0__.ab)(["background-color","box-shadow"],"fast","ease-in"),fillButtonVariants=(0,_styles__WEBPACK_IMPORTED_MODULE_1__.DV)(_styles__WEBPACK_IMPORTED_MODULE_1__.ru,(variant=>({bg:variant,color:"background",[_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_2__.FA.OUTLINE]:{borderColor:variant},[_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_2__.FA.HOVER]:{bg:`${variant}-hover`,color:"background",transition:hoverBackgroundTransition},[_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_2__.FA.ACTIVE]:{borderColor:"border-primary",bg:variant,color:"background"},[_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_2__.FA.DISABLED]:{color:"text-disabled",bg:"background-disabled"}}))),textButtonVariants=(0,_styles__WEBPACK_IMPORTED_MODULE_1__.DV)(_styles__WEBPACK_IMPORTED_MODULE_1__.ru,(variant=>({borderColor:"transparent",color:"interface"===variant?"text":variant,[_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_2__.FA.HOVER]:{color:variant,bg:"background-hover",transition:hoverBackgroundTransition},[_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_2__.FA.FOCUS_VISIBLE]:{color:variant},[_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_2__.FA.OUTLINE]:{borderColor:variant},[_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_2__.FA.ACTIVE]:{color:"text"},[_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_2__.FA.DISABLED]:{color:"text-disabled",bg:"transparent"}}))),strokeButtonVariants=(0,_styles__WEBPACK_IMPORTED_MODULE_1__.DV)(_styles__WEBPACK_IMPORTED_MODULE_1__.ru,(variant=>({borderColor:variant,bg:"transparent",color:variant,[_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_2__.FA.HOVER]:{bg:"background-hover",transition:hoverBackgroundTransition},[_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_2__.FA.OUTLINE]:{borderColor:variant},[_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_2__.FA.ACTIVE]:{bg:variant,color:"background"},[_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_2__.FA.DISABLED]:{borderColor:"background-disabled",color:"text-disabled",bg:"transparent"}}))),ctaButtonVariants=(0,_styles__WEBPACK_IMPORTED_MODULE_1__.DV)(["primary"],(variant=>({borderRadius:"md",fontFamily:"accent",fontWeight:"title",boxShadow:`-4px 4px 0 0 ${_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_0__.w4.colors.text}`,color:"background",py:12,px:24,bg:variant,[_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_2__.FA.OUTLINE]:{borderColor:variant,bottom:-9,left:-9},[_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_2__.FA.HOVER]:{bg:`${variant}-hover`,transition:hoverBackgroundTransition,boxShadow:`-8px 8px 0 0 ${_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_0__.w4.colors.text}`},[_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_2__.FA.ACTIVE]:{boxShadow:"none",bg:"secondary"},[_ButtonBase_ButtonBase__WEBPACK_IMPORTED_MODULE_2__.FA.DISABLED]:{boxShadow:"none",color:"text-disabled",bg:"background-disabled"}}))),sizeVariants=(0,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_0__.Ox)({prop:"size",defaultVariant:"normal",base:{fontWeight:"title"},variants:{normal:{fontSize:16,height:40,minWidth:40,py:4,px:16},small:{fontSize:14,height:32,minWidth:32,py:4,px:8},large:{fontSize:18,height:56,minWidth:40,py:4,px:16}}}),iconSizeVariants=(0,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_0__.Ox)({prop:"size",defaultVariant:"normal",variants:{normal:{height:40,width:40},small:{height:32,width:32},large:{width:56,height:56}}})},"./packages/gamut/src/Typography/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{E:()=>Text});var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js"),_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/gamut-styles/src/index.ts"),_codecademy_variance__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/variance/src/index.ts"),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/index.js"),_variants__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/gamut/src/Typography/variants.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const displayVariants=(0,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.Ox)({variants:_variants__WEBPACK_IMPORTED_MODULE_5__.Jb}),elementVariants=(0,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.Ox)({prop:"as",variants:_variants__WEBPACK_IMPORTED_MODULE_5__.ab}),truncateVariants=(0,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.Ox)({prop:"truncate",variants:{ellipsis:{textOverflow:"ellipsis"},fade:{position:"relative",textOverflow:"clip","&:after":{content:'""',position:"absolute",textColor:"background-current",inset:0,left:.65,background:"linear-gradient(to right, rgba(0, 0, 0, 0), currentColor 75%)"}}}}),truncateLinesProps=_codecademy_variance__WEBPACK_IMPORTED_MODULE_2__.GV.create({truncateLines:{scale:{1:1,2:2,3:3,4:4,5:5},property:"all",transform:truncateLines=>1===truncateLines?{overflow:"hidden",whiteSpace:"nowrap"}:{overflow:"hidden",display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:truncateLines,"&:after":{top:100-100/truncateLines+"%"}}}}),textStates=(0,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.xP)({center:{textAlign:"center"},block:{display:"block"},highlight:{fontWeight:"bold",minWidth:"0.4rem",position:"relative",zIndex:1,MozOsxFontSmoothing:"grayscale",WebkitFontSmoothing:"antialiased","&:after":{bg:"primary-inverse",content:'""',display:"block",height:"32.5%",left:"0",ml:"-0.2rem",position:"absolute",top:"50%",width:"calc(100% + 0.4rem)",zIndex:-1}},screenreader:{display:"inline-block",height:"1px",width:"1px",whiteSpace:"nowrap",overflow:"hidden",position:"absolute",color:"transparent",left:-9999,p:0,m:0,border:"none"},smooth:{WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"}}),textProps=_codecademy_variance__WEBPACK_IMPORTED_MODULE_2__.GV.compose(_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.qU.layout,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.qU.typography,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.qU.color,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.qU.space,truncateLinesProps),StyledText=(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.A)("span",_extends({},{target:"e8i0p5k0",label:"StyledText"},(0,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.W8)()))(elementVariants,truncateVariants,displayVariants,textStates,textProps,""),Text=(0,react__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(((_ref,ref)=>{let{as="span",m=0,...rest}=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(StyledText,{as,m,ref,...rest})}));try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Typography/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"packages/gamut/src/Typography/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./packages/gamut/src/Typography/variants.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Jb:()=>typographyStyleVariants,KU:()=>typographyUtilities,ab:()=>typographyElementVariants});const typographyStyleVariants={"title-xxl":{fontSize:64,fontWeight:"title",lineHeight:"title"},"title-xl":{fontSize:44,fontWeight:"title",lineHeight:"title"},"title-lg":{fontSize:34,fontWeight:"title",lineHeight:"spacedTitle"},"title-md":{fontSize:26,fontWeight:"title",lineHeight:"spacedTitle"},"title-sm":{fontSize:22,fontWeight:"title",lineHeight:"spacedTitle"},"title-xs":{fontSize:20,fontWeight:"title",lineHeight:"spacedTitle"},"p-large":{fontSize:18,fontWeight:"base",lineHeight:"base"},"p-base":{fontSize:16,fontWeight:"base",lineHeight:"base"},"p-small":{fontSize:14,fontWeight:"base",lineHeight:"base"}},typographyElementVariants={h1:typographyStyleVariants["title-xxl"],h2:typographyStyleVariants["title-xl"],h3:typographyStyleVariants["title-lg"],h4:typographyStyleVariants["title-md"],h5:typographyStyleVariants["title-sm"],h6:typographyStyleVariants["title-xs"],p:{...typographyStyleVariants["p-base"],fontSize:16},small:{...typographyStyleVariants["p-small"],display:"inline-block"},strong:{fontSize:"inherit",fontWeight:"title",display:"inline-block"},code:{fontFamily:"monospace",display:"inline-block"},span:{fontSize:"inherit",display:"inline-block"},div:{},figcaption:{},label:{}},typographyUtilities={truncateLines:[1,2,3,4,5],truncation:["ellipsis","fade"],smoothing:[!0,!1],screenreader:[!0,!1]}},"./packages/styleguide/src/lib/Molecules/Coachmark/Coachmark.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CoachmarkExample:()=>CoachmarkExample,Customized:()=>Customized,Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Coachmark_stories});var react=__webpack_require__("./node_modules/react/index.js"),Popover=__webpack_require__("./packages/gamut/src/Popover/Popover.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Coachmark=_ref=>{let{children,shouldShow,activeElClassName,delay=500,renderPopover,popoverProps}=_ref;const[isOpen,setIsOpen]=(0,react.useState)(!1),activeElRef=(0,react.useRef)(null);return(0,react.useEffect)((()=>{let timer;return shouldShow?timer=setTimeout((()=>{setIsOpen(shouldShow)}),delay):setIsOpen(shouldShow),()=>clearTimeout(timer)}),[shouldShow,delay]),(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("div",{ref:activeElRef,className:activeElClassName,children}),(0,jsx_runtime.jsx)(Popover.A,{...popoverProps,targetRef:activeElRef,isOpen,children:renderPopover()})]})};try{Coachmark.displayName="Coachmark",Coachmark.__docgenInfo={description:"",displayName:"Coachmark",props:{activeElClassName:{defaultValue:null,description:"Applied to the element to which the coachmark points.",name:"activeElClassName",required:!1,type:{name:"string"}},delay:{defaultValue:{value:"500"},description:"Amount of time (in ms) to delay rendering the coachmark.",name:"delay",required:!1,type:{name:"number"}},shouldShow:{defaultValue:null,description:"Whether the coachmark is rendered.",name:"shouldShow",required:!0,type:{name:"boolean"}},renderPopover:{defaultValue:null,description:"Function that returns the contents of the coachmark.",name:"renderPopover",required:!0,type:{name:"(onDismiss?: (() => void) | undefined) => Element"}},popoverProps:{defaultValue:null,description:"Props to be passed into the popover component.",name:"popoverProps",required:!1,type:{name:"Partial<PopoverProps>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Coachmark/index.tsx#Coachmark"]={docgenInfo:Coachmark.__docgenInfo,name:"Coachmark",path:"packages/gamut/src/Coachmark/index.tsx#Coachmark"})}catch(__react_docgen_typescript_loader_error){}var FlexBox=__webpack_require__("./packages/gamut/src/Box/FlexBox.tsx"),Text=__webpack_require__("./packages/gamut/src/Typography/Text.tsx"),FillButton=__webpack_require__("./packages/gamut/src/Button/FillButton.tsx"),CheckerDense=__webpack_require__("./packages/gamut-patterns/dist/patterns/CheckerDense.js");const Coachmark_stories={component:Coachmark,args:{}},CoachmarkExample=args=>{const[shouldShow,setShouldShow]=(0,react.useState)(void 0===args.shouldShow||args.shouldShow);return(0,jsx_runtime.jsx)(Coachmark,{...args,delay:0,renderPopover:()=>(0,jsx_runtime.jsxs)(FlexBox.p,{flexDirection:"column",p:16,alignItems:"flex-start",children:[(0,jsx_runtime.jsx)(Text.E,{mb:8,children:"You should click the button."}),(0,jsx_runtime.jsx)(FillButton.S,{onClick:()=>{setShouldShow(!1)},size:"small",children:"Got it"})]}),shouldShow,children:(0,jsx_runtime.jsx)(FillButton.S,{children:"A Button"})})},Default={render:props=>(0,jsx_runtime.jsx)(CoachmarkExample,{...props})},Customized={render:props=>(0,jsx_runtime.jsx)(CoachmarkExample,{...props,popoverProps:{beak:"left",outline:!0,pattern:CheckerDense.V}})},__namedExportsOrder=["CoachmarkExample","Default","Customized"];CoachmarkExample.parameters={...CoachmarkExample.parameters,docs:{...CoachmarkExample.parameters?.docs,source:{originalSource:'(args: CoachmarkProps) => {\n  const [shouldShow, setShouldShow] = useState(args.shouldShow === undefined ? true : args.shouldShow);\n  const renderPopover = () => <FlexBox flexDirection="column" p={16} alignItems="flex-start">\n      <Text mb={8}>You should click the button.</Text>\n      <FillButton onClick={() => {\n      setShouldShow(false);\n    }} size="small">\n        Got it\n      </FillButton>\n    </FlexBox>;\n  return <Coachmark {...args} delay={0} renderPopover={renderPopover} shouldShow={shouldShow}>\n      <FillButton>A Button</FillButton>\n    </Coachmark>;\n}',...CoachmarkExample.parameters?.docs?.source}}},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: props => <CoachmarkExample {...props} />\n}",...Default.parameters?.docs?.source}}},Customized.parameters={...Customized.parameters,docs:{...Customized.parameters?.docs,source:{originalSource:"{\n  render: props => <CoachmarkExample {...props} popoverProps={{\n    beak: 'left',\n    outline: true,\n    pattern: CheckerDense\n  }} />\n}",...Customized.parameters?.docs?.source}}};try{CoachmarkExample.displayName="CoachmarkExample",CoachmarkExample.__docgenInfo={description:"",displayName:"CoachmarkExample",props:{activeElClassName:{defaultValue:null,description:"Applied to the element to which the coachmark points.",name:"activeElClassName",required:!1,type:{name:"string"}},delay:{defaultValue:{value:"500"},description:"Amount of time (in ms) to delay rendering the coachmark.",name:"delay",required:!1,type:{name:"number"}},shouldShow:{defaultValue:null,description:"Whether the coachmark is rendered.",name:"shouldShow",required:!0,type:{name:"boolean"}},renderPopover:{defaultValue:null,description:"Function that returns the contents of the coachmark.",name:"renderPopover",required:!0,type:{name:"(onDismiss?: (() => void) | undefined) => Element"}},popoverProps:{defaultValue:null,description:"Props to be passed into the popover component.",name:"popoverProps",required:!1,type:{name:"Partial<PopoverProps>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/styleguide/src/lib/Molecules/Coachmark/Coachmark.stories.tsx#CoachmarkExample"]={docgenInfo:CoachmarkExample.__docgenInfo,name:"CoachmarkExample",path:"packages/styleguide/src/lib/Molecules/Coachmark/Coachmark.stories.tsx#CoachmarkExample"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{N:()=>AnimatePresence});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/react/index.js"),LayoutGroupContext=__webpack_require__("./node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs"),use_constant=__webpack_require__("./node_modules/framer-motion/dist/es/utils/use-constant.mjs"),PresenceContext=__webpack_require__("./node_modules/framer-motion/dist/es/context/PresenceContext.mjs"),MotionConfigContext=__webpack_require__("./node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs");class PopChildMeasure extends react.Component{getSnapshotBeforeUpdate(prevProps){const element=this.props.childRef.current;if(element&&prevProps.isPresent&&!this.props.isPresent){const size=this.props.sizeRef.current;size.height=element.offsetHeight||0,size.width=element.offsetWidth||0,size.top=element.offsetTop,size.left=element.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function PopChild({children,isPresent}){const id=(0,react.useId)(),ref=(0,react.useRef)(null),size=(0,react.useRef)({width:0,height:0,top:0,left:0}),{nonce}=(0,react.useContext)(MotionConfigContext.Q);return(0,react.useInsertionEffect)((()=>{const{width,height,top,left}=size.current;if(isPresent||!ref.current||!width||!height)return;ref.current.dataset.motionPopId=id;const style=document.createElement("style");return nonce&&(style.nonce=nonce),document.head.appendChild(style),style.sheet&&style.sheet.insertRule(`\n          [data-motion-pop-id="${id}"] {\n            position: absolute !important;\n            width: ${width}px !important;\n            height: ${height}px !important;\n            top: ${top}px !important;\n            left: ${left}px !important;\n          }\n        `),()=>{document.head.removeChild(style)}}),[isPresent]),(0,jsx_runtime.jsx)(PopChildMeasure,{isPresent,childRef:ref,sizeRef:size,children:react.cloneElement(children,{ref})})}const PresenceChild=({children,initial,isPresent,onExitComplete,custom,presenceAffectsLayout,mode})=>{const presenceChildren=(0,use_constant.M)(newChildrenMap),id=(0,react.useId)(),memoizedOnExitComplete=(0,react.useCallback)((childId=>{presenceChildren.set(childId,!0);for(const isComplete of presenceChildren.values())if(!isComplete)return;onExitComplete&&onExitComplete()}),[presenceChildren,onExitComplete]),context=(0,react.useMemo)((()=>({id,initial,isPresent,custom,onExitComplete:memoizedOnExitComplete,register:childId=>(presenceChildren.set(childId,!1),()=>presenceChildren.delete(childId))})),presenceAffectsLayout?[Math.random(),memoizedOnExitComplete]:[isPresent,memoizedOnExitComplete]);return(0,react.useMemo)((()=>{presenceChildren.forEach(((_,key)=>presenceChildren.set(key,!1)))}),[isPresent]),react.useEffect((()=>{!isPresent&&!presenceChildren.size&&onExitComplete&&onExitComplete()}),[isPresent]),"popLayout"===mode&&(children=(0,jsx_runtime.jsx)(PopChild,{isPresent,children})),(0,jsx_runtime.jsx)(PresenceContext.t.Provider,{value:context,children})};function newChildrenMap(){return new Map}var use_presence=__webpack_require__("./node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs");const getChildKey=child=>child.key||"";function onlyElements(children){const filtered=[];return react.Children.forEach(children,(child=>{(0,react.isValidElement)(child)&&filtered.push(child)})),filtered}var use_isomorphic_effect=__webpack_require__("./node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs");const AnimatePresence=({children,custom,initial=!0,onExitComplete,presenceAffectsLayout=!0,mode="sync",propagate=!1})=>{const[isParentPresent,safeToRemove]=(0,use_presence.xQ)(propagate),presentChildren=(0,react.useMemo)((()=>onlyElements(children)),[children]),presentKeys=propagate&&!isParentPresent?[]:presentChildren.map(getChildKey),isInitialRender=(0,react.useRef)(!0),pendingPresentChildren=(0,react.useRef)(presentChildren),exitComplete=(0,use_constant.M)((()=>new Map)),[diffedChildren,setDiffedChildren]=(0,react.useState)(presentChildren),[renderedChildren,setRenderedChildren]=(0,react.useState)(presentChildren);(0,use_isomorphic_effect.E)((()=>{isInitialRender.current=!1,pendingPresentChildren.current=presentChildren;for(let i=0;i<renderedChildren.length;i++){const key=getChildKey(renderedChildren[i]);presentKeys.includes(key)?exitComplete.delete(key):!0!==exitComplete.get(key)&&exitComplete.set(key,!1)}}),[renderedChildren,presentKeys.length,presentKeys.join("-")]);const exitingChildren=[];if(presentChildren!==diffedChildren){let nextChildren=[...presentChildren];for(let i=0;i<renderedChildren.length;i++){const child=renderedChildren[i],key=getChildKey(child);presentKeys.includes(key)||(nextChildren.splice(i,0,child),exitingChildren.push(child))}return"wait"===mode&&exitingChildren.length&&(nextChildren=exitingChildren),setRenderedChildren(onlyElements(nextChildren)),void setDiffedChildren(presentChildren)}const{forceRender}=(0,react.useContext)(LayoutGroupContext.L);return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:renderedChildren.map((child=>{const key=getChildKey(child),isPresent=!(propagate&&!isParentPresent)&&(presentChildren===renderedChildren||presentKeys.includes(key));return(0,jsx_runtime.jsx)(PresenceChild,{isPresent,initial:!(isInitialRender.current&&!initial)&&void 0,custom:isPresent?void 0:custom,presenceAffectsLayout,mode,onExitComplete:isPresent?void 0:()=>{if(!exitComplete.has(key))return;exitComplete.set(key,!0);let isEveryExitComplete=!0;exitComplete.forEach((isExitComplete=>{isExitComplete||(isEveryExitComplete=!1)})),isEveryExitComplete&&(null==forceRender||forceRender(),setRenderedChildren(pendingPresentChildren.current),propagate&&(null==safeToRemove||safeToRemove()),onExitComplete&&onExitComplete())},children:child},key)}))})}},"./node_modules/fast-deep-equal/react.js":module=>{module.exports=function equal(a,b){if(a===b)return!0;if(a&&b&&"object"==typeof a&&"object"==typeof b){if(a.constructor!==b.constructor)return!1;var length,i,keys;if(Array.isArray(a)){if((length=a.length)!=b.length)return!1;for(i=length;0!=i--;)if(!equal(a[i],b[i]))return!1;return!0}if(a.constructor===RegExp)return a.source===b.source&&a.flags===b.flags;if(a.valueOf!==Object.prototype.valueOf)return a.valueOf()===b.valueOf();if(a.toString!==Object.prototype.toString)return a.toString()===b.toString();if((length=(keys=Object.keys(a)).length)!==Object.keys(b).length)return!1;for(i=length;0!=i--;)if(!Object.prototype.hasOwnProperty.call(b,keys[i]))return!1;for(i=length;0!=i--;){var key=keys[i];if(("_owner"!==key||!a.$$typeof)&&!equal(a[key],b[key]))return!1}return!0}return a!=a&&b!=b}},"./node_modules/react-use/esm/useRafState.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>esm_useRafState});var react=__webpack_require__("./node_modules/react/index.js");const esm_useEffectOnce=function(effect){(0,react.useEffect)(effect,[])};const esm_useUnmount=function(fn){var fnRef=(0,react.useRef)(fn);fnRef.current=fn,esm_useEffectOnce((function(){return function(){return fnRef.current()}}))};const esm_useRafState=function(initialState){var frame=(0,react.useRef)(0),_a=(0,react.useState)(initialState),state=_a[0],setState=_a[1],setRafState=(0,react.useCallback)((function(value){cancelAnimationFrame(frame.current),frame.current=requestAnimationFrame((function(){setState(value)}))}),[]);return esm_useUnmount((function(){cancelAnimationFrame(frame.current)})),[state,setRafState]}},"./node_modules/react-use/esm/useWindowScroll.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_util__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-use/esm/util.js"),_useRafState__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-use/esm/useRafState.js");const __WEBPACK_DEFAULT_EXPORT__=function(){var _a=(0,_useRafState__WEBPACK_IMPORTED_MODULE_1__.A)({x:_util__WEBPACK_IMPORTED_MODULE_2__.oc?window.pageXOffset:0,y:_util__WEBPACK_IMPORTED_MODULE_2__.oc?window.pageYOffset:0}),state=_a[0],setState=_a[1];return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){var handler=function(){setState({x:window.pageXOffset,y:window.pageYOffset})};return window.addEventListener("scroll",handler,{capture:!1,passive:!0}),function(){window.removeEventListener("scroll",handler)}}),[]),state}},"./node_modules/react-use/esm/useWindowSize.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_useRafState__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-use/esm/useRafState.js"),_util__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-use/esm/util.js");const __WEBPACK_DEFAULT_EXPORT__=function(initialWidth,initialHeight){void 0===initialWidth&&(initialWidth=1/0),void 0===initialHeight&&(initialHeight=1/0);var _a=(0,_useRafState__WEBPACK_IMPORTED_MODULE_1__.A)({width:_util__WEBPACK_IMPORTED_MODULE_2__.oc?window.innerWidth:initialWidth,height:_util__WEBPACK_IMPORTED_MODULE_2__.oc?window.innerHeight:initialHeight}),state=_a[0],setState=_a[1];return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){if(_util__WEBPACK_IMPORTED_MODULE_2__.oc){var handler_1=function(){setState({width:window.innerWidth,height:window.innerHeight})};return window.addEventListener("resize",handler_1),function(){window.removeEventListener("resize",handler_1)}}}),[]),state}},"./node_modules/react-use/esm/util.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{oc:()=>isClient});__webpack_require__("./node_modules/fast-deep-equal/react.js");var isClient="object"==typeof window}}]);