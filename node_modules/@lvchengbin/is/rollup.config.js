import resolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';

export default [ {
    input : 'src/is.js',
    plugins : [
        resolve( {
            module : true,
            jsnext : true
        } )
    ],
    output : [
        { file : 'dist/is.cjs.js', format : 'cjs' },
        { file : 'dist/is.js', format : 'umd', name : 'IS' }
    ]
}, {
    input : 'src/is.js',
    plugins : [
        resolve( {
            module : true,
            jsnext : true,
            extensions : [ '.mjs', '.js' ]
        } ),
        buble( {
            transforms : {
                dangerousForOf : true
            }
        } )
    ],
    output : [
        { file : 'dist/is.bc.js', format : 'umd', name : 'is' }
    ]
} ];
