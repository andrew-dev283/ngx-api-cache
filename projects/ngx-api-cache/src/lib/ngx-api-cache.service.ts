import { HttpClient } from '@angular/common/http';
import { Injectable, signal, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, throwError } from 'rxjs';
import { CacheEntry, CacheResult } from './types';

@Injectable({
  providedIn: 'root'
})
export class NgxApiCacheService {
  private http = inject(HttpClient);
  private cache = new Map<string, CacheEntry<unknown>>();

  public get<T>(url: string, destroyRef?: DestroyRef): CacheResult<T> {
    if (!this.cache.has(url)) {
      const entry: CacheEntry<T> = {
        data: signal(null),
        loading: signal(true),
        error: signal(null)
      };
      this.cache.set(url, entry as CacheEntry<unknown>);
      this.request(url, entry, destroyRef);
    }

    const entry = this.cache.get(url) as CacheEntry<T>;

    return {
      data: entry.data.asReadonly(),
      loading: entry.loading.asReadonly(),
      error: entry.error.asReadonly(),
      refresh: (): void => {
        entry.loading.set(true);
        entry.error.set(null);
        this.request(url, entry, destroyRef);
      },
      patch: (updater: (current: T | null) => T): void => {
        const current = entry.data();
        const newValue = updater(current);
        entry.data.set(newValue);
      }
    };
  }

  private request<T>(url: string, entry: CacheEntry<T>, destroyRef?: DestroyRef): void {
    let obs$ = this.http.get<T>(url).pipe(
      catchError(error => {
        entry.loading.set(false);
        entry.error.set(error);
        entry.data.set(null);
        return throwError(() => error);
      })
    );

    if (destroyRef) {
      obs$ = obs$.pipe(takeUntilDestroyed(destroyRef));
    }

    obs$.subscribe(resp => {
      entry.loading.set(false);
      entry.error.set(null);
      entry.data.set(resp);
    });
  }
}
