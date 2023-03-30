import { setupRtl } from '@codecademy/gamut-tests';

import { SkillPathCard } from '..';
import { mockSkillPathContent } from './__fixtures__';

const renderView = setupRtl(SkillPathCard);

describe('SkillPathCard', () => {
  it('renders skill in header', () => {
    const { view } = renderView(mockSkillPathContent);
    view.getByText('Skill path');
  });
});
