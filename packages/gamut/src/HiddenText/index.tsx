import styled from '@emotion/styled';

/**
 * @deprecated Use `<Text>` instead with `screenreader='true'`
 */
export const HiddenText = styled.span`
  display: inline-block;
  font-size: 0;
  height: 1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
`;
