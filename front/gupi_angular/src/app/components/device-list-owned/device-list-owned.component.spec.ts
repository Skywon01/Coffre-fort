import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListOwnedComponent } from './device-list-owned.component';

describe('DeviceListOwnedComponent', () => {
  let component: DeviceListOwnedComponent;
  let fixture: ComponentFixture<DeviceListOwnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceListOwnedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceListOwnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
