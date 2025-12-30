import { Signal, WritableSignal } from '@angular/core';

export interface CacheEntry<T> {
  data: WritableSignal<T | null>;
  loading: WritableSignal<boolean>;
  error: WritableSignal<unknown | null>;
}

export interface CacheResult<T> {
  data: Signal<T | null>;
  loading: Signal<boolean>;
  error: Signal<unknown | null>;
  refresh: () => void;
  patch: (updater: (current: T | null) => T) => void;
}
