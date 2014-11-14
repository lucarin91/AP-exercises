function prova(){
  var ciao = function (n){
    if (n<10){
      console.log(n);
      return ciao(n+1);
    }else
      return n;
  };

  this.func = function(){return ciao(0);};
}
console.log((new prova()).func());
