import { Component } from '@angular/core';
import { Router } from '@angular/router'

import { Light, HueService } from '../shared/services/hue.service'

@Component({
  selector: 'hue-lights-list',
  templateUrl: './light-list.component.html',
  styleUrls: ['./light-list.component.css']
})
export class LightListComponent {

  private lights: Light[];

  constructor(private hue: HueService, private router: Router) {}

  ngOnInit() {
    this.hue.getLights().then(lights => this.lights = lights)
  }

  togglePower(light: Light) {
    light.on = !light.on;
    this.hue.updateLight({ on: light.on })
  }

  viewLight(light: Light) {
    this.router.navigate([`lights/${light.id}`])
  }
}
