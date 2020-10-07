/*
 * (c) 2020 Feilner
 */
 
var PlatformAccessory, Service, Characteristic, UUIDGen;
var snap7 = require('node-snap7');

//Exports
module.exports = function(homebridge) {
  var platformName = 'homebridge-s7-plc';
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  UUIDGen = homebridge.hap.uuid;
  PlatformAccessory = homebridge.platformAccessory;
  homebridge.registerPlatform(platformName, 'S7', S7Platform);
}

function S7Platform(log, config) {
    this.log = log;
    this.config = config;
    this.S7Client = new snap7.S7Client();
    this.isConnectOngoing = false;
    this.S7ClientConnect();
}

S7Platform.prototype = {    
    accessories: function(callback) {
        var log = this.log;
        var s7PlatformAccessories = [];
        log("Add S7 accessories...");
        //create accessory for each configuration
        this.config.accessories.forEach((config, index) => {
            log("[" + String(index+1) + "/" + this.config.accessories.length + "] " + config.name + " (" +  config.accessory + ")" );
            //call accessory construction
            var accessory = new GenericS7(this, config);
            s7PlatformAccessories.push(accessory);
        });
        callback(s7PlatformAccessories);
    },
    

    //PLC connection check function
    S7ClientConnect: function() {
        var log = this.log;
        var S7Client = this.S7Client;
        var ip = this.config.ip;
        var rack = this.config.rack;
        var slot = this.config.slot;
        var rv = false;

        if (S7Client.Connected()) {
          rv = true;
        }
        else {         
            log("Connecting to %s (%s:%s)", ip, rack, slot);

            if (!this.isConnectOngoing == true) {
              this.isConnectOngoing = true;
                //PLC connection asynchonousely...
                var ok = S7Client.ConnectTo(ip, rack, slot);
                this.isConnectOngoing = false;
                if(ok) {
                  log("Connected to %s (%s:%s)", ip, rack, slot);
                  rv = true;
                }
                else {
                  log.error("Connection to %s (%s:%s) failed", ip, rack, slot);
                }
            }
        }
      
        return rv;
    }
}






