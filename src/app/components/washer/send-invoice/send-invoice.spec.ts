import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendInvoice } from './send-invoice';

describe('SendInvoice', () => {
  let component: SendInvoice;
  let fixture: ComponentFixture<SendInvoice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendInvoice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendInvoice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
