# Changelog

## [2.1.3] 2015-12-01
- Update dependencies for Node.js 24 compatibility
  
## [2.1.2] 2015-08-28
- Align documentation and rode regarding renamings introduced with version 2.0.1
- Update Readme.md and example code picture
- `PLC_LockMechanismBool` (perform change inteded for version 2.0.1)
  - Renamed option `set_Secured` -> `set_LockTargetStateBool_Secured`
  - Renamed option `set_Unsecured` -> `set_LockTargetStateBool_Unsecured`

## [2.1.1] 2025-04-13

### Fixed
- `PLC_Valve` Update inUse after setting Active to update status in Home App

## [2.1.0] 2025-01-12

### Notable changes
- Compatible with homebridge 2.0.0-beta.0
- Compatible with Node.js 22

### Changed
- Updated README.md and added logo
- Updated comments in config.schema.json

### Fixed
- Runtime error if no accessory name is defined

## [2.0.8] 2025-01-01

### Fixed
- Added missing execution time for setBit

## [2.0.7] 2024-12-28

- In debug mode, also log the time for the PLC access

## [2.0.6] 2024-12-26

- Added warning related to Node.js 22.12.0 that comes with homebridge apt pkg version 1.4.0 and is used in Homebridge Docker from 2024-12-12

## [2.0.5] 2024-12-13

### Fixed
- `PLC_StatelessProgrammableSwitch` and `PLC_Doorbell` corrected config schema for get_ProgrammableSwitchEvent and fixed poll issue

## [2.0.4] 2024-08-17

### Fixed
- `PLC_ContactSensor` corrected name of invert option invertContactSensorState

## [2.0.3] 2024-03-17

### Added
- `PLC_CarbonDioxideSensor`
- `PLC_CarbonMonoxideSensor`

## [2.0.1] 2023-09-12

### Notable changes
- Configuration via GUI

### Changed
In order to support configuration by GUI, some configuration options need to be renamed.

- `PLC_LightBulb`:
  - Renamed option `minValue` -> `minBrightnessValue` and changed default value from `20` to `0`
  - Renamed option `maxValue` -> `maxBrightnessValue`
  - Renamed option `minStep`  -> `minBrightnessStep`
- `PLC_LightBulb`, `PLC_Outlet`, and `PLC_Switch`
  - Renamed options for separate set and reset bits. (Single bit option `set_On` is still functional)
  - Renamed option `set_Off` -> `set_On_Reset` and `set_On` -> `set_On_Set`
- `PLC_Fan`, `PLC_HumidifierDehumidifier`, `PLC_Faucet`, `PLC_Valve`
  - Renamed options for separate set and reset bits. (Single bit option `set_Active` is still functional)
  - Renamed option `set_Deactivate` -> `set_Active_Reset` and `set_Active` -> `set_Active_Set`
- `PLC_TemperatureSensor`
  - Renamed option `minValue` -> `minTemperatureValue` and changed default value from `-50` to `-270`
  - Renamed option `maxValue` -> `maxTemperatureValue` and changed default value from `110` to `100`
  - Renamed option `minStep`  -> `minTemperatureStep`  and changed default value from `0.5` to `0.1`
- `PLC_HumiditySensor`
  - Renamed option `minValue` -> `minHumidityValue`
  - Renamed option `maxValue` -> `maxHumidityValue`
  - Renamed option `minStep`  -> `minHumidityStep`
- `PLC_Thermostat`
  - Renamed option `minValue` -> `minTargetTemperatureValue` and changed default value from `15` to `10`
  - Renamed option `maxValue` -> `maxTargetTemperatureValue` and changed default value from `27` to `38`
  - Renamed option `minStep`  -> `minTargetTemperatureStep`  and changed default value from `0.5` to `0.1`
  - Renamed option `minHumidityValue` -> `minTargetHumidityValue`
  - Renamed option `maxHumidityValue` -> `maxTargetHumidityValue`
  - Renamed option `minHumidityStep`  -> `minTargetHumidityStep`
  - Renamed option `mapGetCurrent` -> `mapGetCurrentHeatingCoolingState`
  - Renamed option `mapGetTarget`  -> `mapGetTargetHeatingCoolingState`
  - Renamed option `mapSetTarget`  -> `mapSetTargetHeatingCoolingState`
