'use strict';

/**
 * barbers-store service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::barbers-store.barbers-store');
