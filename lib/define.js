/**
 * EXPORTS
 *
 * @public
 */
if ( typeof process != 'undefined' && Object.prototype.toString.call(process) == '[object process]' ) {
    module.exports = uid;
}
if ( typeof window != 'undefined' && Object.prototype.toString.call(window) == '[object Window]' ) {
    window['uid'] = uid;
}
