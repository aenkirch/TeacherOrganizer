import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNbHComponent } from './form-nb-h.component';

describe('FormNbHComponent', () => {
  let component: FormNbHComponent;
  let fixture: ComponentFixture<FormNbHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNbHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNbHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
