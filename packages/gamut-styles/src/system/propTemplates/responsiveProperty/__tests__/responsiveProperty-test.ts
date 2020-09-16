import { SerializedStyles } from '@emotion/core';
import { directionalProperty } from '../../directionalProperty';
import { responsiveProperty } from '..';
import { standardProperty } from '../../standardProperty';
import { ResponsiveProp } from '../../../types';

describe(responsiveProperty, () => {
  const templateFns = {
    display: standardProperty('display', (val) => val as string),
    margin: directionalProperty('margin', (val) => val as string),
  };
  xit('creates a property function', () => {
    const propFunction = responsiveProperty<{
      margin?: string | ResponsiveProp<string>;
      marginLeft?: string | ResponsiveProp<string>;
      display?: string | ResponsiveProp<string>;
      theme?: any;
    }>({
      propNames: ['display', 'margin', 'marginLeft'],
      templateFns,
    });

    const outputStyles = propFunction({
      margin: '10px',
      marginLeft: [, '5px'],
      display: 'block',
    }) as SerializedStyles;

    expect(outputStyles).toEqual('');
  });
});
