import { TestBed } from '@angular/core/testing';

import { ValenceUiService } from './valence-ui.service';

describe('ValenceUiService', () => {
  let service: ValenceUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValenceUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
