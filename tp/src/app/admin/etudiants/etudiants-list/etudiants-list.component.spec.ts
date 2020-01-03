import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantsListComponent } from './etudiants-list.component';

describe('EtudiantsListComponent', () => {
  let component: EtudiantsListComponent;
  let fixture: ComponentFixture<EtudiantsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtudiantsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtudiantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
