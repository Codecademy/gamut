import { FlexBox, Input, Text } from '@codecademy/gamut';
import { pxRem, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import { UseFormMethods } from 'react-hook-form';

import { Avatar } from '..';

type AvatarChooserProps = {
  src: string;
  register?: UseFormMethods['register'];
  error?: string;
};

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

const HiddenInput = styled(Input)`
  display: none;
`;

export const AvatarChooser: React.FC<AvatarChooserProps> = ({
  src: existingSrc,
  error,
  register,
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
    <FlexBox
      alignItems="center"
      flexDirection="column"
      width="fit-content"
      maxWidth={pxRem(120)}
    >
      <StyledAvatar
        src={imageSrc}
        disableDropshadow
        aria-labelledby="Avatar Photo"
      />
      <ChoosePhotoLabel htmlFor="avatar-chooser">Choose Photo</ChoosePhotoLabel>
      <HiddenInput
        type="file"
        htmlFor="avatar-chooser"
        name="Avatar chooser"
        onChange={onChange}
        ref={register?.({
          required: false,
          validate: validatePhotoUpload,
        })}
        aria-invalid={Boolean(error)}
      />
      {error && (
        <Text variant="p-small" textColor="red" textAlign="center">
          {error}
        </Text>
      )}
    </FlexBox>
  );
};

const validatePhotoUpload = (files: FileList): boolean | string => {
  const MAX_FILE_SIZE = 5242880;
  const MAX_FILE_SIZE_IN_MB = 5;

  const file = files && files.item(0);
  if (!file) return true;

  const { type, size } = file;
  if (!['image/jpeg', 'image/png'].includes(type))
    return 'Please upload a jpeg or png file.';

  if (size > MAX_FILE_SIZE)
    return `Sorry, we cannot accept files larger than ${MAX_FILE_SIZE_IN_MB} MB.`;

  return true;
};
