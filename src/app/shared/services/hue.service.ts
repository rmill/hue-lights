import { Injectable } from '@angular/core';

@Injectable()
export class HueService {

  getLights() {
    return Promise.resolve([
      { id: '1', name: "light 1", on: true },
      { id: '2', name: "light 2", on: true },
      { id: '3', name: "light 3", on: true },
      { id: '4', name: "light 4", on: true },
      { id: '5', name: "light 5", on: true },
    ])
  }

  updateLight(options) {
    return
  }
}

export interface Light {
  id: string;
  name: string;
  on: boolean;
}
