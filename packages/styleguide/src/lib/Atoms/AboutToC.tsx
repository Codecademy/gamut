import { addParentPath, TableOfContents } from '~styleguide/blocks';

import { parameters as animationsParameters } from './Animations/About.mdx';
import { parameters as badgeParameters } from './Badge/Badge.mdx';
import { parameters as buttonsParameters } from './Buttons/About.mdx';
import { parameters as cardParameters } from './Card/Card.mdx';
import { parameters as drawerParameters } from './Drawer/Drawer.mdx';
import { parameters as formElementsParameters } from './FormElements/About.mdx';
import { parameters as formInputsParameters } from './FormInputs/About.mdx';
import { parameters as iconsParameters } from './Icons/About.mdx';
import { parameters as illustrationsParameters } from './Illustrations/Illustrations.mdx';
import { parameters as internalFloatingCardParameters } from './InternalFloatingCard/InternalFloatingCard.mdx';
import { parameters as loadersParameters } from './Loaders/About.mdx';
import { parameters as patternsParameters } from './Patterns/Patterns.mdx';
import { parameters as popoverContainerParameters } from './PopoverContainer/PopoverContainer.mdx';
import { parameters as progressBarParameters } from './ProgressBar/ProgressBar.mdx';
import { parameters as radialProgressParameters } from './RadialProgress/RadialProgress.mdx';
import { parameters as skipToContentParameters } from './SkipToContent/SkipToContent.mdx';
import { parameters as tagParameters } from './Tag/Tag.mdx';
import { parameters as toggleParameters } from './Toggle/Toggle.mdx';
import { parameters as utilityComponentsParameters } from './UtilityComponents/About.mdx';

export const AtomAboutToC = () => (
  <TableOfContents
    links={addParentPath('Atoms', [
      animationsParameters,
      badgeParameters,
      buttonsParameters,
      cardParameters,
      drawerParameters,
      formElementsParameters,
      formInputsParameters,
      iconsParameters,
      illustrationsParameters,
      internalFloatingCardParameters,
      loadersParameters,
      patternsParameters,
      popoverContainerParameters,
      progressBarParameters,
      radialProgressParameters,
      skipToContentParameters,
      tagParameters,
      toggleParameters,
      utilityComponentsParameters,
    ])}
  />
);
