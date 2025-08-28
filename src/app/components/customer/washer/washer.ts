import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common'; // ✅ IMPORT NgFor, NgIf
import { CustomerService } from '../../../services/customer';
import { Washer } from '../../../models/washer.model';

@Component({
  selector: 'app-washer',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf], // ✅ ADD NgFor AND NgIf
  templateUrl: './washer.html',
  styleUrls: ['./washer.scss']
})
export class WasherComponent implements OnInit {
  washers: Washer[] = [];
  error: string = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadWashers();
  }

  loadWashers(): void {
    this.customerService.getAllWashers().subscribe({
      next: (data: Washer[]) => this.washers = data,
      error: (err) => {
        this.error = 'Failed to load washers';
        console.error(err);
      }
    });
  }
}
