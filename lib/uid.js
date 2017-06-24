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
