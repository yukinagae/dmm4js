var request = require('request');
var parseString = require('xml2js').parseString;

// setting
var base_url = 'http://affiliate-api.dmm.com/';
var default_setting = {
  "api_id": "[APIID]", // APIを利用するために割り当てられたIDを設定します。
  "affiliate_id": "[アフィリエイトID]", // アフィリエイトIDを設定します。使用出来るアフィリエイトIDは、APIID登録時に発行された末尾が990～999のものになります。
  "operation": "ItemList",
  "version": "2.0.0",
  "timestamp": new Date().toLocaleString(),
  "site": "DMM.com",
}
var apis = ['service', 'floor', 'hits', 'offset', 'sort', 'keyword'];

// get request
function get(url) {
  return new Promise(function(resolve, reject) {
    request(url, function(error, response, body) {
        if(error || response.statusCode !== 200) {
          reject(error);
        } else {
          parseString(body, function (err, result) {
            resolve(result.response.result);
          });
        }
    });
  });
}

// DMM4js object
function DMM4js() {
  this.setting = default_setting;
  this.url = base_url + '?';
  for(var key in this.setting) {
    if(this.setting.hasOwnProperty(key)) {
      this.url += key + '=' +  this.setting[key] + '&';
    }
  }
  this.params = {};
}

DMM4js.prototype.get_url = function() {
  for(var key in this.params) {
    if(this.params.hasOwnProperty(key)) {
      this.url += key + '=' +  this.params[key] + '&';
    }
  }
  this.url = this.url.substring(0, this.url.length-1);
  return this.url;
};

DMM4js.prototype.get = function() {
  var url = this.get_url();
  return get(url);
};

apis.forEach(function(api) {
  DMM4js.prototype[api] = function(param) {
    this.params[api] = param;
    return this;
  };
});

var dmm = new DMM4js();
var url = dmm.hits(3).sort('date').keyword('ハリポッター').get_url();
console.log(url);

module.exports = DMM4js;
