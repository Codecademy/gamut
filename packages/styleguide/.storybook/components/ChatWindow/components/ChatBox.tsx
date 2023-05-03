import { FlexBox } from '@codecademy/gamut';
import { GrowthIcon } from '@codecademy/gamut-icons';

export const ChatBox: React.FC<{ author: 'user' | 'bot'; message: string }> = ({
  author,
  message,
}) => {
  return (
    <FlexBox
      color={author === 'user' ? 'white-600' : 'white'}
      flexDirection={author === 'user' ? 'row-reverse' : 'row'}
      justifyContent={'flex-start'}
    >
      <GrowthIcon ml={'bot' ? 8 : 0} mr={'user' ? 8 : 0} />
      {message}
    </FlexBox>
  );
};
