import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  welcome = 'Bienvenido a mi primera aplicaciion de Angular'
  task = [
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componente',
    'Crear servicio'
  ]
}
