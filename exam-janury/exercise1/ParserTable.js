(function(){
  function Stack(){
    var p=1;
    var stack = ['EOF'];
    this.push = function(s){
      stack[p++]=s;
    };

    this.last = function(){
      var tmp = p-1;
      return stack[tmp];
    };

    this.pop = function(){
      if (p===0) return null;
      var v = stack[--p];
      stack[p] = null;
      return v;
    };

    this.print = function(){
      console.log('stack: ' +JSON.stringify(stack));
    };
  }

  function ParserTable(t){
    var m = {
        'B':{
          '+':['P'],
          'EOF':['EOF']
        },
        'E':{
          'i':['N','P']
        },
        'N':{
          'i':['i']
        },
        'P':{
          '+':['+','N','B']
        }
    };

    var s = new Stack();
    s.push('E');

    //console.log(m[s.pop()]['i']);

    console.log(s.last());
    var iteraze = function(item){
      s.push(item);
      s.print();
    };

    this.parse = function(){
      //t.consumeToken();
      var token = t.lastToken();
      while (true){
        console.log('lastToken: ' + t.lastToken().name);
        var stacki = s.pop();
        console.log('stakPop: ' + stacki);
        var prod = m[stacki][t.lastToken().name];
        console.log('prod: '+prod);
        if (prod === undefined) throw 'error parsion1';
        prod.reverse().forEach(iteraze);
        if (s.last() == t.lastToken().name || prod==[]){
          if (s.last() == 'EOF') return "finito";
          t.consumeToken();
          s.pop();
        }
      }
    };
  }

  module.exports.getInstance = function(stream){
    var t = require("./Tokenizer.js").getInstance(stream);
    var p = new ParserTable(t);
    return p;
 };
}());
