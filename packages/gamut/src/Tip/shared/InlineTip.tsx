import { InfoTipContainer } from '../InfoTip/styles';
import { ToolTipContainer } from '../ToolTip/elements';
import { TargetContainer, TipBody, TipWrapper } from './elements';
import { TipPlacementComponentProps } from './types';

export const InlineTip: React.FC<TipPlacementComponentProps> = ({
  alignment,
  children,
  escapeKeyPressHandler,
  id,
  info,
  isTipHidden,
  type,
  wrapperRef,
  zIndex,
}) => {
  const isToolType = type === 'tool';

  const InlineTipWrapper = isToolType ? ToolTipContainer : InfoTipContainer;
  const InlineWrapperProps = isToolType ? {} : { hideTip: isTipHidden };

  return (
    <TipWrapper>
      <TargetContainer
        ref={wrapperRef}
        onKeyDown={
          escapeKeyPressHandler ? (e) => escapeKeyPressHandler(e) : undefined
        }
      >
        {children}
      </TargetContainer>
      <InlineTipWrapper
        alignment={alignment}
        // The InfoTip has an aria-live region that is updated when the tip is shown or hidden, so we don't want this to be announced twice
        aria-hidden={!isToolType}
        zIndex={zIndex ?? 1}
        {...InlineWrapperProps}
      >
        <TipBody
          alignment={alignment.includes('center') ? 'centered' : 'aligned'}
          color="currentColor"
          id={id}
          role={isToolType ? 'tooltip' : undefined}
        >
          {info}
        </TipBody>
      </InlineTipWrapper>
    </TipWrapper>
  );
};
