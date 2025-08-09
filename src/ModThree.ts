import { FiniteStateMachine, FiniteStateMachineConfig } from "./FiniteStateMachine";

const modThreeFSMConfig: FiniteStateMachineConfig = {
  states: ["S0", "S1", "S2"],
  alphabet: ["0", "1"],
  initialState: "S0",
  acceptingStates: ["S0", "S1", "S2"],
  transition: (state, input) => {
    if (state === "S0") return input === "0" ? "S0" : "S1";
    if (state === "S1") return input === "0" ? "S2" : "S0";
    if (state === "S2") return input === "0" ? "S1" : "S2";
    throw new Error(`Invalid state: ${state}`);
  }
};

export function modThree(input: string) : number {
  const finiteStateMachine = new FiniteStateMachine(modThreeFSMConfig);
  finiteStateMachine.processInput(input);
  const finalState = finiteStateMachine.getState();

  // Return remainder of the mod three function depending on the final state
  switch (finalState) {
    case "S0": return 0;
    case "S1": return 1;
    case "S2": return 2;
    default: throw new Error(`Invalid final state: ${finalState}`);
  }
};
