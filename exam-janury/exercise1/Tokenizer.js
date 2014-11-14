(function(){

    function Tokenizer(stream){
        var s = stream;

        var eatWS = function(){
            if (s.peek() == ' ' && s.peek() !== undefined){
                s.consume();
                eatWS();
            }
        };

        var currentToken = null;

        var parseNum = function (num){
            var c = s.peek();
            if (c === undefined)
              return num;
            c = c.charCodeAt();
            if (c >= '0'.charCodeAt() && c <= '9'.charCodeAt()){
              s.consume();
              return parseNum(num*10 + (c - '0'.charCodeAt()));
            }else return num;
        };

        this.consumeToken = function(){
            eatWS();
            var c = s.peek();
            if (c !== undefined){
              if (c.charCodeAt() >= '0'.charCodeAt() && c.charCodeAt() <= '9'.charCodeAt()){
                currentToken = parseNum(0);
                //s.consume();
              }else if (c == '+'){
                currentToken = 'plus';
                s.consume();
              }
            }else currentToken = null;
        };

        this.lastToken = function(){
            return currentToken;
        };
    }

     module.exports.getInstance = function(stream){
       var t = new Tokenizer(stream);
       t.consumeToken();
       return t;
   };

}());
