import { Badge } from '@codecademy/gamut';
import { MiniCheckmarkIcon } from '@codecademy/gamut-icons';
import * as React from 'react';

export const BadgeFigmaInstanceExample: React.FC = () => (
  <Badge icon={MiniCheckmarkIcon} variant="tertiaryFill">
    Badge Text
  </Badge>
);

export default BadgeFigmaInstanceExample;
