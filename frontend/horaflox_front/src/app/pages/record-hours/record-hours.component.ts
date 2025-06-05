import { Component, OnInit } from '@angular/core';
import { HoursFormComponent } from "../../components/hours-form/hours-form.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-record-hours',
  imports: [HoursFormComponent],
  templateUrl: './record-hours.component.html',
  styleUrl: './record-hours.component.css'
})
export class RecordHoursComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('HoraFlox - registrar horas'); //Cambiamos el nombre de la pestaña del navegador.
  }

}
