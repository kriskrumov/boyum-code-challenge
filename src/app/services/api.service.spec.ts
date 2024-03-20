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
    // After each test, verify that there are no outstanding requests
    testingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all todos', () => {
    // Mock response data
    const mockTodos = [
      { id: 1, title: 'Todo 1' },
      { id: 2, title: 'Todo 2' },
      { id: 3, title: 'Todo 3' },
      { id: 4, title: 'Todo 4' },
      { id: 5, title: 'Todo 5' },
      { id: 6, title: 'Todo 6' },
      // Add more mock data as needed
    ];

    // Subscribe to the service method
    service.getData().subscribe((todos: any) => {
      // Expect the response to be truthy
      expect(todos).toBeTruthy();
      // Expect the length of todos to match the length of mockTodos
      expect(todos.length).toBe(mockTodos.length);
      // You can add more specific expectations here based on your API response structure
    });

    // Expect a single HTTP request
    const req = testingController.expectOne('https://boyumcodechallenge.azurewebsites.net/api/todolist');
    // Expect the request method to be GET
    expect(req.request.method).toBe('GET');
    // Respond to the request with mockTodos data
    req.flush(mockTodos);
  });
});