import isFunction from './function';
export default obj => isFunction( obj ) && /^\s*class\s+/.test( obj.toString() );
