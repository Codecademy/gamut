if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  console.warn(
    'Importing from `gamut-styles/utils/variables` is now deprecated, please import directly from the gamut-styles package'
  );
}

export * from '../../dist/variables';
