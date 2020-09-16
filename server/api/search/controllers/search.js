'use strict';

/**
 * A set of functions called "actions" for `search`
 */

module.exports = {

  async simpleSearch(ctx) {
    const { query } = ctx.request.body;
    console.log('simple search', strapi);
    //await strapi.query('plant').model;
    // TODO select like
    return JSON.stringify([
      {
        id: 1,
        genus: 'Gen',
        species: 'Spec',
        excerpt: 'Lorem ipsum dolores sit amet...'
      },
      {
        id: 2,
        genus: 'Stub',
        species: 'Furb',
        excerpt: 'Lorem ipsum dolores sit amet... Lorem ipsum dolores sit amet... Lorem ipsum dolores sit amet... Lorem ipsum dolores sit amet...'
      }
    ]);
  }

};
