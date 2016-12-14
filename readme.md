
[![NPM version][npm-image]][npm-url] [![License][license-image]][license-url]

s-uid
===============
An easy way to generate id

# s-uid

**Let me introduce a simple way to generate custom id.**

### installation for ```Node.js```

```shell
npm i s-uid --save
```

### installation for ```Browser```

```shell
bower i s-uid --save
```

ID
--------------
Sometimes there is a need to generate IDs. They may be highly specific in its format. For such cases, it is easier if they are in part - on the basis of determining the line-format, identifier scheme.

>**base** - it's a string for creating id. Rewrite only special characters

>**N** - Rewrite to random Number

>**H** - Rewrite to random hex numder

>**S** - Rewrite to random english symbol

>**X** - Rewrite to any from "N","H","S"

Example 
--------------

```javascript
var uid = require('s-uid');

// generate from default base (just random not more)
uid();                      // => "qathj9r9-na5d-1fpj-12ar-uhnh6q0ff7ov"

// generate from costom base
uid('SSSSSS');              // => "bfvuuq"
uid('NNNNNN');              // => "928890"
uid('HHHHHH');              // => "5tr8lh"
uid('XXXXXX');              // => "a3620b"
uid('XXX-4NNN-dummy-SSS');  // => "uf3-4223-dummy-qea"

// based on time
uid.guid();                 // => "iw55yhp7-4bka-fokl-9kl7-8bpuiiokgmlb"
// based on one of timestamp
var time = new Date();
uid.guid(null, null, time); // => "iw562dp7-4bka-roko-9lp7-q4l30p2v615u"
uid.guid(null, null, time); // => "iw562dp7-4bka-aoko-6lp7-le9at5kvci57"
uid.guid('M', 'N', time);   // => "iw562dp7-4bka-Moko-Nlp7-i4uc4vhk55d8"
uid.guid('M', 'N', time);   // => "iw562dp7-4bka-Moko-Nlp7-ugc0jon8i0c7"

// time hash
uid.th();                   // => "iw562dp7"
// time humanize           
uid.time();                 // => "2016-10-30-18:57"
// sweet
uid(uid.th()+'-NNNN-my-own-id-HHHH-'+uid.time()); // "iw56ht2z-8268-my-own-id-f5c9-2016-10-30-19:01"
```

Debug
--------------
debug state for id generation

```javascript
 // wrong data type -> It will be replaced by default
uid(null);                  // => "msqr3mi0-qni5-1rea-15te-akgospni6o2m"

uid.DEBUG = true;
// wrong data type -> It throw an Error
uid(null); 

```


[npm-image]: https://badge.fury.io/js/s-uid.svg
[npm-url]: https://npmjs.org/package/s-uid
[license-image]: http://img.shields.io/npm/l/s-uid.svg
[license-url]: LICENSE
