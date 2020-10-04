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
- in the platform, you can declare different types of accessories currently supported:
    - `S7_LightBulb`: normal light
        - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
        - `get_State`: offset and bit set get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`        
        - `set_On`: offset and bit set to 1 when switching on S7 type `Bool` PLC has to thet to 0 e.g. `55.1` for `DB4DBX55.1`
        - `set_On`: offset and bit set to 1 when switching off S7 type `Bool` PLC has to thet to 0e.g. `55.2` for `DB4DBX55.2`   
        - `get_Brightness`: (optional) get brightness value S7 type `Byte` e.g. `56` for `DB4DBB56`    
        - `set_Brightness`: (optional but reqired when `get_Brightness` is defined) set brightness value S7 type `Byte` e.g. `57` for `DB4DBB57`    
	- `S7_Outlet`: outlet, ventilator or light
        - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
        - `get_State`: offset and bit set get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`        
        - `set_On`: offset and bit set to 1 when switching on S7 type `Bool` PLC has to thet to 0 e.g. `55.1` for `DB4DBX55.1`
        - `set_On`: offset and bit set to 1 when switching off S7 type `Bool` PLC has to thet to 0e.g. `55.2` for `DB4DBX55.2`   
	- `S7_TemperatureSensor`: temerature sensor
	    - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
        - `get_CurrentTemperature`: offset to get current temperature S7 type `Real` e.g. `55` for `DB4DBD55`  
	- `S7_HumiditySensor`: humidity sensor 
	    - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
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
	- `S7_Thermostat`: temerature sensor and temperature regulation
	    - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
        - `get_CurrentTemperature`: offset to get current humidity S7 type `Real` e.g. `55` for `DB4DBD55`  
        - S7 type `Byte` e.g. `56` for `DB4DBB56`  
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
        - `set_HoldPosition`: (optional): offset and bit set to 1 to stop movement. (Seems not to be used) when not defined writes will be ignoredS7 type `Bool` PLC has to thet to 0 e.g. `55.1` for `DB4DBX55.1`
	- `S7_Window`: see S7_WindowCovering
	- `S7_OccupancySensor`: precence sensor
	    - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
        - `get_OccupancyDetected`: offset and bit set get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`        
	- `S7_MotionSensor`: movement sensor
	    - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
        - `get_MotionDetected`: offset and bit set get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`        
	- `S7_Faucet`: watering for the garden
	    - `name`: unique name of the accessory 
        - `manufacturer`: (optional) decription
        - `db`: s7 data base number e.g. `4` for `DB4`
        - `get_State`: offset and bit set get the current status S7 type `Bool` e.g. `55.0` for `DB4DBX55.0`        
        - `set_On`: offset and bit set to 1 when switching on S7 type `Bool` PLC has to thet to 0 e.g. `55.1` for `DB4DBX55.1`
        - `set_On`: offset and bit set to 1 when switching off S7 type `Bool` PLC has to thet to 0e.g. `55.2` for `DB4DBX55.2`   
    


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
                    "manufacturer": "some comment",
                    "db": 6061,
                    "set_On": 1.1,
                    "set_Off": 1.0,
                    "get_State": 0.0
                },
                {
                    "accessory": "S7_LightBulb",
                    "name": "myNextRoom",
                    "manufacturer": "some comment",
                    "db": 6062,
                    "set_On": 2.1,
                    "set_Off": 2.2,
                    "get_State": 2.3,
                    "get_Brightness": 4,
                    "set_Brightness": 4
                },
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
                    "set_On": 1.1,
                    "set_Off": 1.0,
                    "get_State": 0.0
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
                }   
            ]
        }
        ]
    }
