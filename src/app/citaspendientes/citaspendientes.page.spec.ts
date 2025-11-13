import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitaspendientesPage } from './citaspendientes.page';

describe('CitaspendientesPage', () => {
  let component: CitaspendientesPage;
  let fixture: ComponentFixture<CitaspendientesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaspendientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