function GenericS7(platform, config) {
  this.platform = platform;
  this.log = platform.log;
  this.name = config.name;
  this.buf = Buffer.alloc(4);
  var uuid = UUIDGen.generate(config.name + config.accessory);
  this.accessory = new PlatformAccessory(this.name, uuid); 
  ////////////////////////////////////////////////////////////////
  // Lightbulb
  ////////////////////////////////////////////////////////////////
  if (config.accessory == 'S7_LightBulb') {   
    this.service =  new Service.Lightbulb(this.name);
    this.accessory.addService(this.service);

    if ('set_Off' in config) {      
      this.service.getCharacteristic(Characteristic.On)
        .on('get', function(callback) {this.getBit(callback, 
          config.db, 
          Math.floor(config.get_On), Math.floor((config.get_On*10)%10),
          'get On'
        )}.bind(this))
        .on('set', function(powerOn, callback) { this.setOnOffBit(powerOn, callback, 
          config.db, 
          Math.floor(config.set_On), Math.floor((config.set_On*10)%10),
          Math.floor(config.set_Off), Math.floor((config.set_Off*10)%10),
          'set On'
        )}.bind(this));
    } else {
      this.service.getCharacteristic(Characteristic.On)
        .on('get', function(callback) {this.getBit(callback, 
          config.db, 
          Math.floor(config.get_On), Math.floor((config.get_On*10)%10),
          'get On'
        )}.bind(this))
        .on('set', function(powerOn, callback) { this.setBit(powerOn, callback, 
          config.db, 
          Math.floor(config.set_On), Math.floor((config.set_On*10)%10),
          'set On'
        )}.bind(this));
    }

    if ('get_Brightness' in config) {
      this.service.getCharacteristic(Characteristic.Brightness)
      .on('get', function(callback) {this.getReal(callback, 
        config.db, 
        config.get_Brightness,
        'get Brightness'
        )}.bind(this))
      .on('set', function(value, callback) {this.setReal(value, callback, 
        config.db, 
        config.set_Brightness,
        'set Brightness'
        )}.bind(this))
        .setProps({
          minValue: 20,
          maxValue: 100,
          minStep: 1
      });        
    }    
  }

  ////////////////////////////////////////////////////////////////
  // Outlet
  ////////////////////////////////////////////////////////////////    
  else if (config.accessory == 'S7_Outlet') {   
    this.service =  new Service.Outlet(this.name);
    this.accessory.addService(this.service);

    if ('set_Off' in config) {      
      this.service.getCharacteristic(Characteristic.On)
        .on('get', function(callback) {this.getBit(callback, 
          config.db, 
          Math.floor(config.get_On), Math.floor((config.get_On*10)%10),
          'get On'
        )}.bind(this))
        .on('set', function(powerOn, callback) { this.setOnOffBit(powerOn, callback, 
          config.db, 
          Math.floor(config.set_On), Math.floor((config.set_On*10)%10),
          Math.floor(config.set_Off), Math.floor((config.set_Off*10)%10),
          'set On'
        )}.bind(this));
    } else {
      this.service.getCharacteristic(Characteristic.On)
        .on('get', function(callback) {this.getBit(callback, 
          config.db, 
          Math.floor(config.get_On), Math.floor((config.get_On*10)%10),
          'get On'
        )}.bind(this))
        .on('set', function(powerOn, callback) { this.setBit(powerOn, callback, 
          config.db, 
          Math.floor(config.set_On), Math.floor((config.set_On*10)%10),
          'set On'
        )}.bind(this));
    }
  }


  ////////////////////////////////////////////////////////////////
  // Switch
  ////////////////////////////////////////////////////////////////    
  else if (config.accessory == 'S7_Switch') {   
    this.service =  new Service.Switch(this.name);
    this.accessory.addService(this.service);

    if ('set_Off' in config) {      
      this.service.getCharacteristic(Characteristic.On)
        .on('get', function(callback) {this.getBit(callback, 
          config.db, 
          Math.floor(config.get_On), Math.floor((config.get_On*10)%10),
          'get On'
        )}.bind(this))
        .on('set', function(powerOn, callback) { this.setOnOffBit(powerOn, callback, 
          config.db, 
          Math.floor(config.set_On), Math.floor((config.set_On*10)%10),
          Math.floor(config.set_Off), Math.floor((config.set_Off*10)%10),
          'set On'
        )}.bind(this));
    } else {
      this.service.getCharacteristic(Characteristic.On)
        .on('get', function(callback) {this.getBit(callback, 
          config.db, 
          Math.floor(config.get_On), Math.floor((config.get_On*10)%10),
          'get On'
        )}.bind(this))
        .on('set', function(powerOn, callback) { this.setBit(powerOn, callback, 
          config.db, 
          Math.floor(config.set_On), Math.floor((config.set_On*10)%10),
          'set On'
        )}.bind(this));
    }
  }

  ////////////////////////////////////////////////////////////////
  // TemperatureSensor
  //////////////////////////////////////////////////////////////// 
  else if (config.accessory == 'S7_TemperatureSensor') {   
    this.service =  new Service.TemperatureSensor(this.name);
    this.accessory.addService(this.service);

    this.service.getCharacteristic(Characteristic.CurrentTemperature)
    .on('get', function(callback) {this.getReal(callback, 
      config.db, 
      config.get_CurrentTemperature,
      'get CurrentTemperature'
      )}.bind(this))
    .setProps({
      minValue: -50,
      maxValue: 50,
      minStep: 0.1    
    });
  }

  ////////////////////////////////////////////////////////////////
  // HumiditySensor
  //////////////////////////////////////////////////////////////// 
  else if (config.accessory == 'S7_HumiditySensor') {   
    this.service =  new Service.HumiditySensor(this.name);
    this.accessory.addService(this.service);

    this.service.getCharacteristic(Characteristic.CurrentRelativeHumidity)
    .on('get', function(callback) {this.getReal(callback, 
      config.db, 
      config.get_CurrentRelativeHumidity,
      'get CurrentRelativeHumidity'
      )}.bind(this))
    .setProps({
      minValue: 0,
      maxValue: 100,
      minStep: 1    
    });
  }

  ////////////////////////////////////////////////////////////////
  // Thermostat
  ////////////////////////////////////////////////////////////////  
  else if (config.accessory == 'S7_Thermostat'){
    this.service = new Service.Thermostat(this.name);
    this.accessory.addService(this.service);

    if ('get_CurrentHeaterCoolerState' in config) {
      this.service.getCharacteristic(Characteristic.CurrentHeatingCoolingState)
      .on('get', function(callback) {this.getByte(callback,
        config.db, 
        config.get_CurrentHeaterCoolerState,
        'get CurrentHeatingCoolingState'
        )}.bind(this));
    }
    else
    {
      this.service.getCharacteristic(Characteristic.CurrentHeatingCoolingState)
      .on('get', function(callback) {this.getDummy(callback,
        1, // currently return fixed value inactive=0, idle=1, heating=2, cooling=3
        'get CurrentHeatingCoolingState'
        )}.bind(this));
    }
  this.service.getCharacteristic(Characteristic.TargetHeatingCoolingState)
  .on('get', function(callback) {this.getDummy(callback,
    3, // currently return fixed value off=0, heat=1, cool=2, automatic=3
    'get TargetHeatingCoolingState'
    )}.bind(this))
  .on('set', function(value, callback) {this.setDummy(value, callback, 
    'set TargetHeatingCoolingState'
    )}.bind(this));  

    this.service.getCharacteristic(Characteristic.TemperatureDisplayUnits)
    .on('get', function(callback) {this.getDummy(callback,
      0, // currently return fixed value celsium=0, fareneinheit=1
      'get TemperatureDisplayUnits'
      )}.bind(this))
    .on('set', function(value, callback) {this.setDummy(value, callback, 
      'set TemperatureDisplayUnits'
      )}.bind(this));  

      this.service.getCharacteristic(Characteristic.CurrentTemperature)
      .on('get', function(callback) {this.getReal(callback, 
        config.db, 
        config.get_CurrentTemperature,
        'get CurrentTemperature'
        )}.bind(this));

      this.service.getCharacteristic(Characteristic.TargetTemperature)
      .on('get', function(callback) {this.getReal(callback, 
        config.db, 
        config.get_TargetTemperature,
        'get TargetTemperature'
        )}.bind(this))
      .on('set', function(value, callback) {this.setReal(value, callback, 
        config.db, 
        config.set_TargetTemperature,
        'set TargetTemperature'
        )}.bind(this))
        .setProps({
          minValue: 20,
          maxValue: 30,
          minStep: 1
      });                 
  }  
 
 ////////////////////////////////////////////////////////////////
  // Window and WindowCovering
  ////////////////////////////////////////////////////////////////    
  else if (config.accessory == 'S7_Window' ||config.accessory == 'S7_WindowCovering'){ 
    if (config.accessory == 'S7_Window')
    {
      this.service = new Service.Window(this.name);
    }
    else
    {
      this.service = new Service.WindowCovering(this.name);
    }
    this.accessory.addService(this.service);

    var modFunction = this.plain_0_100;
    if ('invert' in config && config.invert) {
      modFunction = this.invert_0_100;
    }

    // create handlers for required characteristics
    this.service.getCharacteristic(Characteristic.CurrentPosition)
      .on('get', function(callback) {this.getByte(callback, 
        config.db, 
        config.get_CurrentPosition,        
        'get CurrentPosition',
        modFunction
        )}.bind(this));

    if ('get_TargetPosition' in config) {        
      this.service.getCharacteristic(Characteristic.TargetPosition)
        .on('get', function(callback) {this.getByte(callback, 
          config.db, 
          config.get_TargetPosition,
          'get TargetPosition',
          modFunction
          )}.bind(this))
        .on('set', function(value, callback) {this.setByte(value, callback, 
          config.db, 
          config.set_TargetPosition,
          'set TargetPosition',
          function(value){this.service.getCharacteristic(Characteristic.CurrentPosition).updateValue(value) }.bind(this),
          modFunction          
          )}.bind(this));
      }
      else
      {
        this.service.getCharacteristic(Characteristic.TargetPosition)
          .on('get', function(callback) {this.getDummy(callback, 
            0,
            'get TargetPosition'
            )}.bind(this))
          .on('set', function(value, callback) {this.setDummy(value, callback, 
            'set TargetPosition'
            )}.bind(this));
      }
    if ('get_PositionState' in config) {
      this.service.getCharacteristic(Characteristic.PositionState)
        .on('get', function(callback) {this.getByte(callback, 
          config.db, 
          config.get_PositionState,
          'get PositionState'
        )}.bind(this));
    }
    else {
      this.service.getCharacteristic(Characteristic.PositionState)
        .on('get', function(callback) {this.getDummy(callback,
        2,
        'get PositionState'
        )}.bind(this));
        }
      
    if ('set_HoldPosition' in config) {
    this.service.getCharacteristic(Characteristic.HoldPosition)
      .on('set', function(value, callback) { this.setBit(value, callback, 
        config.db,
        Math.floor(config.set_HoldPosition), Math.floor((config.set_HoldPosition*10)%10),
        'set HoldPosition'   
        )}.bind(this));
    }
    else {
      this.service.getCharacteristic(Characteristic.HoldPosition)
        .on('set', function(callback) {this.handleDummy(callback, 
          'set HoldPosition'        
          )}.bind(this));
    }
  }  
  ////////////////////////////////////////////////////////////////
  // OccupancySensor
  ////////////////////////////////////////////////////////////////   
  else if (config.accessory == 'S7_OccupancySensor'){
    this.service = new Service.OccupancySensor(this.name);
    this.accessory.addService(this.service);

    this.service.getCharacteristic(Characteristic.OccupancyDetected)
      .on('get', function(callback) {this.getBit(callback, 
        config.db, 
        Math.floor(config.get_OccupancyDetected), Math.floor((config.get_OccupancyDetected*10)%10),
        "get OccupancyDetected"
      )}.bind(this))    
  }
  ////////////////////////////////////////////////////////////////
  // MotionSensor
  ////////////////////////////////////////////////////////////////   
  else if (config.accessory == 'S7_MotionSensor'){
    this.service = new Service.OccupancySensor(this.name);
    this.accessory.addService(this.service);

    this.service.getCharacteristic(Characteristic.MotionDetected)
      .on('get', function(callback) {this.getBit(callback, 
        config.db, 
        Math.floor(config.get_MotionDetected), Math.floor((config.get_MotionDetected*10)%10),
        "get MotionDetected"
      )}.bind(this))    
  }  
  ////////////////////////////////////////////////////////////////
  // Faucet
  ////////////////////////////////////////////////////////////////   
  else if (config.accessory == 'S7_Faucet'){
    this.service =  new Service.Faucet(this.name);
    this.accessory.addService(this.service);

    if ('set_Deactivate' in config) {      
      this.service.getCharacteristic(Characteristic.Active)
        .on('get', function(callback) {this.getBit(callback, 
          config.db, 
          Math.floor(config.get_Active), Math.floor((config.get_Active*10)%10),
          'get Active'
        )}.bind(this))
        .on('set', function(powerOn, callback) { this.setOnOffBit(powerOn, callback, 
          config.db, 
          Math.floor(config.set_Active), Math.floor((config.set_Active*10)%10),
          Math.floor(config.set_Deactivate), Math.floor((config.set_Deactivate*10)%10),
          'set Active'
        )}.bind(this));
    } else {
      this.service.getCharacteristic(Characteristic.Active)
        .on('get', function(callback) {this.getBit(callback, 
          config.db, 
          Math.floor(config.get_Active), Math.floor((config.get_Active*10)%10),
          'get Active'
        )}.bind(this))
        .on('set', function(powerOn, callback) { this.setBit(powerOn, callback, 
          config.db, 
          Math.floor(config.set_Active), Math.floor((config.set_Active*10)%10),
          'set Active'
        )}.bind(this));
    }
  }  
  ////////////////////////////////////////////////////////////////
  // S7_SecuritySystem
  ////////////////////////////////////////////////////////////////   
  else if (config.accessory == 'S7_SecuritySystem'){
    this.service = new Service.SecuritySystem(this.name);
    this.accessory.addService(this.service);

    this.service.getCharacteristic(Characteristic.SecuritySystemCurrentState)
      .on('get', function(callback) {this.getByte(callback, 
        config.db, 
        config.get_SecuritySystemCurrentState,
        "get SecuritySystemCurrentState"
      )}.bind(this))    

      this.service.getCharacteristic(Characteristic.SecuritySystemTargetState)
      .on('get', function(callback) {this.getByte(callback, 
        config.db, 
        config.get_SecuritySystemTargetState,
        "get SecuritySystemTargetState"
      )}.bind(this))  
      .on('set', function(value, callback) {this.setByte(value, callback, 
        config.db, 
        config.set_SecuritySystemTargetState,
        "set SecuritySystemTargetState",
        function(value){this.service.getCharacteristic(Characteristic.SecuritySystemCurrentState).updateValue(value) }.bind(this),        
      )}.bind(this));        
  }  
  ////////////////////////////////////////////////////////////////
  // S7_Valve
  ////////////////////////////////////////////////////////////////   
  else if (config.accessory == 'S7_Valve'){
    this.service = new Service.Valve(this.name);
    this.accessory.addService(this.service);

    if ('set_Deactivate' in config) {      
      this.service.getCharacteristic(Characteristic.Active)
        .on('get', function(callback) {this.getBit(callback, 
          config.db, 
          Math.floor(config.get_Active), Math.floor((config.get_Active*10)%10),
          'get Active'
        )}.bind(this))
        .on('set', function(powerOn, callback) { this.setOnOffBit(powerOn, callback, 
          config.db, 
          Math.floor(config.set_Active), Math.floor((config.set_Active*10)%10),
          Math.floor(config.set_Deactivate), Math.floor((config.set_Deactivate*10)%10),
          'set Active',
          function(value){this.service.getCharacteristic(Characteristic.InUse).updateValue(value) }.bind(this)
        )}.bind(this));
    } else {
      this.service.getCharacteristic(Characteristic.Active)
        .on('get', function(callback) {this.getBit(callback, 
          config.db, 
          Math.floor(config.get_Active), Math.floor((config.get_Active*10)%10),
          'get Active'
        )}.bind(this))
        .on('set', function(powerOn, callback) { this.setBit(powerOn, callback, 
          config.db, 
          Math.floor(config.set_Active), Math.floor((config.set_Active*10)%10),
          'set Active',
          function(value){this.service.getCharacteristic(Characteristic.InUse).updateValue(value) }.bind(this)
        )}.bind(this));
    }

    this.service.getCharacteristic(Characteristic.InUse)
    .on('get', function(callback) {this.getBit(callback, 
      config.db, 
      Math.floor(config.get_Active), Math.floor((config.get_Active*10)%10),
      'get InUse'
    )}.bind(this))    

    if ('ValveType' in config) {   
      this.service.getCharacteristic(Characteristic.ValveType)
        .on('get', function(callback) {this.getDummy(callback,
          ValveType,
        'get ValveType'
        )}.bind(this));
    }
  /*  

    if ('InUse' in config) {   
      this.service.getCharacteristic(Characteristic.InUse)
        .on('get', function(callback) {this.getDummy(callback,
          config.InUse,
        'get InUse'
        )}.bind(this));        
    }

    

    if ('get_InUse' in config) {   

      setInterval(function() {this.getBit( 
        function(err, value){this.service.getCharacteristic(Characteristic.InUse).updateValue(value) }.bind(this),
        config.db, 
        Math.floor(config.get_InUse), Math.floor((config.get_InUse*10)%10),
        'poll InUse'
        )}.bind(this),5000);
    }
*/


    if ('get_RemainingDuration' in config) {   
      this.service.getCharacteristic(Characteristic.RemainingDuration)
        .on('get', function(callback) {this.getDInt(callback, 
          config.db, 
          config.get_RemainingDuration,
          "get RemainingDuration",
          this.s7time2int
        )}.bind(this))    

        this.service.getCharacteristic(Characteristic.SetDuration)
        .on('get', function(callback) {this.getDInt(callback, 
          config.db, 
          config.get_SetDuration,
          "get SetDuration",
          this.s7time2int
        )}.bind(this))  
        .on('set', function(value, callback) {this.setDInt(value, callback, 
          config.db, 
          config.set_SetDuration,
          "set SetDuration",
          function(value){this.service.getCharacteristic(Characteristic.RemainingDuration).updateValue(value) }.bind(this),
          this.int27time
        )}.bind(this));  
    }      
  }    
  ////////////////////////////////////////////////////////////////
  // S7_StatelessProgrammableSwitch
  ////////////////////////////////////////////////////////////////   
  /*
  else if (config.accessory == 'S7_StatelessProgrammableSwitch'){
    this.service = new Service.StatelessProgrammableSwitch(this.name);
    this.accessory.addService(this.service);

    this.service.getCharacteristic(Characteristic.ProgrammableSwitchEvent)
      .on('get', function(callback) {this.getByte(callback, 
        config.db, 
        config.get_ProgrammableSwitchEvent,
        "get ProgrammableSwitchEvent"
      )}.bind(this));

      this.service.getCharacteristic(Characteristic.ServiceLabelIndex)
      .on('get', function(callback) {this.getDummy(callback, 
        1,
        "get ServiceLabelIndex"
      )}.bind(this))
  }    
      */      
  else {
    this.log("Accessory "+ config.accessory + " is not defined.")
  }
      
  this.accessory.getService(Service.AccessoryInformation)
  .setCharacteristic(Characteristic.Manufacturer, ('manufacturer' in config) ? config.manufacturer : 'homebridge-plc')
  .setCharacteristic(Characteristic.Model, config.accessory)
  .setCharacteristic(Characteristic.SerialNumber, uuid)
  .setCharacteristic(Characteristic.FirmwareRevision, '0.0.1'); 

  //this.log.debug("Done " + this.service.displayName + " (" + this.service.subtype + ") " + this.service.UUID);

}

