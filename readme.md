
[![NPM version][npm-image]][npm-url]
[![License][license-image]][license-url]

s-uid
===============
An easy way to generate id

### installation
```shell
npm i s-uid --save
```

ID
--------------
Sometimes there is a need to generate IDs. They may be highly specific in its format. For such cases, it is easier if they are in part - on the basis of determining the line-format, identifier scheme.

>**base** - it's a string for creating id. Rewrite only special characters

>**N** - Rewrite to random Number

>**S** - Rewrite to random english symbol

>**X** - Rewrite to any from "N" "S"

Example 
--------------

```javascript
var uid = require('s-uid');

// generate from default base (just random not more)
uid();		// => "sbhcsnb-nlu9-7hgl-ejtc-n6iibgp"

// generate from costom base
uid('SSSSSS');				// => "bfvuuq"
uid('NNNNNN');				// => "928890"
uid('XXXXXX');				// => "5tr8lh"
uid('XXX-4NNN-dummy-SSS');	// => "uf3-4223-dummy-qea"

```

Debug
--------------
debug state for id generation

```javascript
 // wrong data type -> It will be replaced by default
uid(null);		// => "jofq9u5-gdge-mt5n-icb3-bltdcu4"

uid.DEBUG = true;
 // wrong data type -> It throw an Error
uid(null); 

```


[npm-image]: https://badge.fury.io/js/s-uid.svg
[npm-url]: https://npmjs.org/package/s-uid
[license-image]: http://img.shields.io/npm/l/s-uid.svg
[license-url]: LICENSE
