const Koa = require( 'koa' );
const app = new Koa();
app.use( ctx => {
    ctx.throw( 400, 'sham error' );
} )

app.listen( 8000 );