- `PLC_SecuritySystem`
  - Renamed option `mapGetCurrent` -> `mapGetSecuritySystemCurrentState`
  - Renamed option `mapGetTarget`  -> `mapGetSecuritySystemTargetState`
  - Renamed option `mapSetTarget`  -> `mapSetSecuritySystemTargetState`
  - The obsolete options `mapGet` and `mapSet` are no longer supported. Use the above map functions.
- `PLC_HumidifierDehumidifier`
  - Renamed option `mapGetCurrent` -> `mapGetCurrentHumidifierDehumidifierState`
  - Renamed option `mapGetTarget`  -> `mapGetTargetHumidifierDehumidifierState`
  - Renamed option `mapSetTarget`  -> `mapSetTargetHumidifierDehumidifierState`
- `PLC_Window`, `PLC_WindowCovering`, `PLC_Door`
  - Removed option `mapGet`
  - Added option `mapGetCurrentPosition`
  - Added option `mapGetTargetPosition`
  - Added option `mapSetTargetPosition`
  - Renamed option `invert`  -> `invertPosition`
- `PLC_LockMechanismBool`
  - Renamed option `invert` -> `invertLockState`
  - Renamed option `get_LockCurrentState` -> `get_LockCurrentStateBool`
  - Renamed option `get_LockTargetState` -> `get_LockTargetStateBool`
  - Renamed option `set_LockTargetState` -> `set_LockTargetStateBool`
  - Renamed option `set_Secured` -> `set_LockTargetStateBool_Secured`
  - Renamed option `set_Unsecured` -> `set_LockTargetStateBool_Unsecured`
  - Renamed option `forceCurrentState` -> `forceCurrentLockState`
- `PLC_LockMechanism`
  - Renamed option `forceCurrentState` -> `forceCurrentLockState`
- `PLC_GarageDoorOpener`
  - Renamed option `forceCurrentState` -> `forceCurrentGarageDoorState`
- `PLC_LockMechanismBool`
  - Renamed option `invert` -> `invertLockState`
- `PLC_OccupancySensor`
  - Renamed option `invert` -> `invertOccupancy`
- `PLC_MotionSensor`
  - Renamed option `invert` -> `invertMotionDetected`
- `PLC_LeakSensor`
  - Renamed option `invert` -> `invertLeakDetected`
- `PLC_ContactSensor`
  - Renamed option `invert` -> `invertContactSensorState`
- `PLC_Fan`
  - Renamed option `mapGetCurrent` -> `mapCurrentFanStateGet`
  - Renamed option `mapGetTarget`  -> `mapTargetFanStateGet`
  - Renamed option `mapSetTarget`  -> `mapTargetFanStateSet`
  - Renamed option `mapDirectionGet`  -> `mapRotationDirectionGet`
  - Renamed option `mapDirectionSet`  -> `mapRotationDirectionSet`

### Added
- `PLC_Thermostat`
  - Option `minTemperatureValue`
  - Option `maxTemperatureValue`
  - Option `minTemperatureStep`
  - Option `minHumidityValue`
  - Option `maxHumidityValue`
  - Option `minHumidityStep`
- `PLC_AirPurifier`
- `PLC_FilterMaintenance`

### Fixed
- Data corruption during multiple SET operations e.g. close all blinds
  - Synchronous execution of SET operations

## [1.0.40] 2023-09-12
### Fixed
- Data corruption during multiple SET operations e.g. close all blinds
  - Synchronous execution of SET operations

## [1.0.39] 2022-09-28
### Fixed
- Possible buffer overwrite by using a separate buffer for each set operation

## [1.0.38] 2022-04-28
### Updated
- Updated documentation

## [1.0.37] 2022-04-23
### Fixed
- Fixed **http control**

