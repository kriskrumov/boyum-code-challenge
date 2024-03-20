import { Component, Input } from '@angular/core';
import { Todo } from '../../types';
@Component({
  selector: 'app-todo-element',
  standalone: true,
  imports: [],
  templateUrl: './todo-element.component.html',
  styleUrl: './todo-element.component.css'
})
export class TodoElementComponent {
@Input() todoElement = {}

ngOnInit(){
  console.log(this.todoElement);
}
}
