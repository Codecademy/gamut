import { InfoTipContainer } from '../InfoTip/styles';
import { InfoTipBody, TooltipWrapper } from './elements';
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
          <InfoTipBody alignment="aligned" color="currentColor" minWidth="4rem">
            {info}
          </InfoTipBody>
        </InfoTipContainer>
      </TooltipWrapper>
    </>
  );
};
