es.
{1,2,3} + {1,2,3} => {1,2,3,1,2,3}

{1,2,3} - {1,3} => {2}

{1,2,3} - {1,3} + {4,3} => {2,4,3}


E -> E + E | E - E

E -> {list}

list -> digit | list,digit


//*GOOD*//
E -> OP MIN

OP -> TERM SUM

SUM -> +OP | epsilon

MIN -> -E | epsilon

TERM -> {LIST}

LIST -> digit | list,digit

/*
  LIST2 -> LIST

  LIST -> digit MORE | epsilon

  MORE -> ,LIST | epsilon
*/
