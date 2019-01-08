import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { auditTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

import { ColorConverterService } from '../shared/services/color-converter.service';
import { effects, Effect, Light, HueService } from '../shared/services/hue.service';


@Component({
  selector: 'hue-lights-view',
  templateUrl: './light-view.component.html',
  styleUrls: ['./light-view.component.css']
})
export class LightViewComponent {

  private effects: Effect[];
  private light: Light;
  private color$: Subscription;
  private colorSubject: Subject<string>;
  private rgb: string;
  private icon: string;

  constructor(
    private colorConverter: ColorConverterService,
    private hue: HueService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let lightId = this.route.snapshot.paramMap.get('id')
    this.effects = effects
    this.hue.getLight(lightId).subscribe((light: Light) => this.setLight(light))
    this.colorSubject = new Subject()
    this.color$ = this.colorSubject.pipe(auditTime(333)).subscribe(color => this.changeColor(color))
  }

  ngOnDestory() {
    this.color$.unsubscribe()
  }

  togglePower(on) {
    this.light.state.on = on
    this.hue.updateLight(this.light, { on: this.light.state.on })
      .subscribe((light: Light) => this.setLight(light))
  }

  onColorChange(color: string) {
    this.colorSubject.next(color)
  }

  changeColor(color: string) {
    var rgb = color.replace(/rgba|rgb|\(|\)/g,'').split(',');
    var xy = this.colorConverter.rgbToXy(rgb[0], rgb[1], rgb[2])

    this.hue.updateLight(this.light, { xy })
      .subscribe((light: Light) => this.setLight(light))
  }

  setLight(light: Light) {
    this.light = light;
    this.rgb = this.colorConverter.getLightColorCss(light)
    this.icon = this.hue.getLightIcon(light)
  }

  resetColorPicker() {
    this.changeColor('rgb(255, 207, 120)')
  }
}
