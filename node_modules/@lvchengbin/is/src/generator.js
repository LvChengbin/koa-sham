export default fn => {
    try {
        return new Function( 'fn', 'return fn.constructor === (function*(){}).constructor' )( fn );
    } catch( e ) {
        return false;
    }
}
