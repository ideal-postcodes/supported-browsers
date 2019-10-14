import { assert } from "chai";
import { browsers, toCbtLaunchers } from "../lib/index";

describe("Support matrix", () => {
  it("exports a list of browsers", () => {
    // Check that at least one legacy, latest, desktop and mobile browsers exported
    assert.isTrue(Object.values(browsers).some(b => b.desktop));
    assert.isTrue(Object.values(browsers).some(b => b.mobile));
    assert.isTrue(Object.values(browsers).some(b => b.legacy));
    assert.isTrue(Object.values(browsers).some(b => b.latest));
  });
});

describe("toCbtLaunchers", () => {
  const matrix = {
    foo: {
      browserName: "brow",
      deviceName: "dev",
      platformVersion: "5.0",
      platformName: "Android",
      deviceOrientation: "portrait",
      mobile: true,
      legacy: true,
    },
    bar: {
      browserName: "desktopBrowser",
      version: "77",
      platform: "os",
      desktop: true,
      latest: true,
    },
    baz: {
      browserName: "baz",
      desktop: true,
      latest: true,
    },
    quux: {
      browserName: "quux",
      mobile: true,
      legacy: true,
    },
  };

  it("returns correctly formatted launchers", () => {
    const build = "some-build-123";
    const name = "project";
    assert.deepEqual(toCbtLaunchers(matrix, { name, build }), {
      foo: {
        browserName: "brow",
        deviceName: "dev",
        platformVersion: "5.0",
        platformName: "Android",
        deviceOrientation: "portrait",
        base: "CrossBrowserTesting",
        name,
        build,
      },
      bar: {
        browserName: "desktopBrowser",
        version: "77",
        platform: "os",
        name,
        build,
        base: "CrossBrowserTesting",
        screenResolution: "1366x768",
      },
      baz: {
        browserName: "baz",
        version: "",
        platform: "",
        name,
        build,
        base: "CrossBrowserTesting",
        screenResolution: "1366x768",
      },
      quux: {
        browserName: "quux",
        deviceName: "",
        platformVersion: "",
        platformName: "",
        deviceOrientation: "",
        base: "CrossBrowserTesting",
        name,
        build,
      },
    });
  });
});
