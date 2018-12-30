import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { auditTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

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

  constructor(private hue: HueService, private route: ActivatedRoute) {}

  ngOnInit() {
    let lightId = this.route.snapshot.paramMap.get('id')
    this.effects = effects
    this.hue.getLight(lightId).then(light => this.light = light)
    this.colorSubject = new Subject()
    this.color$ = this.colorSubject.pipe(auditTime(333)).subscribe(color => this.changeColor(color))
  }

  ngOnDestory() {
    this.color$.unsubscribe()
  }

  togglePower() {
    this.light.on = !this.light.on
    this.hue.updateLight({ on: this.light.on })
  }

  onColorChange(color: string) {
    this.colorSubject.next(color)
  }

  changeColor(color: string) {
    console.log (color);
  }
}
