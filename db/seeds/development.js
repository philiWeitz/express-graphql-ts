exports.seed = (knex) => {
  const insertAuthor = () => {
    return knex('author')
      .returning('id')
      .insert([
        { firstName: 'Tom', lastName: 'Coleman' },
        { firstName: 'Sashko', lastName: 'Stubailo' },
        { firstName: 'Mikhail', lastName: 'Novikov' },
      ]);
  };

  const insertPosts = (authorIds) => {
    const posts = authorIds.map(id => {
      return { authorId: parseInt(id, 10), title: `Hapi GraphQL post example for author ${id}`, votes: 1 };
    });

    return knex('post')
      .returning('id')
      .insert(posts);
  };

  return knex('post').del()
    .then(knex('author').del())
    .then(insertAuthor)
    .then(insertPosts);
};
