import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmenttrackerComponent } from './shipmenttracker.component';

describe('ShipmenttrackerComponent', () => {
  let component: ShipmenttrackerComponent;
  let fixture: ComponentFixture<ShipmenttrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmenttrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmenttrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
