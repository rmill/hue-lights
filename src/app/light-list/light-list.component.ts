import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { ColorConverterService } from '../shared/services/color-converter.service'
import { Light, HueService } from '../shared/services/hue.service'

@Component({
  selector: 'hue-lights-list',
  templateUrl: './light-list.component.html',
  styleUrls: ['./light-list.component.css']
})
export class LightListComponent {

  private lights: Light[];

  constructor(private color: ColorConverterService, private hue: HueService, private router: Router) {}

  ngOnInit() {
    this.hue.getLights().subscribe((lights: Light[]) => this.lights = lights)
  }

  getColor(light: Light) {
    return this.color.getLightColorCss(light)
  }

  viewLight(light: Light) {
    this.router.navigate([`lights/${light.id}`])
  }
}
