import { TestBed } from '@angular/core/testing';

import { Controlador } from './controlador';

describe('Controlador', () => {
  let service: Controlador;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Controlador);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
