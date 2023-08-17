'use strict';

/**
 * bserv service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::bserv.bserv');
