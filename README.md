# homebridge-plc
Homebridge plugin for Siemens Step7 and compatible PLCs

[![NPM Version](https://img.shields.io/npm/v/homebridge-plc.svg)](https://www.npmjs.com/package/homebridge-plc)
[![npm](https://img.shields.io/npm/l/homebridge-plc.svg)](https://www.npmjs.com/package/homebridge-plc) [![npm](https://img.shields.io/npm/dt/homebridge-plc.svg)](https://www.npmjs.com/package/homebridge-plc)

SIEMENS S7 PLC plugin for [Homebridge](https://homebridge.io)
- Uses snap7 for communication therefore compatible with:
	- S7 300
	- S7 400
	- S7 1200 see [Snap7 notes](http://snap7.sourceforge.net/snap7_client.html#1200_1500)
	- S7 1500 see [Snap7 notes](http://snap7.sourceforge.net/snap7_client.html#1200_1500)
	- and compatible PLCs e.g. Yaskawa or VIPA
- Tested with S7-300 compatible PLC and S7-1200
- Implementation is based on documentation of the [Homebridge API](https://developers.homebridge.io)
- Supports [**polling**](#poll) from homebridge-plc plugin to PLC by per accessory defined interval
- Supports [**push**](#push) from PLC to homebridge-plc plugin by http PUT/GET
- Supports [**control**](#control) of PLC accessories by http PUT/GET (experimental)
- Supported Accessories:
  * [LightBulb as `PLC_LightBulb`](#PLC_LightBulb)
  * [Outlet as `PLC_Outlet`](#PLC_Outlet)
  * [Switch as `PLC_Switch`](#PLC_Switch)
  * [Temperature Sensor as `PLC_TemperatureSensor`](#PLC_TemperatureSensor)
  * [Humidity Sensor as `PLC_HumiditySensor`](#PLC_HumiditySensor)
  * [Thermostat as `PLC_Thermostat`](#PLC_Thermostat)
  * [Shutters as `PLC_WindowCovering`, windows as `PLC_Window` and doors as `PLC_Door`](#PLC_Window)
  * [Occupancy Sensor as `PLC_OccupancySensor`](#PLC_OccupancySensor)
  * [Motion Sensor as `PLC_MotionSensor`](#PLC_MotionSensor)
  * [Contact Sensor as `PLC_ContactSensor`](#PLC_ContactSensor)
  * [Security System as `PLC_SecuritySystem`](#PLC_SecuritySystem)
  * [Faucet as `PLC_Faucet`](#PLC_Faucet)
  * [Valve as `PLC_Valve`](#PLC_Valve)
  * [Button as `PLC_StatelessProgrammableSwitch`](#PLC_StatelessProgrammableSwitch)
  * [Lock mechanism as `PLC_LockMechanism`](#PLC_LockMechanism)
  * [Boolean lock mechanism as `PLC_LockMechanismBool`](#PLC_LockMechanismBool)
  * [Garage door as `PLC_GarageDoorOpener`](#PLC_GarageDoorOpener)


# Installation

- Basic Installation
	- Install this plugin using: `npm install -g homebridge-plc`
	- Edit `config.json` to add the plc platform and its accessories.
	- Run Homebridge

- Install via Homebridge UI
	- Search for `plc` on the plugin screen of [config-ui-x](https://github.com/oznu/homebridge-config-ui-x) .
	- Find `homebridge-plc`
	- Click install.
	- Edit configuration

# Homebridge configuration

## Platform

The plugin is configured as single platform by defining a `PLC` platform.
Parameters:
- `ip`: the IPv4 address of the PLC
- `rack`: the rack number of the PLC typically 0
- `slot`: the slot number of the PLC for S7 300/400 typically `2`, for 1200/1500 typically `1`
- `enablePolling`: when set to `true` a background task is executed every second enable polling for the accessories
- `enablePush`: when set to `true` a the configured `port` is opened to push updates of values form plc to the plugin
- `enableControl`: when set to `true` a the configured `port` is opened to control accessories by http request
- `port`: port for http requests default `8080`

## Accessories
- In the platform, you can declare different types of accessories currently supported:

### <a name='PLC_LightBulb'></a>LightBulb as `PLC_LightBulb`
normal light see also PLC example for [single bit](doc/ligtbulb_plc_example_SingleBit.png) and [separate bits](doc/ligtbulb_plc_example_SeperatedBit.png)
- `name`: unique name of the accessory
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: (optional) when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `get_On`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`
- Single Bit for on/off:
	- `set_On`: offset and bit set to 1/0 when switching on/off S7 type `Bool` PLC  e.g. `55.0` for `DB4DBX55.0` could be same as get_On
- Separate Bits for on/off:
	- `set_On`: offset and bit set to 1 when switching on S7 type `Bool` PLC has to set to 0 e.g. `55.1` for `DB4DBX55.1`
	- `set_Off`: offset and bit set to 1 when switching off S7 type `Bool` PLC has to set to 0 e.g. `55.2` for `DB4DBX55.2`
- `get_Brightness`: (optional) get brightness value S7 type `Byte` e.g. `56` for `DB4DBB56`
- `set_Brightness`: (optional but required when `get_Brightness` is defined) set brightness value S7 type `Byte` e.g. `57` for `DB4DBB57`
- brightness range definitions (optional)
	- `minValue` default value: 20
	- `maxValue` default value: 100
	- `minStep` default value: 1

### <a name='PLC_Outlet'></a>Outlet as `PLC_Outlet`
outlet possible to show also as ventilator or light
- `name`: unique name of the accessory
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: (optional) when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `get_On`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`
- Single Bit for on/off:
		- `set_On`: offset and bit set to 1/0 when switching on/off S7 type `Bool` PLC  e.g. `55.0` for `DB4DBX55.0` could be same as get_On
- Separate Bits for on/off:
		- `set_On`: offset and bit set to 1 when switching on S7 type `Bool` PLC has to set to 0 e.g. `55.1` for `DB4DBX55.1`
		- `set_Off`: offset and bit set to 1 when switching off S7 type `Bool` PLC has to set to 0 e.g. `55.2` for `DB4DBX55.2`

### <a name='PLC_Switch'></a>Switch as `PLC_Switch`
 switch possible to show also as ventilator or light
- `name`: unique name of the accessory
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: (optional) when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `get_On`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`
- Single Bit for on/off:
		- `set_On`: offset and bit set to 1/0 when switching on/off S7 type `Bool` PLC  e.g. `55.0` for `DB4DBX55.0` could be same as get_On
- Separate Bits for on/off:
		- `set_On`: offset and bit set to 1 when switching on S7 type `Bool` PLC has to set to 0 e.g. `55.1` for `DB4DBX55.1`
		- `set_Off`: offset and bit set to 1 when switching off S7 type `Bool` PLC has to set to 0 e.g. `55.2` for `DB4DBX55.2`

### <a name='PLC_TemperatureSensor'></a>Temperature Sensor as `PLC_TemperatureSensor`
normal temperature sensor
- `name`: unique name of the accessory
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: (optional) when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `get_CurrentTemperature`: offset to get current temperature S7 type `Real` e.g. `55` for `DB4DBD55`
- temperature range (optional)
	- `minValue` default value: -50
	- `maxValue` default value: 50
	- `minStep` default value: 0.5

### <a name='PLC_HumiditySensor'></a>Humidity Sensor as `PLC_HumiditySensor`:
normal humidity sensor
- `name`: unique name of the accessory
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: (optional) when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `get_CurrentRelativeHumidity`: offset to get current humidity S7 type `Real` e.g. `55` for `DB4DBD55`
- humidity range (optional)
	- `minValue` default value: 0
	- `maxValue` default value: 100
	- `minStep` default value: 1


### <a name='PLC_Thermostat'></a>Thermostat as `PLC_Thermostat`
temperature sensor and temperature regulation
- `name`: unique name of the accessory
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: (optional) when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `get_CurrentTemperature`: offset to get current humidity S7 type `Real` e.g. `55` for `DB4DBD55`
- S7 type `Byte` e.g. `56` for `DB4DBB56`
- `get_CurrentTemperature`: offset to get current temperature S7 type `Real` e.g. `0` for `DB4DBD0`
- `get_TargetTemperature`: offset to get target temperature S7 type `Real` e.g. `4` for `DB4DBD4`
- `set_TargetTemperature`: offset to set current temperature S7 type `Real` e.g. `4` for `DB4DBD4` (can have same value as get_TargetTemperature)
- target temperature range definitions (optional)
	- `minValue` default value: 15
	- `maxValue` default value: 27
	- `minStep` default value: 1
- `get_CurrentHeaterCoolerState`: (optional) current heating/cooling state when not present fixed `1` is used S7 type `Byte` e.g. `8` for `DB4DBB58`
		- `0`: inactive
		- `1`: idle
		- `2`: heating
		- `3`: cooling
- `get_TargetHeatingCoolingState` not yet supported returns fixed `3`
		- `0`: off
		- `1`: heat
		- `2`: cool
		- `3`: automatic
- `set_TargetHeatingCoolingState` not yet supported writes are ignored


### <a name='PLC_Window'></a>Shutters as `PLC_WindowCovering`, windows as `PLC_Window` and doors as `PLC_Door`
shutters or blinds as well sensors for windows and doors
- `name`: unique name of the accessory
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `invert`: (optional) set to `true` to inverts the meanings of the values from `0:closed 100:open` to `100:closed 0:open`
- `mapGet`: (optional) define mapping array for get position. The PLC value is used as index into the table. e.g. `[0, 25, 100]` which maps the PLC value `0->0 1->25 2->100` this this is useful e.g. for window open state.
- `adaptivePolling`:  (optional) when set to `true` the current position will be polled until target position is reached. Polling starts with set target position from home app. This allows to show the shutter as opening... or closing... in the home app during movement.
- `adaptivePollingInterval` (optional) poll interval in seconds during high frequency polling. Default value is `1` second.
- `forceCurrentPosition` (optional) when set to `true` the position set by `set_TargetPosition` is directly used as current position. By this it seems in tha home app as the target position was directly reached. This is recommended when not using `adaptivePolling` or pushing the value from the plc.
- `enablePolling`: (optional) when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `get_CurrentPosition`: offset to get current position S7 type `Byte` e.g. `0` for `DB4DBB0`
- if one of the (optional) target position settings need specified all are needed. If not specified it os not movable ans sticks to current position.
	- `get_TargetPosition`: (optional) offset to get target position S7 type `Byte` e.g. `1` for `DB4DBB1`  (can have same value as set_TargetPosition)
	- `set_TargetPosition`: (optional) offset to set current position S7 type `Byte` e.g. `2` for `DB4DBB2` (can have same value as get_TargetPosition)
- `get_PositionState`: (optional) offset to current movement state if not defined fixed `2`is returned S7 type `Byte` e.g. `3` for `DB4DBB3`
		- `0`: down
		- `1`: up
		- `2`: stop
- `set_HoldPosition`: (optional): offset and bit set to 1 to stop movement. (Seems not to be used) when not defined writes will be ignoredS7 type `Bool` PLC has to set to 0 e.g. `55.1` for `DB4DBX55.1`

### <a name='PLC_OccupancySensor'></a>Occupancy Sensor as `PLC_OccupancySensor`
presence detection sensor
- `name`: unique name of the accessory
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: (optional) when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `get_OccupancyDetected`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`
		- `false`: no occupancy
		- `true`: occupancy detected

### <a name='PLC_MotionSensor'></a>Motion Sensor as `PLC_MotionSensor`
movement detection sensor
- `name`: unique name of the accessory
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: (optional) when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `get_MotionDetected`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`
		- `false`: no motion
		- `true`: motion detected

### <a name='PLC_ContactSensor'></a>Contact Sensor as `PLC_ContactSensor`
contact sensor
- `name`: unique name of the accessory
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: (optional) when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `get_ContactSensorState`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`
		- `false`: closed
		- `true`: open

### <a name='PLC_SecuritySystem'></a>Security System as `PLC_SecuritySystem`:
alarm system
- `name`: unique name of the accessory
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: (optional) when set to `true` the current state of the security system will be polled. When disabled a set of the target system state. will trigger a single get of the target and current state.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `get_SecuritySystemCurrentState`: offset to current security system state S7 type `Byte` e.g. `3` for `DB4DBB3`
		- `0`: armed stay at home
		- `1`: armed away from home
		- `2`: armed night
		- `3`: disarmed
		- `4`: alarm triggered
- `set_SecuritySystemTargetState`: offset to set target security system state S7 type `Byte` e.g. `5` for `DB4DBB4`
- `get_SecuritySystemTargetState`: offset to set target security system state S7 type `Byte` e.g. `6` for `DB4DBB6`
		- `0`: armed stay at home
		- `1`: armed away from home
		- `2`: armed night
		- `3`: disarmed
- `mapGet`: (optional) define mapping array for get security system state. The PLC value is used as index into the table. e.g. `[3, 1]` which maps the PLC value `0->3 1->2` when the PLC supports only two states with `0:disarmed` and `1:armed` and `2:alarm`.
- `mapSet`: (optional) define mapping array for set security system state. The home app value is used as index into the table. e.g. `[1, 1, 1, 0, 2]` which maps the PLC value `0->1 1->1 2->1, 3->0, 4->2` when the PLC supports only two states with `0:disarmed` and `1:armed` and `2:alarm`.

### <a name='PLC_Faucet'></a>Faucet as `PLC_Faucet`
watering for the garden
- `name`: unique name of the accessory
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: (optional) when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `get_Active`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`
- Single Bit for on/off:
		- `set_Active`: offset and bit set to 1/0 when switching on/off S7 type `Bool` PLC  e.g. `55.0` for `DB4DBX55.0` could be same as get_Active
- Separate Bits for on/off:
		- `set_Active`: offset and bit set to 1 when switching on S7 type `Bool` PLC has to set to 0 e.g. `55.1` for `DB4DBX55.1`
		- `set_Deactivate`: offset and bit set to 1 when switching off S7 type `Bool` PLC has to set to 0 e.g. `55.2` for `DB4DBX55.2`

### <a name='PLC_Valve'></a>Valve as `PLC_Valve`
valve configurable as generic valve, irrigation, shower head or water faucet
- `name`: unique name of the accessory
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: (optional) when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `ValveType` configures the valve type that is returned
		- `0`: generic valve
		- `1`: irrigation
		- `2`: shower head
		- `3`: water faucet
- `get_Active`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`
- Single Bit for on/off:
		- `set_Active`: offset and bit set to 1/0 when switching on/off S7 type `Bool` PLC  e.g. `55.0` for `DB4DBX55.0` could be same as get_Active
- Separate Bits for on/off:
		- `set_Active`: offset and bit set to 1 when switching on S7 type `Bool` PLC has to set to 0 e.g. `55.1` for `DB4DBX55.1`
		- `set_Deactivate`: offset and bit set to 1 when switching off S7 type `Bool` PLC has to set to 0 e.g. `55.2` for `DB4DBX55.2`
- if one of the (optional) duration settings need specified all are needed
		- `get_SetDuration`: (optional) duration 0..3600 sec S7 type `Time` e.g. `10` for `DB4DBD10`
		- `set_SetDuration`: (optional) duration 0..3600 sec S7 type `Time` e.g. `14` for `DB4DBD14`
		- `get_RemainingDuration`: (optional) duration 0..3600 sec S7 type `Time` e.g. `18` for `DB4DBD18`

### <a name='PLC_StatelessProgrammableSwitch'></a>Button as `PLC_StatelessProgrammableSwitch`
stateless switch from PLC to home app. Trigger actions in home app only works with control center e.g. AppleTV or HomePod.
It will works only in polling mode! The PLC sets a bit that is regularly polled by homebridge after successful reading a 1 of the event the bit it will report the event and set the bit to 0. Change 0->1 is done by PLC change from 1->0 is done by homebridge!
- `name`: unique name of the accessory
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: (optional) when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `isEvent` offset and bit that is polled when set to 1 by the PLC the event is read and the bit is set to 0 by homebridge S7 type `Bool` PLC has to set to 0 e.g. `55.1` for `DB4DBX55.1`
- `get_ProgrammableSwitchEvent`: offset to red current event of the switch. This is reported towards home app S7 type `Byte` e.g. `3` for `DB4DBB3`
		- `0`: single press
		- `1`: double press
		- `2`: long press

### <a name='PLC_LockMechanism'></a>Lock mechanism as `PLC_LockMechanism` 
Lock mechanism (not yet clear how to use changes are welcome)
  - `name`: unique name of the accessory
  - `manufacturer`: (optional) description
  - `db`: s7 data base number e.g. `4` for `DB4`
  - `enablePolling`: (optional) when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
  - `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
  - `forceCurrentState`: (optional) when set to `true` the position set by `set_LockTargetState` is directly used as current state. By this it seems in tha home app as the target state was directly reached. This is recommended when not using `enablePolling` or pushing the value from the plc.
  - `get_LockCurrentState`: offset to read current state current state S7 type `Byte` e.g. `3` for `DB4DBB3`
  	- `0`: unsecured
  	- `1`: secured
  	- `2`: jammed
  	- `3`: unknown
- `get_LockTargetState`: offset to read target state current state S7 type `Byte` e.g. `3` for `DB4DBB3`
- `0`: unsecured
  - `1`: secured
- `set_LockTargetState`:  offset to write target state current state S7 type `Byte` e.g. `3` for `DB4DBB3`
  - `0`: unsecured
  - `1`: secured

### <a name='PLC_LockMechanismBool'></a>Boolean lock mechanism as `PLC_LockMechanismBool`
Lock mechanism implemented as bool on the PLC. **NOTE: The convention `0`:closed/secured  `1`:open/unsecured**
- `name`: unique name of the accessory
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: (optional) when set to `true` the current state will be polled. t is mandatory as well to enable polling mode on platform level.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `forceCurrentState`: (optional) when set to `true` the position set by set_LockTargetState` is directly used as current state. By this it seems in tha ome app as the target state was directly reached. This is recommended when not sing `enablePolling` or pushing the value from the plc.
- `get_LockCurrentState`: offset to read current state current state S7 type `Bool` .g. `3.1` for `DB4DBB3`
	- `0`: secured
	- `1`: unsecured
- `get_LockTargetState`: offset to read target state current state S7 type `Bool` e.. `3.1` for `DB4DBB3`
	- `0`: secured
	- `1`: unsecured
- Single Bit for secure/unsecured:
	- `set_LockTargetState`:  offset to write target state current state S7 type `Bool` e.g. `3.1` for `DB4DBB3`
		- `0`: secured
		- `1`: unsecured
- Separate Bits for secure/unsecured:
  - `set_Secured`: offset and bit set to 1 when switching to target state secured S7 type `Bool` PLC has to set to 0 e.g. `3.3` for `DB4DBX55.1`
	- `set_Unsecured`: offset and bit set to 1 when switching to target state unsecured S7 type `Bool` PLC has to set to 0 e.g. `3.4` for `DB4DBX55.2`


### <a name='PLC_GarageDoorOpener'></a>Garage door as `PLC_GarageDoorOpener` (experimental)
Lock mechanism (not yet clear how to use changes are welcome)
- `name`: unique name of the accessory
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: (optional) when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `get_ObstructionDetected` offset and bit to obfuscation detection true means that the door was blocked S7 type `Bool` PLC has to set to 0 e.g. `55.1` for `DB4DBX55.1`
- `get_CurrentDoorState`: offset to read current state current state S7 type `Byte` e.g. `3` for `DB4DBB3`
	- `0`: open
	- `1`: closed
	- `2`: opening
	- `3`: closing
	- `4`: stopped
- `get_TargetDoorState`: offset to read target state current state S7 type `Byte` e.g. `3` for `DB4DBB3`
	- `0`: open
	- `1`: closed
- `set_TargetDoorState`:  offset to write target state current state S7 type `Byte` e.g. `3` for `DB4DBB3`
	- `0`: open
	- `1`: closed
- `get_LockCurrentState`: offset to read current state current state S7 type `Byte` e.g. `3` for `DB4DBB3`
	- `0`: unsecured
	- `1`: secured
	- `2`: jammed
	- `3`: unknown
- `get_LockTargetState`: offset to read target state current state S7 type `Byte` e.g. `3` for `DB4DBB3`
	- `0`: unsecured
	- `1`: secured
- `set_LockTargetState`:  offset to write target state current state S7 type `Byte` e.g. `3` for `DB4DBB3`
	- `0`: unsecured
	- `1`: secured


#### config.json Example
Note: The example is just an example it contains also some optional settings

		{
		"bridge": {
				"name": "Homebridge DEMO",
				"username": "0E:54:47:36:82:26",
				"port": 52609,
				"pin": "031-55-155"
		},
		"platforms": [
				{
						"platform": "PLC",
						"ip": "10.10.10.99",
						"rack": 0,
						"slot": 2,
						"enablePolling": true,
						"accessories": [
								{
										"accessory": "PLC_LightBulb",
										"name": "LightBulb0",
										"manufacturer": "normal light bulb",
										"db": 6061,
										"get_On": 0.7,
										"set_On": 1.1,
										"set_Off": 1.7
								},
								{
										"accessory": "PLC_LightBulb",
										"name": "LightBulb1",
										"manufacturer": "with dim function",
										"db": 6062,
										"get_On": 2.1,
										"set_On": 2.2,
										"set_Off": 2.3,
										"get_Brightness": 4,
										"set_Brightness": 4
								},
								{
										"accessory": "PLC_LightBulb",
										"name": "LightBulb2",
										"manufacturer": "single bit for on/off",
										"db": 6094,
										"get_On": 1.1,
										"set_On": 1.1
								},
								{
										"accessory": "PLC_Outlet",
										"name": "Outlet",
										"db": 6107,
										"get_On": 0.7,
										"set_On": 1.1,
										"set_Off": 1.7
								},
								{
										"accessory": "PLC_Switch",
										"name": "Switch",
										"db": 6107,
										"get_On": 0.7,
										"set_On": 1.1,
										"set_Off": 1.7
								},
								{
										"accessory": "PLC_TemperatureSensor",
										"name": "Temperature",
										"db": 6107,
										"get_CurrentTemperature": 55,
										"enablePolling": true,
										"pollInterval": 60
								},
								{
										"accessory": "PLC_HumiditySensor",
										"name": "Humidity",
										"db": 1901,
										"get_CurrentRelativeHumidity": 55,
										"enablePolling": true,
										"pollInterval": 16
								},
								{
										"accessory": "PLC_Thermostat",
										"name": "Thermostat",
										"manufacturer": "ground floor",
										"db": 6601,
										"get_CurrentTemperature": 0,
										"get_TargetTemperature": 4,
										"set_TargetTemperature": 12,
										"get_CurrentHeaterCoolerState": 10
								},
								{
										"accessory": "PLC_WindowCovering",
										"name": "Blind",
										"manufacturer": "ground floor",
										"db": 2602,
										"invert": false,
										"adaptivePolling": true,
										"adaptivePollingInterval": 1,
										"enablePolling": true,
										"pollInterval": 180,
										"get_CurrentPosition": 0,
										"get_TargetPosition": 1,
										"set_TargetPosition": 1
								},
								{
										"accessory": "PLC_Window",
										"name": "Window",
										"manufacturer": "ground floor",
										"enablePolling": true,
										"pollInterval": 60,
										"db": 2008,
										"get_CurrentPosition": 5,
										"mapGet": [
												0,
												25,
												100
										]
								},
								{
										"accessory": "PLC_Door",
										"name": "Door",
										"manufacturer": "ground floor",
										"enablePolling": true,
										"pollInterval": 10,
										"db": 2008,
										"get_CurrentPosition": 49,
										"mapGet": [
												0,
												100
										]
								},
								{
										"accessory": "PLC_OccupancySensor",
										"name": "Presence",
										"db": 6510,
										"get_OccupancyDetected": 24
								},
								{
										"accessory": "PLC_MotionSensor",
										"name": "Motion",
										"db": 1902,
										"get_MotionDetected": 0.5
								},
								{
										"accessory": "PLC_ContactSensor",
										"name": "ContactSensor",
										"enablePolling": true,
										"pollInterval": 5,
										"db": 6094,
										"get_ContactSensorState": 0
								},
								{
										"accessory": "PLC_SecuritySystem",
										"name": "AlarmSystem",
										"db": 1014,
										"enablePolling": true,
										"pollInterval": 60,
										"get_SecuritySystemCurrentState": 1,
										"set_SecuritySystemTargetState": 0,
										"get_SecuritySystemTargetState": 0,
										"mapGet": [
												1,
												1,
												1,
												3,
												4
										],
										"mapSet": [
												1,
												1,
												1,
												3
										]
								},
								{
										"accessory": "PLC_Faucet",
										"name": "Faucet",
										"db": 6096,
										"get_Active": 1.1,
										"set_Active": 1.1
								},
								{
										"accessory": "PLC_Valve",
										"name": "Valve",
										"db": 6096,
										"ValveType": 2,
										"get_Active": 1.1,
										"set_Active": 1.1,
										"get_SetDuration": 4,
										"set_SetDuration": 4,
										"get_RemainingDuration": 8
								},
								{
										"accessory": "PLC_StatelessProgrammableSwitch",
										"name": "Stateless Switch",
										"enablePolling": true,
										"pollInterval": 30,
										"db": 12,
										"isEvent": 0.1,
										"get_ProgrammableSwitchEvent": 1
								},
								{
										"accessory": "PLC_LockMechanism",
										"name": "LockMechanism",
										"db": 13,
										"isEvent": 0.1,
										"get_LockCurrentState": 1,
										"get_LockTargetState": 2,
										"set_LockTargetState": 3
								},
								{
										"accessory": "PLC_GarageDoorOpener",
										"name": "GarageDoorOpener",
										"db": 14,
										"get_ObstructionDetected": 0.1,
										"get_CurrentDoorState": 1,
										"get_TargetDoorState": 2,
										"set_TargetDoorState": 2,
										"get_LockCurrentState": 3,
										"get_LockTargetState": 4,
										"set_LockTargetState": 4
								}
						]
				},
				{
						"name": "Config",
						"port": 80,
						"platform": "config"
				}
		],
		"accessories": []
}

# Update of values
The home app does not regularly poll for updates of values. Only when switching rooms or close/open the app the actual values are requested.
This behavior is even the case when a AppleTV or HomePod is configured as control center.
There are three possible ways to workaround this.

1. That's ok for you
2. You enable the polling mode
3. You enable the push mode and instrument your PLC code to send the values

## <a name='poll'></a>Poll values form PLC
To enable this you have to set `"enablePolling": true;` platform level and on each individual accessory with individual interval in seconds.
		`"enablePolling": true, "pollInterval": 30,`


## <a name='push'></a>Push values from PLC

It possible to send updates of values directly from the plc to the homebridge-plc plugin. This is especially useful when you want notifications form your home app about open/close of doors or just a faster response e.g. with PLC_StatelessProgrammableSwitch.
To enable this you have to set `"enablePush": true,` platform level and optional the `port`.

The push takes place via an http request to the configured port with the keyword "push". In order to avoid that additional configurations between the PLC and the Homebrige-plc-Plugin have to be synchronized, the interface is kept very simple. The interface that the PLC operates consists only of the keyword 'push', the database number 'db', the address within the db 'offset' and the value 'value'.
The value is assigned to all matching ('db' and 'offset') get_* accessory configurations. All information is transmitted within the URL and in decimal.

For example the push from the PLC is done as 'http://homebridgeIp:8080/?push&db=1014&offset=1&value=3'
With the following configuration:

		{
				"platforms": [
						{
						"platform": "PLC",
						"ip": "10.10.10.32",
						"rack": 0,
						"slot": 2,
						"enablePush": true,
						"accessories": [
								{
										"accessory": "PLC_SecuritySystem",
										"name": "AlarmSystem",
										"db": 1014,
										"get_SecuritySystemCurrentState": 1,
										"set_SecuritySystemTargetState": 1,
										"get_SecuritySystemTargetState": 1
								}
						 ]
					}
				]
			}

The value '3' disarmed will be used for both for get_SecuritySystemCurrentState as well as get_SecuritySystemTargetState.

The Request has to be done as HTTP `PUT` or `GET` operation. There will be no logging when doing a `PUT` operation while there will be detailed output when during a `GET` operation. This in especially intended for testing with the browser as the browser performs a `GET` operation per default.

### Format
Example for float values when trigger from browser:

	http://homebridgeIp:8080/?push&db=3&offset=22&value=12.5

Example for bool values when trigger from browser

	http://homebridgeIp:8080/?push&db=5&offset=5.1&value=1

Example for byte values when trigger from browser

	http://homebridgeIp:8080/?push&db=2&offset=3&value=255

# <a name='control'></a>Control of PLC accessories

It´s also possible to control PLC accessories via HTTP `PUT` or `GET` operation. This might be useful for integration into other automation systems.
To enable this you have to set `"enableControl": true,` platform level and optional the `port`.

**NOTE: It is currently not possible to query the current state**

The interface that the PLC operates consists only of the keyword 'control', the database number 'db', the address within the db 'offset' and the value 'value'.
The value is assigned to the matching ('db' and 'offset') set_* accessory configurations. For accessories with separate on/off configurations e.g. PLC_LightBulb set_On/set_Off the set_On has to be uses.  All information is transmitted within the URL and in decimal.

The Request has to be done as HTTP `PUT` or `GET` operation. There will be no logging when doing a `PUT` operation while there will be detailed output when during a `GET` operation. This in especially intended for testing with the browser as the browser performs a `GET` operation per default.

###  4.2. <a name='Format-1'></a>Format
Example to switch a light bulb on from browser:

		{
				"platforms": [
						{
						"platform": "PLC",
						"ip": "10.10.10.32",
						"rack": 0,
						"slot": 2,
						"enableControl": true,
						"accessories": [
								{
										"accessory": "PLC_LightBulb",
										"name": "Light ",
										"db": 6096,
										"set_On": 1.1,
										"set_Off": 1.0,
										"get_On": 0.0
								}
						 ]
					}
				]
			}

	http://homebridgeIp:8080/?push&db=6096&offset=1.1&value=1

Example to switch a light bulb off from browser:

	http://homebridgeIp:8080/?push&db=6096&offset=1.1&value=0

# Test & Release

## Local test
The easiest is to open the terminal from homebridge delete the `index.js` file of this plugin, open nano and past in the new content.
Afterwards the Homebridge can be restarted.
The delete and open of hte index.js file can be done by the following command line.

`rm node_modules/homebridge-plc/index.js && nano node_modules/homebridge-plc/index.js`

## Publish npm package

`npm publish --access public`

