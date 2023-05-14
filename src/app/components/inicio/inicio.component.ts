import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  @Input() title!: string;
  @Input() subtitle!: string;

  @Output() inicio: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() juego: EventEmitter<boolean> = new EventEmitter<boolean>();


  jugar(){
    this.inicio.emit(false);
    this.juego.emit(true);
  }

  volver(){
    window.history.back();
  }
}
