import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HourInterface } from '../../interfaces/HourInterface';
import { HoursService } from '../../services/hours.service';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  hours: HourInterface[] = []; //Array con todas las horas del backend.
  lastHour: HourInterface | null = null; //Variable con la última hora registrada.
  totalWeekHours: number = 0; //Variable que usaremos para almacenar las horas de los últimos siete días.

  constructor(private hoursService: HoursService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('HoraFlox - inicio'); //Cambiamos el nombre de la pestaña del navegador.
    this.hoursService.observableHours.subscribe(data => { //Nos suscribimos al observable que emite las horas cuando están disponibles.
      this.hours = data; //Guardamos las horas en el array.
      this.calculateWidgetData(); //Calculamos los datos que se mostrarán en el widget.
    });
    this.hoursService.getAllHours(); //LLamamos al servicio para que cargue las horas desde la base de datos si aún no lo ha hecho.
  }

  calculateWidgetData() { //Método para calcular los datos para mostrarlos en el widget.
    if (!this.hours.length) {
      this.lastHour = null;
      this.totalWeekHours = 0;
      return;
    }

    this.hours.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); //Ordenamos las horas de más reciente a más antigua.
    this.lastHour = this.hours[0]; //Guardamos la más reciente como la última registrada.

    const now = new Date(); //Obtenemos la fecha actual.

    //Creamos una fecha que representa 7 días atras.
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);

    this.totalWeekHours = this.hours
      .filter(h => new Date(h.date) >= oneWeekAgo) //Filtramos las horas de los últimos 7 días.
      .reduce((sum, h) => sum + h.hours, 0); //Usamos reduce para sumar el número total de horas.
  }

}
