'use strict';

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
      .model.query(async qb => {
        try {
          return await qb
            .where('description', 'LIKE', `%${query}%`)
            .select('id', 'genus', 'species', 'description');
        } catch {
          return { error: 'Les paramètres de recherche sont invalides'};
        }
      })
      .fetchAll();
    return results;
  },

  simpleSearch: async (ctx, next) => {
    const quickResults = await searchController.autoSuggest(ctx, next);
    if (quickResults.length > 0){ return quickResults; }
    const { query } = ctx.request.body;
    const params = sanitizeQuery(query);
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
    return results;
  }, 

  advancedSearch: async (ctx, next) => {
    const request = ctx.request.body;
    const params = sanitizeQuery(request.query);
    const results = await strapi
      .query('plant')
      .model.query(async qb => {
        /* JOIN GENUS
          select g.name from plants as p
          inner join genera as g
          on p.genus = g.id;
        */
        /* JOIN SPECIES
          select s.name from plants as p
          inner join species as s
          on p.species = s.id;
        */
        /* JOIN EFFECTS
          select e.name from plants as p
          inner join effects_plants__plants_effects as eppe 
          on p.id = eppe.plant_id
          inner join effects as e 
          on e.id = eppe.effect_id;
        */
        /* JOIN VERNACULARS
          select v.name from plants as p
          inner join plants_vernaculars__vernaculars_plants as pvvp 
          on p.id = pvvp.plant_id
          inner join vernaculars as v 
          on v.id = pvvp.vernacular_id;
        */
        /* JOIN IMAGES
          select p.description from plants as p
          inner join images as i 
          on p.id = i.plant;
        */

        try {
            return await qb
              .from('plants')
              .join('plants_vernaculars__vernaculars_plants as PV', 'plants.id', '=', 'PV.plant_id')
              .join('vernaculars as V', 'PV.vernacular_id', '=', 'V.id')
              .where('PV.name', 'LIKE', `%${query}%`)
              .select('plants.id', 'PV.name');
        } catch {
          return { error: 'Les paramètres de recherche sont invalides'};
        }
        /*return await qb
          .whereRaw('to_tsvector(description) @@ to_tsquery(?)', params)
          .select('id', 'genus', 'species', 'description');*/
          // const addSelect = ['plant.id', 'plant.genus', 'plant.species', 'plant.description'];
          // const addWhere  = ['plant.description'];
          /*if (request.vernacular){
            qb.join('plants_vernaculars__vernaculars_plant as PV', 'plant.id', '=', 'PV.plant_id')
              .join('vernaculars as V', 'V.id', '=', 'PV.vernacular_id');
              addSelect.push('V.name');
              addWhere.push('')
            toSelect.push()
          }if (request.genus){
            qb.join('genera', 'plant.genus', '=', 'genus.id');
          }*/
          //qb.from('plants').as('P');
          //qb.whereRaw('to_tsvector(plant.description) @@ to_tsquery(?)', params);
          //return await qb.select('plant.id', 'genus', 'species', 'description');
      })
      .fetchAll();
    return results;
  },

};

module.exports = searchController;
