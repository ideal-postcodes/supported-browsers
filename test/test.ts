import { assert } from "chai";
import {
  browsers,
  latestMobile,
  legacyMobile,
  latestDesktop,
  legacyDesktop,
  gitSha,
  ci,
  generateBuild,
  config,
} from "../lib/index";

describe("Support matrix", () => {
  it("exports a list of browsers", () => {
    assert.isTrue(Object.values(browsers).length > 0);
  });
  it("exports list of modern desktop browsers", () => {
    assert.isTrue(Object.values(latestDesktop).length > 0);
  });
  it("exports list of legacy desktop browsers", () => {
    assert.isTrue(Object.values(legacyDesktop).length > 0);
  });
  it("exports list of modern mobile browsers", () => {
    assert.isTrue(Object.values(latestMobile).length > 0);
  });
  it("exports list of legacy desktop browsers", () => {
    assert.isTrue(Object.values(legacyMobile).length > 0);
  });
});

describe("sauceConfig", () => {
  it("generates sauce config", () => {
    const conf = config({ testName: "foo" });
    assert.isString(conf.sauceLabs.build);
    assert.equal(conf.sauceLabs.region, "eu");
    assert.isTrue(conf.singleRun);
    assert.equal(conf.sauceLabs.testName, "foo");
  });
});

describe("generateBuild", () => {
  let env: any;

  before(() => {
    env = process.env;
  });

  after(() => {
    process.env = env;
  });

  it("genreates git sha if no CI", () => {
    process.env = { GITHUB_ACTION: undefined };
    assert.include(generateBuild(), gitSha());
  });
  it("generates GITHUB RUN ID if CI", () => {
    process.env = { GITHUB_ACTION: "foo", GITHUB_RUN_ID: "42" };
    assert.equal(generateBuild(), process.env.GITHUB_RUN_ID);
  });
});

describe("gitSha", () => {
  it("returns gitsha of current repo", () => {
    assert.isString(gitSha());
  });
});

describe("ci", () => {
  let env: any;

  before(() => {
    env = process.env;
  });

  after(() => {
    process.env = env;
  });

  it("returns true if CI detected", () => {
    process.env = { GITHUB_ACTION: "foo" };
    assert.isTrue(ci());
  });
  it("returns false if no CIdetected", () => {
    process.env = { GITHUB_ACTION: undefined };
    assert.isFalse(ci());
  });
});
