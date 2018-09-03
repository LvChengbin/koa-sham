# koa-sham

To send fake request to a Koa application without starting a http server.

**Sending `multipart` data will be supported later.**

## Installation

```js
$ npm i koa-sham --save
```

## Usage

```js
const Koa = require( 'koa' );
const sham = require( 'koa-sham' );

const app = new Koa();

app.use( ctx => {
    ctx.body = { status : 1 };
} );

sham( app, ( err, res, body ) => {
    console.log( body ); // { status : 1 }
} );

sham( app, {
    qs : {
        x : 1
    }
}, ( err, res, body ) => {
    console.log( body ); // { status : 1 }
} );

sham( app, { 
    method : 'POST',
    body : {
        x : 1
    }
}, ( err, res, body ) => {
    console.log( body ); // { status : 1 }
} );
```

### Promise

```js
sham( app, { promise : true } ).then( data => {
    console.log( data );
} );
```

### Streaming

```js
sham( app ).pipe( process.stdout );
```

### API

#### sham( app, [ url, options, callback ] )

Returns a `Readable Stream` by default, but can be changed by using `{ promise : true }` in `options`.

**app**

The instance of `Koa` application. 

**url**

Type: `String`

The `URL` or `PATH` the you want to request. The host of the URL will be set as `127.0.0.1` by default. The protocol will be set to `http` if `options.https` is not `true`. The default port is `80` and it can be changed with `options.port`.

If the protocol of the URL is `https`, the request will be set to `secure`, even thought the `options.https` is not set to `true`.

**options**

Type: `Object`

Options for the fake request.

- **remoteAddress** `String`
    The remote IP address, `127.0.0.1` by default.

- **host** `String`
    The host of URL, this item will be ignored if the passed `URL` contains it's host.

- **port** `Number`
    The port of URL, this item will be ignored if the passed `URL` contains it's host.

- **https** `Boolean`
    To set the request to `secure`, this item will be ignored if the passed `URL` contains it's protocol and is not 'https'.

- **method** `String`
    The request method

- **qs** `Object`
    The query string, should be an object.

- **headers** `Object`
    The headers of the request.

- **cookies** `Object`
    The cookies that will be set while sending request, it will overwrite the same cookie which is also in `headers`.

- **body** `Object` `String`
    The request body for `POST` or `PUT` request.

- **promise** `Boolean`
    If `promise` is true, the function will return a `Promise` object.

- **resolveWithFullResponse `Boolean`
    By setting this option to `true`, the returned `promise` will use the full response data as it's value.
