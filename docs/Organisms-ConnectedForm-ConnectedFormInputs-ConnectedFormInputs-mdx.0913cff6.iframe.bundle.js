"use strict";(self.webpackChunkgamut_repo=self.webpackChunkgamut_repo||[]).push([[7360,2610],{"./packages/styleguide/src/lib/Organisms/ConnectedForm/ConnectedFormInputs/ConnectedFormInputs.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent,parameters:()=>parameters});__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),components=__webpack_require__("./packages/styleguide/.storybook/components/index.tsx"),ConnectedFormInputs_stories=__webpack_require__("./packages/styleguide/src/lib/Organisms/ConnectedForm/ConnectedFormInputs/ConnectedFormInputs.stories.tsx"),ListRow=__webpack_require__("./packages/gamut/src/List/ListRow.tsx"),ListCol=__webpack_require__("./packages/gamut/src/List/ListCol.tsx"),Text=__webpack_require__("./packages/gamut/src/Typography/Text.tsx"),Box=__webpack_require__("./packages/gamut/src/Box/Box.tsx"),List=__webpack_require__("./packages/gamut/src/List/List.tsx");const ListRowRenderer=_ref=>{let{inputs}=_ref;return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:inputs.map((_ref2=>{let{name,counterpart}=_ref2;return(0,jsx_runtime.jsxs)(ListRow.v,{children:[(0,jsx_runtime.jsx)(ListCol.f,{size:"lg",type:"header",children:(0,jsx_runtime.jsx)(Text.E,{as:"code",ml:8,children:name})}),(0,jsx_runtime.jsx)(ListCol.f,{size:"lg",fill:!0,children:(0,jsx_runtime.jsx)(components.WS,{id:`Atoms/FormInputs/${counterpart}`,children:counterpart})})]})}))})},ConnectedFormInputsTable=()=>(0,jsx_runtime.jsx)(Box.a,{mx:40,mt:16,mb:40,children:(0,jsx_runtime.jsx)(List.B,{variant:"table",children:(0,jsx_runtime.jsx)(ListRowRenderer,{inputs:[{name:"ConnectedInput",counterpart:"Input"},{name:"ConnectedSelect",counterpart:"Select"},{name:"ConnectedCheckbox",counterpart:"Checkbox"},{name:"ConnectedTextArea",counterpart:"TextArea"}]})})}),parameters={subtitle:"Different form inputs for the ConnectedForm component.",status:"updating",source:{repo:"gamut",githubLink:"https://github.com/Codecademy/gamut/blob/main/packages/gamut/src/ConnectedForm/ConnectedInputs/index.ts"}};function _createMdxContent(props){const _components={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,lib.R)(),...props.components};return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.W8,{of:ConnectedFormInputs_stories}),"\n",(0,jsx_runtime.jsx)(components.Bg,{...parameters}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"input-types",children:"Input types"}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:["We have a selection of ",(0,jsx_runtime.jsx)(_components.code,{children:"ConnectedInput"})," components that are visually identical to their un-connected ",(0,jsx_runtime.jsx)(components.WS,{id:"Atoms/FormInputs",children:"FormInput"})," counterparts. Please reference the links below for component-specific prop and styling configuration:"]}),"\n",(0,jsx_runtime.jsx)(ConnectedFormInputsTable,{}),"\n",(0,jsx_runtime.jsx)(_components.h3,{id:"connectedradiogroupinput",children:"ConnectedRadioGroupInput"}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:[(0,jsx_runtime.jsx)(_components.code,{children:"ConnectedRadioGroupInput"})," is the exception to the rule, and has some props that differ, particularly ",(0,jsx_runtime.jsx)(_components.code,{children:"options"})," — which takes an array of ",(0,jsx_runtime.jsx)(_components.code,{children:"ConnectedBaseRadioInputProps"})," components."]}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:["For further styling configurations, check out ",(0,jsx_runtime.jsx)(components.WS,{id:"Atoms/FormInputs/Radio",children:"RadioGroup"}),"."]}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:[(0,jsx_runtime.jsx)(_components.code,{children:"ConnectedRadioGroup"})," and ",(0,jsx_runtime.jsx)(_components.code,{children:"ConnectedRadio"})," should rarely, if ever, be used outside of ",(0,jsx_runtime.jsx)(_components.code,{children:"ConnectedRadioGroupInput"}),"."]}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"usage",children:"Usage"}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:["The components are engineered to be passed into the component prop of ",(0,jsx_runtime.jsx)(components.WS,{id:"Organisms/ConnectedForm/ConnectedFormGroup",children:"ConnectedFormGroup"}),", like so:"]}),"\n",(0,jsx_runtime.jsx)(_components.pre,{children:(0,jsx_runtime.jsx)(_components.code,{className:"language-tsx",children:"<ConnectedFormGroup\n  name=\"badRadioGroup\"\n  label=\"cool radio group dude\"\n  field={{\n    component: ConnectedRadioGroupInput,\n    // Type error, these options are not formatted correctly.\n    options: ['one', 'two', 'zero'],\n  }}\n/>\n\n<ConnectedFormGroup\n  name=\"goodRadioGroup\"\n  label=\"cool radio group dude\"\n  field={{\n    component: ConnectedRadioGroupInput,\n    // Perfection 🙌\n    options: [\n      { label: 'one', value: 'one' },\n      { label: 'two', value: 'two' },\n      { label: 'zero', value: 'zero' },\n    ],\n  }}\n/>\n"})}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:["Use outside of ",(0,jsx_runtime.jsx)(_components.code,{children:"ConnectedFormGroup"})," removes much of the accessibility and type-safety built into these components."]}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"delaying-updates-to-connectedform",children:"Delaying updates to ConnectedForm"}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"On forms with many nested and/or array-like fields, it can be useful for performance reasons to delay updating the form state until the user has finished updating a field (rather than, for example, on every keystroke in a text input)."}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:["To faciliate this, developers can use the ",(0,jsx_runtime.jsx)(_components.code,{children:"useDebouncedField"})," hook, which connects to ",(0,jsx_runtime.jsx)(_components.code,{children:"ConnectedForm"})," the same way that the ",(0,jsx_runtime.jsx)(_components.code,{children:"useField"})," hook or a ",(0,jsx_runtime.jsx)(_components.code,{children:"ConnectedInput"})," does internally, but delays the ",(0,jsx_runtime.jsx)(_components.code,{children:"setValue"})," call until the user has blurred focus on the input."]}),"\n",(0,jsx_runtime.jsx)(_components.pre,{children:(0,jsx_runtime.jsx)(_components.code,{className:"language-tsx",children:"// DebouncedInput.tsx\nimport { Input } from '@codecademy/gamut'\n\nexport const DebouncedInput: React.FC<...> = ({ name }) => {\n  const { onChange, onBlur, value } = useDebouncedField({ name, type: 'text' })\n\n  return (\n    <Input\n      name={name}\n      type=\"text\"\n      onChange={onChange}\n      onBlur={onBlur}\n      value={value}\n      htmlFor={name}\n    />\n  )\n}\n\n// FormPage.tsx\nimport { ConnectedForm } from '@codecademy/gamut'\nimport { DebouncedInput } from './DebouncedInput'\n\nenum FieldNames {\n  favoriteXFilesEpisode = 'favoriteXFilesEpisode'\n}\n\nexport const FormPage: React.FC = () => {\n  reutrn (\n    <ConnectedForm\n      defaultValues={{\n        [FieldNames.favoriteXFilesEpisode]: 'Bad Blood'\n      }}\n      onSubmit={() => ...}\n    >\n      <DebouncedInput\n        name={FieldNames.favoriteXFilesEpisode}\n      />\n    </ConnectedForm>\n  )\n}\n"})}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:[(0,jsx_runtime.jsx)(_components.code,{children:"useDebouncedField"})," should not be used with any varaint of the standard ",(0,jsx_runtime.jsx)(_components.code,{children:"ConnectedInput"}),", as it will clash with the default ",(0,jsx_runtime.jsx)(_components.code,{children:"useField"})," instance used internally by those components."]})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,lib.R)(),...props.components};return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./packages/styleguide/src/lib/Organisms/ConnectedForm/ConnectedFormInputs/ConnectedFormInputs.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={component:__webpack_require__("./packages/gamut/src/Box/Box.tsx").a,args:{}},Default={args:{}},__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Default.parameters?.docs?.source}}}}}]);