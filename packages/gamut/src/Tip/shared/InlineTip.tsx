import { InfoTipContainer } from '../InfoTip/styles';
import { InfoTipBody, TooltipWrapper } from './elements';
import { TipPlacementComponentProps } from './types';

export const InlineTip: React.FC<TipPlacementComponentProps> = ({
  alignment,
  children,
  escapeKeyPressHandler,
  id,
  info,
  isTipHidden,
  wrapperRef,
}) => {
  return (
    <>
      <TooltipWrapper
        ref={wrapperRef}
        onKeyDown={
          escapeKeyPressHandler ? (e) => escapeKeyPressHandler(e) : undefined
        }
      >
        {children}
        <InfoTipContainer hideTip={isTipHidden} alignment={alignment}>
          <InfoTipBody
            alignment="aligned"
            color="currentColor"
            id={id}
            minWidth="4rem"
          >
            {info}
          </InfoTipBody>
        </InfoTipContainer>
      </TooltipWrapper>
    </>
  );
};
