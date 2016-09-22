oauth2-refresh-token
=============

Makes managing oauth2 access and refresh tokens easy.  Call `refresh()` to refresh the access token (and store the latest refresh token.)
Call `getAccessToken()` to get the latest access token.  It will not auto-refresh if the access token has expired... You need to do this.

Usage:
```javascript
var refreshToken = require('oauth2-token-refresh')('postgres://somedbserver/somedb', {/* auth details*/}, {/* client details*/}, 'initial refresh token');

refreshToken.refresh(); //returns a promise
refreshToken.getAccessToken().then(function(result) {
  console.log(result);
});
```
`auth` and `client` are objects are required by the [`simple-oath2`](https://github.com/lelylan/simple-oauth2) module.

