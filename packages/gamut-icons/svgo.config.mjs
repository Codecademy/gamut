export default  {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          addXMLDeclaration: false, // Disable XML declaration
          removeViewBox: false, // Preserve viewBox for responsive scaling
          removeUnknownsAndDefaults: false, // Keep custom/ARIA attributes
          convertPathData: false, // Reduce path optimization aggressiveness
          removeUselessStrokeAndFill: false, // Preserve stroke/fill attributes
          cleanupIds: false, // Keep IDs for animations/JS
        },
      },
    },
  ],
};
