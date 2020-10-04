'use strict';
const { sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findOne: async ctx => {
    const { id } = ctx.params;
    const entity = await strapi.services.vernacular.findOne(
      { id },
      ['plants', 'plants.genus', 'plants.species']
    );
    return sanitizeEntity(entity, { model: strapi.models.vernacular });
  }
};
