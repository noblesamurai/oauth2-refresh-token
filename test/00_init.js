var knex = require('knex')(require('../knexfile.js').test);

beforeEach(function() {
  return Promise.all(['refresh_tokens', 'access_tokens'].map(function(t) {
    return knex(t).del().catch(function(err) {
      // We may have not run migrations just yet (they are auto-run in index.js).
      if (/.*relation.*does not exist/.test(err.message)) return Promise.resolve();
      return err;
    });
  }));
});

after(function() {
  return knex.destroy();
});
