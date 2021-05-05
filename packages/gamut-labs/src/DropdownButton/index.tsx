import React from 'react';

export type DropdownButtonProps = {
  buttonText: string;
};

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  buttonText,
}) => {
  return <div>{buttonText}</div>;
};
