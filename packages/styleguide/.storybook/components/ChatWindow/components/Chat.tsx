import { Box, IconButton, GridBox, StrokeButton } from '@codecademy/gamut';
import { ChatBox } from './ChatBox';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { RocketIcon } from '@codecademy/gamut-icons';
import { ChatForm, ChatTextArea, TinyFormError } from './elements';

const defaultPrompts = [
  { prompt: 'hey' },
  { prompt: 'whats up' },
  { prompt: 'you good?' },
];

export const Chat: React.FC = ({}) => {
  const [messages, setMessages] = React.useState([
    { message: 'hello i am user', author: 'user' },
    { message: 'hello i am bot', author: 'bot' },
  ]);

  const [prompts, setPrompts] = React.useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onPromptSubmit = (prompt: string) => {
    setMessages([
      ...messages,
      { message: prompt, author: 'user' },
      { message: "i can't do that right now, dave.", author: 'bot' },
    ]);
    setPrompts([]);
  };

  const onSubmit = (data: { prompt: string }) => {
    if (data.prompt === 'show me the prompts') {
      setPrompts(defaultPrompts);
    }
    setMessages([
      ...messages,
      { message: data.prompt, author: 'user' },
      { message: "i can't do that right now, dave.", author: 'bot' },
    ]);
    reset();
  };

  return (
    <>
      <Box
        py={8}
        px={24}
        bg="navy-900"
        maxHeight={'400px'}
        overflow="scroll"
        width={'100%'}
      >
        {messages.map((message) => (
          <ChatBox {...message} />
        ))}
        {prompts.length > 0 && (
          <GridBox rowGap={8} justifyItems="end" py={8}>
            {prompts.map(({ prompt }) => (
              <StrokeButton
                onClick={() => onPromptSubmit(prompt)}
                width="fit-content"
              >
                {prompt}
              </StrokeButton>
            ))}
          </GridBox>
        )}
      </Box>
      <ChatForm onSubmit={handleSubmit(onSubmit)}>
        <ChatTextArea {...register('prompt', { required: true })} />
        {errors.prompt && (
          <TinyFormError variant="absolute">
            You need to submit a prompt!
          </TinyFormError>
        )}
        <IconButton icon={RocketIcon} height={'32px'} ml={4} type="submit" />
      </ChatForm>
    </>
  );
};
