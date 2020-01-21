import React from 'react';
import { GridForm } from 'gamut-templates';

export default {
  component: 'GridForm',
  title: 'Templates/GridForm',
};

export const gridForm = () => (
  <GridForm fields={[{ label: 'hi', field: 'text' }]} submit={() => null} />
);

gridForm.story = {
  name: 'GridForm',
};
