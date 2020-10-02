import { uniq } from 'lodash';
import { system } from '..';
import * as BaseProps from '../../../props';

const allPossibilities = Object.entries(BaseProps).reduce(
  (carry, [groupKey, props]) => ({
    propGroups: carry.propGroups.concat(groupKey),
    props: carry.props.concat(Object.keys(props)),
  }),
  {
    props: [],
    propGroups: [],
  } as { props: string[]; propGroups: string[] }
);

describe(system, () => {
  describe('initializing system', () => {
    it('initializes a system with no arguments by default', () => {
      const { properties, propertyGroups, variant } = system();

      expect(properties).toBeDefined();
      expect(propertyGroups).toBeDefined();
      expect(variant).toBeDefined();
    });

    it('initializes a system with default properties', () => {
      const { properties } = system();

      expect(Object.keys(properties)).toEqual(uniq(allPossibilities.props));
    });

    it('initializes a system with default propGroups', () => {
      const { propertyGroups } = system();

      expect(Object.keys(propertyGroups)).toEqual(
        uniq(allPossibilities.propGroups)
      );
    });

    it('initializes a system with default propGroups', () => {
      const { propertyGroups } = system();

      expect(Object.keys(propertyGroups)).toEqual(
        uniq(allPossibilities.propGroups)
      );
    });
  });

  describe('variant', () => {
    const { variant } = system();

    it('returns a style function with a propKey of variant by default', () => {
      const myVariant = variant({
        variants: { primary: { color: 'blue' }, secondary: { color: 'green' } },
      });

      expect(myVariant({ variant: 'primary' })).toEqual({ color: 'blue' });
    });

    it('can configure a different propKey', () => {
      const myVariant = variant({
        key: 'colorVariant',
        variants: { primary: { color: 'blue' }, secondary: { color: 'green' } },
      });

      expect(myVariant({ colorVariant: 'secondary' })).toEqual({
        color: 'green',
      });
    });
  });

  describe('base system', () => {
    const { properties, propertyGroups } = system();

    Object.entries(BaseProps).forEach(([group, groupProps]) => {
      describe(group, () => {
        const groupPropConfigs = Object.entries(groupProps);

        it(`${group} composite renders without breaking`, () => {
          const styleFunction = propertyGroups[
            group as keyof typeof propertyGroups
          ] as any;

          expect(
            styleFunction({ [groupPropConfigs[0][1].propName]: '' })
          ).toBeDefined();
        });

        groupPropConfigs.forEach(([property, config]) => {
          it(`${property} renders without breaking`, () => {
            const styleFunction =
              properties[property as keyof typeof properties];

            expect(styleFunction({ [config.propName]: '' })).toBeDefined();
          });
        });
      });
    });
  });

  xdescribe('customized system props', () => {});
});
