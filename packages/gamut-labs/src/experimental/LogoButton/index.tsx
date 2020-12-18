import { TextButton } from '@codecademy/gamut';
import { colors } from '@codecademy/gamut-styles';
import React from 'react';

import { CodecademyLogo } from './../../brand/Logo/CodecademyLogo';
import { CodecademyProLogo } from './../../brand/Logo/CodecademyProLogo';

export type LogoButtonProps = {
  onClick: () => void;
  pro?: boolean;
};

export const LogoButton: React.FC<LogoButtonProps> = ({ onClick, pro }) => {
  return (
    <TextButton>
      {pro ? (
        <CodecademyProLogo
          onClick={onClick}
          style={{
            color: colors.navy,
          }}
          height={27}
        />
      ) : (
        <CodecademyLogo
          onClick={onClick}
          style={{
            color: colors.navy,
          }}
          height={27}
        />
      )}
    </TextButton>
  );
};
