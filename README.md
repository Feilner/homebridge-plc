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
- Supports [**polling**](#poll) of PLC from homebridge-plc plugin by per accessory defined interval
- Supports [**push**](#push) from PLC to homebridge-plc plugin by http PUT/GET
- Supports [**control**](#control) of PLC accessories by http PUT/GET
- Supported Accessories:
	* [LightBulb as `PLC_LightBulb`](#PLC_LightBulb)
	* [Outlet as `PLC_Outlet`](#PLC_Outlet)
	* [Switch as `PLC_Switch`](#PLC_Switch)
	* [Temperature Sensor as `PLC_TemperatureSensor`](#PLC_TemperatureSensor)
	* [Humidity Sensor as `PLC_HumiditySensor`](#PLC_HumiditySensor)
	* [Thermostat as `PLC_Thermostat`](#PLC_Thermostat)
	* [Shutter as `PLC_WindowCovering`](#PLC_Window)
	* [Window as `PLC_Window`](#PLC_Window)
	* [Door as `PLC_Door`](#PLC_Window)
	* [Occupancy Sensor as `PLC_OccupancySensor`](#PLC_OccupancySensor)
	* [Motion Sensor as `PLC_MotionSensor`](#PLC_MotionSensor)
	* [Contact Sensor as `PLC_ContactSensor`](#PLC_ContactSensor)
	* [Faucet as `PLC_Faucet`](#PLC_Faucet)
	* [Valve as `PLC_Valve`](#PLC_Valve)
	* [Security System as `PLC_SecuritySystem`](#PLC_SecuritySystem)
	* [Push button attached to PLC as `PLC_StatelessProgrammableSwitch`](#PLC_StatelessProgrammableSwitch)
	* [Doorbell push button attached to PLC as `PLC_Doorbell`](#PLC_StatelessProgrammableSwitch)
	* [Lock mechanism as `PLC_LockMechanism`](#PLC_LockMechanism)
	* [Boolean lock mechanism as `PLC_LockMechanismBool`](#PLC_LockMechanismBool)
	* [Garage door as `PLC_GarageDoorOpener`](#PLC_GarageDoorOpener)
	* [Smoke Sensor as `PLC_SmokeSensor`](#PLC_SmokeSensor)

# Installation

- Basic Installation
	- Install this plugin using: `npm install -g homebridge-plc`
	- Edit `config.json` to add the plc platform and its accessories.
	- Run Homebridge

- Install via Homebridge UI (recommended)
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
- `enablePolling`: **(optional)** when set to `true` a background task is executed every second enable polling for the accessories
- `defaultPollInterval` **(optional)** default polling interval for all accessories in seconds. Default value is `10` seconds.
- `distributePolling` **(optional)** when set to `true` the polling of the accessories does not start at the same time. In order to distribute the PLC load for the queries.
- `enablePush`: **(optional)** when set to `true` a the configured `port` is opened to push updates of values form plc to the plugin
- `enableControl`: **(optional)** when set to `true` a the configured `port` is opened to control accessories by http request
- `port`: **(optional)** port for http server to handle incoming http requests for push and control functionality. Default port is `8888`

## Accessories
- In the platform, you can declare different types of accessories
- The notation **(push support)** identifies that parameter supports direct updates from the PLC
- The notation **(control support)** identifies parameters that can be controlled by http request

### <a name='PLC_LightBulb'></a>LightBulb as `PLC_LightBulb`
normal light see also simple PLC example for [single bit](doc/ligtbulb_plc_example_SingleBit.png) and [separate bits](doc/ligtbulb_plc_example_SeperatedBit.png)

![homebridge pic](doc/lightbulb.png)
- `name`: unique name of the accessory
- `manufacturer`: **(optional)** description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: **(optional)** when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` **(optional)** poll interval in seconds. Default value see platform definition.
- `get_On`: **(push support)** offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`
- Single Bit for on/off:
	- `set_On`: **(control support)** offset and bit set to 1/0 when switching on/off S7 type `Bool` PLC e.g. `55.0` for `DB4DBX55.0` could be same as get_On
- Separate Bits for on/off:
	- `set_On`: **(control support)** offset and bit set to 1 when switching on S7 type `Bool` **PLC has to set to 0** e.g. `55.1` for `DB4DBX55.1`
	- `set_Off`: offset and bit set to 1 when switching off S7 type `Bool` **PLC has to set to 0** e.g. `55.2` for `DB4DBX55.2`
- `get_Brightness`: **(optional)** **(push support)** get brightness value S7 type `Byte` e.g. `56` for `DB4DBB56`
- `set_Brightness`: **(optional but required when `get_Brightness` is defined)** **(control support)** set brightness value S7 type `Byte` e.g. `57` for `DB4DBB57`
- brightness range definitions **(optional)**
	- `minValue` default value: 20
	- `maxValue` default value: 100
	- `minStep` default value: 1

### <a name='PLC_Outlet'></a>Outlet as `PLC_Outlet`
outlet possible to show also as ventilator or light

![homebridge pic](doc/outlet.png)
- `name`: unique name of the accessory
- `manufacturer`: **(optional)** description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: **(optional)** when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` **(optional)** poll interval in seconds. Default value see platform definition.
- `get_On`: **(push support)** offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`
- Single Bit for on/off:
	- `set_On`: **(control support)** offset and bit set to 1/0 when switching on/off S7 type `Bool` PLC e.g. `55.0` for `DB4DBX55.0` could be same as get_On
- Separate Bits for on/off:
	- `set_On`: **(control support)** offset and bit set to 1 when switching on S7 type `Bool` **PLC has to set to 0** e.g. `55.1` for `DB4DBX55.1`
	- `set_Off`: offset and bit set to 1 when switching off S7 type `Bool` **PLC has to set to 0** e.g. `55.2` for `DB4DBX55.2`

### <a name='PLC_Switch'></a>Switch as `PLC_Switch`
 switch possible to show also as ventilator or light

 ![homebridge pic](doc/switch.png)
- `name`: unique name of the accessory
- `manufacturer`: **(optional)** description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: **(optional)** when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` **(optional)** poll interval in seconds. Default value see platform definition.
- `get_On`: **(push support)** offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`
- Single Bit for on/off:
	- `set_On`: **(control support)** offset and bit set to 1/0 when switching on/off S7 type `Bool` PLC e.g. `55.0` for `DB4DBX55.0` could be same as get_On
- Separate Bits for on/off:
	- `set_On`: **(control support)** offset and bit set to 1 when switching on S7 type `Bool` **PLC has to set to 0** e.g. `55.1` for `DB4DBX55.1`
	- `set_Off`: offset and bit set to 1 when switching off S7 type `Bool` **PLC has to set to 0** e.g. `55.2` for `DB4DBX55.2`

### <a name='PLC_TemperatureSensor'></a>Temperature Sensor as `PLC_TemperatureSensor`
normal temperature sensor

![homebridge pic](doc/temperature.png)
- `name`: unique name of the accessory
- `manufacturer`: **(optional)** description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: **(optional)** when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` **(optional)** poll interval in seconds. Default value see platform definition.
- `get_CurrentTemperature`: **(push support)** offset to get current temperature S7 type `Real` e.g. `55` for `DB4DBD55`
- temperature range **(optional)**
	- `minValue` default value: -50
	- `maxValue` default value: 50
	- `minStep` default value: 0.5

### <a name='PLC_HumiditySensor'></a>Humidity Sensor as `PLC_HumiditySensor`:
normal humidity sensor

![homebridge pic](doc/humidity.png)
- `name`: unique name of the accessory
- `manufacturer`: **(optional)** description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: **(optional)** when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` **(optional)** poll interval in seconds. Default value see platform definition.
- `get_CurrentRelativeHumidity`: **(push support)** offset to get current humidity S7 type `Real` e.g. `55` for `DB4DBD55`
- humidity range **(optional)**
	- `minValue` default value: 0
	- `maxValue` default value: 100
	- `minStep` default value: 1


### <a name='PLC_Thermostat'></a>Thermostat as `PLC_Thermostat`
temperature sensor and temperature regulation

![homebridge pic](doc/thermostat.png)
- `name`: unique name of the accessory
- `manufacturer`: **(optional)** description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: **(optional)** when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` **(optional)** poll interval in seconds. Default value see platform definition.
- `get_CurrentTemperature`: offset to get current humidity S7 type `Real` e.g. `55` for `DB4DBD55`
- S7 type `Byte` e.g. `56` for `DB4DBB56`
- `get_CurrentTemperature`: **(push support)** offset to get current temperature S7 type `Real` e.g. `0` for `DB4DBD0`
- `get_TargetTemperature`: **(push support)** offset to get target temperature S7 type `Real` e.g. `4` for `DB4DBD4`
- `set_TargetTemperature`: **(control support)** offset to set current temperature S7 type `Real` e.g. `4` for `DB4DBD4` (can have same value as get_TargetTemperature)
- target temperature range definitions **(optional)**
	- `minValue` default value: 15
	- `maxValue` default value: 27
	- `minStep` default value: 1
- `get_CurrentHeatingCoolingState`: **(optional)** current heating/cooling state when not present fixed `1` is used S7 type `Byte` e.g. `8` for `DB4DBB58`
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
- `get_StatusTampered`: **(optional)** **(push support)** offset and bit to tamper detection. (Home app shows this only within the options) S7 type `Bool` e.g. `55.2` for `DB4DBX55.2`
	- `false`: ok
	- `true`: tampered
- `get_StatusLowBattery`: **(optional)** **(push support)** offset and bit to battery low detection. (Home app does not inform with push notification) S7 type `Bool` e.g. `55.3` for `DB4DBX55.3`
	- `false`: ok
	- `true`: battery low

### <a name='PLC_Window'></a>Shutters as `PLC_WindowCovering`, windows as `PLC_Window` and doors as `PLC_Door`
motor driven blinds, windows and doors. Supports also manual driven blinds, windows and doors to show just the current position in percent. **Note:** If your sensor shows only open/close may also have a look at [`PLC_ContactSensor`](#PLC_ContactSensor).

![homebridge pic](doc/blind.png) ![homebridge pic](doc/window.png) ![homebridge pic](doc/door.png)
- `name`: unique name of the accessory
- `manufacturer`: **(optional)** description
- `db`: s7 data base number e.g. `4` for `DB4`
- `invert`: **(optional)** set to `true` to inverts the meanings of the values from `0:closed 100:open` to `100:closed 0:open`
- `mapGet`: **(optional)** define mapping array for get position. The PLC value is used as index into the table. e.g. `[0, 25, 100]` which maps the PLC value `0->0 1->25 2->100` this this is useful e.g. for window open state.
- `adaptivePolling`: **(optional)** when set to `true` the current position will be polled until target position is reached. Polling starts with set target position from home app. This allows to show the shutter as opening... or closing... in the home app during movement.
- `adaptivePollingInterval` **(optional)** poll interval in seconds during high frequency polling. Default value is `1` second.
- `forceCurrentPosition` **(optional)** when set to `true` the position set by `set_TargetPosition` is directly used as current position. By this it seems in tha home app as the target position was directly reached. This is recommended when not using `adaptivePolling` or pushing the value from the plc.
- `enablePolling`: **(optional)** when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` **(optional)** poll interval in seconds. Default value see platform definition.
- `get_CurrentPosition`: **(push support)** offset to get current position S7 type `Byte` e.g. `0` for `DB4DBB0`
- if one of the **(optional)** target position settings need specified all are needed. If not specified it os not movable ans sticks to current position.
	- `get_TargetPosition`: **(optional)** **(push support)** offset to get target position S7 type `Byte` e.g. `1` for `DB4DBB1` (can have same value as set_TargetPosition)
	- `set_TargetPosition`: **(optional)** **(control support)** offset to set current position S7 type `Byte` e.g. `2` for `DB4DBB2` (can have same value as get_TargetPosition)
- `get_PositionState`: **(optional)** **(push support)** offset to current movement state if not defined fixed `2`is returned S7 type `Byte` e.g. `3` for `DB4DBB3`
	- `0`: down
	- `1`: up
	- `2`: stop
- `set_HoldPosition`: **(optional)** **(control support)** offset and bit set to 1 to stop movement. (Seems not to be used) when not defined writes will be ignoredS7 type `Bool` **PLC has to set to 0** e.g. `55.1` for `DB4DBX55.1`

### <a name='PLC_OccupancySensor'></a>Occupancy Sensor as `PLC_OccupancySensor`
presence detection sensor

![homebridge pic](doc/occupancy.png)
- `name`: unique name of the accessory
- `manufacturer`: **(optional)** description
- `db`: s7 data base number e.g. `4` for `DB4`
- `invert`: **(optional)** set to `true` inverts the bit to `false:presence` and `true:no-presence`.
- `enablePolling`: **(optional)** when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` **(optional)** poll interval in seconds. Default value see platform definition.
- `get_OccupancyDetected`: **(push support)** offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`
	- `false`: no occupancy
	- `true`: occupancy detected

### <a name='PLC_MotionSensor'></a>Motion Sensor as `PLC_MotionSensor`
movement detection sensor

![homebridge pic](doc/motion.png)
- `name`: unique name of the accessory
- `manufacturer`: **(optional)** description
- `db`: s7 data base number e.g. `4` for `DB4`
- `invert`: **(optional)** set to `true` inverts the bit to `false:motion` and `true:no-motion`.
- `enablePolling`: **(optional)** when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` **(optional)** poll interval in seconds. Default value see platform definition.
- `get_MotionDetected`: **(push support)** offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`
	- `false`: no motion
	- `true`: motion detected

### <a name='PLC_ContactSensor'></a>Contact Sensor as `PLC_ContactSensor`
Generic contact sensor. The home app allows to display as window, door, blind/shutter, garage door or contact sensor.

![homebridge pic](doc/contactsensor.png) ![homebridge pic](doc/blind.png) ![homebridge pic](doc/window.png) ![homebridge pic](doc/door.png) ![homebridge pic](doc/garagedoor.png)
- `name`: unique name of the accessory
- `manufacturer`: **(optional)** description
- `db`: s7 data base number e.g. `4` for `DB4`
- `invert`: **(optional)** set to `true` inverts the bit to `false:closed` and `true:open`.
- `enablePolling`: **(optional)** when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` **(optional)** poll interval in seconds. Default value see platform definition.
- `get_ContactSensorState`: **(push support)** offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`
	- `false`: closed
	- `true`: open

### <a name='PLC_Faucet'></a>Faucet as `PLC_Faucet`
watering for the garden

![homebridge pic](doc/faucet.png)
- `name`: unique name of the accessory
- `manufacturer`: **(optional)** description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: **(optional)** when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` **(optional)** poll interval in seconds. Default value see platform definition.
- `get_Active`: **(push support)** offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`
- Single Bit for on/off:
	- `set_Active`: **(control support)** offset and bit set to 1/0 when switching on/off S7 type `Bool` PLC e.g. `55.0` for `DB4DBX55.0` could be same as get_Active
- Separate Bits for on/off:
	- `set_Active`: **(control support)** offset and bit set to 1 when switching on S7 type `Bool` **PLC has to set to 0** e.g. `55.1` for `DB4DBX55.1`
	- `set_Deactivate`: offset and bit set to 1 when switching off S7 type `Bool` **PLC has to set to 0** e.g. `55.2` for `DB4DBX55.2`

### <a name='PLC_Valve'></a>Valve as `PLC_Valve`
valve configurable as generic valve, irrigation, shower head or water faucet

![homebridge pic](doc/valve.png)
- `name`: unique name of the accessory
- `manufacturer`: **(optional)** description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: **(optional)** when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` **(optional)** poll interval in seconds. Default value see platform definition.
- `ValveType` configures the valve type that is returned
	- `0`: generic valve
	- `1`: irrigation
	- `2`: shower head
	- `3`: water faucet
- `get_Active`: **(push support)** offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`
- Single Bit for on/off:
	- `set_Active`: **(control support)** offset and bit set to 1/0 when switching on/off S7 type `Bool` PLC e.g. `55.0` for `DB4DBX55.0` could be same as get_Active
- Separate Bits for on/off:
	- `set_Active`: **(control support)** offset and bit set to 1 when switching on S7 type `Bool` **PLC has to set to 0** e.g. `55.1` for `DB4DBX55.1`
	- `set_Deactivate`: offset and bit set to 1 when switching off S7 type `Bool` **PLC has to set to 0** e.g. `55.2` for `DB4DBX55.2`
- if one of the **(optional)** duration settings need specified all are needed
	- `get_SetDuration`: **(optional)** **(push support)** duration 0..3600 sec S7 type `Time` e.g. `10` for `DB4DBD10`
	- `set_SetDuration`: **(optional)** **(control support)** duration 0..3600 sec S7 type `Time` e.g. `14` for `DB4DBD14`
	- `get_RemainingDuration`: **(optional)** **(push support)** duration 0..3600 sec S7 type `Time` e.g. `18` for `DB4DBD18`

### <a name='PLC_SecuritySystem'></a>Security System as `PLC_SecuritySystem`:
alarm system

![homebridge pic](doc/securitysystem.png)
- `name`: unique name of the accessory
- `manufacturer`: **(optional)** description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: **(optional)** when set to `true` the current state of the security system will be polled.
- `pollInterval` **(optional)** poll interval in seconds. Default value see platform definition.
- `get_SecuritySystemCurrentState`: **(push support)** offset to current security system state S7 type `Byte` e.g. `3` for `DB4DBB3`
	- `0`: armed stay at home
	- `1`: armed away from home
	- `2`: armed night
	- `3`: disarmed
	- `4`: alarm triggered
- `set_SecuritySystemTargetState`: **(control support)** offset to set target security system state S7 type `Byte` e.g. `5` for `DB4DBB4`
- `get_SecuritySystemTargetState`: **(push support)** offset to set target security system state S7 type `Byte` e.g. `6` for `DB4DBB6`
	- `0`: armed stay at home
	- `1`: armed away from home
	- `2`: armed night
	- `3`: disarmed
- `mapGet`: **(optional)** define mapping array for get security system state. The PLC value is used as index into the table. e.g. `[3, 1]` which maps the PLC value `0->3 1->2` when the PLC supports only two states with `0:disarmed` and `1:armed` and `2:alarm`.
- `mapSet`: **(optional)** define mapping array for set security system state. The home app value is used as index into the table. e.g. `[1, 1, 1, 0, 2]` which maps the PLC value `0->1 1->1 2->1, 3->0, 4->2` when the PLC supports only two states with `0:disarmed` and `1:armed` and `2:alarm`.

### <a name='PLC_StatelessProgrammableSwitch'></a>Button as `PLC_StatelessProgrammableSwitch`, Doorbell as `PLC_Doorbell`
stateless switch from PLC to home app.

Trigger actions in home app only works with control center e.g. AppleTV or HomePod. [**Polling**](#poll) or [**push**](#push) from PLC required!

[**Polling mode**](#poll) homebridge-plc polls `isEvent`. The PLC sets the bit to `true`. hombebridge-plc reads `get_ProgrammableSwitchEvent` and set the `isEvent` bit to `false`.

[**Push mode**](#push) PLC informs homebridge-plc by http request with the value for `get_ProgrammableSwitchEvent`.

[**Control**](#control) External simulates event by http request with the value for `get_ProgrammableSwitchEvent`.

![homebridge pic](doc/statelessswitch.png)
- `name`: unique name of the accessory
- `manufacturer`: **(optional)** description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: **(optional)** when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` **(optional)** poll interval in seconds. Default value see platform definition.
- `isEvent` offset and bit that is polled by homebridge-plc. **PLC has to set to `true`.** When `true` the event is read from `get_ProgrammableSwitchEvent` and set to `false` by homebirdge-plc to confirm that the event is handled. S7 type `Bool` e.g. `55.1` for `DB4DBX55.1` (polling only, not used for push)
- `get_ProgrammableSwitchEvent`: **(push support)** **(control support)** offset to read current event of the switch. This is reported towards home app S7 type `Byte` e.g. `3` for `DB4DBB3`
	- `0`: single press
	- `1`: double press
	- `2`: long press

### <a name='PLC_LockMechanism'></a>Lock mechanism as `PLC_LockMechanism`
Lock mechanism (not yet clear how to use changes are welcome)

![homebridge pic](doc/lock.png)
- `name`: unique name of the accessory
- `manufacturer`: **(optional)** description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: **(optional)** when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` **(optional)** poll interval in seconds. Default value see platform definition.
- `forceCurrentState`: **(optional)** when set to `true` the position set by `set_LockTargetState` is directly used as current state. By this it seems in the home app as the target state was directly reached. This is recommended when not using `enablePolling` or pushing the value from the plc.
	- `get_LockCurrentState`: **(push support)** offset to read current state current state S7 type `Byte` e.g. `3` for `DB4DBB3`
		- `0`: unsecured
		- `1`: secured
		- `2`: jammed
		- `3`: unknown
- `get_LockTargetState`: **(push support)** offset to read target state current state S7 type `Byte` e.g. `3` for `DB4DBB3`
	- `0`: unsecured
	- `1`: secured
- `set_LockTargetState`: **(control support)** offset to write target state current state S7 type `Byte` e.g. `3` for `DB4DBB3`
	- `0`: unsecured
	- `1`: secured

### <a name='PLC_LockMechanismBool'></a>Boolean lock mechanism as `PLC_LockMechanismBool`
Lock mechanism implemented as bool on the PLC. **NOTE: The convention `0`=`false`: closed/secured `1`=`true`: open/unsecured**

![homebridge pic](doc/lockbool.png)
- `name`: unique name of the accessory
- `manufacturer`: **(optional)** description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: **(optional)** when set to `true` the current state will be polled. t is mandatory as well to enable polling mode on platform level.
- `pollInterval` **(optional)** poll interval in seconds. Default value see platform definition.
- `forceCurrentState`: **(optional)** when set to `true` the state set by `set_LockTargetState` is directly used as current state. By this it seems in the home app as the target state was directly reached. This is recommended when not using `enablePolling` or pushing the value from the plc.
- `invert`: **(optional)** when set to `true` all states are inverted (current and target state) `false`: **unsecured** and `true`: **secured**.
- `get_LockCurrentState`: **(push support)** offset to read current state current state S7 type `Bool` .g. `3.1` for `DB4DBB3`
	- `false`: secured
	- `true`: unsecured
- `get_LockTargetState`: **(push support)** offset to read target state current state S7 type `Bool` e.. `3.1` for `DB4DBB3`
	- `false`: secured
	- `true`: unsecured
- Single Bit for secure/unsecured:
	- `set_LockTargetState`: **(control support)** offset to write target state current state S7 type `Bool` e.g. `3.1` for `DB4DBB3`
		- `false`: secured
		- `true`: unsecured
- Separate Bits for secure/unsecured:
	- `set_Secured`: **(control support)** offset and bit set to `true` when switching to target state secured S7 type `Bool` **PLC has to set to `false`** e.g. `3.3` for `DB4DBX55.1`
	- `set_Unsecured`: offset and bit set to `true` when switching to target state unsecured S7 type `Bool` **PLC has to set to `false`** e.g. `3.4` for `DB4DBX55.2`


### <a name='PLC_GarageDoorOpener'></a>Garage door as `PLC_GarageDoorOpener`
Garage door

![homebridge pic](doc/garagedoor.png)
- `name`: unique name of the accessory
- `manufacturer`: **(optional)** description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: **(optional)** when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` **(optional)** poll interval in seconds. Default value see platform definition.
- `forceCurrentState`: **(optional)** when set to `true` the position set by `set_TargetDoorState` is directly used as current state. By this it seems in the home app as the target state was directly reached. This is recommended when not using `enablePolling` or pushing the value from the plc.
- `get_ObstructionDetected` **(optional)** **(push support)** offset and bit to obfuscation detection true means that the door was blocked S7 type `Bool` e.g. `55.1` for `DB4DBX55.1`
- `get_CurrentDoorState`: **(push support)** offset to read current state current state S7 type `Byte` e.g. `3` for `DB4DBB3`
	- `0`: open
	- `1`: closed
	- `2`: opening
	- `3`: closing
	- `4`: stopped
- `get_TargetDoorState`: **(push support)** offset to read target state current state S7 type `Byte` e.g. `3` for `DB4DBB3`
	- `0`: open
	- `1`: closed
- `set_TargetDoorState`: **(control support)** offset to write target state current state S7 type `Byte` e.g. `3` for `DB4DBB3`
	- `0`: open
	- `1`: closed

### <a name='PLC_SmokeSensor'></a>Smoke Sensor as `PLC_SmokeSensor`
Fire alarm

- `name`: unique name of the accessory
- `manufacturer`: **(optional)** description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: **(optional)** when set to `true` the current state will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval`: **(optional)** poll interval in seconds. Default value see platform definition.
- `get_SmokeDetected`: **(push support)** offset and bit to smoke detection. S7 type `Bool` e.g. `55.1` for `DB4DBX55.1`
	- `false`: ok
	- `true`: smoke detected
- `get_StatusTampered`: **(optional)** **(push support)** offset and bit to tamper detection. (Home app shows this only within the options) S7 type `Bool` e.g. `55.2` for `DB4DBX55.2`
	- `false`: ok
	- `true`: tampered
- `get_StatusLowBattery`: **(optional)** **(push support)** offset and bit to battery low detection. (Home app does not inform with push notification) S7 type `Bool` e.g. `55.3` for `DB4DBX55.3`
	- `false`: ok
	- `true`: battery low


## config.json Example
Note: The example is just an example it contains also some optional settings. For testing purposes all accessories are set to one DB.

	{
		"bridge": {
			"name": "Homebridge DEMO",
			"username": "0E:54:47:36:82:26",
			"port": 52609,
			"pin": "031-55-155"
		},
		"accessories": [],
		"platforms": [
			{
				"name": "Config",
				"port": 8080,
				"platform": "config"
			},
			{
				"platform": "PLC",
				"ip": "10.10.10.32",
				"rack": 0,
				"slot": 2,
				"enablePolling": true,
				"defaultPollInterval": 15,
				"distributePolling": true,
				"enablePush": true,
				"enableControl": true,
				"port": 8888,
				"accessories": [
					{
						"accessory": "PLC_LightBulb",
						"name": "LightBulb0",
						"manufacturer": "normal light bulb",
						"enablePolling": true,
						"db": 12,
						"get_On": 0.0,
						"set_On": 0.1,
						"set_Off": 0.2
					},
					{
						"accessory": "PLC_LightBulb",
						"name": "LightBulb1",
						"manufacturer": "with dim function",
						"enablePolling": true,
						"db": 12,
						"get_On": 2.0,
						"set_On": 2.1,
						"set_Off": 2.2,
						"get_Brightness": 1,
						"set_Brightness": 1
					},
					{
						"accessory": "PLC_LightBulb",
						"name": "LightBulb2",
						"manufacturer": "single bit for on/off",
						"enablePolling": true,
						"db": 12,
						"get_On": 2.3,
						"set_On": 2.3
					},
					{
						"accessory": "PLC_Outlet",
						"name": "Outlet",
						"enablePolling": true,
						"db": 12,
						"get_On": 2.4,
						"set_On": 2.5
					},
					{
						"accessory": "PLC_Switch",
						"name": "Switch",
						"enablePolling": true,
						"db": 12,
						"get_On": 2.6,
						"set_On": 2.7,
						"set_Off": 3.0
					},
					{
						"accessory": "PLC_TemperatureSensor",
						"name": "Temperature",
						"db": 12,
						"get_CurrentTemperature": 4,
						"enablePolling": true,
						"pollInterval": 60
					},
					{
						"accessory": "PLC_HumiditySensor",
						"name": "Humidity",
						"db": 12,
						"get_CurrentRelativeHumidity": 8,
						"enablePolling": true,
						"pollInterval": 120
					},
					{
						"accessory": "PLC_Thermostat",
						"name": "Thermostat",
						"manufacturer": "ground floor",
						"db": 12,
						"enablePolling": true,
						"get_CurrentTemperature": 12,
						"get_TargetTemperature": 16,
						"set_TargetTemperature": 16,
						"get_CurrentHeatingCoolingState": 20
					},
					{
						"accessory": "PLC_WindowCovering",
						"name": "Blind",
						"manufacturer": "ground floor",
						"db": 12,
						"invert": false,
						"adaptivePolling": true,
						"adaptivePollingInterval": 1,
						"enablePolling": true,
						"pollInterval": 180,
						"get_CurrentPosition": 21,
						"get_TargetPosition": 22,
						"set_TargetPosition": 1
					},
					{
						"accessory": "PLC_Window",
						"name": "Window",
						"manufacturer": "ground floor",
						"enablePolling": true,
						"pollInterval": 60,
						"db": 12,
						"get_CurrentPosition": 23,
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
						"db": 12,
						"get_CurrentPosition": 24,
						"mapGet": [
								0,
								100
						]
					},
					{
						"accessory": "PLC_OccupancySensor",
						"name": "Presence",
						"enablePolling": true,
						"db": 12,
						"get_OccupancyDetected": 25.0
					},
					{
						"accessory": "PLC_MotionSensor",
						"name": "Motion",
						"enablePolling": true,
						"db": 12,
						"get_MotionDetected": 25.1
					},
					{
						"accessory": "PLC_ContactSensor",
						"name": "ContactSensor",
						"enablePolling": true,
						"pollInterval": 5,
						"db": 12,
						"get_ContactSensorState": 25.2
					},
					{
						"accessory": "PLC_Faucet",
						"name": "Faucet",
						"enablePolling": true,
						"db": 12,
						"get_Active": 28.0,
						"set_Active": 28.0
					},
					{
						"accessory": "PLC_Valve",
						"name": "Valve",
						"db": 12,
						"enablePolling": true,
						"ValveType": 2,
						"get_Active": 28.1,
						"set_Active": 28.1,
						"get_SetDuration": 30,
						"set_SetDuration": 30,
						"get_RemainingDuration": 34
					},
					{
						"accessory": "PLC_SecuritySystem",
						"name": "SecuritySystem",
						"db": 12,
						"enablePolling": true,
						"pollInterval": 60,
						"get_SecuritySystemCurrentState": 26,
						"set_SecuritySystemTargetState": 27,
						"get_SecuritySystemTargetState": 27,
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
						"accessory": "PLC_StatelessProgrammableSwitch",
						"name": "Stateless Switch",
						"enablePolling": true,
						"pollInterval": 10,
						"db": 12,
						"isEvent": 29.2,
						"get_ProgrammableSwitchEvent": 38
					},
					{
						"accessory": "PLC_Doorbell",
						"name": "Doorbell",
						"enablePolling": true,
						"pollInterval": 10,
						"db": 12,
						"isEvent": 29.2,
						"get_ProgrammableSwitchEvent": 38
					},
					{
						"accessory": "PLC_LockMechanism",
						"name": "Lock",
						"db": 12,
						"enablePolling": true,
						"get_LockCurrentState": 39,
						"get_LockTargetState": 40,
						"set_LockTargetState": 40
					},
					{
						"accessory": "PLC_LockMechanismBool",
						"name": "LockBool",
						"db": 12,
						"enablePolling": true,
						"get_LockCurrentState": 41.0,
						"get_LockTargetState": 41.1,
						"set_LockTargetState": 41.1
					},
					{
						"accessory": "PLC_GarageDoorOpener",
						"name": "GarageDoor",
						"db": 12,
						"enablePolling": true,
						"get_ObstructionDetected": 41.2,
						"get_CurrentDoorState": 42,
						"get_TargetDoorState": 43,
						"set_TargetDoorState": 43,
					},
					{
						"accessory": "PLC_SmokeSensor",
						"name": "SmokeSensor",
						"db": 12,
						"enablePolling": true,
						"get_SmokeDetected": 44.0,
						"get_StatusTampered": 44.1,
						"get_StatusLowBattery": 44.2
					}
				]
			}
		]
	}

# Update of values
The home app does not regularly poll for updates of values. Only when switching rooms or close/open the app the actual values are requested.
This behavior is even the case when a AppleTV or HomePod is configured as control center.
There are three possible ways to workaround this.

1. That's ok for you
2. You enable the polling mode
3. You enable the push mode and instrument your PLC code to send the values

## <a name='poll'></a>Poll values form PLC by homebridge-PLC plugin
To enable this you have to set `"enablePolling": true;` platform level and on each individual accessory with individual interval in seconds `"enablePolling": true, "pollInterval": 10,`

Example to poll the contact sensor state every 10 seconds:

	{
		"platforms": [
				{
				"platform": "PLC",
				"ip": "10.10.10.32",
				"rack": 0,
				"slot": 2,
				"enablePolling": true,
				"accessories": [
					{
						"accessory": "PLC_ContactSensor",
						"name": "ContactSensor",
						"enablePolling": true,
						"pollInterval": 10,
						"db": 12,
						"get_ContactSensorState": 25.2
					}
				]
			}
		]
	}

## <a name='push'></a>Push values from PLC to homebridge-plc plugin

It possible to send updates of values directly from the plc to the homebridge-plc plugin. This is especially useful when you want notifications form your home app about open/close of doors or just a faster response e.g. with PLC_StatelessProgrammableSwitch.
To enable this you have to set `"enablePush": true,` platform level and optional the `port`.

The push takes place via an http request to the configured port with the keyword "push". In order to avoid that additional configurations to be shared between the PLC and the homebrige-plc-Plugin, the interface is kept very simple.
The interface that the PLC has to use consists only of the keyword 'push', the database number 'db', the address within the db 'offset' and the value 'value'. This allows to on the PLC to create a simple interface to push changed values to the homebridge-plc plugin e.g. I created a FC with just one input of type `ANY` to push all kind of values.

The value is assigned to all matching ('db' and 'offset') get_* accessory configurations. All information is transmitted within the URL and in decimal. Parameters that supports push are marked with [push] in the description.

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

The value '3' disarmed will be used for both for 'get_SecuritySystemCurrentState' as well as 'get_SecuritySystemTargetState'.

The Request has to be done as HTTP `PUT` or `GET` operation. There will be no logging when doing a `PUT` operation while there will be detailed output when during a `GET` operation. This in especially intended for testing with the browser as the browser performs a `GET` operation per default.

### Format
Example for float values when trigger from browser:

	http://homebridgeIp:8080/?push&db=3&offset=22&value=12.5

Example for bool values when trigger from browser

	http://homebridgeIp:8080/?push&db=5&offset=5.1&value=1

Example for byte values when trigger from browser

	http://homebridgeIp:8080/?push&db=2&offset=3&value=255

**NOTE:** Chrome/Edge does at minimum two requests with different parameters resulting in some error messages. I recommend `Talend API Tester - Free Edition`

# <a name='control'></a>Control of PLC accessories

It´s also possible to control PLC accessories via HTTP `PUT` or `GET` operation. This might be useful for integration into other automation systems.
To enable this you have to set `"enableControl": true,` platform level and optional the `port`.

**NOTE: It is currently not possible to query the current state**

The interface that the PLC operates consists only of the keyword 'control', the database number 'db', the address within the db 'offset' and the value 'value'.
The value is assigned to the matching ('db' and 'offset') set_* accessory configurations. All configurations that are supported  are marked with **(control support)** in the description.

For accessories with separate on/off configurations e.g. `PLC_LightBulb` `set_On`/`set_Off` the `set_On` or `PLC_LockMechanismBool` `set_Secured`/`set_Unsecured` the `set_Secured` has to be used. With `1` for on and `0` for off.

All information is transmitted within the URL and in decimal. 

**NOTE: Options like `invert`, `mapGet` and `mapSet` are not affecting the control interface. In example for PLC_Window is the value `0`: **closed** and `100`: **open** regardless if `invert` is set or not.

The Request has to be done as HTTP `PUT` or `GET` operation. There will be no logging when doing a `PUT` operation while there will be detailed output when during a `GET` operation. This in especially intended for testing with the browser as the browser performs a `GET` operation per default.

### Format
Example to switch a light bulb from browser. Lets say the light bulb has the following config:

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

Use this to switch the light bulb on from browser:

	http://homebridgeIp:8080/?control&db=6096&offset=1.1&value=1

Use this to switch the light bulb off from browser:

	http://homebridgeIp:8080/?control&db=6096&offset=1.1&value=0

**NOTE:** Chrome/Edge does at minimum two requests with different parameters resulting in some error messages. I recommend `Talend API Tester - Free Edition`

# Test & Release

## Local test
The easiest is to open the terminal from homebridge delete the `index.js` file of this plugin, open nano and past in the new content.
Afterwards the Homebridge can be restarted.
The delete and open of hte index.js file can be done by the following command line.

`rm node_modules/homebridge-plc/index.js && nano node_modules/homebridge-plc/index.js`

## Publish npm package

`npm publish --access public`

