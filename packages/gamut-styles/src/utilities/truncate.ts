import { css } from '@emotion/react';

export interface FadeTruncateProps {
  lineHeight: string | number;
  lines: number;
  backgroundColor?: string;
}

export const fadeTruncate = ({
  backgroundColor,
  lineHeight,
  lines,
}: FadeTruncateProps) => css`
  position: relative;
  width: 100%;
  max-height: ${lines * parseInt(`${lineHeight}`, 10) * 16}rem;
  display: inline-block;
  overflow: hidden;

  &:after {
    content: '';
    text-align: right;
    position: absolute;
    top: ${lines * (parseInt(`${lineHeight}`, 10) - 1) * 16}rem;
    right: 0;
    width: 35%;
    height: ${lineHeight}rem;
    background: linear-gradient(
      to right,
      rgba(${backgroundColor}, 0),
      rgba(${backgroundColor}, 1) 75%
    );
  }
`;

export const truncate = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
