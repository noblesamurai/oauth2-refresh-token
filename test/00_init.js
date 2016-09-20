var cloneDeep = require('lodash.clonedeep'),
    knex = require('knex')(require('../knexfile.js').test);

beforeEach(function() {
  return Promise.all(['refresh_tokens', 'access_tokens'].map(function(t) {
    return knex(t).del();
  }));
});

after(function() {
  return knex.destroy();
});
