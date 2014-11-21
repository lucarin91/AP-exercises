//func(x) -> {return x + 4} 
//Split(func,int,list)

// E ->  FUNC1 SPLIT1
// FUNC1 -> FUNC FUNC1 | epsilon
// SPLIT1 -> SPLIT SPLIT1 | epsilon  
// SPLIT -> Split( IDE,INT,LIST)
// FUNC -> IDE(IDE) -> { return EXP }
// IDE -> string
// INT -> num
// LIST -> [LIST1]
// LIST1 -> INT S
// S -> ,LIST1 | epsilon

// EXP -> EXP1 P
// EXP1 -> TERM Q
// P -> + EXP | epsilon
// Q -> - EXP1 | epsilon
// TERM -> IDE | INT

module febraryExam.Main
open System.Collections.Generic
open System
open System.IO

type Token =
    |BOF
    |EOF
    |OpenCurly
    |CloseCurly
    |OpenBrace
    |CloseBrace
    |OpenSquare
    |CloseSquare
    |Func
    |Ide of string
    |Int of int
    |Plus
    |Minus
    |Comma
    |Arrow
    |Return
    |Split

type Tokenizer ( s  : StreamReader) =

    let mutable lastToken:Token = BOF

    let rec eatWS() =
        if not(s.EndOfStream) && char(s.Peek ()) = ' ' then
            s.Read() |> ignore
            eatWS()

    let eatChar() = s.Read() |> ignore

    let parseArrow(): Token =
        let f = char (s.Peek())
        if f ='>' then eatChar(); Arrow
        else Minus
        
    let rec parseInt(n) =
        if s.EndOfStream then n
        else
            let c = s.Peek()
            if int(c) >= int('0') && int(c) <= int('9') then
                eatChar()
                parseInt(n*10 + (c - int(0)))
            else n
    
    let rec parseStr(n) =
        if s.EndOfStream then n
        else
            let c = s.Peek()
            if (int(c) >= int('A') && int(c) <= int('Z')) || (int(c) >= int('0') && int(c) <= int('9')) then
                eatChar()
                parseStr(n + string((char(c))))
            else n
            
    member this.nextToken() =
        eatWS()
        if s.EndOfStream then lastToken <- EOF
        else
            let c = char(s.Peek())
            lastToken <- 
            match c with
                | '(' -> eatChar(); OpenBrace
                | ')' -> eatChar(); CloseBrace
                | '{' -> eatChar(); OpenCurly
                | '}' -> eatChar(); CloseCurly
                | '[' -> eatChar(); OpenSquare
                | ']' -> eatChar(); CloseSquare
                | '+' -> eatChar(); Plus
                | ',' -> eatChar(); Comma
                | '-' -> eatChar(); parseArrow()
                | _ ->
                    if int(c) >= int('0') && int(c) <= int('9') then
                        Int( parseInt(0) )
                    elif int(c) >= int('A') && int(c) <= int('z') then
                        let str = parseStr("")
                        match str with
                            |"return" -> Return
                            |"split" -> Split
                            |_-> Ide(str)
                    else
                        failwith "error Tokenizer"
                        
    member this.currentToken with get() = lastToken
                        

type Expr =
    | Sum of Expr * Expr
    | Minus of Expr * Expr
    
type Lan =
    | Funcc of string * Expr
    | Splitt of string * int * Array
    | Epsilon


type Parser (t:Tokenizer)=
     let mutable m = new Dictionary<string*string,string>()
     m.Add(("P","+", "UPPERS")



(*
type Parser (t:Tokenizer) =
    
// E ->  F M
// F -> S(S) -> { return E } F | epsilon
// M -> s(S,I,L) M | epsilon  
// S -> string
// I -> num
// L -> [C]
// C -> I B
// B -> ,C | epsilon

// EXP -> EXP1 P
// EXP1 -> TERM Q
// P -> + EXP | epsilon
// Q -> - EXP1 | epsilon
// TERM -> IDE | INT
    
    let rec parseFunc(token) =
        if t.currentToken = token then
            t.nextToken
            true
        else
            false            
            
    let rec Func() = 
        if t.currentToken = Ide then
            t.nextToken()
            if parseFunc(OpenBrace) &&
               parseFunc(Ide) &&
               parseFunc(CloseBrace) &&
               parseFunc(Arrow) &&
               parseFunc(OpenCurly) &&
               parseFunc(Return) then
            
            parseExp()
            t.nextToken()
            if t.currentToken = closeCurly   
                Func()
        else
            Epsilon   
            
         
            
    let rec Split()
        if t.currentToken = Split then
            parseSplit()
            t.nextToken
            Split()
        else
            epsilon    
    
    
    let rec E() =
        let func = Func()
        t.nextToken()
        let split = Split()
        (func,split)
    
    member getTree() =
*)
    