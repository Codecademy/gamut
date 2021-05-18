import { FlexBox, Input } from '@codecademy/gamut';
import { pxRem, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';

import { Avatar } from '..';

type AvatarChooserProps = {
  src: string;
};

const HiddenInput = styled(Input)`
  display: none;
`;

const baseSize = 75;
const smBreakpointSize = 120;

const StyledAvatar = styled(Avatar)`
  img {
    width: ${pxRem(baseSize)};
    height: ${pxRem(baseSize)};
  }

  ${theme.breakpoints.sm} {
    img {
      width: ${pxRem(smBreakpointSize)};
      height: ${pxRem(smBreakpointSize)};
    }
  }
`;

const ChoosePhotoLabel = styled.label`
  color: ${theme.colors.hyper};
  font-weight: ${theme.fontWeight.title};
  cursor: pointer;
  margin-top: ${theme.spacing[16]};

  ${theme.breakpoints.sm} {
    margin-top: ${theme.spacing[24]};
  }
`;

export const AvatarChooser: React.FC<AvatarChooserProps> = ({
  src: existingSrc,
}) => {
  const [imageSrc, setImageSrc] = useState<string>(existingSrc);

  const onChange = useCallback(
    (event: any) => {
      const imageFile = event?.target?.files[0];
      if (imageFile) setImageSrc(URL.createObjectURL(imageFile));
    },
    [setImageSrc]
  );

  return (
    <FlexBox alignItems="center" flexDirection="column" width="fit-content">
      <StyledAvatar
        src={imageSrc}
        disableDropshadow
        aria-labelledby="Avatar Photo"
      />
      <ChoosePhotoLabel htmlFor="avatar-chooser">Choose Photo</ChoosePhotoLabel>
      <HiddenInput
        htmlFor="avatar-chooser"
        disabled={false}
        name="Avatar chooser"
        onChange={(file) => onChange(file)}
        type="file"
      />
    </FlexBox>
  );
};
