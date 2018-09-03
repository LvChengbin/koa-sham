import isAsyncFunction from './async-function';

export default fn => ({}).toString.call( fn ) === '[object Function]' || isAsyncFunction( fn );
