
exports.up = (knex) => {
  return knex.schema
    .createTable('author', table => {
      table.bigincrements('id').primary().index();
      table.string('firstName', 128).notNullable();
      table.string('lastName', 128).notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
    .createTable('post', table => {
      table.bigincrements('id').primary().index();
      table.string('title', 128).notNullable();
      table.integer('votes').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
      table.biginteger('authorId')
        .unsigned()
        .references('id')
        .inTable('author')
        .onDelete('CASCADE')
        .notNullable();
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('post')
    .dropTableIfExists('author');
};
