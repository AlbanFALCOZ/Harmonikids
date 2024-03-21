import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreListeComponent } from './membre-liste.component';

describe('MembreListeComponent', () => {
  let component: MembreListeComponent;
  let fixture: ComponentFixture<MembreListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembreListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembreListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
