import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PackageService } from '../../../services/package.service';
import { WashPackage } from '../../../models/WashPackage';

@Component({
  selector: 'app-admin-packages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-packages.component.html',
  styleUrls: ['./admin-packages.component.scss']
})
export class AdminPackagesComponent implements OnInit {
  packages: WashPackage[] = [];
  newPackage: WashPackage = { packageName: '', packageType: '', details: '', cost: 0 };
  editId: number | null = null;

  constructor(private packageService: PackageService) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.packageService.getAll().subscribe({
      next: (data) => this.packages = data,
      error: (err) => console.error('Failed to load packages', err)
    });
  }

  savePackage(): void {
    if (this.editId !== null) {
      this.packageService.update(this.editId, this.newPackage).subscribe({
        next: () => {
          this.resetForm();
          this.loadPackages();
        },
        error: (err) => alert('Update failed: ' + err.message)
      });
    } else {
      this.packageService.create(this.newPackage).subscribe({
        next: () => {
          this.resetForm();
          this.loadPackages();
        },
        error: (err) => alert('Create failed: ' + err.message)
      });
    }
  }

  edit(pkg: WashPackage): void {
    this.editId = pkg.id!;
    this.newPackage = { ...pkg };
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this package?')) {
      this.packageService.delete(id).subscribe({
        next: () => this.loadPackages(),
        error: (err) => alert('Delete failed: ' + err.message)
      });
    }
  }

  getById(id: number): void {
    this.packageService.getById(id).subscribe({
      next: (pkg) =>
        alert(`Package Details:\nName: ${pkg.packageName}\nType: ${pkg.packageType}\nDetails: ${pkg.details}\nCost: ₹${pkg.cost}`),
      error: (err) => alert('Fetch failed: ' + err.message)
    });
  }

  resetForm(): void {
    this.newPackage = { packageName: '', packageType: '', details: '', cost: 0 };
    this.editId = null;
  }
}
