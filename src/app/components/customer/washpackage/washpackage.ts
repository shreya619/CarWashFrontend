import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../services/customer';
import { WashPackage } from '../../../models/WashPackage';

@Component({
  selector: 'app-washpackage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './washpackage.html',
  styleUrls: ['./washpackage.scss']
})
export class WashpackageComponent implements OnInit {
  washPackages: WashPackage[] = [];
  error: string = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getAllPackages();
  }

  getAllPackages(): void {
    this.customerService.getAllWashPackages().subscribe({
      next: (data: WashPackage[]) => {
        this.washPackages = data;
      },
      error: (err) => {
        this.error = 'Failed to load wash packages';
        console.error(err);
      }
    });
  }
}
