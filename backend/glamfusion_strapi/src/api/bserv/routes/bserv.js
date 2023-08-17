'use strict';

/**
 * bserv router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::bserv.bserv');
