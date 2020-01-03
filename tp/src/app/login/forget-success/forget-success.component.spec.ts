import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetSuccessComponent } from './forget-success.component';

describe('ForgetSuccessComponent', () => {
  let component: ForgetSuccessComponent;
  let fixture: ComponentFixture<ForgetSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
