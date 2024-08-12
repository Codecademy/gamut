import { CheckerDense } from '@codecademy/gamut-patterns';

import { FlexBox } from '../../Box';
import { Text } from '../../Typography';
import { InfoTipContainer } from '../InfoTip/styles';
import { ToolTipContainer } from '../ToolTip/elements';
import {
  InfoTipWrapper,
  TargetContainer,
  TipBody,
  ToolTipWrapper,
} from './elements';
import { narrowWidth } from './styles';
import { TipPlacementComponentProps } from './types';

export const InlineTip: React.FC<TipPlacementComponentProps> = ({
  alignment,
  children,
  escapeKeyPressHandler,
  id,
  info,
  isTipHidden,
  type,
  narrow,
  wrapperRef,
  zIndex,
}) => {
  const isToolType = type === 'tool';

  const InlineTipWrapper = isToolType ? ToolTipWrapper : InfoTipWrapper;
  const InlineTipBodyWrapper = isToolType ? ToolTipContainer : InfoTipContainer;
  const InlineWrapperProps = isToolType ? {} : { hideTip: isTipHidden };

  const target = (
    <TargetContainer
      ref={wrapperRef}
      onKeyDown={
        escapeKeyPressHandler ? (e) => escapeKeyPressHandler(e) : undefined
      }
    >
      {children}
    </TargetContainer>
  );

  const tipBody = (
    <InlineTipBodyWrapper
      alignment={alignment}
      zIndex={zIndex ?? 1}
      {...InlineWrapperProps}
    >
      <TipBody
        alignment={alignment.includes('center') ? 'centered' : 'aligned'}
        color="currentColor"
        id={id}
        width={narrow ? narrowWidth : undefined}
        zIndex="auto"
        aria-hidden={isToolType}
        position="relative"
      >
        <FlexBox column maxWidth={384} aria-label="Tooltip:">
          <Text textColor="text-secondary" fontFamily="accent" fontSize={14}>
            Docs
          </Text>
          <Text as="p" fontSize={16} truncate="ellipsis" truncateLines={4}>
            ayoooooooooooooooooo
          </Text>
        </FlexBox>
      </TipBody>
      <CheckerDense
        dimensions={1}
        position="absolute"
        top="-8px"
        left="-8px"
        zIndex={zIndex ? zIndex - 1 : -1}
        // right={shadow === 'bottomRight' ? '-0.5rem' : undefined}
      />
    </InlineTipBodyWrapper>
  );

  return (
    <InlineTipWrapper>
      {alignment.includes('top') ? (
        <>
          {tipBody}
          {target}
        </>
      ) : (
        <>
          {target}
          {tipBody}
        </>
      )}
    </InlineTipWrapper>
  );
};
