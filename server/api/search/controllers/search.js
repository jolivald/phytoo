'use strict';

const sanitizeQuery = str => str.trim()
  .replace(/^[\s|&|\(|\)|:|\*|!]/, '')
  .replace(/[\s|&|\(|\)|:|\*|!]$/, '')
  .trim()
  .replace(/\s*[\s|&|\(|\)|:|\*|!]\s*/g, '|')
  .replace(/\|+/g, '|');

module.exports = {

  simpleSearch: async (ctx, next) => {
    let params = sanitizeQuery(ctx.request.body.query);
    const results = await strapi
      .query('plant')
      .model.query(async qb => {
        try {
          return await qb
            .whereRaw("to_tsvector('french', description) @@ to_tsquery('french', ?)", params)
            .select('genus', 'species', 'description');
        } catch {
          return { error: 'Les paramètres de recherche sont invalides'};
        }
      })
      .fetchAll();
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
    return this.simpleSearch(ctx, next);
  }
};
