import isNode from './node';

export default node => node && node.nodeType === 1 && isNode( node );
