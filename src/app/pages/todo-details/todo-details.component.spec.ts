import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { TodoDetailsComponent } from './todo-details.component';
import { DecimalPipe } from '@angular/common';
import { Todo } from '../../types';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TodoDetailsComponent', () => {
  let component: TodoDetailsComponent;
  let service: ApiService;
  let route: ActivatedRoute;
  let decimalPipe: DecimalPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoDetailsComponent, HttpClientTestingModule],
     
      providers: [
        ApiService,
        DecimalPipe,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jasmine.createSpy('get').and.returnValue('123')
              }
            }
          }
        }
      ]
    }).compileComponents();

    service = TestBed.inject(ApiService);
    route = TestBed.inject(ActivatedRoute);
    decimalPipe = TestBed.inject(DecimalPipe);
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(TodoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fetch data and set todo properties', fakeAsync(() => {
    // Mock data
    const mockItem: Todo = {
      Id: 123,
      Name: 'Test Todo',
      Description: 'Test Description',
      Created: new Date(),
      Expenses: 10.5,
      Done: true
    };

    // Mock service getData method
    spyOn(service, 'getData').and.returnValue(of([mockItem]));

    component.ngOnInit();
    tick();

    // Assert
    expect(route.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(service.getData).toHaveBeenCalled();
    expect(component.filteredElement).toEqual(mockItem);
    expect(component.todo).toEqual({
      Name: 'Test Todo',
      Description: 'Test Description',
      Created: jasmine.any(Date),
      Expenses: 10.5,
      Done: true,
      Id: 123
    });
    expect(component.daysAgo).toBeGreaterThanOrEqual(0);
  }));
});