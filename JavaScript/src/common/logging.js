
/**
 * Bloombox - Common - Logging
 *
 * @fileoverview Provides basic logging in pure JS modules.
 * @author sam@momentum.io (Sam Gammon)
 */

/*global goog */
goog.provide('bloombox.common.logging');


/** -- imports -- **/
goog.require('bloombox.common');


/**
 * Enumerates log severities.
 *
 * @public
 * @enum {number}
 */
var Severity = {
  VERBOSE: -1,
  INFO: 0,
  WARNING: 1,
  ERROR: 2,
  SEVERE: 3
};


/**
 * Format a log message to be sent to the console.
 *
 * @param {string} module The module reporting the subject log message.
 * @param {...*} var_args The message that the module wishes to report.
 * @private
 * @return {string} Formatted log line string.
 */
function _formatLogForConsole(module, var_args) {
  return '[' + module + ']: ' + var_args;
}


/**
 * Output a message to the console. If you pass `true` for `important`,
 * `console.info` is used instead of `console.log`.
 *
 * @param {Severity} severity The severity of the log message to send.
 * @param {string} module The module reporting the subject log message.
 * @param {Array<string>} messages The message that the module wishes to report.
 * @private
 */
function _sendLog(severity, module, messages) {
  var formattedLog = _formatLogForConsole(module, messages[0]);
  var items = [formattedLog].concat(messages.slice(1));

  switch (severity) {
    case 0: console.info.apply(console, items); break;
    case 1: console.warn.apply(console, items); break;
    case 2:  //noinspection ES6ModulesDependencies
      console.error.apply(console, items); break;
    case 3:  //noinspection ES6ModulesDependencies
      console.error.apply(console, items); break;
    default:  //noinspection ES6ModulesDependencies
      console.log.apply(console, items); break;
  }
}


/**
 * Output a message to the console. If you pass `true` for `important`,
 * `console.info` is used instead of `console.log`.
 *
 * @public
 * @param {string} module The module reporting the subject log message.
 * @param {...*} var_args Contextually-relevant items to output.
 */
function say(module, var_args) {
  if (DEBUG) {
    _sendLog(Severity.VERBOSE, module, [/** @type {string} **/ (var_args)]);
  }
}


//noinspection JSUnusedGlobalSymbols
/**
 * Output an important, but not severe, message to the console.
 *
 * @public
 * @param {string} module The module reporting the subject log message.
 * @param {...*} var_args Message to report.
 */
function info(module, var_args) {
  _sendLog(Severity.INFO, module, [/** @type {string} **/ (var_args)]);
}


//noinspection JSUnusedGlobalSymbols
/**
 * Output a warning message to the console.
 *
 * @public
 * @param {string} module The module reporting the subject log message.
 * @param {...*} var_args Message to report.
 */
function warn(module, var_args) {
  _sendLog(Severity.WARNING, module, [/** @type {string} **/ (var_args)]);
}


//noinspection JSUnusedGlobalSymbols
/**
 * Output an error message to the console.
 *
 * @public
 * @param {string} module The module reporting the subject log message.
 * @param {...*} var_args Message to report.
 */
function error(module, var_args) {
  _sendLog(Severity.ERROR, module, [/** @type {string} **/ (var_args)]);
}


//noinspection JSUnusedGlobalSymbols
/**
 * Output a severe, or fatal, error message to the console.
 *
 * @public
 * @param {string} module The module reporting the subject log message.
 * @param {...*} var_args Message to report.
 */
function severe(module, var_args) {
  _sendLog(Severity.SEVERE, module, [/** @type {string} **/ (var_args)]);
}


//noinspection JSUnusedGlobalSymbols
/**
 * Central logging object, for easy access to logging methods.
 *
 * @public
 * @type {?}
 */
var Logging = {
  'say': say,
  'info': info,
  'warn': warn,
  'error': error,
  'severe': severe
};


/** -- exports -- **/
window['Logging'] = Logging;
