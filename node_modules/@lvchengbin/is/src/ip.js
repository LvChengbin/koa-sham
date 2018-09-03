import ipv4 from './ipv4';
import ipv6 from './ipv6';
export default ip => ipv4( ip ) || ipv6( ip );
