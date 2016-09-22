
exports.up = function(knex, Promise) {
  return knex.schema.createTable('refresh_tokens', function (table) {
    table.increments();
    table.string('refresh_token', 512);
    table.timestamps();
  }).then(function() {
    return knex.schema.createTableIfNotExists('access_tokens', function (table) {
      table.increments();
      table.string('access_token', 512);
      table.timestamps();
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('refresh_tokens').then(function() {
    return knex.schema.dropTable('access_tokens');
  });
};
