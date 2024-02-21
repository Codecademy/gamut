import { InfoTipContainer } from '../InfoTip/styles';
import { TipBody, TipWrapper } from './elements';
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
      <TipWrapper
        ref={wrapperRef}
        onKeyDown={
          escapeKeyPressHandler ? (e) => escapeKeyPressHandler(e) : undefined
        }
      >
        {children}
        <InfoTipContainer hideTip={isTipHidden} alignment={alignment}>
          <TipBody
            alignment="aligned"
            color="currentColor"
            id={id}
            minWidth="4rem"
          >
            {info}
          </TipBody>
        </InfoTipContainer>
      </TipWrapper>
    </>
  );
};
