'use strict';

var isArguments = obj => ({}).toString.call( obj ) === '[object Arguments]';

var isArray = obj => Array.isArray( obj );

/**
 * async function
 *
 * @syntax: 
 *  async function() {}
 *  async () => {}
 *  async x() => {}
 *
 * @compatibility
 * IE: no
 * Edge: >= 15
 * Android: >= 5.0
 *
 */

var isAsyncFunction = fn => ( {} ).toString.call( fn ) === '[object AsyncFunction]';

var isFunction = fn => ({}).toString.call( fn ) === '[object Function]' || isAsyncFunction( fn );

/**
 * arrow function
 *
 * Syntax: () => {}
 *
 * IE : no
 * Android : >= 5.0
 */

var arrowFunction = fn => {
    if( !isFunction( fn ) ) return false;
    return /^(?:function)?\s*\(?[\w\s,]*\)?\s*=>/.test( fn.toString() );
};

var isBoolean = s => typeof s === 'boolean';

var date = date => ({}).toString.call( date ) === '[object Date]';

var email = str => /^(([^#$%&*!+-/=?^`{|}~<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test( str );

var isString = str => typeof str === 'string' || str instanceof String;

var isObject = obj => obj && typeof obj === 'object' && !Array.isArray( obj );

var empty = obj => {
    if( isArray( obj ) || isString( obj ) ) {
        return !obj.length;
    }
    if( isObject( obj ) ) {
        return !Object.keys( obj ).length;
    }
    return !obj;
};

var error = e => ({}).toString.call( e ) === '[object Error]';

var isFalse = ( obj, generalized = true ) => {
    if( isBoolean( obj ) || !generalized ) return !obj;
    if( isString( obj ) ) {
        return [ 'false', 'no', '0', '', 'nay', 'n', 'disagree' ].indexOf( obj.toLowerCase() ) > -1;
    }
    return !obj;
};

var isNumber = ( n, strict = false ) => {
    if( ({}).toString.call( n ).toLowerCase() === '[object number]' ) {
        return true;
    }
    if( strict ) return false;
    return !isNaN( parseFloat( n ) ) && isFinite( n )  && !/\.$/.test( n );
};

var isInteger = ( n, strict = false ) => {

    if( isNumber( n, true ) ) return n % 1 === 0;

    if( strict ) return false;

    if( isString( n ) ) {
        if( n === '-0' ) return true;
        return n.indexOf( '.' ) < 0 && String( parseInt( n ) ) === n;
    }

    return false;
}

/**
 * iterable
 *
 * @compatibility
 *
 * IE: no
 * Edge: >= 13
 * Android: >= 5.0
 *  
 */

var iterable = obj => {
    try {
        return isFunction( obj[ Symbol.iterator ] );
    } catch( e ) {
        return false;
    }
};

// https://github.com/jquery/jquery/blob/2d4f53416e5f74fa98e0c1d66b6f3c285a12f0ce/test/data/jquery-1.9.1.js#L480

var plainObject = obj => {
    if( !isObject( obj ) ) {
        return false;
    }

    try {
        if( obj.constructor && !({}).hasOwnProperty.call( obj, 'constructor' ) && !({}).hasOwnProperty.call( obj.constructor.prototype, 'isPrototypeOf' ) ) {
            return false;
        }
    } catch( e ) {
        return false;
    }

    let key;
    for( key in obj ) {} // eslint-disable-line

    return key === undefined || ({}).hasOwnProperty.call( obj, key );
};

var promise = p => p && isFunction( p.then );

var regexp = reg => ({}).toString.call( reg ) === '[object RegExp]';

var isTrue = ( obj, generalized = true ) => {
    if( isBoolean( obj ) || !generalized ) return !!obj;
    if( isString( obj ) ) {
        return [ 'true', 'yes', 'ok', '1', 'yea', 'yep', 'y', 'agree' ].indexOf( obj.toLowerCase() ) > -1;
    }
    return !!obj;
};

function isUndefined() {
    return arguments.length > 0 && typeof arguments[ 0 ] === 'undefined';
}

var ipv4 = ip => {
    if( !isString( ip ) ) return false;
    const pieces = ip.split( '.' );
    if( pieces.length !== 4 ) return false;

    for( const i of pieces ) {
        if( !isInteger( i ) ) return false;
        if( i < 0 || i > 255 ) return false;
    }
    return true;
};

/**
 * <user>:<password> can only be supported with FTP scheme on IE9/10/11
 */

var url = url => {
    if( !isString( url ) ) return false;

    if( !/^(https?|ftp):\/\//i.test( url ) ) return false;
    const a = document.createElement( 'a' );
    a.href = url;

    /**
     * In IE, sometimes a.protocol would be an unknown type
     * Getting a.protocol will throw Error: Invalid argument in IE
     */
    try {
        if( !isString( a.protocol ) ) return false;
    } catch( e ) {
        return false;
    }

    if( !/^(https?|ftp):/i.test( a.protocol ) ) return false;

    /**
     * In IE, invalid IP address could be a valid hostname
     */
    if( /^(\d+\.){3}\d+$/.test( a.hostname ) && !ipv4( a.hostname ) ) return false;

    return true;
};

var isNode = s => ( typeof Node === 'object' ? s instanceof Node : s && typeof s === 'object' && typeof s.nodeType === 'number' && typeof s.nodeName === 'string' )

var textNode = node => node && node.nodeType === 3 && isNode( node );

var elementNode = node => node && node.nodeType === 1 && isNode( node );

var fragmentNode = node => node && node.nodeType === 11 && isNode( node );

var isWindow = obj => obj && obj === obj.window;

var isClass = obj => isFunction( obj ) && /^\s*class\s+/.test( obj.toString() );

var ipv6 = ip => {
    /**
     * An IPv6 address should have at least one colon(:)
     */
    if( ip.indexOf( ':' ) < 0 ) return false;

    /**
     * An IPv6 address can start or end with '::', but cannot start or end with a single colon.
     */
    if( /(^:[^:])|([^:]:$)/.test( ip ) ) return false;

    /**
     * An IPv6 address should consist of colon(:), dot(.) and hexadecimel
     */
    if( !/^[0-9A-Fa-f:.]{2,}$/.test( ip ) ) return false;

    /**
     * An IPv6 address should not have any sequence like:
     * 1. a hexadecimal that it's length greater than 4
     * 2. three or more continous colons
     * 3. two or more continous dots
     */
    if( /[0-9A-Fa-f]{5,}|:{3,}|\.{2,}/.test( ip ) ) return false;

    /**
     * In an IPv6 address, the "::" can only appear once.
     */
    if( ip.split( '::' ).length > 2 ) return false;

    /**
     * if the IPv6 address is in mixed form.
     */
    if( ip.indexOf( '.' ) > -1 ) {
        const lastColon = ip.lastIndexOf( ':' );
        const hexadecimal = ip.substr( 0, lastColon );
        const decimal = ip.substr( lastColon + 1 );
        /**
         * the decimal part should be an valid IPv4 address.
         */
        if( !ipv4( decimal ) ) return false;

        /**
         * the length of the hexadecimal part should less than 6.
         */
        if( hexadecimal.split( ':' ).length > 6 ) return false;
    } else {
        /**
         * An IPv6 address that is not in mixed form can at most have 8 hexadecimal sequences.
         */
        if( ip.split( ':' ).length > 8 ) return false;
    }
    return true;
};

var isIP = ip => ipv4( ip ) || ipv6( ip );

/**
 * Private IPv4 address
 *
 * 10.0.0.0 ~ 10.255.255.255
 * 172.16.0.0 ~ 172.31.255.255
 * 192.168.0.0 ~ 192.168.255.255
 */

var isPrivateIPv4 = ip => {
    if( !ipv4( ip ) ) return false;
    if( /^10\..*/.test( ip ) ) return true;
    if( /^192\.168\..*/.test( ip ) ) return true;
    if( /^172\.(1[6-9]|2[0-9]|3[0-1])\..*/.test( ip ) ) return true;
    return false;
};

var generator = fn => {
    try {
        return new Function( 'fn', 'return fn.constructor === (function*(){}).constructor' )( fn );
    } catch( e ) {
        return false;
    }
}

var is = {
    arguments : isArguments,
    array: isArray,
    arrowFunction,
    asyncFunction: isAsyncFunction,
    boolean : isBoolean,
    date,
    email,
    empty,
    error,
    false : isFalse,
    function : isFunction,
    integer: isInteger,
    iterable,
    number: isNumber,
    object: isObject,
    plainObject,
    promise,
    regexp,
    string: isString,
    true : isTrue,
    undefined : isUndefined,
    url,
    node: isNode,
    textNode,
    elementNode,
    fragmentNode,
    window : isWindow,
    class : isClass,
    ip : isIP,
    ipv4 : ipv4,
    ipv6 : ipv6,
    privateIPv4 : isPrivateIPv4,
    generator
};

module.exports = is;
