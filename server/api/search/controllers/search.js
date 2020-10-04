'use strict';

const { sanitizeEntity } = require('strapi-utils');

const sanitizeQuery = (str='') => str
  .trim()
  .replace(/^[\s|&|\(|\)|:|\*|!]/, '')
  .replace(/[\s|&|\(|\)|:|\*|!]$/, '')
  .trim()
  .replace(/\s*[\s|&|\(|\)|:|\*|!]\s*/g, '|')
  .replace(/\|+/g, '|');

const searchController = {

  autoSuggest: async (ctx, next) => {
    const { query } = ctx.request.body;
    const results = await strapi
      .query('plant')
      .search({ _q: query, _limit: 10 });
    return results;
  },

  simpleSearch: async (ctx, next) => {
    const { query } = ctx.request.body;
    const results = await strapi
      .query('plant')
      .search({ _q: query });
    return results;
  }, 

  advancedSearch: async (ctx, next) => {
    const { model, query } = ctx.request.body;
    const results = await strapi
      .query(model)
      .search({ _q: query }, ['plants', 'plants.genus', 'plants.species']);
    const plants = results.reduce((map, result) => {
      result.plants.map(plant => map.set(plant.id, plant));
      return map;
    }, new Map);
    return Array.from(plants.values());
  },

};

module.exports = searchController;
