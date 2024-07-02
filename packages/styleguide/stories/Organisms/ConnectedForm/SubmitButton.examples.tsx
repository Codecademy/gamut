import { ConnectedForm, FlexBox, SubmitButton, Text } from '@codecademy/gamut';
import { action } from '@storybook/addon-actions';

export const SubmitButtonStates = () => {
  return (
    <ConnectedForm
      display="flex"
      my={24}
      onSubmit={(values) => {
        action('Form Submitted')(values);
      }}
    >
      <FlexBox flexDirection="column" alignItems="center" p={16}>
        <Text variant="title-xs">default</Text>
        <SubmitButton m={8}>submit the form, please</SubmitButton>
      </FlexBox>
      <FlexBox
        borderLeft={1}
        borderRight={1}
        flexDirection="column"
        alignItems="center"
        p={16}
      >
        <Text variant="title-xs">loading</Text>
        <SubmitButton loading m={8}>
          submit the form, please
        </SubmitButton>
      </FlexBox>
      <FlexBox flexDirection="column" alignItems="center" p={16}>
        <Text variant="title-xs">disabled</Text>
        <SubmitButton disabled m={8}>
          submit the form, please
        </SubmitButton>
      </FlexBox>
    </ConnectedForm>
  );
};
