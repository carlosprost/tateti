import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output() inicio: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() juego: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() title!: string;

  back(){
    this.inicio.emit(true);
    this.juego.emit(false);
  }

}
