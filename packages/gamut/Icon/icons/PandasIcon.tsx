import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export default function PandasIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props}>
      <title>Panda Icon</title>
      <path d="M12.299 22c-5.674 0-10.097-3.626-10.097-8.69C1.98 8.478 7.072 3 12.3 3c2.584 0 5.083 1.326 7.016 3.525 1.783 2.027 2.88 4.59 2.88 6.767 0 5.11-4.265 8.708-9.896 8.708zm-.003-1c5.103 0 8.9-3.195 8.9-7.727 0-1.925-1-4.252-2.626-6.097C16.817 5.186 14.577 4 12.296 4c-4.66 0-9.292 4.972-9.095 9.273C3.201 17.77 7.15 21 12.296 21z" />
      <path d="M8.993 4.093c-.38-.606-1.308-1.35-2.054-1.509a2.703 2.703 0 0 0-2.105.427 3 3 0 0 0-1.183 1.804c-.157.738.385 1.96.846 2.583.724-.896 1.474-1.602 2.251-2.118.777-.517 1.525-.912 2.245-1.187zM15.12 4.093c.378-.606 1.307-1.35 2.053-1.509a2.703 2.703 0 0 1 2.105.427 3 3 0 0 1 1.183 1.804c.157.738-.385 1.96-.846 2.583-.724-.896-1.474-1.602-2.25-2.118-.777-.517-1.526-.912-2.246-1.187zM7.437 13.74c-.627-.526-.502-1.707.28-2.638.78-.93 1.922-1.259 2.548-.733.627.526.502 1.707-.279 2.638-.78.93-1.922 1.259-2.549.733zm1.581-.432a.791.791 0 0 0 .783-.8c0-.442-.35-.8-.783-.8a.791.791 0 0 0-.782.8c0 .442.35.8.782.8zM16.563 13.74c.627-.526.502-1.707-.28-2.638-.78-.93-1.922-1.259-2.548-.733-.627.526-.502 1.707.279 2.638.78.93 1.922 1.259 2.549.733zm-1.581-.432a.791.791 0 0 1-.783-.8c0-.442.35-.8.783-.8.432 0 .782.358.782.8 0 .442-.35.8-.782.8zM11.978 16.4l1.174-1.338c-.391-.308-.782-.462-1.174-.462-.391 0-.782.154-1.174.462l1.174 1.338z" />
      <path d="M12.176 16.206c-.025.873.2 1.477.665 1.834.426.327.994.156 1.742-.584a.193.193 0 0 1 .277.005.203.203 0 0 1-.005.283c-.87.86-1.632 1.09-2.249.616-.578-.443-.85-1.173-.821-2.166a.198.198 0 0 1 .2-.194.198.198 0 0 1 .19.206z" />
      <path d="M11.783 16.2c0 .875-.238 1.482-.705 1.84-.425.326-.978.157-1.7-.581a.193.193 0 0 0-.277 0 .203.203 0 0 0 0 .282c.843.862 1.594 1.093 2.212.619.577-.442.86-1.169.86-2.16 0-.11-.087-.2-.195-.2a.198.198 0 0 0-.195.2z" />
    </svg>
  );
}

PandasIcon.defaultProps = defaultIconProps;
