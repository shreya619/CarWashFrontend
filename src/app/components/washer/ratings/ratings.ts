import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WasherService, WasherIndividualRatingDTO } from '../../../services/washer.service';

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ratings.html',
  styleUrls: ['./ratings.scss']
})
export class RatingsComponent {
  ratings: WasherIndividualRatingDTO[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private washerService: WasherService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.washerService.getMyRatings().subscribe({
      next: (data: WasherIndividualRatingDTO[]) => {
        this.ratings = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load ratings';
        this.isLoading = false;
      }
    });
  }
}
