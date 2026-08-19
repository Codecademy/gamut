import { FillButton } from '@codecademy/gamut';
import { MiniArrowRightIcon } from '@codecademy/gamut-icons';

import { GamutCanvas } from './GamutCanvas';

export const FillButtonVariants = () => (
  <GamutCanvas>
    <FillButton>Primary</FillButton>
    <FillButton variant="secondary">Secondary</FillButton>
    <FillButton variant="danger">Danger</FillButton>
    <FillButton variant="interface">Interface</FillButton>
  </GamutCanvas>
);

export const FillButtonSizes = () => (
  <GamutCanvas>
    <FillButton size="small">Small</FillButton>
    <FillButton size="normal">Normal</FillButton>
    <FillButton size="large">Large</FillButton>
  </GamutCanvas>
);

export const FillButtonModes = () => (
  <GamutCanvas>
    <FillButton mode="light">Light</FillButton>
    <FillButton mode="dark">Dark</FillButton>
  </GamutCanvas>
);

export const FillButtonDefault = () => (
  <GamutCanvas>
    <FillButton icon={MiniArrowRightIcon} iconPosition="right">
      Continue
    </FillButton>
  </GamutCanvas>
);
