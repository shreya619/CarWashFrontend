import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { ContactComponent } from './pages/contact/contact';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminPackagesComponent } from './components/admin/admin-packages/admin-packages.component';
import { AdminLeaderboardComponent } from './components/admin/admin-leaderboard/admin-leaderboard';
import { washerRoutes } from './components/washer/washer.routes';

import { CustomerDashboardComponent } from './components/customer/customer-dashboard/customer-dashboard';
import { CustomerProfileComponent } from './components/customer/customer-profile/customer-profile';

import { WashpackageComponent } from './components/customer/washpackage/washpackage';

import { LeaderboardComponent } from './components/customer/leaderboard/leaderboard';
import { WasherComponent } from './components/customer/washer/washer';
import { RatingsComponent } from './components/customer/ratings/ratings';
import { OrderComponent } from './components/customer/order/order';
import { FeedbackComponent } from './components/customer/feedback/feedback';
import { PaymentComponent } from './components/customer/payment/payment';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },

   {
  path: 'admin',
  component: AdminDashboardComponent,
  children: [
    { path: '', redirectTo: 'packages', pathMatch: 'full' },
    { path: 'packages', component: AdminPackagesComponent },
        { path: 'leaderboard', component: AdminLeaderboardComponent } // ✅ New route

  ]
},

 {
    path: 'customer',
    component: CustomerDashboardComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' }, // ✅ default child redirect
      { path: 'profile', component: CustomerProfileComponent },
      { path: 'leaderboard', component: LeaderboardComponent },
      { path: 'washer', component: WasherComponent },
      { path: 'washpackage', component: WashpackageComponent },
      { path: 'ratings', component: RatingsComponent },
      { path: 'order', component: OrderComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'payment', component: PaymentComponent }
      // Add future child routes like orders, payments, etc
    ]
  },
  { path: 'washer', children: washerRoutes },


 

  { path: '**', redirectTo: '' }
];