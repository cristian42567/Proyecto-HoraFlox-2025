import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HourInterface } from '../interfaces/HourInterface';

@Injectable({
  providedIn: 'root'
})

export class HoursService {

  private subjectHours: BehaviorSubject<HourInterface[]> = new BehaviorSubject<HourInterface[]>([]); //BehaviorSubject para almacenar y emitir la lista de horas.

  observableHours: Observable<HourInterface[]> = this.subjectHours.asObservable(); //Observable expuesto para que los componentes se suscriban.

  constructor(private hours: HttpClient) { }

  getAllHours() { //Método get que recoge las horas del backend y actualiza el BehaviorSubject.
    this.hours
      .get<HourInterface[]>('http://localhost:8080/horaflox/ver-horas')
      .subscribe((data) => {
        this.subjectHours.next(data);
      });
  }

  createHour(newHour: HourInterface) { //Método create para crear la hora.
    return this.hours.post('http://localhost:8080/horaflox/guardar-hora', newHour)
    //No pongo .subscribe porque lo pongo en 'hours-form.component.ts', así me puedo suscribir también a la navegación.
  }

  updateHour(id: number, updatedHour: HourInterface) { //Método put para actualizar la hora.
    this.hours
      .put(`http://localhost:8080/horaflox/actualizar-hora/${id}`, updatedHour)
      .subscribe(() => {
        this.getAllHours(); //Refrescamos las horas tras actualizar la hora.
      });
  }


  deleteHour(id: number) { //Método delete para eliminar la hora.
    this.hours
      .delete(`http://localhost:8080/horaflox/eliminar-hora/${id}`)
      .subscribe(() => {
        const currentHours = this.subjectHours.getValue(); //Obtenemos el valor actual.
        const updatedHours = currentHours.filter(h => h.id !== id); //Quitamos la hora con ese id.
        this.subjectHours.next(updatedHours); //Emitimos el nuevo valor.
      });
  }

}
