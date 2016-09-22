module.exports = function(db, credentials, initialRefreshToken) {
const knex = require('knex')(db),
      SimpleOAuth2 = require('simple-oauth2'),
      oauth2 = SimpleOAuth2.create(credentials);

  function latestToken(type) {
    return knex(type + '_tokens').orderBy('id', 'desc').first(type + '_token').then(function(result) {
      if (result) return result[type + '_token'];
    });
  }

  function refresh() {
    return latestToken('refresh').then(function(refreshToken) {
      refreshToken = refreshToken || initialRefreshToken;
      var token = oauth2.accessToken.create({ refresh_token: refreshToken });

      return token.refresh().then(function(result) {
        return Promise.all([
          knex('access_tokens').insert({ access_token: result.token.access_token }),
          knex('refresh_tokens').insert({ refresh_token: result.token.refresh_token})
        ]);
      });
    });
  }

  return {
    refresh: refresh,
    getAccessToken: latestToken.bind(null, 'access'),
    _knex: knex // in case you need to e.g. disconnect before shutting down.
  };
};
