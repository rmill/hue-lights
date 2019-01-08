import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HueService {

  constructor(private http: HttpClient) {}

  getLight(lightId: string) {
    return this.http.get(`http://127.0.0.1:3000/lights/${lightId}`)
  }

  /**
   * Get the list of Lights
   * @return {Observable<Light[]>}
   */
  getLights() {
    return this.http.get('http://127.0.0.1:3000/lights')
  }

  /**
   * Update the state of a light
   * @param {Light} light The light
   * @param {Object} state The state update
   */
  updateLight(light, state) {
    return this.http.put(`http://127.0.0.1:3000/lights/${light.id}`, state)
  }
}

export const effects = [
  { name: 'none', value: null },
  { name: 'strobe', value: 'strobe'}
]

export interface Effect {
  name: string,
  value: string
}

interface LightState {
  on: boolean
}

export interface Light {
  id: string;
  name: string;
  state: LightState;
}
