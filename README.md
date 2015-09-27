# qs-stream
Stream parsing query-string files separated by new lines, built on top of the wonderful [qs](https://www.npmjs.com/package/qs) library with support for nesting and arrays

> Maybe be useful for some log formats, but more importantly it provides the groundwork for building more complex parsers like Apache access logs or CloudFront logs

#### Usage

```
npm install qs-stream
```

```javascript
var qsstream = require( "qs-stream" );

fs.createReadStream( "queries.log" ) // new-line separated list of querystrings
  .pipe( qsstream() )
  .on( "data", function ( queryObject ) {
    // do something awesome
  })
```