import { directionalProperty } from '../../directionalProperty';
import { DEFAULT_MEDIA_QUERIES, responsiveProperty } from '..';
import { standardProperty } from '../../standardProperty';
import { ResponsiveProp } from '../../../types/system';

describe(responsiveProperty, () => {
  const templateFns = {
    display: standardProperty({
      propName: 'display',
      computeValue: (val) => val,
    }),
    margin: directionalProperty({
      propName: 'margin',
      computeValue: (val) => val,
    }),
  };

  type Theme = {};
  type PropShape = {
    margin?: string | ResponsiveProp<string>;
    marginLeft?: string | ResponsiveProp<string>;
    display?: string | ResponsiveProp<string>;
    theme?: any;
  };

  it('creates a property function', () => {
    const propFunction = responsiveProperty<Theme, PropShape>({
      propNames: ['display', 'margin', 'marginLeft'],
      templateFns,
    });

    const outputStyles = propFunction({
      margin: '10px',
      marginLeft: [, '5px'],
      display: 'block',
    });

    expect(outputStyles).toEqual({
      marginLeft: '10px',
      marginRight: '10px',
      marginBottom: '10px',
      marginTop: '10px',
      display: 'block',
      [DEFAULT_MEDIA_QUERIES['sm']]: {
        marginLeft: '5px',
      },
    });
  });
});
