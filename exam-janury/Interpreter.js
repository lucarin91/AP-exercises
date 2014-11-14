(function(){
  function Interpreter(tree){

    var int = function(t){
      if (typeof(t) == 'number')
        return t;
      else
        return int(t[0]) + int(t[1]);
    };

    this.int = function (){
      console.log(int(tree));
    };

    var strNumber = function (t){
      if (typeof(t) == 'number')
        return ''+t;
      else
        return strNumber(t[0]) + '+' + strNumber(t[1]);
    };

    this.toC = function(){
      var up = '#include <stdio.h>\n int main(){printf("%d",';
      var down = ');}';
      var fs = require('fs');
      fs.writeFile("result.c", up+strNumber(tree)+down, function(err) {
        if(err)
          console.log('error to save file');
        console.log('fatto');
      });
    };
  }

  module.exports.getInstance = function(tree){
    return new Interpreter(tree);
 };
}());
