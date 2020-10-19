import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const QuizIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Quiz Icon</title>
      <g fillRule="evenodd">
        <path d="M2.053 7h10.105v1.263H2.053zM2.053 9.526h7.579v1.263h-7.58zM2.053 12.053h5.052v1.263H2.053zM2.053 14.579h2.526v1.263H2.053z" />
        <path
          d="M18.616 5.343a1.16 1.16 0 0 0-.811.333l-1.607 1.607 4.017 4.024 1.606-1.591c.455-.463.455-1.183 0-1.622L19.42 5.676a1.157 1.157 0 0 0-.803-.333M15.66 7.82l-6.14 6.147 1.941.212.136 1.735 1.728.13.22 1.94 6.14-6.147M9.073 14.672l-1.327 5.07 5.078-1.356-.182-1.637-1.75-.129-.137-1.758"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};

QuizIcon.defaultProps = defaultIconProps;
