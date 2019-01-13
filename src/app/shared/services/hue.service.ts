import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment'

@Injectable()
export class HueService {

  constructor(private http: HttpClient) {}

  /**
   * Get the list of Light effects
   * @return {Observable<Light[]>}
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
    return this.http.get(`${environment.api_url}/lights/${lightId}`)
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
    return this.http.put(`${environment.api_url}/${light.id}`, state)
  }

  setLightEffect(light: Light, effect: string) {
    let data = { name: effect }
    return this.http.post(`${environment.api_url}/${light.id}/effect`, data)
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

export interface Effect {
  name: string,
  value: string
}

interface LightState {
  bri: number;
  on: boolean;
  reachable: boolean;
  xy: [number, number];
}

export interface Light {
  id: string;
  name: string;
  state: LightState;
}
