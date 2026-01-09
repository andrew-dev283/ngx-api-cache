import {Component, inject, OnInit} from '@angular/core';
import { NgxApiCacheService, CacheResult } from 'ngx-api-cache';

interface User {
  id: number;
  name: string;
  position: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    .container { max-width: 800px; margin: 0 auto; padding: 2rem; font-family: sans-serif; }
    .card { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; margin: 1rem 0; }
    .loading { color: #1976d2; }
    .error { color: #d32f2f; }
    .content { background: #f5f5f5; padding: 1rem; border-radius: 4px; }
    button { margin: 0.5rem 0.25rem; padding: 0.4rem 0.8rem; }
  `]
})
export class AppComponent implements OnInit {
  private apiCache = inject(NgxApiCacheService);

  userResult: CacheResult<User> = this.apiCache.get('/api/user');
  todosResult: CacheResult<{ id: number; title: string }[]> = this.apiCache.get('/api/todos');

  usageExample = `
// In component:
    private apiCache = inject(NgxApiCacheService);
    protected userResult: CacheResult<User> = this.apiCache.get('/api/user');

// In template:
    @if (userResult.data(); as user) {
     &lt;p>{{ user.name }}&lt;/p>
    }
`.trim();

  ngOnInit() {
    setTimeout(() => {
      console.log(this.userResult.loading());
    }, 5000)

  }

  updateUserName() {
    this.userResult.patch(user => ({ ...user, name: 'Alex Updated' }));
  }

  deleteFirstTodo() {
    this.todosResult.patch(todos => todos.slice(1));
  }
}
