import { Box } from '../../Box';
import { FillButton } from '../../Button';
import { NewToolTip, NewToolTipProps } from '../ToolTip';

export const NewToolTipMock: React.FC<NewToolTipProps> = (props) => {
  return (
    <Box width="500px">
      <Box width="200px">
        <NewToolTip {...props}>
          <FillButton aria-describedby={props?.id} aria-disabled>
            Click me
          </FillButton>
        </NewToolTip>
      </Box>
    </Box>
  );
};
