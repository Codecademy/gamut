import { getPopoverAlignmentAndPattern } from '../popoverAlignmentUtils';

describe('getPopoverAlignmentAndPattern', () => {
  it('maps left-center to Popover center + align left', () => {
    expect(
      getPopoverAlignmentAndPattern({
        alignment: 'left-center',
        type: 'tool',
      })
    ).toMatchObject({
      position: 'center',
      align: 'left',
      beak: 'center',
    });
  });

  it('maps right-center to Popover center + align right', () => {
    expect(
      getPopoverAlignmentAndPattern({
        alignment: 'right-center',
        type: 'tool',
      })
    ).toMatchObject({
      position: 'center',
      align: 'right',
      beak: 'center',
    });
  });

  it('maps top-center without horizontal align swap', () => {
    expect(
      getPopoverAlignmentAndPattern({
        alignment: 'top-center',
        type: 'tool',
      })
    ).toMatchObject({
      position: 'above',
      align: 'center',
    });
  });
});
