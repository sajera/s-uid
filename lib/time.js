
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
