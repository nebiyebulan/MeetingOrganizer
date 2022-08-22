INPUT = ("nhoJ (Griffith) nodnoL saw (an) (American) ,tsilevon "
         ",tsilanruoj (and) laicos .tsivitca ((A) reenoip (of) laicremmoc "
         "noitcif (and) naciremA ,senizagam (he) saw eno (of) (the) tsrif "
         "(American) srohtua (to) emoceb (an) lanoitanretni ytirbelec "
         "(and) nrae a egral enutrof (from) ).gnitirw")
new_input = []
CORRECT_ANSWER=""
def fix_text(mystr):
    slit=INPUT.split()

    for i in slit:
        if "(" in i:
            i=i.replace("(", "", 1)
            i = i.replace(")", "")
            new_input.append(i)
        else:
            i=i[::-1]
            new_input.append(i)
    CORRECT_ANSWER=' '.join(new_input)
    print(CORRECT_ANSWER)
    return mystr

if __name__ == "__main__":
    print("Correct!" if fix_text(INPUT) == CORRECT_ANSWER else "Sorry, it does not match with the correct answer.")