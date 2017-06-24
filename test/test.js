/*
* Unit tests for s-uid.min.js
*/
var uid = require('../s-uid.min.js');

// require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;

function timeGuid ( key ) {
    var x = (key = key || 100);
    var time = new Date;
    console.time('uid.guid count: '+x);
    while (key--) uid.guid('Q', null, time)
    console.timeEnd('uid.guid count: '+x);
}

/**
 * indexOf work very slow with gigantic array
 * this is a reason why i create many arrays to matching unique
 * It's amazing, but it works much faster
 * @param: { String } uniq - Value to be checked for uniqueness
 * @param: { Array } store - array with arrays with values to be compared
 * @returns { Boolean }
 * @function
 * @public
 */
function customMatching ( uniq, store ) {
    for ( var arr of store ) {
        if ( arr.indexOf(uniq) > -1 ) return true;
    }
    if ( store[store.length-1].length < 100 ) {
        store[store.length-1].push(uniq);
    } else {
        store.push([uniq]);
    }
    return false;
}

describe('TESTS', function () {

    // before(function() { console.log('before'); });
    // after(function() { console.log('after'); });

    // beforeEach(function() { console.log('beforeEach'); });
    // afterEach(function() { console.log('afterEach'); });

    describe('uid() case default base', function () {

        it('simple data types', function () {
            assert.isString(uid(), 'must be a string');
            assert.equal(uid().length, '36', 'lenght of default base must be 36');
            assert.equal(uid().split('-').length, '5', 'default base Consists of 5 parts');
        });

        it('uid log time of creation 10 000 uids', function () {
            var key = 10*1000;
            console.time('uid case default base: 10 000');
            while (key--) uid();
            console.timeEnd('uid case default base: 10 000');
        });

        it('uid matches 10 000 uids', function () {
            var key = 10*1000;
            var storeUid = [[]];
            while ( key-- ) {
                assert.isNotTrue(
                    customMatching(uid(), storeUid),
                    'match found on '+key+' item !'
                );
            }
        });
    });

    describe('uid("XXX-4NNN-dummy-SSS") case custom base', function () {

        it('simple data types', function () {
            assert.isString(uid('XXX-4NNN-dummy-SSS'), 'must be a string');
            assert.equal(uid('XXX-4NNN-dummy-SSS').length, '18', 'lenght of custom base must be 18');
            assert.equal(uid('XXX-4NNN-dummy-SSS').split('-').length, '4', 'custom base Consists of 4 parts');
        });

        it('uid log time of creation 10 000 uids', function () {
            var key = 10*1000;
            console.time('uid case XXX-4NNN-dummy-SSS base: 10 000');
            while (key--) uid('XXX-4NNN-dummy-SSS');
            console.timeEnd('uid case XXX-4NNN-dummy-SSS base: 10 000');
        });

        it('uid matches 10 000 uids', function () {
            var key = 10*1000;
            var storeUid = [[]];
            while ( key-- ) {
                assert.isNotTrue(
                    customMatching(uid('XXX-4NNN-dummy-SSS'), storeUid),
                    'match found on '+key+' item !'
                );
            }
        });
    });

    describe('uid.guid() default', function () {

        it('simple data types', function () {
            assert.isString(uid.guid(), 'must be a string');
            assert.equal(uid.guid().split('-').length, '5', 'default base Consists of 5 parts');
        });

        it('uid.guid log time of creation 10 000 guids', function () {
            var key = 10*1000;
            console.time('uid.guid case default 10 000');
            while (key--) uid.guid();
            console.timeEnd('uid.guid case default 10 000');
        });

        it('uid.guid matches 10 000 uids based on one time', function () {
            // iven fast match its to long for "chai"
            this.timeout(10*1000);
            var key = 10*1000;
            var time = new Date();
            var storeGuid = [[]];
            while ( key-- ) {
                assert.isNotTrue(
                    customMatching(uid.guid(null, null, time), storeGuid),
                    'match found on '+key+' item !'
                );
            }
        });

    });

    describe('uid.time()', function () {

        it('default simple data types', function () {
            assert.isString(uid.time(), 'must be a string');
            assert.equal(uid.time().length, '16', 'lenght of time must be 16');
        });

        it('based on July 21, 1983 01:15:00', function () {
            assert.equal(
                uid.time(new Date('July 21, 1983 01:15:00'),'_','_','_'),
                '1983_06_21_01_15',
                'parse error'
            );
        });

    });

    describe('uid.th()', function () {

        it('default simple data types', function () {
            assert.isString(uid.th(), 'must be a string');
        });

        it('based on July 21, 1983 01:15:00', function () {
            assert.equal(
                uid.th(new Date('July 21, 1983 01:15:00'), 2),
                '110001110001110001100000110101010100000',
                'convert error on 2 bit'
            );
            assert.equal(
                uid.th(new Date('July 21, 1983 01:15:00'), 4),
                '12032032030012222200',
                'convert error on 4 bit'
            );
            assert.equal(
                uid.th(new Date('July 21, 1983 01:15:00'), 10),
                '427587300000',
                'convert error on 10 bit'
            );
            assert.equal(
                uid.th(new Date('July 21, 1983 01:15:00'), 18),
                '22e7a704g0',
                'convert error on 18 bit'
            );
            assert.equal(
                uid.th(new Date('July 21, 1983 01:15:00'), 36),
                '5gfifs80',
                'convert error on 36 bit'
            );
        });

    });

});
