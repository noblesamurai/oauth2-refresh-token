module.exports = function (db, credentials, initialRefreshToken) {
  const knex = require('knex')(db);
  const SimpleOAuth2 = require('simple-oauth2');
  const oauth2 = SimpleOAuth2.create(credentials);
  const debug = require('debug')('oauth2-refresh-token');
  const path = require('path');

  var migrated;
  function migrate () {
    if (migrated) return migrated;
    migrated = knex.migrate.latest({ directory: path.join(__dirname, '/migrations') });
    return migrated;
  }

  function latestTokens () {
    return migrate().then(function () {
      return knex('tokens').orderBy('created_at', 'desc').first('refresh_token', 'access_token');
    });
  }

  function refresh () {
    return migrate().then(function () {
      return latestTokens();
    }).then(function (tokens) {
      const refreshToken = tokens ? tokens.refresh_token : initialRefreshToken;
      var token = oauth2.accessToken.create({ refresh_token: refreshToken });

      return token.refresh().then(function (result) {
        const rec = ({ access_token: result.token.access_token, refresh_token: result.token.refresh_token });
        debug('inserting new tokens', rec);
        return knex('tokens').insert(rec);
      });
    });
  }

  return {
    refresh: refresh,
    getAccessToken: function () {
      return latestTokens().then(function (tokens) {
        if (tokens) return tokens.access_token;
      });
    },
    _knex: knex // in case you need to e.g. disconnect before shutting down.
  };
};
