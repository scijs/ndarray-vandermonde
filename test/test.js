'use strict';

var test = require('tape'),
    ndarray = require('ndarray'),
    vander = require('../index.js'),
    assert = require('assert'),
    show = require('ndarray-show'),
    pool = require('ndarray-scratch'),
    ops = require('ndarray-ops');

var tapSpec = require('tap-spec');

test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout);


var ndCloseTo = function(t,a,b,tol) {
  t.assert(a.dimension===b.dimension, 'expected dimension '+a.dimension+' to equal dimension '+b.dimension+'.');
  t.deepEqual(a.shape, b.shape, 'expected shape '+a.shape+' to equal shape '+b.shape+'.');
  var c = pool.zeros(a.shape, a.dtype);
  ops.sub(c,a,b);
  var err = ops.norm2(c);
  t.assert( err < tol, 'Expected error '+err+' to be less than tolerance '+tol+'.');
};

test('basic vandermonde matrix',function(t) {
  var x = ndarray(new Float64Array([1,3,4]));
  var y = vander(x);

  ndCloseTo(t, ndarray(new Float64Array([1,1,1,1,3,9,1,4,16]),[3,3]), y, 1e-8 );

  t.end();
});

test('reversed vandermonde matrix',function(t) {
  var x = ndarray(new Float64Array([1,3,4]));
  var y = vander(x, 3, true);

  ndCloseTo(t, ndarray(new Float64Array([1,4,16,1,3,9,1,1,1]),[3,3]), y, 1e-8 );

  t.end();
});

test('reduced dimension vandermonde matrix',function(t) {
  var x = ndarray(new Float64Array([1,3,4]));
  var y = vander(x, 2);
  ndCloseTo(t, ndarray(new Float64Array([1,1,1,3,1,4]),[3,2]), y, 1e-8 );
  t.end();
});

test('extended dimension vandermonde matrix',function(t) {
  var x = ndarray(new Float64Array([1,3,4]));
  var y = vander(x, 4);
  ndCloseTo(t, ndarray(new Float64Array([1,1,1,1,1,3,9,27,1,4,16,64]),[3,4]), y, 1e-8 );
  t.end();
});
