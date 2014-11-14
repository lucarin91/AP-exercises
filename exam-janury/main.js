var s = require("./StreamReader.js").getInstance();
//s.put('123 + 3 + 4 +123 + 3 + 4 +123 + 3 + 4 +123 + 3 + 4');

if (flag1 === null)
  console.log ('error in parameter passing, use -i or -c');
else{

var flag1 = process.argv[2];
var flag2 = process.argv[3];

var content = '';
process.stdin.resume();
process.stdin.on('data', function(buf) { content += buf.toString(); });
process.stdin.on('end', function() {
    // your code here
    s.put(content);


var p = require('./Parser.js').getInstance(s);
var tree = p.getTree();
console.log(JSON.stringify(tree));

var i = require("./Interpreter.js").getInstance(tree);

if (flag1 =='-i' || flag2 == '-i')
  i.int();

if (flag1 == '-c' || flag2 == '-c')
  i.toC();

});
}
