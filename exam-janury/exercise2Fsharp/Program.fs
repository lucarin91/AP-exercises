
// NOTE: If warnings appear, you may need to retarget this project to .NET 4.0. Show the Solution
// Pad, right-click on the project node, choose 'Options --> Build --> General' and change the target
// framework to .NET 4.0 or .NET 4.5.

module exercise2Fsharp.Main

open System
open System.IO

type Token =
    | OpenBrace
    | ClosedBrace
    | Equal
    | Arrow
    | Num of int
    | Ide of string
    | Let
    | In
    | Fun
    | App
    | EOF
    | BOF

type Tokenizer(s:StreamReader) =

    let eatChar() = s.Read() |> ignore

    let rec eatWS () =
        if not(s.EndOfStream) && char(s.Peek()) = ' ' then
            s.Read() |> ignore
            eatWS()

    let rec parseInt(n) =
        if s.EndOfStream then n
        else
            let c = s.Peek()
            if c >= int('0') && c<= int('9') then
                eatChar()
                parseInt(n * 10 + (c - int('0')))
            else n
    
    let rec parseIde(n) =
        if s.EndOfStream then n
        else
            let c = s.Peek()
            if c >= int('A') && c<= int('z') then
                eatChar()
                parseIde(n + string(c))
            else n
    
    let parseArrow() : Token =
        if s.Peek() = int('>') then
            eatChar()
            Arrow
        else failwith("arrowParse, unexpected character after -")
            
    let mutable lastToken:Token = BOF
    
    member this.CurrentToken with get() = lastToken

    member this.NextToken() =
        eatWS()
        if s.EndOfStream then lastToken <- EOF
        else
            let c = char(s.Peek())
            match c with
                | '-' -> eatChar(); lastToken <- parseArrow()
                | '=' -> eatChar(); lastToken <- Equal
                | '(' -> eatChar(); lastToken <- OpenBrace
                | ')' -> eatChar(); lastToken <- ClosedBrace
                | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' ->
                    lastToken <- Num(parseInt(0))
                | _ -> if int(c) >= int('A') && int(c)<= int('z') then
                            lastToken <- Ide(parseIde(""))
                       else
                            failwith("Unexpeted character")
                            

let ms = new MemoryStream()
let w = new StreamWriter(ms)
w.Write("234234")
w.Flush()
ms.Position <- 0L

let s = new StreamReader(ms)
let t = Tokenizer(s)

while t.CurrentToken <> EOF do
    t.NextToken() |> ignore
    printf "%s\n" (t.CurrentToken.ToString())
    
printf "no"