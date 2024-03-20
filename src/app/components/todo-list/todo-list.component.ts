import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Todo } from '../../types';
import { CheckBoxComponent } from '../check-box/check-box.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DateService } from '../../services/date.service';
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CheckBoxComponent, CommonModule,RouterLink, FormsModule],
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

  constructor(private apiService: ApiService, public dateService: DateService){
  }

  fetchData = () => {
    this.apiService.getData().subscribe((todos: Todo[]) => {
      this.todosList = todos;
      this.isLoading = false;
    })
  }

  addTodo = () => {
    this.todosList.push({Name: this.todoObj.name,Description: this.todoObj.description, Done: this.todoObj.status, Expenses: this.todoObj.expenses, Id: this.todosList.length + 1, Created: this.todoObj.created})
  }
  
  ngOnInit(){
    this.fetchData(); 
  }
}
