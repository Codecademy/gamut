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
            alignment={alignment.includes('center') ? 'centered' : 'aligned'}
            color="currentColor"
            id={id}
          >
            {info}
          </TipBody>
        </InfoTipContainer>
      </TipWrapper>
    </>
  );
};
