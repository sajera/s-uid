/**
 * @description
    defination on platforms (both variants on platform like Electron)

    bower i --save s-uid

    npm i --save s-uid

 * @example window.uid || window['s-uid'] // in browser
 * @example var uid = require('s-uid')    // in Node.js
 *
 * @exports s-uid
 * @publick
 */
if ( typeof process != 'undefined' && Object.prototype.toString.call(process) == '[object process]' ) {
    module.exports = uid;
}
if ( typeof window != 'undefined' && Object.prototype.toString.call(window) == '[object Window]' ) {
    window['uid'] = window['s-uid'] = uid;
}
