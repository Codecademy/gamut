"use strict";(self.webpackChunkgamut_repo=self.webpackChunkgamut_repo||[]).push([[8288],{"./packages/styleguide/src/lib/Organisms/Lists & Tables/DataList/DataList.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent,parameters:()=>parameters});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_circleci_repo_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_styleguide_blocks__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/styleguide/.storybook/components/index.tsx"),_DataList_stories__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/styleguide/src/lib/Organisms/Lists & Tables/DataList/DataList.stories.tsx");const parameters={subtitle:"Displays rich information and supports visually distinctive formats for individual List Items.",status:"current",source:{repo:"gamut",githubLink:"https://github.com/Codecademy/gamut/blob/main/packages/gamut/src/DataList/DataList.tsx"}};function _createMdxContent(props){const _components={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,_home_circleci_repo_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.W8,{of:_DataList_stories__WEBPACK_IMPORTED_MODULE_3__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_styleguide_blocks__WEBPACK_IMPORTED_MODULE_2__.Bg,{...parameters}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"design-principles",children:"Design principles"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"Recommended for engaging with individual Items"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Manage and open Items inside your List"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Expand the format of items to surface advanced layouts"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Include rich information and controls inside of each List Item"}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"Customize Items with rich information"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Icons, graphics, complex layouts, other Atoms"}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"Optional List-level interactions include"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Basic filtering and sorting across common attributes across Items"}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"Be careful about placement and positioning"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Make sure Item controls are visible on the right"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Place Lists inside main containers to avoid overflow"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Use a Table if you have a design that’s meant to compare information between items"}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"usage",children:"Usage"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"DataList"})," is great for displaying a table of items that contain a lot of information. The top row of the table is the header, and each row below is a list item. You can customize the list items with information and control its expanded and unexpanded state."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"sample-code",children:"Sample code"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-tsx",children:"const DataTown = () => {\n  const [selectedRows, setSelectedRows] = useState([]);\n  const [expandedRows, setExpandedRows] = useState([]);\n\n  const queryData = useLocalQuery({\n    idKey: 'name',\n    rows: crew,\n    columns: [\n      { key: 'name', sortable: true, size: 'sm' },\n      { key: 'ship', sortable: true, size: 'sm' },\n    ],\n  });\n\n  return (\n    <DataList\n      id=\"example\"\n      selectedRows={selectedRows}\n      onRowSelect={setSelectedRows}\n      expandedRows={expandedRows}\n      onRowExpand={setExpandedRows}\n      renderExpanded={({ name }) => <>{name}: This is pretty cool</>}\n      {...queryData}\n    />\n  );\n};\n"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"full-example",children:"Full example"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_DataList_stories__WEBPACK_IMPORTED_MODULE_3__.FullDataList}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"configurations",children:"Configurations"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"expanded",children:"Expanded"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Rows in a DataList can be expanded to show more information. You can set the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"expanded"})," prop to an array of row keys to expand them by default."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_DataList_stories__WEBPACK_IMPORTED_MODULE_3__.Expanded}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"selected",children:"Selected"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Rows in a DataList can also be selected. You can set the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"selected"})," prop to an array of row keys to select them by default."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_DataList_stories__WEBPACK_IMPORTED_MODULE_3__.Selected}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"additional-column-configurations",children:"Additional column configurations"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"size"})," - enum which determines how much space the column should take up within the table"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"fill"})," - boolean which, when set to true, takes up the remaining space in the table. If more than one column is set to ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"fill"}),", the remaining space will be divied up between those items."]}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"playground",children:"Playground"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{sourceState:"shown",of:_DataList_stories__WEBPACK_IMPORTED_MODULE_3__.Default}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.H2,{})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_circleci_repo_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./packages/styleguide/src/lib/Organisms/Lists & Tables/DataList/DataList.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Expanded:()=>Expanded,FullDataList:()=>FullDataList,Selected:()=>Selected,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _codecademy_gamut__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/gamut/src/DataList/DataList.tsx"),_codecademy_gamut__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/gamut/src/Box/FlexBox.tsx"),_codecademy_gamut__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/gamut/src/DataList/DataTable.tsx"),_examples__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/styleguide/src/lib/Organisms/Lists & Tables/examples.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:_codecademy_gamut__WEBPACK_IMPORTED_MODULE_2__.T,args:{id:"crew",idKey:"name",query:{sort:{name:"desc",role:"asc"}},rows:[{name:"Jean Luc Picard",role:"Captain",ship:"USS Enterprise"},{name:"Wesley Crusher",role:"Deus Ex Machina",ship:"USS Enterprise"},{name:"Geordie LaForge",role:"Chief Engineer / Rascal",ship:"Borg Cube"},{name:"Data",role:"Lt. Commander / Scamp",ship:"He is a ship"}],columns:[{label:"Name",key:"name",size:"lg",type:"header",sortable:!0},{label:"Rank",key:"role",size:"lg",sortable:!0},{label:"Ship",key:"ship",size:"lg",sortable:!0,fill:!0}],header:!1,spacing:"condensed",onRowSelect:()=>{},expandedContent:_ref=>{let{row}=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_codecademy_gamut__WEBPACK_IMPORTED_MODULE_3__.p,{borderTop:1,borderColor:"background-hover",p:16,pl:[0,64],children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_codecademy_gamut__WEBPACK_IMPORTED_MODULE_4__.b,{id:row.name,idKey:"id",header:!1,variant:"table",columns:[{key:"name",size:"md"},{key:"text",size:"lg"}],rows:[{id:1,name:"Sub Row 1",text:"Ooo very cool"},{id:2,name:"Sub Row 2",text:"Ooo very cool"},{id:3,name:"Sub Row 3",text:"Ooo very cool"}]})})}}},FullDataList={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_examples__WEBPACK_IMPORTED_MODULE_0__.jc,{})},Default={args:{}},Expanded={args:{expanded:["Data"]}},Selected={args:{selected:["Data"]}},__namedExportsOrder=["FullDataList","Default","Expanded","Selected"];FullDataList.parameters={...FullDataList.parameters,docs:{...FullDataList.parameters?.docs,source:{originalSource:"{\n  render: () => <DataListTemplate />\n}",...FullDataList.parameters?.docs?.source}}},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Default.parameters?.docs?.source}}},Expanded.parameters={...Expanded.parameters,docs:{...Expanded.parameters?.docs,source:{originalSource:"{\n  args: {\n    expanded: ['Data']\n  }\n}",...Expanded.parameters?.docs?.source}}},Selected.parameters={...Selected.parameters,docs:{...Selected.parameters?.docs,source:{originalSource:"{\n  args: {\n    selected: ['Data']\n  }\n}",...Selected.parameters?.docs?.source}}}}}]);