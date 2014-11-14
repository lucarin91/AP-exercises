(function (){
    
    function stream(){
      var string;
      var p = 0;
    
      this.put = function(str){
        string = str;
      };
      
      this.consume = function(){
        p++;
      };
      
      this.peek = function(){
        return string[p];
      };
    }
    
    module.exports.getStream = function(){
        return new stream();
    }
    
}());


 