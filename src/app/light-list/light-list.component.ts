import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';

import { ColorConverterService } from '../shared/services/color-converter.service'
import { Light, HueService } from '../shared/services/hue.service'

@Component({
  selector: 'hue-lights-list',
  templateUrl: './light-list.component.html',
  styleUrls: ['./light-list.component.css']
})
export class LightListComponent {

  lights: Light[];

  private lights$: Subscription

  constructor(private color: ColorConverterService, private hue: HueService, private router: Router) {}

  ngOnInit() {
    this.lights$ = this.hue.lights.subscribe((lights: Light[]) => this.lights = lights)
  }

  ngOnDestroy() {
    this.lights$.unsubscribe()
  }

  getColor(light: Light) {
    return this.color.getLightColorCss(light)
  }

  getIcon(light: Light) {
    return this.hue.getLightIcon(light)
  }

  viewLight(light: Light) {
    this.router.navigate([`lights/${light.id}`])
  }
}
