import { FillButton } from '@codecademy/gamut';
import { MiniArrowRightIcon } from '@codecademy/gamut-icons';

import { GamutCanvas } from './GamutCanvas';

export const FillButtonDefault = () => (
  <GamutCanvas>
    <FillButton icon={MiniArrowRightIcon} iconPosition="right">
      Continue
    </FillButton>
  </GamutCanvas>
);
