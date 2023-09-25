import _styled from "@emotion/styled/base";
import { Anchor, Box, Column, FillButton, FlexBox, GridBox, LayoutGrid, Text } from '@codecademy/gamut';
import { TinyBlocks } from '@codecademy/gamut-illustrations';
import { Background, css } from '@codecademy/gamut-styles';
import * as React from 'react';
import { careerPaths, topLanguages, topSubjects } from '../../../lib/catalogList';
import { DescriptionSectionContainer, LayoutGridAntiAliased } from '../../shared';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledColumn = /*#__PURE__*/_styled(Column, {
  target: "edbfvag1",
  label: "StyledColumn"
})(css({
  borderBottom: 1,
  borderColor: 'navy-300'
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyQ2F0YWxvZ1NlY3Rpb24vaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlDcUIiLCJmaWxlIjoiLi4vLi4vLi4vLi4vc3JjL0FwcEhlYWRlci9BcHBIZWFkZXJFbGVtZW50cy9BcHBIZWFkZXJDYXRhbG9nU2VjdGlvbi9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBbmNob3IsXG4gIEJveCxcbiAgQ29sdW1uLFxuICBGaWxsQnV0dG9uLFxuICBGbGV4Qm94LFxuICBHcmlkQm94LFxuICBMYXlvdXRHcmlkLFxuICBUZXh0LFxufSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBUaW55QmxvY2tzIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtaWxsdXN0cmF0aW9ucyc7XG5pbXBvcnQgeyBCYWNrZ3JvdW5kLCBjc3MgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQge1xuICBjYXJlZXJQYXRocyxcbiAgdG9wTGFuZ3VhZ2VzLFxuICB0b3BTdWJqZWN0cyxcbn0gZnJvbSAnLi4vLi4vLi4vbGliL2NhdGFsb2dMaXN0JztcbmltcG9ydCB7XG4gIERlc2NyaXB0aW9uU2VjdGlvbkNvbnRhaW5lcixcbiAgTGF5b3V0R3JpZEFudGlBbGlhc2VkLFxufSBmcm9tICcuLi8uLi9zaGFyZWQnO1xuaW1wb3J0IHtcbiAgQXBwSGVhZGVyQ2F0YWxvZ0Ryb3Bkb3duSXRlbSxcbiAgQXBwSGVhZGVyQ2xpY2tIYW5kbGVyLFxuICBBcHBIZWFkZXJJdGVtLFxufSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCB0eXBlIEFwcEhlYWRlckNhdGFsb2dTZWN0aW9uUHJvcHMgPSB7XG4gIGFjdGlvbjogQXBwSGVhZGVyQ2xpY2tIYW5kbGVyO1xuICBpdGVtOiBBcHBIZWFkZXJDYXRhbG9nRHJvcGRvd25JdGVtO1xuICByZWY/OiBSZWFjdC5SZWZPYmplY3Q8SFRNTFVMaXN0RWxlbWVudD47XG4gIHJvbGU/OiBzdHJpbmc7XG4gIGlkPzogc3RyaW5nO1xuICBrZXlEb3duRXZlbnRzPzogKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50KSA9PiB2b2lkO1xuICBpc09wZW4/OiBib29sZWFuO1xuICBoYW5kbGVDbG9zZT86ICgpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBTdHlsZWRDb2x1bW4gPSBzdHlsZWQoQ29sdW1uKShcbiAgY3NzKHtcbiAgICBib3JkZXJCb3R0b206IDEsXG4gICAgYm9yZGVyQ29sb3I6ICduYXZ5LTMwMCcsXG4gIH0pXG4pO1xuXG5jb25zdCBTdHlsZWRBbmNob3JDb2x1bW4gPSBzdHlsZWQoQ29sdW1uKShcbiAgY3NzKHtcbiAgICBwYjogMTYsXG4gICAgJyY6bGFzdC1jaGlsZCc6IHtcbiAgICAgIHBiOiAwLFxuICAgIH0sXG4gIH0pXG4pO1xuXG5jb25zdCBxdWl6QW5jaG9yRGF0YTogQXBwSGVhZGVySXRlbSA9IHtcbiAgdGV4dDogJ1Rha2Ugb3VyIHF1aXonLFxuICBpZDogJ3F1aXonLFxuICB0eXBlOiAndGV4dC1idXR0b24nLFxuICBocmVmOiAnL2V4cGxvcmUvc29ydGluZy1xdWl6JyxcbiAgdHJhY2tpbmdUYXJnZXQ6ICdzb3J0aW5nX3F1aXonLFxufTtcblxuY29uc3QgY2F0YWxvZ0J1dHRvbkRhdGE6IEFwcEhlYWRlckl0ZW0gPSB7XG4gIHRleHQ6ICdFeHBsb3JlIGFsbCBjb3Vyc2VzJyxcbiAgaWQ6ICdjYXRhbG9nJyxcbiAgdHlwZTogJ3RleHQtYnV0dG9uJyxcbiAgaHJlZjogJy9jYXRhbG9nJyxcbiAgdHJhY2tpbmdUYXJnZXQ6ICd0b3BuYXZfY2F0YWxvZ19leHBsb3JlX2Z1bGwnLFxufTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlID0gYCdsYW5ndWFnZSBsYW5ndWFnZSBzdWJqZWN0J1xuICAgICAgICAgICAgICAgICAgICAnbGFuZ3VhZ2UgbGFuZ3VhZ2Ugc3ViamVjdCdcbiAgICAgICAgICAgICAgICAgICAgJ2xhbmd1YWdlIGxhbmd1YWdlIHN1YmplY3QnXG4gICAgICAgICAgICAgICAgICAgICdsYW5ndWFnZSBsYW5ndWFnZSBzdWJqZWN0J1xuICAgICAgICAgICAgICAgICAgICAnbGFuZ3VhZ2UgbGFuZ3VhZ2Ugc3ViamVjdCdcbiAgICAgICAgICAgICAgICAgICAgJ2xhbmd1YWdlIGxhbmd1YWdlIHN1YmplY3QnYDtcblxuY29uc3QgcmVzcG9uc2l2ZUdyaWRUZW1wbGF0ZSA9IGAnbGFuZ3VhZ2UnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xhbmd1YWdlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsYW5ndWFnZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGFuZ3VhZ2UnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xhbmd1YWdlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsYW5ndWFnZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGFuZ3VhZ2UnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xhbmd1YWdlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsYW5ndWFnZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGFuZ3VhZ2UnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xhbmd1YWdlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsYW5ndWFnZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3BhY2UnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N1YmplY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N1YmplY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N1YmplY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N1YmplY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N1YmplY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N1YmplY3QnYDtcblxuZXhwb3J0IGNvbnN0IEFwcEhlYWRlckNhdGFsb2dTZWN0aW9uID0gUmVhY3QuZm9yd2FyZFJlZjxcbiAgSFRNTERpdkVsZW1lbnQsXG4gIEFwcEhlYWRlckNhdGFsb2dTZWN0aW9uUHJvcHNcbj4oKHsgYWN0aW9uLCBpdGVtLCBpc09wZW4sIGtleURvd25FdmVudHMsIGhhbmRsZUNsb3NlIH0sIHJlZikgPT4ge1xuICBjb25zdCB0YWJJbmRleCA9IGlzT3BlbiA9PT0gZmFsc2UgPyAtMSA6IDA7XG5cbiAgY29uc3Qgb25DbGljayA9IChcbiAgICBldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQW5jaG9yRWxlbWVudCB8IEhUTUxCdXR0b25FbGVtZW50LCBNb3VzZUV2ZW50PixcbiAgICBsaW5rSXRlbTogQXBwSGVhZGVySXRlbVxuICApID0+IHtcbiAgICBoYW5kbGVDbG9zZT8uKCk7XG4gICAgcmV0dXJuIGFjdGlvbihldmVudCwgbGlua0l0ZW0pO1xuICB9O1xuXG4gIGNvbnN0IERlc2NyaXB0aW9uU2VjdGlvbjogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQ8e1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgc3VidGl0bGU6IHN0cmluZztcbiAgfT4gPSAoeyB0aXRsZSwgc3VidGl0bGUgfSkgPT4gKFxuICAgIDxEZXNjcmlwdGlvblNlY3Rpb25Db250YWluZXJcbiAgICAgIGRhdGEtZm9jdXNhYmxlY2F0YWxvZz1cInRydWVcIlxuICAgICAgZGF0YS10ZXN0aWQ9XCJ0aXRsZS1kZXNjcmlwdGlvbi1zZWN0aW9uXCJcbiAgICAgIHRhYkluZGV4PXstMX1cbiAgICAgIGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIlxuICAgID5cbiAgICAgIDxUZXh0IGFzPVwiaDJcIiB2YXJpYW50PVwidGl0bGUteHNcIiBtYj17OH0gZm9udFdlaWdodD17NzAwfT5cbiAgICAgICAge3RpdGxlfVxuICAgICAgPC9UZXh0PlxuICAgICAgPFRleHQgZm9udFNpemU9ezE0fT57c3VidGl0bGV9PC9UZXh0PlxuICAgIDwvRGVzY3JpcHRpb25TZWN0aW9uQ29udGFpbmVyPlxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPExheW91dEdyaWRBbnRpQWxpYXNlZCBvbktleURvd249e2tleURvd25FdmVudHN9IHJlZj17cmVmfSBhcz1cInVsXCIgcD17MH0+XG4gICAgICA8U3R5bGVkQ29sdW1uIHNpemU9ezEyfSBrZXk9XCJQb3B1bGFyIGNvdXJzZSB0b3BpY3NcIiBhcz1cImxpXCI+XG4gICAgICAgIDxMYXlvdXRHcmlkPlxuICAgICAgICAgIDxDb2x1bW4gc2l6ZT17eyB4czogMTIsIGxnOiAzIH19PlxuICAgICAgICAgICAgPEJhY2tncm91bmRcbiAgICAgICAgICAgICAgYmc9XCJuYXZ5LTgwMFwiXG4gICAgICAgICAgICAgIGNvbG9yPVwiYmx1ZS0wXCJcbiAgICAgICAgICAgICAgcHg9e3sgXzogMTYsIHhzOiAzMiwgc206IDY0LCBtZDogNDgsIGxnOiAyNCB9fVxuICAgICAgICAgICAgICBweT17eyBfOiAxNiwgc206IDMyIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxEZXNjcmlwdGlvblNlY3Rpb25cbiAgICAgICAgICAgICAgICB0aXRsZT1cIlBvcHVsYXIgY291cnNlIHRvcGljc1wiXG4gICAgICAgICAgICAgICAgc3VidGl0bGU9XCJFeHBsb3JlIGZyZWUgb3IgcGFpZCBjb3Vyc2VzIGluIHRvcGljcyB0aGF0IGludGVyZXN0IHlvdS5cIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8RmlsbEJ1dHRvblxuICAgICAgICAgICAgICAgIG1vZGU9XCJkYXJrXCJcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ249e3sgXzogJ2NlbnRlcicsIG1kOiAnbGVmdCcgfX1cbiAgICAgICAgICAgICAgICBocmVmPXtjYXRhbG9nQnV0dG9uRGF0YS5ocmVmfVxuICAgICAgICAgICAgICAgIGRhdGEtZm9jdXNhYmxlY2F0YWxvZz1cInRydWVcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhcbiAgICAgICAgICAgICAgICAgIGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50LCBNb3VzZUV2ZW50PlxuICAgICAgICAgICAgICAgICkgPT4gb25DbGljayhldmVudCwgaXRlbSBhcyBBcHBIZWFkZXJJdGVtKX1cbiAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgbXQ9e3sgXzogMTYsIGxnOiA5NiB9fVxuICAgICAgICAgICAgICAgIG1heFdpZHRoPXsxNzB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7Y2F0YWxvZ0J1dHRvbkRhdGEudGV4dH1cbiAgICAgICAgICAgICAgPC9GaWxsQnV0dG9uPlxuICAgICAgICAgICAgPC9CYWNrZ3JvdW5kPlxuICAgICAgICAgIDwvQ29sdW1uPlxuICAgICAgICAgIDxDb2x1bW5cbiAgICAgICAgICAgIHNpemU9e3sgeHM6IDEyLCBsZzogOCB9fVxuICAgICAgICAgICAgcHk9ezMyfVxuICAgICAgICAgICAgcGw9e3sgXzogMTYsIHhzOiAzMiwgc206IDY0LCBtZDogNDggfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8R3JpZEJveFxuICAgICAgICAgICAgICBncmlkVGVtcGxhdGVBcmVhcz17e1xuICAgICAgICAgICAgICAgIF86IHJlc3BvbnNpdmVHcmlkVGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgbGc6IGdyaWRUZW1wbGF0ZSxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgIGdyaWRBcmVhPVwibGFuZ3VhZ2VcIlxuICAgICAgICAgICAgICAgIGRpc3BsYXk9XCJncmlkXCJcbiAgICAgICAgICAgICAgICBncmlkVGVtcGxhdGVDb2x1bW5zPXt7IF86ICcxZnInLCBsZzogJ3JlcGVhdCgyLCAxZnIpJyB9fVxuICAgICAgICAgICAgICAgIGdyaWRUZW1wbGF0ZVJvd3M9e3sgXzogJzFmcicsIGxnOiAncmVwZWF0KDYsIDFmciknIH19XG4gICAgICAgICAgICAgICAgZ3JpZEF1dG9GbG93PXt7IGxnOiAnY29sdW1uJyB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RvcExhbmd1YWdlcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICAgIDxCb3ggd2lkdGg9XCIxMnJlbVwiIGtleT17aXRlbS5pZH0gbWluSGVpZ2h0PXszMn0+XG4gICAgICAgICAgICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgICAgICAgICAgICBkYXRhLWZvY3VzYWJsZWNhdGFsb2c9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICAgICAgICAgICAgICBocmVmPXtpdGVtLmhyZWZ9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEFuY2hvckVsZW1lbnQsIE1vdXNlRXZlbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgKSA9PiBvbkNsaWNrKGV2ZW50LCBpdGVtIGFzIEFwcEhlYWRlckl0ZW0pfVxuICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnRleHR9XG4gICAgICAgICAgICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgZGlzcGxheT17eyBfOiAnYmxvY2snLCBsZzogJ25vbmUnIH19XG4gICAgICAgICAgICAgICAgcHk9ezE2fVxuICAgICAgICAgICAgICAgIGdyaWRBcmVhPVwic3BhY2VcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8Qm94IGdyaWRBcmVhPVwic3ViamVjdFwiIGRpc3BsYXk9XCJncmlkXCIgZ3JpZFRlbXBsYXRlQ29sdW1ucz1cIjFmclwiPlxuICAgICAgICAgICAgICAgIHt0b3BTdWJqZWN0cy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICAgIDxCb3ggd2lkdGg9XCIxMnJlbVwiIGtleT17aXRlbS5pZH0gbWluSGVpZ2h0PXszNn0+XG4gICAgICAgICAgICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgICAgICAgICAgICBkYXRhLWZvY3VzYWJsZWNhdGFsb2c9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICAgICAgICAgICAgICBocmVmPXtpdGVtLmhyZWZ9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEFuY2hvckVsZW1lbnQsIE1vdXNlRXZlbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgKSA9PiBvbkNsaWNrKGV2ZW50LCBpdGVtIGFzIEFwcEhlYWRlckl0ZW0pfVxuICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnRleHR9XG4gICAgICAgICAgICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPC9HcmlkQm94PlxuICAgICAgICAgIDwvQ29sdW1uPlxuICAgICAgICA8L0xheW91dEdyaWQ+XG4gICAgICA8L1N0eWxlZENvbHVtbj5cbiAgICAgIHshaXRlbS5oaWRlQ2FyZWVyUGF0aHMgJiYgKFxuICAgICAgICA8U3R5bGVkQ29sdW1uIHNpemU9ezEyfSBrZXk9XCJUb3AgY2FyZWVyIHBhdGhzXCIgYXM9XCJsaVwiPlxuICAgICAgICAgIDxMYXlvdXRHcmlkPlxuICAgICAgICAgICAgPENvbHVtbiBzaXplPXt7IHhzOiAxMiwgbGc6IDMgfX0+XG4gICAgICAgICAgICAgIDxCYWNrZ3JvdW5kXG4gICAgICAgICAgICAgICAgYmc9XCJuYXZ5LTgwMFwiXG4gICAgICAgICAgICAgICAgY29sb3I9XCJibHVlLTBcIlxuICAgICAgICAgICAgICAgIHB4PXt7IF86IDE2LCB4czogMzIsIHNtOiA2NCwgbWQ6IDQ4LCBsZzogMjQgfX1cbiAgICAgICAgICAgICAgICBweT17eyBfOiAxNiwgc206IDMyIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8RGVzY3JpcHRpb25TZWN0aW9uXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIlRvcCBjYXJlZXIgcGF0aHNcIlxuICAgICAgICAgICAgICAgICAgc3VidGl0bGU9XCJDaG9vc2UgeW91ciBjYXJlZXIuIFdlJ2xsIHRlYWNoIHlvdSB0aGUgc2tpbGxzIHRvIGdldCBqb2ItcmVhZHkuXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0JhY2tncm91bmQ+XG4gICAgICAgICAgICA8L0NvbHVtbj5cbiAgICAgICAgICAgIDxDb2x1bW4gc2l6ZT17eyB4czogMTIsIGxnOiA4IH19PlxuICAgICAgICAgICAgICA8TGF5b3V0R3JpZCBweT17MzJ9IHBsPXt7IF86IDE2LCB4czogMzIsIHNtOiA2NCwgbWQ6IDQ4IH19PlxuICAgICAgICAgICAgICAgIHtjYXJlZXJQYXRocy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICAgIDxTdHlsZWRBbmNob3JDb2x1bW4ga2V5PXtpdGVtLmlkfSBzaXplPXt7IF86IDEyLCBsZzogNCB9fT5cbiAgICAgICAgICAgICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgICAgICAgICAgIGRhdGEtZm9jdXNhYmxlY2F0YWxvZz1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgICAgICAgICAgICAgIGhyZWY9e2l0ZW0uaHJlZn1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQW5jaG9yRWxlbWVudCwgTW91c2VFdmVudD5cbiAgICAgICAgICAgICAgICAgICAgICApID0+IG9uQ2xpY2soZXZlbnQsIGl0ZW0gYXMgQXBwSGVhZGVySXRlbSl9XG4gICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge2l0ZW0udGV4dH1cbiAgICAgICAgICAgICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgICAgICAgICAgICA8L1N0eWxlZEFuY2hvckNvbHVtbj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9MYXlvdXRHcmlkPlxuICAgICAgICAgICAgPC9Db2x1bW4+XG4gICAgICAgICAgPC9MYXlvdXRHcmlkPlxuICAgICAgICA8L1N0eWxlZENvbHVtbj5cbiAgICAgICl9XG4gICAgICA8Q29sdW1uIHB4PXt7IF86IDE2LCB4czogMzIsIHNtOiA2NCwgbWQ6IDQ4LCBsZzogMjQgfX0gcHk9ezE2fT5cbiAgICAgICAgPEZsZXhCb3hcbiAgICAgICAgICBhbGlnbkl0ZW1zPXt7IF86ICdmbGV4LXN0YXJ0Jywgc206ICdjZW50ZXInIH19XG4gICAgICAgICAgZmxleERpcmVjdGlvbj17eyBfOiAnY29sdW1uJywgc206ICdyb3cnIH19XG4gICAgICAgID5cbiAgICAgICAgICA8RmxleEJveCBhbGlnbkl0ZW1zPVwiY2VudGVyXCI+XG4gICAgICAgICAgICA8Qm94IG1yPXsxMn0+XG4gICAgICAgICAgICAgIDxUaW55QmxvY2tzIGFyaWEtaGlkZGVuIGhlaWdodD17MjZ9IHdpZHRoPXsyNn0gLz5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPEJveD5Ob3Qgc3VyZSB3aGVyZSB0byBiZWdpbj88L0JveD5cbiAgICAgICAgICA8L0ZsZXhCb3g+XG4gICAgICAgICAgPEJveD5cbiAgICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgICAgdmFyaWFudD1cInN0YW5kYXJkXCJcbiAgICAgICAgICAgICAgZm9udFNpemU9ezE0fVxuICAgICAgICAgICAgICBmb250V2VpZ2h0PXs3MDB9XG4gICAgICAgICAgICAgIHRleHRBbGlnbj17eyBfOiAnbGVmdCcsIGxnOiAnY2VudGVyJyB9fVxuICAgICAgICAgICAgICBocmVmPXtxdWl6QW5jaG9yRGF0YS5ocmVmfVxuICAgICAgICAgICAgICBkYXRhLWZvY3VzYWJsZWNhdGFsb2c9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KFxuICAgICAgICAgICAgICAgIGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PFxuICAgICAgICAgICAgICAgICAgSFRNTEFuY2hvckVsZW1lbnQgfCBIVE1MQnV0dG9uRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgIE1vdXNlRXZlbnRcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICkgPT4gb25DbGljayhldmVudCwgcXVpekFuY2hvckRhdGEpfVxuICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgIG1sPXt7IF86IDAsIHNtOiAxNiB9fVxuICAgICAgICAgICAgICBwdD17eyBfOiA4LCBzbTogMCB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7cXVpekFuY2hvckRhdGEudGV4dH1cbiAgICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW4+Jm5ic3A74oaSPC9zcGFuPlxuICAgICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvRmxleEJveD5cbiAgICAgIDwvQ29sdW1uPlxuICAgIDwvTGF5b3V0R3JpZEFudGlBbGlhc2VkPlxuICApO1xufSk7XG4iXX0= */");
var StyledAnchorColumn = /*#__PURE__*/_styled(Column, {
  target: "edbfvag0",
  label: "StyledAnchorColumn"
})(css({
  pb: 16,
  '&:last-child': {
    pb: 0
  }
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyQ2F0YWxvZ1NlY3Rpb24vaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdEMkIiLCJmaWxlIjoiLi4vLi4vLi4vLi4vc3JjL0FwcEhlYWRlci9BcHBIZWFkZXJFbGVtZW50cy9BcHBIZWFkZXJDYXRhbG9nU2VjdGlvbi9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBbmNob3IsXG4gIEJveCxcbiAgQ29sdW1uLFxuICBGaWxsQnV0dG9uLFxuICBGbGV4Qm94LFxuICBHcmlkQm94LFxuICBMYXlvdXRHcmlkLFxuICBUZXh0LFxufSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBUaW55QmxvY2tzIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtaWxsdXN0cmF0aW9ucyc7XG5pbXBvcnQgeyBCYWNrZ3JvdW5kLCBjc3MgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQge1xuICBjYXJlZXJQYXRocyxcbiAgdG9wTGFuZ3VhZ2VzLFxuICB0b3BTdWJqZWN0cyxcbn0gZnJvbSAnLi4vLi4vLi4vbGliL2NhdGFsb2dMaXN0JztcbmltcG9ydCB7XG4gIERlc2NyaXB0aW9uU2VjdGlvbkNvbnRhaW5lcixcbiAgTGF5b3V0R3JpZEFudGlBbGlhc2VkLFxufSBmcm9tICcuLi8uLi9zaGFyZWQnO1xuaW1wb3J0IHtcbiAgQXBwSGVhZGVyQ2F0YWxvZ0Ryb3Bkb3duSXRlbSxcbiAgQXBwSGVhZGVyQ2xpY2tIYW5kbGVyLFxuICBBcHBIZWFkZXJJdGVtLFxufSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCB0eXBlIEFwcEhlYWRlckNhdGFsb2dTZWN0aW9uUHJvcHMgPSB7XG4gIGFjdGlvbjogQXBwSGVhZGVyQ2xpY2tIYW5kbGVyO1xuICBpdGVtOiBBcHBIZWFkZXJDYXRhbG9nRHJvcGRvd25JdGVtO1xuICByZWY/OiBSZWFjdC5SZWZPYmplY3Q8SFRNTFVMaXN0RWxlbWVudD47XG4gIHJvbGU/OiBzdHJpbmc7XG4gIGlkPzogc3RyaW5nO1xuICBrZXlEb3duRXZlbnRzPzogKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50KSA9PiB2b2lkO1xuICBpc09wZW4/OiBib29sZWFuO1xuICBoYW5kbGVDbG9zZT86ICgpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBTdHlsZWRDb2x1bW4gPSBzdHlsZWQoQ29sdW1uKShcbiAgY3NzKHtcbiAgICBib3JkZXJCb3R0b206IDEsXG4gICAgYm9yZGVyQ29sb3I6ICduYXZ5LTMwMCcsXG4gIH0pXG4pO1xuXG5jb25zdCBTdHlsZWRBbmNob3JDb2x1bW4gPSBzdHlsZWQoQ29sdW1uKShcbiAgY3NzKHtcbiAgICBwYjogMTYsXG4gICAgJyY6bGFzdC1jaGlsZCc6IHtcbiAgICAgIHBiOiAwLFxuICAgIH0sXG4gIH0pXG4pO1xuXG5jb25zdCBxdWl6QW5jaG9yRGF0YTogQXBwSGVhZGVySXRlbSA9IHtcbiAgdGV4dDogJ1Rha2Ugb3VyIHF1aXonLFxuICBpZDogJ3F1aXonLFxuICB0eXBlOiAndGV4dC1idXR0b24nLFxuICBocmVmOiAnL2V4cGxvcmUvc29ydGluZy1xdWl6JyxcbiAgdHJhY2tpbmdUYXJnZXQ6ICdzb3J0aW5nX3F1aXonLFxufTtcblxuY29uc3QgY2F0YWxvZ0J1dHRvbkRhdGE6IEFwcEhlYWRlckl0ZW0gPSB7XG4gIHRleHQ6ICdFeHBsb3JlIGFsbCBjb3Vyc2VzJyxcbiAgaWQ6ICdjYXRhbG9nJyxcbiAgdHlwZTogJ3RleHQtYnV0dG9uJyxcbiAgaHJlZjogJy9jYXRhbG9nJyxcbiAgdHJhY2tpbmdUYXJnZXQ6ICd0b3BuYXZfY2F0YWxvZ19leHBsb3JlX2Z1bGwnLFxufTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlID0gYCdsYW5ndWFnZSBsYW5ndWFnZSBzdWJqZWN0J1xuICAgICAgICAgICAgICAgICAgICAnbGFuZ3VhZ2UgbGFuZ3VhZ2Ugc3ViamVjdCdcbiAgICAgICAgICAgICAgICAgICAgJ2xhbmd1YWdlIGxhbmd1YWdlIHN1YmplY3QnXG4gICAgICAgICAgICAgICAgICAgICdsYW5ndWFnZSBsYW5ndWFnZSBzdWJqZWN0J1xuICAgICAgICAgICAgICAgICAgICAnbGFuZ3VhZ2UgbGFuZ3VhZ2Ugc3ViamVjdCdcbiAgICAgICAgICAgICAgICAgICAgJ2xhbmd1YWdlIGxhbmd1YWdlIHN1YmplY3QnYDtcblxuY29uc3QgcmVzcG9uc2l2ZUdyaWRUZW1wbGF0ZSA9IGAnbGFuZ3VhZ2UnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xhbmd1YWdlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsYW5ndWFnZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGFuZ3VhZ2UnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xhbmd1YWdlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsYW5ndWFnZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGFuZ3VhZ2UnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xhbmd1YWdlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsYW5ndWFnZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGFuZ3VhZ2UnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xhbmd1YWdlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsYW5ndWFnZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3BhY2UnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N1YmplY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N1YmplY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N1YmplY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N1YmplY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N1YmplY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N1YmplY3QnYDtcblxuZXhwb3J0IGNvbnN0IEFwcEhlYWRlckNhdGFsb2dTZWN0aW9uID0gUmVhY3QuZm9yd2FyZFJlZjxcbiAgSFRNTERpdkVsZW1lbnQsXG4gIEFwcEhlYWRlckNhdGFsb2dTZWN0aW9uUHJvcHNcbj4oKHsgYWN0aW9uLCBpdGVtLCBpc09wZW4sIGtleURvd25FdmVudHMsIGhhbmRsZUNsb3NlIH0sIHJlZikgPT4ge1xuICBjb25zdCB0YWJJbmRleCA9IGlzT3BlbiA9PT0gZmFsc2UgPyAtMSA6IDA7XG5cbiAgY29uc3Qgb25DbGljayA9IChcbiAgICBldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQW5jaG9yRWxlbWVudCB8IEhUTUxCdXR0b25FbGVtZW50LCBNb3VzZUV2ZW50PixcbiAgICBsaW5rSXRlbTogQXBwSGVhZGVySXRlbVxuICApID0+IHtcbiAgICBoYW5kbGVDbG9zZT8uKCk7XG4gICAgcmV0dXJuIGFjdGlvbihldmVudCwgbGlua0l0ZW0pO1xuICB9O1xuXG4gIGNvbnN0IERlc2NyaXB0aW9uU2VjdGlvbjogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQ8e1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgc3VidGl0bGU6IHN0cmluZztcbiAgfT4gPSAoeyB0aXRsZSwgc3VidGl0bGUgfSkgPT4gKFxuICAgIDxEZXNjcmlwdGlvblNlY3Rpb25Db250YWluZXJcbiAgICAgIGRhdGEtZm9jdXNhYmxlY2F0YWxvZz1cInRydWVcIlxuICAgICAgZGF0YS10ZXN0aWQ9XCJ0aXRsZS1kZXNjcmlwdGlvbi1zZWN0aW9uXCJcbiAgICAgIHRhYkluZGV4PXstMX1cbiAgICAgIGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIlxuICAgID5cbiAgICAgIDxUZXh0IGFzPVwiaDJcIiB2YXJpYW50PVwidGl0bGUteHNcIiBtYj17OH0gZm9udFdlaWdodD17NzAwfT5cbiAgICAgICAge3RpdGxlfVxuICAgICAgPC9UZXh0PlxuICAgICAgPFRleHQgZm9udFNpemU9ezE0fT57c3VidGl0bGV9PC9UZXh0PlxuICAgIDwvRGVzY3JpcHRpb25TZWN0aW9uQ29udGFpbmVyPlxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPExheW91dEdyaWRBbnRpQWxpYXNlZCBvbktleURvd249e2tleURvd25FdmVudHN9IHJlZj17cmVmfSBhcz1cInVsXCIgcD17MH0+XG4gICAgICA8U3R5bGVkQ29sdW1uIHNpemU9ezEyfSBrZXk9XCJQb3B1bGFyIGNvdXJzZSB0b3BpY3NcIiBhcz1cImxpXCI+XG4gICAgICAgIDxMYXlvdXRHcmlkPlxuICAgICAgICAgIDxDb2x1bW4gc2l6ZT17eyB4czogMTIsIGxnOiAzIH19PlxuICAgICAgICAgICAgPEJhY2tncm91bmRcbiAgICAgICAgICAgICAgYmc9XCJuYXZ5LTgwMFwiXG4gICAgICAgICAgICAgIGNvbG9yPVwiYmx1ZS0wXCJcbiAgICAgICAgICAgICAgcHg9e3sgXzogMTYsIHhzOiAzMiwgc206IDY0LCBtZDogNDgsIGxnOiAyNCB9fVxuICAgICAgICAgICAgICBweT17eyBfOiAxNiwgc206IDMyIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxEZXNjcmlwdGlvblNlY3Rpb25cbiAgICAgICAgICAgICAgICB0aXRsZT1cIlBvcHVsYXIgY291cnNlIHRvcGljc1wiXG4gICAgICAgICAgICAgICAgc3VidGl0bGU9XCJFeHBsb3JlIGZyZWUgb3IgcGFpZCBjb3Vyc2VzIGluIHRvcGljcyB0aGF0IGludGVyZXN0IHlvdS5cIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8RmlsbEJ1dHRvblxuICAgICAgICAgICAgICAgIG1vZGU9XCJkYXJrXCJcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ249e3sgXzogJ2NlbnRlcicsIG1kOiAnbGVmdCcgfX1cbiAgICAgICAgICAgICAgICBocmVmPXtjYXRhbG9nQnV0dG9uRGF0YS5ocmVmfVxuICAgICAgICAgICAgICAgIGRhdGEtZm9jdXNhYmxlY2F0YWxvZz1cInRydWVcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhcbiAgICAgICAgICAgICAgICAgIGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50LCBNb3VzZUV2ZW50PlxuICAgICAgICAgICAgICAgICkgPT4gb25DbGljayhldmVudCwgaXRlbSBhcyBBcHBIZWFkZXJJdGVtKX1cbiAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgbXQ9e3sgXzogMTYsIGxnOiA5NiB9fVxuICAgICAgICAgICAgICAgIG1heFdpZHRoPXsxNzB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7Y2F0YWxvZ0J1dHRvbkRhdGEudGV4dH1cbiAgICAgICAgICAgICAgPC9GaWxsQnV0dG9uPlxuICAgICAgICAgICAgPC9CYWNrZ3JvdW5kPlxuICAgICAgICAgIDwvQ29sdW1uPlxuICAgICAgICAgIDxDb2x1bW5cbiAgICAgICAgICAgIHNpemU9e3sgeHM6IDEyLCBsZzogOCB9fVxuICAgICAgICAgICAgcHk9ezMyfVxuICAgICAgICAgICAgcGw9e3sgXzogMTYsIHhzOiAzMiwgc206IDY0LCBtZDogNDggfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8R3JpZEJveFxuICAgICAgICAgICAgICBncmlkVGVtcGxhdGVBcmVhcz17e1xuICAgICAgICAgICAgICAgIF86IHJlc3BvbnNpdmVHcmlkVGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgbGc6IGdyaWRUZW1wbGF0ZSxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgIGdyaWRBcmVhPVwibGFuZ3VhZ2VcIlxuICAgICAgICAgICAgICAgIGRpc3BsYXk9XCJncmlkXCJcbiAgICAgICAgICAgICAgICBncmlkVGVtcGxhdGVDb2x1bW5zPXt7IF86ICcxZnInLCBsZzogJ3JlcGVhdCgyLCAxZnIpJyB9fVxuICAgICAgICAgICAgICAgIGdyaWRUZW1wbGF0ZVJvd3M9e3sgXzogJzFmcicsIGxnOiAncmVwZWF0KDYsIDFmciknIH19XG4gICAgICAgICAgICAgICAgZ3JpZEF1dG9GbG93PXt7IGxnOiAnY29sdW1uJyB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RvcExhbmd1YWdlcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICAgIDxCb3ggd2lkdGg9XCIxMnJlbVwiIGtleT17aXRlbS5pZH0gbWluSGVpZ2h0PXszMn0+XG4gICAgICAgICAgICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgICAgICAgICAgICBkYXRhLWZvY3VzYWJsZWNhdGFsb2c9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICAgICAgICAgICAgICBocmVmPXtpdGVtLmhyZWZ9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEFuY2hvckVsZW1lbnQsIE1vdXNlRXZlbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgKSA9PiBvbkNsaWNrKGV2ZW50LCBpdGVtIGFzIEFwcEhlYWRlckl0ZW0pfVxuICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnRleHR9XG4gICAgICAgICAgICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgZGlzcGxheT17eyBfOiAnYmxvY2snLCBsZzogJ25vbmUnIH19XG4gICAgICAgICAgICAgICAgcHk9ezE2fVxuICAgICAgICAgICAgICAgIGdyaWRBcmVhPVwic3BhY2VcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8Qm94IGdyaWRBcmVhPVwic3ViamVjdFwiIGRpc3BsYXk9XCJncmlkXCIgZ3JpZFRlbXBsYXRlQ29sdW1ucz1cIjFmclwiPlxuICAgICAgICAgICAgICAgIHt0b3BTdWJqZWN0cy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICAgIDxCb3ggd2lkdGg9XCIxMnJlbVwiIGtleT17aXRlbS5pZH0gbWluSGVpZ2h0PXszNn0+XG4gICAgICAgICAgICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgICAgICAgICAgICBkYXRhLWZvY3VzYWJsZWNhdGFsb2c9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICAgICAgICAgICAgICBocmVmPXtpdGVtLmhyZWZ9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEFuY2hvckVsZW1lbnQsIE1vdXNlRXZlbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgKSA9PiBvbkNsaWNrKGV2ZW50LCBpdGVtIGFzIEFwcEhlYWRlckl0ZW0pfVxuICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnRleHR9XG4gICAgICAgICAgICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPC9HcmlkQm94PlxuICAgICAgICAgIDwvQ29sdW1uPlxuICAgICAgICA8L0xheW91dEdyaWQ+XG4gICAgICA8L1N0eWxlZENvbHVtbj5cbiAgICAgIHshaXRlbS5oaWRlQ2FyZWVyUGF0aHMgJiYgKFxuICAgICAgICA8U3R5bGVkQ29sdW1uIHNpemU9ezEyfSBrZXk9XCJUb3AgY2FyZWVyIHBhdGhzXCIgYXM9XCJsaVwiPlxuICAgICAgICAgIDxMYXlvdXRHcmlkPlxuICAgICAgICAgICAgPENvbHVtbiBzaXplPXt7IHhzOiAxMiwgbGc6IDMgfX0+XG4gICAgICAgICAgICAgIDxCYWNrZ3JvdW5kXG4gICAgICAgICAgICAgICAgYmc9XCJuYXZ5LTgwMFwiXG4gICAgICAgICAgICAgICAgY29sb3I9XCJibHVlLTBcIlxuICAgICAgICAgICAgICAgIHB4PXt7IF86IDE2LCB4czogMzIsIHNtOiA2NCwgbWQ6IDQ4LCBsZzogMjQgfX1cbiAgICAgICAgICAgICAgICBweT17eyBfOiAxNiwgc206IDMyIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8RGVzY3JpcHRpb25TZWN0aW9uXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIlRvcCBjYXJlZXIgcGF0aHNcIlxuICAgICAgICAgICAgICAgICAgc3VidGl0bGU9XCJDaG9vc2UgeW91ciBjYXJlZXIuIFdlJ2xsIHRlYWNoIHlvdSB0aGUgc2tpbGxzIHRvIGdldCBqb2ItcmVhZHkuXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0JhY2tncm91bmQ+XG4gICAgICAgICAgICA8L0NvbHVtbj5cbiAgICAgICAgICAgIDxDb2x1bW4gc2l6ZT17eyB4czogMTIsIGxnOiA4IH19PlxuICAgICAgICAgICAgICA8TGF5b3V0R3JpZCBweT17MzJ9IHBsPXt7IF86IDE2LCB4czogMzIsIHNtOiA2NCwgbWQ6IDQ4IH19PlxuICAgICAgICAgICAgICAgIHtjYXJlZXJQYXRocy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICAgIDxTdHlsZWRBbmNob3JDb2x1bW4ga2V5PXtpdGVtLmlkfSBzaXplPXt7IF86IDEyLCBsZzogNCB9fT5cbiAgICAgICAgICAgICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgICAgICAgICAgIGRhdGEtZm9jdXNhYmxlY2F0YWxvZz1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgICAgICAgICAgICAgIGhyZWY9e2l0ZW0uaHJlZn1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQW5jaG9yRWxlbWVudCwgTW91c2VFdmVudD5cbiAgICAgICAgICAgICAgICAgICAgICApID0+IG9uQ2xpY2soZXZlbnQsIGl0ZW0gYXMgQXBwSGVhZGVySXRlbSl9XG4gICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge2l0ZW0udGV4dH1cbiAgICAgICAgICAgICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgICAgICAgICAgICA8L1N0eWxlZEFuY2hvckNvbHVtbj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9MYXlvdXRHcmlkPlxuICAgICAgICAgICAgPC9Db2x1bW4+XG4gICAgICAgICAgPC9MYXlvdXRHcmlkPlxuICAgICAgICA8L1N0eWxlZENvbHVtbj5cbiAgICAgICl9XG4gICAgICA8Q29sdW1uIHB4PXt7IF86IDE2LCB4czogMzIsIHNtOiA2NCwgbWQ6IDQ4LCBsZzogMjQgfX0gcHk9ezE2fT5cbiAgICAgICAgPEZsZXhCb3hcbiAgICAgICAgICBhbGlnbkl0ZW1zPXt7IF86ICdmbGV4LXN0YXJ0Jywgc206ICdjZW50ZXInIH19XG4gICAgICAgICAgZmxleERpcmVjdGlvbj17eyBfOiAnY29sdW1uJywgc206ICdyb3cnIH19XG4gICAgICAgID5cbiAgICAgICAgICA8RmxleEJveCBhbGlnbkl0ZW1zPVwiY2VudGVyXCI+XG4gICAgICAgICAgICA8Qm94IG1yPXsxMn0+XG4gICAgICAgICAgICAgIDxUaW55QmxvY2tzIGFyaWEtaGlkZGVuIGhlaWdodD17MjZ9IHdpZHRoPXsyNn0gLz5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPEJveD5Ob3Qgc3VyZSB3aGVyZSB0byBiZWdpbj88L0JveD5cbiAgICAgICAgICA8L0ZsZXhCb3g+XG4gICAgICAgICAgPEJveD5cbiAgICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgICAgdmFyaWFudD1cInN0YW5kYXJkXCJcbiAgICAgICAgICAgICAgZm9udFNpemU9ezE0fVxuICAgICAgICAgICAgICBmb250V2VpZ2h0PXs3MDB9XG4gICAgICAgICAgICAgIHRleHRBbGlnbj17eyBfOiAnbGVmdCcsIGxnOiAnY2VudGVyJyB9fVxuICAgICAgICAgICAgICBocmVmPXtxdWl6QW5jaG9yRGF0YS5ocmVmfVxuICAgICAgICAgICAgICBkYXRhLWZvY3VzYWJsZWNhdGFsb2c9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KFxuICAgICAgICAgICAgICAgIGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PFxuICAgICAgICAgICAgICAgICAgSFRNTEFuY2hvckVsZW1lbnQgfCBIVE1MQnV0dG9uRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgIE1vdXNlRXZlbnRcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICkgPT4gb25DbGljayhldmVudCwgcXVpekFuY2hvckRhdGEpfVxuICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgIG1sPXt7IF86IDAsIHNtOiAxNiB9fVxuICAgICAgICAgICAgICBwdD17eyBfOiA4LCBzbTogMCB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7cXVpekFuY2hvckRhdGEudGV4dH1cbiAgICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW4+Jm5ic3A74oaSPC9zcGFuPlxuICAgICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvRmxleEJveD5cbiAgICAgIDwvQ29sdW1uPlxuICAgIDwvTGF5b3V0R3JpZEFudGlBbGlhc2VkPlxuICApO1xufSk7XG4iXX0= */");
var quizAnchorData = {
  text: 'Take our quiz',
  id: 'quiz',
  type: 'text-button',
  href: '/explore/sorting-quiz',
  trackingTarget: 'sorting_quiz'
};
var catalogButtonData = {
  text: 'Explore all courses',
  id: 'catalog',
  type: 'text-button',
  href: '/catalog',
  trackingTarget: 'topnav_catalog_explore_full'
};
var gridTemplate = "'language language subject'\n                    'language language subject'\n                    'language language subject'\n                    'language language subject'\n                    'language language subject'\n                    'language language subject'";
var responsiveGridTemplate = "'language'\n                            'language'\n                            'language'\n                            'language'\n                            'language'\n                            'language'\n                            'language'\n                            'language'\n                            'language'\n                            'language'\n                            'language'\n                            'language'\n                            'space'\n                            'subject'\n                            'subject'\n                            'subject'\n                            'subject'\n                            'subject'\n                            'subject'";
export var AppHeaderCatalogSection = /*#__PURE__*/React.forwardRef(function AppHeaderCatalogSection(_ref, ref) {
  var action = _ref.action,
    item = _ref.item,
    isOpen = _ref.isOpen,
    keyDownEvents = _ref.keyDownEvents,
    handleClose = _ref.handleClose;
  var tabIndex = isOpen === false ? -1 : 0;
  var _onClick = function onClick(event, linkItem) {
    handleClose === null || handleClose === void 0 ? void 0 : handleClose();
    return action(event, linkItem);
  };
  var DescriptionSection = function DescriptionSection(_ref2) {
    var title = _ref2.title,
      subtitle = _ref2.subtitle;
    return /*#__PURE__*/_jsxs(DescriptionSectionContainer, {
      "data-focusablecatalog": "true",
      "data-testid": "title-description-section",
      tabIndex: -1,
      flexDirection: "column",
      children: [/*#__PURE__*/_jsx(Text, {
        as: "h2",
        variant: "title-xs",
        mb: 8,
        fontWeight: 700,
        children: title
      }), /*#__PURE__*/_jsx(Text, {
        fontSize: 14,
        children: subtitle
      })]
    });
  };
  return /*#__PURE__*/_jsxs(LayoutGridAntiAliased, {
    onKeyDown: keyDownEvents,
    ref: ref,
    as: "ul",
    p: 0,
    children: [/*#__PURE__*/_jsx(StyledColumn, {
      size: 12,
      as: "li",
      children: /*#__PURE__*/_jsxs(LayoutGrid, {
        children: [/*#__PURE__*/_jsx(Column, {
          size: {
            xs: 12,
            lg: 3
          },
          children: /*#__PURE__*/_jsxs(Background, {
            bg: "navy-800",
            color: "blue-0",
            px: {
              _: 16,
              xs: 32,
              sm: 64,
              md: 48,
              lg: 24
            },
            py: {
              _: 16,
              sm: 32
            },
            children: [/*#__PURE__*/_jsx(DescriptionSection, {
              title: "Popular course topics",
              subtitle: "Explore free or paid courses in topics that interest you."
            }), /*#__PURE__*/_jsx(FillButton, {
              mode: "dark",
              textAlign: {
                _: 'center',
                md: 'left'
              },
              href: catalogButtonData.href,
              "data-focusablecatalog": "true",
              onClick: function onClick(event) {
                return _onClick(event, item);
              },
              tabIndex: tabIndex,
              mt: {
                _: 16,
                lg: 96
              },
              maxWidth: 170,
              children: catalogButtonData.text
            })]
          })
        }), /*#__PURE__*/_jsx(Column, {
          size: {
            xs: 12,
            lg: 8
          },
          py: 32,
          pl: {
            _: 16,
            xs: 32,
            sm: 64,
            md: 48
          },
          children: /*#__PURE__*/_jsxs(GridBox, {
            gridTemplateAreas: {
              _: responsiveGridTemplate,
              lg: gridTemplate
            },
            children: [/*#__PURE__*/_jsx(Box, {
              gridArea: "language",
              display: "grid",
              gridTemplateColumns: {
                _: '1fr',
                lg: 'repeat(2, 1fr)'
              },
              gridTemplateRows: {
                _: '1fr',
                lg: 'repeat(6, 1fr)'
              },
              gridAutoFlow: {
                lg: 'column'
              },
              children: topLanguages.map(function (item) {
                return /*#__PURE__*/_jsx(Box, {
                  width: "12rem",
                  minHeight: 32,
                  children: /*#__PURE__*/_jsx(Anchor, {
                    "data-focusablecatalog": "true",
                    variant: "interface",
                    href: item.href,
                    onClick: function onClick(event) {
                      return _onClick(event, item);
                    },
                    tabIndex: tabIndex,
                    children: item.text
                  })
                }, item.id);
              })
            }), /*#__PURE__*/_jsx(Box, {
              display: {
                _: 'block',
                lg: 'none'
              },
              py: 16,
              gridArea: "space"
            }), /*#__PURE__*/_jsx(Box, {
              gridArea: "subject",
              display: "grid",
              gridTemplateColumns: "1fr",
              children: topSubjects.map(function (item) {
                return /*#__PURE__*/_jsx(Box, {
                  width: "12rem",
                  minHeight: 36,
                  children: /*#__PURE__*/_jsx(Anchor, {
                    "data-focusablecatalog": "true",
                    variant: "interface",
                    href: item.href,
                    onClick: function onClick(event) {
                      return _onClick(event, item);
                    },
                    tabIndex: tabIndex,
                    children: item.text
                  })
                }, item.id);
              })
            })]
          })
        })]
      })
    }, "Popular course topics"), !item.hideCareerPaths && /*#__PURE__*/_jsx(StyledColumn, {
      size: 12,
      as: "li",
      children: /*#__PURE__*/_jsxs(LayoutGrid, {
        children: [/*#__PURE__*/_jsx(Column, {
          size: {
            xs: 12,
            lg: 3
          },
          children: /*#__PURE__*/_jsx(Background, {
            bg: "navy-800",
            color: "blue-0",
            px: {
              _: 16,
              xs: 32,
              sm: 64,
              md: 48,
              lg: 24
            },
            py: {
              _: 16,
              sm: 32
            },
            children: /*#__PURE__*/_jsx(DescriptionSection, {
              title: "Top career paths",
              subtitle: "Choose your career. We'll teach you the skills to get job-ready."
            })
          })
        }), /*#__PURE__*/_jsx(Column, {
          size: {
            xs: 12,
            lg: 8
          },
          children: /*#__PURE__*/_jsx(LayoutGrid, {
            py: 32,
            pl: {
              _: 16,
              xs: 32,
              sm: 64,
              md: 48
            },
            children: careerPaths.map(function (item) {
              return /*#__PURE__*/_jsx(StyledAnchorColumn, {
                size: {
                  _: 12,
                  lg: 4
                },
                children: /*#__PURE__*/_jsx(Anchor, {
                  "data-focusablecatalog": "true",
                  variant: "interface",
                  href: item.href,
                  onClick: function onClick(event) {
                    return _onClick(event, item);
                  },
                  tabIndex: tabIndex,
                  children: item.text
                })
              }, item.id);
            })
          })
        })]
      })
    }, "Top career paths"), /*#__PURE__*/_jsx(Column, {
      px: {
        _: 16,
        xs: 32,
        sm: 64,
        md: 48,
        lg: 24
      },
      py: 16,
      children: /*#__PURE__*/_jsxs(FlexBox, {
        alignItems: {
          _: 'flex-start',
          sm: 'center'
        },
        flexDirection: {
          _: 'column',
          sm: 'row'
        },
        children: [/*#__PURE__*/_jsxs(FlexBox, {
          alignItems: "center",
          children: [/*#__PURE__*/_jsx(Box, {
            mr: 12,
            children: /*#__PURE__*/_jsx(TinyBlocks, {
              "aria-hidden": true,
              height: 26,
              width: 26
            })
          }), /*#__PURE__*/_jsx(Box, {
            children: "Not sure where to begin?"
          })]
        }), /*#__PURE__*/_jsx(Box, {
          children: /*#__PURE__*/_jsxs(Anchor, {
            variant: "standard",
            fontSize: 14,
            fontWeight: 700,
            textAlign: {
              _: 'left',
              lg: 'center'
            },
            href: quizAnchorData.href,
            "data-focusablecatalog": "true",
            onClick: function onClick(event) {
              return _onClick(event, quizAnchorData);
            },
            tabIndex: tabIndex,
            ml: {
              _: 0,
              sm: 16
            },
            pt: {
              _: 8,
              sm: 0
            },
            children: [quizAnchorData.text, /*#__PURE__*/_jsx("span", {
              "aria-hidden": true,
              children: "\xA0\u2192"
            })]
          })
        })]
      })
    })]
  });
});