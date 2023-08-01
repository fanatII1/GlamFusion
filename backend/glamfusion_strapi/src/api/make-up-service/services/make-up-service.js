'use strict';

/**
 * make-up-service service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::make-up-service.make-up-service');
