import isNode from './node';

export default node => node && node.nodeType === 11 && isNode( node );
