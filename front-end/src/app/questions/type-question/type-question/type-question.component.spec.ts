import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeQuestionComponent } from './type-question.component';

describe('TypeQuestionComponent', () => {
  let component: TypeQuestionComponent;
  let fixture: ComponentFixture<TypeQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
