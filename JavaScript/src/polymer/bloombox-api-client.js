/*
 * Copyright © 2017, Momentum Ideas Co. All rights reserved.
 *
 * Source program code in this file and package are proprietary
 * Intellectual Property (IP) of Momentum Ideas, Co Unauthorized
 * reproduction, duplication, compilation, or publication of this
 * code are prohibited without prior written consent from a
 * duly-authorized officer of Momentum Ideas, Co.
 */


//noinspection JSValidateTypes
/**
 * `<bloombox-api-client>`
 *
 * @this {!PolymerElement}
 */
var BloomboxAPIClientElement = Polymer({
  is: 'bloombox-api-client',

  properties: {
    /**
     * Partner API key, which can be obtained by logging into the
     * Bloombox Dashboard and navigating to "Settings."
     *
     * @type {string}
     */
    apiKey: {
      type: String,
      notify: true
    },

    /**
     * Partner ID/shortcode, which can be obtained by logging into
     * the Bloombox Dashboard and navigating to "Settings." This is
     * also listed in nearly every URL.
     *
     * @type {string}
     */
    partner: {
      type: String,
      notify: true
    },

    /**
     * Location ID/shortcode, which can be obtained by logging into
     * the Bloombox Dashboard, navigating to the location in question
     * under the "Menu Manager" tab, and clicking the "Settings"
     * button in the top-left.
     *
     * @type {string}
     */
    location: {
      type: String,
      notify: true
    }
  }
});

// export to window
window['BloomboxAPIClientElement'] = BloomboxAPIClientElement;
