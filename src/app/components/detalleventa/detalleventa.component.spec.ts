import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleventaComponent } from './detalleventa.component';

describe('DetalleventaComponent', () => {
  let component: DetalleventaComponent;
  let fixture: ComponentFixture<DetalleventaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleventaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
