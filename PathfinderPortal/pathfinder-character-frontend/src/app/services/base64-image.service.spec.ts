import { TestBed } from '@angular/core/testing';
import { Base64ImageService } from './base64-image.service';



describe('Base64ImageService', () => {
  let service: Base64ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Base64ImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
