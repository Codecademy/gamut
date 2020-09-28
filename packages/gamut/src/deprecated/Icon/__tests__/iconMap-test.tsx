import * as deprecatedExports from '../../index'; //
import { iconMap } from '../iconMap';

const allExportedItems = new Set(Object.values(deprecatedExports));

// Temporary test until we remove iconMap
// If you see this, consider chipping in by removing uses of <Icon />! :)
describe('iconMap', () => {
  it("doesn't export icons that aren't also exported from the package", () => {
    const missingIconNames = Object.entries(iconMap)
      .filter(([_, icon]) => !allExportedItems.has(icon))
      .map(([iconName]) => iconName);

    expect(missingIconNames).toHaveLength(0);
  });
});
