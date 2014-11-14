(function(){
  function Parser(token){
    var t = token;

    var E = function(){
      if (t.lastToken() !== null){
        var num = t.lastToken();
        if (typeof(num) != 'number')
          return 'error';
        t.consumeToken();
        tmpP = P();
        return [num,tmpP];
      }else return 'error';
    };

    var P = function(){
      if (t.lastToken() !== null){
        if (t.lastToken() != 'plus')
          return 'error';

        t.consumeToken();
        var num = t.lastToken();
        if (typeof(num) != 'number' )
          return 'error';

        t.consumeToken();
        var tmpP1 = P1();
        if (tmpP1 !== null)
          return [num,tmpP1];
        else
          return num;
      }else return 'error';
    };

    var P1 = function(){
      if (t.lastToken() === null)
        return null;
      return P();
    };

    this.getTree = function(){
      return E();
    };
  }

  module.exports.getInstance = function(stream){
    var t = require("./Tokenizer.js").getInstance(stream);
    var p = new Parser(t);
    return p;
 };
}());
