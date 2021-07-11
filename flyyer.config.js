// Created with create-flyyer-app@1.17.0

const {config} = require('@flyyer/types');
const {default: endent} = require('endent');
require('dotenv').config();

module.exports = config({
  engine: 'react-typescript',
  key: process.env.FLYYER_KEY,
  deck: 'nice-typography',

  // Optionals
  name: 'Nice Typography',
  description: endent`
    Template for every size to display a centered text with any Google Font typography.

    Optionally supports a background image and custom colors.
  `,
  homepage: 'https://flyyer.io',
  keywords: ['flyyer', 'typography', 'tailwind', 'tailwindcss'],
  license: 'MIT',
  private: false, // Make it public at flyyer.io/community
  repository: 'https://github.com/useflyyer/flyyer-marketplace-nicetypography',
  sizes: ['THUMBNAIL', 'BANNER', 'SQUARE', 'STORY']
});
