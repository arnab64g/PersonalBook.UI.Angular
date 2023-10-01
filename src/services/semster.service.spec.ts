import { TestBed } from '@angular/core/testing';
import { SemsterService } from './semster.service';

describe('SemsterService', () => {
  let service: SemsterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemsterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
