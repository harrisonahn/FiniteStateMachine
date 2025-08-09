type State = string;
type Input = string;

export interface FiniteStateMachineConfig {
  states: State[];
  alphabet: Input[];
  initialState: State;
  acceptingStates: State[];
  transition: (state: State, input: Input) => State;
}

export class FiniteStateMachine {
  private fsmConfig: FiniteStateMachineConfig;
  private state: State;

  constructor(fsmConfig: FiniteStateMachineConfig) {
    this.fsmConfig = fsmConfig;
    this.state = fsmConfig.initialState;
  }

  processInput(inputString: string) {
    for (const input of inputString) {
      if (!this.fsmConfig.alphabet.includes(input)) {
        throw new Error(`Invalid input: ${input}`);
      }
      this.state = this.fsmConfig.transition(this.state, input);
    }
  }

  getState() {
    return this.state;
  }
};
