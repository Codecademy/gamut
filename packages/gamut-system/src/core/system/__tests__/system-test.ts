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
  xdescribe('base system', () => {
    const { properties, propertyGroups } = system();

    describe('properties', () => {
      allPossibilities.props.forEach((prop) => {
        it(`creates a style function for ${prop}`, () => {
          const propFunction = properties[
            prop as keyof typeof properties
          ] as any;
          expect(propFunction({})).toEqual({});
        });
      });
    });

    describe('propertyGroups', () => {
      allPossibilities.propGroups.forEach((prop) => {
        it(`creates a function for ${prop}`, () => {
          const propFunction = propertyGroups[
            prop as keyof typeof propertyGroups
          ] as any;
          expect(propFunction({})).toEqual({});
        });
      });
    });
  });

  describe('customized system props', () => {});

  describe('variant', () => {});
});
