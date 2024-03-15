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
        // The InfoTip + ToolTip have their own accessibility logic, so we don't want this to be announced twice
        aria-hidden
        zIndex={zIndex ?? 1}
        {...InlineWrapperProps}
      >
        <TipBody
          alignment={alignment.includes('center') ? 'centered' : 'aligned'}
          color="currentColor"
          id={id}
          zIndex="auto"
        >
          {info}
        </TipBody>
      </InlineTipWrapper>
    </TipWrapper>
  );
};
