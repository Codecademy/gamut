import { Alert } from '@codecademy/gamut';

export const Callout: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Alert type="subtle" placement="inline">
      {text}
    </Alert>
  );
};
