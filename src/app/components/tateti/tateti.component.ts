import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.scss'],
})
export class TatetiComponent {
  @Input() title!: string;
  @Input() start!: boolean;

  piezaX = {
    pieza: 'X',
    style: 'X',
  };
  piezaO = {
    pieza: 'O',
    style: 'O',
  };

  X: boolean = true;
  win: boolean = false;
  empate: boolean = false;

  mensaje: string = '';

  
  llenarCasilla(event: Event) {
    let casilla = event.target as HTMLDivElement;

    if (casilla.innerHTML == '') {
      this.colocarPieza(casilla);
      this.cambiarTurno();
    }
    this.comprobarJugadaGanadora();
  }

  colocarPieza(casilla: HTMLDivElement) {
    if (this.X) {
      casilla.innerHTML = this.piezaX.pieza;
      casilla.classList.add(this.piezaX.style);
    } else {
      casilla.innerHTML = this.piezaO.pieza;
      casilla.classList.add(this.piezaO.style);
    }
  }

  cambiarTurno() {
    this.X = !this.X;
  }

  comprobarJugadaGanadora() {
    let casillas = document.querySelectorAll('.casilla');
    let completeAll: number = 0;
    let casillasGanadoras = [
      [casillas[0], casillas[1], casillas[2]],
      [casillas[3], casillas[4], casillas[5]],
      [casillas[6], casillas[7], casillas[8]],
      [casillas[0], casillas[3], casillas[6]],
      [casillas[1], casillas[4], casillas[7]],
      [casillas[2], casillas[5], casillas[8]],
      [casillas[0], casillas[4], casillas[8]],
      [casillas[2], casillas[4], casillas[6]],
    ];

    for (let p of casillasGanadoras) {
      if (this.comprobarCasillas(p) == 'win') {
        this.win = true;
        this.mensaje = 'GANADOR';
        this.start = false;
        this.ponerRaya(p)
      }else if(this.comprobarCasillas(p) == 'complete'){
        completeAll++;
      }
    }

    if(completeAll == 8){
      this.empate = true;
      this.mensaje = 'EMPATE';
      this.start = false;
    }
  }

  comprobarCasillas(casillas: Element[]) {
    let pieza = casillas[0].innerHTML;
    let result: string = '';
    if (casillas.every((v) => v.innerHTML != '' && v.innerHTML === pieza)) {
      result = 'win'
    }else if(casillas.every((v) => v.innerHTML != '')){
      result = 'complete'
    }
    
    return result;
  }

  ponerRaya(casillas: Element[]){
    let col = this.columna(casillas);
    let fil = this.fila(casillas);
    let diag = this.diagonal(casillas);
    console.log(col, fil, diag);
    
    let rayaGanador = document.querySelector('#rayas') as HTMLDivElement;
    rayaGanador.parentElement?.classList.remove('invisible');
      console.log(rayaGanador);
    

    if(col != ''){
      rayaGanador.classList.add(col);
      console.log(rayaGanador.classList);
      
    }else if(fil != ''){
      rayaGanador.classList.add(fil);
      console.log(rayaGanador.classList);
    }else if(diag != ''){
      rayaGanador.classList.add(diag);
      console.log(rayaGanador.classList);
    }
  }

  columna(casillas: Element[]){
    let col: string = '';
    if(this.esColumna1(casillas)){
      col = 'col1';
    }else if(this.esColumna2(casillas)){
      col = 'col2';
    }else if(this.esColumna3(casillas)){
      col = 'col3';
    }
    
    return col;
  }

  fila(casillas: Element[]){
    let fil: string = '';
    if(this.esFila1(casillas)){
      fil = 'row1';
    }else if(this.esFila2(casillas)){
      fil = 'row2';
    }else if(this.esFila3(casillas)){
      fil = 'row3';
    }
    return fil;
  }

  diagonal(casillas: Element[]){
    let diag: string = '';
    if(this.esDiagonal1(casillas)){
      diag = 'diag1';
    }else if(this.esDiagonal2(casillas)){
      diag = 'diag2';
    }
    return diag;
  }

  esColumna1(casillas: Element[]){
    
    return casillas[0].id == '0' && casillas[1].id == '3' && casillas[2].id == '6';
  }

  esColumna2(casillas: Element[]){
    return casillas[0].id == '1' && casillas[1].id == '4' && casillas[2].id == '7';
  }

  esColumna3(casillas: Element[]){
    return casillas[0].id == '2' && casillas[1].id == '5' && casillas[2].id == '8';
  }

  esDiagonal1(casillas: Element[]){
    return casillas[0].id == '2' && casillas[1].id == '4' && casillas[2].id == '6';
  }

  esDiagonal2(casillas: Element[]){
    return casillas[0].id == '0' && casillas[1].id == '4' && casillas[2].id == '8';
  }

  esFila1(casillas: Element[]){
    return casillas[0].id == '0' && casillas[1].id == '1' && casillas[2].id == '2';
  }

  esFila2(casillas: Element[]){
    return casillas[0].id == '3' && casillas[1].id == '4' && casillas[2].id == '5';
  }

  esFila3(casillas: Element[]){
    return casillas[0].id == '6' && casillas[1].id == '7' && casillas[2].id == '8';
  }

  reiniciarJuego(){
    let tablero = document.querySelector('.tablero');
    let casillas = document.querySelectorAll('.casilla');

    tablero?.classList.remove('ganador');
    this.reiniciarCasillas(casillas);    
    this.reiniciarVariables();
    this.reiniciarRaya();
  }

  reiniciarCasillas(casillas: NodeListOf<Element>){
    casillas.forEach((casilla) => {
      casilla.innerHTML = '';
      casilla.classList.remove('X');
      casilla.classList.remove('O');
    });
  }

  reiniciarVariables(){
    this.start = true;
    this.win = false;
    this.empate = false;
  }

  reiniciarRaya(){
    let rayaGanador = document.querySelector('#rayas') as HTMLDivElement;
    rayaGanador.parentElement?.classList.add('invisible');
    rayaGanador.classList.remove('col1');
    rayaGanador.classList.remove('col2');
    rayaGanador.classList.remove('col3');
    rayaGanador.classList.remove('row1');
    rayaGanador.classList.remove('row2');
    rayaGanador.classList.remove('row3');
    rayaGanador.classList.remove('diag1');
    rayaGanador.classList.remove('diag2');
  }
}
