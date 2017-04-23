
/**
 * Bloombox
 *
 * @fileoverview Provides boilerplate logic shared by all public JS modules.
 *
 * @license Private source code, all rights reserved.
 * @preserve Copyright 2017, Momentum Ideas Co.
 */

/*global goog */
goog.provide('bloombox.common');


/**
 * Global debug flag.
 *
 * @define {boolean} Global switch for logging and other debug features.
 * @public
 */
var DEBUG = true;


/** -- exports -- **/
window['__debug__'] = window['__debug'] = DEBUG;
