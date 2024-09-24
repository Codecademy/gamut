// eslint-disable gamut/import-paths
import { PlaygroundApp } from '@codecademy/gamut/src';
import { Background } from '@codecademy/gamut-styles';
import { useState } from 'react';

export const PlaygroundAppExample = () => {

  return (
    <Background bg="navy" p={32}>
      <PlaygroundApp/>
    </Background>
  );
};
