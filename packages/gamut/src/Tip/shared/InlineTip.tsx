import { InfoTipContainer } from '../InfoTip/styles';
import { ToolTipBody, TooltipWrapper } from './elements';
import { TipPlacementComponentProps, tooltipDefaultProps } from './types';

export const InlineTip: React.FC<TipPlacementComponentProps> = ({
  alignment = tooltipDefaultProps.alignment,
  children,
  escapeKeyPressHandler,
  info,
  isTipHidden,
  wrapperRef,
}) => {
  return (
    <>
      <TooltipWrapper
        ref={wrapperRef}
        onKeyDown={(e) => escapeKeyPressHandler(e)}
      >
        {children}
        <InfoTipContainer hideTip={isTipHidden} alignment={alignment}>
          <ToolTipBody alignment="aligned" color="currentColor" minWidth="4rem">
            {info}
          </ToolTipBody>
        </InfoTipContainer>
      </TooltipWrapper>
    </>
  );
};
