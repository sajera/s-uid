/**
 * s-uid    
 * MIT License Copyright (c) 2016 Serhii Perekhrest <allsajera@gmail.com> ( Sajera )    
 */
(function () {'use strict';
/**
 * generate a random string by base
 *
 * @param: { String } - [option] base for uid
 * @returns: { String }
 */
function uid ( base ) {
    // check data type
    base = typeof base == 'string' ? base : (!uid.DEBUG ? 'XXXXXXXX-XXXX-1XXX-1XXX-XXXXXXXXXXXX' :
        ( (function(){ throw new Error('Wrong data type of base for uid generate: '+base); })()));
    // generate from base
    return base.replace(/[X|S|N|H]/g, function ( s ) {
        return (
            s == 'X' ? Math.random()*32|0 :
            s == 'N' ? Math.random()*10|0 :
            s == 'H' ? Math.random()*16|0 :
            /*s == 'S'*/Math.random()*32|10
        ).toString(32);
    });
};


var ts = Number.prototype.toString;
function to ( val, len ) {
    val = val.toString();
    while ( val.toString().length < len ) val = '0'+val;
    return val;
}

/**
 * hash based on time in 36 numerical system by default
 *
 * @param base: { Number } - [option] expect 2-36 (36)
 * @param time: { Object } - [option] expect new Date()
 * @returns: { String } - hash
 */
uid['th'] = function ( base, time ) {
    return ts.call(
        (time instanceof Date ? time : new Date).valueOf(),
        typeof base == 'number' && base > 0 ? base%37 : 36
    );
}

/**
 * humanized time stamp
 *
 * @param sep: { String } - expect '-'
 * @param time: { Object } - expect new Date()
 * @returns: { String }
 */
uid['_date'] = _date;
function _date ( sep, date ) { return to(date.getFullYear(),4)+sep+to(date.getMonth(),2)+sep+to(date.getDate(),2); };
uid['_time'] = _time; 
function _time ( sep, date ) { return to(date.getHours(),2)+sep+to(date.getMinutes(),2); }
/**
 * slowest humanized time stamp with checks
 *
 * @param sep1: { String } - [option] expect '-'
 * @param sep2: { String } - [option] expect ':'
 * @param time: { Object } - [option] expect new Date()
 * @returns: { String }
 */
uid['time'] = function ( sep1, sep2, time ) {
    time = time instanceof Date ? time : new Date;
    sep1 = typeof sep1 == 'string'? sep1 : '-';
    sep2 = typeof sep2 == 'string'? sep2 : ':';
    return _date(sep1, time)+sep1+_time(sep2, time);
}
/**
 * generate uuid
 * xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
 *
 * @param M: { String } - [option] 
 * @param N: { String } - [option] 
 * @param time: { Object } - [option] expect new Date()
 * @returns: { Object }
 */
uid['guid'] = guid;
function guid ( M, N, time ) {
    time = time instanceof Date ? time : new Date;
    M = typeof M == 'string' && M.length == 1 ? M : uid('S');
    N = typeof N == 'string' && N.length == 1 ? N : uid('N');
    return ts.call(time.valueOf(), 36)+'-'+
        ts.call((''+time.getFullYear()+time.getMonth())*1, 36)+'-'+
        M+ts.call((''+time.getDay()+time.getHours()+time.getMinutes())*1, 36)+'-'+
        N+ts.call((''+time.getSeconds()+time.getMilliseconds())*1, 36)+'-'+
        uid('XXXXXXXXXXXX');
}
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

})() 