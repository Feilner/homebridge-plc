# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
