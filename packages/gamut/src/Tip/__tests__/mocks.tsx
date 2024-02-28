import { FillButton } from '../../Button';
import { NewToolTip, ToolTipProps } from '../ToolTip';

export const NewToolTipMock: React.FC<ToolTipProps> = (props) => {
  return (
    <NewToolTip {...props}>
      <FillButton aria-describedby={props?.id} aria-disabled>
        Click me
      </FillButton>
    </NewToolTip>
  );
};
