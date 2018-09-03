import isString from './string';
import isIPv4 from './ipv4';

export default url => {
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
    if( /^(\d+\.){3}\d+$/.test( a.hostname ) && !isIPv4( a.hostname ) ) return false;

    return true;
};
