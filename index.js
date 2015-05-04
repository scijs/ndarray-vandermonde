'use strict';

var zeros = require('zeros'),
    fill = require('ndarray-fill');

module.exports = function( x ) {
  if( x.dimension !== 1 ) {
    throw new TypeError('vandermonde: error: x must be a dimension-1 vector');
  }

  var i;
  var M = x.shape[0];
  var N = arguments[1] || M;
  var reversed = !! arguments[2];
  var dtype = arguments[3] || 'float64';
  var v = zeros([M,N],dtype);

  if( ! reversed ) {
    fill(v,function(i,j) {
      return Math.pow( x.get(i), j );
    });
  } else {
    fill(v,function(i,j) {
      return Math.pow( x.get(M-1-i), j);
    });
  }
  
  return v;
}
