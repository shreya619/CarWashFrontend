import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeatureCardComponent } from '../../components/ui/feature-card/feature-card';
import { CtaButtonComponent } from '../../components/ui/cta-button/cta-button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FeatureCardComponent, CtaButtonComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  features = [
    {
      icon: '🚿',
      title: 'Premium Wash',
      description: 'Complete exterior and interior cleaning with premium products',
      price: '$29.99'
    },
    {
      icon: '✨',
      title: 'Express Clean',
      description: 'Quick and efficient wash for busy schedules',
      price: '$19.99'
    },
    {
      icon: '🧽',
      title: 'Deep Detail',
      description: 'Comprehensive detailing service for maximum shine',
      price: '$49.99'
    },
    {
      icon: '🔧',
      title: 'Mobile Service',
      description: 'We come to you! Convenient at-home car washing',
      price: '$39.99'
    }
  ];

  testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Excellent service! My car looks brand new every time.',
      image: '👩‍💼'
    },
    {
      name: 'Mike Chen',
      rating: 5,
      comment: 'Professional, reliable, and affordable. Highly recommended!',
      image: '👨‍💻'
    },
    {
      name: 'Emma Davis',
      rating: 5,
      comment: 'The mobile service is so convenient. Great attention to detail.',
      image: '👩‍🎨'
    }
  ];
trackByFeature(index: number, feature: any): any {
  return feature.title;
}
  ngOnInit() {
    // Component initialization
  }
}