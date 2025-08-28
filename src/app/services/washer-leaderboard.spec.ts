import { TestBed } from '@angular/core/testing';

import { WasherLeaderboard } from './washer-leaderboard';

describe('WasherLeaderboard', () => {
  let service: WasherLeaderboard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WasherLeaderboard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
