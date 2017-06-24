/*
 * s-uid version 1.3.1 at 2017-06-24    
 * @license MIT License Copyright (c) 2016 Serhii Perekhrest <allsajera@gmail.com> ( Sajera )    
 */
/** @ignore */
(function () {'use strict';
/**
 * @description
    generate random id based on template string.
    Default template string is 'xxxxxxxx-xxxx-1xxx-1xxx-xxxxxxxxxxxx'.

    >Template rules very simple:

    >**base** - it's a string for creating id. Rewrite only special characters

    >**N** - Rewrite to random Number

    >**H** - Rewrite to random hex numder

    >**S** - Rewrite to random english symbol

    >**X** - Rewrite to any from "N","H","S"

 * @example
    uid();
    uid('XXX-4NNN-dummy-SSS');

 * @param { String } [base]:[default: 'XXXXXXXX-XXXX-1XXX-1XXX-XXXXXXXXXXXX']
 * @returns { String }
 * @function uid
 * @publick
 */
function uid ( base ) {
    // check data type
    base = typeof base == 'string' ? base
        : (!uid.DEBUG ? 'XXXXXXXX-XXXX-1XXX-1XXX-XXXXXXXXXXXX'
        : ( (function(){ throw new Error('Wrong data type of base for uid generate: '+base); })()));
    // generate from base
    return base.replace(/[X|S|N|H]/g, function ( s ) {
        return (
            s == 'X' ? Math.random()*32|0
            : s == 'N' ? Math.random()*10|0
            : s == 'H' ? Math.random()*16|0
            : /*s == 'S'*/Math.random()*32|10
        ).toString(32);
    });
};


/**
 * method of converting number to string with static length
 * if number does not have enough length add '0' in to begin of string
 * @param { Number } val - any number
 * @param { Number } len - expected min length
 * @returns { String }
 * @function uid._time
 * @private
 */
function to ( val, len ) {
    val = val.toString();
    while ( val.toString().length < len ) val = '0'+val;
    return val;
};

/**
 * Humanized date string.
 * This method is very sensitive to the correctness of the input arguments
 * @example
    uid._date('-', new Date() );

 * @param { String } separator - Separator character for output
 * @param { Date } date - instance of Date constructor
 * @returns { String }
 * @function uid._date
 * @public
 */
uid['_date'] = _date;
function _date ( separator, date ) {
    return to(date.getFullYear(),4)
        +separator+to(date.getMonth(),2)
        +separator+to(date.getDate(),2);
};

/**
 * Humanized time string.
 * This method is very sensitive to the correctness of the input arguments
 * @example
    uid._time('-', new Date() );

 * @param { String } separator - Separator character for output
 * @param { Date } date - instance of Date constructor
 * @returns { String }
 * @function uid._time
 * @public
 */
uid['_time'] = _time;
function _time ( sep, date ) { return to(date.getHours(),2)+sep+to(date.getMinutes(),2); };

/**
 * Humanized date+time string. Safe method.
 *
 * @example
    uid.time();
    uid.time( new Date() );
    uid.time( new Date(), '-', ':', '-');

 * @param { Date } [date]:[default: new Date()] - instance of Date constructor
 * @param { String } [separator1]:[default: ' - '] - Separator character for output date
 * @param { String } [separator2]:[default: ' \s '] - Separator character for output bitwin date and time
 * @param { String } [separator3]:[default: ' : '] - Separator character for output time
 * @returns { String }
 * @function uid.time
 * @public
 */
uid['time'] = function ( time, separator1, separator2, separator3 ) {
    time = time instanceof Date ? time : new Date;
    separator1 = typeof separator1 == 'string'? separator1 : '-';
    separator2 = typeof separator2 == 'string'? separator2 : ' ';
    separator3 = typeof separator3 == 'string'? separator3 : ':';
    return _date(separator1, time)+separator2+_time(separator3, time);
};

/**
 * hash based on time in 36 numerical system by default
 *
 * @example
    uid.th();
    uid.th(null, 4);
    uid.th(new Date(), 10);

 * @param { Date } [date]:[default: new Date()] - instance of Date constructor
 * @param { Number } - [bit]:[default:  36] - expect number 2-36
 * @returns { String } - hash string
 * @function uid.th
 * @public
 */
var ts = Number.prototype.toString;
uid['th'] = function ( time, bit ) {
    return ts.call(
        (time instanceof Date ? time : new Date).valueOf(),
        typeof bit == 'number' && bit >= 2 && bit <= 36 ? bit : 36
    );
};

/**
 * @description
    generate uuid (xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx)
    based on time, reserved characters and random symbols

 * @example
    uid.guid();
    uid.guid('M', 0, new Date() );

 * @param { String } [M] [default: random english symbol ( uid('S') )]
 * @param { String } [N] [default: random number ( uid('N') )]
 * @param { Date } [time] [default: new Date()] - date of guid generation
 * @returns { String }
 * @function uid.guid
 * @publick
 */
uid['guid'] = guid;
function guid ( M, N, time ) {
    time = time instanceof Date ? time : new Date;
    M = typeof M == 'string' && M.length == 1 ? M : uid('S');
    N = typeof N == 'string' && N.length == 1 ? N : uid('N');
    return ts.call(time.valueOf(), 36)
        +'-'+ts.call((''+time.getFullYear()+time.getMonth())*1, 36)
        +'-'+M+ts.call((''+time.getDay()+time.getHours()+time.getMinutes())*1, 36)
        +'-'+N+ts.call((''+time.getSeconds()+time.getMilliseconds())*1, 36)
        +'-'+uid('XXXXXXXXXXXX');
}

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

})() 