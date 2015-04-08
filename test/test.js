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

  it('should build url', function() {
    var dmm = new DMM4js({"api_id": "[APIID]", "affiliate_id": "[アフィリエイトID]"});
    var url = dmm.hits(3).sort('date').keyword('ハリポッター').get_url();
    // timestamp parameter can be changed, so expected url cannot be asserted simply using equal.
    assert.equal(true, url.indexOf('http://affiliate-api.dmm.com/?api_id=[APIID]&affiliate_id=[アフィリエイトID]&operation=ItemList&version=2.0.0&') === 0);
    assert.equal(true, url.indexOf('&site=DMM.com&hits=3&sort=date&keyword=ハリポッター') > -1);
  });

});
