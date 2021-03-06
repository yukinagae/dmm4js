# dmm4js

[![NPM version](https://badge.fury.io/js/dmm4js.svg)](https://npmjs.org/package/dmm4js)
[![Build Status](https://travis-ci.org/yukinagae/dmm4js.svg?branch=master)](https://travis-ci.org/yukinagae/dmm4js)

Simple DMM API v2 client written in JavaScript.

Reference: [DMM API v2](https://affiliate.dmm.com/api/)

## Installation

Install using [npm](https://www.npmjs.org/):

```sh
npm install dmm4js
```

## Features
- Fluent Interface
- Below methods are implemented.

|method|description|
|---|---|
|service|検索対象サービスを指定します。|
|floor|検索対象フロアを指定します。|
|hits|検索結果の件数を指定します。|
|offset|検索結果の先頭位置を指定します。|
|sort|検索結果の並び順を指定します。|
|keyword|商品タイトル、メーカー名、ジャンル、商品説明などから検索をします。|

## Example

```javascript
var dmm = new DMM4js({"api_id": "[APIID]", "affiliate_id": "[アフィリエイトID]"});
dmm.hits(3).sort('date').keyword('ハリーポッター').get().then(function(result) {
  console.log(result.items[0].title); //
});
```

## TODO
- Error handling

## Tests
Run tests using `npm test`.

## License
MIT
