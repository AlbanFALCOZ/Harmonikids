import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatQuizComponent } from './stat-quiz.component';

describe('StatQuizComponent', () => {
  let component: StatQuizComponent;
  let fixture: ComponentFixture<StatQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
