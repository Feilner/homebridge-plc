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


## Installation

- Basic Installation
  - Install this plugin using: `npm install -g homebridge-plc`
  - Edit `config.json` to add the plc platform and its accessories.
  - Run Homebridge

- Install via Homebridge Web UI 
  - Search for `s7` on the plugin screen of [config-ui-x](https://github.com/oznu/homebridge-config-ui-x) .
  - Find `homebridge-plc`
  - Click install.
  - Edit configuration

## Homebridge configuration

- The plugin support the connection fo one PLC by defining a `S7` platform.
  - `ip`: the IPv4 address of the PLC
  - `rack`: the rack number of the PLC typically 0
  - `slot`: the slot number of the PLC for S7 300/400 typically `2`, for 1200/1500 typically `1` 
  
- In the platform, you can declare different types of accessories currently supported:
    - `S7_LightBulb`: normal light
        - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
        - `get_On`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`        
        - Single Bit for on/off:
          - `set_On`: offset and bit set to 1/0 when switching on/off S7 type `Bool` PLC  e.g. `55.0` for `DB4DBX55.0` could be same as get_On
        - Seperate Bits for on/off:
          - `set_On`: offset and bit set to 1 when switching on S7 type `Bool` PLC has to set to 0 e.g. `55.1` for `DB4DBX55.1`
          - `set_Off`: offset and bit set to 1 when switching off S7 type `Bool` PLC has to set to 0 e.g. `55.2` for `DB4DBX55.2`   
        - `get_Brightness`: (optional) get brightness value S7 type `Byte` e.g. `56` for `DB4DBB56`    
        - `set_Brightness`: (optional but reqired when `get_Brightness` is defined) set brightness value S7 type `Byte` e.g. `57` for `DB4DBB57`    

	- `S7_Outlet`: outlet possible to show also as ventilator or light
        - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
        - `get_On`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`        
        - Single Bit for on/off:
          - `set_On`: offset and bit set to 1/0 when switching on/off S7 type `Bool` PLC  e.g. `55.0` for `DB4DBX55.0` could be same as get_On
        - Seperate Bits for on/off:
          - `set_On`: offset and bit set to 1 when switching on S7 type `Bool` PLC has to set to 0 e.g. `55.1` for `DB4DBX55.1`
          - `set_Off`: offset and bit set to 1 when switching off S7 type `Bool` PLC has to set to 0 e.g. `55.2` for `DB4DBX55.2` 

	- `S7_Switch`: switch possible to show also as ventilator or light
        - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
        - `get_On`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`        
        - Single Bit for on/off:
          - `set_On`: offset and bit set to 1/0 when switching on/off S7 type `Bool` PLC  e.g. `55.0` for `DB4DBX55.0` could be same as get_On
        - Seperate Bits for on/off:
          - `set_On`: offset and bit set to 1 when switching on S7 type `Bool` PLC has to set to 0 e.g. `55.1` for `DB4DBX55.1`
          - `set_Off`: offset and bit set to 1 when switching off S7 type `Bool` PLC has to set to 0 e.g. `55.2` for `DB4DBX55.2` 

	- `S7_TemperatureSensor`: temerature sensor
	    - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
        - `get_CurrentTemperature`: offset to get current temperature S7 type `Real` e.g. `55` for `DB4DBD55`  

	- `S7_HumiditySensor`: humidity sensor 
	    - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
        - `CurrentRelativeHumidity`: offset to get current humidity S7 type `Real` e.g. `55` for `DB4DBD55` 

	- `S7_Thermostat`: temerature sensor and temperature regulation
	    - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
        - `get_CurrentTemperature`: offset to get current humidity S7 type `Real` e.g. `55` for `DB4DBD55`  
        - S7 type `Byte` e.g. `56` for `DB4DBB56`  
        - `get_CurrentTemperature`: offset to get current temperature S7 type `Real` e.g. `0` for `DB4DBD0`  
        - `get_TargetTemperature`: offset to get target temperature S7 type `Real` e.g. `4` for `DB4DBD4`  
        - `set_TargetTemperature`: offset to set current temperature S7 type `Real` e.g. `4` for `DB4DBD4` (can have same value as get_TargetTemperature)
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

	- `S7_WindowCovering`: windows and window blinds 
	    - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
        - `invert`: set to 1 to inverts the meanings of the values from `0:closed 100:open` to `100:closed 0:open`
        - `get_CurrentPosition`: offset to get current position S7 type `Byte` e.g. `0` for `DB4DBB0`  
        - `get_TargetPosition`: (optional for windows) offset to get target position S7 type `Byte` e.g. `1` for `DB4DBB1`  
        - `set_TargetPosition`: (optional for windows) offset to set current position S7 type `Byte` e.g. `2` for `DB4DBB2` (can have same value as set_TargetPosition)
        - `get_PositionState`: (optional) offset to current movement state if not defined fixed `2`is returned S7 type `Byte` e.g. `3` for `DB4DBB3`    
          - `0`: down
          - `1`: up
          - `2`: stop
        - `set_HoldPosition`: (optional): offset and bit set to 1 to stop movement. (Seems not to be used) when not defined writes will be ignoredS7 type `Bool` PLC has to set to 0 e.g. `55.1` for `DB4DBX55.1`

	- `S7_Window`: see S7_WindowCovering

	- `S7_OccupancySensor`: precence sensor
	    - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
        - `get_OccupancyDetected`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`        

	- `S7_MotionSensor`: movement sensor
	    - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
        - `get_MotionDetected`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`        

	- `S7_Faucet`: watering for the garden 
	    - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
        - `get_Active`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`        
        - Single Bit for on/off:
          - `set_Active`: offset and bit set to 1/0 when switching on/off S7 type `Bool` PLC  e.g. `55.0` for `DB4DBX55.0` could be same as get_Active
        - Seperate Bits for on/off:
          - `set_Active`: offset and bit set to 1 when switching on S7 type `Bool` PLC has to set to 0 e.g. `55.1` for `DB4DBX55.1`
          - `set_Deactive`: offset and bit set to 1 when switching off S7 type `Bool` PLC has to set to 0 e.g. `55.2` for `DB4DBX55.2` 
      
    -  `S7_SecuritySystem`: alarm system
	    - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
        - `get_SecuritySystemCurrentState`: offset to current security system state S7 type `Byte` e.g. `3` for `DB4DBB3`    
          - `0`: armed stay at home
          - `1`: armed away from home
          - `2`: armed night 
          - `3`: disarmed
          - `4`: alarm driggered
        - `set_SecuritySystemTargetState`: offset to set target security system state S7 type `Byte` e.g. `5` for `DB4DBB4`      
        - `get_SecuritySystemTargetState`: offset to set target security system state S7 type `Byte` e.g. `6` for `DB4DBB6`
          - `0`: armed stay at home
          - `1`: armed away from home
          - `2`: armed night 
          - `3`: disarmed
    
    - `S7_Valve`: valve configurable as generic valve, irrigation, shower head or water faucet
	    - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
        - `ValveType` configures the valve type that is returend
          - `0`: generic valve
          - `1`: irrigation
          - `2`: shower head 
          - `3`: water faucet
        - `get_Active`: offset and bit get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`        
        - Single Bit for on/off:
          - `set_Active`: offset and bit set to 1/0 when switching on/off S7 type `Bool` PLC  e.g. `55.0` for `DB4DBX55.0` could be same as get_Active
        - Seperate Bits for on/off:
          - `set_Active`: offset and bit set to 1 when switching on S7 type `Bool` PLC has to set to 0 e.g. `55.1` for `DB4DBX55.1`
          - `set_Deactive`: offset and bit set to 1 when switching off S7 type `Bool` PLC has to set to 0 e.g. `55.2` for `DB4DBX55.2` 
        - in can be fixed or dynamic together with active the device is shown in the home app as
          - Mapping table:
            - Active: 0  InUse: 0 -> off
            - Active: 0  InUse: 1 -> stopping
            - Active: 1  InUse: 0 -> idle
            - Active: 1  InUse: 1 -> running
          - inUse fixed
            - `InUse`: fixed value `0` or `1`
          - inUse dynamic
            - `get_InUse`: offset and bit get the current inUse state S7 type `Bool` PLC has to set to 0 e.g. `55.1` for `DB4DBX55.1`
        - if one of the (optional) duration settings need specified all are needed
          - `get_SetDuration`: (optional) duration towards homekit limit to 0..3600s ec S7 type `Time` e.g. `10` for `DB4DBD10`
          - `set_SetDuration`: (optional) duration towards homekit limit to 0..3600s ec S7 type `Time` e.g. `14` for `DB4DBD14`
          - `get_RemainingDuration`: (optional) duration towards homekit limit to 0..3600s ec S7 type `Time` e.g. `18` for `DB4DBD18`


    - `S7_StatelessProgrammableSwitch`: stateless switch from PLC to HomeKit to trigger actions in homekit only works with contol center e.g. AppleTV (Thus not yet tested)
	    - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
        - `get_ProgrammableSwitchEvent`: offset to red current state of the switch S7 type `Byte` e.g. `3` for `DB4DBB3`  
          - `0`: single press
          - `1`: double press
          - `2`: long press
          - I have no idea what to send when there was no press!?



#### Config.json Example
    {
        "platforms": [
            {
            "platform": "S7",
            "ip": "10.10.10.32",
            "rack": 0,
            "slot": 2,
            "accessories": [
                {
                    "accessory": "S7_LightBulb",
                    "name": "myRoom",
                    "manufacturer": "normal light bulb",
                    "db": 6061,
                    "get_On": 0.0
                    "set_On": 1.1,
                    "set_Off": 1.0,
                },
                {
                    "accessory": "S7_LightBulb",
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
                    "accessory": "S7_LightBulb",
                    "name": "someOther",
                    "manufacturer": "single bit for on/off",
                    "db": 6094,
                    "get_On": 1.1,
                    "set_On": 1.1
                },
                {
                    "accessory": "S7_Faucet",
                    "name": "Garden",
                    "db": 6096,
                    "get_Active": 0.0
                    "set_Active": 1.1,
                    "set_Deactive": 1.0,
                }                
                {
                    "accessory": "S7_OccupancySensor",
                    "name": "Precence",
                    "db": 6510,
                    "get_OccupancyDetected": 24
                },
                {
                    "accessory": "S7_Outlet",
                    "name": "myOutlet",
                    "db": 6107,
                    "get_On": 0.0,
                    "set_On": 1.1,
                    "set_Off": 1.0
                },
                {
                    "accessory": "S7_HumiditySensor",
                    "name": "Outside %",
                    "manufacturer": "roof",
                    "db": 1901,
                    "get_CurrentRelativeHumidity": 16
                },
                {
                    "accessory": "S7_Thermostat",
                    "name": "myRoom °C",
                    "manufacturer": "ground floor",
                    "db": 6601,
                    "get_CurrentTemperature": 0,
                    "get_TargetTemperature": 4,
                    "set_TargetTemperature": 12,
                    "get_CurrentHeaterCoolerState": 10
                },             
                {
                    "accessory": "S7_WindowCovering",
                    "name": "myRoom Blind",
                    "manufacturer": "ground floor",
                    "db": 2602,
                    "invert": 1,
                    "get_CurrentPosition": 0,
                    "get_TargetPosition": 1,
                    "set_TargetPosition": 1,
                    "get_PositionState": 2,
                    "set_HoldPosition": 10.4
                },
                {
                    "accessory": "S7_StatelessProgrammableSwitch",
                    "name": "test ",
                    "manufacturer": "DG",
                    "db": 2,
                    "get_SecuritySystemCurrentState": 0,
                    "set_SecuritySystemTargetState": 1,
                    "get_SecuritySystemTargetState": 1
                },

                {
                    /* Not yet tested */
                    "accessory": "S7_StatelessProgrammableSwitch",
                    "name": "NotYetTested",
                    "db": 2,
                    "get_ProgrammableSwitchEvent": 0
                }                   
            ]
        }
        ]
    }
