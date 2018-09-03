import ipv4 from './ipv4';

/**
 * Private IPv4 address
 *
 * 10.0.0.0 ~ 10.255.255.255
 * 172.16.0.0 ~ 172.31.255.255
 * 192.168.0.0 ~ 192.168.255.255
 */

export default ip => {
    if( !ipv4( ip ) ) return false;
    if( /^10\..*/.test( ip ) ) return true;
    if( /^192\.168\..*/.test( ip ) ) return true;
    if( /^172\.(1[6-9]|2[0-9]|3[0-1])\..*/.test( ip ) ) return true;
    return false;
};
