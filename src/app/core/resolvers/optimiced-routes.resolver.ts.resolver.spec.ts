import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { optimicedRoutesResolverTsResolver } from './optimiced-routes.resolver.ts.resolver';

describe('optimicedRoutesResolverTsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => optimicedRoutesResolverTsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
