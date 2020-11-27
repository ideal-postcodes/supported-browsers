import { execSync } from "child_process";
import { networkInterfaces } from "os";

export type SupportMatrix = Record<string, Browser>;

export type Browser = MobileBrowser | DesktopBrowser;

interface SauceOptions {
  screenResolution?: string;
}

interface DesktopBrowser {
  base: "SauceLabs";
  // Browser (e.g. IE, Chrome)
  browserName: string;
  // Browser version number and? bit version (e.g. 74x64)
  browserVersion: string;
  // Operating system and version (e.g. Windows 10)
  platformName?: string;
  "sauce:options"?: SauceOptions;
}

interface MobileBrowser {
  base: "SauceLabs";
  appiumVersion?: string;
  // Browser (e.g. IE, Chrome)
  browserName: string;
  // Browser version number and? bit version (e.g. 74x64)
  browserVersion?: string;
  // Operating system
  platformName?: string;
  platform?: string;
  // Operating system version number
  platformVersion?: string;
  version?: string;
  // Mobile device (e.g. iPhone 4s)
  deviceName?: string;
  device?: string;
  // Portrait or landscape
  deviceOrientation?: string;
}

const base = "SauceLabs";

const appiumVersion = "1.17.1";

export const latestDesktop: SupportMatrix = {
  chrome: {
    base,
    browserName: "chrome",
    browserVersion: "latest",
  },
  firefox: {
    base,
    browserName: "firefox",
    browserVersion: "latest",
  },
  safari: {
    base,
    browserName: "safari",
    browserVersion: "latest",
    platformName: "macOS 10.15",
  },
  edge: {
    base,
    browserName: "microsoftedge",
    browserVersion: "latest",
  },
};

export const legacyDesktop: SupportMatrix = {
  ie: {
    base,
    browserName: "internet explorer",
    browserVersion: "11",
    platformName: "Windows 8.1",
  },
};

export const latestMobile: SupportMatrix = {
  "ios-latest": {
    base,
    appiumVersion,
    deviceName: "iPhone 11 Simulator",
    platformVersion: "13.4",
    platformName: "iOS",
    browserName: "Safari",
  },
  "android-latest": {
    base,
    appiumVersion,
    deviceName: "Android GoogleAPI Emulator",
    browserName: "Chrome",
    platformVersion: "11.0",
    platformName: "Android",
  },
};

export const legacyMobile: SupportMatrix = {
  "android-legacy": {
    base,
    appiumVersion,
    deviceName: "Android GoogleAPI Emulator",
    browserName: "Chrome",
    platformVersion: "6.0",
    platformName: "Android",
  },
  "ios-legacy": {
    base,
    browserName: "Safari",
    deviceName: "iPhone Simulator",
    deviceOrientation: "portrait",
    platformVersion: "10.3",
    platformName: "iOS",
    appiumVersion: "1.9.1",
  },
};

/**
 * Export supported browsers
 */
export const browsers: SupportMatrix = {
  ...latestDesktop,
  ...legacyDesktop,
  ...latestMobile,
  ...legacyMobile,
};

/**
 * Return true if CI environment (Github actions) detected
 */
export const ci = (): boolean => process.env.GITHUB_ACTION !== undefined;

/**
 * Retrieve git sha
 */
export const gitSha = (): string =>
  execSync("git rev-parse --short HEAD").toString().trim();

/**
 * Build ID
 *
 * Use gitsha and date if local
 *
 * Use Github action ID if CI
 */
export const generateBuild = (): string =>
  ci() ? `${process.env.GITHUB_RUN_ID}` : `${gitSha()}-${new Date().toJSON()}`;

interface Options {
  defaults?: any;
  testName: string;
  build?: string;
}

const ni = networkInterfaces();
const hostname = Object.keys(ni)
  .map((interf) =>
    // @ts-ignore
    ni[interf].map((o) => !o.internal && o.family === "IPv4" && o.address)
  )
  .reduce((a, b) => a.concat(b))
  // @ts-ignore
  .filter((o) => o)[0];

/**
 * Generates sauce config
 */
export const config = ({ testName, build, defaults = {} }: Options) => ({
  ...defaults,
  // Hostname points to IP address. Due to a change in Android where the VM
  // will point to its own localhost and not karma server
  hostname,
  reporters: ["dots", "karma-typescript", "saucelabs"],
  plugins: ["karma-mocha", "karma-typescript", "karma-sauce-launcher"],
  browserDisconnectTimeout: 10000,
  browserDisconnectTolerance: 2,
  browserNoActivityTimeout: 30000,
  singleRun: true,
  captureTimeout: 120000,
  transports: ["websocket", "polling"],
  sauceLabs: {
    testName,
    region: "eu",
    startConnect: true,
    build: build === undefined ? generateBuild() : build,
    recordVideo: false,
    recordScreenshots: false,
    public: "public restricted",
  },
});
