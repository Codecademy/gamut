import React from 'react';
import { GridForm } from 'gamut-templates';

export default {
  component: 'GridForm',
  title: 'Templates/GridForm',
};

export const GridForm = () => (
  <GridForm fields={[{ label: 'hi', field: 'text' }]} submit={() => null} />
);

GridForm.story = {
  name: 'GridForm',
};
