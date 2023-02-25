import { State } from "./types";

export class Vehicle {
  id: number;
  make: string;
  model: string;
  state: State;

  constructor(id: number, make: string, model: string, state: State) {
    this.id = id;
    this.make = make;
    this.model = model;
    this.state = state;
  }
}
