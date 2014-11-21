#Student Solution of AP assignement january 2014

##Exercise 1
###Grammar:
E-> E + NUM | NUM + NUM
NUM -> digit

E   -> NUM P
P   -> + NUM P1
P1  -> P | epsilon
NUM -> digit

E   -> N P
P   -> + N B
B  -> P | epsilon
N -> digit

possible derivation:
E -> E1 + NUM -> E1 + NUM + NUM -> NUM + NUM + NUM -> digit + digit + digit
