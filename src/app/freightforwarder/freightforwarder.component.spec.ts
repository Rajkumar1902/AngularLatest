import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightforwarderComponent } from './freightforwarder.component';

describe('FreightforwarderComponent', () => {
  let component: FreightforwarderComponent;
  let fixture: ComponentFixture<FreightforwarderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreightforwarderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreightforwarderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
