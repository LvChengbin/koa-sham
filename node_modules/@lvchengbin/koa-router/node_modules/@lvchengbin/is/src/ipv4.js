import isString from './string';
import isInteger from './integer';

export default ip => {
    if( !isString( ip ) ) return false;
    const pieces = ip.split( '.' );
    if( pieces.length !== 4 ) return false;

    for( const i of pieces ) {
        if( !isInteger( i ) ) return false;
        if( i < 0 || i > 255 ) return false;
    }
    return true;
};
