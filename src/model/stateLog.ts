import { State } from "./types";

export class StateLog {
  id: number;
  state: State;
  timestamp: Date;

  constructor(id: number, state: State, timestamp: Date) {
    this.id = id;
    this.state = state;
    this.timestamp = timestamp;
  }
}
