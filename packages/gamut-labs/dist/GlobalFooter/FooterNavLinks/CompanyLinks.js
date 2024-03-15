import _styled from "@emotion/styled/base";
import { Anchor, Box, GridBox } from '@codecademy/gamut';
import React from 'react';
import { LogoFromSkillsoft } from '../..';
import { footerResourcesList } from '../../lib/resourcesList';
import { FooterHeading } from '../FooterHeading';
import { FooterLinkItem, FooterLinkItems, FooterLinkItemWithAnchor } from '../FooterLinks';
import downloadOnTheAppStore from './assets/download-on-the-app-store.svg';
import getItOnGooglePlay from './assets/get-it-on-google-play.png';
import { SocialMediaLinks } from './SocialMediaLinks';

var MobileImageItem = /*#__PURE__*/_styled(Box, {
  target: "ese2wcm1",
  label: "MobileImageItem"
})(process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTmF2TGlua3MvQ29tcGFueUxpbmtzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1QndCIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTmF2TGlua3MvQ29tcGFueUxpbmtzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuY2hvciwgQm94LCBCb3hQcm9wcywgR3JpZEJveCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IExvZ29Gcm9tU2tpbGxzb2Z0IH0gZnJvbSAnLi4vLi4nO1xuaW1wb3J0IHsgZm9vdGVyUmVzb3VyY2VzTGlzdCB9IGZyb20gJy4uLy4uL2xpYi9yZXNvdXJjZXNMaXN0JztcbmltcG9ydCB7IEZvb3RlckhlYWRpbmcgfSBmcm9tICcuLi9Gb290ZXJIZWFkaW5nJztcbmltcG9ydCB7XG4gIEZvb3RlckxpbmtJdGVtLFxuICBGb290ZXJMaW5rSXRlbXMsXG4gIEZvb3RlckxpbmtJdGVtV2l0aEFuY2hvcixcbn0gZnJvbSAnLi4vRm9vdGVyTGlua3MnO1xuaW1wb3J0IHsgR2xvYmFsRm9vdGVyQ2xpY2tIYW5kbGVyIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IGRvd25sb2FkT25UaGVBcHBTdG9yZSBmcm9tICcuL2Fzc2V0cy9kb3dubG9hZC1vbi10aGUtYXBwLXN0b3JlLnN2Zyc7XG5pbXBvcnQgZ2V0SXRPbkdvb2dsZVBsYXkgZnJvbSAnLi9hc3NldHMvZ2V0LWl0LW9uLWdvb2dsZS1wbGF5LnBuZyc7XG5pbXBvcnQgeyBTb2NpYWxNZWRpYUxpbmtzIH0gZnJvbSAnLi9Tb2NpYWxNZWRpYUxpbmtzJztcblxuZXhwb3J0IHR5cGUgQ29tcGFueUxpbmtzUHJvcHMgPSB7XG4gIGhpZGVQcmljaW5nPzogYm9vbGVhbjtcbiAgb25DbGljazogR2xvYmFsRm9vdGVyQ2xpY2tIYW5kbGVyO1xuICB1c2VyR2VvOiBzdHJpbmc7XG59O1xuXG5jb25zdCBNb2JpbGVJbWFnZUl0ZW0gPSBzdHlsZWQoQm94KSgpO1xuXG5Nb2JpbGVJbWFnZUl0ZW0uZGVmYXVsdFByb3BzID0ge1xuICBhczogJ2xpJyxcbiAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gIG15OiA4LFxuICB3aWR0aDoge1xuICAgIF86ICc1MCUnLFxuICAgIG1kOiAnOTAlJyxcbiAgfSxcbn07XG5cbmNvbnN0IE1vYmlsZUltYWdlTGluayA9IHN0eWxlZChBbmNob3IpKCk7XG5cbk1vYmlsZUltYWdlTGluay5kZWZhdWx0UHJvcHMgPSB7XG4gIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICB2YXJpYW50OiAnaW50ZXJmYWNlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDb21wYW55TGlua3M6IFJlYWN0LkZDPENvbXBhbnlMaW5rc1Byb3BzPiA9ICh7XG4gIGhpZGVQcmljaW5nLFxuICBvbkNsaWNrLFxuICB1c2VyR2VvLFxufSkgPT4ge1xuICBjb25zdCBjb21tdW5pdHkgPSAoXG4gICAgPEJveD5cbiAgICAgIDxGb290ZXJIZWFkaW5nPkNvbW11bml0eTwvRm9vdGVySGVhZGluZz5cbiAgICAgIDxGb290ZXJMaW5rSXRlbXM+XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9kaXNjdXNzLmNvZGVjYWRlbXkuY29tXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdmb3J1bXMnIH0pfVxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEZvcnVtc1xuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZGlzY29yZC5jb20vaW52aXRlL2NvZGVjYWRlbXlcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2Rpc2NvcmQnIH0pfVxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIERpc2NvcmRcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9Gb290ZXJMaW5rSXRlbT5cbiAgICAgICAgPEZvb3RlckxpbmtJdGVtPlxuICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2NvbW11bml0eS5jb2RlY2FkZW15LmNvbS9jaGFwdGVyc1wiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAnY2hhcHRlcnMnIH0pfVxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIENoYXB0ZXJzXG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiL2V2ZW50c1wiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAnZXZlbnRzJyB9KX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEV2ZW50c1xuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cIi9sZWFybmVyLXN0b3JpZXNcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PlxuICAgICAgICAgICAgICBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2xlYXJuZXJfc3Rvcmllc19odWInIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBMZWFybmVyIFN0b3JpZXNcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9Gb290ZXJMaW5rSXRlbT5cbiAgICAgICAgey8qIFJlZmVyIGEgZnJpZW5kIG1hcmtldGluZyBhbmNob3IgKi99XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8c3BhbiBpZD1cImV4dG9sZV96b25lX2dsb2JhbF9mb290ZXJcIiAvPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgPC9Gb290ZXJMaW5rSXRlbXM+XG4gICAgPC9Cb3g+XG4gICk7XG5cbiAgY29uc3QgY29tcGFueSA9IChcbiAgICA8Qm94PlxuICAgICAgPEZvb3RlckhlYWRpbmc+XG4gICAgICAgIDxMb2dvRnJvbVNraWxsc29mdCBoZWlnaHQ9ezQwfSAvPlxuICAgICAgPC9Gb290ZXJIZWFkaW5nPlxuICAgICAgPEZvb3RlckxpbmtJdGVtcz5cbiAgICAgICAgPEZvb3RlckxpbmtJdGVtPlxuICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgIGhyZWY9XCIvYWJvdXRcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2Fib3V0JyB9KX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEFib3V0XG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiL2Fib3V0L2NhcmVlcnNcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2pvYnMnIH0pfVxuICAgICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgQ2FyZWVyc1xuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cIi9wYWdlcy9jb2RlY2FkZW15LWFmZmlsaWF0ZS1wcm9ncmFtXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdhZmZpbGlhdGVfcHJvZ3JhbScgfSl9XG4gICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBBZmZpbGlhdGVzXG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgIHt1c2VyR2VvICE9PSAnSU4nICYmIChcbiAgICAgICAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICAgIGhyZWY9XCJodHRwczovL3Nob3AuY29kZWNhZGVteS5jb21cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAnc2hvcCcgfSl9XG4gICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBTaG9wXG4gICAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICApfVxuICAgICAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPFNvY2lhbE1lZGlhTGlua3MgLz5cbiAgICAgICAgPC9Gb290ZXJMaW5rSXRlbT5cbiAgICAgIDwvRm9vdGVyTGlua0l0ZW1zPlxuICAgIDwvQm94PlxuICApO1xuXG4gIGNvbnN0IGVudGVycHJpc2VQbGFucyA9IChcbiAgICA8Qm94PlxuICAgICAgPEZvb3RlckhlYWRpbmcgbXQ9e2hpZGVQcmljaW5nID8geyBzbTogMTYgfSA6IHsgXzogMjQsIHNtOiAwIH19PlxuICAgICAgICBFbnRlcnByaXNlIFBsYW5zXG4gICAgICA8L0Zvb3RlckhlYWRpbmc+XG4gICAgICA8Rm9vdGVyTGlua0l0ZW1zPlxuICAgICAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cIi9idXNpbmVzc1wiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAnYnVzaW5lc3NfbGFuZGluZycgfSl9XG4gICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBCdXNpbmVzcyBTb2x1dGlvbnNcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9Gb290ZXJMaW5rSXRlbT5cbiAgICAgIDwvRm9vdGVyTGlua0l0ZW1zPlxuICAgIDwvQm94PlxuICApO1xuXG4gIGNvbnN0IGluZGl2aWR1YWxQbGFucyA9IChcbiAgICA8Qm94PlxuICAgICAgPEZvb3RlckhlYWRpbmc+SW5kaXZpZHVhbCBQbGFuczwvRm9vdGVySGVhZGluZz5cbiAgICAgIDxGb290ZXJMaW5rSXRlbXM+XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiL3BhZ2VzL3Byb1wiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAncHJvX21lbWJlcnNoaXAnIH0pfVxuICAgICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgUHJvIE1lbWJlcnNoaXBcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9Gb290ZXJMaW5rSXRlbT5cbiAgICAgICAgPEZvb3RlckxpbmtJdGVtPlxuICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgIGhyZWY9XCIvc3R1ZGVudC1jZW50ZXJcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ3N0dWRlbnRzJyB9KX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEZvciBTdHVkZW50c1xuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgPC9Gb290ZXJMaW5rSXRlbXM+XG4gICAgPC9Cb3g+XG4gICk7XG5cbiAgY29uc3QgbW9iaWxlID0gKFxuICAgIDxCb3hcbiAgICAgIGdyaWRDb2x1bW49XCIxIC8gM1wiXG4gICAgICBncmlkQ29sdW1uRW5kPXt7IHNtOiAnMScgfX1cbiAgICAgIGdyaWRSb3c9e3sgc206ICcyIC8gNCcgfX1cbiAgICAgIHB0PXtoaWRlUHJpY2luZyA/IHsgc206IDE2IH0gOiB7fX1cbiAgICA+XG4gICAgICA8Rm9vdGVySGVhZGluZyBtYj17eyBfOiA4LCBzbTogMTYsIGxnOiAwIH19Pk1vYmlsZTwvRm9vdGVySGVhZGluZz5cbiAgICAgIDxGb290ZXJMaW5rSXRlbXNcbiAgICAgICAgZGlzcGxheT17eyBzbTogJ2ZsZXgnIH19XG4gICAgICAgIGZsZXhEaXJlY3Rpb249e3sgc206ICdjb2x1bW4nIH19XG4gICAgICA+XG4gICAgICAgIDxNb2JpbGVJbWFnZUl0ZW0+XG4gICAgICAgICAgPE1vYmlsZUltYWdlTGlua1xuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vaXR1bmVzLmFwcGxlLmNvbS91cy9hcHAvY29kZWNhZGVteS1nby9pZDEzNzYwMjkzMjZcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2FwcGxlX3N0b3JlJyB9KX1cbiAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICByZWw9XCJub29wZW5lclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBhbHQ9XCJEb3dubG9hZCBvbiB0aGUgQXBwIFN0b3JlXCJcbiAgICAgICAgICAgICAgaGVpZ2h0PVwiY2FsYyg0MHB4ICsgMXJlbSlcIlxuICAgICAgICAgICAgICBzcmM9e2Rvd25sb2FkT25UaGVBcHBTdG9yZX1cbiAgICAgICAgICAgICAgd2lkdGg9XCJjYWxjKDEyMHB4ICsgMS41cmVtKVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvTW9iaWxlSW1hZ2VMaW5rPlxuICAgICAgICA8L01vYmlsZUltYWdlSXRlbT5cbiAgICAgICAgPE1vYmlsZUltYWdlSXRlbT5cbiAgICAgICAgICA8TW9iaWxlSW1hZ2VMaW5rXG4gICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9wbGF5Lmdvb2dsZS5jb20vc3RvcmUvYXBwcy9kZXRhaWxzP2lkPWNvbS5yeXphYy5jb2RlY2FkZW15Z29cIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2dvb2dsZV9wbGF5JyB9KX1cbiAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICByZWw9XCJub29wZW5lclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBhbHQ9XCJHZXQgaXQgb24gR29vZ2xlIFBsYXlcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCJjYWxjKDQwcHggKyAxcmVtKVwiXG4gICAgICAgICAgICAgIHNyYz17Z2V0SXRPbkdvb2dsZVBsYXl9XG4gICAgICAgICAgICAgIHdpZHRoPVwiY2FsYygxMzNweCArIDEuNXJlbSlcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L01vYmlsZUltYWdlTGluaz5cbiAgICAgICAgPC9Nb2JpbGVJbWFnZUl0ZW0+XG4gICAgICA8L0Zvb3RlckxpbmtJdGVtcz5cbiAgICA8L0JveD5cbiAgKTtcblxuICBjb25zdCByZXNvdXJjZXMgPSAoXG4gICAgPEJveD5cbiAgICAgIDxGb290ZXJIZWFkaW5nPlJlc291cmNlczwvRm9vdGVySGVhZGluZz5cbiAgICAgIDxGb290ZXJMaW5rSXRlbXM+XG4gICAgICAgIHtmb290ZXJSZXNvdXJjZXNMaXN0Lm1hcChcbiAgICAgICAgICAoeyBpZCwgdHJhY2tpbmdUYXJnZXQsIGhyZWYsIHRleHQsIG5ld1RhYiB9KSA9PiAoXG4gICAgICAgICAgICA8Rm9vdGVyTGlua0l0ZW1XaXRoQW5jaG9yXG4gICAgICAgICAgICAgIGtleT17aWR9XG4gICAgICAgICAgICAgIGZvb3Rlck9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgICAgICAgIHRyYWNraW5nVGFyZ2V0PXt0cmFja2luZ1RhcmdldH1cbiAgICAgICAgICAgICAgaHJlZj17aHJlZn1cbiAgICAgICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgICAgIHRhcmdldD17bmV3VGFiID8gJ19ibGFuaycgOiAnJ31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3RleHR9XG4gICAgICAgICAgICA8L0Zvb3RlckxpbmtJdGVtV2l0aEFuY2hvcj5cbiAgICAgICAgICApXG4gICAgICAgICl9XG4gICAgICA8L0Zvb3RlckxpbmtJdGVtcz5cbiAgICA8L0JveD5cbiAgKTtcblxuICBjb25zdCBzdXBwb3J0ID0gKGRpc3BsYXk6IEJveFByb3BzWydkaXNwbGF5J10pID0+IChcbiAgICA8Qm94IGRpc3BsYXk9e2Rpc3BsYXl9IG10PXt7IHNtOiAxNiB9fSBvcmRlcj17eyBzbTogMyB9fT5cbiAgICAgIDxGb290ZXJIZWFkaW5nPlN1cHBvcnQ8L0Zvb3RlckhlYWRpbmc+XG4gICAgICA8Rm9vdGVyTGlua0l0ZW1zPlxuICAgICAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vaGVscC5jb2RlY2FkZW15LmNvbVwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAnaGVscCcgfSl9XG4gICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgSGVscCBDZW50ZXJcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9Gb290ZXJMaW5rSXRlbT5cbiAgICAgIDwvRm9vdGVyTGlua0l0ZW1zPlxuICAgIDwvQm94PlxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPEdyaWRCb3hcbiAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM9e3tcbiAgICAgICAgXzogJ3JlcGVhdCgyLCBtaW5tYXgoMCwgMWZyKSknLFxuICAgICAgICBzbTogJ3JlcGVhdCgzLCBtaW5tYXgoMCwgMWZyKSknLFxuICAgICAgfX1cbiAgICAgIHJvd0dhcD17MTZ9XG4gICAgPlxuICAgICAge2NvbXBhbnl9XG4gICAgICB7cmVzb3VyY2VzfVxuICAgICAge3N1cHBvcnQoeyBfOiAndW5zZXQnLCBzbTogJ25vbmUnIH0pfVxuICAgICAge2NvbW11bml0eX1cbiAgICAgIHtoaWRlUHJpY2luZyA/IG51bGwgOiBpbmRpdmlkdWFsUGxhbnN9XG4gICAgICB7ZW50ZXJwcmlzZVBsYW5zfVxuICAgICAge21vYmlsZX1cbiAgICAgIHtzdXBwb3J0KHsgXzogJ25vbmUnLCBzbTogJ3Vuc2V0JyB9KX1cbiAgICA8L0dyaWRCb3g+XG4gICk7XG59O1xuIl19 */");

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
})(process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTmF2TGlua3MvQ29tcGFueUxpbmtzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtQ3dCIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTmF2TGlua3MvQ29tcGFueUxpbmtzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuY2hvciwgQm94LCBCb3hQcm9wcywgR3JpZEJveCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IExvZ29Gcm9tU2tpbGxzb2Z0IH0gZnJvbSAnLi4vLi4nO1xuaW1wb3J0IHsgZm9vdGVyUmVzb3VyY2VzTGlzdCB9IGZyb20gJy4uLy4uL2xpYi9yZXNvdXJjZXNMaXN0JztcbmltcG9ydCB7IEZvb3RlckhlYWRpbmcgfSBmcm9tICcuLi9Gb290ZXJIZWFkaW5nJztcbmltcG9ydCB7XG4gIEZvb3RlckxpbmtJdGVtLFxuICBGb290ZXJMaW5rSXRlbXMsXG4gIEZvb3RlckxpbmtJdGVtV2l0aEFuY2hvcixcbn0gZnJvbSAnLi4vRm9vdGVyTGlua3MnO1xuaW1wb3J0IHsgR2xvYmFsRm9vdGVyQ2xpY2tIYW5kbGVyIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IGRvd25sb2FkT25UaGVBcHBTdG9yZSBmcm9tICcuL2Fzc2V0cy9kb3dubG9hZC1vbi10aGUtYXBwLXN0b3JlLnN2Zyc7XG5pbXBvcnQgZ2V0SXRPbkdvb2dsZVBsYXkgZnJvbSAnLi9hc3NldHMvZ2V0LWl0LW9uLWdvb2dsZS1wbGF5LnBuZyc7XG5pbXBvcnQgeyBTb2NpYWxNZWRpYUxpbmtzIH0gZnJvbSAnLi9Tb2NpYWxNZWRpYUxpbmtzJztcblxuZXhwb3J0IHR5cGUgQ29tcGFueUxpbmtzUHJvcHMgPSB7XG4gIGhpZGVQcmljaW5nPzogYm9vbGVhbjtcbiAgb25DbGljazogR2xvYmFsRm9vdGVyQ2xpY2tIYW5kbGVyO1xuICB1c2VyR2VvOiBzdHJpbmc7XG59O1xuXG5jb25zdCBNb2JpbGVJbWFnZUl0ZW0gPSBzdHlsZWQoQm94KSgpO1xuXG5Nb2JpbGVJbWFnZUl0ZW0uZGVmYXVsdFByb3BzID0ge1xuICBhczogJ2xpJyxcbiAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gIG15OiA4LFxuICB3aWR0aDoge1xuICAgIF86ICc1MCUnLFxuICAgIG1kOiAnOTAlJyxcbiAgfSxcbn07XG5cbmNvbnN0IE1vYmlsZUltYWdlTGluayA9IHN0eWxlZChBbmNob3IpKCk7XG5cbk1vYmlsZUltYWdlTGluay5kZWZhdWx0UHJvcHMgPSB7XG4gIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICB2YXJpYW50OiAnaW50ZXJmYWNlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDb21wYW55TGlua3M6IFJlYWN0LkZDPENvbXBhbnlMaW5rc1Byb3BzPiA9ICh7XG4gIGhpZGVQcmljaW5nLFxuICBvbkNsaWNrLFxuICB1c2VyR2VvLFxufSkgPT4ge1xuICBjb25zdCBjb21tdW5pdHkgPSAoXG4gICAgPEJveD5cbiAgICAgIDxGb290ZXJIZWFkaW5nPkNvbW11bml0eTwvRm9vdGVySGVhZGluZz5cbiAgICAgIDxGb290ZXJMaW5rSXRlbXM+XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9kaXNjdXNzLmNvZGVjYWRlbXkuY29tXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdmb3J1bXMnIH0pfVxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEZvcnVtc1xuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZGlzY29yZC5jb20vaW52aXRlL2NvZGVjYWRlbXlcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2Rpc2NvcmQnIH0pfVxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIERpc2NvcmRcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9Gb290ZXJMaW5rSXRlbT5cbiAgICAgICAgPEZvb3RlckxpbmtJdGVtPlxuICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2NvbW11bml0eS5jb2RlY2FkZW15LmNvbS9jaGFwdGVyc1wiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAnY2hhcHRlcnMnIH0pfVxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIENoYXB0ZXJzXG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiL2V2ZW50c1wiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAnZXZlbnRzJyB9KX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEV2ZW50c1xuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cIi9sZWFybmVyLXN0b3JpZXNcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PlxuICAgICAgICAgICAgICBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2xlYXJuZXJfc3Rvcmllc19odWInIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBMZWFybmVyIFN0b3JpZXNcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9Gb290ZXJMaW5rSXRlbT5cbiAgICAgICAgey8qIFJlZmVyIGEgZnJpZW5kIG1hcmtldGluZyBhbmNob3IgKi99XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8c3BhbiBpZD1cImV4dG9sZV96b25lX2dsb2JhbF9mb290ZXJcIiAvPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgPC9Gb290ZXJMaW5rSXRlbXM+XG4gICAgPC9Cb3g+XG4gICk7XG5cbiAgY29uc3QgY29tcGFueSA9IChcbiAgICA8Qm94PlxuICAgICAgPEZvb3RlckhlYWRpbmc+XG4gICAgICAgIDxMb2dvRnJvbVNraWxsc29mdCBoZWlnaHQ9ezQwfSAvPlxuICAgICAgPC9Gb290ZXJIZWFkaW5nPlxuICAgICAgPEZvb3RlckxpbmtJdGVtcz5cbiAgICAgICAgPEZvb3RlckxpbmtJdGVtPlxuICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgIGhyZWY9XCIvYWJvdXRcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2Fib3V0JyB9KX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEFib3V0XG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiL2Fib3V0L2NhcmVlcnNcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2pvYnMnIH0pfVxuICAgICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgQ2FyZWVyc1xuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cIi9wYWdlcy9jb2RlY2FkZW15LWFmZmlsaWF0ZS1wcm9ncmFtXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdhZmZpbGlhdGVfcHJvZ3JhbScgfSl9XG4gICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBBZmZpbGlhdGVzXG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgIHt1c2VyR2VvICE9PSAnSU4nICYmIChcbiAgICAgICAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICAgIGhyZWY9XCJodHRwczovL3Nob3AuY29kZWNhZGVteS5jb21cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAnc2hvcCcgfSl9XG4gICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBTaG9wXG4gICAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICApfVxuICAgICAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPFNvY2lhbE1lZGlhTGlua3MgLz5cbiAgICAgICAgPC9Gb290ZXJMaW5rSXRlbT5cbiAgICAgIDwvRm9vdGVyTGlua0l0ZW1zPlxuICAgIDwvQm94PlxuICApO1xuXG4gIGNvbnN0IGVudGVycHJpc2VQbGFucyA9IChcbiAgICA8Qm94PlxuICAgICAgPEZvb3RlckhlYWRpbmcgbXQ9e2hpZGVQcmljaW5nID8geyBzbTogMTYgfSA6IHsgXzogMjQsIHNtOiAwIH19PlxuICAgICAgICBFbnRlcnByaXNlIFBsYW5zXG4gICAgICA8L0Zvb3RlckhlYWRpbmc+XG4gICAgICA8Rm9vdGVyTGlua0l0ZW1zPlxuICAgICAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cIi9idXNpbmVzc1wiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAnYnVzaW5lc3NfbGFuZGluZycgfSl9XG4gICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBCdXNpbmVzcyBTb2x1dGlvbnNcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9Gb290ZXJMaW5rSXRlbT5cbiAgICAgIDwvRm9vdGVyTGlua0l0ZW1zPlxuICAgIDwvQm94PlxuICApO1xuXG4gIGNvbnN0IGluZGl2aWR1YWxQbGFucyA9IChcbiAgICA8Qm94PlxuICAgICAgPEZvb3RlckhlYWRpbmc+SW5kaXZpZHVhbCBQbGFuczwvRm9vdGVySGVhZGluZz5cbiAgICAgIDxGb290ZXJMaW5rSXRlbXM+XG4gICAgICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiL3BhZ2VzL3Byb1wiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAncHJvX21lbWJlcnNoaXAnIH0pfVxuICAgICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgUHJvIE1lbWJlcnNoaXBcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9Gb290ZXJMaW5rSXRlbT5cbiAgICAgICAgPEZvb3RlckxpbmtJdGVtPlxuICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgIGhyZWY9XCIvc3R1ZGVudC1jZW50ZXJcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ3N0dWRlbnRzJyB9KX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEZvciBTdHVkZW50c1xuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICAgICAgPC9Gb290ZXJMaW5rSXRlbXM+XG4gICAgPC9Cb3g+XG4gICk7XG5cbiAgY29uc3QgbW9iaWxlID0gKFxuICAgIDxCb3hcbiAgICAgIGdyaWRDb2x1bW49XCIxIC8gM1wiXG4gICAgICBncmlkQ29sdW1uRW5kPXt7IHNtOiAnMScgfX1cbiAgICAgIGdyaWRSb3c9e3sgc206ICcyIC8gNCcgfX1cbiAgICAgIHB0PXtoaWRlUHJpY2luZyA/IHsgc206IDE2IH0gOiB7fX1cbiAgICA+XG4gICAgICA8Rm9vdGVySGVhZGluZyBtYj17eyBfOiA4LCBzbTogMTYsIGxnOiAwIH19Pk1vYmlsZTwvRm9vdGVySGVhZGluZz5cbiAgICAgIDxGb290ZXJMaW5rSXRlbXNcbiAgICAgICAgZGlzcGxheT17eyBzbTogJ2ZsZXgnIH19XG4gICAgICAgIGZsZXhEaXJlY3Rpb249e3sgc206ICdjb2x1bW4nIH19XG4gICAgICA+XG4gICAgICAgIDxNb2JpbGVJbWFnZUl0ZW0+XG4gICAgICAgICAgPE1vYmlsZUltYWdlTGlua1xuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vaXR1bmVzLmFwcGxlLmNvbS91cy9hcHAvY29kZWNhZGVteS1nby9pZDEzNzYwMjkzMjZcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2FwcGxlX3N0b3JlJyB9KX1cbiAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICByZWw9XCJub29wZW5lclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBhbHQ9XCJEb3dubG9hZCBvbiB0aGUgQXBwIFN0b3JlXCJcbiAgICAgICAgICAgICAgaGVpZ2h0PVwiY2FsYyg0MHB4ICsgMXJlbSlcIlxuICAgICAgICAgICAgICBzcmM9e2Rvd25sb2FkT25UaGVBcHBTdG9yZX1cbiAgICAgICAgICAgICAgd2lkdGg9XCJjYWxjKDEyMHB4ICsgMS41cmVtKVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvTW9iaWxlSW1hZ2VMaW5rPlxuICAgICAgICA8L01vYmlsZUltYWdlSXRlbT5cbiAgICAgICAgPE1vYmlsZUltYWdlSXRlbT5cbiAgICAgICAgICA8TW9iaWxlSW1hZ2VMaW5rXG4gICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9wbGF5Lmdvb2dsZS5jb20vc3RvcmUvYXBwcy9kZXRhaWxzP2lkPWNvbS5yeXphYy5jb2RlY2FkZW15Z29cIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2dvb2dsZV9wbGF5JyB9KX1cbiAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICByZWw9XCJub29wZW5lclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBhbHQ9XCJHZXQgaXQgb24gR29vZ2xlIFBsYXlcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCJjYWxjKDQwcHggKyAxcmVtKVwiXG4gICAgICAgICAgICAgIHNyYz17Z2V0SXRPbkdvb2dsZVBsYXl9XG4gICAgICAgICAgICAgIHdpZHRoPVwiY2FsYygxMzNweCArIDEuNXJlbSlcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L01vYmlsZUltYWdlTGluaz5cbiAgICAgICAgPC9Nb2JpbGVJbWFnZUl0ZW0+XG4gICAgICA8L0Zvb3RlckxpbmtJdGVtcz5cbiAgICA8L0JveD5cbiAgKTtcblxuICBjb25zdCByZXNvdXJjZXMgPSAoXG4gICAgPEJveD5cbiAgICAgIDxGb290ZXJIZWFkaW5nPlJlc291cmNlczwvRm9vdGVySGVhZGluZz5cbiAgICAgIDxGb290ZXJMaW5rSXRlbXM+XG4gICAgICAgIHtmb290ZXJSZXNvdXJjZXNMaXN0Lm1hcChcbiAgICAgICAgICAoeyBpZCwgdHJhY2tpbmdUYXJnZXQsIGhyZWYsIHRleHQsIG5ld1RhYiB9KSA9PiAoXG4gICAgICAgICAgICA8Rm9vdGVyTGlua0l0ZW1XaXRoQW5jaG9yXG4gICAgICAgICAgICAgIGtleT17aWR9XG4gICAgICAgICAgICAgIGZvb3Rlck9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgICAgICAgIHRyYWNraW5nVGFyZ2V0PXt0cmFja2luZ1RhcmdldH1cbiAgICAgICAgICAgICAgaHJlZj17aHJlZn1cbiAgICAgICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgICAgIHRhcmdldD17bmV3VGFiID8gJ19ibGFuaycgOiAnJ31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3RleHR9XG4gICAgICAgICAgICA8L0Zvb3RlckxpbmtJdGVtV2l0aEFuY2hvcj5cbiAgICAgICAgICApXG4gICAgICAgICl9XG4gICAgICA8L0Zvb3RlckxpbmtJdGVtcz5cbiAgICA8L0JveD5cbiAgKTtcblxuICBjb25zdCBzdXBwb3J0ID0gKGRpc3BsYXk6IEJveFByb3BzWydkaXNwbGF5J10pID0+IChcbiAgICA8Qm94IGRpc3BsYXk9e2Rpc3BsYXl9IG10PXt7IHNtOiAxNiB9fSBvcmRlcj17eyBzbTogMyB9fT5cbiAgICAgIDxGb290ZXJIZWFkaW5nPlN1cHBvcnQ8L0Zvb3RlckhlYWRpbmc+XG4gICAgICA8Rm9vdGVyTGlua0l0ZW1zPlxuICAgICAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vaGVscC5jb2RlY2FkZW15LmNvbVwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAnaGVscCcgfSl9XG4gICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgSGVscCBDZW50ZXJcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9Gb290ZXJMaW5rSXRlbT5cbiAgICAgIDwvRm9vdGVyTGlua0l0ZW1zPlxuICAgIDwvQm94PlxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPEdyaWRCb3hcbiAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM9e3tcbiAgICAgICAgXzogJ3JlcGVhdCgyLCBtaW5tYXgoMCwgMWZyKSknLFxuICAgICAgICBzbTogJ3JlcGVhdCgzLCBtaW5tYXgoMCwgMWZyKSknLFxuICAgICAgfX1cbiAgICAgIHJvd0dhcD17MTZ9XG4gICAgPlxuICAgICAge2NvbXBhbnl9XG4gICAgICB7cmVzb3VyY2VzfVxuICAgICAge3N1cHBvcnQoeyBfOiAndW5zZXQnLCBzbTogJ25vbmUnIH0pfVxuICAgICAge2NvbW11bml0eX1cbiAgICAgIHtoaWRlUHJpY2luZyA/IG51bGwgOiBpbmRpdmlkdWFsUGxhbnN9XG4gICAgICB7ZW50ZXJwcmlzZVBsYW5zfVxuICAgICAge21vYmlsZX1cbiAgICAgIHtzdXBwb3J0KHsgXzogJ25vbmUnLCBzbTogJ3Vuc2V0JyB9KX1cbiAgICA8L0dyaWRCb3g+XG4gICk7XG59O1xuIl19 */");

MobileImageLink.defaultProps = {
  display: 'inline-block',
  variant: 'interface'
};
export var CompanyLinks = function CompanyLinks(_ref) {
  var hidePricing = _ref.hidePricing,
      _onClick = _ref.onClick,
      userGeo = _ref.userGeo;
  var community = /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(FooterHeading, null, "Community"), /*#__PURE__*/React.createElement(FooterLinkItems, null, /*#__PURE__*/React.createElement(FooterLinkItem, null, /*#__PURE__*/React.createElement(Anchor, {
    href: "https://discuss.codecademy.com",
    onClick: function onClick(event) {
      return _onClick({
        event: event,
        target: 'forums'
      });
    },
    target: "_blank",
    variant: "interface"
  }, "Forums")), /*#__PURE__*/React.createElement(FooterLinkItem, null, /*#__PURE__*/React.createElement(Anchor, {
    href: "https://discord.com/invite/codecademy",
    onClick: function onClick(event) {
      return _onClick({
        event: event,
        target: 'discord'
      });
    },
    target: "_blank",
    variant: "interface"
  }, "Discord")), /*#__PURE__*/React.createElement(FooterLinkItem, null, /*#__PURE__*/React.createElement(Anchor, {
    href: "https://community.codecademy.com/chapters",
    onClick: function onClick(event) {
      return _onClick({
        event: event,
        target: 'chapters'
      });
    },
    target: "_blank",
    variant: "interface"
  }, "Chapters")), /*#__PURE__*/React.createElement(FooterLinkItem, null, /*#__PURE__*/React.createElement(Anchor, {
    href: "/events",
    onClick: function onClick(event) {
      return _onClick({
        event: event,
        target: 'events'
      });
    },
    variant: "interface"
  }, "Events")), /*#__PURE__*/React.createElement(FooterLinkItem, null, /*#__PURE__*/React.createElement(Anchor, {
    href: "/learner-stories",
    onClick: function onClick(event) {
      return _onClick({
        event: event,
        target: 'learner_stories_hub'
      });
    },
    variant: "interface"
  }, "Learner Stories")), /*#__PURE__*/React.createElement(FooterLinkItem, null, /*#__PURE__*/React.createElement("span", {
    id: "extole_zone_global_footer"
  }))));
  var company = /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(FooterHeading, null, /*#__PURE__*/React.createElement(LogoFromSkillsoft, {
    height: 40
  })), /*#__PURE__*/React.createElement(FooterLinkItems, null, /*#__PURE__*/React.createElement(FooterLinkItem, null, /*#__PURE__*/React.createElement(Anchor, {
    href: "/about",
    onClick: function onClick(event) {
      return _onClick({
        event: event,
        target: 'about'
      });
    },
    variant: "interface"
  }, "About")), /*#__PURE__*/React.createElement(FooterLinkItem, null, /*#__PURE__*/React.createElement(Anchor, {
    href: "/about/careers",
    onClick: function onClick(event) {
      return _onClick({
        event: event,
        target: 'jobs'
      });
    },
    variant: "interface"
  }, "Careers")), /*#__PURE__*/React.createElement(FooterLinkItem, null, /*#__PURE__*/React.createElement(Anchor, {
    href: "/pages/codecademy-affiliate-program",
    onClick: function onClick(event) {
      return _onClick({
        event: event,
        target: 'affiliate_program'
      });
    },
    variant: "interface"
  }, "Affiliates")), userGeo !== 'IN' && /*#__PURE__*/React.createElement(FooterLinkItem, null, /*#__PURE__*/React.createElement(Anchor, {
    href: "https://shop.codecademy.com",
    onClick: function onClick(event) {
      return _onClick({
        event: event,
        target: 'shop'
      });
    },
    target: "_blank",
    variant: "interface"
  }, "Shop")), /*#__PURE__*/React.createElement(FooterLinkItem, null, /*#__PURE__*/React.createElement(SocialMediaLinks, null))));
  var enterprisePlans = /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(FooterHeading, {
    mt: hidePricing ? {
      sm: 16
    } : {
      _: 24,
      sm: 0
    }
  }, "Enterprise Plans"), /*#__PURE__*/React.createElement(FooterLinkItems, null, /*#__PURE__*/React.createElement(FooterLinkItem, null, /*#__PURE__*/React.createElement(Anchor, {
    href: "/business",
    onClick: function onClick(event) {
      return _onClick({
        event: event,
        target: 'business_landing'
      });
    },
    variant: "interface"
  }, "Business Solutions"))));
  var individualPlans = /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(FooterHeading, null, "Individual Plans"), /*#__PURE__*/React.createElement(FooterLinkItems, null, /*#__PURE__*/React.createElement(FooterLinkItem, null, /*#__PURE__*/React.createElement(Anchor, {
    href: "/pages/pro",
    onClick: function onClick(event) {
      return _onClick({
        event: event,
        target: 'pro_membership'
      });
    },
    variant: "interface"
  }, "Pro Membership")), /*#__PURE__*/React.createElement(FooterLinkItem, null, /*#__PURE__*/React.createElement(Anchor, {
    href: "/student-center",
    onClick: function onClick(event) {
      return _onClick({
        event: event,
        target: 'students'
      });
    },
    variant: "interface"
  }, "For Students"))));
  var mobile = /*#__PURE__*/React.createElement(Box, {
    gridColumn: "1 / 3",
    gridColumnEnd: {
      sm: '1'
    },
    gridRow: {
      sm: '2 / 4'
    },
    pt: hidePricing ? {
      sm: 16
    } : {}
  }, /*#__PURE__*/React.createElement(FooterHeading, {
    mb: {
      _: 8,
      sm: 16,
      lg: 0
    }
  }, "Mobile"), /*#__PURE__*/React.createElement(FooterLinkItems, {
    display: {
      sm: 'flex'
    },
    flexDirection: {
      sm: 'column'
    }
  }, /*#__PURE__*/React.createElement(MobileImageItem, null, /*#__PURE__*/React.createElement(MobileImageLink, {
    href: "https://itunes.apple.com/us/app/codecademy-go/id1376029326",
    onClick: function onClick(event) {
      return _onClick({
        event: event,
        target: 'apple_store'
      });
    },
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement("img", {
    alt: "Download on the App Store",
    height: "calc(40px + 1rem)",
    src: downloadOnTheAppStore,
    width: "calc(120px + 1.5rem)"
  }))), /*#__PURE__*/React.createElement(MobileImageItem, null, /*#__PURE__*/React.createElement(MobileImageLink, {
    href: "https://play.google.com/store/apps/details?id=com.ryzac.codecademygo",
    onClick: function onClick(event) {
      return _onClick({
        event: event,
        target: 'google_play'
      });
    },
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement("img", {
    alt: "Get it on Google Play",
    height: "calc(40px + 1rem)",
    src: getItOnGooglePlay,
    width: "calc(133px + 1.5rem)"
  })))));
  var resources = /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(FooterHeading, null, "Resources"), /*#__PURE__*/React.createElement(FooterLinkItems, null, footerResourcesList.map(function (_ref2) {
    var id = _ref2.id,
        trackingTarget = _ref2.trackingTarget,
        href = _ref2.href,
        text = _ref2.text,
        newTab = _ref2.newTab;
    return /*#__PURE__*/React.createElement(FooterLinkItemWithAnchor, {
      key: id,
      footerOnClick: _onClick,
      trackingTarget: trackingTarget,
      href: href,
      variant: "interface",
      target: newTab ? '_blank' : ''
    }, text);
  })));

  var support = function support(display) {
    return /*#__PURE__*/React.createElement(Box, {
      display: display,
      mt: {
        sm: 16
      },
      order: {
        sm: 3
      }
    }, /*#__PURE__*/React.createElement(FooterHeading, null, "Support"), /*#__PURE__*/React.createElement(FooterLinkItems, null, /*#__PURE__*/React.createElement(FooterLinkItem, null, /*#__PURE__*/React.createElement(Anchor, {
      href: "https://help.codecademy.com",
      onClick: function onClick(event) {
        return _onClick({
          event: event,
          target: 'help'
        });
      },
      target: "_blank",
      variant: "interface"
    }, "Help Center"))));
  };

  return /*#__PURE__*/React.createElement(GridBox, {
    gridTemplateColumns: {
      _: 'repeat(2, minmax(0, 1fr))',
      sm: 'repeat(3, minmax(0, 1fr))'
    },
    rowGap: 16
  }, company, resources, support({
    _: 'unset',
    sm: 'none'
  }), community, hidePricing ? null : individualPlans, enterprisePlans, mobile, support({
    _: 'none',
    sm: 'unset'
  }));
};