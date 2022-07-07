import {
  Box,
  FillButton,
  FormGroup,
  GridBox,
  Input,
  Tag,
  Text,
} from '@codecademy/gamut';
import { MiniAddIcon } from '@codecademy/gamut-icons';
import { Background } from '@codecademy/gamut-styles';
import React, { useState } from 'react';

export const TagExample: React.FC = () => {
  const [tagInput, setTagInput] = useState('');
  const [tagArray, setTagArray] = useState(['first tag']);

  const removeItemHandler = (arr: string[], tagValue: string) => {
    setTagArray(arr.filter((tag: string) => tag !== tagValue));
  };

  return (
    <>
      <Box>
        <FormGroup
          label="create custom tag"
          htmlFor="add-tag"
          mr={16}
          maxWidth="30rem"
        >
          <Input
            htmlFor="add-tag"
            onChange={(e) => {
              setTagInput(e.target.value);
            }}
          />
        </FormGroup>
        <FillButton
          onClick={() => {
            setTagArray([...tagArray, tagInput]);
          }}
        >
          <MiniAddIcon size={14} mr={8} /> Add Tag
        </FillButton>
      </Box>

      <Background
        bg="background-primary"
        borderRadius="3px"
        mx={8}
        my={24}
        p={24}
      >
        <Text
          fontFamily="accent"
          mb={16}
          textDecoration="underline"
          width="100%"
        >
          {' '}
          A lovely list of tags
        </Text>
        <GridBox
          display="grid"
          gap={16}
          gridTemplateColumns="1fr 1fr 1fr 1fr 1fr"
          maxWidth="100%"
        >
          {tagArray.map((tag) => (
            <Tag
              key={`${tag}`}
              onDismiss={() => {
                removeItemHandler(tagArray, tag);
              }}
            >
              {tag}
            </Tag>
          ))}
        </GridBox>
      </Background>
    </>
  );
};
