'use strict';

/**
 * braiding-service service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::braiding-service.braiding-service');
