import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const FullstackIcon: React.FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg {...props}>
      <title>Fullstack Icon</title>
      <path d="M12.202 3h-.54L2 7.831v1.08l9.663 4.83h.54l9.662-4.83V7.83L12.202 3zm-.27 9.528L3.619 8.371l8.315-4.158 8.314 4.158-8.314 4.157z" />
      <path d="M19.303 11.517l.922.472-8.292 4.157-8.315-4.157.921-.472-1.348-.674L2 11.449v1.08l9.663 4.83h.54l9.64-4.83v-1.08l-1.191-.606" />
      <path d="M19.303 15.157l.922.45-8.292 4.157-8.315-4.157.921-.45-1.348-.674L2 15.067v1.08l9.663 4.83h.54l9.64-4.83v-1.08l-1.191-.584" />
    </svg>
  );
};

FullstackIcon.defaultProps = defaultIconProps;

export default FullstackIcon;
