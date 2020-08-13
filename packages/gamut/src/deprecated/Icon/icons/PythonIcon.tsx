import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const PythonIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Python Icon</title>
      <path d="M19.782 7.032h-2.815V4.217L14.75 2h-5.5L7.033 4.217v2.815H4.218L2 9.25v5.5l2.218 2.217h2.815v2.816L9.25 22h5.5l2.217-2.218v-2.815h2.816L22 14.75v-5.5l-2.218-2.217zM4.687 15.837l-1.555-1.554V9.718l1.556-1.555H12v-1.13H8.162V4.688l1.555-1.555h4.566l1.555 1.555v4.54l-2.188 2.207H9.88l-2.847 2.848v1.555H4.688zm16.18-1.554l-1.555 1.555H12v1.132h3.838v2.345l-1.555 1.555H9.718l-1.555-1.555V14.75l2.185-2.185h3.775l2.845-2.875V8.162h2.345l1.555 1.555v4.565z" />
      <path d="M9.547 4.453h1.133V5.71H9.548V4.453zM13.32 18.29h1.133v1.258H13.32V18.29z" />
    </svg>
  );
};

PythonIcon.defaultProps = defaultIconProps;
