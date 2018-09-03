# Is

A JavaScript library for checking the type of a value for browsers.

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

### is.arguments

```js
import isArguments from '@lvchengbin/is/src/arguments';
```

### is.array

```js
import isArray from '@lvchengbin/is/src/array';
```

### is.arrowFunction

For checking if a function is an `arrow function`.

```js
import isArrowFunction from '@lvchengbin/is/src/arrow-function';

isArrowFunction( () => {} ); // returns true
```

### is.asyncFunction

For checking if a `function` is an `async function`.

```js
import isAsyncFunction from '@lvchengbin/is/src/async-function';

isAsyncFunction( async () => {} ); // returns true
```

### is.boolean

```js
import isBoolean from '@lvchengbin/is/src/boolean';
```

### is.date

For checking if an object is a `Date` instance.

```js
import isDate from '@lvchengbin/is/src/date';

isDate( new Date ); // return true
```

### is.email

For checking if the value is an email address.

```js
import isEmail from '@lvchengbin/is/src/email';

isEmail( 'abc@gmail.com' ); // returns true
```

### is.empty

For checking if a value is empty, and empty values include empty object ({}), empty string (''), empty array ([]), number 0, false.

```js
import isEmpty from '@lvchengbin/is/src/empty';

isEmpty( '' ); // return true
isEmpty( [] ); // return true
isEmpty( {} ); // return true
isEmpty( 0 ); // return true
isEmpty( false ); // return true
```

### is.error

For checking if an object is an `Error` instance.

```js
import isError from '@lvchengbin/is/src/error';

isError( new Error ); // returns true
```

### is.false

For checking if a value is `false`, if the second argument is `true` (by default), the function will check a generalized `false`, it means that the following strings all mean `false`: "false", "no", "0", "", "nay", "n", "disagree".

```js
import isFalse from '@lvchengbin/is/src/false';

isFalse( false ); // returns true
isFalse( 'false' ); // returns true
isFalse( 'false', false ); // returns false
```

### is.function

```js
import isFunction from '@lvchengbin/is/src/function';
```

### is.integer

```js
import isInteger from '@lvchengbin/is/src/integer';
```

### is.iterable

```js
import isIterable from '@lvchengbin/is/src/iterable';
```

### is.number

```js
import isNumber from '@lvchengbin/is/src/number';
```

### is.object

```js
import isObject from '@lvchengbin/is/src/object';
```

### is.plainObject

```js
import isPlainObject from '@lvchengbin/is/src/plain-object';
```

### is.promise

```js
import isPromise from '@lvchengbin/is/src/promise';
```

### is.regexp

```js
import isRegExp from '@lvchengbin/is/src/regexp';
```

### is.string

```js
import isString from '@lvchengbin/is/src/string';
```

### is.true

For checking if a value is `true`, if the second argument is `true` (by default), the function will check a generalized `true`, it means that the following strings all mean `true`: "true", "true", "yes", "ok", "1", "yea", "yep", "y", "agree".

```js
import isTrue from '@lvchengbin/is/src/true';
isTrue( true ); // returns true
isTrue( 'true' ); // returns true
isTrue( 'true', false ); // returns false
```

### is.undefined

```js
import isUndefined from '@lvchengbin/is/src/undefined';
```

### is.url

```js
import isUrl from '@lvchengbin/is/src/url';
```

### is.node

```js
import isNode from '@lvchengbin/is/src/node';
```

### is.textNode

```js
import isTextNode from '@lvchengbin/is/src/text-node';
```

### is.elementNode

```js
import isElementNode from '@lvchengbin/is/src/element-node';
```

### is.window

```js
import isWindow from '@lvchengbin/is/src/window';
```
