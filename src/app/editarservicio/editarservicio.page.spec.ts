import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarservicioPage } from './editarservicio.page';

describe('EditarservicioPage', () => {
  let component: EditarservicioPage;
  let fixture: ComponentFixture<EditarservicioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarservicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
