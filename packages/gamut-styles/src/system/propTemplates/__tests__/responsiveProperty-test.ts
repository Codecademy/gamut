import { SerializedStyles } from '@emotion/core';
import { directionalProperty } from '../directionalProperty';
import { responsiveProperty } from '../responsiveProperty';
import { standardProperty } from '../standardProperty';
import { ResponiveProp } from '../../types';

describe(responsiveProperty, () => {
  const templateFns = {
    display: standardProperty('display', (val) => val as string),
    margin: directionalProperty('margin', (val) => val as string),
  };
  xit('creates a property function', () => {
    const propFunction = responsiveProperty<{
      margin?: string | ResponiveProp<string>;
      marginLeft?: string | ResponiveProp<string>;
      display?: string | ResponiveProp<string>;
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
