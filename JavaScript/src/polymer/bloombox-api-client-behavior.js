
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
 * `BloomboxAPIClientBehavior` provides access to common API client
 * logic for the Bloombox API Client for JavaScript.
 *
 * Using this behavior, any implementing component can integrate
 * with the Bloombox API with builtin methods to load the library,
 * formulate RPCs, and fulfill them against Bloombox-powered
 * services.
 *
 * @polymerBehavior
 */
var BloomboxAPIClientBehavior = {
  properties: {
    /**
     * Bloombox API Client for JavaScript. Once the library has
     * downloaded and executed, it will mount a global reference to
     * itself here, so that components may easily access it.
     *
     * @type {BloomboxAPIClient}
     */
    bloombox: {
      type: Object,
      notify: false,
      reflectToAttribute: false
    }
  }
};

// export to window
window['BloomboxAPIClientBehavior'] = BloomboxAPIClientBehavior;
