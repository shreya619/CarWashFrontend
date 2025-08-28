import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../services/customer';
import { CustomerLeaderboard } from '../models/customer-leaderboard.model';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.html',
  styleUrls: ['./leaderboard.scss']
})
export class LeaderboardComponent implements OnInit {
  leaderboard: CustomerLeaderboard[] = [];
  error: string | null = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadLeaderboard();
  }

  loadLeaderboard(): void {
    this.customerService.getLeaderboard().subscribe({
      next: (data) => {
        this.leaderboard = data;
        this.error = null;
      },
      error: (err) => {
        console.error('Error fetching leaderboard', err);
        this.error = 'Failed to load leaderboard';
      }
    });
  }
}
