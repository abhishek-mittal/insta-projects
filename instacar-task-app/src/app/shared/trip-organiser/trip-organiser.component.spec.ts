import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripOrganiserComponent } from './trip-organiser.component';

describe('TripOrganiserComponent', () => {
  let component: TripOrganiserComponent;
  let fixture: ComponentFixture<TripOrganiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripOrganiserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripOrganiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
