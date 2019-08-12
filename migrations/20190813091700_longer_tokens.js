exports.up = function (knex, Promise) {
  return knex.schema.alterTable('tokens', function (table) {
    // We are sometimes getting 1036 char access_token now.
    table.string('access_token', 2048).alter();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('tokens', function (table) {
    table.string('access_token', 1024).alter();
  });
};
