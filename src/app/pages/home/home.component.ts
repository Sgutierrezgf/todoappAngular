import { CommonModule } from '@angular/common';
import { Component, computed, signal, effect, inject, Injector } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Aprender angular',
      completed: false
    },
  ]);

  filter = signal<'all' | 'pending' | 'completed'>('all');

  tasksByFilter = computed(()=>{
    const filter = this.filter()
    const task = this.tasks()

    if(filter === 'pending'){
      return task.filter(task => !task.completed)
    }
    if(filter === 'completed'){
      return task.filter(task => task.completed)
    }
    return task
  })

  newTasksCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  })

  injector = inject(Injector)

  ngOnInit(){
    const storage = localStorage.getItem('tasks')
    if(storage){
      const tasks = JSON.parse(storage)
      this.tasks.set(tasks)
    }
    this.trackTasks()
  }

  trackTasks(){
    effect(()=>{
      const tasks = this.tasks()
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }, {injector: this.injector})
  }

  changeHandler(){
    if(this.newTasksCtrl.valid){
      const value = this.newTasksCtrl.value.trim()
      if(value !== ''){
        this.addTask(value)
        this.newTasksCtrl.setValue('')
      }
    }
  }

  addTask(title: string){
    const newTask={
      id: Date.now(),
      title,
      completed: false
    }
    this.tasks.update((tasks)=> [...tasks, newTask])
  }

  deleteTask(index: number){
    this.tasks.update((tasks) => tasks.filter((task,position)=> position !== index))
  }

  updateTask(index: number){
    this.tasks.update((tasks)=>{
      return tasks.map((task, position)=>{
        if(position === index){
          return{
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }

  updateTaskEditingMode(index: number){
    this.tasks.update((tasks)=>{
      return tasks.map((task, position)=>{
        if(position === index){
          return{
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      })
    })
  }

  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      })
    });
  }

  changeFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter)
  }
}
