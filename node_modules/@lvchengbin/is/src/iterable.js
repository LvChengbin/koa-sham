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

import isFunction from './function';

export default obj => {
    try {
        return isFunction( obj[ Symbol.iterator ] );
    } catch( e ) {
        return false;
    }
};
