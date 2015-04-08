var request = require('request');
var parseString = require('xml2js').parseString;

// setting
var base_url = 'http://affiliate-api.dmm.com/';
var default_setting = {
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
function DMM4js(ids) {
  // set ids and default settings
  this.setting = ids;
  for(var key in default_setting) {
    if(default_setting.hasOwnProperty(key)) {
      this.setting[key] = default_setting[key];
    }
  }

  // build default url
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

module.exports = DMM4js;
