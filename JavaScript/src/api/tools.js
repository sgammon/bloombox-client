
/**
 * Bloombox API: Tools
 *
 * @fileoverview Provides tools for loading APIs.
 */

/*global goog */
goog.provide('bloombox.api.tools');
goog.require('bloombox.common.logging');


/**
 * Global link to the Google Client API JS.
 *
 * @const {string}
 */
var clientAPIScript =
    ('https://apis.google.com/js/client.js');


/**
 * Check for the Google Client JS API, or re-dispatch if it
 * is not yet ready.
 *
 * @private
 * @param {function()} callback Callback function to dispatch, once loaded.
 * @return {function()} Prepared callback-accepting function.
 */
function _checkClientAndContinue(callback) {
  return (function() {
    var gapi = window['gapi'];
    /* istanbul ignore if  */
    if ('client' in gapi) {
      callback();
    } else {
      setTimeout(_checkClientAndContinue(callback), 0);
    }
  });
};


/**
 * Setup access to the Google Client JS API.
 *
 * @param {function()} callback Callback function to dispatch, once loaded.
 */
function setupAPIClient(callback) {
  /* istanbul ignore if  */
  if ('gapi' in window && 'client' in window['gapi'])
    return callback();

  // we don't have support - load up components, then bootstrap after that
  Logging['say']('Bloombox:API', 'Loading Google Client API.');
  var e = document.createElement('script');
  e.async = true;
  e.defer = true;
  e.src = clientAPIScript;
  e.addEventListener('load', _checkClientAndContinue(callback));
  document.body.appendChild(e);
};
