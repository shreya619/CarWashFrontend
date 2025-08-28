import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { WasherLeaderboardService } from '../../../services/washer-leaderboard.service';
import { WasherLeaderboard } from '../../../models/washer-leaderboard.model';

@Component({
  selector: 'app-washer-leaderboard',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './leaderboard.html',
  styleUrls: ['./leaderboard.scss']
})
export class WasherLeaderboardComponent {
  leaderboard: WasherLeaderboard[] = [];
  isLoading = true;          // 👈 Added this
  errorMessage: string | null = null;  // 👈 Added this

  constructor(private leaderboardService: WasherLeaderboardService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.leaderboardService.getLeaderboard().subscribe({
      next: (data: WasherLeaderboard[]) => {
        this.leaderboard = data;
        this.isLoading = false;
      },
      error: (err: unknown) => {
        this.errorMessage = 'Failed to load leaderboard';
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}





