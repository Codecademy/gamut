import { ArrowChevronLeftIcon } from '@codecademy/gamut-icons';
import { setupEnzyme } from '@codecademy/gamut-tests';
import React from 'react';

import { Rotation } from '../Rotation';

const renderWrapper = setupEnzyme(Rotation, {});

describe('Rotation', () => {
  it('renders its contents as rotated to the correct degree when rotated is true', () => {
    const { wrapper } = renderWrapper({
      rotated: true,
      children: <ArrowChevronLeftIcon />,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('does not rotate its contents when rotate is false', () => {
    const { wrapper } = renderWrapper({
      rotated: false,
      children: <ArrowChevronLeftIcon />,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
