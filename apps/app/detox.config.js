const iosName = "detoxapp";
const simulator = "iPhone 16";
const derivedDataPath = "ios/build";
const sdk = "iphonesimulator";

module.exports = {
  testRunner: {
    $0: "jest",
    args: {
      config: require.resolve("./e2e/jest.config.js"),
      _: ["e2e"],
    },
    jest: {
      setupTimeout: 300000,
      reportSpecs: true,
      reportWorkerAssign: true,
    },
  },
  behavior: {
    init: {
      exposeGlobals: false,
    },
  },
  apps: {
    "ios.release": {
      type: "ios.app",
      binaryPath: `${derivedDataPath}/Build/Products/Release-${sdk}/${iosName}.app`,
      build: `./scripts/build-detox-ios.sh ${iosName} Release YES`,
    },
    "ios.debug": {
      type: "ios.app",
      binaryPath: `${derivedDataPath}/Build/Products/Debug-${sdk}/${iosName}.app`,
      build: `./scripts/start-metro.sh && ./scripts/build-detox-ios.sh ${iosName} Debug`,
    },
    "android.debug": {
      type: "android.apk",
      binaryPath: "android/app/build/outputs/apk/debug/app-debug.apk",
      build:
        "./scripts/start-metro.sh && pushd android; ./gradlew app:assembleDebug app:assembleAndroidTest -DtestBuildType=debug; popd",
    },
    "android.release": {
      type: "android.apk",
      binaryPath: "android/app/build/outputs/apk/release/app-release.apk",
      build:
        "pushd android; ./gradlew app:assembleRelease app:assembleAndroidTest -DtestBuildType=release; popd",
    },
  },
  devices: {
    simulator: {
      type: "ios.simulator",
      device: {
        type: simulator,
      },
    },
    emulator: {
      type: "android.emulator",
      device: {
        avdName: "Pixel_6_Pro_API_33",
      },
    },
  },
  configurations: {
    "ios.sim.release": {
      device: "simulator",
      app: "ios.release",
    },
    "ios.sim.debug": {
      device: "simulator",
      app: "ios.debug",
    },
    "android.emu.debug": {
      device: "emulator",
      app: "android.debug",
    },
    "android.emu.release": {
      device: "emulator",
      app: "android.release",
    },
  },
};
