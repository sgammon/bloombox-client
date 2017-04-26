
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
 * Bloombox - API - Client
 *
 * @fileoverview Provides the top-level API client object.
 */

/*global goog */
goog.provide('bloombox.api.client');
goog.require('bloombox.api.all');



/**
 * Construct a new API Client object, which exposes builtin services
 * and holds onto details like the current API key.
 *
 * @param {string} apikey Active API key.
 * @this {BloomboxAPIClient}
 * @constructor
 */
function BloomboxAPIClient(apikey) {
  'use strict';
  this.apikey = apikey;
}
