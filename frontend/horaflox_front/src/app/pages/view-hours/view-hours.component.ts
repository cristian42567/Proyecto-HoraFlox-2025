import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HoursService } from '../../services/hours.service';
import { HourInterface } from '../../interfaces/HourInterface';
import { CommonModule } from '@angular/common';
import { HoursFormComponent } from "../../components/hours-form/hours-form.component";
import { DeleteComponent } from "../../components/delete/delete.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-hours',
  imports: [RouterLink, CommonModule, HoursFormComponent, DeleteComponent],
  templateUrl: './view-hours.component.html',
  styleUrl: './view-hours.component.css'
})
export class ViewHoursComponent implements OnInit {

  constructor(private service: HoursService, private title: Title) { }

  hours: HourInterface[] = []; //Creamos un array de horas con su respectiva interfaz para almacenar las horas que se obtienen en un servicio.
  hourToEdit!: HourInterface; //Guardamos los datos de la hora que se va a editar para cargarlos en el formulario de editar.
  totalHours: number = 0; //Creamos una varible para contar el total de horas.

  ngOnInit(): void {
    this.title.setTitle('HoraFlox - ver horas'); //Cambiamos el nombre de la pestaña del navegador.
    this.service.observableHours.subscribe((data) => {
      this.hours = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); //Ordenamos las fechas para que salgan en orden.
      this.totalHours = this.hours.reduce((acc, hour) => acc + hour.hours, 0); //Sumamos todas las horas del array hours.
    });
    this.service.getAllHours(); //Pedimos los datos a la API del backend.
  }

  @Input() editMode: boolean = false; //Con Input permitimos escuchar 'editMode' al hijo.
  editClicked: boolean = false; //Variable para saber si el usuario ha hecho click en el botón editar.
  deleteClicked: boolean = false; //Variable para saber si el usuario ha hecho click en el botón eliminar.
  idToDelete: number = 0; //Variable para guardar el ID a eliminar.

  clickOnEdit(hour: HourInterface) {
    this.hourToEdit = { ...hour }; //Copiamos los datos de la fila 'hour' en hourToEdit.
    this.editClicked = true; //Al hacer click en Editar 'editClicked' cambia a true y esto hará que se muestre el formulario.
    document.body.style.overflow = 'hidden'; //Al abrir el formulario de editar escondemos el scroll si es que lo tiene.
  }

  closeEditHandler() {
    this.editClicked = false; //Ocultamos el formulario.
    document.body.style.overflow = 'visible'; // Restauramos el scroll al salir de editar.
  }

  showDeleteConfirmation(id: number) {
    this.idToDelete = id; //Obtenemos el ID del registro a eliminar.
    this.deleteClicked = true; //Ponemos la varible en true para que abra el componente.
    document.body.style.overflow = 'hidden'; //Al abrir el formulario de editar escondemos el scroll si es que lo tiene.
  }

  cancelDelete() {
    this.deleteClicked = false; //Ponemos la varible en false para que cierre el componente.
    this.idToDelete = 0; //Reiniciamos el valor de ID.
    document.body.style.overflow = 'visible'; // Restauramos el scroll al salir de editar.
  }

  confirmDelete() {
    this.service.deleteHour(this.idToDelete); //Llamamos al servicio para eliminar la hora.
    this.deleteClicked = false; //Ponemos la varible en false para que cierre el componente.
    document.body.style.overflow = 'visible'; // Restauramos el scroll al salir de editar.
  }

}
