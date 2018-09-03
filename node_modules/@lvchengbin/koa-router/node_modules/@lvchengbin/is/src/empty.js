import isArray from './array';
import isString from './string';
import isObject from './object';

export default obj => {
    if( isArray( obj ) || isString( obj ) ) {
        return !obj.length;
    }
    if( isObject( obj ) ) {
        return !Object.keys( obj ).length;
    }
    return !obj;
};
