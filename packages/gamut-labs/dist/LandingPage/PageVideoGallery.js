import _styled from "@emotion/styled/base";
import { Box, Video } from '@codecademy/gamut';
import { mediaQueries } from '@codecademy/gamut-styles';
import * as React from 'react';
import { CTA } from './CTA';
import { Description } from './Description';
import { Title } from './Title';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Grid = /*#__PURE__*/_styled("div", {
  target: "e1fpfjau1",
  label: "Grid"
})("display:grid;grid-template:1fr/1fr;gap:8px;", mediaQueries.sm, "{grid-template:1fr 1fr/12fr 5fr;gap:16px;}", mediaQueries.md, "{gap:24px;}", mediaQueries.lg, "{gap:32px;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MYW5kaW5nUGFnZS9QYWdlVmlkZW9HYWxsZXJ5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVdUIiLCJmaWxlIjoiLi4vLi4vc3JjL0xhbmRpbmdQYWdlL1BhZ2VWaWRlb0dhbGxlcnkudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm94LCBWaWRlbyB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCB7IG1lZGlhUXVlcmllcyB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IENUQSB9IGZyb20gJy4vQ1RBJztcbmltcG9ydCB7IERlc2NyaXB0aW9uIH0gZnJvbSAnLi9EZXNjcmlwdGlvbic7XG5pbXBvcnQgeyBUaXRsZSB9IGZyb20gJy4vVGl0bGUnO1xuaW1wb3J0IHsgQmFzZVByb3BzIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IEdyaWQgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlOiAxZnIgLyAxZnI7XG4gIGdhcDogOHB4O1xuXG4gICR7bWVkaWFRdWVyaWVzLnNtfSB7XG4gICAgLy8gdGhlcmUgbXVzdCBiZSBhIG1hdGhlbWF0aWNhbCBleHBsYW5hdGlvbiBmb3Igd2h5IH4xMjo1IGlzIHRoZSBjb3JyZWN0IHJhdGlvIGZvclxuICAgIC8vIHRoZSBjb2x1bW4gd2lkdGhzIGJ1dCBJIGRvIG5vdCBrbm93IHdoYXQgaXQgaXMuIFJlZ2FyZGxlc3MsIHRoZSBlZmZlY3QgaXMgdGhhdFxuICAgIC8vIGFsbCB0aHJlZSB2aWRlb3Mgd2lsbCBtYWludGFpbiBhIDE2OjkgYXNwZWN0IHJhdGlvIHdpdGggYW4gZXZlbiBnYXAgYmV0d2VlbiB0aGVtLlxuXG4gICAgZ3JpZC10ZW1wbGF0ZTogMWZyIDFmciAvIDEyZnIgNWZyO1xuXG4gICAgZ2FwOiAxNnB4O1xuICB9XG4gICR7bWVkaWFRdWVyaWVzLm1kfSB7XG4gICAgZ2FwOiAyNHB4O1xuICB9XG4gICR7bWVkaWFRdWVyaWVzLmxnfSB7XG4gICAgZ2FwOiAzMnB4O1xuICB9XG5gO1xuXG5jb25zdCBHcmlkVmlkZW8gPSBzdHlsZWQoVmlkZW8pYFxuICAke21lZGlhUXVlcmllcy5zbX0ge1xuICAgICY6Zmlyc3Qtb2YtdHlwZSB7XG4gICAgICBncmlkLXJvdzogMSAvIHNwYW4gMjtcbiAgICB9XG4gIH1cbmA7XG5cbmV4cG9ydCB0eXBlIFBhZ2VWaWRlbyA9IHtcbiAgdXJsOiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVySW1hZ2U/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBQYWdlVmlkZW9HYWxsZXJ5UHJvcHMgPSBCYXNlUHJvcHMgJiB7XG4gIHZpZGVvczogUGFnZVZpZGVvW107XG59O1xuXG5leHBvcnQgY29uc3QgUGFnZVZpZGVvR2FsbGVyeTogUmVhY3QuRkM8UGFnZVZpZGVvR2FsbGVyeVByb3BzPiA9ICh7XG4gIHZpZGVvcyxcbiAgdGl0bGUsXG4gIGRlc2MsXG4gIG9uQW5jaG9yQ2xpY2ssXG4gIGN0YSxcbiAgdGVzdElkLFxufSkgPT4gKFxuICA8ZGl2PlxuICAgIHsodGl0bGUgfHwgZGVzYykgJiYgKFxuICAgICAgPEJveCBtYj17MzJ9PlxuICAgICAgICB7dGl0bGUgJiYgPFRpdGxlPnt0aXRsZX08L1RpdGxlPn1cbiAgICAgICAge2Rlc2MgJiYgPERlc2NyaXB0aW9uIHRleHQ9e2Rlc2N9IG9uQW5jaG9yQ2xpY2s9e29uQW5jaG9yQ2xpY2t9IC8+fVxuICAgICAgPC9Cb3g+XG4gICAgKX1cbiAgICA8R3JpZCBkYXRhLXRlc3RpZD17dGVzdElkfT5cbiAgICAgIHt2aWRlb3MubWFwKCh2aWRlbykgPT4gKFxuICAgICAgICA8R3JpZFZpZGVvXG4gICAgICAgICAga2V5PXt2aWRlby51cmx9XG4gICAgICAgICAgdmlkZW9Vcmw9e3ZpZGVvLnVybH1cbiAgICAgICAgICB2aWRlb1RpdGxlPXt2aWRlby50aXRsZX1cbiAgICAgICAgICBwbGFjZWhvbGRlckltYWdlPXt2aWRlby5wbGFjZWhvbGRlckltYWdlIHx8IHRydWV9XG4gICAgICAgIC8+XG4gICAgICApKX1cbiAgICA8L0dyaWQ+XG4gICAge2N0YSAmJiAoXG4gICAgICA8Qm94IG10PXszMn0+XG4gICAgICAgIDxDVEEgaHJlZj17Y3RhLmhyZWZ9IG9uQ2xpY2s9e2N0YS5vbkNsaWNrfSBidXR0b25UeXBlPXtjdGEuYnV0dG9uVHlwZX0+XG4gICAgICAgICAge2N0YS50ZXh0fVxuICAgICAgICA8L0NUQT5cbiAgICAgIDwvQm94PlxuICAgICl9XG4gIDwvZGl2PlxuKTtcbiJdfQ== */"));
var GridVideo = /*#__PURE__*/_styled(Video, {
  target: "e1fpfjau0",
  label: "GridVideo"
})(mediaQueries.sm, "{&:first-of-type{grid-row:1/span 2;}}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MYW5kaW5nUGFnZS9QYWdlVmlkZW9HYWxsZXJ5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQytCIiwiZmlsZSI6Ii4uLy4uL3NyYy9MYW5kaW5nUGFnZS9QYWdlVmlkZW9HYWxsZXJ5LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJveCwgVmlkZW8gfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBtZWRpYVF1ZXJpZXMgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBDVEEgfSBmcm9tICcuL0NUQSc7XG5pbXBvcnQgeyBEZXNjcmlwdGlvbiB9IGZyb20gJy4vRGVzY3JpcHRpb24nO1xuaW1wb3J0IHsgVGl0bGUgfSBmcm9tICcuL1RpdGxlJztcbmltcG9ydCB7IEJhc2VQcm9wcyB9IGZyb20gJy4vdHlwZXMnO1xuXG5jb25zdCBHcmlkID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZTogMWZyIC8gMWZyO1xuICBnYXA6IDhweDtcblxuICAke21lZGlhUXVlcmllcy5zbX0ge1xuICAgIC8vIHRoZXJlIG11c3QgYmUgYSBtYXRoZW1hdGljYWwgZXhwbGFuYXRpb24gZm9yIHdoeSB+MTI6NSBpcyB0aGUgY29ycmVjdCByYXRpbyBmb3JcbiAgICAvLyB0aGUgY29sdW1uIHdpZHRocyBidXQgSSBkbyBub3Qga25vdyB3aGF0IGl0IGlzLiBSZWdhcmRsZXNzLCB0aGUgZWZmZWN0IGlzIHRoYXRcbiAgICAvLyBhbGwgdGhyZWUgdmlkZW9zIHdpbGwgbWFpbnRhaW4gYSAxNjo5IGFzcGVjdCByYXRpbyB3aXRoIGFuIGV2ZW4gZ2FwIGJldHdlZW4gdGhlbS5cblxuICAgIGdyaWQtdGVtcGxhdGU6IDFmciAxZnIgLyAxMmZyIDVmcjtcblxuICAgIGdhcDogMTZweDtcbiAgfVxuICAke21lZGlhUXVlcmllcy5tZH0ge1xuICAgIGdhcDogMjRweDtcbiAgfVxuICAke21lZGlhUXVlcmllcy5sZ30ge1xuICAgIGdhcDogMzJweDtcbiAgfVxuYDtcblxuY29uc3QgR3JpZFZpZGVvID0gc3R5bGVkKFZpZGVvKWBcbiAgJHttZWRpYVF1ZXJpZXMuc219IHtcbiAgICAmOmZpcnN0LW9mLXR5cGUge1xuICAgICAgZ3JpZC1yb3c6IDEgLyBzcGFuIDI7XG4gICAgfVxuICB9XG5gO1xuXG5leHBvcnQgdHlwZSBQYWdlVmlkZW8gPSB7XG4gIHVybDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwbGFjZWhvbGRlckltYWdlPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgUGFnZVZpZGVvR2FsbGVyeVByb3BzID0gQmFzZVByb3BzICYge1xuICB2aWRlb3M6IFBhZ2VWaWRlb1tdO1xufTtcblxuZXhwb3J0IGNvbnN0IFBhZ2VWaWRlb0dhbGxlcnk6IFJlYWN0LkZDPFBhZ2VWaWRlb0dhbGxlcnlQcm9wcz4gPSAoe1xuICB2aWRlb3MsXG4gIHRpdGxlLFxuICBkZXNjLFxuICBvbkFuY2hvckNsaWNrLFxuICBjdGEsXG4gIHRlc3RJZCxcbn0pID0+IChcbiAgPGRpdj5cbiAgICB7KHRpdGxlIHx8IGRlc2MpICYmIChcbiAgICAgIDxCb3ggbWI9ezMyfT5cbiAgICAgICAge3RpdGxlICYmIDxUaXRsZT57dGl0bGV9PC9UaXRsZT59XG4gICAgICAgIHtkZXNjICYmIDxEZXNjcmlwdGlvbiB0ZXh0PXtkZXNjfSBvbkFuY2hvckNsaWNrPXtvbkFuY2hvckNsaWNrfSAvPn1cbiAgICAgIDwvQm94PlxuICAgICl9XG4gICAgPEdyaWQgZGF0YS10ZXN0aWQ9e3Rlc3RJZH0+XG4gICAgICB7dmlkZW9zLm1hcCgodmlkZW8pID0+IChcbiAgICAgICAgPEdyaWRWaWRlb1xuICAgICAgICAgIGtleT17dmlkZW8udXJsfVxuICAgICAgICAgIHZpZGVvVXJsPXt2aWRlby51cmx9XG4gICAgICAgICAgdmlkZW9UaXRsZT17dmlkZW8udGl0bGV9XG4gICAgICAgICAgcGxhY2Vob2xkZXJJbWFnZT17dmlkZW8ucGxhY2Vob2xkZXJJbWFnZSB8fCB0cnVlfVxuICAgICAgICAvPlxuICAgICAgKSl9XG4gICAgPC9HcmlkPlxuICAgIHtjdGEgJiYgKFxuICAgICAgPEJveCBtdD17MzJ9PlxuICAgICAgICA8Q1RBIGhyZWY9e2N0YS5ocmVmfSBvbkNsaWNrPXtjdGEub25DbGlja30gYnV0dG9uVHlwZT17Y3RhLmJ1dHRvblR5cGV9PlxuICAgICAgICAgIHtjdGEudGV4dH1cbiAgICAgICAgPC9DVEE+XG4gICAgICA8L0JveD5cbiAgICApfVxuICA8L2Rpdj5cbik7XG4iXX0= */"));
export var PageVideoGallery = function PageVideoGallery(_ref) {
  var videos = _ref.videos,
    title = _ref.title,
    desc = _ref.desc,
    onAnchorClick = _ref.onAnchorClick,
    cta = _ref.cta,
    testId = _ref.testId;
  return /*#__PURE__*/_jsxs("div", {
    children: [(title || desc) && /*#__PURE__*/_jsxs(Box, {
      mb: 32,
      children: [title && /*#__PURE__*/_jsx(Title, {
        children: title
      }), desc && /*#__PURE__*/_jsx(Description, {
        text: desc,
        onAnchorClick: onAnchorClick
      })]
    }), /*#__PURE__*/_jsx(Grid, {
      "data-testid": testId,
      children: videos.map(function (video) {
        return /*#__PURE__*/_jsx(GridVideo, {
          videoUrl: video.url,
          videoTitle: video.title,
          placeholderImage: video.placeholderImage || true
        }, video.url);
      })
    }), cta && /*#__PURE__*/_jsx(Box, {
      mt: 32,
      children: /*#__PURE__*/_jsx(CTA, {
        href: cta.href,
        onClick: cta.onClick,
        buttonType: cta.buttonType,
        children: cta.text
      })
    })]
  });
};