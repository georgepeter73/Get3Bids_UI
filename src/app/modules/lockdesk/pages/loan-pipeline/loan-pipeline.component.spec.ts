import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPipelineComponent } from './loan-pipeline.component';

describe('LoanPipelineComponent', () => {
  let component: LoanPipelineComponent;
  let fixture: ComponentFixture<LoanPipelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanPipelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
