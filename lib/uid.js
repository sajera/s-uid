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
