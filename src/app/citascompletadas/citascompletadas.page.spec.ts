import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitascompletadasPage } from './citascompletadas.page';

describe('CitascompletadasPage', () => {
  let component: CitascompletadasPage;
  let fixture: ComponentFixture<CitascompletadasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CitascompletadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
