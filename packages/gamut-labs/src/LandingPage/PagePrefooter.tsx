import { Box, FlexBox } from '@codecademy/gamut';
import * as React from 'react';

import { CTA } from './CTA';
import { Description } from './Description';
import { Title } from './Title';
import { BaseProps } from './types';

export const PagePrefooter: React.FC<BaseProps> = ({
  title,
  desc,
  cta,
  onAnchorClick,
  testId,
}) => {
  const SectionTitle = title && <Title>{title}</Title>;
  const Desc = desc && (
    <Description text={desc} onAnchorClick={onAnchorClick} />
  );

  return cta ? (
    <FlexBox
      data-testid={testId}
      flexDirection={{ _: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems={{ sm: 'center' }}
    >
      <Box flex={1}>
        {SectionTitle}
        {Desc}
      </Box>
      <Box mt={{ _: 32, sm: 0 }} ml={{ sm: 32 }}>
        <CTA href={cta.href} onClick={cta.onClick} buttonType={cta.buttonType}>
          {cta.text}
        </CTA>
      </Box>
    </FlexBox>
  ) : (
    <div data-testid={testId}>
      {SectionTitle}
      {Desc}
    </div>
  );
};
