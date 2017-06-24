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
