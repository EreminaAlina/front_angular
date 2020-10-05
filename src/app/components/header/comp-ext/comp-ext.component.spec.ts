import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompExtComponent } from './comp-ext.component';

describe('CompExtComponent', () => {
  let component: CompExtComponent;
  let fixture: ComponentFixture<CompExtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompExtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
