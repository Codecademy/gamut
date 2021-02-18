const files = {
  default: {
    loader: 'file-loader',
    exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
    // prevent parsing as Asset Modules
    type: 'javascript/auto',
  },
};

module.exports = files;
