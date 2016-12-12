
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