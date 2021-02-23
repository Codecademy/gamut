import { headerHeightVarName } from '../consts';
import { getGlobalHeaderHeight } from '../util';

describe('getGlobalHeaderHeight', () => {
  it(`should return ${headerHeightVarName} as a number`, () => {
    document.documentElement.style.setProperty(headerHeightVarName, '420');

    expect(getGlobalHeaderHeight()).toEqual(420);
  });
});
