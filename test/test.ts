import { assert } from "chai";
import {
  browsers,
  latestMobile,
  legacyMobile,
  latestDesktop,
  legacyDesktop,
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
