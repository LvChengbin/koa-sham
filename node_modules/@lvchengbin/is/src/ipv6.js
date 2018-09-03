import ipv4 from './ipv4';

export default ip => {
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
