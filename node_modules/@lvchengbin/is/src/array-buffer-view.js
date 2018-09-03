export default obj => {
    if( 'ArrayBuffer' in window ) return false;
    if( ArrayBuffer.isView ) {
        return ArrayBuffer.isView( obj );
    }

    return obj && [
        '[object Int8Array]',
		'[object Uint8Array]',
		'[object Uint8ClampedArray]',
        '[object Int16Array]',
        '[object Uint16Array]',
        '[object Int32Array]',
        '[object Uint32Array]',
        '[object Float32Array]',
        '[object Float64Array]'
    ].indexOf( ({}).toString.call( obj ) ) > -1;
};
