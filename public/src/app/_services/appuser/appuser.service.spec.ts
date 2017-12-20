import { TestBed, inject } from '@angular/core/testing';

import { AppuserService } from './appuser.service';

describe('AppuserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppuserService]
    });
  });

  it('should be created', inject([AppuserService], (service: AppuserService) => {
    expect(service).toBeTruthy();
  }));
});
