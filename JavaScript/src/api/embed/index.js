
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
 * Bloombox - API - Embed Service
 *
 * @fileoverview Provides access to the Embed API via JS.
 * @author sam@momentum.io (Sam Gammon)
 */

/*global goog */
goog.provide('bloombox.api.embed');
goog.require('bloombox.common.api');



/**
 * Represents an RPC call to the Embedded Menu API.
 *
 * @public
 * @param {string} apikey API key.
 * @param {string} partner Name of the partner we're embedding for.
 * @param {string} location Name of the location we're embedding for.
 * @param {?string} style View style for the given menu.
 * @this {EmbeddedMenu}
 * @constructor
 */
function EmbeddedMenu(apikey, partner, location, style) {
  //noinspection JSUnusedGlobalSymbols
  this.apikey = apikey;
  this.partner = partner;
  this.location = location;
  this.style = style ? style : 'MASTER_ONLY';
  this.dataRPC = prepare('embed', 'data', {
    'partner': partner,
    'location': location
  }, null);
  this.viewRPC = prepare('embed', 'view', {
    'partner': this.partner,
    'location': this.location,
    'style': this.style
  }, null);
}


/**
 * Fetch data for the specified Embedded Menu.
 *
 * @export
 * @param {function(?Object)} cbk Completion callback.
 * @param {function(?string)} err Error callback.
 * @this {EmbeddedMenu}
 * @return {Promise} self, for chaining.
 */
EmbeddedMenu.prototype.data = (function(cbk, err) {
  'use strict';
  this.dataRPC.then(function(response) {
    return cbk(/** @type {?Object} **/ (response));
  }, function(reason) {
    return err(/** @type {?string} **/ (reason));
  });
  return this.dataRPC;
});


/**
 * Fetch view information for the specified Embedded Menu.
 *
 * @export
 * @param {function(?Object)} cbk Completion callback.
 * @param {function(?string)} err Error callback.
 * @this {EmbeddedMenu}
 * @return {Promise} self, for chaining.
 */
EmbeddedMenu.prototype.view = (function(cbk, err) {
  'use strict';
  this.viewRPC.then(function(response) {
    return cbk(/** @type {?Object} **/ (response));
  }, function(reason) {
    return err(/** @type {?string} **/ (reason));
  });
  return this.viewRPC;
});



/**
 * Represents an instance of the Embed API, with a given developer
 * API key.
 *
 * @public
 * @param {string} key API key to use.
 * @constructor
 */
function EmbedAPI(key) {
  'use strict';
  this.key = key;
  window['gapi']['client']['init']({'apiKey': key});
}


/**
 * Service name for the Embed API.
 *
 * @const {string}
 */
EmbedAPI.serviceName = 'embed';


/**
 * Service version for the Embed API.
 *
 * @const {string}
 */
EmbedAPI.serviceVersion = 'v1';


/**
 * Fetch menu data for an embedded menu.
 *
 * @public
 * @param {string} partner Partner ID for menu to be fetched.
 * @param {string} location Location ID for menu to be fetched.
 * @param {function(?Object)} cbk Completion callback.
 * @param {function(?string)} err Error callback.
 * @this {EmbedAPI}
 * @return {Promise} API RPC promise.
 */
EmbedAPI.prototype['data'] = function(partner, location, cbk, err) {
  'use strict';
  var op = new EmbeddedMenu(this.key, partner, location, null);
  return op.data(cbk, err);
};


/**
 * Fetch view metadata for an embedded menu.
 *
 * @public
 * @param {string} partner Partner ID for menu to be fetched.
 * @param {string} location Location ID for menu to be fetched.
 * @param {function(?Object)} cbk Completion callback.
 * @param {function(?string)} err Error callback.
 * @param {?string} style View style for the given menu.
 * @this {EmbedAPI}
 * @return {Promise} API RPC promise.
 */
EmbedAPI.prototype['view'] = function(partner, location, cbk, err, style) {
  'use strict';
  var op = new EmbeddedMenu(this.key, partner, location, style);
  return op.view(cbk, err);
};
