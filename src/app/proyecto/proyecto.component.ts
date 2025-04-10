import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proyecto } from './Models/proyecto.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 👈 Para *ngIf y *ngFor
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-proyecto',
  standalone: true, // 👈 Asegúrate de que este componente sea standalone si es tu intención
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.css',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterOutlet], // 👈 Aquí agregas los módulos necesarios
})
export class ProyectoComponent implements OnInit {
  proyectos: Proyecto[] = [];
  mostrarFormulario = false;
  formulario: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.formulario = this.fb.group({
      Nombre_Proyecto: [''],
      Descripcion: [''],
      Fecha_Inicio: [''],
      Fecha_Final: [''],
      Estado_Proyecto: [''],
    });
  }

  ngOnInit(): void {
    this.cargarProyectos();
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) this.formulario.reset();
  }

  cargarProyectos(): void {
    this.http
      .get<any>('http://127.0.0.1:8000/Proyecto/Obtener_Proyectos')
      .subscribe({
        next: (data) => {
          this.proyectos = data.proyecto;
          console.log(this.proyectos)
        },
        error: (err) => {
          console.error('Error al cargar proyectos', err);
        },
      });
  }

  crearProyecto(): void {
    const proyecto = this.formulario.value;

    this.http
      .post('http://127.0.0.1:8000/Proyecto/Crear_Proyecto', proyecto)
      .subscribe({
        next: () => {
          this.formulario.reset();
          this.mostrarFormulario = false;
          this.cargarProyectos();
        },
        error: (err) => {
          console.error('Error al crear proyecto', err);
        },
      });
  }

  getEstadoClase(estado: string): string {
    const estadoLower = estado?.toLowerCase();
    if (estadoLower === 'pendiente') return 'status-pendiente';
    if (estadoLower === 'en progreso') return 'status-en-progreso';
    if (estadoLower === 'completado') return 'status-completado';
    return '';
  }
}
