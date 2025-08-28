/*import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-leaderboard',
  imports: [],
  templateUrl: './admin-leaderboard.html',
  styleUrl: './admin-leaderboard.scss'
})
export class AdminLeaderboard {

}
*/
import { CommonModule } from '@angular/common'; // Needed for *ngIf, *ngFor, etc.
import { Component, OnInit } from '@angular/core';
import { LeaderboardService, Leaderboard } from '../../../services/leaderboard';

@Component({
  selector: 'app-admin-leaderboard',
  standalone: true, // Required for standalone components
  imports: [CommonModule], // Add CommonModule so *ngIf works
  templateUrl: './admin-leaderboard.html',
  styleUrls: ['./admin-leaderboard.scss'] // Fixed 'styleUrl' → 'styleUrls'
})
export class AdminLeaderboardComponent implements OnInit {
  leaderboard: Leaderboard[] = [];
  loading = true;
  errorMessage = '';

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
    this.leaderboardService.getLeaderboard().subscribe({
      next: (data) => {
        this.leaderboard = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching leaderboard:', err);
        this.errorMessage = 'Failed to load leaderboard';
        this.loading = false;
      }
    });
  }
}
