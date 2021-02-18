const files = {
  default: {
    loader: 'file-loader',
    test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff2?$|\.ttf$|\.eot|\.wav$|\.mp3$/,
    // prevent parsing as Asset Modules
    type: 'javascript/auto',
  },
};

module.exports = files;
