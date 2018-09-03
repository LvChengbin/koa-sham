const http = require( 'http' );
const url = require( 'url' );
const querystring = require( 'querystring' );
const Stream = require( 'stream' );
const preuse = require( 'koa-preuse' );
const is = require( '@lvchengbin/is' );

const jsonTypes = [
    'application/json',
    'application/json-patch+json',
    'application/vnd.api+json',
    'application/csp-report'
];

const formTypes = [
    'application/x-www-form-urlencoded'
];

module.exports = ( app, uri, options = {}, callback ) => {
    if( is.function( uri ) ) {
        callback = uri;
        options = {};
    }

    if( is.function( options ) ) {
        callback = options;
        options = {};
    }

    if( !is.string( uri ) ) {
        options = uri || {};
        uri = options.uri || '/';
    }

    const socket = new Stream.Duplex();
    socket.remoteAddress = options.remoteAddress || '127.0.0.1';

    const req = new http.IncomingMessage( socket );
    const request = Object.create( app.request );
    request.req = req;

    const host = options.host || '127.0.0.1';
    const port = options.port || 80;

    const protocol = options.https ? 'https' : 'http';

    if( uri.charAt( 0 ) === '/' ) {
        uri = url.resolve( `${protocol}://${host}:${port}`, uri );
    } else if( uri.indexOf( '://' ) === -1 ) {
        uri = `${protocol}://${uri}`;
    }

    req.socket.encrypted = !uri.indexOf( 'https:' );

    request.url = uri;
    request.method = options.method ? options.method.toUpperCase() : 'GET';

    if( options.qs ) {
        if( request.query ) {
            request.query = Object.assign( request.query, options.qs );
        } else {
            request.query = options.qs;
        }
    }

    const headers = {};

    if( options.headers ) {
        for( const name of Object.keys( options.headers ) ) {
            headers[ name.toLowerCase() ] = options.headers[ name ];
        }
    }
    
    if( options.cookies ) {
        const cookies = [];
        for( const name of Object.keys( options.cookies ) ) {
            cookies.push( name + '=' + encodeURIComponent( options.cookies[ name ] ) ); 
        }

        if( headers.cookie ) {
            headers.cookie = headers.cookie.replace( /;\s*$/, '' ) + cookies.join( '; ' );
        } else {
            headers.cookie = cookies.join( '; ' );
        }
    }

    // to set Host in headers
    if( !headers.host ) {
        headers.host = url.parse( request.url ).host;
    }

    request.headers = headers;

    if( [ 'POST', 'PUT' ].indexOf( req.method ) > -1 ) {
        if( !headers[ 'content-type' ] ) {
            headers[ 'content-type' ] = 'application/json';
        }
        headers[ 'transfer-encoding' ] = 'chunked';
        delete headers[ 'content-length' ];

        if( request.is( jsonTypes ) ) {
            options.body && req.push( JSON.stringify( options.body ) );
        } else if( request.is( formTypes ) ) {
            options.body && req.push( querystring.stringify( options.body ) );
        }
        req.push( null );
    }

    const res = new http.ServerResponse( req );
    const response = Object.create( app.response );
    response.res = res;

    const readable = new Stream.Readable();
    readable._read = () => {};

    socket._write = ( chunk ) => {
        readable.push( chunk );
    };

    res.assignSocket( socket );

    preuse( app, ( ctx, next ) => {
        ctx.res.ctx = ctx;
        return next();
    } );

    if( options.promise ) {
        try {
            return app.callback()( req, res ).then( () => {
                if( options.resolveWithFullResponse ) return res;
                if( ( '' + res.statusCode ).charAt( 0 ) === '2' ) {
                    return res.ctx.body;
                }
                throw res;
            } );
        } catch( e ) {
            return Promise.reject( e );
        }
    }

    if( is.function( callback ) ) {
        try {
            app.callback()( req, res ).then( () => {
                callback( null, res, res.ctx.body );
            } ).catch( e => {
                callback( e );
            } );
        } catch( e ) {
            callback( e );
        }
        return;
    }

    app.callback()( req, res );
    return readable;
};
