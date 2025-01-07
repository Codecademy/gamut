import { ArrowLeftIcon } from '@codecademy/gamut-icons';
import { theme } from '@codecademy/gamut-styles';
import { isTrackCaptionKind, SeekButton, useMediaRemote, useMediaState } from '@vidstack/react';
import { DefaultVideoLayoutProps, DefaultVideoLayoutSlots } from '@vidstack/react/types/vidstack-react';

import { Toggle } from '../../Toggle';

const CaptionToggle = () => { 
  const playerRemote = useMediaRemote()
  const $track = useMediaState('textTrack');
  const isOn = $track && isTrackCaptionKind($track);
 
  return (
    <Toggle
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'var(--item-padding)',
        color: theme.colors.text,
      }}
      label="Captions"
      labelSide="left"
      size='small'
      checked={isOn || false}
      onChange={() => {
        playerRemote.toggleCaptions()
      }} 
    />
  )
}

export const customLayoutSlots: DefaultVideoLayoutSlots | DefaultVideoLayoutProps = {
  smallLayout: {
    beforeCaptionButton: (
      <SeekButton className="vds-button" seconds={-10}>
      <ArrowLeftIcon className="vds-icon" />
      </SeekButton>
    )
  },
  largeLayout: {
    afterPlayButton: (
      <SeekButton className="vds-button" seconds={-10}>
      <ArrowLeftIcon className="vds-icon" />
      </SeekButton>
    ),
  },
  googleCastButton: null,
  beforeSettingsMenuStartItems: (
    <CaptionToggle />
  )
}