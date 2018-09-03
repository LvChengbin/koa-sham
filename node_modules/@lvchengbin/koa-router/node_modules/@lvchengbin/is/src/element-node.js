import isNode from './node';

export default node => isNode( node ) && node.nodeType === 1;
