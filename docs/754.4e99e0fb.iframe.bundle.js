"use strict";(self.webpackChunkgamut_repo=self.webpackChunkgamut_repo||[]).push([[754],{"./packages/gamut/src/Badge/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{E:()=>Badge});var emotion_styled_base_browser_esm=__webpack_require__("./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js"),src=__webpack_require__("./packages/gamut-styles/src/index.ts"),variance_src=__webpack_require__("./packages/variance/src/index.ts"),appendIconToContent=__webpack_require__("./packages/gamut/src/helpers/appendIconToContent.tsx");const iconSizeMap={base:16,sm:8},determineIconSize=size=>iconSizeMap[size],iconSpaceMap={base:8,sm:4},determineIconSpacing=size=>iconSpaceMap[size];try{determineIconSize.displayName="determineIconSize",determineIconSize.__docgenInfo={description:"",displayName:"determineIconSize",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Badge/helpers.tsx#determineIconSize"]={docgenInfo:determineIconSize.__docgenInfo,name:"determineIconSize",path:"packages/gamut/src/Badge/helpers.tsx#determineIconSize"})}catch(__react_docgen_typescript_loader_error){}try{determineIconSpacing.displayName="determineIconSpacing",determineIconSpacing.__docgenInfo={description:"",displayName:"determineIconSpacing",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Badge/helpers.tsx#determineIconSpacing"]={docgenInfo:determineIconSpacing.__docgenInfo,name:"determineIconSpacing",path:"packages/gamut/src/Badge/helpers.tsx#determineIconSpacing"})}catch(__react_docgen_typescript_loader_error){}var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const colorVariants=(0,src.Ox)({defaultVariant:"primary",base:{alignItems:"center",borderRadius:"xl",fontFamily:"accent",fontWeight:400,display:"flex",justifyContent:"center",px:8,width:"min-content",whiteSpace:"nowrap"},variants:{primary:{bg:"text",textColor:"background"},accent:{bg:"yellow",textColor:"navy"},secondary:{bg:"text-secondary",textColor:"background"},tertiary:{bg:"transparent",border:1,borderColor:"border-secondary",textColor:"text-secondary"},tertiaryFill:{bg:"background",border:1,borderColor:"border-secondary",textColor:"text-secondary"},custom:{textColor:"text"}}}),sizeVariants=(0,src.Ox)({prop:"size",variants:{base:{height:"1.5rem",fontSize:14,lineHeight:0},sm:{height:"1rem",fontSize:10}}}),badgeProps=variance_src.GV.compose(src.qU.space,src.qU.layout,src.qU.typography,src.qU.background,src.qU.color),BadgeBase=(0,emotion_styled_base_browser_esm.A)("div",_extends({},{target:"emeh29k0",label:"BadgeBase"},src.W8))(badgeProps,colorVariants,sizeVariants,""),Badge=_ref=>{let{icon,children,...rest}=_ref;const size="sm"===rest.size?"sm":"base",iconSize=determineIconSize(size),spacing=determineIconSpacing(size),content=(0,appendIconToContent.C)({children,icon,iconAndTextGap:spacing,iconPosition:"left",iconSize});return(0,jsx_runtime.jsx)(BadgeBase,{...rest,children:content})};try{Badge.displayName="Badge",Badge.__docgenInfo={description:"",displayName:"Badge",props:{icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"ComponentType<GamutIconProps>"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme"}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"secondary"'},{value:'"accent"'},{value:'"tertiary"'},{value:'"custom"'},{value:'"tertiaryFill"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:'false | "base" | "sm"'}},background:{defaultValue:null,description:"",name:"background",required:!1,type:{name:"string"}},bg:{defaultValue:null,description:"",name:"bg",required:!1,type:{name:"string | number | symbol"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Badge/index.tsx#Badge"]={docgenInfo:Badge.__docgenInfo,name:"Badge",path:"packages/gamut/src/Badge/index.tsx#Badge"})}catch(__react_docgen_typescript_loader_error){}},"./packages/gamut/src/Form/styles/shared-system-props.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Aw:()=>formFieldStyles,BF:()=>formBaseFieldStylesObject,HW:()=>formBaseComponentStyles,Px:()=>formFieldFocusStyles,XL:()=>conditionalStyles,ao:()=>formFieldTextDisabledStyles,gL:()=>formFieldPaddingStyles,h$:()=>InputSelectors,rx:()=>conditionalStyleState,uD:()=>formFieldBaseDisabledStyles,xh:()=>formFieldDisabledStyles,y2:()=>formBaseStyles});var _codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/gamut-styles/src/index.ts");let InputSelectors=function(InputSelectors){return InputSelectors.HOVER="&:hover",InputSelectors.ACTIVE="&:active",InputSelectors.PLACEHOLDER="&:placeholder",InputSelectors.FOCUS="&:focus",InputSelectors.FOCUS_LABEL_DIV_CHILD="&:focus + label > div",InputSelectors.DISABLED="&:disabled, &[aria-disabled='true']",InputSelectors.BEFORE="&::before",InputSelectors.AFTER="&::after",InputSelectors.BEFORE_AND_AFTER="&::before, &::after",InputSelectors.CHECKED_BEFORE="&:checked + label::before",InputSelectors.CHECKED_AFTER="&:checked + label::after",InputSelectors.HOVER_FOCUS_BEFORE="&:hover + label::before, &:focus + label::before",InputSelectors}({});const formBaseStyles={fontWeight:"base",fontSize:16,color:"text"},formBaseComponentStyles={width:1,outline:"none",bg:"background",minWidth:"auto",...formBaseStyles},formFieldFocusStyles={borderColor:"primary",boxShadow:`inset 0 0 0 1px ${_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_0__.w4.colors.primary}`},formFieldTextDisabledStyles={color:"text-disabled",cursor:"not-allowed"},formFieldBaseDisabledStyles={borderColor:"currentColor",opacity:1,...formFieldTextDisabledStyles},formFieldDisabledStyles={...formFieldBaseDisabledStyles,bg:"background-disabled",[InputSelectors.HOVER]:{borderColor:"currentColor"}},formFieldPaddingStyles={py:12,px:8},formBaseFieldStylesObject={...formBaseComponentStyles,transition:(0,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_0__.ab)(["background-color","box-shadow"],"slow","ease-in-out"),border:1,borderColor:"border-disabled",borderRadius:"md",[InputSelectors.HOVER]:{borderColor:"primary"},[InputSelectors.PLACEHOLDER]:{borderColor:"border-disabled",fontStyle:"italic"},[InputSelectors.DISABLED]:{...formFieldDisabledStyles}},formFieldStyles=(_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_0__.qU.css(formBaseFieldStylesObject),_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_0__.qU.css({...formBaseFieldStylesObject,...formFieldPaddingStyles,lineHeight:"base",[InputSelectors.FOCUS]:formFieldFocusStyles})),conditionalStyles=_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_0__.qU.variant({variants:{error:{borderColor:"feedback-error",[InputSelectors.HOVER]:{borderColor:"feedback-error"},[InputSelectors.FOCUS]:{borderColor:"feedback-error",boxShadow:`inset 0 0 0 1px ${_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_0__.w4.colors["feedback-error"]}`}},activated:{borderColor:"currentColor"}}}),conditionalStyleState=(error,activated)=>error?"error":activated?"activated":void 0},"./packages/styleguide/src/lib/Molecules/Tabs/Tabs.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Controlled:()=>Controlled,Default:()=>Default,TabsBadge:()=>TabsBadge,TabsBlock:()=>TabsBlock,TabsInteractiveContent:()=>TabsInteractiveContent,TabsNav:()=>TabsNav,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Tabs_stories});var reach_tabs=__webpack_require__("./node_modules/@reach/tabs/dist/reach-tabs.mjs"),react=__webpack_require__("./node_modules/react/index.js"),emotion_styled_base_browser_esm=__webpack_require__("./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js"),src=__webpack_require__("./packages/gamut-styles/src/index.ts"),ButtonBase=__webpack_require__("./packages/gamut/src/ButtonBase/ButtonBase.tsx"),variance_src=__webpack_require__("./packages/variance/src/index.ts");let TabSelectors=function(TabSelectors){return TabSelectors.SELECTED="&[data-selected]",TabSelectors.HOVER="&:hover",TabSelectors.ACTIVE="&:active",TabSelectors.FOCUS="&:focus",TabSelectors.DISABLED="[disabled], &:disabled, &[aria-disabled='true']",TabSelectors.FOCUS_VISIBLE=" &:focus-visible",TabSelectors.BEFORE="&::before",TabSelectors}({});const tabElementBaseProps=variance_src.GV.compose(src.qU.layout,src.qU.positioning,src.qU.space);try{tabElementBaseProps.displayName="tabElementBaseProps",tabElementBaseProps.__docgenInfo={description:"",displayName:"tabElementBaseProps",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Tabs/props.tsx#tabElementBaseProps"]={docgenInfo:tabElementBaseProps.__docgenInfo,name:"tabElementBaseProps",path:"packages/gamut/src/Tabs/props.tsx#tabElementBaseProps"})}catch(__react_docgen_typescript_loader_error){}const tabSelectedStyles={fontWeight:700,pt:12,pb:8,borderBottomWidth:4,borderColor:"primary"},focusVisibleStyles={[TabSelectors.FOCUS_VISIBLE+TabSelectors.BEFORE]:{content:'""',border:2,borderColor:"primary",position:"absolute",inset:0,zIndex:0,borderRadiusTop:"md",borderRadiusBottom:"none"}},tabVariants=(0,src.Ox)({base:{position:"relative",display:"inline-flex",justifyContent:"center",alignItems:"center",whiteSpace:"nowrap",borderRadius:"none",px:24,textOverflow:"ellipsis",color:"text",font:"inherit",cursor:"pointer",zIndex:1,[TabSelectors.DISABLED]:{opacity:.25,cursor:"default"},...focusVisibleStyles},variants:{standard:{background:"none",borderColor:"border-primary",borderLeft:"none",borderRight:"none",borderTop:"none",borderBottomStyle:"solid",borderBottomWidth:1,fontSize:16,fontWeight:400,pt:12,pb:11,[TabSelectors.HOVER]:{bg:"background-selected"},[TabSelectors.SELECTED]:{...tabSelectedStyles,fontWeight:"bold"}},block:{fontWeight:"normal",fontSize:14,py:12,[TabSelectors.SELECTED]:{bg:"background",fontWeight:"bold"}}}}),tabStates=(0,src.xP)({selected:{...tabSelectedStyles}}),TabButton=(0,emotion_styled_base_browser_esm.A)(ButtonBase.u4,{target:"e1fxx1y10",label:"TabButton"})(tabVariants,tabStates,tabElementBaseProps,"");try{TabButton.displayName="TabButton",TabButton.__docgenInfo={description:"",displayName:"TabButton",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme"}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:'false | "block" | "standard"'}},selected:{defaultValue:null,description:"",name:"selected",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Tabs/TabButton.tsx#TabButton"]={docgenInfo:TabButton.__docgenInfo,name:"TabButton",path:"packages/gamut/src/Tabs/TabButton.tsx#TabButton"})}catch(__react_docgen_typescript_loader_error){}const TabContext=(0,react.createContext)({});TabContext.displayName="TabContext";const TabProvider=TabContext.Provider;function useTab(){const{variant}=function useTabContext(){return(0,react.useContext)(TabContext)}();return(0,react.useMemo)((()=>({variant})),[variant])}try{TabProvider.displayName="TabContext",TabProvider.__docgenInfo={description:"",displayName:"TabContext",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Tabs/TabProvider.tsx#TabContext"]={docgenInfo:TabContext.__docgenInfo,name:"TabContext",path:"packages/gamut/src/Tabs/TabProvider.tsx#TabContext"})}catch(__react_docgen_typescript_loader_error){}var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Tab=props=>{const{variant}=useTab();return(0,jsx_runtime.jsx)(reach_tabs.oz,{...props,as:TabButton,variant})};try{Tab.displayName="Tab",Tab.__docgenInfo={description:"",displayName:"Tab",props:{variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:'false | "block" | "standard"'}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme"}},selected:{defaultValue:null,description:"",name:"selected",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Tabs/Tab.tsx#Tab"]={docgenInfo:Tab.__docgenInfo,name:"Tab",path:"packages/gamut/src/Tabs/Tab.tsx#Tab"})}catch(__react_docgen_typescript_loader_error){}const tabContainerVariants=(0,src.Ox)({base:{display:"flex"},defaultVariant:"standard",variants:{standard:{position:"relative",mb:24,"&:after":{content:'""',height:"1px",bg:"text",position:"absolute",bottom:0,zIndex:0,width:"100%"}},block:{bg:"background-contrast",mb:16}}}),tabContainerStates=src.qU.states({fill:{display:"grid",gridAutoColumns:"1fr",gridTemplateRows:"auto",gridAutoFlow:"column"}});try{tabContainerVariants.displayName="tabContainerVariants",tabContainerVariants.__docgenInfo={description:"",displayName:"tabContainerVariants",props:{variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:'false | "block" | "standard"'}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Tabs/styles.tsx#tabContainerVariants"]={docgenInfo:tabContainerVariants.__docgenInfo,name:"tabContainerVariants",path:"packages/gamut/src/Tabs/styles.tsx#tabContainerVariants"})}catch(__react_docgen_typescript_loader_error){}try{tabContainerStates.displayName="tabContainerStates",tabContainerStates.__docgenInfo={description:"",displayName:"tabContainerStates",props:{fill:{defaultValue:null,description:"",name:"fill",required:!1,type:{name:"boolean"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Tabs/styles.tsx#tabContainerStates"]={docgenInfo:tabContainerStates.__docgenInfo,name:"tabContainerStates",path:"packages/gamut/src/Tabs/styles.tsx#tabContainerStates"})}catch(__react_docgen_typescript_loader_error){}function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const TabListBase=(0,emotion_styled_base_browser_esm.A)("div",_extends({},{target:"e1nmxgwn0",label:"TabListBase"},src.W8))(tabContainerVariants,tabContainerStates,tabElementBaseProps,""),TabList=props=>{const{variant}=useTab();return(0,jsx_runtime.jsx)(reach_tabs.wb,{...props,variant,as:TabListBase})};try{TabList.displayName="TabList",TabList.__docgenInfo={description:"",displayName:"TabList",props:{variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:'false | "block" | "standard"'}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme"}},fill:{defaultValue:null,description:"",name:"fill",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Tabs/TabList.tsx#TabList"]={docgenInfo:TabList.__docgenInfo,name:"TabList",path:"packages/gamut/src/Tabs/TabList.tsx#TabList"})}catch(__react_docgen_typescript_loader_error){}function TabPanel_extends(){return TabPanel_extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},TabPanel_extends.apply(null,arguments)}const TabPanel=(0,emotion_styled_base_browser_esm.A)(reach_tabs.Kp,TabPanel_extends({},{target:"e1bw1p150",label:"TabPanel"},src.W8))(tabElementBaseProps,"");try{TabPanel.displayName="TabPanel",TabPanel.__docgenInfo={description:"",displayName:"TabPanel",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Tabs/TabPanel.tsx#TabPanel"]={docgenInfo:TabPanel.__docgenInfo,name:"TabPanel",path:"packages/gamut/src/Tabs/TabPanel.tsx#TabPanel"})}catch(__react_docgen_typescript_loader_error){}function TabPanels_extends(){return TabPanels_extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},TabPanels_extends.apply(null,arguments)}const TabPanels=(0,emotion_styled_base_browser_esm.A)(reach_tabs.T2,TabPanels_extends({},{target:"ebokd7t0",label:"TabPanels"},src.W8))(tabElementBaseProps,"");try{TabPanels.displayName="TabPanels",TabPanels.__docgenInfo={description:"",displayName:"TabPanels",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Tabs/TabPanels.tsx#TabPanels"]={docgenInfo:TabPanels.__docgenInfo,name:"TabPanels",path:"packages/gamut/src/Tabs/TabPanels.tsx#TabPanels"})}catch(__react_docgen_typescript_loader_error){}function TabNav_extends(){return TabNav_extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},TabNav_extends.apply(null,arguments)}const TabNav=(0,emotion_styled_base_browser_esm.A)("nav",TabNav_extends({},{target:"e14iwrk40",label:"TabNav"},(0,src.W8)()))(tabElementBaseProps,tabContainerVariants,tabContainerStates,"");try{TabNav.displayName="TabNav",TabNav.__docgenInfo={description:"",displayName:"TabNav",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:'false | "block" | "standard"'}},fill:{defaultValue:null,description:"",name:"fill",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Tabs/TabNav.tsx#TabNav"]={docgenInfo:TabNav.__docgenInfo,name:"TabNav",path:"packages/gamut/src/Tabs/TabNav.tsx#TabNav"})}catch(__react_docgen_typescript_loader_error){}const StyledTabNavLink=(0,emotion_styled_base_browser_esm.A)(TabButton,{target:"e1i5j2n60",label:"StyledTabNavLink"})(""),TabNavLink=_ref=>{let{variant="standard",role="tab",...rest}=_ref;return(0,jsx_runtime.jsx)(StyledTabNavLink,{role,variant,...rest})};try{TabNavLink.displayName="TabNavLink",TabNavLink.__docgenInfo={description:"",displayName:"TabNavLink",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme"}},variant:{defaultValue:{value:"standard"},description:"",name:"variant",required:!1,type:{name:'false | "block" | "standard"'}},selected:{defaultValue:null,description:"",name:"selected",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Tabs/TabNavLink.tsx#TabNavLink"]={docgenInfo:TabNavLink.__docgenInfo,name:"TabNavLink",path:"packages/gamut/src/Tabs/TabNavLink.tsx#TabNavLink"})}catch(__react_docgen_typescript_loader_error){}var Text=__webpack_require__("./packages/gamut/src/Typography/Text.tsx");function Tabs_extends(){return Tabs_extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},Tabs_extends.apply(null,arguments)}const TabsBase=(0,emotion_styled_base_browser_esm.A)("div",Tabs_extends({},{target:"ebv3y670",label:"TabsBase"},src.W8))(tabElementBaseProps,""),Tabs=props=>(0,jsx_runtime.jsx)(TabProvider,{value:{variant:props.variant||"standard"},children:"block"===props.variant?(0,jsx_runtime.jsx)(src.VS,{bg:"navy-800",height:"100%",children:(0,jsx_runtime.jsx)(reach_tabs.tU,{as:TabsBase,position:"relative",zIndex:0,keyboardActivation:reach_tabs.U9.Manual,...props})}):(0,jsx_runtime.jsx)(reach_tabs.tU,{as:TabsBase,position:"relative",zIndex:0,keyboardActivation:reach_tabs.U9.Manual,...props})});try{Tabs.displayName="Tabs",Tabs.__docgenInfo={description:"",displayName:"Tabs",props:{variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:'false | "block" | "standard"'}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Tabs/Tabs.tsx#Tabs"]={docgenInfo:Tabs.__docgenInfo,name:"Tabs",path:"packages/gamut/src/Tabs/Tabs.tsx#Tabs"})}catch(__react_docgen_typescript_loader_error){}var FormGroup=__webpack_require__("./packages/gamut/src/Form/elements/FormGroup.tsx"),Input=__webpack_require__("./packages/gamut/src/Form/inputs/Input.tsx"),Badge=__webpack_require__("./packages/gamut/src/Badge/index.tsx"),FillButton=__webpack_require__("./packages/gamut/src/Button/FillButton.tsx");const Tabs_stories={component:Tab,subcomponents:{TabList,Tab,TabPanel,TabPanels,TabNav,TabNavLink},args:{}},TabsPanelCollection=()=>(0,jsx_runtime.jsxs)(TabPanels,{my:24,className:"welcomePanel",children:[(0,jsx_runtime.jsxs)(TabPanel,{children:[(0,jsx_runtime.jsx)(Text.E,{as:"h2",children:"Welcome to Tab 1"}),(0,jsx_runtime.jsx)(Text.E,{children:"Hi there! I'm the contents inside Tab 1. Yippee!"})]}),(0,jsx_runtime.jsxs)(TabPanel,{children:[(0,jsx_runtime.jsx)(Text.E,{as:"h2",children:"Welcome to Tab 2"}),(0,jsx_runtime.jsx)(Text.E,{children:"Hi there! I'm the contents inside Tab 2. Yippee!"})]}),(0,jsx_runtime.jsxs)(TabPanel,{children:[(0,jsx_runtime.jsx)(Text.E,{as:"h2",children:"Welcome to Tab 3"}),(0,jsx_runtime.jsx)(Text.E,{children:"Hi there! I'm the contents inside Tab 3. Yippee!"})]})]}),TabsExample=args=>(0,jsx_runtime.jsxs)(Tabs,{...args,children:[(0,jsx_runtime.jsxs)(TabList,{mx:24,children:[(0,jsx_runtime.jsx)(Tab,{children:"Tab 1"}),(0,jsx_runtime.jsx)(Tab,{children:"Tab 2"}),(0,jsx_runtime.jsx)(Tab,{children:"Tab 3"})]}),(0,jsx_runtime.jsx)(TabsPanelCollection,{})]}),Default={render:args=>(0,jsx_runtime.jsx)(TabsExample,{...args})},TabsControlledExample=()=>{const[controlledIndex,setControlledIndex]=(0,react.useState)(0),setIndex=(0,react.useCallback)((value=>{const val=Number(value);return val>2?setControlledIndex(0):val<0?setControlledIndex(2):void setControlledIndex(val)}),[setControlledIndex]);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(src.VS,{bg:"yellow",mb:24,p:12,children:(0,jsx_runtime.jsx)(FormGroup.g,{label:"Tab Index",htmlFor:"tab-index",children:(0,jsx_runtime.jsx)(Input.pd,{label:"Tab Index",value:controlledIndex,onChange:e=>setIndex(e.target.value),type:"number",min:1,htmlFor:"tab-index"})})}),(0,jsx_runtime.jsxs)(Tabs,{index:controlledIndex,onChange:setIndex,children:[(0,jsx_runtime.jsxs)(TabList,{mx:24,children:[(0,jsx_runtime.jsx)(Tab,{children:"Tab 1"}),(0,jsx_runtime.jsx)(Tab,{children:"Tab 2"}),(0,jsx_runtime.jsx)(Tab,{children:"Tab 3"})]}),(0,jsx_runtime.jsx)(TabsPanelCollection,{})]})]})},Controlled={render:()=>(0,jsx_runtime.jsx)(TabsControlledExample,{})},TabsBadgeExample=args=>(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsxs)(Tabs,{...args,children:[(0,jsx_runtime.jsxs)(TabList,{children:[(0,jsx_runtime.jsxs)(Tab,{children:["Tab 1 ",(0,jsx_runtime.jsx)(Badge.E,{ml:8,children:"New!"})]}),(0,jsx_runtime.jsx)(Tab,{children:"Tab 2"}),(0,jsx_runtime.jsx)(Tab,{children:"Tab 3"})]}),(0,jsx_runtime.jsx)(TabsPanelCollection,{})]})}),TabsBadge={render:()=>(0,jsx_runtime.jsx)(TabsBadgeExample,{})},TabsBlockVariantExample=args=>(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsxs)(Tabs,{...args,variant:"block",children:[(0,jsx_runtime.jsxs)(TabList,{children:[(0,jsx_runtime.jsx)(Tab,{children:"Tab 1"}),(0,jsx_runtime.jsx)(Tab,{children:"Tab 2"}),(0,jsx_runtime.jsx)(Tab,{children:"Tab 3"})]}),(0,jsx_runtime.jsx)(TabsPanelCollection,{})]})}),TabsBlock={render:()=>(0,jsx_runtime.jsx)(TabsBlockVariantExample,{})},TabsNavExample=args=>(0,jsx_runtime.jsxs)(TabNav,{...args,fill:!0,"aria-label":"Secondary Navigation",children:[(0,jsx_runtime.jsx)(TabNavLink,{selected:!0,href:"/",children:"Tab Link 1"}),(0,jsx_runtime.jsx)(TabNavLink,{href:"/",children:"Tab Link 2"}),(0,jsx_runtime.jsx)(TabNavLink,{href:"/",children:"Tab Link 3"})]}),TabsNav={render:()=>(0,jsx_runtime.jsx)(TabsNavExample,{})},TabsInteractiveContentExample=args=>(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsxs)(Tabs,{...args,children:[(0,jsx_runtime.jsxs)(TabList,{mx:24,children:[(0,jsx_runtime.jsx)(Tab,{children:"Interactive Tab 1"}),(0,jsx_runtime.jsx)(Tab,{children:"Just Plain Tab 2"}),(0,jsx_runtime.jsx)(Tab,{children:"Also Interactive Tab 3"})]}),(0,jsx_runtime.jsxs)(TabPanels,{my:24,className:"lol",children:[(0,jsx_runtime.jsxs)(TabPanel,{tabIndex:-1,children:[(0,jsx_runtime.jsx)(Text.E,{as:"h2",children:"Welcome to Tab 1"}),(0,jsx_runtime.jsx)(FillButton.S,{children:"I should come into focus, rather than the panel."})]}),(0,jsx_runtime.jsxs)(TabPanel,{children:[(0,jsx_runtime.jsx)(Text.E,{as:"h2",children:"Welcome to Tab 2"}),(0,jsx_runtime.jsx)(Text.E,{children:"I am normal. My panel should just focus."})]}),(0,jsx_runtime.jsxs)(TabPanel,{tabIndex:-1,children:[(0,jsx_runtime.jsx)(Text.E,{as:"h2",children:"Welcome to Tab 3"}),(0,jsx_runtime.jsx)(FillButton.S,{variant:"secondary",children:"I also should come into focus, rather than the panel."})]})]})]})}),TabsInteractiveContent={render:()=>(0,jsx_runtime.jsx)(TabsInteractiveContentExample,{})},__namedExportsOrder=["Default","Controlled","TabsBadge","TabsBlock","TabsNav","TabsInteractiveContent"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: args => <TabsExample {...args} />\n}",...Default.parameters?.docs?.source}}},Controlled.parameters={...Controlled.parameters,docs:{...Controlled.parameters?.docs,source:{originalSource:"{\n  render: () => <TabsControlledExample />\n}",...Controlled.parameters?.docs?.source}}},TabsBadge.parameters={...TabsBadge.parameters,docs:{...TabsBadge.parameters?.docs,source:{originalSource:"{\n  render: () => <TabsBadgeExample />\n}",...TabsBadge.parameters?.docs?.source}}},TabsBlock.parameters={...TabsBlock.parameters,docs:{...TabsBlock.parameters?.docs,source:{originalSource:"{\n  render: () => <TabsBlockVariantExample />\n}",...TabsBlock.parameters?.docs?.source}}},TabsNav.parameters={...TabsNav.parameters,docs:{...TabsNav.parameters?.docs,source:{originalSource:"{\n  render: () => <TabsNavExample />\n}",...TabsNav.parameters?.docs?.source}}},TabsInteractiveContent.parameters={...TabsInteractiveContent.parameters,docs:{...TabsInteractiveContent.parameters?.docs,source:{originalSource:"{\n  render: () => <TabsInteractiveContentExample />\n}",...TabsInteractiveContent.parameters?.docs?.source}}}}}]);