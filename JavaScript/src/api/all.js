
/*
 * Copyright © 2017, Momentum Ideas Co. All rights reserved.
 *
 * Source program code in this file and package are proprietary
 * Intellectual Property (IP) of Momentum Ideas, Co Unauthorized
 * reproduction, duplication, compilation, or publication of this
 * code are prohibited without prior written consent from a
 * duly-authorized officer of Momentum Ideas, Co.
 */

/**
 * Bloombox - API - All Services
 *
 * @fileoverview Loads all supported services.
 * @author sam@momentum.io (Sam Gammon)
 */

/*global goog */
goog.provide('bloombox.api.all');
goog.require('bloombox.api.embed');


/** - exports - **/
var BloomboxAPI = {
  'list': [[EmbedAPI.serviceName, EmbedAPI.serviceVersion]],
  'EmbedAPI': EmbedAPI
};
