"use strict";(self.webpackChunkgamut_repo=self.webpackChunkgamut_repo||[]).push([[9099],{"./packages/gamut/src/Form/elements/FormGroupLabel.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{a:()=>FormGroupLabel});var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js"),_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/gamut-styles/src/index.ts"),___WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./packages/gamut/src/Box/FlexBox.tsx")),_Tip_InfoTip__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./packages/gamut/src/Tip/InfoTip/index.tsx"),_Typography_Text__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./packages/gamut/src/Typography/Text.tsx"),_styles__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/gamut/src/Form/styles/shared-system-props.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const labelSizeVariants=(0,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.Ox)({defaultVariant:"small",prop:"size",base:{display:"block",..._styles__WEBPACK_IMPORTED_MODULE_4__.y2},variants:{small:{lineHeight:"base"},large:{fontSize:22,lineHeight:"base",fontWeight:"title"}}}),labelStates=(0,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.xP)({disabled:_styles__WEBPACK_IMPORTED_MODULE_4__.ao}),Label=(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.A)("label",{target:"e1t0n89n0",label:"Label"})(labelSizeVariants,labelStates,""),FormGroupLabel=_ref=>{let{children,className,disabled,htmlFor,infotip,isSoloField,required,size,...rest}=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_5__.p,{mb:4,justifyContent:"space-between",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(Label,{...rest,htmlFor,disabled,className,size,as:htmlFor?"label":"div",children:[children,!isSoloField&&(required?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Typography_Text__WEBPACK_IMPORTED_MODULE_6__.E,{as:"span","aria-hidden":!0,children:"*"}):" (optional)")]}),infotip&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Tip_InfoTip__WEBPACK_IMPORTED_MODULE_7__.q,{...infotip})]})};try{FormGroupLabel.displayName="FormGroupLabel",FormGroupLabel.__docgenInfo={description:"",displayName:"FormGroupLabel",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"large"'}]}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},htmlFor:{defaultValue:null,description:"[The for/id string of a label or labelable form-related element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor). The outer FormGroup or FormLabel should have an identical string as the inner FormElement for accessibility purposes.",name:"htmlFor",required:!1,type:{name:"string"}},required:{defaultValue:null,description:"",name:"required",required:!1,type:{name:"boolean"}},infotip:{defaultValue:null,description:"[The for/id string of a label or labelable form-related element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor). The outer FormGroup or FormLabel should have an identical string as the inner FormElement for accessibility purposes.",name:"infotip",required:!1,type:{name:"InfoTipProps"}},isSoloField:{defaultValue:null,description:"Solo fields should always be required and have no optional/required text",name:"isSoloField",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/Form/elements/FormGroupLabel.tsx#FormGroupLabel"]={docgenInfo:FormGroupLabel.__docgenInfo,name:"FormGroupLabel",path:"packages/gamut/src/Form/elements/FormGroupLabel.tsx#FormGroupLabel"})}catch(__react_docgen_typescript_loader_error){}},"./packages/gamut/src/Form/styles/shared-system-props.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Aw:()=>formFieldStyles,BF:()=>formBaseFieldStylesObject,HW:()=>formBaseComponentStyles,Px:()=>formFieldFocusStyles,XL:()=>conditionalStyles,ao:()=>formFieldTextDisabledStyles,gL:()=>formFieldPaddingStyles,h$:()=>InputSelectors,rx:()=>conditionalStyleState,uD:()=>formFieldBaseDisabledStyles,xh:()=>formFieldDisabledStyles,y2:()=>formBaseStyles});var _codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/gamut-styles/src/index.ts");let InputSelectors=function(InputSelectors){return InputSelectors.HOVER="&:hover",InputSelectors.ACTIVE="&:active",InputSelectors.PLACEHOLDER="&:placeholder",InputSelectors.FOCUS="&:focus",InputSelectors.FOCUS_LABEL_DIV_CHILD="&:focus + label > div",InputSelectors.DISABLED="&:disabled, &[aria-disabled='true']",InputSelectors.BEFORE="&::before",InputSelectors.AFTER="&::after",InputSelectors.BEFORE_AND_AFTER="&::before, &::after",InputSelectors.CHECKED_BEFORE="&:checked + label::before",InputSelectors.CHECKED_AFTER="&:checked + label::after",InputSelectors.HOVER_FOCUS_BEFORE="&:hover + label::before, &:focus + label::before",InputSelectors}({});const formBaseStyles={fontWeight:"base",fontSize:16,color:"text"},formBaseComponentStyles={width:1,outline:"none",bg:"background",minWidth:"auto",...formBaseStyles},formFieldFocusStyles={borderColor:"primary",boxShadow:`inset 0 0 0 1px ${_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_0__.w4.colors.primary}`},formFieldTextDisabledStyles={color:"text-disabled",cursor:"not-allowed"},formFieldBaseDisabledStyles={borderColor:"currentColor",opacity:1,...formFieldTextDisabledStyles},formFieldDisabledStyles={...formFieldBaseDisabledStyles,bg:"background-disabled",[InputSelectors.HOVER]:{borderColor:"currentColor"}},formFieldPaddingStyles={py:12,px:8},formBaseFieldStylesObject={...formBaseComponentStyles,transition:(0,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_0__.ab)(["background-color","box-shadow"],"slow","ease-in-out"),border:1,borderRadius:"md",[InputSelectors.HOVER]:{borderColor:"primary"},[InputSelectors.PLACEHOLDER]:{fontStyle:"italic"},[InputSelectors.DISABLED]:{...formFieldDisabledStyles}},formFieldStyles=(_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_0__.qU.css(formBaseFieldStylesObject),_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_0__.qU.css({...formBaseFieldStylesObject,...formFieldPaddingStyles,lineHeight:"base",[InputSelectors.FOCUS]:formFieldFocusStyles})),conditionalStyles=_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_0__.qU.variant({variants:{error:{borderColor:"feedback-error",[InputSelectors.HOVER]:{borderColor:"feedback-error"},[InputSelectors.FOCUS]:{borderColor:"feedback-error",boxShadow:`inset 0 0 0 1px ${_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_0__.w4.colors["feedback-error"]}`}},activated:{borderColor:"currentColor"}}}),conditionalStyleState=(error,activated)=>error?"error":activated?"activated":void 0},"./packages/styleguide/src/lib/Atoms/FormElements/FormGroupLabel/FormGroupLabel.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent,parameters:()=>parameters});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_circleci_repo_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_styleguide_blocks__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/styleguide/.storybook/components/index.tsx"),_FormGroupLabel_stories__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/styleguide/src/lib/Atoms/FormElements/FormGroupLabel/FormGroupLabel.stories.tsx");const parameters={subtitle:"A label element to be tied to a group of elements.",design:{type:"figma",url:"https://www.figma.com/file/ReGfRNillGABAj5SlITalN/%F0%9F%93%90-Gamut?node-id=1189%3A0"},status:"current",source:{repo:"gamut",githubLink:"https://github.com/Codecademy/gamut/blob/main/packages/gamut/src/Form/elements/FormGroupLabel.tsx"}};function _createMdxContent(props){const _components={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...(0,_home_circleci_repo_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.W8,{of:_FormGroupLabel_stories__WEBPACK_IMPORTED_MODULE_3__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_styleguide_blocks__WEBPACK_IMPORTED_MODULE_2__.Bg,{...parameters}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"usage",children:"Usage"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Provide a label to a group of form elements."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"variants",children:"Variants"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["A ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"FormGroupLabel"})," can come in different variants:"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"default, which without any additional styling"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"size='large'"})," to include a label with larger text"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"disabled"})," to render the label in a disabled state"]}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"default",children:"Default"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_FormGroupLabel_stories__WEBPACK_IMPORTED_MODULE_3__.Default}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"large-size",children:"Large size"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Setting the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"size"})," prop to ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"'large'"})," will render the label with larger text."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_FormGroupLabel_stories__WEBPACK_IMPORTED_MODULE_3__.LargeSize}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"disabled",children:"Disabled"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_FormGroupLabel_stories__WEBPACK_IMPORTED_MODULE_3__.Disabled}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.h2,{id:"including-htmlfor",children:["Including ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"htmlFor"})]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["It is best to provide ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"htmlFor"})," to both the FormGroup + inner form element to make it super accessible. If this is not provided, the FormLabel will default to ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"<div>"}),". If an ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"htmlFor"})," is provided, it will be a ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"<label>"}),". You can inspect the elements in the browser to see the difference."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["With ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"htmlFor"}),":"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_FormGroupLabel_stories__WEBPACK_IMPORTED_MODULE_3__.WithHtmlFor}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Without ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"htmlFor"}),":"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_FormGroupLabel_stories__WEBPACK_IMPORTED_MODULE_3__.WithoutHtmlFor}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"playground",children:"Playground"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{sourceState:"shown",of:_FormGroupLabel_stories__WEBPACK_IMPORTED_MODULE_3__.Default}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.H2,{})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_circleci_repo_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./packages/styleguide/src/lib/Atoms/FormElements/FormGroupLabel/FormGroupLabel.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Disabled:()=>Disabled,LargeSize:()=>LargeSize,WithHtmlFor:()=>WithHtmlFor,WithoutHtmlFor:()=>WithoutHtmlFor,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={component:__webpack_require__("./packages/gamut/src/Form/elements/FormGroupLabel.tsx").a,args:{children:"I am a label"}},Default={args:{htmlFor:"label-default"}},LargeSize={args:{htmlFor:"label-large",size:"large"}},Disabled={args:{htmlFor:"label-disabled",disabled:!0}},WithHtmlFor={args:{htmlFor:"label",children:"I look like a label, and I am a label."}},WithoutHtmlFor={args:{children:"I look like a label, but I am not a label."}},__namedExportsOrder=["Default","LargeSize","Disabled","WithHtmlFor","WithoutHtmlFor"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    htmlFor: 'label-default'\n  }\n}",...Default.parameters?.docs?.source}}},LargeSize.parameters={...LargeSize.parameters,docs:{...LargeSize.parameters?.docs,source:{originalSource:"{\n  args: {\n    htmlFor: 'label-large',\n    size: 'large'\n  }\n}",...LargeSize.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:"{\n  args: {\n    htmlFor: 'label-disabled',\n    disabled: true\n  }\n}",...Disabled.parameters?.docs?.source}}},WithHtmlFor.parameters={...WithHtmlFor.parameters,docs:{...WithHtmlFor.parameters?.docs,source:{originalSource:"{\n  args: {\n    htmlFor: 'label',\n    children: 'I look like a label, and I am a label.'\n  }\n}",...WithHtmlFor.parameters?.docs?.source}}},WithoutHtmlFor.parameters={...WithoutHtmlFor.parameters,docs:{...WithoutHtmlFor.parameters?.docs,source:{originalSource:"{\n  args: {\n    children: 'I look like a label, but I am not a label.'\n  }\n}",...WithoutHtmlFor.parameters?.docs?.source}}}}}]);