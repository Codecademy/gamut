"use strict";(self.webpackChunkgamut_repo=self.webpackChunkgamut_repo||[]).push([[3487],{"./packages/gamut/src/Overlay/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{h:()=>Overlay});var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js"),_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/gamut-styles/src/index.ts"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js"),_BodyPortal__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./packages/gamut/src/BodyPortal/index.tsx"),_Box__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/gamut/src/Box/FlexBox.tsx"),_FocusTrap__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/gamut/src/FocusTrap/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const OverlayContainer=(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.A)(_Box__WEBPACK_IMPORTED_MODULE_4__.p,{target:"ehbt6p30",label:"OverlayContainer"})((0,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.xP)({shroud:{bg:"navy-600"},inline:{position:"absolute"}}),""),Overlay=_ref=>{let{className,children,shroud=!1,inline=!1,clickOutsideCloses=!0,escapeCloses=!0,onRequestClose,isOpen,allowScroll=!1}=_ref;const handleOutsideClick=(0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((()=>{clickOutsideCloses&&onRequestClose()}),[clickOutsideCloses,onRequestClose]),handleEscapeKey=(0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((()=>{escapeCloses&&onRequestClose()}),[escapeCloses,onRequestClose]);if(!isOpen)return null;const content=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(OverlayContainer,{position:"fixed","data-testid":"overlay-content-container",center:!0,inset:0,className,inline,shroud,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_FocusTrap__WEBPACK_IMPORTED_MODULE_5__.s,{active:!inline,onClickOutside:handleOutsideClick,onEscapeKey:handleEscapeKey,allowPageInteraction:allowScroll,children})});return inline?content:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_BodyPortal__WEBPACK_IMPORTED_MODULE_6__.D,{children:content})};try{Overlay.displayName="Overlay",Overlay.__docgenInfo={description:"",displayName:"Overlay",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},clickOutsideCloses:{defaultValue:{value:"true"},description:"Whether clicking on the screen outside of the container should close the Overlay.",name:"clickOutsideCloses",required:!1,type:{name:"boolean"}},escapeCloses:{defaultValue:{value:"true"},description:"Whether clicking the escape key should close the Overlay.",name:"escapeCloses",required:!1,type:{name:"boolean"}},onRequestClose:{defaultValue:null,description:"Called when the Overlay requests to be closed,\nthis could be due to clicking outside of the overlay, or by clicking the escape key.",name:"onRequestClose",required:!0,type:{name:"() => void"}},isOpen:{defaultValue:null,description:"Whether the overlay is rendered.",name:"isOpen",required:!1,type:{name:"boolean"}},inline:{defaultValue:{value:"false"},description:"Whether the overlay renders inline to its container or creates a portal to the end of the body",name:"inline",required:!1,type:{name:"boolean"}},shroud:{defaultValue:{value:"false"},description:"Whether the overlay has a transparent or a shrouded background with slight opacity",name:"shroud",required:!1,type:{name:"boolean"}},allowScroll:{defaultValue:{value:"false"},description:"Whether the overlay allows scroll",name:"allowScroll",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Overlay/index.tsx#Overlay"]={docgenInfo:Overlay.__docgenInfo,name:"Overlay",path:"packages/gamut/src/Overlay/index.tsx#Overlay"})}catch(__react_docgen_typescript_loader_error){}},"./packages/styleguide/src/lib/Molecules/Modals/Overlay/Overlay.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent,parameters:()=>parameters});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_circleci_repo_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_styleguide_blocks__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/styleguide/.storybook/components/index.tsx"),_Overlay_stories__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/styleguide/src/lib/Molecules/Modals/Overlay/Overlay.stories.tsx");const parameters={subtitle:"Overlay primitives are controlled components that are told whether they're open by their parent. They're very basic and don't have animations defined.",status:"current",source:{repo:"gamut",githubLink:"https://github.com/Codecademy/gamut/blob/main/packages/gamut/src/Overlay/index.tsx"}};function _createMdxContent(props){const _components={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...(0,_home_circleci_repo_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.W8,{of:_Overlay_stories__WEBPACK_IMPORTED_MODULE_3__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_styleguide_blocks__WEBPACK_IMPORTED_MODULE_2__.Bg,{...parameters}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"usage",children:"Usage"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Use this overlay only for actual 'overlay' content that takes up the full screen. Do not use it for dropdowns or other small interactive items."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Unlike the legacy ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Modal"})," implementations in the monolith, this:"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:["always assumes viewport is locked, by making content ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"position: fixed"})]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"cannot override contentProps, animation, or shouldFocusOnMount."}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"when-not-to-use",children:"When NOT to use:"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:["If you need styles such as a background behind content, see ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Modal"})," for general modals and ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Dialog"})," for confirmation flows."]}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"playground",children:"Playground"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{sourceState:"shown",of:_Overlay_stories__WEBPACK_IMPORTED_MODULE_3__.Default}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.H2,{})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_circleci_repo_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./packages/styleguide/src/lib/Molecules/Modals/Overlay/Overlay.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _codecademy_gamut__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/gamut/src/Overlay/index.tsx"),_codecademy_gamut__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/gamut/src/Button/FillButton.tsx"),_codecademy_gamut__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/gamut/src/Box/FlexBox.tsx"),_codecademy_gamut__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/gamut/src/Typography/Text.tsx"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:_codecademy_gamut__WEBPACK_IMPORTED_MODULE_2__.h,args:{shroud:!0}},DefaultExample=args=>{const[open,setOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_codecademy_gamut__WEBPACK_IMPORTED_MODULE_3__.S,{onClick:()=>setOpen(!0),children:"Open Overlay"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_codecademy_gamut__WEBPACK_IMPORTED_MODULE_4__.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_codecademy_gamut__WEBPACK_IMPORTED_MODULE_2__.h,{...args,clickOutsideCloses:!0,isOpen:open,onRequestClose:()=>setOpen(!1),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_codecademy_gamut__WEBPACK_IMPORTED_MODULE_4__.p,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_codecademy_gamut__WEBPACK_IMPORTED_MODULE_5__.E,{variant:"title-lg",children:"Hooray!"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_codecademy_gamut__WEBPACK_IMPORTED_MODULE_3__.S,{onClick:()=>setOpen(!1),children:"Close Overlay"})]})})})]})},Default={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DefaultExample,{...args})},__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: args => <DefaultExample {...args} />\n}",...Default.parameters?.docs?.source}}}}}]);