## [1.0.36] 2022-04-23
### Added
- Option `forward` to forward push and control http requests to another instance of homebridge-plc, useful to overcome the 150 devices limit of homebridge or if you like to mirror to another instance.
- Option `mirror` to mirror all readings from PLC and push requests by an http push operation to another homebridge instance where homebridge-plc is installed. (experimental)
- Optimized log output for http control and push requests

## [1.0.35] 2022-01-25
### Changed
- Added range limit 0.0001~100000 for `PLC_LightSensor` to avoid warning when value 0 is used.

## [1.0.34] 2022-01-04

### Added
- Added `PLC_LightSensor`
### Changed
- Added DB number to manufacture field when other value is given
- Updated documentation

## [1.0.33] 2021-11-23

### Added
- Added `PLC_LeakSensor`
- Added `PLC_Fan` (beta)
### Changed
- `PLC_HumidifierDehumidifier` added separate bit on/off support by adding `set_Deactivate`
- `PLC_HumidifierDehumidifier` added byte support for rotation speed by adding `set_RotationSpeedByte` and `get_RotationSpeedByte`

## [1.0.32] 2021-11-11

With the latest update of the Homebridge UI Docker container, the plugin does not start!

Error: The module ... node_snap7.node was compiled against a different Node.js version ... Please try re-compiling or re-installing ...

During installation of this module, snap7 is downloaded and compiled against the installed version of Node.js.
Therefore, the issue is fixed for sure by uninstalling and installing the homebridge_plc plugin.

### Changed
- Updated dependent version of node-snap7 in hope that it triggers a reinstall of node-snap7.

## [1.0.31] 2021-07-21

### Fixed
- Option `minValue` and `maxValue` to also work with value 0

## [1.0.30] 2021-04-21

### Added
- Option `communicationOP` to use OP-Communication instead of PG-Communication for communication with the PLC

## [1.0.29] 2021-04-21

### Fixed
- `PLC_HumidifierDehumidifier` correct option `mapSetTarget`, `mapGetTarget` and `mapGetCurrent`
- `PLC_Thermostat` correct option `mapSetTarget`, `mapGetTarget` and `mapGetCurrent`

### Changed
- `PLC_SecuritySystem` introduced `mapSetTarget`, `mapGetTarget` and `mapGetCurrent`. This replaces `mapSet` and `mapGet`. (For backwards compatibility, old options are still supported)

## [1.0.28] 2021-02-26

### Changed
- Updated documentation

### Fixed
- Polling for `PLC_HumidifierDehumidifier`

## [1.0.27] 2021-02-22

### Added
- Added `PLC_HumidifierDehumidifier`
- `PLC_Thermostat`: added option `mapGetCurrent`

## [1.0.26] 2021-02-14

### Changed
- `PLC_TemperatureSensor`: default maxValue increased from 50 to 110
- `PLC_Thermostat` removed warning when using `get_StatusTampered` or `get_StatusLowBattery` was no success, removed useless code.

## [1.0.25] 2021-01-19

### Added
- `PLC_Thermostat`: added push support for `get_CurrentHeatingCoolingState`
- `PLC_Thermostat`: added support for `get_TargetHeatingCoolingState` and `set_TargetHeatingCoolingState` including `mapGetTarget` and `mapSetTarget`

### Fixed
- `PLC_Thermostat` fixed documentation of `get_CurrentHeatingCoolingState`
- `PLC_Thermostat` removed warning when using `get_StatusTampered` or `get_StatusLowBattery` see https://github.com/homebridge/homebridge/issues/2768

## [1.0.24] - 2021-01-05

