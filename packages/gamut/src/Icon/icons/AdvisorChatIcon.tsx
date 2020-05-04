import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const AdvisorChatIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>AdvisorChat Icon</title>
      <path
        d="M19 10.482l2 1.335-2 1.218v5.402C19 19.3 18.292 20 17.437 20H4.563A1.569 1.569 0 0 1 3 18.437V5.563C3 4.7 3.708 4 4.563 4h12.874C18.3 4 19 4.708 19 5.563v4.919zM11 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1c-2.761 0-5 1.79-5 4h10c0-2.21-2.239-4-5-4z"
        fillRule="evenodd"
      />
    </svg>
  );
};

AdvisorChatIcon.defaultProps = defaultIconProps;

export default AdvisorChatIcon;
