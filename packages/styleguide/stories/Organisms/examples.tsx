// eslint-disable gamut/import-paths
import { GridForm } from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import { useState } from 'react';

export const FormLoadingExample = () => {
  const [loading, setLoading] = useState(false);

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async () => {
    setLoading(true);
    await wait(2000);
    setLoading(false);
  };

  return (
    <Background bg="navy" p={32}>
      <GridForm
        disableFieldsOnSubmit
        resetOnSubmit
        fields={[
          {
            label: 'Email',
            placeholder:
              'i will disable form fields on loading and reset on correct submission!',
            name: 'im-new',
            type: 'email',
            validation: {
              required: 'pls fill this out',
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
                message: 'that is not an email 😔',
              },
            },
            size: 12,
          },
        ]}
        onSubmit={onSubmit}
        submit={{
          loading,
          contents: 'Submit Me 💖',
          size: 5,
        }}
      />
    </Background>
  );
};
