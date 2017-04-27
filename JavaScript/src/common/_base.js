
/*
 * Copyright © 2017, Momentum Ideas Co. All rights reserved.
 *
 * Source program code in this file and package are proprietary
 * Intellectual Property (IP) of Momentum Ideas, Co Unauthorized
 * reproduction, duplication, compilation, or publication of this
 * code are prohibited without prior written consent from a
 * duly-authorized officer of Momentum Ideas, Co.
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
