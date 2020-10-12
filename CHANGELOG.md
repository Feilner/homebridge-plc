# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

*mind the rename from S7 to PLC from version 1.0.3*

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
