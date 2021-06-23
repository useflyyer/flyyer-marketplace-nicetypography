// Created with create-flayyer-app@1.17.0

const {config} = require('@flayyer/flayyer-types');
require('dotenv').config();

module.exports = config({
  engine: 'react-typescript',
  key: process.env.FLAYYER_KEY,
  deck: 'nice-typography',

  // Optionals
  name: 'Nice-Typography',
  description: 'Created with create-flayyer-app'
});
