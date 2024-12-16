"use strict";(self.webpackChunkgamut_repo=self.webpackChunkgamut_repo||[]).push([[1519],{"./packages/gamut-patterns/dist/patterns/DotDense.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{R:()=>DotDense});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_props__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/gamut-patterns/dist/props.js"),_usePatternId__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/gamut-patterns/dist/usePatternId.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const DotDense=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((_ref,svgRef)=>{let{title="Dot Dense",titleId,...props}=_ref;const patternId=(0,_usePatternId__WEBPACK_IMPORTED_MODULE_2__.J)("DotDense");return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_props__WEBPACK_IMPORTED_MODULE_3__.B,{fill:"currentColor",role:"img","aria-hidden":"true",ref:svgRef,"aria-labelledby":titleId,...props,children:[title?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("title",{id:titleId,children:title}):null,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("pattern",{id:patternId,x:0,y:0,width:4,height:4,patternUnits:"userSpaceOnUse",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("circle",{cx:.5,cy:.5,r:.5,fill:"currentColor"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("rect",{width:"100%",height:"100%",fill:`url(#${patternId})`})]})}));DotDense.__docgenInfo={description:"",methods:[],displayName:"DotDense"}},"./packages/gamut/src/FloatingCard/FloatingCard.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>FloatingCard});var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js"),_codecademy_gamut_patterns__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/gamut-patterns/dist/patterns/CheckerDense.js"),_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/gamut-styles/src/index.ts"),_codecademy_variance__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/variance/src/index.ts"),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/index.js"),_Box__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./packages/gamut/src/Box/Box.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const cardProps=_codecademy_variance__WEBPACK_IMPORTED_MODULE_2__.GV.compose(_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.qU.layout,_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.qU.padding),beakVariants=_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.qU.variant({prop:"beak",base:{p:12,"&:after":{content:'""',width:"1.25rem",height:"1.25rem",bg:"inherit",transform:"rotate(45deg)",position:"absolute",border:1,borderStyleRight:"none",borderStyleBottom:"none"}},variants:{"bottom-left":{"&:after":{bottom:"calc(-0.625rem - 1px)",left:"1.5rem",transform:"rotate(225deg)"}},"bottom-right":{"&:after":{bottom:"calc(-0.625rem - 1px)",right:"1.5rem",transform:"rotate(225deg)"}},"top-left":{"&:after":{top:"calc(-0.625rem - 1px)",left:"1.5rem",transform:"rotate(45deg)"}},"top-right":{"&:after":{top:"calc(-0.625rem - 1px)",right:"1.5rem",transform:"rotate(45deg)"}}}}),CardBody=(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.A)("div",_extends({},{target:"eq74rko0",label:"CardBody"},_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.W8))(_codecademy_gamut_styles__WEBPACK_IMPORTED_MODULE_1__.qU.css({p:12,zIndex:1,position:"relative",bg:"background",border:1,maxWidth:1}),beakVariants,cardProps,""),FloatingCard=(0,react__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(((_ref,ref)=>{let{children,className,pattern:Pattern=_codecademy_gamut_patterns__WEBPACK_IMPORTED_MODULE_5__.V,shadow="bottomLeft",containerDisplay="inline-block",...rest}=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_Box__WEBPACK_IMPORTED_MODULE_6__.a,{display:containerDisplay,position:"relative",zIndex:1,maxWidth:"100%",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Pattern,{dimensions:1,position:"absolute",top:"0.5rem",left:"bottomLeft"===shadow?"-0.5rem":void 0,right:"bottomRight"===shadow?"-0.5rem":void 0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(CardBody,{className,...rest,ref,children})]})}));try{FloatingCard.displayName="FloatingCard",FloatingCard.__docgenInfo={description:"",displayName:"FloatingCard",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/gamut/src/FloatingCard/FloatingCard.tsx#FloatingCard"]={docgenInfo:FloatingCard.__docgenInfo,name:"FloatingCard",path:"packages/gamut/src/FloatingCard/FloatingCard.tsx#FloatingCard"})}catch(__react_docgen_typescript_loader_error){}},"./packages/styleguide/src/lib/Atoms/FloatingCard/FloatingCard.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent,parameters:()=>parameters});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_circleci_repo_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_styleguide_blocks__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/styleguide/.storybook/components/index.tsx"),_FloatingCard_stories__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/styleguide/src/lib/Atoms/FloatingCard/FloatingCard.stories.tsx");const parameters={subtitle:"A card with a persistent patterned shadow meant for user feedback or interaction outside the normal flow.",status:"current",design:{type:"figma",url:"https://www.figma.com/design/ReGfRNillGABAj5SlITalN/%F0%9F%93%90-Gamut?node-id=29975-39392&node-type=frame&t=SgphNxlCwEFrcv0X-0"},source:{repo:"gamut",githubLink:"https://github.com/Codecademy/gamut/blob/main/packages/gamut/src/FloatingCard"}};function _createMdxContent(props){const _components={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,_home_circleci_repo_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.W8,{of:_FloatingCard_stories__WEBPACK_IMPORTED_MODULE_3__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_styleguide_blocks__WEBPACK_IMPORTED_MODULE_2__.Bg,{...parameters}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"usage",children:"Usage"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"They have patterned drop shadow to indicate that are outside the normal document flow."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:["This is a shared component used to create ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Toast"}),", ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Dialog"}),", and ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Coachmark"}),"; before using this component directly please check that these components do not cover your use case!"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Tooltip"})," shares many styles with FloatingCards but is used more widely and does not have a shadow as that might detract from the critical functions it serves."]}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"beaks",children:"Beaks"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["FloatingCards can optionally display a beak. This is used to indicate a point of interest to the user - that the content of the card describes. Beaks are primarily used in ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Coachmarks"}),"."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_FloatingCard_stories__WEBPACK_IMPORTED_MODULE_3__.BeakBottomLeft}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_FloatingCard_stories__WEBPACK_IMPORTED_MODULE_3__.BeakBottomRight}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_FloatingCard_stories__WEBPACK_IMPORTED_MODULE_3__.BeakTopLeft}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_FloatingCard_stories__WEBPACK_IMPORTED_MODULE_3__.BeakTopRight}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"shadow-direction",children:"Shadow direction"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"There are 2 types of shadow directions. The default shadow offset is bottom left."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_FloatingCard_stories__WEBPACK_IMPORTED_MODULE_3__.ShadowBottomLeft}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_FloatingCard_stories__WEBPACK_IMPORTED_MODULE_3__.ShadowBottomRight}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"shadow-pattern",children:"Shadow pattern"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["We can specify the pattern of the FloatingCard shadow by providing the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"pattern"})," prop with the imported pattern from ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"@codecademy/gamut-patterns"}),"."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["See the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_styleguide_blocks__WEBPACK_IMPORTED_MODULE_2__.WS,{id:"Atoms/Patterns",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Patterns"})})," story to view all the possible pattern options."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_FloatingCard_stories__WEBPACK_IMPORTED_MODULE_3__.ShadowPattern}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"card-wrapper-display",children:"Card wrapper display"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["By default a ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"FloatingCard"})," has a wrapper with a display of ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"inline-block"}),". However, if you need to you can set the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"containerDisplay"})," to ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"block"}),", as shown below:"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-tsx",children:"import { FloatingCard } from '@codecademy/gamut';\nimport { DotDense } from '@codecademy/gamut-patterns';\n\nexport const MyComponent: React.FC = () => {\n  return (\n    <FloatingCard pattern={DotDense} containerDisplay=\"block\">\n      Take up all the space.\n    </FloatingCard>\n  );\n};\n"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"playground",children:"Playground"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{sourceState:"shown",of:_FloatingCard_stories__WEBPACK_IMPORTED_MODULE_3__.Default}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.H2,{})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_circleci_repo_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./packages/styleguide/src/lib/Atoms/FloatingCard/FloatingCard.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BeakBottomLeft:()=>BeakBottomLeft,BeakBottomRight:()=>BeakBottomRight,BeakTopLeft:()=>BeakTopLeft,BeakTopRight:()=>BeakTopRight,Default:()=>Default,ShadowBottomLeft:()=>ShadowBottomLeft,ShadowBottomRight:()=>ShadowBottomRight,ShadowPattern:()=>ShadowPattern,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _codecademy_gamut__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/gamut/src/FloatingCard/FloatingCard.tsx"),_codecademy_gamut_patterns__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/gamut-patterns/dist/patterns/DotDense.js");const __WEBPACK_DEFAULT_EXPORT__={component:_codecademy_gamut__WEBPACK_IMPORTED_MODULE_0__.J,args:{children:"Yakety Yak don't don't talk back!"}},Default={args:{}},BeakBottomLeft={args:{beak:"bottom-left",children:"Beak Bottom Left"}},BeakBottomRight={args:{beak:"bottom-right",children:"Beak Bottom Right"}},BeakTopLeft={args:{beak:"top-left",children:"Beak Top Left"}},BeakTopRight={args:{beak:"top-right",children:"Beak Top Right"}},ShadowBottomLeft={args:{shadow:"bottomLeft",children:"Shadow Bottom Left"}},ShadowBottomRight={args:{shadow:"bottomRight",children:"Shadow Bottom Right"}},ShadowPattern={args:{pattern:_codecademy_gamut_patterns__WEBPACK_IMPORTED_MODULE_1__.R}},__namedExportsOrder=["Default","BeakBottomLeft","BeakBottomRight","BeakTopLeft","BeakTopRight","ShadowBottomLeft","ShadowBottomRight","ShadowPattern"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Default.parameters?.docs?.source}}},BeakBottomLeft.parameters={...BeakBottomLeft.parameters,docs:{...BeakBottomLeft.parameters?.docs,source:{originalSource:"{\n  args: {\n    beak: 'bottom-left',\n    children: 'Beak Bottom Left'\n  }\n}",...BeakBottomLeft.parameters?.docs?.source}}},BeakBottomRight.parameters={...BeakBottomRight.parameters,docs:{...BeakBottomRight.parameters?.docs,source:{originalSource:"{\n  args: {\n    beak: 'bottom-right',\n    children: 'Beak Bottom Right'\n  }\n}",...BeakBottomRight.parameters?.docs?.source}}},BeakTopLeft.parameters={...BeakTopLeft.parameters,docs:{...BeakTopLeft.parameters?.docs,source:{originalSource:"{\n  args: {\n    beak: 'top-left',\n    children: 'Beak Top Left'\n  }\n}",...BeakTopLeft.parameters?.docs?.source}}},BeakTopRight.parameters={...BeakTopRight.parameters,docs:{...BeakTopRight.parameters?.docs,source:{originalSource:"{\n  args: {\n    beak: 'top-right',\n    children: 'Beak Top Right'\n  }\n}",...BeakTopRight.parameters?.docs?.source}}},ShadowBottomLeft.parameters={...ShadowBottomLeft.parameters,docs:{...ShadowBottomLeft.parameters?.docs,source:{originalSource:"{\n  args: {\n    shadow: 'bottomLeft',\n    children: 'Shadow Bottom Left'\n  }\n}",...ShadowBottomLeft.parameters?.docs?.source}}},ShadowBottomRight.parameters={...ShadowBottomRight.parameters,docs:{...ShadowBottomRight.parameters?.docs,source:{originalSource:"{\n  args: {\n    shadow: 'bottomRight',\n    children: 'Shadow Bottom Right'\n  }\n}",...ShadowBottomRight.parameters?.docs?.source}}},ShadowPattern.parameters={...ShadowPattern.parameters,docs:{...ShadowPattern.parameters?.docs,source:{originalSource:"{\n  args: {\n    pattern: DotDense\n  }\n}",...ShadowPattern.parameters?.docs?.source}}}}}]);