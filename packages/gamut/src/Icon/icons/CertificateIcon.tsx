import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const CertificateIcon: React.FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg {...props}>
      <title>Certificate Icon</title>
      <path d="M4 3c-1.11 0-2 .89-2 2v10a2 2 0 0 0 2 2h8v5l3-3 3 3v-5h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4zm8 2l3 2 3-2v3.5l3 1.5-3 1.5V15l-3-2-3 2v-3.5L9 10l3-1.5V5zM4 5h5v2H4V5zm0 4h3v2H4V9zm0 4h5v2H4v-2z" />
    </svg>
  );
};

CertificateIcon.defaultProps = defaultIconProps;

export default CertificateIcon;
