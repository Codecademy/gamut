import styled from '@emotion/styled';
import type { ComponentType } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

const StyledHiddenText = styled.span`
  display: inline-block;
  font-size: 0;
  height: 1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
`;

/** Props for HiddenText. Use when wrapping or composing HiddenText. */
export type HiddenTextProps = ComponentPropsWithoutRef<'span'>;

/**
 * @deprecated Use `<Text>` instead with `screenreader='true'`
 */
export const HiddenText =
  StyledHiddenText as unknown as ComponentType<HiddenTextProps>;