### Added
- Added option `invert` for `PLC_LockMechanismBool`
- Added option `mapGet` and `mapSet` for `PLC_LockMechanism`
- Added option `get_CurrentRelativeHumidity`, `set_TargetRelativeHumidity` and `get_TargetRelativeHumidity` for `PLC_Thermostat`
- Added option `get_StatusTampered` and `get_StatusLowBattery` for `PLC_Thermostat`
- Added option `get_StatusTampered` and `get_StatusLowBattery` for `PLC_TemperatureSensor`
- Added option `get_StatusTampered` and `get_StatusLowBattery` for `PLC_HumiditySensor`
- Added option `get_StatusTampered` and `get_StatusLowBattery` for `PLC_OccupancySensor`
- Added option `get_StatusTampered` and `get_StatusLowBattery` for `PLC_MotionSensor`
- Added option `get_StatusTampered` and `get_StatusLowBattery` for `PLC_ContactSensor`

## [1.0.23] - 2021-01-02

### Added
- Added option `invert` for `PLC_OccupancySensor`, `PLC_MotionSensor` and `PLC_ContactSensor`

## [1.0.22] - 2021-01-01

### Changed
- Changed **default value** for parameter `port` from `8080` to `8888`. This was done to avoid conflicts with Homebridge UI which has 8080 as default port. The port is used when using `enablePush` or `enableControl` is set. **(check your config)**

### Added
- Added option `defaultPollInterval` on platform level
- Added option `distributePolling` on platform level

## [1.0.21] - 2020-12-29

### Added
- Control support for `PLC_Thermostat`

### Fixed
- Control handling for `PLC_Windows`, `PLC_WindowCovering` and `PLC_Door`
- Control handling for `PLC_Faucet` and `PLC_Valve`

### Changed
- Reordered code to have the same order for init, poll, and control part
- Added section comments to the code
- Added recommendations from validator

## [1.0.20] - 2020-12-23

### Added
- Added `PLC_SmokeSensor`

## [1.0.19] - 2020-11-19

### Added
- New accessory `PLC_Doorbell`

### Fixed
- `PLC_Thermostat` name of parameter corrected to `get_CurrentHeatingCoolingState`, previous incorrect name `get_CurrentHeaterCoolerState` *check your config*
- `PLC_Thermostat` did not poll CurrentHeatingCoolingState when polling was enabled
- `PLC_StatelessProgrammableSwitch` simulating switch event by control interface (http request) did not work

## [1.0.18] - 2020-11-16

### Changed
- Added option `forceDoorState` for `PLC_GarageDoorOpener`
- Home app does not seem to use the lock for `PLC_GarageDoorOpener`. Removed `get_LockCurrentState`, `get_LockTargetState` and `set_LockTargetState`

## [1.0.17] - 2020-11-14

### Changed
- More detailed error log for http requests

### Fixed
- Fixed `PLC_LightBulb` brightness to be `Byte` value as documented. In fact, it was a `Real`. Please change in PLC if you already use it.

## [1.0.16] - 2020-11-09

### Changed
- Only disconnect from PLC on TCP errors, mask 0x000fffff of snap7 error codes. Client errors of PLC no longer trigger reconnect
- Snap7 error codes are printed in hex values
- Documentation extended

### Fixed
- Fixed poll issue for `PLC_TemperatureSensor`, `PLC_HumiditySensor` and `PLC_Thermostat`
- Fixed double definition for `PLC_GarageDoorOpener`
- Fixed `PLC_LightBulb` brightness to be `Byte` value as documented. In fact, it was a `Real`. Please change in PLC if you already use it.

## [1.0.15] - 2020-11-07

### Changed
- Documentation updated and added PLC examples

## [1.0.14] - 2020-11-06

### Fixed
- Config issue with Push from PLC
- Documentation

## [1.0.13] - 2020-10-30

### Added
- Possibility to control PLC devices via http request (experimental)

### Fixed
- Push notifications from PLC were not correctly handled when the bit address is not *.0

## [1.0.12] - 2020-10-27

### Added
- Accessory `PLC_LockMechanismBool`
- Accessory `PLC_LockMechanism` got new option `forceCurrentState`

## [1.0.11] - 2020-10-27
### Fixed
- Accessory `PLC_WindowCovering`, `PLC_Window` and `PLC_Door` caused a reboot during poll mode

