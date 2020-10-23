describe("Null test", () => {
  it("verifies that tests can run in the remote browser environment", () => {
    // @ts-ignore
    if ("P" === "NP") throw Error("Oh my!");
  });
});
