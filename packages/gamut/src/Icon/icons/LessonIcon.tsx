import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const LessonIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Lesson Icon</title>
      <path d="M4 7.329C5.302 6.443 6.587 6 7.853 6c1.267 0 2.534.443 3.8 1.329V18c-1.249-.913-2.516-1.369-3.8-1.369-1.284 0-2.568.456-3.853 1.369V7.329zm16 0V18c-1.285-.913-2.57-1.369-3.853-1.369-1.284 0-2.551.456-3.8 1.369V7.329C13.613 6.443 14.88 6 16.147 6c1.266 0 2.551.443 3.853 1.329z" />
    </svg>
  );
};

LessonIcon.defaultProps = defaultIconProps;

export default LessonIcon;
