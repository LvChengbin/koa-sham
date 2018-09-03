# koa-preuse

Prepending a middleware to the beginning of the middleware list for Koa application.

## Installation

```js
$ npm i koa-preuse --save
```

## Usage

```js
const Koa = require( 'koa' );
const preuse = require( 'koa-preuse' );

const app = new Koa();

app.use( () => {} ); // Middleware One

preuse( app, ( ctx, next ) => {
    // this middleware will be executed before the "Middleware One"
    next();
} )
```
