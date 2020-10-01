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
  it('initializes a system with no arguments by default', () => {
    const { properties, propertyGroups, variant } = system();

    expect(properties).toBeDefined();
    expect(propertyGroups).toBeDefined();
    expect(variant).toBeDefined();
    variant({
      propKey: 'hello',
      variants: { primary: { width: 'in' } },
    });
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
