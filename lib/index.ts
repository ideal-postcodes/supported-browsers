import { execSync } from "child_process";

export type SupportMatrix = Record<string, Browser>;

export type Browser = MobileBrowser | DesktopBrowser;

interface DesktopBrowser {
  base: "SauceLabs";
  // Browser (e.g. IE, Chrome)
  browserName: string;
  // Browser version number and? bit version (e.g. 74x64)
  version: string;
  // Operating system and version (e.g. Windows 10)
  platform?: string;
}

interface MobileBrowser {
  base: "SauceLabs";
  // Browser (e.g. IE, Chrome)
  browserName: string;
  // Browser version number and? bit version (e.g. 74x64)
  version: string;
  // Operating system and version (e.g. Windows 10)
  platform?: string;
  // Mobile device (e.g. iPhone 4s)
  deviceName: string;
  // Portrait or landscape
  deviceOrientation: string;
}

const base = "SauceLabs";

export const latestDesktop: SupportMatrix = {
  chrome: {
    base,
    browserName: "chrome",
    version: "latest",
  },
  firefox: {
    base,
    browserName: "firefox",
    version: "latest",
  },
  safari: {
    base,
    browserName: "safari",
    version: "latest",
  },
  edge: {
    base,
    browserName: "microsoftedge",
    version: "latest",
  },
};

export const legacyDesktop: SupportMatrix = {
  ie: {
    base,
    browserName: "internet explorer",
    version: "11",
    platform: "Windows 8.1",
  },
  "chrome-legacy": {
    base,
    browserName: "chrome",
    version: "43.0",
    platform: "Windows 10",
  },
  "firefox-legacy": {
    base,
    browserName: "firefox",
    version: "48.0",
    platform: "Windows 10",
  },
};

export const latestMobile: SupportMatrix = {
  "ios-latest": {
    base,
    deviceOrientation: "portrait",
    deviceName: "iPhone X Simulator",
    browserName: "Safari",
    version: "latest",
    platform: "iOS",
  },
  "android-latest": {
    base,
    deviceName: "Android GoogleAPI Emulator",
    deviceOrientation: "portrait",
    browserName: "Chrome",
    version: "7.0",
    platform: "Android",
  },
};

export const legacyMobile: SupportMatrix = {
  "android-legacy": {
    base,
    browserName: "Browser",
    deviceName: "Android GoogleAPI Emulator",
    deviceOrientation: "portrait",
    version: "5.1",
    platform: "Android",
  },
  "ios-legacy": {
    base,
    browserName: "Safari",
    deviceName: "iPhone SE Simulator",
    deviceOrientation: "portrait",
    version: "10.3",
    platform: "iOS",
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
  execSync("git rev-parse --short HEAD")
    .toString()
    .trim();

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

/**
 * Generates sauce config
 */
export const config = ({ testName, build, defaults = {} }: Options) => ({
  ...defaults,
  reporters: ["dots", "karma-typescript", "saucelabs"],
  plugins: [
    "karma-mocha",
    "karma-typescript",
    "karma-sauce-launcher",
  ],
  browserDisconnectTimeout: 10000,
  browserDisconnectTolerance: 2,
  browserNoActivityTimeout: 30000,
  captureTimeout: 120000,
  transports: ["websocket", "polling"],
  sauceLabs: {
    testName,
    startConnect: true,
    build: build === undefined ? generateBuild() : build,
    recordVideo: false,
    recordScreenshots: false,
    public: "public restricted",
  },
});
