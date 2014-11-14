var s = require("./StreamReader.js").getStream();
s.put('123+123');

var t = require("./Tokenizer.js").getTokenizer(s);

t.consumeToken();
var tmp = t.lastToken();
while (tmp !== null){
    tmp = t.lastToken();
    console.log(tmp);
    t.consumeToken();
}
