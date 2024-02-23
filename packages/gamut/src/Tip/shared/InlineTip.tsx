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
}) => {
  const isToolTip = type === 'tool';

  const InlineTipWrapper = isToolTip ? ToolTipContainer : InfoTipContainer;
  const InlineWrapperProps = isToolTip ? {} : { hideTip: isTipHidden };

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
      <InlineTipWrapper alignment={alignment} {...InlineWrapperProps}>
        <TipBody
          alignment={alignment.includes('center') ? 'centered' : 'aligned'}
          color="currentColor"
          id={id}
          role={isToolTip ? 'tooltip' : undefined}
        >
          {info}
        </TipBody>
      </InlineTipWrapper>
    </TipWrapper>
  );
};
