import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { addProductGuard } from './add-product.guard';

describe('addProductGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => addProductGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
