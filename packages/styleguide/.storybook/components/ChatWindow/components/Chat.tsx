import { Box } from '@codecademy/gamut';
import * as React from 'react';
import { useForm } from 'react-hook-form';

export const ChatForm: React.FC = ({}) => {
  const [messages, setMessages] = React.useState(['hey', 'hi']);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => setMessages([...messages, data.user]);

  console.log(watch('example')); // watch input value by passing the name of it

  return (
    <Box pt={8} px={16}>
      peekaboo
      {messages.map((message) => (
        <Box>{message}</Box>
      ))}
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* include validation with required or other standard HTML validation rules */}
        <input {...register('user', { required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </Box>
  );
};
