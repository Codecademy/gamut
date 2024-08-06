import {
  Box,
  FillButton,
  FlexBox,
  FormGroup,
  Input,
  Tag,
  Text,
} from '@codecademy/gamut';
import { MiniAddIcon } from '@codecademy/gamut-icons';
import { Background } from '@codecademy/gamut-styles';
import { useState } from 'react';
import * as React from 'react';

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
        borderRadius="m"
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
          A lovely list of tags
        </Text>
        <FlexBox>
          {tagArray.map((tag) => (
            <Box m={8} key={`${tag}`}>
              <Tag
                onDismiss={() => {
                  removeItemHandler(tagArray, tag);
                }}
              >
                {tag}
              </Tag>
            </Box>
          ))}
        </FlexBox>
      </Background>
    </>
  );
};
