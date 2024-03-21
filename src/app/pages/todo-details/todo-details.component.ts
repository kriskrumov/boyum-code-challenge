import { Component, LOCALE_ID, Inject } from '@angular/core';
import { Todo } from '../../types';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DateService } from '../../services/date.service';
@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.css'
})
export class TodoDetailsComponent {
  todoId: any;
  days: any;
  filteredElement: any;
  daysAgo: number = 0;
  formatedExpense : string | null = '';
  todo: Todo = {
    Name: '',
    Description: '',
    Created: new Date,
    Done: false,
    Expenses: 0,
    Id: 0
  }

  constructor(private route: ActivatedRoute, private service: ApiService, private decimalPipe: DecimalPipe, @Inject(LOCALE_ID) private locale: string, public dateService: DateService){}

  CalculateDays(dateCreated: any){
    const millisecondsPerDay = 1000 * 3600 * 24;
    const currentDate = Date.now();
    const createdDate = new Date(dateCreated).getTime();
    
    const differenceInMilliseconds = currentDate - createdDate;
    this.daysAgo = Math.round(differenceInMilliseconds / millisecondsPerDay);
  }

  ngOnInit(){
    this.route.params.subscribe(() => {
      this.todoId = this.route.snapshot.paramMap.get('id');
      this.service.getData().subscribe((item) => {
        this.filteredElement = item.find(x => x.Id == this.todoId);
        this.todo = {
          Name: this.filteredElement.Name,
          Description: this.filteredElement.Description,
          Created: this.filteredElement.Created,
          Expenses: this.filteredElement.Expenses,
          Done: this.filteredElement.Done,
          Id: this.filteredElement.Id
        }
        this.formatedExpense = this.decimalPipe.transform(this.filteredElement.Expenses, '1.2-2', this.locale);
        this.CalculateDays(this.todo.Created);
      })
    })
  }
}
