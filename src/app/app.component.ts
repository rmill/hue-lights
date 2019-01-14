import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { HueService } from './shared/services/hue.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private hue: HueService, private router: Router) {}

  onBackClick() {
    this.router.navigateByUrl('/lights');
  }

  showBack() {
    return this.router.url !== '/lights'
  }

  noConnection() {
    return !this.hue.connected
  }
}
