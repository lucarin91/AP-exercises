open System

let mutable tmp = 3;

match tmp with 
    | 3 -> printf "ciao"; tmp<-5
    |_ -> printf "aaa"


