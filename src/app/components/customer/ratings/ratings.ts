// src/app/components/customer/rate/rate.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule

import { CustomerService } from '../../../services/customer';
import { WasherRatingDTO } from '../../../models/WasherRatingDTO';
import { RatingRequestDTO } from '../../../models/RatingRequestDTO';

@Component({
  selector: 'app-rate',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './ratings.html',
  styleUrls: ['./ratings.scss']
})
export class RatingsComponent implements OnInit {
  ratings: WasherRatingDTO[] = [];
  newRating: RatingRequestDTO = { rating: 0, review: '' };
  orderId: number = 1; // For demo; make dynamic

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadRatings();
  }

  loadRatings(): void {
    this.customerService.getAllWasherRatings().subscribe({
      next: (data) => this.ratings = data,
      error: (err) => console.error(err)
    });
  }

  submitRating(): void {
    this.customerService.submitRating(this.orderId, this.newRating).subscribe({
      next: () => {
        alert('Rating submitted successfully!');
        this.newRating = { rating: 0, review: '' };
        this.loadRatings();
      },
      error: (err) => console.error(err)
    });
  }
}
