import { FiniteStateMachine, FiniteStateMachineConfig } from "../src/FiniteStateMachine";

describe("FiniteStateMachine", () => {
  const simpleFSMConfig: FiniteStateMachineConfig = {
    states: ["S0", "S1"],
    alphabet: ["0", "1"],
    initialState: "S0",
    acceptingStates: ["S0"],
    transition: (state, input) => {
      if (state === "S0" && input === "0") return "S1";
      if (state === "S0" && input === "1") return "S0";
      if (state === "S1" && input === "0") return "S0";
      if (state === "S1" && input === "1") return "S1";
      throw new Error(`Invalid transition: state=${state}, input=${input}`);
    },
  };
    
  test("starts in initial state", () => {
    const finiteStateMachine = new FiniteStateMachine(simpleFSMConfig);
    expect(finiteStateMachine.getState()).toBe("S0");
  });

  test("transition through states correctly", () => {
    const finiteStateMachine = new FiniteStateMachine(simpleFSMConfig);
    finiteStateMachine.processInput("0"); // S0 to S1
    expect(finiteStateMachine.getState()).toBe("S1");
    finiteStateMachine.processInput("1"); // S1 to S1
    expect(finiteStateMachine.getState()).toBe("S1");
    finiteStateMachine.processInput("0"); // S1 to S0
    expect(finiteStateMachine.getState()).toBe("S0");
  });

  test("throws an error on invalid transition", () => {
    const brokenFSMConfig: FiniteStateMachineConfig = {
      ...simpleFSMConfig,
      transition: (state, input) => {
        throw new Error ("Forced transition error");
      },
    };
    const finiteStateMachine = new FiniteStateMachine(brokenFSMConfig);
    expect(() => finiteStateMachine.processInput("0")).toThrow("Forced transition error");
  });

  test("throws an error on invalid input that is not in alphabet", () => {
    const finiteStateMachine = new FiniteStateMachine(simpleFSMConfig);
    expect(() => finiteStateMachine.processInput("7")).toThrow(/Invalid input: 7/);
  });

  test("state does not change when processing empty string input", () => {
    const finiteStateMachine = new FiniteStateMachine(simpleFSMConfig);
    finiteStateMachine.processInput("");
    expect(finiteStateMachine.getState()).toBe(simpleFSMConfig.initialState);
  })
});