GenericS7.prototype = {

  getServices: function() {
    return [this.accessory.getService(Service.AccessoryInformation), this.service];
  },

  invert_0_100: function(value) {
    return 100-value;
  },
  
  plain_0_100: function(value) {
    return value;
  },

  s7time2int: function(value){
    var val = Math.ceil(value/1000);
    if (val > 3600) {
      val = 3600;
    }
    if (val < 0) {
      val = 0;
    }
    return val;
  },

  int27time: function(value){
    return (value * 1000);
  },

  //////////////////////////////////////////////////////////////////////////////
  // DUMMY
  //////////////////////////////////////////////////////////////////////////////
  setDummy: function(value, callback, characteristic, inform) {
    var logprefix = "[" + this.name + "] " + characteristic + ": %s (setDummy)";
    var log = this.log;    
    log.debug(logprefix , String(value));
    callback(null);
    if (typeof(inform) != "undefined" && inform != null)
    {
      inform(value);
    }       
  },

  handleDummy: function(callback, characteristic) {
    var logprefix = "[" + this.name + "] " + characteristic + ": %s (handleDummy)";
    var log = this.log;    
    this.log.debug(logprefix + "executed");
    callback(null);
  },

  getDummy: function(callback, value, characteristic) {
    var logprefix = "[" + this.name + "] " + characteristic + ": %s (getDummy)";
    var log = this.log;    
    log.debug(logprefix , String(value));
    callback(null, value);
  },


  //////////////////////////////////////////////////////////////////////////////
  // BIT
  //////////////////////////////////////////////////////////////////////////////
  setOnOffBit: function(value, callback, db, on_offset, on_bit, off_offset, off_bit, characteristic, inform) {    
    //Set single bit depending on value
    const offset = value ? on_offset : off_offset;
    const bit = value ? on_bit : off_bit;    
    var logprefix = "[" + this.name + "] " + characteristic + ": %s (setOnOffBit DB" + db + "DBX"+ offset + "." + bit + ")";
    var S7Client = this.platform.S7Client;
    var buf = this.buf;
    var log = this.log;
    var name = this.name;
    //ensure PLC connection
    if (this.platform.S7ClientConnect()) {

      this.buf[0] = 1;
      S7Client.WriteArea(S7Client.S7AreaDB, db, ((offset*8) + bit), 1, S7Client.S7WLBit, this.buf, function(err) {
        if(err) {
          log.error(logprefix, "WriteArea failed #" + String(err) + " - " + S7Client.ErrorText(err));
          S7Client.Disconnect();
          callback(new Error('PLC error'));
        }
        else {
          log.debug(logprefix , String(value));
          callback(null);
          if (typeof(inform) != "undefined" && inform != null)
          {
            inform(value);
          }             
        }
      });
    }
    else {
      callback(new Error('PLC not connected'), false);
    }
  },

  setBit: function(value, callback, db, offset, bit, characteristic, inform) {    
    //Set single bit depending on value
    var logprefix = "[" + this.name + "] " + characteristic + ": %s (setBit DB" + db + "DBX"+ offset + "." + bit + ")";
    var S7Client = this.platform.S7Client;
    var buf = this.buf;
    var log = this.log;
    var name = this.name;
    //ensure PLC connection
    if (this.platform.S7ClientConnect()) {
      this.buf[0] = value ? 1 : 0;
      S7Client.WriteArea(S7Client.S7AreaDB, db, ((offset*8) + bit), 1, S7Client.S7WLBit, this.buf, function(err) {
        if(err) {
          log.error(logprefix, "WriteArea failed #" + String(err) + " - " + S7Client.ErrorText(err));
          S7Client.Disconnect();
          callback(new Error('PLC error'));
        }
        else {
          log.debug(logprefix , String(value));
          callback(null);
          if (typeof(inform) != "undefined" && inform != null)
          {
            inform(value);
          }             
        }
      });
    }
    else {
      callback(new Error('PLC not connected'), false);
    }
  },


  getBit: function(callback, db, offset, bit, characteristic) {
    //read single bit
    var logprefix = "[" + this.name + "] " + characteristic + ": %s (getBit DB" + db + "DBX"+ offset + "." + bit + ")";
    var S7Client = this.platform.S7Client;
    var log = this.log;
    var name = this.name;
    //check PLC connection
    this.platform.S7ClientConnect();
      
    if (this.platform.S7ClientConnect()) {
      S7Client.ReadArea(S7Client.S7AreaDB, db, ((offset*8) + bit), 1, S7Client.S7WLBit, function(err, res) {
        if(err) {
          log.error(logprefix, "ReadArea failed #" + String(err) + " - " + S7Client.ErrorText(err));
          S7Client.Disconnect();
          callback(err, 0);
        }
        else {
          const value = ((res[0]) ? true : false);
          log.debug(logprefix , String(value));
          callback(null, value);
        }
      }); 
    }
    else {
      callback(new Error('PLC not connected'), false);
    }
  },
  
  //////////////////////////////////////////////////////////////////////////////
  // REAL
  //////////////////////////////////////////////////////////////////////////////
  setReal: function(value, callback, db, offset, characteristic, inform, valueMod) {
    var logprefix = "[" + this.name + "] " + characteristic + ": %s (setReal DB" + db + "DBD"+ offset + ")";
    var S7Client = this.platform.S7Client;
    var log = this.log;
    var name = this.name;
    var buf = this.buf
    var valuePLC = value;

    if (typeof(valueMod) != "undefined")
    {
      valuePLC = valueMod(value);
    }
    //ensure PLC connection    
    if (this.platform.S7ClientConnect()) {
        buf.writeFloatBE(valuePLC, 0);
        S7Client.WriteArea(S7Client.S7AreaDB, db, offset, 1, S7Client.S7WLReal, buf, function(err) {
          if(err) {
            log.error(logprefix, "WriteArea failed #" + String(err) + " - " + S7Client.ErrorText(err));
            S7Client.Disconnect();
            callback(new Error('PLC error'));
          }
          else {              
            if (typeof(valueMod) != "undefined")
            {
              log.debug(logprefix , String(value) + "->" + String(valuePLC));
            }            
            else
            {
              log.debug(logprefix , String(value));
            }           
            callback(null);
            if (typeof(inform) != "undefined" && inform != null)
            {
              inform(value);
            }               
          }
        });
    }
    else {
        callback(new Error('PLC not connected'));
    }
  },
    
  getReal: function(callback, db, offset, characteristic, valueMod) {
    var logprefix = "[" + this.name + "] " + characteristic + ": %s (getReal DB" + db + "DBD"+ offset + ")";
    var S7Client = this.platform.S7Client;
    var log = this.log;
    var name = this.name;
    var value = 0;
    //ensure PLC connection
    if (this.platform.S7ClientConnect()) {        
        S7Client.ReadArea(S7Client.S7AreaDB, db, offset, 1, S7Client.S7WLReal, function(err, res) {
          if(err) {
            log.error(logprefix, "ReadArea failed #" + String(err) + " - " + S7Client.ErrorText(err));
            S7Client.Disconnect();
            callback(new Error('PLC error'));
          }
          else {              
            valuePLC = res.readFloatBE(0);
            if (typeof(valueMod) != "undefined")
            {
              value = valueMod(valuePLC);
              log.debug(logprefix , String(value) + "<-" + String(valuePLC));
            }            
            else
            {
              value = valuePLC;
              log.debug(logprefix , String(value));
            }            
            callback(null, value);
          }
        });
    }
    else {
        callback(new Error('PLC not connected'));
    }
  },


  //////////////////////////////////////////////////////////////////////////////
  // BYTE
  //////////////////////////////////////////////////////////////////////////////
  setByte: function(value, callback, db, offset, characteristic, inform, valueMod) {
    var logprefix = "[" + this.name + "] " + characteristic + ": %s (setByte DB" + db + "DBB"+ offset + ")";
    var S7Client = this.platform.S7Client;
    var log = this.log;
    var name = this.name;
    var buf = this.buf    
    var valuePLC = value;

    if (typeof(valueMod) != "undefined")
    {
      valuePLC = valueMod(value);
    }
    //ensure PLC connection    
    if (this.platform.S7ClientConnect()) {
        buf[0] = valuePLC;
        S7Client.WriteArea(S7Client.S7AreaDB, db, offset, 1, S7Client.S7WLByte, buf, function(err) {
          if(err) {
            log.error(logprefix, "WriteArea failed #" + String(err) + " - " + S7Client.ErrorText(err));
            S7Client.Disconnect();
            callback(new Error('PLC error'));
          }
          else {              
            if (typeof(valueMod) != "undefined")
            {
              log.debug(logprefix , String(value) + "->" + String(valuePLC));
            }            
            else
            {
              log.debug(logprefix , String(value));
            }  
            callback(null);
            if (typeof(inform) != "undefined" && inform != null)
            {
              inform(value);
            }               
          }
        });
    }
    else {
        callback(new Error('PLC not connected'));
    }
  },
    
  getByte: function(callback, db, offset, characteristic, valueMod) {
    var logprefix = "[" + this.name + "] " + characteristic + ": %s (getByte DB" + db + "DBB"+ offset + ")";    
    var S7Client = this.platform.S7Client;
    var log = this.log;
    var name = this.name;
    var value = 0;
    //ensure PLC connection    
    if (this.platform.S7ClientConnect()) {      
        S7Client.ReadArea(S7Client.S7AreaDB, db, offset, 1, S7Client.S7WLByte, function(err, res) {
          if(err) {
            log.error(logprefix, "ReadArea failed #" + String(err) + " - " + S7Client.ErrorText(err));
            S7Client.Disconnect();
            callback(new Error('PLC error'));
          }
          else {              
            valuePLC = res[0];
            if (typeof(valueMod) != "undefined")
            {
              value = valueMod(valuePLC);
              log.debug(logprefix , String(value) + "<-" + String(valuePLC));
            }            
            else
            {
              value = valuePLC;
              log.debug(logprefix , String(value));
            }            
            callback(null, value);
          }
        });
    }
    else {
        callback(new Error('PLC not connected'));
    }
  },



  //////////////////////////////////////////////////////////////////////////////
  // INT
  //////////////////////////////////////////////////////////////////////////////
  setInt: function(value, callback, db, offset, characteristic, inform, valueMod) {
    var logprefix = "[" + this.name + "] " + characteristic + ": %s (setInt DB" + db + "DBW"+ offset + ")";    
    var S7Client = this.platform.S7Client;
    var log = this.log;
    var name = this.name;
    var buf = this.buf
    var valuePLC = value;

    if (typeof(valueMod) != "undefined")
    {
      valuePLC = valueMod(value);
    }
    //ensure PLC connection
    if (this.platform.S7ClientConnect()) {
        buf.writeInt16BE(valuePLC, 0);
        S7Client.WriteArea(S7Client.S7AreaDB, db, offset, 1, S7Client.S7WLWord, buf, function(err) {
          if(err) {
            log.error(logprefix, "WriteArea failed #" + String(err) + " - " + S7Client.ErrorText(err));
            S7Client.Disconnect();
            callback(new Error('PLC error'));
          }
          else {              
            if (typeof(valueMod) != "undefined")
            {
              log.debug(logprefix , String(value) + "->" + String(valuePLC));
            }            
            else
            {
              log.debug(logprefix , String(value));
            }  
            callback(null);
            if (typeof(inform) != "undefined" && inform != null)
            {
              inform(value);
            }               
          }
        });
    }
    else {
        callback(new Error('PLC not connected'));
    }
  },
    
  getInt: function(callback, db, offset, characteristic, valueMod) {
    var logprefix = "[" + this.name + "] " + characteristic + ": %s (getInt DB" + db + "DBW"+ offset + ")";    
    var S7Client = this.platform.S7Client;
    var log = this.log;
    var name = this.name;
    var value = 0;
    var valuePLC = 0;
    //ensure PLC connection
    if (this.platform.S7ClientConnect()) {       
        S7Client.ReadArea(S7Client.S7AreaDB, db, offset, 1, S7Client.S7WLWord, function(err, res) {
          if(err) {
            log.error(logprefix, "ReadArea failed #" + String(err) + " - " + S7Client.ErrorText(err));
            S7Client.Disconnect();
            callback(new Error('PLC error'));
          }
          else {              
            valuePLC = res.readInt16BE(0);
            if (typeof(valueMod) != "undefined")
            {
              value = valueMod(valuePLC);
              log.debug(logprefix , String(value) + "<-" + String(valuePLC));
            }            
            else
            {
              value = valuePLC;
              log.debug(logprefix , String(value));
            }            
            callback(null, value);
          }
        });
    }
    else {
        callback(new Error('PLC not connected'));
    }
  },



  //////////////////////////////////////////////////////////////////////////////
  // DInt
  //////////////////////////////////////////////////////////////////////////////
  setDInt: function(value, callback, db, offset, characteristic, inform, valueMod) {
    var logprefix = "[" + this.name + "] " + characteristic + ": %s (setDInt DB" + db + "DBD"+ offset + ")";    
    var S7Client = this.platform.S7Client;
    var log = this.log;
    var name = this.name;
    var buf = this.buf
    var valuePLC = value;

    if (typeof(valueMod) != "undefined")
    {
      valuePLC = valueMod(value);
    }
    //ensure PLC connection
    if (this.platform.S7ClientConnect()) {
        buf.writeInt32BE(valuePLC, 0);
        S7Client.WriteArea(S7Client.S7AreaDB, db, offset, 1, S7Client.S7WLDWord, buf, function(err) {
          if(err) {
            log.error(logprefix, "WriteArea failed #" + String(err) + " - " + S7Client.ErrorText(err));
            S7Client.Disconnect();
            callback(new Error('PLC error'));
          }
          else {              
            if (typeof(valueMod) != "undefined")
            {
              log.debug(logprefix , String(value) + "->" + String(valuePLC));
            }            
            else
            {
              log.debug(logprefix , String(value));
            }  
            callback(null);
            if (typeof(inform) != "undefined" && inform != null)
            {
              inform(value);
            }               
          }
        });
    }
    else {
        callback(new Error('PLC not connected'));
    }
  },
    
  getDInt: function(callback, db, offset, characteristic, valueMod) {
    var logprefix = "[" + this.name + "] " + characteristic + ": %s (getDInt DB" + db + "DBD"+ offset + ")";    
    var S7Client = this.platform.S7Client;
    var log = this.log;
    var name = this.name;
    var value = 0;
    var valuePLC = 0;
    //ensure PLC connection
    if (this.platform.S7ClientConnect()) {
        S7Client.ReadArea(S7Client.S7AreaDB, db, offset, 1, S7Client.S7WLDWord, function(err, res) {
          if(err) {
            log.error(logprefix, "ReadArea failed #" + String(err) + " - " + S7Client.ErrorText(err));
            S7Client.Disconnect();
            callback(new Error('PLC error'));
          }
          else {              
            valuePLC = res.readInt32BE(0);
            if (typeof(valueMod) != "undefined")
            {
              value = valueMod(valuePLC);
              log.debug(logprefix , String(value) + "<-" + String(valuePLC));
            }            
            else
            {
              value = valuePLC;
              log.debug(logprefix , String(value));
            }            
            callback(null, value);
          }
        });
    }
    else {
        callback(new Error('PLC not connected'));
    }
  }


  
}

