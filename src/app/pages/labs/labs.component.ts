import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Bienvenido a mi primera aplicaciion de Angular';
  tasks = signal([
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componente',
    'Crear servicio',
  ]);
  name = signal('Sebastian')
  age= 35
  disabled = true
  img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8kaL634jBYaVHzczHdzni68wj2vrnUaiAPGlMx5pGmg&s'

  person = {
    name: 'sebastian',
    age: 35,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8kaL634jBYaVHzczHdzni68wj2vrnUaiAPGlMx5pGmg&s'
  }
  clickHandler() {
    alert('Hola')
  }

  inputHandler(event: Event){
    const input = event.target as HTMLInputElement
    const newValue = input.value
    this.name.set(newValue)
    console.log(newValue)
  }
  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement
    console.log(input.value)
      }
}
