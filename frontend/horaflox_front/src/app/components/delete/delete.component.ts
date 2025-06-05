import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {

  @Output() confirmDelete: EventEmitter<void> = new EventEmitter<void>(); //Con Output para decirle al componente padre que se elimine el registro cuando se emita el evento.
  @Output() cancelDelete: EventEmitter<void> = new EventEmitter<void>();  //Con Output para decirle al componente padre que cierre el componente.

  clickConfirm() {
    this.confirmDelete.emit(); //Emitimos el evento de que hemos hecho click en 'Sí' del html.
  }

  clickCancel() {
    this.cancelDelete.emit(); //Emitimos el evento de que hemos hecho click en 'No' del html.
  }

}
