import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvenienceOptionsComponent } from './convenience-options.component';

describe('ConvenienceOptionsComponent', () => {
  let component: ConvenienceOptionsComponent;
  let fixture: ComponentFixture<ConvenienceOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvenienceOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvenienceOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
