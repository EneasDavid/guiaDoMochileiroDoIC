#include <stdio.h>

int main() {
    double notaUm, notaDois, notaFinal=5.5;
    scanf("%lf %lf", &notaUm, &notaDois);
    double media=(notaUm+notaDois)/2;
    int final=media<7?1:0;
    notaFinal-=(media*.6);
    printf("Sua média atual é %.2lf.\n", (media));
    if(final) printf("Você precisa de %.2lf pontos na final para atingir a média 5.5.\n", notaFinal/.4);
    else printf("Sua média atual já é igual ou maior que 7.\n");
    return 0;
}

/*
media ponderada

x=(nota*peso+nota*peso)/100
x-(nota*peso/100)=(nota*peso)/100
*/