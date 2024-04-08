import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauCardComponent } from './niveau-card.component';

describe('NiveauCardComponent', () => {
  let component: NiveauCardComponent;
  let fixture: ComponentFixture<NiveauCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NiveauCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NiveauCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
