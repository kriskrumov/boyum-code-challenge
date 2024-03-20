import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Todo } from '../../types';
import { CheckBoxComponent } from '../check-box/check-box.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TodoElementComponent } from '../todo-element/todo-element.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CheckBoxComponent, CommonModule,RouterLink, TodoElementComponent, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  todosList: Todo[] = [];
  todoObj = {
    name: '',
    description: '',
    status: false,
    expenses: 0,
    id: 0,
    created: new Date(Date.now())
  };
  isLoading: boolean = true;

  constructor(private apiService: ApiService){
  }

  fetchData = () => {
    this.apiService.getData().subscribe((todos: Todo[]) => {
      this.todosList = todos;
      this.isLoading = false;
      console.log(this.todosList.length + 1)
    })
  }

  addTodo = () => {
    this.todosList.push({Name: this.todoObj.name,Description: this.todoObj.description, Done: this.todoObj.status, Expenses: this.todoObj.expenses, Id: this.todosList.length + 1, Created: this.todoObj.created})
  }

  // Checks if the date returned is Valid
  isValidDate(date: any): boolean {
    return !isNaN(new Date(date).getTime());
  }
  
  ngOnInit(){
    this.fetchData(); 
  }
}
