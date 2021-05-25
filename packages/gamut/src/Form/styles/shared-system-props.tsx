import { system, theme } from '@codecademy/gamut-styles';
import { StandardPropertiesHyphen } from 'csstype';

export const radioWrapper = system.css({
  margin: '0.25rem 0',
  width: '100%',
  fontWeight: 'normal',
});

export const radioLabel = system.css({
  display: 'flex',
  padding: '$form-padding 0',
  alignItems: 'center',
  cursor: 'pointer',
  position: 'relative',
});
