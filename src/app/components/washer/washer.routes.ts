import { Routes } from '@angular/router';
import { WasherDashboard } from './washer-dashboard/washer-dashboard';
import { UpdateWasherComponent } from './update-washer/update-washer';
import { DeleteWasherComponent } from './delete-washer/delete-washer';
import { SendInvoiceComponent } from './send-invoice/send-invoice';
import { OrdersComponent } from './orders/orders';
import { FeedbackComponent } from './feedback/feedback';
import { RatingsComponent } from './ratings/ratings';
import { WasherLeaderboardComponent } from './leaderboard/leaderboard';

export const washerRoutes: Routes = [
  {
    path: '',
    component: WasherDashboard,
    children: [
      { path: 'update', component: UpdateWasherComponent },
      { path: 'delete', component: DeleteWasherComponent },
      { path: 'invoice', component: SendInvoiceComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'leaderboard', component: WasherLeaderboardComponent },
      { path: 'rating', component: RatingsComponent },
      { path: '', redirectTo: 'update', pathMatch: 'full' }
    ]
  }
];
