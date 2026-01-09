import { HttpInterceptorFn } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export const mockHttpInterceptor: HttpInterceptorFn = (req, next) => {
  // Мокаем /api/user
  if (req.url === '/api/user' && req.method === 'GET') {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      position: 'Frontend Developer'
    };
    return of(new HttpResponse({ status: 200, body: mockUser })).pipe(delay(500));
  }

  // Мокаем /api/todos
  if (req.url === '/api/todos' && req.method === 'GET') {
    const mockTodos = [
      { id: 1, title: 'Learn Angular Signals' },
      { id: 2, title: 'Build ngx-api-cache demo' },
      { id: 3, title: 'Deploy to Vercel' }
    ];
    return of(new HttpResponse({ status: 200, body: mockTodos })).pipe(delay(400));
  }

  // Если URL не совпал — пропускаем (для демо такого быть не должно)
  return next(req);
};
