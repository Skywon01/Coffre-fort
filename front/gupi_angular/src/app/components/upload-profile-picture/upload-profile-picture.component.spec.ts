import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProfilePictureComponent } from './upload-profile-picture.component';

describe('UploadProfilePictureComponent', () => {
  let component: UploadProfilePictureComponent;
  let fixture: ComponentFixture<UploadProfilePictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadProfilePictureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadProfilePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
