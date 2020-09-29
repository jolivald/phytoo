'use strict';

const sanitizeQuery = (str='') => str
  .trim()
  .replace(/^[\s|&|\(|\)|:|\*|!]/, '')
  .replace(/[\s|&|\(|\)|:|\*|!]$/, '')
  .trim()
  .replace(/\s*[\s|&|\(|\)|:|\*|!]\s*/g, '|')
  .replace(/\|+/g, '|');

const searchController = {

  simpleSearch: async (ctx, next) => {
    console.log('ctx', ctx.request.body, typeof ctx.request.body);
    const { query } = JSON.parse(ctx.request.body);
    //const { query } = ctx.request.body;
    const params = sanitizeQuery(query);
    console.log('params', params);
    const results = await strapi
      .query('plant')
      .model.query(async qb => {
        try {
          return await qb
            .whereRaw("to_tsvector('french', description) @@ to_tsquery('french', ?)", params)
            .select('id', 'genus', 'species', 'description');
        } catch {
          return { error: 'Les paramètres de recherche sont invalides'};
        }
      })
      .fetchAll();
    console.log('results', results.toJSON());
    return JSON.stringify(results);
  }, 

  advancedSearch: async (ctx, next) => {
    const { query } = ctx.request.body;
    const results = await strapi
      .query('plant')
      .model.query(async qb => {
        return await qb
          .whereRaw('to_tsvector(description) @@ to_tsquery(?)', query)
          .select('genus', 'species', 'description');
      })
      .fetchAll();
    return JSON.stringify(results);
  },

  autoSuggest: async (ctx, next) => {
    return searchController.simpleSearch(ctx, next);
  }
};

module.exports = searchController;
