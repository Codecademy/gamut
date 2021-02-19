const files = {
  default: {
    test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff2?$|\.ttf$|\.eot|\.wav$|\.mp3$/,
    // could switch to something like this if we can ensure that this loader is last in the list of rules
    // exclude: [/\.(js|mjs|jsx|ts|tsx|css|scss)$/, /\.html$/, /\.json$/],
    type: 'asset/resource',
  },
};

module.exports = files;
