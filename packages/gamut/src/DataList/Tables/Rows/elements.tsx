import { createComponent, states } from '@codecademy/gamut-styles';

import { TableHeader } from '../../../List';

export const StyledHeaderRow = createComponent(TableHeader)<{
  invisible?: boolean;
  isDataList?: boolean;
}>(
  states({
    invisible: { visibility: 'hidden', height: 0, overflow: 'hidden' },
    isDataList: {
      borderX: '1px solid transparent' as any,
    },
  })
);
