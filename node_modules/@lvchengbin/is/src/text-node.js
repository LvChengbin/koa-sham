import isNode from './node';

export default node => node && node.nodeType === 3 && isNode( node );
