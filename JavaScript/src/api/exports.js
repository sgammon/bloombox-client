
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
 * Bloombox - API - Exports
 *
 * @fileoverview Mounts resources in the local window.
 * @author sam@momentum.io (Sam Gammon)
 */

goog.require('bloombox.api.all');
goog.require('bloombox.api.client');
goog.require('bloombox.common.api');
goog.require('bloombox.common.logging');


/** - exports - **/
window['BloomboxAPI'] = BloomboxAPI;
window['BloomboxAPIClient'] = BloomboxAPIClient;
window['RPC'] = RPC;
window['Logging'] = Logging;
