import {
  freeHeaderItems,
  freeMobileHeaderItems,
} from '../GlobalHeaderVariants';
import { User } from '../types';

const user: User = {
  avatar:
    'https://www.gravatar.com/avatar/1c959a9a1e2f9f9f1ac06b05cccc1d60?s=150&d=retro',
  displayName: 'Codey',
  showReferrals: true,
};

describe('freeHeaderItems', () => {
  it('returns a logo item with checkMini set to true as the left-most element', () => {
    const ret = freeHeaderItems(user);
    expect(ret.left[0].checkMini).toBe(true);
  });
});

describe('freeMobileHeaderItems', () => {
  it('returns a logo item with checkMini set to true as the left-most element', () => {
    const ret = freeMobileHeaderItems(user);
    expect(ret.left[0].checkMini).toBe(true);
  });
});
