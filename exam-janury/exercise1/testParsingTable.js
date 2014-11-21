var s = require("./StreamReader.js").getInstance();
s.put('123+34+4+5+666+5');
var p = require('./ParserTable.js').getInstance(s);
var result = p.parse();
console.log(JSON.stringify(result));
