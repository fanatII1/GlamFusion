'use strict';

/**
 * store-service router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::store-service.store-service');