## [1.0.10] - 2020-10-26
### Added
- **Push support** from the PLC to the homebridge-plc plugin by an http request
- Poll support for all supported accessories. (Please inform me if one is not working as expected)

### Changed
- Accessory `PLC_WindowCovering`, `PLC_Window` and `PLC_Door` need to define new option `forceCurrentPosition` to maintain current behavior!

### Fixed
- Accessory `PLC_GarageDoorOpener` added missing `get_LockCurrentState`

## [1.0.9] - 2020-10-21
### Added
- Accessory: `PLC_OccupancySensor`: Add polling to detect changes. New configuration `enablePolling` and `pollInterval`
- Accessory: `PLC_MotionSensor`: Add polling to detect changes. New configuration `enablePolling` and `pollInterval`
- Accessory: `PLC_ContactSensor` added.
- Accessory: `PLC_TemperatureSensor`: Add option `minValue`, `maxValue` `minStep`
- Accessory: `PLC_HumiditySensor`: Add option `minValue`, `maxValue` `minStep`
- Accessory: `PLC_LightBulb`: Add option `minValue`, `maxValue` `minStep`
- Accessory: `PLC_Thermostat`: Add option `minValue`, `maxValue` `minStep` and changed default setting

### Changed
- Accessory `PLC_SecuritySystem`: A set of target state will do a single get of target and current state

## [1.0.8] - 2020-10-14
### Fixed
- `PLC_MotionSensor` was not functional

## [1.0.7] - 2020-10-12
### Changed
- `PLC_WindowCovering`, `PLC_Window` and `PLC_Door` got, in addition to the `adaptivePolling` which polls the current state during movement, a possibility to enable with `enablePolling` polling at a lower frequency the current state. Thus, the option `pollInterval` changed its meaning. It now defines the frequency for the `enablePolling` while `adaptivePollingInterval` defines the frequency for the `adaptivePolling`.

## [1.0.6] - 2020-10-12
### Added
- Accessory `PLC_StatelessProgrammableSwitch` is now functional
- Accessory `PLC_Door` added
- Accessory `PLC_GarageDoorOpener` added (experimental state)
- Accessory `PLC_LockMechanism` added (experimental state)
- New configuration option `mapGet` for `PLC_WindowCovering`, `PLC_Window` and `PLC_Door` to map custom values

### Fixed
- `PLC_WindowCovering`, `PLC_Window` and `PLC_Door`: When target settings are not defined (not electric movable), writes are ignored. Instead, the current value is pushed as the target value as get after a set operation

## [1.0.5] - 2020-10-11
### Added
- Platform `PLC`: Polling mode that enables background task poll accessories. New configuration `enablePolling`
- Accessory: `PLC_WindowCovering`: Adaptive polling when moving blinds. New configuration `adaptivePolling` and `pollInterval`
- Accessory: `PLC_SecuritySystem`: Polling to detect changes. New configuration `enablePolling` and `pollInterval`

## [1.0.4] - 2020-10-09
### Fixed
- Rename failed for LightBulb

## [1.0.3] - 2020-10-09
### Changed
- ACTION Necessary!!!
- Change name of plugin from `S7` to `PLC`. Please rename your configuration.
- Remove prefix `S7_` from all accessories. Remove it e.g. by STRG-H replace `S7_` by `PLC_`
- Fix spelling in parameter from `set_Deactive` to `set_Deactivate`

### Fixed
- Accessory Window and WindowCovering will shown as moving permanent (target position is now pushed immediately as current position)

### Added
- Accessory StatelessProgrammableSwitch
- Accessory SecuritySystem

## [1.0.2] - 2020-10-04
### Added
- Single bit on/off for S7_LightBulb S7_Outlet and S7_Faucet

## [1.0.1] - 2020-10-04
### Fixed
- Finalize name change

## [1.0.0] - 2020-10-04
### Fixed
- Change name of plugin from homebridge-S7_PLC to homebridge-plc homebridge denied to install

## [0.0.1] - 2020-10-04
### Added
- Initial Version


The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
