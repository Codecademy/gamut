import { Alert } from '@codecademy/gamut';

import styled from '@emotion/styled';
import { css } from '@codecademy/gamut-styles';

const StyledAlert = styled(Alert)(
  css({
    my: 16
  })
)

export const Callout: React.FC<{ text: string }> = ({ text }) => {
  return (
    <StyledAlert type="subtle" placement="inline">
      {text}
    </StyledAlert>
  );
};
