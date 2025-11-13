import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearservicioPage } from './crearservicio.page';

describe('CrearservicioPage', () => {
  let component: CrearservicioPage;
  let fixture: ComponentFixture<CrearservicioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearservicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
