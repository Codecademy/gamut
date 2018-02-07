export const addonInfoOptions = {
  inline: true,
  source: true,
  propTables: false,
  header: false,
  styles: stylesheet => ({
    header: {
      body: {},
      h1: {
        fontSize: '.9rem',
        fontWeight: '900',
        marginBottom: '2rem',
        color: 'gray',
      },
      h2: { fontSize: '1.5rem', margin: '1rem 0' },
    },
    source: {
      h1: { fontSize: '1.5rem', margin: '2rem 0 1rem 0' },
      pre: {
        backgroundColor: 'transparent',
        padding: 0,
      },
    },
  }),
};
