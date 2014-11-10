(function(){
    
    function Tokenizer(stream){
        var s = stream;
        
        var eatWS = function(){
            if (s.peek() == ' ' && s.peek() !== undefined){
                s.consume();
                eatWS();
            }
        }
        
        var currentToken = null;
        
        var parseList = function rec (val){
            eatWS();
            
            var c = s.peek();
            
            if (c.charCodeAt() >= '0'.charCodeAt() && c.charCodeAt() <= '9'.charCodeAt()){
                s.consume();
                val.push(c.charCodeAt() - '0'.charCodeAt());
                console.log(val);
                rec(val);
                
            }else if ( c == ',' ){
                s.consume();
                console.log(val);
                rec(val);
            }else if ( c == '}'){
                console.log('graffa' + val);
                s.consume();
                return val;
            }else
                return 'error';
        }
        
        var parseListIT = function(){
            eatWS();
            
            var val = [];
            
            var c = s.peek();
            
            while (c != '}'){
                if (c.charCodeAt() >= '0'.charCodeAt() && c.charCodeAt() <= '9'.charCodeAt()){
                    s.consume();
                    val.push(c.charCodeAt() - '0'.charCodeAt());
                    c = s.peek();
                }else if ( c == ',' ){
                    s.consume();
                    c = s.peek();
                }else 
                    return 'error';
            }
            s.consume();
            return val
        }
        
        this.consumeToken = function(){
            eatWS();
            var c = s.peek();
            if (c !== undefined){
                switch (c) {
                    case '{':
                        s.consume();
                        currentToken = parseListIT();
                        break;
                        
                    case '+':
                        currentToken = 'plus';
                        s.consume();
                        break;
                        
                    case '-':
                        currentToken = 'menos';
                        s.consume();
                        break;
                        
                    default:
                        return 'error';
                }
            }else
                currentToken = null;
        }
        
        this.lastToken = function(){
            return currentToken;
        }
    }
    
     module.exports.getTokenizer = function(stream){
        return new Tokenizer(stream);
    }
    
}());
