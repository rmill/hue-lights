import { Component } from '@angular/core';

import { HueService } from '../shares/service/hue.service'

@Component({
  selector: 'hue-lights-list',
  templateUrl: './light-list.component.html',
  styleUrls: ['./light-list.component.css']
})
export class LightListComponent {

  private lights: Light[];

  constructor(private HueService hue) {}

  ngOnInit() {
    this.hue.getLights().then(lights => this.lights = lights)
  }

  togglePower(light: Light) {
    // this.hue.updateLight({ on: light.on })
  }

  viewLight(light: Light) {
    // View the light
  }
}
