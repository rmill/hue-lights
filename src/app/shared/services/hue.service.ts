import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, empty, Observable, of, interval } from 'rxjs';
import { mergeMap } from 'rxjs/operators'

import { environment } from '../../../environments/environment'

@Injectable()
export class HueService {

  public lights: BehaviorSubject<Light[]>
  public effects: BehaviorSubject<Object>

  constructor(private http: HttpClient) {
    this.lights = new BehaviorSubject([])
    this.effects = new BehaviorSubject({})

    this.getEffects().subscribe(effects => this.effects.next(effects))

    // Poll the lights every second
    interval(1000).pipe(mergeMap(() => this.getLights()))
      .subscribe((lights: Light[]) => this.lights.next(lights))
  }

  /**
   * Get the list of Light effects
   * @return {Observable<Object>}
   */
  getEffects() {
    return this.http.get(`${environment.api_url}/effects`)
  }

  /**
   * Get the status of a Light
   * @param {string} lightId The ID of the Light
   * @return {Observable<Light>}
   */
  getLight(lightId: string) {
    return this.lights.asObservable().pipe(mergeMap(lights => _getLight(lights, lightId)))
  }

  /**
   * Get the list of Lights
   * @return {Observable<Light[]>}
   */
  getLights() {
    return this.http.get(`${environment.api_url}/lights`)
  }

  /**
   * Update the state of a light
   * @param {Light} light The light
   * @param {Object} state The state update
   */
  updateLight(light: Light, state) {
    return this.http.put(`${environment.api_url}/lights/${light.id}`, state)
  }

  /**
   * Set the effect for the Light
   * @param {Light} light The light
   * @param {string} effect The name of the effect to set
   * @return {Observable<Light>}
   */
  setLightEffect(light: Light, effect: string) {
    let data = { name: effect }
    return this.http.post(`${environment.api_url}/lights/${light.id}/effect`, data)
  }

  /**
   * Get the icon name for a Light based on its state
   * @param {Light} light The light
   * @return {string}
   */
  getLightIcon(light: Light) {
    return light.state.reachable ? 'lightbulb' : 'highlight_off'
  }
}

function _getLight(lights, id) {
  for (let light of lights) {
    if (light.id == id) return of(light)
  }

  return empty()
}

export interface Effect {
  id: string;
  name: string;
  value: string;
}

interface LightState {
  bri: number;
  on: boolean;
  reachable: boolean;
  xy: [number, number];
}

export interface Light {
  event: Effect;
  id: string;
  name: string;
  state: LightState;
}
