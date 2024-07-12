import { InfoTipContainer } from '../InfoTip/styles';
import { ToolTipContainer } from '../ToolTip/elements';
import {
  InfoTipWrapper,
  TargetContainer,
  TipBody,
  TipWrapper,
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
      >
        {info}
      </TipBody>
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
