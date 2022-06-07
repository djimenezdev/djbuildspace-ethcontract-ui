const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@comp': path.resolve(__dirname, 'src/components/'),
      '@img': path.resolve(__dirname, 'src/images/'),
      '@data': path.resolve(__dirname, 'src/data/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@context': path.resolve(__dirname, 'src/context/'),
    },
  },
};

export {};
