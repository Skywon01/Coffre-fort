import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRhComponent } from './modal-rh.component';

describe('ModalRhComponent', () => {
  let component: ModalRhComponent;
  let fixture: ComponentFixture<ModalRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRhComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
