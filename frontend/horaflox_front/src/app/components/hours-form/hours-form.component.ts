import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HourInterface } from '../../interfaces/HourInterface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HoursService } from '../../services/hours.service';

@Component({
  selector: 'app-hours-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './hours-form.component.html',
  styleUrl: './hours-form.component.css'
})
export class HoursFormComponent implements OnInit {

  @Input() editMode: boolean = false; //Con Input para decirle al hijo si el formulario está en modo edición.
  @Output() closeEdit: EventEmitter<void> = new EventEmitter<void>(); //Con Output para decirle al componente padre que se cierre el formulario cuando se emita el evento.
  @Input() hour!: HourInterface; //Con Input para recibir los datos de la hora a editar.

  closeForm() { //Método que emite un evento al cerrar el formulario.
    this.closeEdit.emit();
  }

  form!: FormGroup; //Hacemos que el formulario sea reactivo.

  constructor(private fb: FormBuilder, private hoursService: HoursService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({ //Inicializamos el formulario vacio.
      hours: [null, [Validators.required, Validators.min(0.25)]], //Ponemos que es obligatorio rellenar este campo y que tiene que ser mínimo 0.25 horas.
      date: ['', [Validators.required]], //Ponemos que es obligatorio el campo de la fecha.
      description: ['', [Validators.maxLength(36)]], //Ponemos que en este campo el máximo de carácteres es de 36.
    });

    if (this.editMode && this.hour) { //Si estamos editando y tiene datos, cargamos los valores del formulario con sus datos.
      this.form.patchValue({
        hours: this.hour.hours,
        date: this.hour.date,
        description: this.hour.description,
      });
    }

  }

  onSubmit() {
    this.form.markAllAsTouched(); // Muestra los errores al darle a 'Añadir' o a 'Guardar'.

    if (this.form.valid) {
      const hourData: HourInterface = this.form.value;

      if (this.editMode && this.hour?.id) {
        this.hoursService.updateHour(this.hour.id, hourData); //Editamos la hora si estamos en editar.
        this.closeForm();
      } else {
        this.hoursService.createHour(hourData).subscribe(() => { //Creamos la hora si estamos en el modo de registro.
          this.hoursService.getAllHours(); //Actualizamos los datos de las horas.
          this.router.navigate(['inicio/ver-horas']); //Navegamos a 'ver horas' al registrar una hora nueva.
        });
      }
    }
  }

}
