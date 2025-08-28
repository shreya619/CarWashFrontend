import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WasherService, FeedbackDTO } from '../../../services/washer.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './feedback.html',
  styleUrls: ['./feedback.scss']
})
export class FeedbackComponent implements OnInit {

  private washerService = inject(WasherService);

  feedbacks: FeedbackDTO[] = [];
  feedbackIdSearch: number | null = null;
  orderIdSearch: number | null = null;
  message: string = '';
  error: string = '';
  isLoading: boolean = false;

  // For new/edit feedback
  newFeedback: FeedbackDTO = { orderId: 0, waterSaved: 0, notes: '' };
  editMode: boolean = false;
  editFeedbackId: number | null = null;

  ngOnInit(): void {
    this.loadAllFeedbacks();
  }

  loadAllFeedbacks(): void {
    this.isLoading = true;
    this.washerService.getAllFeedbacks().subscribe({
      next: (res) => { this.feedbacks = res; this.isLoading = false; },
      error: (err) => { this.error = err.error || err.message; this.isLoading = false; }
    });
  }

  searchByFeedbackId(): void {
    if (!this.feedbackIdSearch) return;
    this.isLoading = true;
    this.washerService.getFeedbackById(this.feedbackIdSearch).subscribe({
      next: (res) => { this.feedbacks = [res]; this.isLoading = false; },
      error: (err) => { this.error = err.error || err.message; this.isLoading = false; }
    });
  }

  searchByOrderId(): void {
    if (!this.orderIdSearch) return;
    this.isLoading = true;
    this.washerService.getFeedbackByOrder(this.orderIdSearch).subscribe({
      next: (res) => { this.feedbacks = [res]; this.isLoading = false; },
      error: (err) => { this.error = err.error || err.message; this.isLoading = false; }
    });
  }

  submitFeedback(): void {
    if (!this.newFeedback.orderId) { this.error = 'Order ID is required'; return; }
    this.washerService.submitFeedback(this.newFeedback.orderId, this.newFeedback).subscribe({
      next: (res) => { 
        this.message = res; 
        this.loadAllFeedbacks(); 
        this.newFeedback = { orderId: 0, waterSaved: 0, notes: '' }; 
      },
      error: (err) => { this.error = err.error || err.message; }
    });
  }

  startEdit(feedback: FeedbackDTO): void {
    this.editMode = true;
    this.editFeedbackId = feedback.id!;
    this.newFeedback = { orderId: feedback.orderId, waterSaved: feedback.waterSaved, notes: feedback.notes };
  }

  updateFeedback(): void {
    if (!this.editFeedbackId) return;
    this.washerService.editFeedback(this.editFeedbackId, this.newFeedback).subscribe({
      next: (res) => { 
        this.message = res; 
        this.editMode = false; 
        this.editFeedbackId = null; 
        this.newFeedback = { orderId: 0, waterSaved: 0, notes: '' }; 
        this.loadAllFeedbacks(); 
      },
      error: (err) => { this.error = err.error || err.message; }
    });
  }

  deleteFeedback(feedbackId: number): void {
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    this.washerService.deleteFeedback(feedbackId).subscribe({
      next: (res) => { this.message = res; this.loadAllFeedbacks(); },
      error: (err) => { this.error = err.error || err.message; }
    });
  }

  clearMessages(): void {
    this.message = '';
    this.error = '';
  }
}
