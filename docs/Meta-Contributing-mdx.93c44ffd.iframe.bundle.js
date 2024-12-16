"use strict";(self.webpackChunkgamut_repo=self.webpackChunkgamut_repo||[]).push([[9187],{"./packages/styleguide/src/lib/Meta/Contributing.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent,parameters:()=>parameters});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_circleci_repo_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_styleguide_blocks__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/styleguide/.storybook/components/index.tsx");const parameters={id:"Contributing",title:"Contributing",subtitle:"Thanks so much for being interested in contributing to Gamut!\nWe love working with Codecademy employees across all our teams.",status:"static"};function _createMdxContent(props){const _components={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,_home_circleci_repo_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_3__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.W8,{title:"Meta/Contributing"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_styleguide_blocks__WEBPACK_IMPORTED_MODULE_2__.Rd,{...parameters}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"prework",children:"Prework"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["We track planned work for Gamut components in the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://skillsoftdev.atlassian.net/jira/software/projects/GM/boards/784",rel:"nofollow",children:"Gamut Board"})," on JIRA."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"If there's a ticket there you want to take on, send a Slack to #gamut-team or come to Gamut Office hours and lets talk about it!"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"If the work you'd like to do isn't captured in a JIRA ticket, talk to us and we can work with you to create that ticket."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"If you would like to make a request for work to be done, please discuss with us on Slack or during Gamut Office Hours."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"If you'd like to pitch a change to the design system, please attend Gamut Crit, come to Gamut Office Hours, or send a Slack message to #gamut-team."}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"writing-components",children:"Writing components"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"component-structure",children:"Component structure"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Create your component as an ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"index.tsx"})," file in a PascalCase-named folder within its package directory, such as ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"packages/gamut/src/ProgressBar/index.tsx"}),".\nConsider saving this recommended format as an editor snippet:"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-tsx",children:"import React from 'react';\n\nexport type MyComponentProps = {\n  /* ... */\n};\n\nexport const MyComponent: React.FC<MyComponentProps> = (\n  {\n    /* ... */\n  }\n) => {\n  // ...\n};\n"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"props-documentation",children:"Props documentation"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["With the exception of widespread, self-documenting props such as ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"onClick"}),", please include a sentence cased description of the prop's intent.\nReact props on the component will be picked up by Storybook and added to the component's documentation story.\nWe prefer these be full sentences."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-ts",children:"/**\n * Number of lines to limit the message to.\n */\nlimit: number;\n"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"If your comment purely restartes the name and type of variable, please either elaborate on it or remove the comment altogether."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:["Consider starting comments for booleans with ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.em,{children:'"Whether "'}),"."]}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"unit-tests",children:"Unit tests"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Your component should have unit tests in a ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"__tests__/MyComponent-test.tsx"})," file within its directory.\nUse Enzyme's ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"mount"})," to test it."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"We generally try to unit test all component logic, with the exception of class names in components that contain other logic."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"stories",children:"Stories"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["All components must have Storybook stories showing their use. See ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_styleguide_blocks__WEBPACK_IMPORTED_MODULE_2__.WS,{id:"Meta/Stories",children:"Stories"})," for documentation."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"pull-requests",children:"Pull requests"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Please fill out the pull request template, including links to the corresponding Abstract design and JIRA ticket."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_styleguide_blocks__WEBPACK_IMPORTED_MODULE_2__.Pq,{text:"You can use a [Draft PR](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests#draft-pull-requests) to just run CI jobs. That includes deploying a Netlify preview and publishing alpha package versions to npm. 😉"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"publishing-updates",children:"Publishing updates"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["If you know your PR has breaking changes in at least one downstream repository, such as the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://github.com/codecademy-engineering/mono",rel:"nofollow",children:"codecademy-engineering/mono"}),":"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ol,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Before merging it, create PRs in those downstream repositories using your PR's published alpha package versions"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Verify those PRs work as expected and get them signed off normally"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Merge your Gamut PR"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Wait until the new Gamut package is published, then update the downstream repository PRs to use it"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Merge and deploy those PRs as soon as possible"}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["If your PR contains breaking changes that might affect other users, please mention them in the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"#frontend"})," Slack channel."]})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_circleci_repo_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_3__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}}}]);