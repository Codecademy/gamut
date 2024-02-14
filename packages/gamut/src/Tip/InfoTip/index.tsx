import { ReactNode, useEffect, useRef, useState } from 'react';
import { on } from 'react-use/lib/util';

import { Text } from '../../Typography';
import { ToolTipBody, TooltipWrapper } from '../shared/elements';
import { ToolTipBaseAlignment, tooltipDefaultProps } from '../shared/types';
import { InfoTipButton } from './InfoTipButton';
import { InfoTipContainer } from './styles';

export interface InfoTipProps {
  alignment?: ToolTipBaseAlignment;
  emphasis?: 'low' | 'high';
  info: string | ReactNode;
  /**
   * Called when the info tip is clicked - intended to be used for programmatic focus in the case of links within the tip.
   */
  onClick?: (arg0: { isTipHidden: boolean }) => void;
}

export const InfoTip: React.FC<InfoTipProps> = ({
  alignment = tooltipDefaultProps.alignment,
  emphasis = 'low',
  info,
  onClick,
}) => {
  const [isTipHidden, setHideTip] = useState(true);
  const newRef = useRef<HTMLDivElement>(null);

  const escapeKeyPressHandler = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === 'Escape') {
      setHideTip(true);
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      newRef.current &&
      (e.target instanceof HTMLElement
        ? !newRef.current?.contains(e?.target)
        : true)
    ) {
      setHideTip(true);
    }
  };

  const clickHandler = () => {
    setHideTip(!isTipHidden);
    if (onClick) onClick({ isTipHidden });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  return (
    <>
      <Text hidden aria-live="polite" role="status" lineHeight={0}>
        {info}
      </Text>
      <TooltipWrapper ref={newRef} onKeyDown={(e) => escapeKeyPressHandler(e)}>
        <InfoTipButton
          active={!isTipHidden}
          emphasis={emphasis}
          onClick={() => clickHandler()}
        />
        <InfoTipContainer
          hideTip={isTipHidden}
          alignment={alignment}
          aria-live="polite"
        >
          <ToolTipBody alignment="aligned" color="currentColor" minWidth="4rem">
            {info}
          </ToolTipBody>
        </InfoTipContainer>
      </TooltipWrapper>
    </>
  );
};
