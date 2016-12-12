
console.log('test');
var uid = require('./uid.min.js');

function matchGuid ( key ) {
    key = key || 100;
    var time = new Date;
    var tmp;
    var examples = [];
    for ( ; key > examples.length; ) {
        tmp = uid.guid('Q', null, time);
        if ( examples.indexOf(tmp) > -1 ) {
            throw new Error('match ID at '+examples.length+' => '+tmp);
            break;
        }
        examples.push( tmp );
    }
    console.log('at one time '+key+' id without match');
}

function timeUid ( key ) {
    var x = (key = key || 100);
    console.time('uid count: '+x);
    while (key--) uid();
    console.timeEnd('uid count: '+x);
}
function timeGuid ( key ) {
    var x = (key = key || 100);
    var time = new Date;
    console.time('uid.guid count: '+x);
    while (key--) uid.guid('Q', null, time)
    console.timeEnd('uid.guid count: '+x);
}

var browser;
if ( browser = typeof window != 'undefined' ) {
    window.uid = uid;
    (function ( count ) {
        timeUid(count);
        timeGuid(count);
        matchGuid(count);
    })(1*1000); // careful indexOf is hard to find matches in big array (many times)
}
var max = 40;
var low = 40;
function red ( text ) {
    if (browser) return text;
    return '\x1B[0m\x1B[41m'+text+'\x1B[49m\x1B[0m';
}
function green ( text ) {
    if (browser) return text;
    return '\x1B[0m\x1B[42m'+text+'\x1B[49m\x1B[0m';
}
function yellow ( text ) {
    if (browser) return text;
    return '\x1B[0m\x1B[43m'+text+'\x1B[49m\x1B[0m';
}
function delimiter ( length ) {
    var list = [];
    list[length] = '';
    return list.join('-');
};
function td ( str, len ) {
    str = str.length % 2 == 0 ? str : str+' ';
    var list = [];
    list[(len - str.length)/2] = '';
    return list.join(' ')+str+list.join(' ');
};
function table ( name, methods, testData ) {
    var line = delimiter(max+1+(methods.length*(low+1)));
    // make first headers row
    var table = yellow(td(name, max))+'|';
    for ( var method of methods ) table += td(method.replace(/[\(]/g,''), low)+'|';
    // data result rows    
    for (var field in testData ) {
        table+='\n'+line;
        table+=('\n'+td(field, max)+'|');
        for ( var method of methods ) {
            try {
                var res = eval(method+testData[field]+')');
            } catch ( e ) { var res = 'ERROR'; };
            table += res ? green(td(res.toString(), low))+'|' : red(td(res.toString(), low))+'|';
        }
    }
    return line+'\n'+table+'\n'+line;
};
// write tables
console.log(table('S-UID',
    [
        'uid('
    ], {
        'undefined'             : '',
        'String  ""'            : '',
        'NNNNNN'                : '\'NNNNNN\'',
        'HHHHHH'                : '\'HHHHHH\'',
        'SSSSSS'                : '\'SSSSSS\'',
        'XXXXXX'                : '\'XXXXXX\'',
        'XXX-4NNN-dummy-SSS'    : '\'XXX-4NNN-dummy-SSS\'',
        'Super-XXX-NNN-HHH-SSS' : '\'Super-XXX-NNN-HHH-SSS\'',
    }),
'\n');

console.log(table('S-UID time based hash',
    [
        'uid.th('
    ], {
        'undefined'             : '',
        'String  ""'            : '',
        'Number  0'             : '0',
        'Number 10'             : '10',
        'Number 16'             : '16',
        'Number 32'             : '32',
        'Number 36'             : '36',
    }),
'\n');

console.log(table('S-UID time humanized',
    [
        'uid.time('
    ], {
        'undefined'             : '',
        'String  ""'            : '',
        '("-",":")'             : '"-",":"',
        '("_","_")'             : '"_","_"',
        '("",":")'              : '"",":"',
        '("&","&")'             : '"&","&"',
    }),
'\n');

console.log(table('S-UID guid',
    [
        'uid.guid('
    ], {
        'undefined'             : '',
        'String  ""'            : '',
        '("M","N")'             : '"M","N"',
        '("V","")'              : '"V",""',
        '("","N")'              : '"","N"',
        '("2","4")'             : '"&","&"',
    }),
'\n');