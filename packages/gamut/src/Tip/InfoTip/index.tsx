import { useEffect, useRef, useState } from 'react';

import { Text } from '../../Typography';
import { ToolTipBody, TooltipWrapper } from '../shared/elements';
import { tooltipDefaultProps, ToolTipStaticAlignment } from '../shared/types';
import { InfoTipButton } from './InfoTipButton';
import { InfoTipContainer } from './styles';

export interface InfoTipProps {
  // TO-DO: REMOVE CENTER ALIGNMENTS
  alignment?: ToolTipStaticAlignment;
  emphasis?: 'low' | 'high';
  info: string;
}

export const InfoTip: React.FC<InfoTipProps> = ({
  alignment = tooltipDefaultProps.alignment,
  emphasis = 'low',
  info,
}) => {
  const [hideTip, setHideTip] = useState(true);
  const newRef = useRef<HTMLDivElement>(null);

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

  const escapeKeyPressHandler = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === 'Escape') {
      setHideTip(true);
    }
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
          active={!hideTip}
          emphasis={emphasis}
          onClick={() => setHideTip(!hideTip)}
        />
        <InfoTipContainer
          hideTip={hideTip}
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
