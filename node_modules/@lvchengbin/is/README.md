# Is

A JavaScript library for checking the type of a value for browsers.

<!-- vim-markdown-toc GFM -->

* [Installing](#installing)
* [Usage](#usage)
* [Using in browsers](#using-in-browsers)
* [Method List](#method-list)
    * [is.date](#isdate)
    * [is.empty](#isempty)
    * [is.false](#isfalse)
    * [is.true](#istrue)

<!-- vim-markdown-toc -->

## Installing

```js
npm i @lvchengbin/is --save
```

## Usage

Generally, when we are using some toolkit such as rollup, we don't want to compile a huge library into our project, therefore, to import the files you really need.

```js
import isFunction from '@lvchengbin/is/src/function';
import array from '@lvchengbin/is/src/array';

isFunction( async () => {} );
isArray( [] );
```

If you want to invoke the whole package:

```js
import is from '@lvchengbin/is';

is.function( () => {} );
is.array( [] );
```

## Using in browsers

If you want to invoke this package to browsers with `<script>` tag or something like that, use [is.js](https://raw.githubusercontent.com/LvChengbin/is/master/dist/is.js). For old browsers which are not supporting ES5 syntax, use [is.bc.js](https://raw.githubusercontent.com/LvChengbin/is/master/dist/is.bc.js).

## Method List

| Method | Importing | Desc |
|:--|:--|:--|
| is.arguments | import isArguments from '@lvchengbin/is/src/arguments' |
| is.array | import isArray from '@lvchengbin/is/src/array' |
| is.arrowFunction | import isArrowFunction from '@lvchengbin/is/src/arrow-function' |
| is.asyncFunction | import isAsyncFunction from '@lvchengbin/is/src/async-function' |
| is.boolean | import isBoolean from '@lvchengbin/is/src/boolean' |
| is.date | import isDate from '@lvchengbin/is/src/date' |
| is.dateString | import isDateString from '@lvchengbin/is/src/date-string' | ???? |
| is.email | import isEmail from '@lvchengbin/is/src/email' |
| is.empty | import isEmpty from '@lvchengbin/is/src/empty' | 
| is.error | import isError from '@lvchengbin/is/src/error' |
| is.false | import isFalse from '@lvchengbin/is/src/false' |
| is.function | import isFunction from '@lvchengbin/is/src/function' |
| is.integer | import isInteger from '@lvchengbin/is/src/integer' |
| is.iterable | import isIterable from '@lvchengbin/is/src/iterable' |
| is.number | import isNumber from '@lvchengbin/is/src/number' |
| is.object | import isObject from '@lvchengbin/is/src/object' |
| is.plainObject | import isPlainObject from '@lvchengbin/is/src/plain-object' |
| is.promise | import isPromise from '@lvchengbin/is/src/promise' |
| is.regexp | import isRegexp from '@lvchengbin/is/src/regexp' |
| is.string | import isString from '@lvchengbin/is/src/string' |
| is.true | import isTrue from '@lvchengbin/is/src/true' |
| is.undefined | import isUndefined from '@lvchengbin/is/src/undefined' |
| is.url | import isUrl from '@lvchengbin/is/src/url' |
| is.node | import isNode from '@lvchengbin/is/src/node' |
| is.textNode | import isTextNode from '@lvchengbin/is/src/text-node' |
| is.elementNode | import isElementNode from '@lvchengbin/is/src/element-node' |
| is.window | import isWindow from '@lvchengbin/is/src/window' |
| is.class | import isClass from '@lvchengbin/is/src/class' |
| is.ipv4 | import isIPv4 from '@lvchengbin/is/src/ipv4' |
| is.ipv6 | import isIPv6 from '@lvchengbin/is/src/ipv6' |
| is.ip | import isIP from '@lvchengbin/is/src/ip' |
| is.generator | import isGenerator from '@lvchengbin/is/src/generator' |

### is.date

For checking if an object is a `Date` instance.

```js
import isDate from '@lvchengbin/is/src/date';

isDate( new Date ); // return true
```

### is.empty
an empty value could be am empty object(`{}`), an empty string, an empty array(`[]`), a number `0` or a `false` |

For checking if a value is empty, and empty values include empty object ({}), empty string (''), empty array ([]), number 0, false.

```js
import isEmpty from '@lvchengbin/is/src/empty';

isEmpty( '' ); // return true
isEmpty( [] ); // return true
isEmpty( {} ); // return true
isEmpty( 0 ); // return true
isEmpty( false ); // return true
```

### is.false

For checking if a value is `false`, if the second argument is `true` (by default), the function will check a generalized `false`, it means that the following strings all mean `false`: "false", "no", "0", "", "nay", "n", "disagree".

```js
import isFalse from '@lvchengbin/is/src/false';

isFalse( false ); // returns true
isFalse( 'false' ); // returns true
isFalse( 'false', false ); // returns false
```

### is.true

For checking if a value is `true`, if the second argument is `true` (by default), the function will check a generalized `true`, it means that the following strings all mean `true`: "true", "true", "yes", "ok", "1", "yea", "yep", "y", "agree".

```js
import isTrue from '@lvchengbin/is/src/true';
isTrue( true ); // returns true
isTrue( 'true' ); // returns true
isTrue( 'true', false ); // returns false
```
