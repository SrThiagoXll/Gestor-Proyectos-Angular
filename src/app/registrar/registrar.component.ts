import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css',
})
export class RegistrarComponent {
  registroForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      Nombre_Usuario: ['', Validators.required],
      Nombre_Completo: ['', Validators.required],
      Correo: ['', [Validators.required, Validators.email]],
      Contrasena: ['', [Validators.required, Validators.minLength(6)]],
      Rol: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const datosRegistro = this.registroForm.value;
      console.log('Formulario enviado:', datosRegistro);
      // Aquí puedes hacer una petición HTTP o lógica adicional
    } else {
      console.log('Formulario inválido');
    }
  }
}
