import { Box, IconButton, TextArea } from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';
import { ChatBox } from './ChatBox';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { RocketIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';

const ChatForm = styled.form(
  css({ display: 'flex', pl: 24, pt: 16, width: '100%' })
);

const ChatTextArea = styled(TextArea)(css({ height: '32px', py: 4, px: 8 }));

export const Chat: React.FC = ({}) => {
  const [messages, setMessages] = React.useState([
    { message: 'hello i am user', author: 'user' },
    { message: 'hello i am bot', author: 'bot' },
  ]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) =>
    setMessages([
      ...messages,
      { message: data.user, author: 'user' },
      { message: "i can't do that right now, dave.", author: 'bot' },
    ]);

  console.log(watch('example')); // watch input value by passing the name of it

  return (
    <>
      <Box
        pt={8}
        px={24}
        bg="navy-900"
        maxHeight={'400px'}
        overflow="scroll"
        width={'100%'}
      >
        peekaboo
        {messages.map((message) => (
          <ChatBox {...message} />
        ))}
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      </Box>
      <ChatForm onSubmit={handleSubmit(onSubmit)}>
        {/* include validation with required or other standard HTML validation rules */}
        <ChatTextArea {...register('user', { required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}
        <IconButton icon={RocketIcon} height={'32px'} type="submit" />
      </ChatForm>
    </>
  );
};
