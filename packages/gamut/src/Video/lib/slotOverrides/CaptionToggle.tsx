import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { isTrackCaptionKind, useMediaRemote, useMediaState } from '@vidstack/react';
import { useDefaultLayoutWord } from '@vidstack/react/player/layouts/default';

import { Toggle } from '../../../Toggle';

const StyledToggle = styled(Toggle)`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    alignItems: center;
    padding: var(--item-padding);
    color: ${theme.colors.text};
`;

export const CaptionToggle = () => { 
  const playerRemote = useMediaRemote();
  const captionsText = useDefaultLayoutWord('Captions');
  const $hasCaptions = useMediaState('hasCaptions');
  const $track = useMediaState('textTrack');
  const isOn = $track && isTrackCaptionKind($track);
 
  if (!$hasCaptions) return null;
  return (
    <StyledToggle
      label={captionsText}
      labelSide="left"
      size='small'
      checked={isOn || false}
      onChange={() => {
        playerRemote.toggleCaptions()
      }} 
    />
  )
}