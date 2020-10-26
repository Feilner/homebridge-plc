# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

*mind the rename from S7 to PLC from version 1.0.3*
## [1.0.10] - 2020-10-21
### Added
- Support to push updated variables from the PLC to the homebridge-plc plug in by a http request
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
