import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select, number } from '@storybook/addon-knobs';
import Icon, { iconMap } from '@codecademy/gamut/Icon';
import { gamutColors } from '@codecademy/gamut-styles/variables';
import { addonInfoOptions as options } from './options';

function convertCamelToSpinel(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// remapping of gamut base colors that can be placed directly into the `select` knob function
const selectableGamutColors = Object.entries(gamutColors.base).reduce(
  (acc, [colorName, colorHex]) => {
    acc[colorHex] = `gamut-${convertCamelToSpinel(colorName)}`;
    return acc;
  },
  {}
);

const iconNames = Object.keys(iconMap);

storiesOf('Component/Icon', module)
  .add(
    'All Icons',
    withInfo({
      ...options,
    })(() => (
      <div>
        {iconNames.map(iconName => (
          <Icon key={iconName} name={iconName} width={64} height={64} />
        ))}
      </div>
    ))
  )
  .add(
    'Editable',
    withInfo({
      ...options,
    })(
      () => (
        <div>
          <Icon
            name={select('name', iconNames, iconNames[0])}
            width={number('width', 128)}
            height={number('height', 128)}
            style={{
              color: select('color', selectableGamutColors, '#000'),
              backgroundColor: select(
                'backgroundColor',
                selectableGamutColors,
                '#fff'
              ),
            }}
          />
          <p>
            <em>
              Note: Both color and backgroundColor should be adjusted with CSS
              classes rather than inline styles.
            </em>
          </p>
        </div>
      ),
      {
        inline: true,
        propTables: false,
      }
    )
  );
