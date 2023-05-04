import { FormError, Text, TextArea } from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';

import styled from '@emotion/styled';

export const ChatForm = styled.form(
  css({ alignItems: 'end', display: 'flex', pl: 24, py: 16, width: '100%' })
);

export const ChatTextArea = styled(TextArea)(css({ height: '32px', px: 8 }));

export const Message = styled(Text)(css({ overflowWrap: 'anywhere' }));

export const TinyFormError = styled(FormError)(
  css({ fontSize: 'xx-small', top: 'calc(100% - 0.9rem)', left: '36px' })
);
