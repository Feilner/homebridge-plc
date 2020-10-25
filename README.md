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
- Tested with S7-300 compatible PLC
- Implementation is based on documentation of the [Homebridge API](https://developers.homebridge.io) 


# Installation

- Basic Installation
  - Install this plugin using: `npm install -g homebridge-plc`
  - Edit `config.json` to add the plc platform and its accessories.
  - Run Homebridge

- Install via Homebridge Web UI 
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
  

## Accessories
- In the platform, you can declare different types of accessories currently supported:
### LightBulb as `PLC_LightBulb`
normal light
- `name`: unique name of the accessory 
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
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

### Outlet as `PLC_Outlet`
outlet possible to show also as ventilator or light
- `name`: unique name of the accessory 
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `get_On`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`        
- Single Bit for on/off:
    - `set_On`: offset and bit set to 1/0 when switching on/off S7 type `Bool` PLC  e.g. `55.0` for `DB4DBX55.0` could be same as get_On
- Separate Bits for on/off:
    - `set_On`: offset and bit set to 1 when switching on S7 type `Bool` PLC has to set to 0 e.g. `55.1` for `DB4DBX55.1`
    - `set_Off`: offset and bit set to 1 when switching off S7 type `Bool` PLC has to set to 0 e.g. `55.2` for `DB4DBX55.2` 

### Switch as `PLC_Switch`
 switch possible to show also as ventilator or light
- `name`: unique name of the accessory 
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `get_On`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`        
- Single Bit for on/off:
    - `set_On`: offset and bit set to 1/0 when switching on/off S7 type `Bool` PLC  e.g. `55.0` for `DB4DBX55.0` could be same as get_On
- Separate Bits for on/off:
    - `set_On`: offset and bit set to 1 when switching on S7 type `Bool` PLC has to set to 0 e.g. `55.1` for `DB4DBX55.1`
    - `set_Off`: offset and bit set to 1 when switching off S7 type `Bool` PLC has to set to 0 e.g. `55.2` for `DB4DBX55.2` 

### Temperature Sensor as `PLC_TemperatureSensor`: 
normal temperature sensor
- `name`: unique name of the accessory 
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `get_CurrentTemperature`: offset to get current temperature S7 type `Real` e.g. `55` for `DB4DBD55`  
- temperature range (optional)
  - `minValue` default value: -50
  - `maxValue` default value: 50
  - `minStep` default value: 0.5 

### Humidity Sensor as `PLC_HumiditySensor`: 
normal humidity sensor 
- `name`: unique name of the accessory 
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `get_CurrentRelativeHumidity`: offset to get current humidity S7 type `Real` e.g. `55` for `DB4DBD55` 
- humidity range (optional)
  - `minValue` default value: 0
  - `maxValue` default value: 100
  - `minStep` default value: 1 


### Thermostat as `PLC_Thermostat`
temperature sensor and temperature regulation
- `name`: unique name of the accessory 
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
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
- `get_TargetHeatingCoolingState` not yet supported returns fixes `3`
    - `0`: off
    - `1`: heat
    - `2`: cool
    - `3`: automatic
- `set_TargetHeatingCoolingState` not yet supported writes are ignored


### Shutters as `PLC_WindowCovering`, windows as `PLC_Window` and doors as `PLC_Door`
shutters or blinds as well sensors for windows and doors
- `name`: unique name of the accessory 
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `invert`: (optional) set to `true` to inverts the meanings of the values from `0:closed 100:open` to `100:closed 0:open`
- `mapGet`: (optional) define mapping array for get position. The PLC value is used as index into the table. e.g. `[0, 25, 100]` which maps the PLC value `0->0 1->25 2->100` this this is useful e.g. for window open state.
- `adaptivePolling`:  (optional) hen set to `true` the current position will be polled until target position is reached. Polling starts with set target position from home app. This will show the shutter as opening... or closing... in the home app. Otherwise the new target position is directly pushed as new current position.
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

### Occupancy Sensor as `PLC_OccupancySensor`
presence detection sensor
- `name`: unique name of the accessory 
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: (optional) when set to `true` the current state o will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `get_OccupancyDetected`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`        
    - `false`: no occupancy
    - `true`: occupancy detected    

### Motion Sensor as `PLC_MotionSensor`
movement detection sensor
- `name`: unique name of the accessory 
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: (optional) when set to `true` the current state o will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `get_MotionDetected`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`     
    - `false`: no motion
    - `true`: motion detected    

### Motion Sensor as `PLC_ContactSensor`
contact sensor
- `name`: unique name of the accessory 
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: (optional) when set to `true` the current state o will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `get_ContactSensorState`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`     
    - `false`: closed
    - `true`: open

### Faucet as `PLC_Faucet`
watering for the garden 
- `name`: unique name of the accessory 
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `get_Active`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`        
- Single Bit for on/off:
    - `set_Active`: offset and bit set to 1/0 when switching on/off S7 type `Bool` PLC  e.g. `55.0` for `DB4DBX55.0` could be same as get_Active
- Separate Bits for on/off:
    - `set_Active`: offset and bit set to 1 when switching on S7 type `Bool` PLC has to set to 0 e.g. `55.1` for `DB4DBX55.1`
    - `set_Deactivate`: offset and bit set to 1 when switching off S7 type `Bool` PLC has to set to 0 e.g. `55.2` for `DB4DBX55.2` 

###  Security System as `PLC_SecuritySystem`:
alarm system
- `name`: unique name of the accessory 
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
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
- `enablePolling`: (optional) when set to `true` the current state of the security system will be polled. When disabled a set of the target system state. will trigger a single get of the target and current state.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `mapGet`: (optional) define mapping array for get security system state. The PLC value is used as index into the table. e.g. `[3, 1]` which maps the PLC value `0->3 1->2` when the PLC supports only two states with `0:disarmed` and `1:armed` and `2:alarm`.
- `mapSet`: (optional) define mapping array for set security system state. The home app value is used as index into the table. e.g. `[1, 1, 1, 0, 2]` which maps the PLC value `0->1 1->1 2->1, 3->0, 4->2` when the PLC supports only two states with `0:disarmed` and `1:armed` and `2:alarm`.

### Valve as `PLC_Valve`
valve configurable as generic valve, irrigation, shower head or water faucet
- `name`: unique name of the accessory 
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
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

### Button as `PLC_StatelessProgrammableSwitch`
stateless switch from PLC to home app. Trigger actions in home app only works with control center e.g. AppleTV or HomePod. 
It will works only in polling mode! The PLC sets a bit that is regularly polled by homebridge after successful reading a 1 of the event the bit it will report the event and set the bit to 0. Change 0->1 is done by PLC change from 1->0 is done by homebridge!
- `name`: unique name of the accessory 
- `manufacturer`: (optional) description
- `db`: s7 data base number e.g. `4` for `DB4`
- `enablePolling`: (optional) when set to `true` the current state o will be polled. It is mandatory as well to enable polling mode on platform level.
- `pollInterval` (optional) poll interval in seconds. Default value is `10` seconds.
- `isEvent` offset and bit that is polled when set to 1 by the PLC the event is read and the bit is set to 0 by homebridge S7 type `Bool` PLC has to set to 0 e.g. `55.1` for `DB4DBX55.1`
- `get_ProgrammableSwitchEvent`: offset to red current event of the switch. This is reported towards home app S7 type `Byte` e.g. `3` for `DB4DBB3` 
    - `0`: single press
    - `1`: double press
    - `2`: long press
### Lock mechanism as `PLC_LockMechanism` (experimental)
Lock mechanism (not yet clear how to use changes are welcome)
  - `name`: unique name of the accessory 
  - `manufacturer`: (optional) description
  - `db`: s7 data base number e.g. `4` for `DB4`
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
### Lock mechanism as `PLC_GarageDoorOpener` (experimental)
Lock mechanism (not yet clear how to use changes are welcome)
  - `name`: unique name of the accessory 
  - `manufacturer`: (optional) description
  - `db`: s7 data base number e.g. `4` for `DB4`
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
  - `get_LockTargetState`: offset to read target state current state S7 type `Byte` e.g. `3` for `DB4DBB3` 
    - `0`: unsecured
    - `1`: secured
  - `set_LockTargetState`:  offset to write target state current state S7 type `Byte` e.g. `3` for `DB4DBB3` 
    - `0`: unsecured
    - `1`: secured


#### Config.json Example
Note: The example is just an example it contains also some optional settings

    {
        "platforms": [
            {
            "platform": "PLC",
            "ip": "10.10.10.32",
            "rack": 0,
            "slot": 2,
            "enablePolling": true;
            "accessories": [
                {
                    "accessory": "PLC_LightBulb",
                    "name": "myRoom",
                    "manufacturer": "normal light bulb",
                    "db": 6061,
                    "get_On": 0.0
                    "set_On": 1.1,
                    "set_Off": 1.0,
                },
                {
                    "accessory": "PLC_LightBulb",
                    "name": "myNextRoom",
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
                    "name": "someOther",
                    "manufacturer": "single bit for on/off",
                    "db": 6094,
                    "get_On": 1.1,
                    "set_On": 1.1
                },
                {
                    "accessory": "PLC_Faucet",
                    "name": "Garden",
                    "db": 6096,
                    "get_Active": 0.0
                    "set_Active": 1.1,
                    "set_Deactivate": 1.0,
                }                
                {
                    "accessory": "PLC_OccupancySensor",
                    "name": "Presence",
                    "db": 6510,
                    "get_OccupancyDetected": 24
                },
                {
                    "accessory": "PLC_Outlet",
                    "name": "myOutlet",
                    "db": 6107,
                    "get_On": 0.0,
                    "set_On": 1.1,
                    "set_Off": 1.0
                },
                {
                    "accessory": "PLC_HumiditySensor",
                    "name": "Outside %",
                    "manufacturer": "roof",
                    "db": 1901,
                    "get_CurrentRelativeHumidity": 16
                },
                {
                    "accessory": "PLC_Thermostat",
                    "name": "myRoom °C",
                    "manufacturer": "ground floor",
                    "db": 6601,
                    "get_CurrentTemperature": 0,
                    "get_TargetTemperature": 4,
                    "set_TargetTemperature": 12,
                    "get_CurrentHeaterCoolerState": 10
                },             
                {
                    "accessory": "PLC_WindowCovering",
                    "name": "myRoom Blind",
                    "manufacturer": "ground floor",
                    "db": 2602,
                    "invert": true,
                    "adaptivePolling": true,
                    "adaptivePollingInterval" 1,
                    "enablePolling" : true,
                    "pollInterval" : 180,                    
                    "get_CurrentPosition": 0,
                    "get_TargetPosition": 1,
                    "set_TargetPosition": 1,
                    "get_PositionState": 2,
                    "set_HoldPosition": 10.4
                },
                {
                    "accessory": "PLC_Window",
                    "name": "Window",
                    "manufacturer": "ground floor",
                    "enablePolling" : true,
                    "pollInterval" : 60,                    
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
                    "enablePolling" : true,
                    "pollInterval" : 10,
                    "db": 2008,
                    "get_CurrentPosition": 49,
                    "mapGet": [
                        0,
                        100
                    ]
                },                       
                {
                    "accessory": "PLC_ContactSensor",
                    "name": "ContactSensor Test",
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
                    "accessory": "PLC_StatelessProgrammableSwitch",
                    "name": "Switch in the PLC",
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
        }
        ]
    }
