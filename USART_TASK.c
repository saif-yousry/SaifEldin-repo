#define F_CPU 16000000UL
#define baud 9600
#define MYUBRR (F_CPU/16/baud -1)

#include <avr/io.h>
#include <util/delay.h>
#include <stdlib.h>

void intialization ( unsigned int ubrr){
  UBRR0H=(unsigned char)(ubrr>>8);
  UBRR0L=(unsigned char)(ubrr);
  UCSR0B= (1<<RXEN0) |(1<<TXEN0);
  UCSR0C=(1<<USBS0)|(3<<UCSZ00);
}
unsigned char recieveing (void){
  while(!(UCSR0A &(1<<RXC0)));
  return UDR0;
}
void transmit(unsigned int data){
   while(!(UCSR0A & (1<<UDRE0)));
   UDR0 = data; 
}
int main(){
  intialization(MYUBRR);
  char ch;
  while(1){
    ch=recieveing();
    ch+=1;
    transmit(ch);
  }
  return 0 ;
}
             