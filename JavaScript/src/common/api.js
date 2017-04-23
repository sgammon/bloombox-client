
/**
 * Bloombox - Common - API Tools
 *
 * @fileoverview JavaScript RPC layer.
 * @author sam@momentum.io (Sam Gammon)
 */

/*global goog */
goog.provide('bloombox.common.api');
goog.require('bloombox.common.logging');


/**
 * API domain prefix.
 *
 * @const {string}
 */
var apiDomain =
    ('https://api.bloombox.io');


/**
 * Prepare and send a Remote Procedure Call, given a particular
 * API service, method, and invocation details.
 *
 * Two callback opportunities are required, in `Promise`-style
 * form.
 *
 * @param {string} api Name of the API service we are invoking.
 * @param {string} methodName Name of the API method we are invoking.
 * @param {?} props Positional properties to apply.
 * @param {?Object} payload Body payload to apply.
 * @return {Promise} Prepared object ready to fulfill the RPC.
 */
function prepare(api, methodName, props, payload) {
  var apiClient = window['gapi']['client'][api];
  var method = apiClient[methodName];

  if (!payload)
    return method(props);
  return method(props, payload);
}


/**
 * Discover an APIs structure by loading its JSON REST/RPC specs.
 *
 * @param {string} api Name of the API service we are invoking.
 * @param {string} version Version of the API service we are discovering.
 * @return {Promise} Prepared object ready to fulfill the RPC.
 */
function discover(api, version) {
  var gapi = window['gapi'];
  return gapi['client']['load']([
    apiDomain, 'discovery/v1/apis', api, version, 'rest'].join('/'));
}



/**
 * Represents a Remote Procedure Call, with all requisite info
 * attached to invoke and continue with a success or error
 * dispatch.
 *
 * @public
 * @param {string} api Name of the API service we are using.
 * @param {string} method Name of the API method to invoke.
 * @param {Object} props Positional arguments to send.
 * @param {?Object=} opt_payload Method payload body to send.
 * @this {RPC}
 * @constructor
 */
function RPC(api, method, props, opt_payload) {
  this.api = api;
  this.method = method;
  this.props = props || {};
  this.payload = opt_payload || null;
  this.promise = prepare(api, method, props, this.payload);
}


/**
 * Execute the given RPC.
 *
 * @export
 * @param {function(?Object)} cbk Completion callback.
 * @param {function(?string)} err Error callback.
 * @this {RPC}
 * @return {Promise} self, for chaining.
 */
RPC.prototype.then = (function(cbk, err) {
  var that = this;
  this.promise.then(function(response) {
    // we got a valid response of some kind
    if (response !== null && response['status'] === 200) {
      Logging['say'](
          'API',
          'Received response for RPC.',
          {rpc: that, response: response});
      cbk(response);

      //noinspection UnnecessaryReturnStatementJS
      return;
    } else {
      Logging['error'](
          'API',
          'Received empty or invalid response for RPC.',
          {rpc: that, response: response});
      err(null);

      //noinspection UnnecessaryReturnStatementJS
      return;
    }
  }, function(reason) {
    // we got an error
    Logging['error'](
        'API',
        'Received error response for RPC.',
        {rpc: that, reason: reason});
    err(/** @type {?string} **/ (reason));

    //noinspection UnnecessaryReturnStatementJS
    return;
  });

  return this.promise;
});


/** -- exports -- **/
window['RPC'] = RPC;
