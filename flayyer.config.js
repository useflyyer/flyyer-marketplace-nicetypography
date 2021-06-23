// Created with create-flayyer-app@1.17.0

const {config} = require('@flayyer/flayyer-types');
const {default: endent} = require('endent');
require('dotenv').config();

module.exports = config({
  engine: 'react-typescript',
  key: process.env.FLAYYER_KEY,
  deck: 'nice-typography',

  // Optionals
  name: 'Nice Typography',
  description: endent`
    Template for every size to display a centered text with any Google Font typography.

    Optionally supports a background image and custom colors.
  `,
  homepage: 'https://flayyer.com',
  keywords: ['flayyer', 'typography', 'tailwind', 'tailwindcss'],
  license: 'MIT',
  private: false, // Make it public at flayyer.com/community
  repository: 'https://github.com/flayyer/flayyer-marketplace-nicetypography',
  sizes: ['THUMBNAIL', 'BANNER', 'SQUARE', 'STORY']
});
