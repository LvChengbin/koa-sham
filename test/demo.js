const Koa = require( 'koa' );
const sham = require( '../' );

const app = new Koa();

app.use( ctx => {
    ctx.body = { status : 1 };
} );

sham( app, ( err, res, body ) => {
    console.log( body ); // { status : 1 }
} );

sham( app, { method : 'POST' }, ( err, res, body ) => {
    console.log( body ); // { status : 1 }
} );

sham( app, { promise : true } ).then( data => {
    console.log( data );
} );

sham( app ).pipe( process.stdout );
