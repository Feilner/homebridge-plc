# Changelog


## [1.0.25] 2021-01.19

### Added
- `PLC_Thermostat`: add push support for `get_CurrentHeatingCoolingState`
- `PLC_Thermostat`: add support for `get_TargetHeatingCoolingState` and `set_TargetHeatingCoolingState` including `mapGetTarget` and `mapSetTarget`

### Fixed
- `PLC_Thermostat` fixed documentation of `get_CurrentHeatingCoolingState`
- `PLC_Thermostat` remove warning when using `get_StatusTampered` or `get_StatusLowBattery` see https://github.com/homebridge/homebridge/issues/2768

## [1.0.24] - 2021-01-05

### Added
- add option `invert` for `PLC_LockMechanismBool`
- add option `mapGet` and `mapSet` for `PLC_LockMechanism`
- add option `get_CurrentRelativeHumidity` , `set_TargetRelativeHumidity` and `get_TargetRelativeHumidity` for `PLC_Thermostat`
- add option `get_StatusTampered` and `get_StatusLowBattery` for `PLC_Thermostat`
- add option `get_StatusTampered` and `get_StatusLowBattery` for `PLC_TemperatureSensor`
- add option `get_StatusTampered` and `get_StatusLowBattery` for `PLC_HumiditySensor`
- add option `get_StatusTampered` and `get_StatusLowBattery` for `PLC_OccupancySensor`
- add option `get_StatusTampered` and `get_StatusLowBattery` for `PLC_MotionSensor`
- add option `get_StatusTampered` and `get_StatusLowBattery` for `PLC_ContactSensor`

## [1.0.23] - 2021-01-02

### Added
- add option `invert` for `PLC_OccupancySensor`, `PLC_MotionSensor` and `PLC_ContactSensor`


## [1.0.22] - 2021-01-01

### Changed
- changed **default value** for parameter `port` from `8080` to `8888`. This was done to avoid conflicts with Homebridge UI which has 8080 as default port. The port is used when using `enablePush` or `enableControl` is set. **(check your config)**

### Added
- add option `defaultPollInterval` on platform level
- add option `distributePolling` on platform level

## [1.0.21] - 2020-12-29

### Added
- control support for `PLC_Thermostat`

### Fixed
- control handling for `PLC_Windows`, `PLC_WindowCovering` and `PLC_Door`
- control handling for `PLC_Faucet` and `PLC_Valve`

### Changed
- reordered code to have same order for init, poll, and control part
- add section comments to the code
- add recommendations from validator

## [1.0.20] - 2020-12-23

### Added
- add `PLC_SmokeSensor`

## [1.0.19] - 2020-11-19

### Added
- new accessory `PLC_Doorbell`

### Fixed
- `PLC_Thermostat` name of parameter corrected to `get_CurrentHeatingCoolingState` previous incorrect name `get_CurrentHeaterCoolerState` *check your config*
- `PLC_Thermostat` did not poll CurrentHeatingCoolingState when polling was enabled
- `PLC_StatelessProgrammableSwitch` simulating switch event by control interface (http request) did not work

## [1.0.18] - 2020-11-16

### Changed
- added option `forceDoorState` for `PLC_GarageDoorOpener`
- Home app seems does not to use the lock for `PLC_GarageDoorOpener`. Remove `get_LockCurrentState`, `get_LockTargetState` and `set_LockTargetState`

## [1.0.17] - 2020-11-14

### Changed
- More detailed error log for http requests

### Fixed
- Fixed `PLC_LightBulb` brightness to be `Byte` value as documented. In fact is was a `Real` please change in PLC if you already use it.

## [1.0.16] - 2020-11-09

### Changed
- Only disconnect to PLC on TCP errors mask 0x000fffff of snap7 error codes. Clint errors of PLC does no longer trigger reconnect
- Snap7 error codes are printed in hex values
- Documentation extended

### Fixed
- Fix poll issue for `PLC_TemperatureSensor`, `PLC_HumiditySensor` and `PLC_Thermostat`
- Fix double definition for `PLC_GarageDoorOpener`
- Fixed `PLC_LightBulb` brightness to be `Byte` value as documented. In fact is was a `Real` please change in PLC if you already use it

