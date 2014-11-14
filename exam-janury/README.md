#Student Solution of AP assignement january 2014

##Exercise 1
###Grammar:
E-> E + NUM | NUM
NUM -> digit

eliminate left-recursion
E   -> E1 + NUM
E1  -> E | NUM
NUM -> digit

possible derivation:
E -> E1 + NUM -> E1 + NUM + NUM -> NUM + NUM + NUM -> digit + digit + digit
