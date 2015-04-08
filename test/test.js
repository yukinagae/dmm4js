/**
 * Module tests
 */
var assert = require('assert');
var should = require('should');

var DMM4js = require('..');

describe('DMM4js', function() {

  it('should expose DMM4js', function() {
    should.exist(DMM4js);
    DMM4js.should.be.type('function');
  });

});
