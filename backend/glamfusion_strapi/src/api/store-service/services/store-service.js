'use strict';

/**
 * store-service service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::store-service.store-service');
