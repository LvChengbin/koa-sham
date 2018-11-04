const Stream = require( 'stream' );
const querystring = require( 'querystring' );
const Koa = require( 'koa' );
const Router = require( '@lvchengbin/koa-router' );
const bodyParser = require( 'koa-bodyparser' );
const sham = require( '../' );
const host = '127.0.0.1';

describe( 'sham', () => {
    describe( 'request', () => {
        it( 'sham request', done => {
            const app = new Koa();
            const body = { status : 'OK' };
            app.use( ctx => {
                ctx.body = body;
            } )
            sham( app, '/', { promise : true } ).then( res => {
                expect( res ).toEqual( body );
                done();
            } );
        } );

        it( 'omitting url', done => {
            const app = new Koa();
            const body = { status : 'OK' };
            app.use( ctx => {
                ctx.body = body;
            } )
            sham( app, { promise : true } ).then( res => {
                expect( res ).toEqual( body );
                done();
            } );
        } );

        it( 'http version', done => {
            const app = new Koa();
            const body = { status : 'OK' };
            app.use( ctx => {
                ctx.body = body;
                expect( ctx.req.httpVersion ).toEqual( 'sham' );
                done();
            } )
            sham( app, { promise : true } );
        } );

        for( const method of 'GET,POST,HEAD,OPTIONS,DELETE,PUT,PATCH'.split( ',' ) ) {
            it( `method ${method}`, done => {
                const app = new Koa();
                app.use( ctx => {
                    expect( ctx.method ).toEqual( method );
                    done();
                } )
                sham( app, '/', { method } );
            } );
        }

        it( 'path', done => {
            const app = new Koa();
            app.use( ctx => {
                expect( ctx.path ).toEqual( '/the/path' );
                done();
            } )
            sham( app, '/the/path' );
        } );

        it( 'original url', done => {
            const app = new Koa();
            app.use( ctx => {
                expect( ctx.originalUrl ).toEqual( `http://${host}/the/path` );
                done();
            } )
            sham( app, `http://${host}/the/path` );
        } );

        it( 'origin', done => {
            const app = new Koa();
            app.use( ctx => {
                expect( ctx.origin ).toEqual( `http://${host}` );
                done();
            } )
            sham( app, `http://${host}/the/path` );
        } );

        it( 'href', done => {
            const app = new Koa();
            app.use( ctx => {
                expect( ctx.href ).toEqual( `http://${host}/the/path` );
                done();
            } )
            sham( app, `http://${host}/the/path` );
        } );

        it( 'host', done => {
            const app = new Koa();
            app.use( ctx => {
                expect( ctx.host ).toEqual( `${host}:8080` );
                done();
            } )
            sham( app, `http://${host}:8080/the/path` );
        } );

        it( 'hostname', done => {
            const app = new Koa();
            app.use( ctx => {
                expect( ctx.hostname ).toEqual( host );
                done();
            } )
            sham( app, `http://${host}/the/path` );
        } );

        it( 'subdomains', done => {
            const app = new Koa();
            app.use( ctx => {
                expect( ctx.subdomains ).toEqual( [ 'a', 'b', 'c' ] );
                done();
            } )
            sham( app, 'c.b.a.domain.com' );
        } );

    } );

    describe( 'ip', () => {
        
        it( 'getting from socket.remoteAddress', done => {
            const app = new Koa();
            app.use( ctx => {
                expect( ctx.ip ).toEqual( '10.10.10.10' );
                done();
            } )
            sham( app, '/', {
                remoteAddress : '10.10.10.10'
            } );
        } );

        it( 'getting from XFF header', done => {
            const app = new Koa();
            app.proxy = true;
            app.use( ctx => {
                expect( ctx.ip ).toEqual( '10.10.10.10' );
                done();
            } )
            sham( app, '/', {
                headers : {
                    'X-Forwarded-For' : '10.10.10.10'
                }
            } );
        } );
    } );

    describe( 'url', () => {

        it( 'complementing host and protocol', done => {
            const app = new Koa();
            app.use( ctx => {
                expect( ctx.url ).toEqual( `http://${host}:80/the/path` );
                done();
            } )
            sham( app, '/the/path' );
        } );

        it( 'complementing http protocol', done => {
            const app = new Koa();
            app.use( ctx => {
                expect( ctx.url ).toEqual( `http://${host}:80/the/path` );
                done();
            } )
            sham( app, `${host}:80/the/path` );
        } );

        it( 'complementing https protocol', done => {
            const app = new Koa();
            app.use( ctx => {
                expect( ctx.url ).toEqual( `https://${host}:80/the/path` );
                done();
            } )
            sham( app, `${host}:80/the/path`, { https : true } );
        } );

        it( 'detecting https protocol', done => {
            const app = new Koa();
            app.use( ctx => {
                expect( ctx.url ).toEqual( `https://${host}:80/the/path` );
                done();
            } )
            sham( app, `https://${host}:80/the/path` );
        } );
    } );

    describe( 'protocol', () => {
        it( 'http', done => {
            const app = new Koa();
            app.use( ctx => {
                expect( ctx.protocol ).toEqual( 'http' );
                done();
            } )
            sham( app, '/' );
        } );

        it( 'https', done => {
            const app = new Koa();
            app.use( ctx => {
                expect( ctx.protocol ).toEqual( 'https' );
                done();
            } )
            sham( app, '/', { https : true } );
        } );
    } );

    describe( 'query', () => {
        it( 'set queries', done => {
            const app = new Koa();
            const qs = { x : '1', y : '2' };
            app.use( ctx => {
                expect( ctx.query ).toEqual( qs );
                done();
            } )
            sham( app, '/', { qs } );
        } );

        it( 'queries in url', done => {
            const app = new Koa();
            const qs = {
                x : '1',
                y : '2'
            };
            app.use( ctx => {
                expect( ctx.query ).toEqual( qs );
                done();
            } )
            sham( app, '?' + querystring.stringify( qs ) );
        } );

        it( 'mixed', done => {
            const app = new Koa();
            const qs = {
                x : '1',
                y : '2'
            };
            app.use( ctx => {
                expect( ctx.query ).toEqual( Object.assign( { z : '3' }, qs ) );
                done();
            } )
            sham( app, '?' + querystring.stringify( qs ), {
                qs : {
                    z : '3'
                }
            } );
        } );

        it( 'querystring', done => {
            const app = new Koa();
            const qs = { x : '1', y : '2' };
            app.use( ctx => {
                expect( ctx.querystring ).toEqual( querystring.stringify( qs ) );
                done();
            } )
            sham( app, '/', { qs } );
        } );
    } );

    describe( 'headers', () => {
        it( 'set headers', done => {
            const app = new Koa();
            const headers = {
                'x-headers' : 'yes'
            };
            app.use( ctx => {
                expect( ctx.headers ).toEqual( Object.assign( {
                    host : '127.0.0.1:80'
                }, headers ) );
                done();
            } );
            sham( app, '/', { headers } );
        } );

        it( 'cookies', done => {
            const app = new Koa();
            const cookies = {
                key : 'value',
                name : '&'
            };
            app.use( ctx => {
                for( const name of Object.keys( cookies ) ) {
                    expect( ctx.cookies.get( name ) ).toEqual( encodeURIComponent( cookies[ name ] ) );
                }
                done();
            } );
            sham( app, '/', { cookies } );
        } );
    } );

    describe( 'POST', () => {
        it( 'basic request', done => {
            const app = new Koa();
            const body = { x : 1 };
            app.use( bodyParser() );
            app.use( ctx => {
                expect( ctx.request.is( [ 'application/json' ] ) ).toBeTruthy();
                expect( ctx.request.body ).toEqual( body );
                done();
            } );
            sham( app, '/', {
                method : 'POST',
                body
            } );
        } );

        it( 'set content-type = application/json explicitly', done => {
            const app = new Koa();
            const body = { x : 1 };
            app.use( bodyParser() );
            app.use( ctx => {
                expect( ctx.request.is( [ 'application/json' ] ) ).toBeTruthy();
                expect( ctx.request.body ).toEqual( body );
                done();
            } );
            sham( app, '/', {
                method : 'POST',
                body,
                headers : {
                    'content-type' : 'application/json'
                }
            } );
        } );

        it( 'application/x-www-form-urlencoded', done => {
            const app = new Koa();
            const body = { x : '1' };
            app.use( bodyParser() );
            app.use( ctx => {
                expect( ctx.request.is( [ 'application/x-www-form-urlencoded' ] ) ).toBeTruthy();
                expect( ctx.request.body ).toEqual( body );
                done();
            } );
            sham( app, '/', {
                method : 'POST',
                body,
                headers : {
                    'content-type' : 'application/x-www-form-urlencoded'
                }
            } );
        } );
    } );

    describe( 'Response', () => {
        
       it( 'success with json', done => {
            const app = new Koa();
            app.use( ctx => {
                ctx.body = { status : 'OK' };
            } )
            sham( app, '/', ( err, res, body ) => {
                expect( body ).toEqual( { status : 'OK' } );
                done();
            } );
       } ); 

       it( 'success with text', done => {
            const app = new Koa();
            app.use( ctx => {
                ctx.body = 'body';
            } )
            sham( app, '/', ( err, res, body ) => {
                expect( body ).toEqual( 'body' );
                done();
            } );
       } ); 

       it( '500', done => {
            const app = new Koa();
            app.use( ctx => {
                ctx.throw( 500 );
            } )
            sham( app, '/', ( err, res ) => {
                expect( res.statusCode ).toEqual( 500 );
                done();
            } );
       } ); 

       it( 'error', done => {
            const app = new Koa();
            app.callback = () => { throw 'x' };
            sham( app, '/', err => {
                expect( err !== null ).toBeTruthy();
                done();
            } );
       } ); 
    } );

    describe( 'Response promise', () => {
       it( 'success with json', done => {
            const app = new Koa();
            const body = { status : 'OK' };
            app.use( ctx => {
                ctx.body = body;
            } )
            sham( app, '/', { promise : true } ).then( res => {
                expect( res ).toEqual( body );
                done();
            } );
       } ); 

       it( 'success with text', done => {
            const app = new Koa();
            app.use( ctx => {
                ctx.body = 'body';
            } )
            sham( app, '/', { promise : true } ).then( res => {
                expect( res ).toEqual( 'body' );
                done();
            } );
       } ); 

       it( 'error', done => {
            const app = new Koa();
            app.use( ctx => {
                ctx.throw( 500 );
            } )
            sham( app, '/', { promise : true } ).catch( res => {
                expect( res.statusCode ).toEqual( 500 );
                done();
            } );
       } ); 
    } );

    describe( 'Working with router', () => {
        const app = new Koa();
        const router = new Router( app );

        router.get( '/path1', ctx => {
            ctx.body = {
                method : 'get',
                path : 'path1'
            };
        } );

        router.get( '/path2', ctx => {
            ctx.body = {
                method : 'get',
                path : 'path2'
            };
        } );

        router.post( '/path1', ctx => {
            ctx.body = {
                method : 'post',
                path : 'path1'
            };
        } );

        router.post( '/path2', ctx => {
            ctx.body = {
                method : 'post',
                path : 'path2'
            };
        } );

        
        it( 'get path1', done => {
           sham( app, '/path1', { promise : true } ).then( res => {
               expect( res ).toEqual( {
                   method : 'get',
                   path : 'path1'
               } );
               done();
           } );
        } );

        it( 'get path2', done => {
           sham( app, '/path2', { promise : true } ).then( res => {
               expect( res ).toEqual( {
                   method : 'get',
                   path : 'path2'
               } );
               done();
           } );
        } );

        it( 'post path1', done => {
           sham( app, '/path1', { method : 'POST', promise : true } ).then( res => {
               expect( res ).toEqual( {
                   method : 'post',
                   path : 'path1'
               } );
               done();
           } );
        } );

        it( 'post path2', done => {
           sham( app, '/path2', { method : 'POST', promise : true } ).then( res => {
               expect( res ).toEqual( {
                   method : 'post',
                   path : 'path2'
               } );
               done();
           } );
        } );

    } );

    describe( 'Pipe', () => {
        it( 'pipe', done => {
            const app = new Koa();
            app.use( ctx => {
                ctx.body = 'body';
            } )
            const writable = new Stream.Writable();
            writable._write = ( chunk ) => {
                expect( /^HTTP[\s\S]+?body$/.test( chunk.toString().trim() ) ).toBeTruthy();
                done();
            };
            sham( app, '/' ).pipe( writable );
        } );
    } );


} );
