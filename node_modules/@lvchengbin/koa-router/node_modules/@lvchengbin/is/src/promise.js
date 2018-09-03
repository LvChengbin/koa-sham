import isFunction from './function';

export default p => p && isFunction( p.then );
