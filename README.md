# ngx-api-cache

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.2.

## Description

This is a very lightweight library for api-cache.

This library does not require third party dependencies

### USAGE

1. Install

   ```bash
   npm i ngx-api-cache 
   ```
   OR

   ```bash
   yarn add ngx-api-cache
   ```

2. Provide HttpClient to your App:

   ```bash
   import { provideHttpClient } from '@angular/common/http';
   
   // In your app config:
   providers: [
     provideHttpClient(), // ← required
     // ... other providers
   ]
   ```
   
3. Inject NgxApiCacheService in any standalone component or service:

   ```bash
     const apiCache = inject(NgxApiCacheService);
     const result: CacheResult<User> = apiCache.get('/api/user');
     
     if you want, you can also add destroyRef: apiCache.get('/api/user', destroyRef);
     
     The returned result object gives you:
     
      data: a readonly signal with the response (or null)
      loading: a readonly signal indicating if a request is in progress
      error: a readonly signal with the error (or null)
      refresh(): re-fetches data from the API (bypassing cache)
      patch(updater): lets you update the cached value directly (e.g., for optimistic UI)
   ```
4. Example for template:

   ```
@if (result.loading(); as loading) {
  <p>Loading... {{ loading }}</p>
}

@if (result.error(); as error) {
  <div class="error">
    <p>Failed to load data.</p>
    <button (click)="result.refresh()">Retry</button>
  </div>
}

@if (result.data(); as data) {
  <div class="content">
    <h2>{{ data.title }}</h2>
    <p>{{ data.description }}</p>
    <button (click)="result.refresh()">Refresh</button>
  </div>
}
   ```

5. Example for patch method:

   ```
   // 1) Edit. After user edits their name in a form:
  userResult.patch(user => ({
    ...user,
    name: 'Alex Updated'
  }));
   
   // 2) Delete. In your component:
deleteTodo(id: number) {
  todosResult.patch(todos => {
    return todos.filter(todo => todo.id !== id);
  });
}
   ```

## 💸 Support project

[![Cryptodonat](https://img.shields.io/badge/Donate-Crypto-green?logo=bitcoin)](https://andrew-dev283.github.io/andrew-dev.github.io/)

OR 

https://boosty.to/hq_dev
