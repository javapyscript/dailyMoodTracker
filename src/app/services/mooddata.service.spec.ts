import { TestBed } from '@angular/core/testing';

import { MooddataService } from './mooddata.service';

describe('MooddataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MooddataService = TestBed.get(MooddataService);
    expect(service).toBeTruthy();
  });
});
