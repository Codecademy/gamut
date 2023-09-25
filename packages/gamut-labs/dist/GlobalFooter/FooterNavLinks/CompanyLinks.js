import _styled from "@emotion/styled/base";
import { Anchor, Box, GridBox } from '@codecademy/gamut';
import * as React from 'react';
import { LogoFromSkillsoft } from '../..';
import { footerResourcesList } from '../../lib/resourcesList';
import { FooterHeading } from '../FooterHeading';
import { FooterLinkItem, FooterLinkItems, FooterLinkItemWithAnchor } from '../FooterLinks';
import downloadOnTheAppStore from './assets/download-on-the-app-store.svg';
import getItOnGooglePlay from './assets/get-it-on-google-play.png';
import { SocialMediaLinks } from './SocialMediaLinks';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var MobileImageItem = /*#__PURE__*/_styled(Box, {
  target: "ese2wcm1",
  label: "MobileImageItem"
})(process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTmF2TGlua3MvQ29tcGFueUxpbmtzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzQndCIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTmF2TGlua3MvQ29tcGFueUxpbmtzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuY2hvciwgQm94LCBCb3hQcm9wcywgR3JpZEJveCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgTG9nb0Zyb21Ta2lsbHNvZnQgfSBmcm9tICcuLi8uLic7XG5pbXBvcnQgeyBmb290ZXJSZXNvdXJjZXNMaXN0IH0gZnJvbSAnLi4vLi4vbGliL3Jlc291cmNlc0xpc3QnO1xuaW1wb3J0IHsgRm9vdGVySGVhZGluZyB9IGZyb20gJy4uL0Zvb3RlckhlYWRpbmcnO1xuaW1wb3J0IHtcbiAgRm9vdGVyTGlua0l0ZW0sXG4gIEZvb3RlckxpbmtJdGVtcyxcbiAgRm9vdGVyTGlua0l0ZW1XaXRoQW5jaG9yLFxufSBmcm9tICcuLi9Gb290ZXJMaW5rcyc7XG5pbXBvcnQgeyBHbG9iYWxGb290ZXJDbGlja0hhbmRsZXIgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgZG93bmxvYWRPblRoZUFwcFN0b3JlIGZyb20gJy4vYXNzZXRzL2Rvd25sb2FkLW9uLXRoZS1hcHAtc3RvcmUuc3ZnJztcbmltcG9ydCBnZXRJdE9uR29vZ2xlUGxheSBmcm9tICcuL2Fzc2V0cy9nZXQtaXQtb24tZ29vZ2xlLXBsYXkucG5nJztcbmltcG9ydCB7IFNvY2lhbE1lZGlhTGlua3MgfSBmcm9tICcuL1NvY2lhbE1lZGlhTGlua3MnO1xuXG5leHBvcnQgdHlwZSBDb21wYW55TGlua3NQcm9wcyA9IHtcbiAgaGlkZVByaWNpbmc/OiBib29sZWFuO1xuICBvbkNsaWNrOiBHbG9iYWxGb290ZXJDbGlja0hhbmRsZXI7XG59O1xuXG5jb25zdCBNb2JpbGVJbWFnZUl0ZW0gPSBzdHlsZWQoQm94KSgpO1xuXG5Nb2JpbGVJbWFnZUl0ZW0uZGVmYXVsdFByb3BzID0ge1xuICBhczogJ2xpJyxcbiAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gIG15OiA4LFxuICB3aWR0aDoge1xuICAgIF86ICc1MCUnLFxuICAgIG1kOiAnOTAlJyxcbiAgfSxcbn07XG5cbmNvbnN0IE1vYmlsZUltYWdlTGluayA9IHN0eWxlZChBbmNob3IpKCk7XG5cbk1vYmlsZUltYWdlTGluay5kZWZhdWx0UHJvcHMgPSB7XG4gIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICB2YXJpYW50OiAnaW50ZXJmYWNlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDb21wYW55TGlua3M6IFJlYWN0LkZDPENvbXBhbnlMaW5rc1Byb3BzPiA9ICh7XG4gIGhpZGVQcmljaW5nLFxuICBvbkNsaWNrLFxufSkgPT4ge1xuICBjb25zdCBjb21tdW5pdHkgPSAoXG4gICAgPEJveD5cbiAgICAgIDxGb290ZXJIZWFkaW5nPkNvbW11bml0eTwvRm9vdGVySGVhZGluZz5cbiAgICAgIDxGb290ZXJMaW5rSXRlbXM+XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9kaXNjdXNzLmNvZGVjYWRlbXkuY29tXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdmb3J1bXMnIH0pfVxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEZvcnVtc1xuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZGlzY29yZC5jb20vaW52aXRlL2NvZGVjYWRlbXlcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2Rpc2NvcmQnIH0pfVxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIERpc2NvcmRcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9Gb290ZXJMaW5rSXRlbT5cbiAgICAgICAgPEZvb3RlckxpbmtJdGVtPlxuICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2NvbW11bml0eS5jb2RlY2FkZW15LmNvbS9jaGFwdGVyc1wiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAnY2hhcHRlcnMnIH0pfVxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIENoYXB0ZXJzXG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiL2V2ZW50c1wiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAnZXZlbnRzJyB9KX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEV2ZW50c1xuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cIi9sZWFybmVyLXN0b3JpZXNcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PlxuICAgICAgICAgICAgICBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2xlYXJuZXJfc3Rvcmllc19odWInIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBMZWFybmVyIFN0b3JpZXNcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9Gb290ZXJMaW5rSXRlbT5cbiAgICAgICAgey8qIFJlZmVyIGEgZnJpZW5kIG1hcmtldGluZyBhbmNob3IgKi99XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8c3BhbiBpZD1cImV4dG9sZV96b25lX2dsb2JhbF9mb290ZXJcIiAvPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgPC9Gb290ZXJMaW5rSXRlbXM+XG4gICAgPC9Cb3g+XG4gICk7XG5cbiAgY29uc3QgY29tcGFueSA9IChcbiAgICA8Qm94PlxuICAgICAgPEZvb3RlckhlYWRpbmc+XG4gICAgICAgIDxMb2dvRnJvbVNraWxsc29mdCBoZWlnaHQ9ezQwfSAvPlxuICAgICAgPC9Gb290ZXJIZWFkaW5nPlxuICAgICAgPEZvb3RlckxpbmtJdGVtcz5cbiAgICAgICAgPEZvb3RlckxpbmtJdGVtPlxuICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgIGhyZWY9XCIvYWJvdXRcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2Fib3V0JyB9KX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEFib3V0XG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiL2Fib3V0L2NhcmVlcnNcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2pvYnMnIH0pfVxuICAgICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgQ2FyZWVyc1xuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cIi9wYWdlcy9jb2RlY2FkZW15LWFmZmlsaWF0ZS1wcm9ncmFtXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdhZmZpbGlhdGVfcHJvZ3JhbScgfSl9XG4gICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBBZmZpbGlhdGVzXG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8U29jaWFsTWVkaWFMaW5rcyAvPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgPC9Gb290ZXJMaW5rSXRlbXM+XG4gICAgPC9Cb3g+XG4gICk7XG5cbiAgY29uc3QgZW50ZXJwcmlzZVBsYW5zID0gKFxuICAgIDxCb3g+XG4gICAgICA8Rm9vdGVySGVhZGluZyBtdD17aGlkZVByaWNpbmcgPyB7IHNtOiAxNiB9IDogeyBfOiAyNCwgc206IDAgfX0+XG4gICAgICAgIEVudGVycHJpc2UgUGxhbnNcbiAgICAgIDwvRm9vdGVySGVhZGluZz5cbiAgICAgIDxGb290ZXJMaW5rSXRlbXM+XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiL2J1c2luZXNzXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdidXNpbmVzc19sYW5kaW5nJyB9KX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEJ1c2luZXNzIFNvbHV0aW9uc1xuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgPC9Gb290ZXJMaW5rSXRlbXM+XG4gICAgPC9Cb3g+XG4gICk7XG5cbiAgY29uc3QgaW5kaXZpZHVhbFBsYW5zID0gKFxuICAgIDxCb3g+XG4gICAgICA8Rm9vdGVySGVhZGluZz5JbmRpdmlkdWFsIFBsYW5zPC9Gb290ZXJIZWFkaW5nPlxuICAgICAgPEZvb3RlckxpbmtJdGVtcz5cbiAgICAgICAgPEZvb3RlckxpbmtJdGVtPlxuICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgIGhyZWY9XCIvcGFnZXMvcHJvXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdwcm9fbWVtYmVyc2hpcCcgfSl9XG4gICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBQYWlkIE1lbWJlcnNoaXBzXG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiL3N0dWRlbnQtY2VudGVyXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdzdHVkZW50cycgfSl9XG4gICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBGb3IgU3R1ZGVudHNcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9Gb290ZXJMaW5rSXRlbT5cbiAgICAgIDwvRm9vdGVyTGlua0l0ZW1zPlxuICAgIDwvQm94PlxuICApO1xuXG4gIGNvbnN0IG1vYmlsZSA9IChcbiAgICA8Qm94XG4gICAgICBncmlkQ29sdW1uPVwiMSAvIDNcIlxuICAgICAgZ3JpZENvbHVtbkVuZD17eyBzbTogJzEnIH19XG4gICAgICBncmlkUm93PXt7IHNtOiAnMiAvIDQnIH19XG4gICAgICBwdD17aGlkZVByaWNpbmcgPyB7IHNtOiAxNiB9IDoge319XG4gICAgPlxuICAgICAgPEZvb3RlckhlYWRpbmcgbWI9e3sgXzogOCwgc206IDE2LCBsZzogMCB9fT5Nb2JpbGU8L0Zvb3RlckhlYWRpbmc+XG4gICAgICA8Rm9vdGVyTGlua0l0ZW1zXG4gICAgICAgIGRpc3BsYXk9e3sgc206ICdmbGV4JyB9fVxuICAgICAgICBmbGV4RGlyZWN0aW9uPXt7IHNtOiAnY29sdW1uJyB9fVxuICAgICAgPlxuICAgICAgICA8TW9iaWxlSW1hZ2VJdGVtPlxuICAgICAgICAgIDxNb2JpbGVJbWFnZUxpbmtcbiAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2l0dW5lcy5hcHBsZS5jb20vdXMvYXBwL2NvZGVjYWRlbXktZ28vaWQxMzc2MDI5MzI2XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdhcHBsZV9zdG9yZScgfSl9XG4gICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgcmVsPVwibm9vcGVuZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgYWx0PVwiRG93bmxvYWQgb24gdGhlIEFwcCBTdG9yZVwiXG4gICAgICAgICAgICAgIGhlaWdodD1cImNhbGMoNDBweCArIDFyZW0pXCJcbiAgICAgICAgICAgICAgc3JjPXtkb3dubG9hZE9uVGhlQXBwU3RvcmV9XG4gICAgICAgICAgICAgIHdpZHRoPVwiY2FsYygxMjBweCArIDEuNXJlbSlcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L01vYmlsZUltYWdlTGluaz5cbiAgICAgICAgPC9Nb2JpbGVJbWFnZUl0ZW0+XG4gICAgICAgIDxNb2JpbGVJbWFnZUl0ZW0+XG4gICAgICAgICAgPE1vYmlsZUltYWdlTGlua1xuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vcGxheS5nb29nbGUuY29tL3N0b3JlL2FwcHMvZGV0YWlscz9pZD1jb20ucnl6YWMuY29kZWNhZGVteWdvXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdnb29nbGVfcGxheScgfSl9XG4gICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgcmVsPVwibm9vcGVuZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgYWx0PVwiR2V0IGl0IG9uIEdvb2dsZSBQbGF5XCJcbiAgICAgICAgICAgICAgaGVpZ2h0PVwiY2FsYyg0MHB4ICsgMXJlbSlcIlxuICAgICAgICAgICAgICBzcmM9e2dldEl0T25Hb29nbGVQbGF5fVxuICAgICAgICAgICAgICB3aWR0aD1cImNhbGMoMTMzcHggKyAxLjVyZW0pXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Nb2JpbGVJbWFnZUxpbms+XG4gICAgICAgIDwvTW9iaWxlSW1hZ2VJdGVtPlxuICAgICAgPC9Gb290ZXJMaW5rSXRlbXM+XG4gICAgPC9Cb3g+XG4gICk7XG5cbiAgY29uc3QgcmVzb3VyY2VzID0gKFxuICAgIDxCb3g+XG4gICAgICA8Rm9vdGVySGVhZGluZz5SZXNvdXJjZXM8L0Zvb3RlckhlYWRpbmc+XG4gICAgICA8Rm9vdGVyTGlua0l0ZW1zPlxuICAgICAgICB7Zm9vdGVyUmVzb3VyY2VzTGlzdC5tYXAoXG4gICAgICAgICAgKHsgaWQsIHRyYWNraW5nVGFyZ2V0LCBocmVmLCB0ZXh0LCBuZXdUYWIgfSkgPT4gKFxuICAgICAgICAgICAgPEZvb3RlckxpbmtJdGVtV2l0aEFuY2hvclxuICAgICAgICAgICAgICBrZXk9e2lkfVxuICAgICAgICAgICAgICBmb290ZXJPbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgICAgICAgICB0cmFja2luZ1RhcmdldD17dHJhY2tpbmdUYXJnZXR9XG4gICAgICAgICAgICAgIGhyZWY9e2hyZWZ9XG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgICAgICB0YXJnZXQ9e25ld1RhYiA/ICdfYmxhbmsnIDogJyd9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0ZXh0fVxuICAgICAgICAgICAgPC9Gb290ZXJMaW5rSXRlbVdpdGhBbmNob3I+XG4gICAgICAgICAgKVxuICAgICAgICApfVxuICAgICAgPC9Gb290ZXJMaW5rSXRlbXM+XG4gICAgPC9Cb3g+XG4gICk7XG5cbiAgY29uc3Qgc3VwcG9ydCA9IChkaXNwbGF5OiBCb3hQcm9wc1snZGlzcGxheSddKSA9PiAoXG4gICAgPEJveCBkaXNwbGF5PXtkaXNwbGF5fSBtdD17eyBzbTogMTYgfX0gb3JkZXI9e3sgc206IDMgfX0+XG4gICAgICA8Rm9vdGVySGVhZGluZz5TdXBwb3J0PC9Gb290ZXJIZWFkaW5nPlxuICAgICAgPEZvb3RlckxpbmtJdGVtcz5cbiAgICAgICAgPEZvb3RlckxpbmtJdGVtPlxuICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2hlbHAuY29kZWNhZGVteS5jb21cIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2hlbHAnIH0pfVxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEhlbHAgQ2VudGVyXG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvRm9vdGVyTGlua0l0ZW0+XG4gICAgICA8L0Zvb3RlckxpbmtJdGVtcz5cbiAgICA8L0JveD5cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxHcmlkQm94XG4gICAgICBncmlkVGVtcGxhdGVDb2x1bW5zPXt7XG4gICAgICAgIF86ICdyZXBlYXQoMiwgbWlubWF4KDAsIDFmcikpJyxcbiAgICAgICAgc206ICdyZXBlYXQoMywgbWlubWF4KDAsIDFmcikpJyxcbiAgICAgIH19XG4gICAgICByb3dHYXA9ezE2fVxuICAgID5cbiAgICAgIHtjb21wYW55fVxuICAgICAge3Jlc291cmNlc31cbiAgICAgIHtzdXBwb3J0KHsgXzogJ3Vuc2V0Jywgc206ICdub25lJyB9KX1cbiAgICAgIHtjb21tdW5pdHl9XG4gICAgICB7aGlkZVByaWNpbmcgPyBudWxsIDogaW5kaXZpZHVhbFBsYW5zfVxuICAgICAge2VudGVycHJpc2VQbGFuc31cbiAgICAgIHttb2JpbGV9XG4gICAgICB7c3VwcG9ydCh7IF86ICdub25lJywgc206ICd1bnNldCcgfSl9XG4gICAgPC9HcmlkQm94PlxuICApO1xufTtcbiJdfQ== */");
MobileImageItem.defaultProps = {
  as: 'li',
  display: 'inline-block',
  my: 8,
  width: {
    _: '50%',
    md: '90%'
  }
};
var MobileImageLink = /*#__PURE__*/_styled(Anchor, {
  target: "ese2wcm0",
  label: "MobileImageLink"
})(process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTmF2TGlua3MvQ29tcGFueUxpbmtzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrQ3dCIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTmF2TGlua3MvQ29tcGFueUxpbmtzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuY2hvciwgQm94LCBCb3hQcm9wcywgR3JpZEJveCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgTG9nb0Zyb21Ta2lsbHNvZnQgfSBmcm9tICcuLi8uLic7XG5pbXBvcnQgeyBmb290ZXJSZXNvdXJjZXNMaXN0IH0gZnJvbSAnLi4vLi4vbGliL3Jlc291cmNlc0xpc3QnO1xuaW1wb3J0IHsgRm9vdGVySGVhZGluZyB9IGZyb20gJy4uL0Zvb3RlckhlYWRpbmcnO1xuaW1wb3J0IHtcbiAgRm9vdGVyTGlua0l0ZW0sXG4gIEZvb3RlckxpbmtJdGVtcyxcbiAgRm9vdGVyTGlua0l0ZW1XaXRoQW5jaG9yLFxufSBmcm9tICcuLi9Gb290ZXJMaW5rcyc7XG5pbXBvcnQgeyBHbG9iYWxGb290ZXJDbGlja0hhbmRsZXIgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgZG93bmxvYWRPblRoZUFwcFN0b3JlIGZyb20gJy4vYXNzZXRzL2Rvd25sb2FkLW9uLXRoZS1hcHAtc3RvcmUuc3ZnJztcbmltcG9ydCBnZXRJdE9uR29vZ2xlUGxheSBmcm9tICcuL2Fzc2V0cy9nZXQtaXQtb24tZ29vZ2xlLXBsYXkucG5nJztcbmltcG9ydCB7IFNvY2lhbE1lZGlhTGlua3MgfSBmcm9tICcuL1NvY2lhbE1lZGlhTGlua3MnO1xuXG5leHBvcnQgdHlwZSBDb21wYW55TGlua3NQcm9wcyA9IHtcbiAgaGlkZVByaWNpbmc/OiBib29sZWFuO1xuICBvbkNsaWNrOiBHbG9iYWxGb290ZXJDbGlja0hhbmRsZXI7XG59O1xuXG5jb25zdCBNb2JpbGVJbWFnZUl0ZW0gPSBzdHlsZWQoQm94KSgpO1xuXG5Nb2JpbGVJbWFnZUl0ZW0uZGVmYXVsdFByb3BzID0ge1xuICBhczogJ2xpJyxcbiAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gIG15OiA4LFxuICB3aWR0aDoge1xuICAgIF86ICc1MCUnLFxuICAgIG1kOiAnOTAlJyxcbiAgfSxcbn07XG5cbmNvbnN0IE1vYmlsZUltYWdlTGluayA9IHN0eWxlZChBbmNob3IpKCk7XG5cbk1vYmlsZUltYWdlTGluay5kZWZhdWx0UHJvcHMgPSB7XG4gIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICB2YXJpYW50OiAnaW50ZXJmYWNlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDb21wYW55TGlua3M6IFJlYWN0LkZDPENvbXBhbnlMaW5rc1Byb3BzPiA9ICh7XG4gIGhpZGVQcmljaW5nLFxuICBvbkNsaWNrLFxufSkgPT4ge1xuICBjb25zdCBjb21tdW5pdHkgPSAoXG4gICAgPEJveD5cbiAgICAgIDxGb290ZXJIZWFkaW5nPkNvbW11bml0eTwvRm9vdGVySGVhZGluZz5cbiAgICAgIDxGb290ZXJMaW5rSXRlbXM+XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9kaXNjdXNzLmNvZGVjYWRlbXkuY29tXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdmb3J1bXMnIH0pfVxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEZvcnVtc1xuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZGlzY29yZC5jb20vaW52aXRlL2NvZGVjYWRlbXlcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2Rpc2NvcmQnIH0pfVxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIERpc2NvcmRcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9Gb290ZXJMaW5rSXRlbT5cbiAgICAgICAgPEZvb3RlckxpbmtJdGVtPlxuICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2NvbW11bml0eS5jb2RlY2FkZW15LmNvbS9jaGFwdGVyc1wiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAnY2hhcHRlcnMnIH0pfVxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIENoYXB0ZXJzXG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiL2V2ZW50c1wiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAnZXZlbnRzJyB9KX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEV2ZW50c1xuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cIi9sZWFybmVyLXN0b3JpZXNcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PlxuICAgICAgICAgICAgICBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2xlYXJuZXJfc3Rvcmllc19odWInIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBMZWFybmVyIFN0b3JpZXNcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9Gb290ZXJMaW5rSXRlbT5cbiAgICAgICAgey8qIFJlZmVyIGEgZnJpZW5kIG1hcmtldGluZyBhbmNob3IgKi99XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8c3BhbiBpZD1cImV4dG9sZV96b25lX2dsb2JhbF9mb290ZXJcIiAvPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgPC9Gb290ZXJMaW5rSXRlbXM+XG4gICAgPC9Cb3g+XG4gICk7XG5cbiAgY29uc3QgY29tcGFueSA9IChcbiAgICA8Qm94PlxuICAgICAgPEZvb3RlckhlYWRpbmc+XG4gICAgICAgIDxMb2dvRnJvbVNraWxsc29mdCBoZWlnaHQ9ezQwfSAvPlxuICAgICAgPC9Gb290ZXJIZWFkaW5nPlxuICAgICAgPEZvb3RlckxpbmtJdGVtcz5cbiAgICAgICAgPEZvb3RlckxpbmtJdGVtPlxuICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgIGhyZWY9XCIvYWJvdXRcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2Fib3V0JyB9KX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEFib3V0XG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiL2Fib3V0L2NhcmVlcnNcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2pvYnMnIH0pfVxuICAgICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgQ2FyZWVyc1xuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cIi9wYWdlcy9jb2RlY2FkZW15LWFmZmlsaWF0ZS1wcm9ncmFtXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdhZmZpbGlhdGVfcHJvZ3JhbScgfSl9XG4gICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBBZmZpbGlhdGVzXG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8U29jaWFsTWVkaWFMaW5rcyAvPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgPC9Gb290ZXJMaW5rSXRlbXM+XG4gICAgPC9Cb3g+XG4gICk7XG5cbiAgY29uc3QgZW50ZXJwcmlzZVBsYW5zID0gKFxuICAgIDxCb3g+XG4gICAgICA8Rm9vdGVySGVhZGluZyBtdD17aGlkZVByaWNpbmcgPyB7IHNtOiAxNiB9IDogeyBfOiAyNCwgc206IDAgfX0+XG4gICAgICAgIEVudGVycHJpc2UgUGxhbnNcbiAgICAgIDwvRm9vdGVySGVhZGluZz5cbiAgICAgIDxGb290ZXJMaW5rSXRlbXM+XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiL2J1c2luZXNzXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdidXNpbmVzc19sYW5kaW5nJyB9KX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEJ1c2luZXNzIFNvbHV0aW9uc1xuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgPC9Gb290ZXJMaW5rSXRlbXM+XG4gICAgPC9Cb3g+XG4gICk7XG5cbiAgY29uc3QgaW5kaXZpZHVhbFBsYW5zID0gKFxuICAgIDxCb3g+XG4gICAgICA8Rm9vdGVySGVhZGluZz5JbmRpdmlkdWFsIFBsYW5zPC9Gb290ZXJIZWFkaW5nPlxuICAgICAgPEZvb3RlckxpbmtJdGVtcz5cbiAgICAgICAgPEZvb3RlckxpbmtJdGVtPlxuICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgIGhyZWY9XCIvcGFnZXMvcHJvXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdwcm9fbWVtYmVyc2hpcCcgfSl9XG4gICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBQYWlkIE1lbWJlcnNoaXBzXG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiL3N0dWRlbnQtY2VudGVyXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdzdHVkZW50cycgfSl9XG4gICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBGb3IgU3R1ZGVudHNcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9Gb290ZXJMaW5rSXRlbT5cbiAgICAgIDwvRm9vdGVyTGlua0l0ZW1zPlxuICAgIDwvQm94PlxuICApO1xuXG4gIGNvbnN0IG1vYmlsZSA9IChcbiAgICA8Qm94XG4gICAgICBncmlkQ29sdW1uPVwiMSAvIDNcIlxuICAgICAgZ3JpZENvbHVtbkVuZD17eyBzbTogJzEnIH19XG4gICAgICBncmlkUm93PXt7IHNtOiAnMiAvIDQnIH19XG4gICAgICBwdD17aGlkZVByaWNpbmcgPyB7IHNtOiAxNiB9IDoge319XG4gICAgPlxuICAgICAgPEZvb3RlckhlYWRpbmcgbWI9e3sgXzogOCwgc206IDE2LCBsZzogMCB9fT5Nb2JpbGU8L0Zvb3RlckhlYWRpbmc+XG4gICAgICA8Rm9vdGVyTGlua0l0ZW1zXG4gICAgICAgIGRpc3BsYXk9e3sgc206ICdmbGV4JyB9fVxuICAgICAgICBmbGV4RGlyZWN0aW9uPXt7IHNtOiAnY29sdW1uJyB9fVxuICAgICAgPlxuICAgICAgICA8TW9iaWxlSW1hZ2VJdGVtPlxuICAgICAgICAgIDxNb2JpbGVJbWFnZUxpbmtcbiAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2l0dW5lcy5hcHBsZS5jb20vdXMvYXBwL2NvZGVjYWRlbXktZ28vaWQxMzc2MDI5MzI2XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdhcHBsZV9zdG9yZScgfSl9XG4gICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgcmVsPVwibm9vcGVuZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgYWx0PVwiRG93bmxvYWQgb24gdGhlIEFwcCBTdG9yZVwiXG4gICAgICAgICAgICAgIGhlaWdodD1cImNhbGMoNDBweCArIDFyZW0pXCJcbiAgICAgICAgICAgICAgc3JjPXtkb3dubG9hZE9uVGhlQXBwU3RvcmV9XG4gICAgICAgICAgICAgIHdpZHRoPVwiY2FsYygxMjBweCArIDEuNXJlbSlcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L01vYmlsZUltYWdlTGluaz5cbiAgICAgICAgPC9Nb2JpbGVJbWFnZUl0ZW0+XG4gICAgICAgIDxNb2JpbGVJbWFnZUl0ZW0+XG4gICAgICAgICAgPE1vYmlsZUltYWdlTGlua1xuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vcGxheS5nb29nbGUuY29tL3N0b3JlL2FwcHMvZGV0YWlscz9pZD1jb20ucnl6YWMuY29kZWNhZGVteWdvXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdnb29nbGVfcGxheScgfSl9XG4gICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgcmVsPVwibm9vcGVuZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgYWx0PVwiR2V0IGl0IG9uIEdvb2dsZSBQbGF5XCJcbiAgICAgICAgICAgICAgaGVpZ2h0PVwiY2FsYyg0MHB4ICsgMXJlbSlcIlxuICAgICAgICAgICAgICBzcmM9e2dldEl0T25Hb29nbGVQbGF5fVxuICAgICAgICAgICAgICB3aWR0aD1cImNhbGMoMTMzcHggKyAxLjVyZW0pXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Nb2JpbGVJbWFnZUxpbms+XG4gICAgICAgIDwvTW9iaWxlSW1hZ2VJdGVtPlxuICAgICAgPC9Gb290ZXJMaW5rSXRlbXM+XG4gICAgPC9Cb3g+XG4gICk7XG5cbiAgY29uc3QgcmVzb3VyY2VzID0gKFxuICAgIDxCb3g+XG4gICAgICA8Rm9vdGVySGVhZGluZz5SZXNvdXJjZXM8L0Zvb3RlckhlYWRpbmc+XG4gICAgICA8Rm9vdGVyTGlua0l0ZW1zPlxuICAgICAgICB7Zm9vdGVyUmVzb3VyY2VzTGlzdC5tYXAoXG4gICAgICAgICAgKHsgaWQsIHRyYWNraW5nVGFyZ2V0LCBocmVmLCB0ZXh0LCBuZXdUYWIgfSkgPT4gKFxuICAgICAgICAgICAgPEZvb3RlckxpbmtJdGVtV2l0aEFuY2hvclxuICAgICAgICAgICAgICBrZXk9e2lkfVxuICAgICAgICAgICAgICBmb290ZXJPbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgICAgICAgICB0cmFja2luZ1RhcmdldD17dHJhY2tpbmdUYXJnZXR9XG4gICAgICAgICAgICAgIGhyZWY9e2hyZWZ9XG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgICAgICB0YXJnZXQ9e25ld1RhYiA/ICdfYmxhbmsnIDogJyd9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0ZXh0fVxuICAgICAgICAgICAgPC9Gb290ZXJMaW5rSXRlbVdpdGhBbmNob3I+XG4gICAgICAgICAgKVxuICAgICAgICApfVxuICAgICAgPC9Gb290ZXJMaW5rSXRlbXM+XG4gICAgPC9Cb3g+XG4gICk7XG5cbiAgY29uc3Qgc3VwcG9ydCA9IChkaXNwbGF5OiBCb3hQcm9wc1snZGlzcGxheSddKSA9PiAoXG4gICAgPEJveCBkaXNwbGF5PXtkaXNwbGF5fSBtdD17eyBzbTogMTYgfX0gb3JkZXI9e3sgc206IDMgfX0+XG4gICAgICA8Rm9vdGVySGVhZGluZz5TdXBwb3J0PC9Gb290ZXJIZWFkaW5nPlxuICAgICAgPEZvb3RlckxpbmtJdGVtcz5cbiAgICAgICAgPEZvb3RlckxpbmtJdGVtPlxuICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2hlbHAuY29kZWNhZGVteS5jb21cIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2hlbHAnIH0pfVxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEhlbHAgQ2VudGVyXG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvRm9vdGVyTGlua0l0ZW0+XG4gICAgICA8L0Zvb3RlckxpbmtJdGVtcz5cbiAgICA8L0JveD5cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxHcmlkQm94XG4gICAgICBncmlkVGVtcGxhdGVDb2x1bW5zPXt7XG4gICAgICAgIF86ICdyZXBlYXQoMiwgbWlubWF4KDAsIDFmcikpJyxcbiAgICAgICAgc206ICdyZXBlYXQoMywgbWlubWF4KDAsIDFmcikpJyxcbiAgICAgIH19XG4gICAgICByb3dHYXA9ezE2fVxuICAgID5cbiAgICAgIHtjb21wYW55fVxuICAgICAge3Jlc291cmNlc31cbiAgICAgIHtzdXBwb3J0KHsgXzogJ3Vuc2V0Jywgc206ICdub25lJyB9KX1cbiAgICAgIHtjb21tdW5pdHl9XG4gICAgICB7aGlkZVByaWNpbmcgPyBudWxsIDogaW5kaXZpZHVhbFBsYW5zfVxuICAgICAge2VudGVycHJpc2VQbGFuc31cbiAgICAgIHttb2JpbGV9XG4gICAgICB7c3VwcG9ydCh7IF86ICdub25lJywgc206ICd1bnNldCcgfSl9XG4gICAgPC9HcmlkQm94PlxuICApO1xufTtcbiJdfQ== */");
MobileImageLink.defaultProps = {
  display: 'inline-block',
  variant: 'interface'
};
export var CompanyLinks = function CompanyLinks(_ref) {
  var hidePricing = _ref.hidePricing,
    _onClick = _ref.onClick;
  var community = /*#__PURE__*/_jsxs(Box, {
    children: [/*#__PURE__*/_jsx(FooterHeading, {
      children: "Community"
    }), /*#__PURE__*/_jsxs(FooterLinkItems, {
      children: [/*#__PURE__*/_jsx(FooterLinkItem, {
        children: /*#__PURE__*/_jsx(Anchor, {
          href: "https://discuss.codecademy.com",
          onClick: function onClick(event) {
            return _onClick({
              event: event,
              target: 'forums'
            });
          },
          target: "_blank",
          variant: "interface",
          children: "Forums"
        })
      }), /*#__PURE__*/_jsx(FooterLinkItem, {
        children: /*#__PURE__*/_jsx(Anchor, {
          href: "https://discord.com/invite/codecademy",
          onClick: function onClick(event) {
            return _onClick({
              event: event,
              target: 'discord'
            });
          },
          target: "_blank",
          variant: "interface",
          children: "Discord"
        })
      }), /*#__PURE__*/_jsx(FooterLinkItem, {
        children: /*#__PURE__*/_jsx(Anchor, {
          href: "https://community.codecademy.com/chapters",
          onClick: function onClick(event) {
            return _onClick({
              event: event,
              target: 'chapters'
            });
          },
          target: "_blank",
          variant: "interface",
          children: "Chapters"
        })
      }), /*#__PURE__*/_jsx(FooterLinkItem, {
        children: /*#__PURE__*/_jsx(Anchor, {
          href: "/events",
          onClick: function onClick(event) {
            return _onClick({
              event: event,
              target: 'events'
            });
          },
          variant: "interface",
          children: "Events"
        })
      }), /*#__PURE__*/_jsx(FooterLinkItem, {
        children: /*#__PURE__*/_jsx(Anchor, {
          href: "/learner-stories",
          onClick: function onClick(event) {
            return _onClick({
              event: event,
              target: 'learner_stories_hub'
            });
          },
          variant: "interface",
          children: "Learner Stories"
        })
      }), /*#__PURE__*/_jsx(FooterLinkItem, {
        children: /*#__PURE__*/_jsx("span", {
          id: "extole_zone_global_footer"
        })
      })]
    })]
  });
  var company = /*#__PURE__*/_jsxs(Box, {
    children: [/*#__PURE__*/_jsx(FooterHeading, {
      children: /*#__PURE__*/_jsx(LogoFromSkillsoft, {
        height: 40
      })
    }), /*#__PURE__*/_jsxs(FooterLinkItems, {
      children: [/*#__PURE__*/_jsx(FooterLinkItem, {
        children: /*#__PURE__*/_jsx(Anchor, {
          href: "/about",
          onClick: function onClick(event) {
            return _onClick({
              event: event,
              target: 'about'
            });
          },
          variant: "interface",
          children: "About"
        })
      }), /*#__PURE__*/_jsx(FooterLinkItem, {
        children: /*#__PURE__*/_jsx(Anchor, {
          href: "/about/careers",
          onClick: function onClick(event) {
            return _onClick({
              event: event,
              target: 'jobs'
            });
          },
          variant: "interface",
          children: "Careers"
        })
      }), /*#__PURE__*/_jsx(FooterLinkItem, {
        children: /*#__PURE__*/_jsx(Anchor, {
          href: "/pages/codecademy-affiliate-program",
          onClick: function onClick(event) {
            return _onClick({
              event: event,
              target: 'affiliate_program'
            });
          },
          variant: "interface",
          children: "Affiliates"
        })
      }), /*#__PURE__*/_jsx(FooterLinkItem, {
        children: /*#__PURE__*/_jsx(SocialMediaLinks, {})
      })]
    })]
  });
  var enterprisePlans = /*#__PURE__*/_jsxs(Box, {
    children: [/*#__PURE__*/_jsx(FooterHeading, {
      mt: hidePricing ? {
        sm: 16
      } : {
        _: 24,
        sm: 0
      },
      children: "Enterprise Plans"
    }), /*#__PURE__*/_jsx(FooterLinkItems, {
      children: /*#__PURE__*/_jsx(FooterLinkItem, {
        children: /*#__PURE__*/_jsx(Anchor, {
          href: "/business",
          onClick: function onClick(event) {
            return _onClick({
              event: event,
              target: 'business_landing'
            });
          },
          variant: "interface",
          children: "Business Solutions"
        })
      })
    })]
  });
  var individualPlans = /*#__PURE__*/_jsxs(Box, {
    children: [/*#__PURE__*/_jsx(FooterHeading, {
      children: "Individual Plans"
    }), /*#__PURE__*/_jsxs(FooterLinkItems, {
      children: [/*#__PURE__*/_jsx(FooterLinkItem, {
        children: /*#__PURE__*/_jsx(Anchor, {
          href: "/pages/pro",
          onClick: function onClick(event) {
            return _onClick({
              event: event,
              target: 'pro_membership'
            });
          },
          variant: "interface",
          children: "Paid Memberships"
        })
      }), /*#__PURE__*/_jsx(FooterLinkItem, {
        children: /*#__PURE__*/_jsx(Anchor, {
          href: "/student-center",
          onClick: function onClick(event) {
            return _onClick({
              event: event,
              target: 'students'
            });
          },
          variant: "interface",
          children: "For Students"
        })
      })]
    })]
  });
  var mobile = /*#__PURE__*/_jsxs(Box, {
    gridColumn: "1 / 3",
    gridColumnEnd: {
      sm: '1'
    },
    gridRow: {
      sm: '2 / 4'
    },
    pt: hidePricing ? {
      sm: 16
    } : {},
    children: [/*#__PURE__*/_jsx(FooterHeading, {
      mb: {
        _: 8,
        sm: 16,
        lg: 0
      },
      children: "Mobile"
    }), /*#__PURE__*/_jsxs(FooterLinkItems, {
      display: {
        sm: 'flex'
      },
      flexDirection: {
        sm: 'column'
      },
      children: [/*#__PURE__*/_jsx(MobileImageItem, {
        children: /*#__PURE__*/_jsx(MobileImageLink, {
          href: "https://itunes.apple.com/us/app/codecademy-go/id1376029326",
          onClick: function onClick(event) {
            return _onClick({
              event: event,
              target: 'apple_store'
            });
          },
          target: "_blank",
          rel: "noopener",
          children: /*#__PURE__*/_jsx("img", {
            alt: "Download on the App Store",
            height: "calc(40px + 1rem)",
            src: downloadOnTheAppStore,
            width: "calc(120px + 1.5rem)"
          })
        })
      }), /*#__PURE__*/_jsx(MobileImageItem, {
        children: /*#__PURE__*/_jsx(MobileImageLink, {
          href: "https://play.google.com/store/apps/details?id=com.ryzac.codecademygo",
          onClick: function onClick(event) {
            return _onClick({
              event: event,
              target: 'google_play'
            });
          },
          target: "_blank",
          rel: "noopener",
          children: /*#__PURE__*/_jsx("img", {
            alt: "Get it on Google Play",
            height: "calc(40px + 1rem)",
            src: getItOnGooglePlay,
            width: "calc(133px + 1.5rem)"
          })
        })
      })]
    })]
  });
  var resources = /*#__PURE__*/_jsxs(Box, {
    children: [/*#__PURE__*/_jsx(FooterHeading, {
      children: "Resources"
    }), /*#__PURE__*/_jsx(FooterLinkItems, {
      children: footerResourcesList.map(function (_ref2) {
        var id = _ref2.id,
          trackingTarget = _ref2.trackingTarget,
          href = _ref2.href,
          text = _ref2.text,
          newTab = _ref2.newTab;
        return /*#__PURE__*/_jsx(FooterLinkItemWithAnchor, {
          footerOnClick: _onClick,
          trackingTarget: trackingTarget,
          href: href,
          variant: "interface",
          target: newTab ? '_blank' : '',
          children: text
        }, id);
      })
    })]
  });
  var support = function support(display) {
    return /*#__PURE__*/_jsxs(Box, {
      display: display,
      mt: {
        sm: 16
      },
      order: {
        sm: 3
      },
      children: [/*#__PURE__*/_jsx(FooterHeading, {
        children: "Support"
      }), /*#__PURE__*/_jsx(FooterLinkItems, {
        children: /*#__PURE__*/_jsx(FooterLinkItem, {
          children: /*#__PURE__*/_jsx(Anchor, {
            href: "https://help.codecademy.com",
            onClick: function onClick(event) {
              return _onClick({
                event: event,
                target: 'help'
              });
            },
            target: "_blank",
            variant: "interface",
            children: "Help Center"
          })
        })
      })]
    });
  };
  return /*#__PURE__*/_jsxs(GridBox, {
    gridTemplateColumns: {
      _: 'repeat(2, minmax(0, 1fr))',
      sm: 'repeat(3, minmax(0, 1fr))'
    },
    rowGap: 16,
    children: [company, resources, support({
      _: 'unset',
      sm: 'none'
    }), community, hidePricing ? null : individualPlans, enterprisePlans, mobile, support({
      _: 'none',
      sm: 'unset'
    })]
  });
};