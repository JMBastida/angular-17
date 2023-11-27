

//TODO: SimpleWeigth Store for features may be usefull when project scalates
//Code valid for Angular v17 signal mutation() deprecated, not used here
/*
providers: [
    ...SignalStore.InitializeStore<TodoState>('todo-store', initState)
    ...SignalStore.InitializeStore<TodoState>('todo-1-store',)
  ]
 */


/*
import {
  computed,
  Inject,
  Injectable,
  InjectionToken,
  Optional,
  Provider,
  Signal,
  signal,
  ValueEqualityFn
} from "@angular/core";

const SIGNAL_STORE_ID = new InjectionToken('SIGNAL_STORE_ID');
const SIGNAL_STORE_CONFIG = new InjectionToken('SIGNAL_STORE_CONFIG');

interface SignalStoreConfig<T> {
  initState?: Partial<T>;
  equal?: ValueEqualityFn<T>
}
// Playing with signals

@Injectable({
  providedIn: 'root'
})
export class SignalStore<T> {
  readonly state = signal<T>(this.config?.initState as T);

  @Optional() @Inject(SIGNAL_STORE_ID) private readonly storeId?: string;

  constructor(
    @Optional() @Inject(SIGNAL_STORE_ID) storeId?: string,
    @Optional() @Inject(SIGNAL_STORE_CONFIG) private config?: SignalStoreConfig<T>
  ) {
    this.storeId = storeId;
    this.config = Object.assign(this.config ?? {}, { storeId: this.storeId });
  }

  set(state: T) {
    this.state.set(state);
  }

  setKey<K extends keyof T>(key: K, value: any) {
    this.state.update(s => (s?.[key] ? s[key] = value : null, s));
    console.log(this.state())
  }

  update(updater: (state: T) => T) {
    this.state.update(updater);
  }

  reset() {
    this.state.set(this.config?.initState as T);
  }

  select<U>(selector: (state: T) => U) {
    return computed(() => selector(this.state()))
  }

  selectFrom<T, U>(signal: Signal<T>, selector: (state: T) => U) {
    return computed(() => selector(signal()));
  }
}

export function InitializeStore<T>(
  storeId: string,
  config?: Partial<SignalStoreConfig<T>>
): Provider[] {
  return [
    {
      provide: SignalStore<T>,
      useFactory: () => new SignalStore<T>(storeId, config as SignalStoreConfig<T>)
    }
  ]
}
*/
