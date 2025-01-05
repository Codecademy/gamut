import { ArrowLeftIcon } from '@codecademy/gamut-icons';
import { SeekButton } from '@vidstack/react';


export const customLayoutSlots = {
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
}