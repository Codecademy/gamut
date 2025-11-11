import { addParentPath, TableOfContents } from '~styleguide/blocks';

import { parameters as accordionButtonDeprecatedParameters } from './AccordionButtonDeprecated/AccordionButtonDeprecated.mdx';
import { parameters as accordionDeprecatedParameters } from './AccordionDeprecated/AccordionDeprecated.mdx';
import { parameters as alertParameters } from './Alert/Alert.mdx';
import { parameters as breadcrumbsParameters } from './Breadcrumbs/Breadcrumbs.mdx';
import { parameters as coachmarkParameters } from './Coachmark/Coachmark.mdx';
import { parameters as disclosureParameters } from './Disclosure/Disclosure.mdx';
import { parameters as flyoutParameters } from './Flyout/Flyout.mdx';
import { parameters as menuParameters } from './Menu/Menu.mdx';
import { parameters as modalsParameters } from './Modals/About.mdx';
import { parameters as paginationParameters } from './Pagination/Pagination.mdx';
import { parameters as popoverParameters } from './Popover/Popover.mdx';
import { parameters as tabsParameters } from './Tabs/Tabs.mdx';
import { parameters as tipsParameters } from './Tips/About.mdx';
import { parameters as toastsParameters } from './Toasts/About.mdx';
import { parameters as videoParameters } from './Video/Video.mdx';

export const MoleculeAboutToC = () => (
  <TableOfContents
    links={addParentPath('Molecules', [
      accordionButtonDeprecatedParameters,
      accordionDeprecatedParameters,
      alertParameters,
      breadcrumbsParameters,
      coachmarkParameters,
      disclosureParameters,
      flyoutParameters,
      menuParameters,
      modalsParameters,
      paginationParameters,
      popoverParameters,
      tabsParameters,
      tipsParameters,
      toastsParameters,
      videoParameters,
    ])}
  />
);
