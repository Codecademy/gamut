import { Box, FlexBox, Logo } from '@codecademy/gamut';
import { GrowthIcon } from '@codecademy/gamut-icons';
import { Background } from '@codecademy/gamut-styles';
import { Message } from './elements';

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
      <Background
        bg={author === 'bot' ? 'white' : 'blue-500'}
        borderRadius={'100%'}
        display={'grid'}
        height={'24px'}
        width={'24px'}
        alignItems={'center'}
        justifyItems={'center'}
        ml={'bot' ? 8 : 0}
        mr={'user' ? 8 : 0}
      >
        {author === 'bot' ? (
          <Logo variant="mini" height={12} />
        ) : (
          <GrowthIcon height={12} />
        )}
      </Background>
      <Box maxWidth={'192px'}>
        <Message>{message}</Message>
      </Box>
    </FlexBox>
  );
};
