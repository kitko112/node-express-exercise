import { State } from "./types";

export class StateLog {
  id: number;
  state: State;
  timestamp: Date;

  constructor(id: number, state: State, timestamp: Date) {
    id = id;
    state = state;
    timestamp = timestamp;
  }
}
