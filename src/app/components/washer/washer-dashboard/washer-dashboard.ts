/*import { Component } from '@angular/core';

@Component({
  selector: 'app-washer-dashboard',
  imports: [],
  templateUrl: './washer-dashboard.html',
  styleUrl: './washer-dashboard.scss'
})
export class WasherDashboard {

}
*/
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-washer-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './washer-dashboard.html'
})
export class WasherDashboard { }
