
/**
 * Bloombox - Common - API Tools
 *
 * @fileoverview JavaScript RPC layer.
 * @author sam@momentum.io (Sam Gammon)
 */

/*global goog */
goog.require('bloombox.api.client.embed');
goog.require('bloombox.api.tools');
goog.require('bloombox.common.logging');


/** - exports - **/
window['BloomboxAPI'] = {
  'list': [[EmbedAPI.serviceName, EmbedAPI.serviceVersion]],
  'EmbedAPI': EmbedAPI
};

setupAPIClient(function() {
  Logging['say']('Bloombox:API', 'Loading discovery documents...',
      window['BloomboxAPI']['list']);

  var promises = [];

  for (var i in window['BloomboxAPI']['list']) {
    let innerAPIService = window['BloomboxAPI']['list'][i][0];
    let innerAPIVersion = window['BloomboxAPI']['list'][i][1];

    promises.push(discover(innerAPIService, innerAPIVersion).then(function() {
      Logging['say']('Bloombox:API:' +
          (innerAPIService.charAt(0).toUpperCase() + innerAPIService.slice(1)),
          "Loaded API service '" +
          innerAPIService + ':' +
          innerAPIVersion + '.');
    }));
  }

  Promise.all(promises).then(function() {
    // all of our APIs are discovered
    Logging['say']('Bloombox:API',
        'All APIs are loaded and ready.');

    if ('gapi' in window &&
        'client' in window['gapi'] &&
        'BloomboxAPI' in window) {
      if ('bloomboxAPIReady' in window)
        window['bloomboxAPIReady'](window['BloomboxAPI']);
    }
  });
});
