'use strict';

const { ApolloClient } = require('@apollo/client');
const { TSAPI_URI } = require('./env');

module.exports = function createTsapiClient() {
  return new ApolloClient({
    uri: TSAPI_URI,
  });
};
