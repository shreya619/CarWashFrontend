import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasherDashboard } from './washer-dashboard';

describe('WasherDashboard', () => {
  let component: WasherDashboard;
  let fixture: ComponentFixture<WasherDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WasherDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WasherDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
