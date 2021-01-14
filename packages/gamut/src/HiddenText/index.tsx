import styled from '@emotion/styled';

export const HiddenText = styled.span<{ htmlFor?: string }>`
  display: inline-block;
  font-size: 0;
  height: 1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
`;
