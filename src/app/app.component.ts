import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tateti';
  subtitle: string = 'El clásico juego para la familia'

  inicio: boolean = true;
  juego: boolean = false;

  cambiarEstadoDeInicio(event: boolean){
    this.inicio = event;
  }
  cambiarEstadoDeJuego(event: boolean){
    this.juego = event;
  }
}
