import { FlexBox, FormError, Input } from '@codecademy/gamut';
import { pxRem, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useCallback, useRef, useState } from 'react';
import * as React from 'react';
import { UseFormReturn, Validate } from 'react-hook-form';

import { Avatar } from '..';

type AvatarChooserProps = {
  src: string;
  name?: string;
  register?: UseFormReturn['register'];
  onImageChanged?: (imageFileList: FileList) => void;
  validate?: Validate<FileList> | Record<string, Validate<FileList>>;
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
  padding-top: ${theme.spacing[16]};
  ${theme.breakpoints.sm} {
    padding-top: ${theme.spacing[24]};
  }
`;

const ChoosePhotoSpan = styled.span`
  color: ${theme.colors.hyper};
  font-weight: ${theme.fontWeight.title};
  cursor: pointer;
`;

const HiddenInput = styled(Input)`
  display: none;
`;

const StyledFormError = styled(FormError)`
  position: initial;
  text-align: center;
`;

export const AvatarChooser: React.FC<AvatarChooserProps> = ({
  src: existingSrc,
  onImageChanged,
  error,
  register,
  validate = validatePhotoUpload,
  name = 'Avatar Photo',
}) => {
  const [imageSrc, setImageSrc] = useState<string>(existingSrc);

  const choosePhotoLabelRef = useRef<HTMLLabelElement>(null);

  const onChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const target = event?.target as HTMLInputElement;
      const imageFilelist = target?.files;
      const imageFile = imageFilelist?.[0];

      onImageChanged?.(imageFilelist!);
      if (imageFile) setImageSrc(URL.createObjectURL(imageFile));
    },
    [setImageSrc, onImageChanged]
  );

  // Need to simulate Enter and Space keyboard presses to activate the
  // file uploader here since it's not a real button.
  const onChooseUploadKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ')
        choosePhotoLabelRef.current?.click();
    },
    [choosePhotoLabelRef]
  );

  return (
    <FlexBox
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      width="fit-content"
      maxWidth={pxRem(120)}
      aria-live="polite"
    >
      <StyledAvatar src={imageSrc} disableDropshadow alt="Avatar Photo" />
      <ChoosePhotoLabel ref={choosePhotoLabelRef} htmlFor="avatar-chooser">
        <ChoosePhotoSpan
          role="button"
          tabIndex={0}
          onKeyPress={onChooseUploadKeyPress}
        >
          Choose Photo
        </ChoosePhotoSpan>
      </ChoosePhotoLabel>
      <HiddenInput
        type="file"
        htmlFor="avatar-chooser"
        aria-invalid={Boolean(error)}
        name={name}
        onChange={onChange}
        {...register?.(name, {
          onChange,
          validate,
          required: false,
        })}
      />
      {error && <StyledFormError role="alert">{error}</StyledFormError>}
    </FlexBox>
  );
};

const validatePhotoUpload = (files: FileList): boolean | string => {
  const MAX_FILE_SIZE = 5242880;
  const MAX_FILE_SIZE_IN_MB = 5;

  const file = files?.item(0);
  if (!file) return true;

  const { type, size } = file;
  if (!['image/jpeg', 'image/png'].includes(type))
    return 'Please upload a jpeg or png file.';

  if (size > MAX_FILE_SIZE)
    return `Sorry, we cannot accept files larger than ${MAX_FILE_SIZE_IN_MB} MB.`;

  return true;
};
