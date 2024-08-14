import { InfoTipContainer } from '../InfoTip/styles';
import { PreviewTipContents, PreviewTipShadow } from '../PreviewTip/elements';
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
        alignment="previewAligned"
        color="currentColor"
        id={id}
        width={narrow ? narrowWidth : undefined}
        zIndex="auto"
        aria-hidden={isToolType}
      >
        <PreviewTipContents info={info} overline="o" title="lets go" />
      </TipBody>
      <PreviewTipShadow alignment={alignment} zIndex={zIndex} />
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
