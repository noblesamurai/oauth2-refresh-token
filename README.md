refresh-token
=============

Usage:
```javascript
var refreshToken = require('oauth-token-refresh')('postgres://somedbserver/somedb', {/* auth details*/}, {/* client details*/}, 'initial refresh token');

refreshToken.refresh(); //returns a promise
refreshToken.getAccessToken().then(function(result) {
  console.log(result);
});
```
`auth` and `client` are objects are required by the [`simple-oath2`](https://github.com/lelylan/simple-oauth2) module.

