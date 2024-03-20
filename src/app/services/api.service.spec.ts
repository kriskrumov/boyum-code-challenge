import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    testingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
  
    testingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all todos', () => {

    const mockTodos = [
      { id: 1, title: 'Todo 1' },
      { id: 2, title: 'Todo 2' },
      { id: 3, title: 'Todo 3' },
      { id: 4, title: 'Todo 4' },
      { id: 5, title: 'Todo 5' },
      { id: 6, title: 'Todo 6' },
    
    ];

  
    service.getData().subscribe((todos: any) => {
   
      expect(todos).toBeTruthy();
   
      expect(todos.length).toBe(mockTodos.length);
      
    });

 
    const req = testingController.expectOne('https://boyumcodechallenge.azurewebsites.net/api/todolist');
  
    expect(req.request.method).toBe('GET');
 
    req.flush(mockTodos);
  });
});