## [1.0.16] - 2020-11-09

### Changed
- Only disconnect to PLC on TCP errors mask 0x000fffff of snap7 error codes. Clint errors of PLC does no longer trigger reconnect
- Snap7 error codes are printed in hex values
- Documentation extended

### Fixed
- Fix poll issue for `PLC_TemperatureSensor`, `PLC_HumiditySensor` and `PLC_Thermostat`
- Fix double definition for `PLC_GarageDoorOpener`

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
- Push notifications from PLC where not correctly handled when the bit address is not *.0

## [1.0.12] - 2020-10-27

### Added
- Accessory `PLC_LockMechanismBool`
- Accessory `PLC_LockMechanism` got new option `forceCurrentState`

## [1.0.11] - 2020-10-27
### Fixed
- Accessory `PLC_WindowCovering`, `PLC_Window` and `PLC_Door` causes a reboot during poll mode

## [1.0.10] - 2020-10-26
### Added
- **Push support** from the PLC to the homebridge-plc plug in by a http request
- Poll support for all supported accessories. (Please inform me if one is not working as expected)

### Changed
- Accessory `PLC_WindowCovering`, `PLC_Window` and `PLC_Door` need to define new option `forceCurrentPosition` to maintain current behaviour!

### Fixed
- Accessory `PLC_GarageDoorOpener` add missing `get_LockCurrentState`

## [1.0.9] - 2020-10-21
### Added
- Accessory: `PLC_OccupancySensor`: Add polling to detect changes. New configuration `enablePolling` and `pollInterval`
- Accessory: `PLC_MotionSensor`: Add polling to detect changes. New configuration `enablePolling` and `pollInterval`
- Accessory: `PLC_ContactSensor` added.
- Accessory: `PLC_TemperatureSensor` Add option `minValue`, `maxValue` `minStep`
- Accessory: `PLC_HumiditySensor` Add option `minValue`, `maxValue` `minStep`
- Accessory: `PLC_LightBulb` Add option `minValue`, `maxValue` `minStep`
- Accessory: `PLC_Thermostat` Add option `minValue`, `maxValue` `minStep` and changed default setting

### Changed
- Accessory `PLC_SecuritySystem` a set of target state will do a single get of target and current state

## [1.0.8] - 2020-10-14
### Fixed `PLC_MotionSensor` was not functional

## [1.0.7] - 2020-10-12
### Changed
- `PLC_WindowCovering`, `PLC_Window` and `PLC_Door` got additionally to the `adaptivePolling` which polls the current state during movement a possibility to enable with `enablePolling` polling at with  lower frequency the current sate. Thus the option `pollInterval` changed its meaning it now defines the frequency for the `enablePolling` wile `adaptivePollingInterval` defines the frequency for the `adaptivePolling`.

## [1.0.6] - 2020-10-12
### Added
- Accessory `PLC_StatelessProgrammableSwitch` is now functional
- Accessory `PLC_Door` added
- Accessory `PLC_GarageDoorOpener` added (experimental state)
- Accessory `PLC_LockMechanism` added (experimental state)
- New configuration option `mapGet` for `PLC_WindowCovering`, `PLC_Window` and `PLC_Door` to map custom values

### Fixed
- `PLC_WindowCovering`, `PLC_Window` and `PLC_Door` when target settings are not defined (not electric movable). Writes are ignored instead current value is pushed as target value as get after a set operation


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
- Remove prefix `S7_` from all accessories. Remove ist e.g. by STRG-H replace `S7_` by `PLC_`
- Fix spelling in parameter from `set_Deactive` to `set_Deactivate`

### Fixed
- Accessory Window and WindowCovering will shown as moving permanent (target position is now pushed immediately as current position)

### Added
- Accessory StatelessProgrammableSwitch
- Accessory SecuritySystem

## [1.0.2] - 2020-10-04
### Added
- single bit on/off for S7_LightBulb S7_Outlet and S7_Faucet

## [1.0.1] - 2020-10-04
### Fixed
- finalize name change

## [1.0.0] - 2020-10-04
### Fixed
- change name of plugin from homebridge-S7_PLC to homebridge-plc homebridge denied to install

## [0.0.1] - 2020-10-04
### Added
- Initial Version


The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

