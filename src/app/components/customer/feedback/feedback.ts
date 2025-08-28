// src/app/components/customer/feedback/feedback.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../services/customer';
import { FeedbackDTO } from '../../../models/FeedbackDTO';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback.html',
  styleUrls: ['./feedback.scss']
})
export class FeedbackComponent implements OnInit {
  feedback: FeedbackDTO | null = null;
  error: string = '';
  orderId: number = 1; // For demo; you can make it dynamic

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback(): void {
    this.customerService.getFeedback(this.orderId).subscribe({
      next: (data) => this.feedback = data,
      error: (err) => {
        this.error = 'Failed to load feedback';
        console.error(err);
      }
    });
  }
}
