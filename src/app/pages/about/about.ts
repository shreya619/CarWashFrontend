import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.scss']
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'John Smith',
      position: 'Founder & CEO',
      image: 'assets/team/john.jpg',
      description: 'With over 15 years in the automotive industry, John founded CarWash Pro with a vision to revolutionize car care services.'
    },
    {
      name: 'Sarah Johnson',
      position: 'Operations Manager',
      image: 'assets/team/sarah.jpg',
      description: 'Sarah ensures our operations run smoothly and maintains the highest quality standards across all our services.'
    },
    {
      name: 'Mike Wilson',
      position: 'Lead Technician',
      image: 'assets/team/mike.jpg',
      description: 'Mike brings expertise in advanced car care techniques and leads our team of professional washers.'
    }
  ];

  services = [
    {
      icon: '🚗',
      title: 'Exterior Wash',
      description: 'Complete exterior cleaning with premium soap and wax protection'
    },
    {
      icon: '🧽',
      title: 'Interior Detailing',
      description: 'Thorough interior cleaning including vacuuming and sanitization'
    },
    {
      icon: '✨',
      title: 'Premium Detailing',
      description: 'Full-service detailing for the ultimate car care experience'
    },
    {
      icon: '🔧',
      title: 'Maintenance Services',
      description: 'Basic maintenance checks and minor repairs'
    }
  ];

  stats = [
    { number: '5000+', label: 'Happy Customers' },
    { number: '5+', label: 'Years Experience' },
    { number: '50+', label: 'Professional Washers' },
    { number: '15+', label: 'Service Locations' }
  ];
}